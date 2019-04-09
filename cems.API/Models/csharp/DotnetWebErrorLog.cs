namespace cems.API.Models.csharp
{
    public class DotnetWebErrorLog : BaseErrorLog
    {
        public string RequestJson { get; set; }
        public string ConnectionInfoJson { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }

     
    }
}
