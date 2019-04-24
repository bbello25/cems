using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Data;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using cems.API.Models.user;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NSwag.SwaggerGeneration.WebApi;

namespace cems.API.Features.LogBrowser.Services
{
    public interface IGroupService
    {
        Task<bool> AddLogToGroup(CemsLog log, GroupingReason reason);
        Task<bool> TryAddLogToGroup(CemsLog log, GroupingReason reason);

        Task<PagedList<Group>> GetUserGroups(GroupListQueryParams listQueryParams, string username);
        Task<CemsLog> GetLastLog(int id);
        Task<PagedList<CemsLog>> GetGroupItems(QueryParams queryParams, int id, string username);
        Task<Group> GetGroup(int id, string username);
    }

    class GroupService : IGroupService
    {
        private readonly DataContext m_context;
        private readonly UserManager<User> m_userManager;

        public GroupService(DataContext context, UserManager<User> userManager)
        {
            m_context = context;
            m_userManager = userManager;
        }

        public async Task<bool> TryAddLogToGroup(CemsLog log, GroupingReason reason)
        {
            bool added;
            try
            {
                added = await AddLogToGroup(log, reason);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return added;
        }

        public async Task<PagedList<Group>> GetUserGroups(GroupListQueryParams queryParams, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();

            var groups = GetUserGroupsQuery(userFromDb)
                .Include(g => g.GroupItems).AsQueryable();

            if (queryParams.OrderBy != null)
            {
                switch (queryParams.OrderBy)
                {
                    case "count":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.GroupItems.Count);
                        else
                            groups = groups.OrderByDescending(group => group.GroupItems.Count);
                        break;
                    }

                    case "firstOccured":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.FirstOccured);
                        else
                            groups = groups.OrderByDescending(group => group.FirstOccured);
                        break;
                    }

