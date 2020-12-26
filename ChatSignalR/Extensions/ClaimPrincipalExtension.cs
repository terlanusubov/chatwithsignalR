using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChatSignalR.Extensions
{
    public static class ClaimPrincipalExtension
    {
        public static string GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            try
            {
                if (claimsPrincipal is null)
                    throw new ArgumentNullException(nameof(claimsPrincipal));
                return claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            }
            catch
            {
                return null;
            }
        }
    }
}
