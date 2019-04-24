using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AjaxMinExtensions;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.LogBrowser.Dtos;
using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using static System.String;

namespace cems.API.Features.LogBrowser.Services
{
    public class LogService : ILogService
    {
        private readonly DataContext m_context;
        private readonly UserManager<User> m_userManager;
        private readonly IMapper m_mapper;
        private readonly IGroupService m_groupService;

        public LogService(DataContext context, UserManager<User> userManager, IMapper mapper,
            IGroupService groupService)
        {
            m_context = context;
            m_userManager = userManager;
            m_mapper = mapper;
            m_groupService = groupService;
        }

        public async Task<PagedList<CemsLog>> GetLogs(LogListQueryParams queryParams, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            var logs = m_context.Logs.Include(log => log.ApiKey).OrderByDescending(log => log.Timestamp)
                .AsQueryable();

            if (isAdmin)
            {
                logs = m_context.Logs.Include(log => log.ApiKey)
                    .ThenInclude(webApikey => webApikey.User);
            }
            else
            {
                //TODO
                /* logs = logs.Where(log =>  userFromDb.ApiKeys.Contains(userFromDb.ApiKey) );*/
            }

            var converted = queryParams.TimeValue;
            switch (queryParams.TimeUnits)
            {
                case "min":
                    converted = queryParams.TimeValue / 60.0;
                    break;
                case "h":
                    converted = queryParams.TimeValue * 1.0;
                    break;
                case "d":
                    converted = queryParams.TimeValue * 24;
                    break;
            }

            var now = DateTime.Now;
            logs = logs.Where(log => (now - log.Timestamp).TotalHours < converted);

            if (!IsNullOrEmpty(queryParams.OrderBy))
            {
                switch (queryParams.OrderBy)
                {
                    case "timestamp":
                        logs = logs.OrderByDescending(l => l.Timestamp);
                        break;
                    case "progLng":
                        logs = logs.OrderByDescending(l => l.Platform);
                        break;
                    case "source":
                        logs = logs.OrderByDescending(l => l.ExceptionDetails);
                        break;
                    case "id":
                        logs = logs.OrderByDescending(l => l.Id);
                        break;
                    default:
                        logs = logs.OrderByDescending(l => l.Timestamp);
                        break;
                }
            }

            return await PagedList<CemsLog>.CreateAsync(logs, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<List<CemsLog>> GetSimilarLogs(int logId, string matchReason, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var log = await m_context.Logs.Include(l => l.ApiKey)
                .Where(l => userFromDb.ApiKeys.Contains(l.ApiKey) && l.Id == logId).FirstOrDefaultAsync();

            List<CemsLog> logs = new List<CemsLog>();
            if (log.Platform == Platforms.Dotnet)
            {
                logs = await GetSimilarLogs(log as DotnetLog, matchReason);
            }

            if (log.Platform == Platforms.Javascript)
            {
                logs = await GetSimilarLogs(log as JavascriptLog, matchReason);
            }

            return logs;
        }

        private async Task<List<CemsLog>> GetSimilarLogs(DotnetLog dotnetLog, string matchReason)
        {
            var logs = await m_context.DotnetLogs.Include(l => l.ApiKey)
                .Where(l => l.ApiKeyId == dotnetLog.ApiKeyId && l.Platform == dotnetLog.Platform &&
                            l.Id != dotnetLog.Id)
                .ToListAsync();


            logs.ForEach(log =>
                log.DotnetExceptionDetails.DotnetStackTrace.SetDistance(
                    log.DotnetExceptionDetails.DotnetStackTrace));

            return logs.Where(log => log.DotnetExceptionDetails.DotnetStackTrace.Distance > 0.0)
                .OrderByDescending(log => log.DotnetExceptionDetails.DotnetStackTrace.Distance)
                .Cast<CemsLog>().ToList();
        }

        public async Task<List<CemsLog>> GetSimilarLogs(JavascriptLog jsLog, string matchReason)
        {
            var logsQuery = m_context.JavascriptLogs.Include(l => l.ApiKey)
                .Where(l => l.ApiKeyId == jsLog.ApiKeyId
                            && l.Platform == jsLog.Platform
                            && l.Id != jsLog.Id)
                .Cast<JavascriptLog>();

            if (matchReason == "sessionId")
            {
                logsQuery = logsQuery.Where(l =>
                    l.JavascriptSessionInfo.SessionId == jsLog.JavascriptSessionInfo.SessionId);
            }

            var logs = await logsQuery.Where(l => l.JavascriptExceptionDetails.JavascriptStackTrace != null)
                .ToListAsync();

            logs.ForEach(log =>
                log.JavascriptExceptionDetails.JavascriptStackTrace.SetDistance(jsLog.JavascriptExceptionDetails
                    .JavascriptStackTrace));

            return logs.Where(log => log.JavascriptExceptionDetails.JavascriptStackTrace.Distance > 0.0)
                .OrderByDescending(log => log.JavascriptExceptionDetails.JavascriptStackTrace.Distance)
                .Cast<CemsLog>().ToList();
        }

        public async Task<CemsLog> GetLog(int logId, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            CemsLog log;
            if (isAdmin)
            {
                log = await m_context.Logs.FirstOrDefaultAsync(l => l.Id == logId);
            }
            else
            {
                log = await m_context.Logs.Include(l => l.ApiKey)
                    .Where(l => userFromDb.ApiKeys.Contains(l.ApiKey) && l.Id == logId).FirstOrDefaultAsync();
            }

            return log;
        }

        public async Task<bool> AddLog(CemsLog log)
        {
            m_context.Logs.Add(log);
            var saved = await m_context.SaveChangesAsync() > 0;
            if (!saved) return false;

            if (!IsNullOrWhiteSpace(log.ExceptionDetails.RawStackTrace))
            {
                await m_groupService.TryAddLogToGroup(log, GroupingReason.SameStackTrace);
            }

            var jsLog = log as JavascriptLog;
            if (jsLog != null && !IsNullOrWhiteSpace(jsLog.JavascriptSessionInfo.SessionId))
            {
                await m_groupService.TryAddLogToGroup(log, GroupingReason.SameSession);
            }

            return true;
        }

        public async Task<int> UpdateLogsStatus(IList<EventLogStatusUpdateDto> logsToUpdate, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            foreach (var logStatusUpdateDto in logsToUpdate)
            {
                CemsLog log;
                if (isAdmin)
                {
                    log = await m_context.Logs.FirstOrDefaultAsync(l => l.Id == logStatusUpdateDto.Id);
                }
                else
                {
                    log = await m_context.Logs.Include(l => l.ApiKey)
                        .Where(l => userFromDb.ApiKeys.Contains(l.ApiKey) && l.Id == logStatusUpdateDto.Id)
                        .FirstOrDefaultAsync();
                }

                if (log == null ||
                    logStatusUpdateDto.NewState < TrackedState.Undisplayed ||
                    logStatusUpdateDto.NewState > TrackedState.Deleted ||
                    logStatusUpdateDto.NewState == log.CurrentState)
                    continue;

                log.CurrentState = logStatusUpdateDto.NewState;
                log.StateChangedTime = DateTime.Now;
                m_context.Logs.Update(log);
            }

            var numberOfUpdated = await m_context.SaveChangesAsync();

            return numberOfUpdated;
        }
    }
}