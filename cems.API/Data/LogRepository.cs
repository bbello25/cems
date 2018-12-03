using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Helpers;
using cems.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Data
{
    public class LogRepository : ILogRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public LogRepository(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<PagedList<ErrorLogBase>> GetLogs(UserParams userParams, string username)
        {
            var userFromDb = await _context.Users.Include(u => u.WebApiKey)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var isAdmin = await _userManager.IsInRoleAsync(userFromDb, "Admin");

            var logs = _context.LogEntries.Include(log => log.WebApiKey).OrderByDescending(log => log.Timestamp)
                .AsQueryable();

            if (isAdmin)
            {
                logs = _context.LogEntries.Include(log => log.WebApiKey)
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

            return await PagedList<ErrorLogBase>.CreateAsync(logs, userParams.PageNumber, userParams.PageSize);
        }
    }
}