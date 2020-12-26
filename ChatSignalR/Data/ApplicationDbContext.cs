using ChatSignalR.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Data
{
    public class ApplicationDbContext:IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options):base(options) { }
        public DbSet<Conversation> Conversations { get; set; }
        //public DbSet<ConversationStatus> ConversationStatuses { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Message> Messages { get; set; }

        public async Task SeedAsync(IServiceScope scope)
        {
            bool smthChanged = false;
            UserManager<AppUser> _userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            RoleManager<IdentityRole> _roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            if (!_roleManager.Roles.Any())
            {
                IdentityRole userRole = new IdentityRole();
                userRole.Name = "User";

                await _roleManager.CreateAsync(userRole);
                smthChanged = true;
            }


            if (!_userManager.Users.Any())
            {
                AppUser user1 = new AppUser()
                {
                    Name = "User1",
                    Surname = "Userov1",
                    Email = "user1@gmail.com",
                    UserName = "user1@gmail.com"
                };

                AppUser user2 = new AppUser()
                {
                    Name = "User2",
                    Surname = "Userov2",
                    Email = "user2@gmail.com",
                    UserName = "user2@gmail.com"
                };

                AppUser user3 = new AppUser()
                {
                    Name = "User3",
                    Surname = "Userov3",
                    Email = "user3@gmail.com",
                    UserName = "user3@gmail.com"
                };

                await _userManager.CreateAsync(user1, "User123@");
                await _userManager.AddToRoleAsync(user1, "User");

                await _userManager.CreateAsync(user2, "User123@");
                await _userManager.AddToRoleAsync(user2, "User");

                await _userManager.CreateAsync(user3, "User123@");
                await _userManager.AddToRoleAsync(user3, "User");

                smthChanged = true;
            }

            if (smthChanged)
                await SaveChangesAsync();

        }
    }
}
