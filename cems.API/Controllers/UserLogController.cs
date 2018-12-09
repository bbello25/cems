using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using cems.API.Models;
using cems.Collector.DTO;
using cems.API.Data;
using cems.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cems.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogRepository _logRepository;

        public UserLogController(DataContext context, UserManager<User> userManager, ILogRepository logRepository)
        {
            _context = context;
            _userManager = userManager;
            _logRepository = logRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserLogs([FromQuery]UserParams userParams)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            
            var logs = await _logRepository.GetLogs(userParams, username);
            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);

            return Ok(logs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserLog(int id)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            ErrorLogBase log;
            if (await _userManager.IsInRoleAsync(userFromDb, "Admin"))
            {
                log = await _context.LogEntries.FirstOrDefaultAsync(l => l.Id == id);
            }
            else
            {
                log = await _context.LogEntries.Include(l => l.WebApiKey)
                    .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id && l.Id == id).FirstOrDefaultAsync();
            }

            if (log == null)
            {
                return NotFound();
            }

            /*var retyped = (BrowserErrorLog) log;
            if (retyped.Headers != null)
            {
                retyped.Headers = JsonConvert.DeserializeObject(retyped.Headers);
            }

            if (retyped.SessionInfo != null)
            {
                retyped.SessionInfo = JsonConvert.DeserializeObject(retyped.SessionInfo);

            }*/
           
            
            return Ok(log);
        }
    }
}