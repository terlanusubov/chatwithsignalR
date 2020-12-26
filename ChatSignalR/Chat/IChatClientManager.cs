using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Chat
{
    public interface IChatClientManager
    {
        Task AddAsync(string userId,string connectionId);
        Task RemoveAsync(string userId);
        Task<bool> IsChattingAsync();
        Task<Client> GetClientAsync(string userId);
        Task<IEnumerable<Client>> GetClients();
        Task ChangeOnlineStatus(string userId, bool isOnline);
        Task<bool> IsJoinedAsync(string userId);
        Task<bool> IsOnlineAsync(string userId);
    }
}
