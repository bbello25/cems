using System;

namespace cems.API.Models
{
    public class BrowserErrorLog : ErrorLogBase
    {
        public string Name { get; set; }
        public String UserAgent { get; set; }
        public String Referer { get; set; }
        public String Origin { get; set; }
        public string SessionInfo { get; set; }
    }
}