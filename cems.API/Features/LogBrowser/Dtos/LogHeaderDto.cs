using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cems.API.Models;

namespace cems.API.Features.LogBrowser.Dtos
{
    public class LogHeaderDto
    {
        public int Id { get; set; }
        public Platforms Platform { get; set; }
        public DateTime Timestamp { get; set; }

        public string ExceptionMessage { get; set; }
        public  string ExceptionType { get; set; }

        public DateTime StateChangedTime { get; set; }
        public TrackedState CurrentState { get; set; }
    }
}
