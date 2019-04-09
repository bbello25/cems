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
using cems.API.Models.csharp;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
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
        private readonly IStackTraceDeminifierService _deminifier;
        private readonly JsonSerializerSettings serializerSettings;

        public LogController(DataContext context, IMapper mapper, IStackTraceDeminifierService deminifier)
        {
            _context = context;
            _mapper = mapper;
            _deminifier = deminifier;

            serializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
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
        public async Task<IActionResult> BrowserErrorEndpoint([FromBody]BrowserExceptionDto data)
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

            var javascriptStackTrace = _deminifier.Deminfy(data.StackTrace.ToString());

            var errorLogToSave = new BrowserErrorLog()
            {
                ExceptionMessage = data.Message,
                Source = data.Source,
                ProgLanguage = data.ProgLanguage,
                Name = data.Name,
                Timestamp = DateTimeConverter.UnixTimestampToDateTime(data.Timestamp),
                StackTraceJson = JsonConvert.SerializeObject(javascriptStackTrace, serializerSettings),
                StackTraceRaw = data.StackTrace,
                WebApiKey = apiKeyFromDb,
                SessionInfoJson =  data.SessionInfo
            };

            _context.ErrorLogs.Add(errorLogToSave);

            return await _context.SaveChangesAsync() > 0 ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }



        [HttpPost("dotnetWebError")]
        public async Task<IActionResult> DotnetWebErrorEndpoint([FromBody]DotnetExceptionDto data)
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

            var errorLogToSave = new DotnetWebErrorLog
            {
                ExceptionMessage = data.Message,
                Source = data.Source,
                ProgLanguage = data.ProgLanguage,
                Name  = data.Name,
                Timestamp = DateTimeConverter.UnixTimestampToDateTime(data.Timestamp),
                StackTraceJson = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(data.StackTrace), serializerSettings),
                StackTraceRaw = data.StackTraceRaw,
                RequestJson = JsonConvert.SerializeObject(data.Request, serializerSettings),
                ConnectionInfoJson = JsonConvert.SerializeObject(data.ConnectionInfo, serializerSettings),
                Host = data.Host,
                Port = data.Port,
                WebApiKey = apiKeyFromDb
            };

            _context.ErrorLogs.Add(errorLogToSave);

            return await _context.SaveChangesAsync() > 0 ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}