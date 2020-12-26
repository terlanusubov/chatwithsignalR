using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ChatSignalR.Data;
using ChatSignalR.Enumeration;
using ChatSignalR.Extensions;
using ChatSignalR.Models;
using ChatSignalR.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatSignalR.Controllers
{
    [Authorize]
    public class ChatController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(string profileId)
        {
            string userId = User.GetUserId();
            ChatVm vm = new ChatVm()
            {
                Participants = await _context.Conversations
                                                    .Where(c => c.Participants.Any(p => p.AppUserId == userId && p.CanAccessConversation))

                                                    .Include(p => p.Participants)
                                                    .ThenInclude(p => p.AppUser)
                                                    .Include(p => p.Participants)
                                                    .ThenInclude(p => p.Conversation)

                                                    .ToAsyncEnumerable()
                                                    .Select(c => c.Participants.FirstOrDefault(p => p.AppUserId != userId))
                                                    .ToList(),

                LastMessages = await GetLastMessageOfConversation(),
                ProfileId = profileId
            };

            return View(vm);
        }

        public async Task<IActionResult> CreateConversation(string profileId)
        {

            if (profileId != null && User.GetUserId() != null)
            {

                Conversation conversation = await _context.HasConversation(profileId, User.GetUserId());
                if (conversation != null)
                {
                    await _context.Participants.Where(c => c.ConversationId == conversation.Id).ForEachAsync(x =>
                      {
                          x.CanAccessConversation = true;
                      });

                    await _context.SaveChangesAsync();

                    return RedirectToAction("Index", "Chat", new { profileId = profileId });
                }

                conversation = new Conversation()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now
                };

                await _context.Conversations.AddAsync(conversation);

                Participant participant1 = new Participant()
                {
                    AppUserId = User.GetUserId(),
                    ConversationId = conversation.Id,
                    CanAccessConversation = true
                };


                Participant participant2 = new Participant()
                {
                    AppUserId = profileId,
                    ConversationId = conversation.Id,
                    CanAccessConversation = false

                };

                await _context.Participants.AddAsync(participant1);
                await _context.Participants.AddAsync(participant2);
                await _context.SaveChangesAsync();

                return RedirectToAction("Index", "Chat", new { profileId = profileId });
            }


            return RedirectToAction("Index", "Chat");
        }


        //Ajax functions
        public async Task<JsonResult> GetConversationMessages(string securityStamp)
        {

            if (securityStamp == null)
                return Json(new
                {
                    status = (int)HttpStatusCode.BadRequest
                });


            Conversation conversation = await _context.Conversations
                                                        .Include(c=>c.Messages)
                                                        .Include(c => c.Participants)
                                                        .FirstOrDefaultAsync(c => c.SecurityStamp == securityStamp);
            if (conversation == null)
                return Json(new
                {
                    status = (int)HttpStatusCode.NotFound
                });


            string userId = User.GetUserId();
            if (userId == null || !conversation.Participants.Any(c => c.AppUserId == userId))
                return Json(new
                {
                    status = (int)HttpStatusCode.Unauthorized
                });

            return Json(new
            {
                status = (int)HttpStatusCode.OK,
                data = conversation.Messages
                                    .OrderBy(c=>c.CreatedDate)
                                    .Select(c => new
                {
                    text = c.Text,
                    appUserId = c.SenderId,
                    photo = "account.png"
                }),
                loggedUserId = userId
            });

        }


        //Functions
        public async Task<Dictionary<int, string>> GetLastMessageOfConversation()
        {
            Dictionary<int, string> keyValuePairs = new Dictionary<int, string>();
            foreach (Conversation conversation in await _context.Conversations
                                                                .Include(c => c.Messages)
                                                                .ToListAsync())
            {
                Message message = await Task.FromResult(conversation.Messages
                                                    .OrderByDescending(c => c.CreatedDate)
                                                    .FirstOrDefault());

                if (message == null)
                    continue;

                keyValuePairs.Add(conversation.Id, message.Text);
            }

            return keyValuePairs;
        }
    }
}