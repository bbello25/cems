using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Models.identity
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}