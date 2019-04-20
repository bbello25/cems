using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using cems.API.Features.LogBrowser.Dtos;
using cems.API.Features.LogBrowser.Services;
using cems.API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace cems.API.Features.LogBrowser
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventLogsController : ControllerBase
    {
        private readonly ILogService m_logService;

        public EventLogsController(ILogService logService)
        {
            m_logService = logService;
        }


        [HttpGet("logs")]
        public async Task<IActionResult> GetUserLogs([FromQuery] QueryParams queryParams)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var logs = await m_logService.GetLogs(queryParams, username);
            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);

            return Ok(logs);
        }

        [HttpGet("logGroups")]
        public async Task<IActionResult> GetLogGroups([FromQuery] QueryParams queryParams)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var logs = await m_logService.GetLogGroups(queryParams, username);
            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);
            return Ok(logs);
        }

        [HttpGet("log/{id}")]
        public async Task<IActionResult> GetLog(int id)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var log = await m_logService.GetLog(id, username);

            if (log == null)
            {
                return NotFound();
            }

            return Ok(log);
        }

        [HttpPost("updateLogsState")]
        public async Task<IActionResult> UpdateLogState([FromBody] List<EventLogStatusUpdateDto> logsStatusUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var numberOfUpdatedLogs = await m_logService.UpdateLogsStatus(logsStatusUpdateDto,username);

            return Ok(numberOfUpdatedLogs);
        }


        [HttpGet("log/{id}/similar")]
        public async Task<IActionResult> GetSimilarLogs(int id, [FromQuery] string matchReason)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var logs = await m_logService.GetSimilarLogs(id, matchReason, username);

            if (logs != null && logs.Count > 0)
                return Ok(logs);
            return Ok();
        }


    }
}