using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace cems.API.Models
{
    public class WebApiKey
    {
        public int Id { get; set; }
        public string ApiKey { get; set; }

        public ICollection<TrustedHost> TrustedHosts { get; set; }
        public ICollection<ErrorLogBase> LogEntries { get; set; }
        
        [JsonIgnore] public User User { get; set; }
        [JsonIgnore] public int UserId { get; set; }
    }
}