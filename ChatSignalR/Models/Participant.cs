using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Models
{
    public class Participant
    {
        public int Id { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
        public bool CanAccessConversation { get; set; }
    }
}
