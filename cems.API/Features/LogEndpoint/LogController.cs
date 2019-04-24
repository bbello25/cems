using System;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.LogBrowser.Services;
using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace cems.API.Features.LogEndpoint
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IStackTraceDeminifierService _deminifier;
        private readonly ILogService m_logService;
        private readonly JsonSerializerSettings serializerSettings;

        public LogController(DataContext context, IMapper mapper, IStackTraceDeminifierService deminifier,
            ILogService logService)
        {
            _context = context;
            _mapper = mapper;
            _deminifier = deminifier;
            m_logService = logService;

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

            var apiKeyFromDb = await _context.ApiKeys.FirstOrDefaultAsync(k => k.Key == apiKeyFromRequest);
            if (apiKeyFromDb == null)
            {
                return BadRequest("Unregistered API Key");
            }

            var sessionId = Guid.NewGuid().ToString("N");

            return Ok(sessionId);
        }

        [HttpPost("javascript")]
        public async Task<IActionResult> JavascriptEndpoint([FromBody] JavascriptLog log)
        {
            var apiKeyFromRequest = HttpContext.Request.Headers["api-key"];
            if (apiKeyFromRequest.ToString().Length == 0)
            {
                return Unauthorized();
            }

            var apiKeyFromDb = _context.ApiKeys.FirstOrDefaultAsync(k => k.Key == apiKeyFromRequest).Result;
            if (apiKeyFromDb == null)
            {
                return BadRequest("Unregistered API Key");
            }

            try
            {
                var javascriptStackTrace = _deminifier.Deminfy(log.ExceptionDetails.RawStackTrace);
                //TODO stuff for building from json is prepared ... change this later to use DeminifyStackTraceResult
                log.JavascriptExceptionDetails.JavascriptStackTrace =
                    JavascriptStackTrace.FromJsonString(JsonConvert.SerializeObject(javascriptStackTrace));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            log.CreatedTime = DateTime.Now;
            log.StateChangedTime = DateTime.Now;
            log.ApiKey = apiKeyFromDb;
            var added = await m_logService.AddLog(log);

            return added ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }


        [HttpPost("dotnet")]
        public async Task<IActionResult> DotnetEndpoint([FromBody] DotnetLog log)
        {
            var apiKeyFromRequest = HttpContext.Request.Headers["api-key"];
            if (apiKeyFromRequest.ToString().Length == 0)
            {
                return Unauthorized();
            }

            var apiKeyFromDb = _context.ApiKeys.FirstOrDefaultAsync(k => k.Key == apiKeyFromRequest).Result;
            if (apiKeyFromDb == null)
            {
                return BadRequest("Unregistered API Key");
            }

            log.CreatedTime = DateTime.Now;
            log.StateChangedTime = DateTime.Now;
            log.ApiKey = apiKeyFromDb;

            var added = await m_logService.AddLog(log);

            return added ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}