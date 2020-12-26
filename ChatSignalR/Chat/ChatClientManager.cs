using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatSignalR.Chat
{
    public class ChatClientManager : IChatClientManager
    {
        private readonly ConcurrentDictionary<string, Client> hubUsers;
        public ChatClientManager()
        {
            hubUsers = new ConcurrentDictionary<string, Client>();
        }

        public async Task AddAsync(string userId,string connectionId)
        {
            Client client = new Client
            {
                Id = userId,
                ConnectionId = connectionId
            };
            await Task.FromResult(hubUsers.TryAdd(userId, client));
        }

        public async Task<Client> GetClientAsync(string userId)
        {
            hubUsers.TryGetValue(userId, out Client client);
            return await Task.FromResult(client);
        }

        public Task<IEnumerable<Client>> GetClients()
        {
            throw new NotImplementedException();
        }

        public async Task ChangeOnlineStatus(string userId, bool isOnline)
        {
            await Task.FromResult(hubUsers.GetValueOrDefault(userId).IsOnline = isOnline);
        }

        public async Task<bool> IsJoinedAsync(string userId)
        {
            bool result = hubUsers.ContainsKey(userId);
            return await Task.FromResult(result);
        }

        public async Task<bool> IsOnlineAsync(string userId)
        {
            hubUsers.TryGetValue(userId,out Client client);
            return await Task.FromResult(client.IsOnline);
        }

        public Task<bool> IsChattingAsync()
        {
            throw new NotImplementedException();
        }

        public async Task RemoveAsync(string userId)
        {
           await Task.FromResult(hubUsers.TryRemove(userId, out Client client));
        }
    }
}
