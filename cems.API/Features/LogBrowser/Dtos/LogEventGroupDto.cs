using System;
using cems.API.Models;

namespace cems.API.Features.LogBrowser.Dtos
{
    public class LogEventGroupDto
    {
        public int Count { get; set; }
        public string ExceptionType { get; set; }
        public string Message { get; set; }
        public string File { get; set; }
        public DateTime FirstOccurred { get; set; }
        public DateTime LastOccurred { get; set; }
        public int LastLogId { get; set; }
    }
}
