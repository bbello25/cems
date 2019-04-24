using System.Collections.Generic;
using cems.API.Models.identity;
using Newtonsoft.Json;

namespace cems.API.Models.user
{
    public class ApiKey
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public bool IsActive { get; set; }

        public ICollection<TrustedHost> TrustedHosts { get; set; }
        [JsonIgnore] public ICollection<CemsLog> LogEvents { get; set; }
        [JsonIgnore] public User User { get; set; }
        [JsonIgnore] public int UserId { get; set; }
    }
}