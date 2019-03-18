using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace cems.API.Models
{
    public class BaseErrorLog
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; }
        public string StackTraceJson { get; set; }
        public string Source { get; set; }
        public DateTime Timestamp { get; set; }
        public string ProgLanguage { get; set; }

        [JsonIgnore] public int WebApiKeyId { get; set; }
        [JsonIgnore] public WebApiKey WebApiKey { get; set; }
        
        public StackTrace GetStackTrace()
        {
            var jss = JObject.Parse(StackTraceJson);
            return new StackTrace
            {
                StackFrames = jss.GetValue("MinifiedStackFrames").ToObject<StackFrame[]>(),
                LogId = Id
            };
        }
    }
}