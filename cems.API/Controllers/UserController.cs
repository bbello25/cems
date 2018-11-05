using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Dtos;
using cems.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public UserController(UserManager<User> userManager, IMapper mapper, DataContext dataContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetUserDeails(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var username = User.FindFirst(ClaimTypes.Name).Value;


            var user = _dataContext.Users
                .Where(u => u.NormalizedUserName == username.ToUpper())
                .Include(u => u.WebApiKey)
                .FirstOrDefault();

            user.WebApiKey.TrustedHosts =
                await _dataContext.TrustedHosts.Where(w => w.WebApiKeyId == user.WebApiKey.Id).ToListAsync();

            var userForReturn = _mapper.Map<UserForDetailedDTO>(user);

            return Ok(userForReturn);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> UpdateUserDetails(int id, TrustedHostForUpdateDTO trustedHostForUpdateDTO)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var username = User.FindFirst(ClaimTypes.Name).Value;
            var user = _dataContext.Users
                .Where(u => u.NormalizedUserName == username.ToUpper())
                .Include(u => u.WebApiKey)
                .ThenInclude(h => h.TrustedHosts).FirstOrDefault();
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var trustedHosts = new List<TrustedHost>();
            foreach (var host in trustedHostForUpdateDTO.TrustedHost)
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