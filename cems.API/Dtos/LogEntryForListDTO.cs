using System;

namespace cems.API.Dtos
{
    public class LogEntryForListDTO
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Source { get; set; }
        public DateTime Timestamp { get; set; }
        public string ProgLanguage { get; set; }
    }
}