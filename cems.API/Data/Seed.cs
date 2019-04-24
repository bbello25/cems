using System;
using System.Collections.Generic;
using System.Linq;
using cems.API.Models.identity;
using cems.API.Models.user;
using Microsoft.AspNetCore.Identity;

namespace cems.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManger;
        private readonly RoleManager<Role> _roleManager;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext dataContext)
        {
            _userManger = userManager;
            _roleManager = roleManager;
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

            

                var apiKey = new ApiKey
                {
                    Key = Guid.NewGuid().ToString("N")
                };

                var apiKeys = new List<ApiKey>();
                apiKeys.Add(apiKey);
                var adminUser = new User
                {
                    UserName = "Admin",
                    ApiKeys = apiKeys
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