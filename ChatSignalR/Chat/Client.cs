using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Chat
{
    public class Client
    {
        public string Id { get; set; }
        public string ConnectionId { get; set; }
        public bool IsOnline { get; set; }
        public bool IsChatting { get; set; }

    }
}
