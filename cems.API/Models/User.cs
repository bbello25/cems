using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Models
{
    public class User : IdentityUser<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<LogEntry> LogEntries { get; set; }

        public WebApiKey WebApiKey { get; set; }
    }
}