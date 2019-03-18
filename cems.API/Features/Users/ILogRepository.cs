using System.Threading.Tasks;
using cems.API.Helpers;
using cems.API.Models;

namespace cems.API.Features.Users
{
    public interface ILogRepository
    {
        Task<PagedList<BaseErrorLog>> GetLogs(UserParams userParams, string username);
    }
}