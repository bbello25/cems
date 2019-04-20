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
        Task<PagedList<CemsLogModel>> GetLogs(QueryParams queryParams, string username);
        Task<PagedList<LogEventGroupDto>> GetLogGroups(QueryParams queryParams, string username);

        Task<List<CemsLogModel>> GetSimilarLogs(int logId, string matchReason, string username);

        //Task<List<CemsLogModel>> GetSimilarLogs(DotnetLogModel logModel, string matchReason, string username);

        //Task<List<CemsLogModel>> GetSimilarErrorLogs(JavascriptLogModel errorLog, string matchReason,
        //    string username);

        Task<CemsLogModel> GetLog(int logId, string username);
        Task<bool> AddLog(CemsLogModel log);
        Task<int> UpdateLogsStatus(IList<EventLogStatusUpdateDto> logsToUpdate, string username);
    }
}