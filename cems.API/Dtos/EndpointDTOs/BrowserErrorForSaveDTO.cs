using System;

namespace cems.API.Dtos.EndpointDTOs
{
    public class BrowserErrorForSaveDto : ErrorForSaveBaseDto
    {
        public string Name { get; set; }
        public string SessionInfo { get; set; }
    }
}