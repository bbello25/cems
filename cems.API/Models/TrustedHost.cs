using Newtonsoft.Json;

namespace cems.API.Models
{
    public class TrustedHost
    {
        public int Id { get; set; }
        public string Host { get; set; }
        [JsonIgnore] public int WebApiKeyId { get; set; }
        [JsonIgnore] public WebApiKey WebApiKey { get; set; }
    }
}