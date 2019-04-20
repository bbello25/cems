using cems.API.Features.LogEndpoint.dotnet.Models;
using cems.API.Models;
using cems.API.Models.dotnet;
using cems.API.Models.identity;
using cems.API.Models.javascript;
using cems.API.Models.user;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cems.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<WebApiKey> WebApiKeys { get; set; }
        public DbSet<TrustedHost> TrustedHosts { get; set; }

        public DbSet<CemsLogModel> LogEvents { get; set; }
        public DbSet<DotnetLogModel> DotnetLogEvents { get; set; }
        public DbSet<JavascriptLogModel> JavascriptLogEvents { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            modelBuilder.Entity<User>(user => { user.HasOne(u => u.WebApiKey).WithOne(w => w.User).IsRequired(); });

            modelBuilder.Entity<WebApiKey>(webApiKey =>
            {
                webApiKey.HasOne(w => w.User).WithOne(u => u.WebApiKey).HasForeignKey<WebApiKey>(w => w.UserId)
                    .IsRequired();

                webApiKey.HasOne(w => w.User).WithOne(u => u.WebApiKey).IsRequired();
                webApiKey.HasMany(w => w.TrustedHosts).WithOne(t => t.WebApiKey);
                webApiKey.HasMany(w => w.LogEvents).WithOne(t => t.WebApiKey);
            });

            modelBuilder.Entity<TrustedHost>(trustedHost =>
            {
                trustedHost.HasOne(t => t.WebApiKey).WithMany(w => w.TrustedHosts)
                    .HasForeignKey(t => t.WebApiKeyId);
            });

            modelBuilder.Entity<CemsLogModel>(logEntry =>
            {
                logEntry.HasOne(e => e.WebApiKey).WithMany(w => w.LogEvents);
            });

            modelBuilder.Entity<CemsLogModel>()
                .ToTable("LogEvents")
                .HasDiscriminator<Platforms>("Platform")
                .HasValue<CemsLogModel>(Platforms.Base)
                .HasValue<JavascriptLogModel>(Platforms.Javascript)
                .HasValue<DotnetLogModel>(Platforms.Dotnet);

            modelBuilder.Entity<CemsLogModel>().Property(e => e.ExceptionDetails).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                v => JsonConvert.DeserializeObject<CemsExceptionDetailsModel>(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));


            modelBuilder.Entity<DotnetLogModel>().Property(e => e.DotnetApplicationInfo).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                v => JsonConvert.DeserializeObject<DotnetApplicationInfoModel>(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

            modelBuilder.Entity<DotnetLogModel>().Property(e => e.DotnetHttpContext).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                v => JsonConvert.DeserializeObject<DotnetHttpContextModel>(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

            modelBuilder.Entity<DotnetLogModel>().Property(e => e.DotnetExceptionDetails).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                v => JsonConvert.DeserializeObject<DotnetExceptionDetailsModel>(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));



            modelBuilder.Entity<JavascriptLogModel>().Property(e => e.JavascriptApplicationInfo).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                v => JsonConvert.DeserializeObject<JavascriptApplicationInfoModel>(v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

            modelBuilder.Entity<JavascriptLogModel>().Property(e => e.JavascriptBrowserInfo).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<JavascriptBrowserInfoModel>(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));

            modelBuilder.Entity<JavascriptLogModel>().Property(e => e.JavascriptExceptionDetails).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<JavascriptExceptionDetailsModel>(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));

            modelBuilder.Entity<JavascriptLogModel>().Property(e => e.JavascriptSessionInfo).HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<JavascriptSessionInfoModel>(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));

        }
    }
}