                    case "lastOccured":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.LastOccured);
                        else
                            groups = groups.OrderByDescending(group => group.LastOccured);
                        break;
                    }

                    case "groupingReason":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.GroupingReason);
                        else
                            groups = groups.OrderByDescending(group => group.GroupingReason);
                        break;
                    }

                    case "platform":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.Platform);
                        else
                            groups = groups.OrderByDescending(group => group.Platform);
                        break;
                    }

                    case "id":
                    {
                        if (queryParams.OrderByDirection != null && queryParams.OrderByDirection == "asc")
                            groups = groups.OrderBy(group => group.Id);
                        else
                            groups = groups.OrderByDescending(group => group.Id);
                        break;
                    }
                }
            }

            if (queryParams.Filter != null)
            {
                foreach (var filter in queryParams.Filter)
                {
                    var parts = filter.Split("__");
                    var attribute = parts[0];
                    var filterType = parts[1];
                    var valueString = parts[2];

                    if (attribute == "count")
                    {
                        var value = int.Parse(valueString);
                        if (filterType == "equals")
                            groups = groups.Where(g => g.GroupItems.Count == value);
                        else if (filterType == "greaterThen")
                            groups = groups.Where(g => g.GroupItems.Count > value);
                        else if (filterType == "lessThen")
                            groups = groups.Where(g => g.GroupItems.Count < value);
                    }
                    else if (attribute == "platform")
                    {
                        if (filterType == "equals" && (valueString == "1" || valueString.ToLower() == "dotnet"))
                            groups = groups.Where(g => g.Platform == Platforms.Dotnet);
                        else if (filterType == "equals" && (valueString == "2" || valueString.ToLower() == "javascript"))
                            groups = groups.Where(g => g.Platform == Platforms.Javascript);
                    }
                    else if (attribute == "groupingReason")
                    {
                        if (filterType == "equals" && (valueString == "0" || valueString.ToLower() == "samestacktrace"))
                            groups = groups.Where(g => g.GroupingReason == GroupingReason.SameStackTrace);
                        else if (filterType == "equals" && (valueString == "3" || valueString.ToLower() == "samesession"))
                            groups = groups.Where(g => g.GroupingReason == GroupingReason.SameSession);
                    }
                }
            }

            if (queryParams.GroupingReason != null)
            {
                groups = groups.Where(group => group.GroupingReason == queryParams.GroupingReason);
            }


            return await PagedList<Group>.CreateAsync(groups, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<CemsLog> GetLastLog(int id)
        {
            return await m_context.GroupItems
                .Where(gi => gi.GroupId == id)
                .Include(gi => gi.CemsLog)
                .ThenInclude(l => l.ExceptionDetails)
                .OrderByDescending(l => l.CemsLog.Timestamp)
                .Select(gi => gi.CemsLog)
                .FirstOrDefaultAsync();
        }

        public async Task<PagedList<CemsLog>>  GetGroupItems(QueryParams queryParams, int id, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            var groupToQuery = await m_context.Groups.Include(g => g.Owner).FirstOrDefaultAsync();
            if (groupToQuery.Owner.Id != userFromDb.Id && !isAdmin)
                throw new UnauthorizedAccessException($"User {username} cannot access this group");

            var logsQuery = m_context.GroupItems.Include(gi => gi.CemsLog).Where(gi => gi.GroupId == id).Select(gi => gi.CemsLog);
      
            return await PagedList<CemsLog>.CreateAsync(logsQuery, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<Group> GetGroup(int id, string username)
        {
            var userFromDb = await m_context.Users.Include(u => u.ApiKeys)
                .Where(u => u.NormalizedUserName == username.ToUpper()).FirstOrDefaultAsync();
            var isAdmin = await m_userManager.IsInRoleAsync(userFromDb, "Admin");

            var group = await m_context.Groups.Include(g => g.Owner).Include(g =>g.GroupItems).Where(g => g.Id == id).FirstOrDefaultAsync();
            if (group.Owner.Id != userFromDb.Id && !isAdmin)
                throw new UnauthorizedAccessException($"User {username} cannot access this group");

            return group;
        }


        public async Task<bool> AddLogToGroup(CemsLog log, GroupingReason reason)
        {
            var user = await m_context.Users.Where(u => u.ApiKeys.Contains(log.ApiKey)).FirstOrDefaultAsync();
            if (user == null)
                throw new ApplicationException(
                    $"Log cannot be added to group because user with api key {log.ApiKey} not found");


            var userGroupsQuery = GetUserGroupsQuery(user);
            Group group = null;
            switch (reason)
            {
                case GroupingReason.SameStackTrace:
                {
                    userGroupsQuery = userGroupsQuery.Where(g =>
                        g.GroupingReason == GroupingReason.SameStackTrace &&
                        g.GroupingContext == log.ExceptionDetails.RawStackTrace);
                    group = await userGroupsQuery.FirstOrDefaultAsync();
                    break;
                }

                case GroupingReason.SameSession:
                {
                    var jsLog = (JavascriptLog) log;
                    if (jsLog == null)
                        throw new ApplicationException($"Same session grouping is supported only for JavaScript logs");

                    userGroupsQuery = userGroupsQuery.Where(g =>
                        g.GroupingReason == GroupingReason.SameSession &&
                        g.GroupingContext == jsLog.JavascriptSessionInfo.SessionId);
                    group = await userGroupsQuery.FirstOrDefaultAsync();
                    break;
                }

                /* case GroupingReason.SameControllerAction:
                 {
                     var dotnetLog = log as DotnetLog;
                     if (dotnetLog == null)
                         throw new ApplicationException($"Same controller grouping is supported only for Dotnet logs");
 
                     userGroupsQuery = userGroupsQuery.Where(g =>
                         g.GroupingReason == GroupingReason.SameSession &&
                         g.GroupingContext == dotnetLog.DotnetExceptionDetails.DotnetStackTrace.getControllerAction());
 
                         break;
                 }*/
            }

            if (group == null)
            {
                group = CreateNewGroup(log, reason, user);
                m_context.Groups.Add(group);
            }
            else
            {
                group.LastOccured = log.Timestamp;
            }

            var groupItem = new GroupItem
            {
                Group = group,
                CemsLog = log
            };

            m_context.GroupItems.Add(groupItem);

            return await m_context.SaveChangesAsync() > 0;
        }


        private IQueryable<Group> GetUserGroupsQuery(User user)
        {
            var query = m_context.Groups.Where(grp => grp.Owner == user);

            return query;
        }

        private Group CreateNewGroup(CemsLog log, GroupingReason groupingReason, User owner)
        {
            var group = new Group
            {
                GroupingReason = groupingReason,
                FirstOccured = DateTime.Now,
                LastOccured = DateTime.Now,
                Owner = owner,
                Platform = log.Platform
            };

            switch (groupingReason)
            {
                case GroupingReason.SameStackTrace:
                {
                    group.GroupingContext = log.ExceptionDetails.RawStackTrace;
                    break;
                }

                case GroupingReason.SameSession:
                {
                    var jsLog = log as JavascriptLog;
                    if (jsLog == null)
                        throw new ApplicationException($"Same session grouping is supported only for JavaScript logs");
                    group.GroupingContext = jsLog.JavascriptSessionInfo.SessionId;
                    break;
                }

                default:
                {
                    throw new ApplicationException($"Unrecognized grouping reason {groupingReason}");
                }
            }

            return group;
        }
    }
}