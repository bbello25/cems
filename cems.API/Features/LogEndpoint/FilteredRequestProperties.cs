using System.Collections.Generic;

namespace cems.API.Features.LogEndpoint
{
    public class FilteredRequestProperties
    {
        public string Body { get; set; }
        public IDictionary<string, string[] > Headers { get; set; }
        public string Host { get; set; }
        public bool IsHttps { get; set; }
        public string Method { get; set; }
        public string Path { get; set; }
        public string PathBase { get; set; }
        public string Protocol { get; set; }
        public string Query { get; set; }
        public string QueryString { get; set; }
        public string Scheme { get; set; }

    }
}
