using cems.API.Models;

namespace cems.API.Features.LogEndpoint
{
    public class DotnetExceptionDto : ExceptionDto
    {
        public string StackTraceRaw { get; set; }

        public FilteredConnectionProperties ConnectionInfo { get; set; }
        public FilteredRequestProperties Request { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
    }
}