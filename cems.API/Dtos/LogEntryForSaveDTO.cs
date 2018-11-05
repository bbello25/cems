namespace cems.Collector.DTO
{
    public class LogEntryForSaveDTO
    {
        public string Name { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Url { get; set; }
        public string Source { get; set; }
    }
}