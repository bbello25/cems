using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cems.API.Features.LogEndpoint
{
    public class BrowserExceptionDto : ExceptionDto
    {
        public string Ip { get; set; }
        public string SessionInfo { get; set; }
    }
}
