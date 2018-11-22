using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<ErrorLogBase> LogEntries { get; set; }

        public WebApiKey WebApiKey { get; set; }
    }
}