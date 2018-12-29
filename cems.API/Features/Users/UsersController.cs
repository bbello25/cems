using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Features.Users
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

            var userForReturn = _mapper.Map<UserDetailDto>(user);

            return Ok(userForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserEditDto userForUpdate)
        {
            //var id = userForUpdate.Id;
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var appUser = await _dataContext.Users
                .FirstOrDefaultAsync(u => u.Id == id);
            if (appUser == null)
                return NotFound();
            appUser.Email = userForUpdate.Email;
            appUser.FirstName = userForUpdate.FirstName;
            appUser.LastName = userForUpdate.LastName;
            appUser.PhoneNumber = userForUpdate.Phone;

            var result = await _userManager.UpdateAsync(appUser);
            if (result.Succeeded)
                return Ok();

            return BadRequest();
        }
    }
}