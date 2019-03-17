using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Primitives;

namespace cems.API.Models
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
