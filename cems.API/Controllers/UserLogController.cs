using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using cems.API.Models;
using cems.Collector.DTO;
using cems.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public UserLogController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserLogs()
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var logs = await _context.LogEntries.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id).ToListAsync();

  
            
            return Ok(logs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserLog(int id)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var log = await _context.LogEntries.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id && l.Id == id).FirstOrDefaultAsync();


            if (log == null)
            {
                return BadRequest("Log not found");
            }

            return Ok(log);
        }
    }
}