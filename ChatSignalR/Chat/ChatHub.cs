using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using ChatSignalR.Extensions;
using System.Threading.Tasks;
using ChatSignalR.Data;
using Microsoft.EntityFrameworkCore;
using ChatSignalR.Models;

namespace ChatSignalR.Chat
{
    public class ChatHub : Hub
    {
        private readonly ChatClientManager clientManager;
        private readonly ApplicationDbContext context;
        public ChatHub(ChatClientManager _clientManager,
                        ApplicationDbContext _context)
        {
            clientManager = _clientManager;
            context = _context;
        }
        public async Task Join()
        {
            string connectionId = Context.ConnectionId;
            string userId = Context.UserIdentifier;
            if (userId != null && connectionId != null)
            {
                if (await clientManager.IsJoinedAsync(userId))
                    await clientManager.RemoveAsync(userId);

                await clientManager.AddAsync(userId, connectionId);
            }
        }

        // Chat sehifesine daxil olanda
        public async Task Online()
        {
            if (await clientManager.IsJoinedAsync(Context.UserIdentifier))
                await clientManager.ChangeOnlineStatus(Context.UserIdentifier, true);
        }

        // Chat sehifesinden cixanda
        public async Task Offline()
        {
            if (await clientManager.IsJoinedAsync(Context.UserIdentifier))
                await clientManager.ChangeOnlineStatus(Context.UserIdentifier, false);
        }

        public async Task SendMessage(string text, string securityStamp)
        {
            if (text != null && securityStamp != null)
            {
                string userId = Context.UserIdentifier;
                if (userId != null)
                {
                    Conversation conversation = await context.Conversations
                                                        .Include(c => c.Participants)
                                                        .ThenInclude(c=>c.AppUser)
                                                        .FirstOrDefaultAsync(c => c.SecurityStamp == securityStamp);

                    if (conversation != null)
                    {
                        string messageTo = conversation.Participants
                                                        .FirstOrDefault(c => c.AppUserId != userId)?
                                                        .AppUserId;

                        if (messageTo != null)
                        {
                            Message message = new Message
                            {
                                SenderId = userId,
                                Text = text,
                                CreatedDate = DateTime.Now,
                                ConversationId = conversation.Id,
                                Guid = Guid.NewGuid().ToString(),
                            };

                            await context.Messages.AddAsync(message);
                            await context.SaveChangesAsync();


                            Client sender = await clientManager.GetClientAsync(userId);
                            Client receiver = await clientManager.GetClientAsync(messageTo);

                            var data = new
                            {
                                text = text,
                                securityStamp = securityStamp,
                                photo = "account.png"
                            };

                            //receive message cagirilan zaman eger true dursa sagda false dursa solda gorsensin mesaj
                            await Clients.Client(sender.ConnectionId).SendAsync("ReceiveMessage", data, true);

                            if (receiver != null)
                            {
                                if (receiver.IsOnline)
                                {
                                    await Clients.Client(receiver.ConnectionId).SendAsync("ReceiveMessage", data, false);
                                    
                                    //eger yeni sohbet varsa
                                    if (await HasNewConversation(conversation))
                                    {
                                        await MakeConversationViewable(conversation);

                                        var result = new
                                        {
                                            text = text,
                                            securityStamp = securityStamp,
                                            photo = "account.png",
                                            name = conversation.Participants.FirstOrDefault(c=>c.AppUserId==userId)?.AppUser.Name,
                                            surname = conversation.Participants.FirstOrDefault(c => c.AppUserId == userId)?.AppUser.Surname,
                                            createdDate = DateTime.Now.ToString()
                                        };

                                        await Clients.Client(receiver.ConnectionId).SendAsync("MakeNewConversation", result);
                                    }

                                }
                                else
                                {

                                }
                            }


                        }
                    }

                }
            }
        }


        public async Task MakeConversationViewable(Conversation conversation)
        {
            await context.Participants.Where(c => c.ConversationId == conversation.Id).ForEachAsync(x =>
            {
                x.CanAccessConversation = true;
            });

            await context.SaveChangesAsync();
        }


        public async Task<bool> HasNewConversation(Conversation conversation)
        {
            if (await context.Participants.AnyAsync(p => p.ConversationId == conversation.Id && !p.CanAccessConversation))
                return true;
            else
                return false;

        }
    }
}
