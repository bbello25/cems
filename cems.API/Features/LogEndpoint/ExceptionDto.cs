using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cems.API.Features.LogEndpoint
{
    public class ExceptionDto
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public long Timestamp { get; set; }
        public string Name { get; set; }
        public string ProgLanguage { get; set; }
        public string Email { get; set; }

    }
}
