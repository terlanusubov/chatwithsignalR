using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChatSignalR.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChatSignalR
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost webHost = CreateWebHostBuilder(args).Build();
            using (IServiceScope scope = webHost.Services.CreateScope())
            {
                using (ApplicationDbContext _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                {
                    _context.SeedAsync(scope).Wait();
                }
            }

            //Seed
            //eger rol yoxdursa admin ve user rolu yarat
            //eger user yoxdursa default bir admin user yarat

            webHost.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
