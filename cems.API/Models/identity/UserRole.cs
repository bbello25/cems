using Microsoft.AspNetCore.Identity;

namespace cems.API.Models.identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}