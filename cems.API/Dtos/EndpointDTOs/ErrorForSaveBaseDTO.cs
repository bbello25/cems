using System;

namespace cems.API.Dtos.EndpointDTOs
{
    public class ErrorForSaveBaseDto
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public string Timestamp { get; set; }
    }
}