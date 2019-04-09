using System;
using cems.API.Models.user;
using Newtonsoft.Json;

namespace cems.API.Models
{
    public class BaseErrorLog
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; }
        public string StackTraceJson { get; set; }
        public string StackTraceRaw { get; set; }
        public string Source { get; set; }
        public DateTime Timestamp { get; set; }
        public string ProgLanguage { get; set; }
        public string Name { get; set; }

        [JsonIgnore] public int WebApiKeyId { get; set; }
        [JsonIgnore] public WebApiKey WebApiKey { get; set; }

    }
}