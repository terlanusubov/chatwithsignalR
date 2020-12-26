using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public string SecurityStamp { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        //public ConversationStatus ConversationStatus { get; set; }
        //public int ConversationStatusId { get; set; }
        public ICollection<Participant> Participants { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
