using System;

namespace cems.API.Dtos.EndpointDTOs
{
    public class BrowserErrorForSaveDto : ErrorForSaveBaseDto
    {
        public string Name { get; set; }
        public string UserAgent { get; set; }
        public string Origin { get; set; }
        public string Referer { get; set; }
        public string sessionInfo { get; set; }
    }
}