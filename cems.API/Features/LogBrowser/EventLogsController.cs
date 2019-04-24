using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IGroupService m_groupService;
        private readonly IMapper m_mapper;

        public EventLogsController(ILogService logService, IGroupService groupService, IMapper mapper)
        {
            m_logService = logService;
            m_groupService = groupService;
            m_mapper = mapper;
        }


        [HttpGet("logs")]
        public async Task<IActionResult> GetUserLogs([FromQuery] LogListQueryParams queryParams)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var logs = await m_logService.GetLogs(queryParams, username);

            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);
            if (queryParams.IncludeBody != true)
            {
                var logHeaders = new List<LogHeaderDto>();
                foreach (var cemsLog in logs)
                {
                    var logHeader = new LogHeaderDto
                    {
                        Id = cemsLog.Id,
                        Platform = cemsLog.Platform,
                        Timestamp = cemsLog.Timestamp,
                        CurrentState = cemsLog.CurrentState,
                        ExceptionMessage = cemsLog.ExceptionDetails.Message,
                        ExceptionType = cemsLog.ExceptionDetails.Type,
                        StateChangedTime =  cemsLog.StateChangedTime
                    };
                    logHeaders.Add(logHeader);
                }
                return Ok(logHeaders);
            }

            return Ok(logs);
        }

        [HttpGet("group/{id}/")]
        public async Task<IActionResult> GetGroup( int id)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var group = await m_groupService.GetGroup(id, username);
            var lastLog = await m_groupService.GetLastLog(group.Id);
            var lastLogHeaderDto = new LogHeaderDto
            {
                Id = lastLog.Id,
                Platform = lastLog.Platform,
                Timestamp = lastLog.Timestamp,
                CurrentState = lastLog.CurrentState,
                ExceptionType = lastLog.ExceptionDetails.Type,
                ExceptionMessage = lastLog.ExceptionDetails.Message,
                StateChangedTime = lastLog.StateChangedTime
            };
            var g = new GroupListItemDto
            {
                Id = group.Id,
                GroupingReason = group.GroupingReason,
                GroupingContext = group.GroupingContext,
                FirstOccured = group.FirstOccured,
                LastOccured = group.LastOccured,
                LogsCount = group.GroupItems.Count,
                LastLogHeader = lastLogHeaderDto
            };

            return Ok(g);
        }



        [HttpGet("group/{id}/logs")]
        public async Task<IActionResult> GetGroupLogs([FromQuery] QueryParams queryParams, int id)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var logs = await m_groupService.GetGroupItems(queryParams, id, username);

            Response.AddPagination(logs.CurrentPage, logs.PageSize, logs.TotalCount, logs.TotalPages);
            return Ok(logs);
        }



        [HttpGet("logGroups")]
        public async Task<IActionResult> GetLogGroups([FromQuery] GroupListQueryParams listQueryParams)
        {
            var username = User.FindFirst(ClaimTypes.Name).Value;

            var groups = await m_groupService.GetUserGroups(listQueryParams, username);
            var lastLog = await m_groupService.GetLastLog(groups.ElementAt(0).Id);

            var lastLogHeaderDto = new LogHeaderDto
            {
                Id = lastLog.Id,
                Platform = lastLog.Platform,
                Timestamp = lastLog.Timestamp,
                CurrentState = lastLog.CurrentState,
                ExceptionType = lastLog.ExceptionDetails.Type,
                ExceptionMessage = lastLog.ExceptionDetails.Message,
                StateChangedTime = lastLog.StateChangedTime
            };

            var groupListDto = new List<GroupListItemDto>();
            foreach (var grp in groups)
            {
                var g = new GroupListItemDto
                {
                    Id = grp.Id,
                    GroupingReason = grp.GroupingReason,
                    GroupingContext = grp.GroupingContext,
                    FirstOccured = grp.FirstOccured,
                    LastOccured = grp.LastOccured,
                    LogsCount = grp.GroupItems.Count,
                    LastLogHeader = lastLogHeaderDto
                };
                groupListDto.Add(g);
            }

            Response.AddPagination(groups.CurrentPage, groups.PageSize, groups.TotalCount, groups.TotalPages);
            return Ok(new PagedList<GroupListItemDto>(groupListDto, groups.TotalCount, groups.CurrentPage,
                groups.PageSize));
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

            var numberOfUpdatedLogs = await m_logService.UpdateLogsStatus(logsStatusUpdateDto, username);

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