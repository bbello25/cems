using System.Linq;
using System.Threading.Tasks;
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
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<Role> _roleManager;

        public RoleController(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleManager.Roles.Select(role => new {role.Id, role.Name}).ToListAsync();
            return Ok(roles);
        }

        [HttpPost]
        public async Task<IActionResult> AddRole(RoleEditDto roleToAdd)
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