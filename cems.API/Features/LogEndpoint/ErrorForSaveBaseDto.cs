namespace cems.API.Features.LogCollector
{
    public class ErrorForSaveBaseDto
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public string Timestamp { get; set; }
        public string Ip { get; set; }
        public string Email { get; set; }
    }    
}