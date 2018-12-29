using cems.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cems.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<ErrorLogBase> LogEntries { get; set; }
        public DbSet<WebApiKey> WebApiKeys { get; set; }
        public DbSet<TrustedHost> TrustedHosts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    @"Server=tcp:bel0104.database.windows.net,1433;Initial Catalog=cems;Persist Security Info=False;User ID=cems;Password=Bello1+25B;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }*/
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
                webApiKey.HasMany(w => w.LogEntries).WithOne(t => t.WebApiKey);
            });

            modelBuilder.Entity<TrustedHost>(trustedHost =>
            {
                trustedHost.HasOne(t => t.WebApiKey).WithMany(w => w.TrustedHosts)
                    .HasForeignKey(t => t.WebApiKeyId);
            });

            modelBuilder.Entity<ErrorLogBase>(logEntry =>
            {
                logEntry.HasOne(e => e.WebApiKey).WithMany(w => w.LogEntries);
            });

            modelBuilder.Entity<ErrorLogBase>()
                .ToTable("ErrorLog")
                .HasDiscriminator<int>("ErrorLogType")
                .HasValue<ErrorLogBase>(1)
                .HasValue<BrowserErrorLog>(2);


        }
    }
}