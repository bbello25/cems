using System;
using System.Threading.Tasks;
using cems.API.Models;
using cems.Collector.DTO;
using cems.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cems.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly DataContext _context;

        public LogController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(LogEntryForSaveDTO logEntryDTO)
        {
            var apiKeyFromRequest = HttpContext.Request.Headers["api-key"];
            if (apiKeyFromRequest.ToString().Length == 0)
            {
                return Unauthorized();
            }

            var apiKeyFromDb = _context.WebApiKeys.FirstOrDefaultAsync(k => k.ApiKey == apiKeyFromRequest).Result;
            if (apiKeyFromDb == null)
            {
                return BadRequest("Unregistered API Key");
            }

            var userAgent = Request.Headers["User-agent"].ToString();
            var origin = Request.Headers["Origin"].ToString();
            var referer = Request.Headers["Referer"].ToString();
            var httpProtocol = Request.Protocol;
            var progLangauge = "C#";
            if (userAgent != null && userAgent.Length > 0)
                progLangauge = "JavaScript";
            LogEntry logEntry = new LogEntry()
            {
                Message = logEntryDTO.Message,
                StackTrace = logEntryDTO.StackTrace,
                Source = logEntryDTO.Source,
                WebApiKeyId = apiKeyFromDb.Id,
                ProgLanguage = "C#",
                Timestamp = DateTime.Now
            };

            _context.LogEntries.Add(logEntry);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}