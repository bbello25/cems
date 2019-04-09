using System.Collections.Generic;
using cems.API.Models.identity;
using Newtonsoft.Json;

namespace cems.API.Models.user
{
    public class WebApiKey
    {
        public int Id { get; set; }
        public string ApiKey { get; set; }

        public ICollection<TrustedHost> TrustedHosts { get; set; }
        public ICollection<BaseErrorLog> LogEntries { get; set; }

        [JsonIgnore] public User User { get; set; }
        [JsonIgnore] public int UserId { get; set; }
    }
}