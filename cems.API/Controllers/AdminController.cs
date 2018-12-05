using System;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Data;
using cems.API.Dtos;
using cems.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Controllers
{
    [Authorize(Policy = "RequireAdminRole")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AdminController(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users
                orderby user.UserName
                select new
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Roles = (from userRole in user.UserRoles
                        join role in _context.Roles on userRole.RoleId equals role.Id
                        select role.Name).ToList()
                }).ToListAsync();
            return Ok(userList);
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDTO roleEditDto)
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

        [HttpDelete("delete/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
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
    }
}