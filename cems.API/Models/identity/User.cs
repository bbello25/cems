using System.Collections.Generic;
using cems.API.Models.user;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Models.identity
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<CemsLogModel> LogEvents { get; set; }

        public WebApiKey WebApiKey { get; set; }
    }
}