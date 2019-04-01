using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace cems.API.Models
{
    public class DotnetWebErrorLog : BaseErrorLog
    {
        public string RequestJson { get; set; }
        public string ConnectionInfoJson { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }

     
    }
}
