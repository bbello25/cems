using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AjaxMinExtensions;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.LogEndpoint;
using cems.API.Features.Shared;
using cems.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StackTrace = System.Diagnostics.StackTrace;

namespace cems.API.Features.LogCollector
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IStrackTraceDeminifierService _deminifier;

        public LogController(DataContext context, IMapper mapper, IStrackTraceDeminifierService deminifier)
        {
            _context = context;
            _mapper = mapper;
            _deminifier = deminifier;
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

            var sessionId = Guid.NewGuid().ToString("N");

            return Ok(sessionId);
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

            var res = _deminifier.Deminfy(data.stacktrace.ToString());

            var errorLog = new BrowserErrorForSaveDto
            {
                Timestamp = data.timestamp,
                Email = data.email,
                Ip = data.ip,
                Message = data.message,
                Name = data.name,
                Source = data.source,
                StackTrace = JsonConvert.SerializeObject(res),
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



        [HttpPost("apiError")]
        public async Task<IActionResult> ApiError([FromBody]JObject data)
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


            var dataObj =  data.ToObject<DotnetExceptionDto>();
            //_context.LogEntries.Add(errorLogBase);
            return await _context.SaveChangesAsync() > 0 ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}