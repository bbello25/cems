namespace cems.Collector.DTO
{
    public class LogEntryForSaveDTO
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
    }
}