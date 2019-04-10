using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using cems.API.Data;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.csharp;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cems.API.Features.Users
{
    public class LogRepository : ILogRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public LogRepository(DataContext context, UserManager<User> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }


        public async Task<PagedList<BaseErrorLog>> GetLogList(UserParams userParams, string username)
        {
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var isAdmin = await _userManager.IsInRoleAsync(userFromDb, "Admin");

            var logs = _context.ErrorLogs.Include(log => log.WebApiKey)
                .OrderByDescending(log => log.Timestamp).GroupBy(log => log.ExceptionMessage)
                .AsQueryable();


            return null;
        }

        public async Task<PagedList<BaseErrorLog>> GetLogs(UserParams userParams, string username)
        {
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var isAdmin = await _userManager.IsInRoleAsync(userFromDb, "Admin");

            var logs = _context.ErrorLogs.Include(log => log.WebApiKey).OrderByDescending(log => log.Timestamp)
                .AsQueryable();

            if (isAdmin)
            {
                logs = _context.ErrorLogs.Include(log => log.WebApiKey)
                    .ThenInclude(webApikey => webApikey.User);
            }
            else
            {
                logs = logs.Where(log => log.WebApiKeyId == userFromDb.WebApiKey.Id);
            }

            var converted = userParams.TimeValue;
            switch (userParams.TimeUnits)
            {
                case "min":
                    converted = userParams.TimeValue / 60.0;
                    break;
                case "h":
                    converted = userParams.TimeValue * 1.0;
                    break;
                case "d":
                    converted = userParams.TimeValue * 24;
                    break;
            }

            var now = DateTime.Now;
            logs = logs.Where(log => (now - log.Timestamp).TotalHours < converted);

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "timestamp":
                        logs = logs.OrderByDescending(l => l.Timestamp);
                        break;
                    case "progLng":
                        logs = logs.OrderByDescending(l => l.ProgLanguage);
                        break;
                    case "source":
                        logs = logs.OrderByDescending(l => l.Source);
                        break;
                    case "id":
                        logs = logs.OrderByDescending(l => l.Id);
                        break;
                    default:
                        logs = logs.OrderByDescending(l => l.Timestamp);
                        break;
                }
            }            

            return await PagedList<BaseErrorLog>.CreateAsync(logs, userParams.PageNumber, userParams.PageSize);
        }

        // TODO maybe make one method for both languages
        public async Task<List<DotnetWebErrorLogWithDistance>> GetSimilarErrorLogs(DotnetWebErrorLog errorLog)
        {

            var errorlogWithDistance = _mapper.Map<DotnetWebErrorLogWithDistance>(errorLog);

            var logs = await _context.ErrorLogs.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == errorLog.WebApiKeyId && l.ProgLanguage == errorLog.ProgLanguage && l.Id != errorLog.Id)
                .ToListAsync();

            var logsWithDistance = logs.ConvertAll(log => _mapper.Map<DotnetWebErrorLogWithDistance>(log));

            logsWithDistance.ForEach(log => log.SetDistance(errorlogWithDistance));

            return logsWithDistance.Where(log => log.Distance > 0.0).OrderByDescending(log => log.Distance).ToList();
        }

        // TODO maybe make one method for both languages
        public async Task<List<BrowserErrorLogWithDistance>> GetSimilarErrorLogs(BrowserErrorLog errorLog)
        {

            var errorlogWithDistance = _mapper.Map<BrowserErrorLogWithDistance>(errorLog);

            var logs = await _context.ErrorLogs.Include(l => l.WebApiKey)
                .Where(l => l.WebApiKeyId == errorLog.WebApiKeyId && l.ProgLanguage == errorLog.ProgLanguage && l.Id != errorLog.Id)
                .ToListAsync();

            var logsWithDistance = logs.ConvertAll(log => _mapper.Map<BrowserErrorLogWithDistance>(log));

            logsWithDistance.ForEach(log => log.SetDistance(errorlogWithDistance));

            return logsWithDistance.Where(log => log.Distance > 0.0).OrderByDescending(log => log.Distance).ToList();
        }
    }
}