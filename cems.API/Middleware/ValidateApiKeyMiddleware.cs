using System.Linq;
using System.Threading.Tasks;
using cems.API.Data;
using Microsoft.AspNetCore.Http;

namespace cems.API.Middleware
{
    public class ValidateApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly DataContext _dataContext;

        public ValidateApiKeyMiddleware(RequestDelegate next, DataContext dataContext)
        {
            _next = next;
            _dataContext = dataContext;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
           //var isValid = _dataContext.Users.Where()
            
            
            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }

    }
}