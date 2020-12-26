using ChatSignalR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.ViewModels
{
    public class ChatVm
    {
        public Dictionary<int,string> LastMessages { get; set; }
        public List<Participant> Participants { get; set; }
        public string ProfileId { get; set; }
    }
}
