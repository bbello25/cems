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
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<Role> _roleManager;

        public RolesController(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<IActionResult> GetRoles()
        {
            return Ok(await _roleManager.Roles.Select(role => new {role.Id, role.Name}).ToListAsync());
        }

        /*[HttpPost("roles")]
        public async Task<IActionResult> AddNewRoles(RoleAddDTO rolesToAdd)
        {
            var currentRoles = _roleManager.Roles;

            var success = true;
            foreach (var roleName in rolesToAdd.RoleNames)
            {
                var newRole = new Role {Name = roleName};
                var result = await _roleManager.CreateAsync(newRole);
                if (!result.Succeeded)
                    success = false;
                break;
            }

            if (!success)
            {
                var rolestoDelte = _roleManager.Roles.Except(currentRoles);
                foreach (var role in rolestoDelte)
                {
                    var result = await _roleManager.DeleteAsync(role);
                    if (!result.Succeeded)
                    {
                        return StatusCode(500);
                    }
                }
            }

            return Ok();
        }*/

        [HttpPost]
        public async Task<IActionResult> AddRole(RoleAddDTO roleToAdd)
        {
            var roleName = roleToAdd.RoleNames[0];
            if (string.IsNullOrWhiteSpace(roleName))
                return BadRequest("Role name cannot be empty");

            if (await _roleManager.RoleExistsAsync(roleName))
                return BadRequest("Role already exists");

            var newRole = new Role {Name = roleName};
            var result = await _roleManager.CreateAsync(newRole);

            return !result.Succeeded ? StatusCode(500) : Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var roleToDelete = _roleManager.Roles.FirstOrDefault(role => role.Id == id);
            if (roleToDelete == null)
                return NotFound();
            if (roleToDelete.Name.ToLower() == "admin" || roleToDelete.Name.ToLower() == "user")
                return BadRequest();

            var result = await _roleManager.DeleteAsync(roleToDelete);

            return !result.Succeeded ? StatusCode(500) : Ok();
        }
    }
}