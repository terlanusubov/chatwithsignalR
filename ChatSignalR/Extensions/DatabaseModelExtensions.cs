using ChatSignalR.Data;
using ChatSignalR.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Extensions
{
    public static class DatabaseModelExtensions
    {
        public static async Task<Conversation> HasConversation(this ApplicationDbContext _context, string profileId,string userId)
        {
            Conversation con = await _context.Conversations.FirstOrDefaultAsync(c =>
                                                   c.Participants.Any(cc => cc.AppUserId == profileId)
                                                   &&
                                                   c.Participants.Any(cc => cc.AppUserId == userId));
            return con;
        }
    }
}
