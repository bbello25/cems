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

        public DbSet<ApiKey> ApiKeys { get; set; }
        public DbSet<TrustedHost> TrustedHosts { get; set; }
        public DbSet<CemsLog> Logs { get; set; }
        public DbSet<DotnetLog> DotnetLogs { get; set; }
        public DbSet<JavascriptLog> JavascriptLogs { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupItem> GroupItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //User
            modelBuilder.Entity<User>().HasMany(user => user.Groups).WithOne(group => group.Owner)
                .HasForeignKey(group => group.OwnerId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>().HasMany(user => user.ApiKeys).WithOne(apiKey => apiKey.User)
                .HasForeignKey(apiKey => apiKey.UserId).OnDelete(DeleteBehavior.Cascade);

            //UserRole
            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired().OnDelete(DeleteBehavior.Cascade);

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired().OnDelete(DeleteBehavior.Cascade);
            });

            //webApiKey
            modelBuilder.Entity<ApiKey>().HasMany(apiKey => apiKey.TrustedHosts).WithOne(th => th.ApiKey)
                .HasForeignKey(th => th.ApiKeyId).OnDelete(DeleteBehavior.Cascade);

            //TODO improve onDelete behavior
            modelBuilder.Entity<ApiKey>().HasMany(apiKey => apiKey.LogEvents).WithOne(log => log.ApiKey)
                .HasForeignKey(log => log.ApiKeyId).OnDelete(DeleteBehavior.Restrict);

            //groupItem
            modelBuilder.Entity<GroupItem>(groupItem =>
            {
                groupItem.HasKey(gi => new {gi.CemsLogId, gi.GroupId});

                groupItem
                    .HasOne(g => g.Group)
                    .WithMany(g => g.GroupItems)
                    .IsRequired()
                    .HasForeignKey(gi => gi.GroupId).OnDelete(DeleteBehavior.Cascade);

                groupItem
                    .HasOne(l => l.CemsLog)
                    .WithMany(l => l.Groups)
                    .IsRequired()
                    .HasForeignKey(gi => gi.CemsLogId).OnDelete(DeleteBehavior.Cascade);
            });


            //CemsLog
            modelBuilder.Entity<CemsLog>(log =>
            {
                log
                    .ToTable("Logs")
                    .HasDiscriminator<Platforms>("Platform")
                    .HasValue<CemsLog>(Platforms.Base)
                    .HasValue<JavascriptLog>(Platforms.Javascript)
                    .HasValue<DotnetLog>(Platforms.Dotnet);

                log.Property(e => e.ExceptionDetails).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<CemsExceptionDetails>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

            });

            //dotnetLog 
            modelBuilder.Entity<DotnetLog>(dotnetLog =>
            {
                dotnetLog.Property(e => e.DotnetApplicationInfo).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<DotnetApplicationInfo>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

                dotnetLog.Property(e => e.DotnetHttpContext).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<DotnetHttpContext>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

                dotnetLog.Property(e => e.DotnetExceptionDetails).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<DotnetExceptionDetails>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));
            });

            //javascriptLogModel
            modelBuilder.Entity<JavascriptLog>(javascriptLog =>
            {
                javascriptLog.Property(e => e.JavascriptApplicationInfo).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<JavascriptApplicationInfoModel>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

                javascriptLog.Property(e => e.JavascriptBrowserInfo).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<JavascriptBrowserInfoModel>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

                javascriptLog.Property(e => e.JavascriptExceptionDetails).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<JavascriptExceptionDetailsModel>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));

                javascriptLog.Property(e => e.JavascriptSessionInfo).HasConversion(
                    v => JsonConvert.SerializeObject(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}),
                    v => JsonConvert.DeserializeObject<JavascriptSessionInfoModel>(v,
                        new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}));
            });
        }
    }
}