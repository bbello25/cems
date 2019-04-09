namespace cems.API.Models.javascript
{
    public class BrowserErrorLog : BaseErrorLog
    {
        public string Headers { get; set; }
        public string SessionInfoJson { get; set; }
        public string Ip { get; set; }
        public string Protocol { get; set; }
    }
}