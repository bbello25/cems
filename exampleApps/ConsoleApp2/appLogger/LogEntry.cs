namespace appLogger
{
    public class LogEntry
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public int UserId { get; set; }
    }
}