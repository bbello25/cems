using System.Collections.Generic;
using System.Linq;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.user;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManger;
        private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _dataContext;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext dataContext)
        {
            _userManger = userManager;
            _roleManager = roleManager;
            _dataContext = dataContext;
        }


        public void SeedUsers()
        {
            if (!_userManger.Users.Any())
            {
                var roles = new List<Role>()
                {
                    new Role {Name = "Admin"},
                    new Role {Name = "User"}
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                var generator = new ApiKeyGenerator(_dataContext);

                var webApiKey = new WebApiKey
                {
                    ApiKey = generator.GenerateApiKey()
                };

                var adminUser = new User
                {
                    UserName = "Admin",
                    WebApiKey = webApiKey
                };

                IdentityResult result = _userManger.CreateAsync(adminUser, "Pa$$w0rD").Result;

                if (result.Succeeded)
                {
                    var admin = _userManger.FindByNameAsync("Admin").Result;
                    _userManger.AddToRolesAsync(admin, new[] {"Admin"}).Wait();
                }
            }
        }
    }
}