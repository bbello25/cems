using Newtonsoft.Json.Linq;

namespace cems.API.Models
{
    public class BrowserErrorLog : BaseErrorLog
    {
        public string Headers { get; set; }
        public string SessionInfo { get; set; }
        public string Ip { get; set; }
        public string Protocol { get; set; }
    }
}