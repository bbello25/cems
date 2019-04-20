using System.Text;
using AutoMapper;
using cems.API.Data;
using cems.API.Features.LogBrowser.Services;
using cems.API.Features.LogEndpoint;
using cems.API.Features.Users;
using cems.API.Helpers;
using cems.API.Models;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

namespace cems.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(connString));

            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IStackTraceDeminifierService, StackTraceDeminifierService>();

            var builder = services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequireDigit = true;
                opt.Password.RequiredLength = 6;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireLowercase = true;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            builder.AddEntityFrameworkStores<DataContext>();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            });

            services.AddCors();
            services.AddAutoMapper();
            services.AddTransient<Seed>();

            services.AddMvc(options =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();
                    options.Filters.Add(new AuthorizeFilter(policy));
                }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                })
                .AddFeatureFolders();
            
            services.AddSwaggerDocument();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async contex =>
                    {
                        contex.Response.StatusCode = (int) System.Net.HttpStatusCode.InternalServerError;

                        var error = contex.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            contex.Response.AddApplicationError(error.Error.Message);
                            await contex.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            seeder.SeedUsers();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUi3();
            
            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Fallback", action = "Index"}
                );
            });
        }
    }
}