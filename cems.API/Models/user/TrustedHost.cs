using Newtonsoft.Json;

namespace cems.API.Models.user
{
    public class TrustedHost
    {
        public int Id { get; set; }
        public string Host { get; set; }

        [JsonIgnore] public ApiKey ApiKey { get; set; }
        [JsonIgnore] public int ApiKeyId { get; set; }
    }
}