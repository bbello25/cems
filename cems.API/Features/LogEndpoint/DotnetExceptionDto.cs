using cems.API.Models;

namespace cems.API.Features.LogEndpoint
{
    public class DotnetExceptionDto
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string StackTraceRaw { get; set; }
        public string Source { get; set; }
        public string Name { get; set; }
        public long Timestamp { get; set; }
        public string ProgLanguage { get; set; }
        public FilteredConnectionProperties ConnectionInfo { get; set; }
        public FilteredRequestProperties Request { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
    }
}