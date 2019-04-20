using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using cems.API.Data;
using cems.API.Features.LogBrowser.Services;
using cems.API.Features.LogEndpoint;
using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace cems.API.Features.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogController : ControllerBase
    {
        private readonly DataContext m_context;
        private readonly UserManager<User> m_userManager;
        private readonly ILogService m_logService;
        private readonly IStackTraceDeminifierService m_deminifier;

        public UserLogController(DataContext context, UserManager<User> userManager, ILogService logService,
            IStackTraceDeminifierService deminifier)
        {
            m_context = context;
            m_userManager = userManager;
            m_logService = logService;
            m_deminifier = deminifier;
        }
    }
}