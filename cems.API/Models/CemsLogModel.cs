using System;
using cems.API.Models.user;
using Newtonsoft.Json;

namespace cems.API.Models
{
    public class CemsLogModel : ITrackable
    {
        public int Id { get; set; }
        public Platforms Platform { get; set; }
        public DateTime Timestamp { get; set; }
        public CemsExceptionDetailsModel ExceptionDetails { get; set; }
        public CemsLogModel() { }
        public CemsLogModel(Platforms platform)
        {
            Platform = platform;
            ExceptionDetails = new CemsExceptionDetailsModel();
            Timestamp = DateTime.Now;
        }

        [JsonIgnore] public int WebApiKeyId { get; set; }
        [JsonIgnore] public WebApiKey WebApiKey { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime StateChangedTime { get; set; }
        public TrackedState CurrentState { get; set; }
    }
}
