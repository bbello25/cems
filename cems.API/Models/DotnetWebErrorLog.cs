namespace cems.API.Models
{
    public class DotnetWebErrorLog : BaseErrorLog
    {
        public string RequestJson { get; set; }
        public string ConnectionInfoRequest { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
    }
}
