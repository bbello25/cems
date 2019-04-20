using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.LogBrowser.Dtos;
using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Features.LogBrowser.Services
{
    public class LogService : ILogService
    {
        private readonly DataContext m_context;
        private readonly UserManager<User> m_userManager;
        private readonly IMapper m_mapper;

        public LogService(DataContext context, UserManager<User> userManager, IMapper mapper)
        {
            this.m_context = context;
            this.m_userManager = userManager;
            this.m_mapper = mapper;
        }

        public async Task<PagedList<CemsLogModel>> GetLogs(QueryParams queryParams, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            var logs = m_context.LogEvents.Include(log => log.WebApiKey).OrderByDescending(log => log.Timestamp)
                .AsQueryable();

            if (isAdmin)
            {
                logs = m_context.LogEvents.Include(log => log.WebApiKey)
                    .ThenInclude(webApikey => webApikey.User);
            }
            else
            {
                logs = logs.Where(log => log.WebApiKeyId == userFromDb.WebApiKey.Id);
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

            if (!string.IsNullOrEmpty(queryParams.OrderBy))
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

            return await PagedList<CemsLogModel>.CreateAsync(logs, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<PagedList<LogEventGroupDto>> GetLogGroups(QueryParams queryParams, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            var dotnetLogs = m_context.DotnetLogEvents.Include(log => log.WebApiKey).AsQueryable();
            var javascriptLogs = m_context.JavascriptLogEvents.Include(log => log.WebApiKey).AsQueryable();


            if (isAdmin)
            {
                dotnetLogs = dotnetLogs.Include(log => log.WebApiKey).ThenInclude(webApikey => webApikey.User);
                javascriptLogs = javascriptLogs.Include(log => log.WebApiKey).ThenInclude(webApikey => webApikey.User);
            }
            else
            {
                dotnetLogs = dotnetLogs.Where(log => log.WebApiKeyId == userFromDb.WebApiKey.Id);
                javascriptLogs = javascriptLogs.Where(log => log.WebApiKeyId == userFromDb.WebApiKey.Id);
            }


            var dotnetGroups = dotnetLogs.GroupBy(dotnetLog => dotnetLog.ExceptionDetails.RawStackTrace,
                (key, group) => new LogEventGroupDto
                {
                    Count = group.Count(),
                    ExceptionType = group.ElementAt(0).ExceptionDetails.Type,
                    Message = group.ElementAt(0).ExceptionDetails.Message,
                    FirstOccurred = group.Min(l => l.Timestamp),
                    LastOccurred = group.Max(l => l.Timestamp),
                    File = group.ElementAt(0).DotnetExceptionDetails.DotnetStackTrace
                        .GetNormalizedExceptionLocation(),
                    LastLogId = group.ElementAt(0).Id
                });

            var javascriptGroups = javascriptLogs.GroupBy(javascriptLog => javascriptLog.ExceptionDetails.RawStackTrace,
                (key, group) => new LogEventGroupDto
                {
                    Count = group.Count(),
                    ExceptionType = group.ElementAt(0).ExceptionDetails.Type,
                    Message = group.ElementAt(0).ExceptionDetails.Message,
                    FirstOccurred = group.Min(l => l.Timestamp),
                    LastOccurred = group.Max(l => l.Timestamp),
                    File = group.ElementAt(0).JavascriptExceptionDetails.JavascriptStackTrace
                        .GetNormalizedExceptionLocation(),
                    LastLogId = group.ElementAt(0).Id
                });

            //union and concat not works if one array is empty?
            IQueryable<LogEventGroupDto> union = null;
            if (dotnetGroups.Any() && javascriptGroups.Any())
            {
                union = dotnetGroups.Concat(javascriptGroups);
            }
            else if (dotnetGroups.Any())
            {
                union = dotnetGroups;
            }
            else if (javascriptGroups.Any())
            {
                union = javascriptGroups;
            }

            if (union != null)
            {
                union = union.OrderByDescending(group => group.Count);
                return await PagedList<LogEventGroupDto>.CreateAsync(union, queryParams.PageNumber,
                    queryParams.PageSize);
            }

            return null;
        }

        public async Task<List<CemsLogModel>> GetSimilarLogs(int logId, string matchReason, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var log = await m_context.LogEvents.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id && l.Id == logId).FirstOrDefaultAsync();

            List<CemsLogModel> logs = new List<CemsLogModel>();
            if (log.Platform == Platforms.Dotnet)
            {
                logs = await GetSimilarLogs(log as DotnetLogModel, matchReason);
            }

            if (log.Platform == Platforms.Javascript)
            {
                logs = await GetSimilarLogs(log as JavascriptLogModel, matchReason);
            }

            return logs;
        }

        private async Task<List<CemsLogModel>> GetSimilarLogs(DotnetLogModel logModel, string matchReason)
        {
            var logs = await m_context.DotnetLogEvents.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == logModel.WebApiKeyId && l.Platform == logModel.Platform &&
                            l.Id != logModel.Id)
                .ToListAsync();


            logs.ForEach(log =>
                log.DotnetExceptionDetails.DotnetStackTrace.SetDistance(
                    logModel.DotnetExceptionDetails.DotnetStackTrace));

            return logs.Where(log => log.DotnetExceptionDetails.DotnetStackTrace.Distance > 0.0)
                .OrderByDescending(log => log.DotnetExceptionDetails.DotnetStackTrace.Distance)
                .Cast<CemsLogModel>().ToList();
        }

        public async Task<List<CemsLogModel>> GetSimilarLogs(JavascriptLogModel logModel, string matchReason)
        {

            var logsQuery = m_context.JavascriptLogEvents.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == logModel.WebApiKeyId
                            && l.Platform == logModel.Platform
                            && l.Id != logModel.Id)
                .Cast<JavascriptLogModel>();

            if (matchReason == "sessionId")
            {
                logsQuery = logsQuery.Where(l =>
                    l.JavascriptSessionInfo.SessionId == logModel.JavascriptSessionInfo.SessionId);
            }

            var logs = await logsQuery.Where(l=>l.JavascriptExceptionDetails.JavascriptStackTrace != null).ToListAsync();

            logs.ForEach(log =>
                log.JavascriptExceptionDetails.JavascriptStackTrace.SetDistance(logModel.JavascriptExceptionDetails
                    .JavascriptStackTrace));

            return logs.Where(log => log.JavascriptExceptionDetails.JavascriptStackTrace.Distance > 0.0)
                .OrderByDescending(log => log.JavascriptExceptionDetails.JavascriptStackTrace.Distance)
                .Cast<CemsLogModel>().ToList();
        }

        public async Task<CemsLogModel> GetLog(int logId, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            CemsLogModel log;
            if (isAdmin)
            {
                log = await m_context.LogEvents.FirstOrDefaultAsync(l => l.Id == logId);
            }
            else
            {
                log = await m_context.LogEvents.Include(l => l.WebApiKey)
                    .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id && l.Id == logId).FirstOrDefaultAsync();
            }

            return log;
        }

        public async Task<bool> AddLog(CemsLogModel logModel)
        {
            m_context.LogEvents.Add(logModel);
            return await m_context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<int> UpdateLogsStatus(IList<EventLogStatusUpdateDto> logsToUpdate, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            foreach (var logStatusUpdateDto in logsToUpdate)
            {
                CemsLogModel log;
                if (isAdmin)
                {
                    log = await m_context.LogEvents.FirstOrDefaultAsync(l => l.Id == logStatusUpdateDto.Id);
                }
                else
                {
                    log = await m_context.LogEvents.Include(l => l.WebApiKey)
                        .Where(l => l.WebApiKeyId == userFromDb.WebApiKey.Id && l.Id == logStatusUpdateDto.Id)
                        .FirstOrDefaultAsync();
                }

                if (log == null ||
                    logStatusUpdateDto.NewState < TrackedState.Undisplayed ||
                    logStatusUpdateDto.NewState > TrackedState.Deleted ||
                    logStatusUpdateDto.NewState == log.CurrentState)
                    continue;

                log.CurrentState = logStatusUpdateDto.NewState;
                log.StateChangedTime = DateTime.Now;
                m_context.LogEvents.Update(log);
            }

            var numberOfUpdated = await m_context.SaveChangesAsync();

            return numberOfUpdated;
        }
    }
}