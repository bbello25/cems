using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Models.identity;
using cems.API.Models.user;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace cems.API.Features.Authorization
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly DataContext _dataContext;

        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager,
            SignInManager<User> signInManager, DataContext dataContext)
        {
            _mapper = mapper;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var apiKey = new ApiKey
            {
                Key = Guid.NewGuid().ToString("N")
            };

            var apiKeys = new List<ApiKey>();
            apiKeys.Add(apiKey);

            userToCreate.ApiKeys = apiKeys;

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var createdUser = _userManager.FindByNameAsync(userToCreate.UserName).Result;
            result = await _userManager.AddToRoleAsync(createdUser, "User");
            if (!result.Succeeded)
                return BadRequest(result.Errors);


            return Ok();
            //var userToReturn = _mapper.Map<UserForDetailedDTO>(userToCreate);
            //return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.Username);
            if (user == null)
                return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.Where(u =>
                        u.NormalizedUserName == userForLoginDto.Username.ToUpper()).Include(u => u.ApiKeys)
                    .FirstOrDefaultAsync();

                var appUser2 = await (from u in _userManager.Users
                    where u.NormalizedUserName == userForLoginDto.Username.ToUpper()
                    select
                        new
                        {
                            Id = u.Id,
                            username = u.UserName,
                            ApiKeys = u.ApiKeys
                        }).FirstOrDefaultAsync();


                var userToReturn = _mapper.Map<UserForListDto>(appUser2);

                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}