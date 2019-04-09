using System.Collections.Generic;
using System.Threading.Tasks;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.csharp;
using cems.API.Models.javascript;

namespace cems.API.Features.Users
{
    public interface ILogRepository
    {
        Task<PagedList<BaseErrorLog>> GetLogs(UserParams userParams, string username);
        Task<List<DotnetWebErrorLogWithDistance>> GetSimilarErrorLogs(DotnetWebErrorLog errorLog);
        Task<List<BrowserErrorLogWithDistance>> GetSimilarErrorLogs(BrowserErrorLog errorLog);
    }
}