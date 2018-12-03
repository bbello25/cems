using System.Threading.Tasks;
using cems.API.Helpers;
using cems.API.Models;

namespace cems.API.Data
{
    public interface ILogRepository
    {
        Task<PagedList<ErrorLogBase>> GetLogs(UserParams userParams, string username);
    }
}