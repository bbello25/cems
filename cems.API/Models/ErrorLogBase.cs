using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace cems.API.Models
{
    public class ErrorLogBase
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public DateTime Timestamp { get; set; }
        public string ProgLanguage { get; set; }
        public string Protocol { get; set; }
        public string Ip { get; set; }

        [JsonIgnore] public int WebApiKeyId { get; set; }
        [JsonIgnore] public WebApiKey WebApiKey { get; set; }
        
        public StackTrace GetStackTrace()
        {
            var jss = JObject.Parse(StackTrace);
            return new StackTrace
            {
                StackFrames = jss.GetValue("MinifiedStackFrames").ToObject<StackFrame[]>(),
                LogId = Id
            };
        }
    }
}