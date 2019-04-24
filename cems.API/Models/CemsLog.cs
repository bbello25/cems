using System;
using System.Collections.Generic;
using cems.API.Models.user;
using Newtonsoft.Json;

namespace cems.API.Models
{
    public class CemsLog : ITrackable
    {
        public int Id { get; set; }
        public Platforms Platform { get; set; }
        public DateTime Timestamp { get; set; }
        public CemsExceptionDetails ExceptionDetails { get; set; }
        public CemsLog() { }
        public CemsLog(Platforms platform)
        {
            Platform = platform;
            ExceptionDetails = new CemsExceptionDetails();
            Timestamp = DateTime.Now;
        }

        [JsonIgnore] public int ApiKeyId { get; set; }
        [JsonIgnore] public ApiKey ApiKey { get; set; }

        public ICollection<GroupItem> Groups { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime StateChangedTime { get; set; }
        public TrackedState CurrentState { get; set; }
    }
}
