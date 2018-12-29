using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.Authorization;
using cems.API.Helpers;
using cems.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Features.Admin
{
    [Authorize(Policy = "RequireAdminRole")]
    [ApiController]
    [Route("api/admin/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;

        public UserController(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager,
            IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Include(u => u.WebApiKey)
                .Include(u => u.UserRoles)
                .Select(a => new
                {
                    a.Id,
                    Username = a.UserName,
                    a.FirstName,
                    a.LastName,
                    a.Email,
                    WebApiKey = a.WebApiKey.ApiKey,
                    Roles = a.UserRoles.Select(r => new {r.Role.Id, r.Role.Name})
                }).ToListAsync();

            return Ok(users);
        }

        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var users = await _context.Users.Include(u => u.WebApiKey)
                .Include(u => u.UserRoles)
                .Select(a => new
                {
                    a.Id,
                    Username = a.UserName,
                    Roles = a.UserRoles.Select(r => r.Role.Name)
                }).ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserForRegisterDto userForCreate)
        {
            var userToCreate = _mapper.Map<User>(userForCreate);

            var generator = new ApiKeyGenerator(_context);
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


        [HttpPut("{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(username);
            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
            {
                BadRequest("Failed to remove the roles");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return roles != null ? Ok() : StatusCode(500);
        }

        [HttpDelete("name/{username}")]
        public async Task<IActionResult> Delete(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to delete user");
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userToDelete = await _userManager.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (userToDelete == null)
                return NotFound();

            var result = await _userManager.DeleteAsync(userToDelete);
            return result.Succeeded ? NoContent() : StatusCode(500);
        }
    }
}