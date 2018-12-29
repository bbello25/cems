using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cems.API.Features.LogCollector
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LogController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("healthCheck")]
        public async Task<IActionResult> HealthCheck()
        {
            var apiKeyFromRequest = HttpContext.Request.Headers["api-key"];
            if (apiKeyFromRequest.ToString().Length == 0)
            {
                return Unauthorized();
            }

            var apiKeyFromDb = await _context.WebApiKeys.FirstOrDefaultAsync(k => k.ApiKey == apiKeyFromRequest);
            if (apiKeyFromDb == null)
            {
                return BadRequest("Unregistered API Key");
            }

            return Ok();
        }

        [HttpPost("browserError")]
        public async Task<IActionResult> Post([FromBody] dynamic data)
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

            var errorLog = new BrowserErrorForSaveDto
            {
                Timestamp = data.timestamp,
                Email = data.email,
                Ip = data.ip,
                Message = data.message,
                Name = data.name,
                Source = data.source,
                StackTrace = data.stacktrace.ToString(),
                SessionInfo = data.sessionInfo.ToString()
            };
            var errorLogToSave = _mapper.Map<BrowserErrorLog>(errorLog);
            errorLogToSave.Headers =
                JsonConvert.SerializeObject(Request.Headers.Where(h => h.Value.Count > 0).ToList());
            errorLogToSave.Protocol = Request.Protocol;
            errorLogToSave.ProgLanguage = "JavaScript";
            errorLogToSave.WebApiKey = apiKeyFromDb;
            _context.LogEntries.Add(errorLogToSave);
            
            return await _context.SaveChangesAsync() > 0 ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }


        [HttpPost]
        public async Task<IActionResult> Post(ErrorForSaveBaseDto logEntryDto)
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

            var errorLogBase = new ErrorLogBase
            {
                Message = logEntryDto.Message,
                StackTrace = logEntryDto.StackTrace,
                Source = logEntryDto.Source,
                WebApiKeyId = apiKeyFromDb.Id,
                ProgLanguage = "C#",
                Timestamp = DateTime.Now
            };

            _context.LogEntries.Add(errorLogBase);
            
            return await _context.SaveChangesAsync() > 0 ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}