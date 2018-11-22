using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Dtos;
using cems.API.Helpers;
using cems.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public UsersController(UserManager<User> userManager, IMapper mapper, DataContext dataContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userManager.Users.ToListAsync());
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserForRegisterDto userForCreate)
        {
            var userToCreate = _mapper.Map<User>(userForCreate);

            var generator = new ApiKeyGenerator(_dataContext);
            userToCreate.WebApiKey = new WebApiKey
            {
                ApiKey = generator.GenerateApiKey()
            };

            var result = await _userManager.CreateAsync(userToCreate, userForCreate.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var createdUser = _userManager.FindByNameAsync(userToCreate.UserName).Result;
            result = await _userManager.AddToRoleAsync(createdUser, "User");
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userToDelete = await _userManager.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (userToDelete == null)
                return NotFound();

            var result = await _userManager.DeleteAsync(userToDelete);
            return result.Succeeded ? NoContent() : StatusCode(500);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var user = _dataContext.Users
                .Where(u => u.Id == id)
                .Include(u => u.WebApiKey)
                .FirstOrDefault();

            if (user == null)
                return NotFound();


            user.WebApiKey.TrustedHosts =
                await _dataContext.TrustedHosts.Where(w => w.WebApiKeyId == user.WebApiKey.Id).ToListAsync();

            var userForReturn = _mapper.Map<UserForDetailedDTO>(user);

            return Ok(userForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForDetailedDTO userForUpdate)
        {
            //var id = userForUpdate.Id;
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var appUser = await _userManager.FindByNameAsync(userForUpdate.Username);
            appUser.Email = userForUpdate.Email;
            appUser.FirstName = userForUpdate.FirstName;
            appUser.LastName = userForUpdate.LastName;
            appUser.PhoneNumber = userForUpdate.Phone;

            var result = await _userManager.UpdateAsync(appUser);
            if (result.Succeeded)
                return Ok();

            return BadRequest();
        }


        [HttpPut("{id}/TrustedHosts")]
        public async Task<IActionResult> UpdateUserDetails(int id, TrustedHostForUpdateDTO trustedHostForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var username = User.FindFirst(ClaimTypes.Name).Value;
            var user = await _dataContext.Users
                .Where(u => u.NormalizedUserName == username.ToUpper())
                .Include(u => u.WebApiKey)
                .ThenInclude(h => h.TrustedHosts).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var trustedHosts = new List<TrustedHost>();
            foreach (var host in trustedHostForUpdateDto.TrustedHost)
            {
                var _host = new TrustedHost
                {
                    Host = host,
                    WebApiKey = user.WebApiKey
                };
                trustedHosts.Add(_host);
            }

            user.WebApiKey.TrustedHosts = trustedHosts;
            _dataContext.SaveChanges();
            return Ok();
        }
    }
}