using System.Collections.Generic;
using System.Threading.Tasks;
using cems.API.Features.LogBrowser.Dtos;
using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.javascript;

namespace cems.API.Features.LogBrowser.Services
{
    public interface ILogService
    {
        Task<PagedList<CemsLog>> GetLogs(LogListQueryParams queryParams, string username);
        Task<List<CemsLog>> GetSimilarLogs(int logId, string matchReason, string username);

        
        Task<CemsLog> GetLog(int logId, string username);
        Task<bool> AddLog(CemsLog log);
        Task<int> UpdateLogsStatus(IList<EventLogStatusUpdateDto> logsToUpdate, string username);
    }
}