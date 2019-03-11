namespace cems.API.Features.LogEndpoint
{
    public class BrowserErrorForSaveDto : ErrorForSaveBaseDto
    {
        public string Name { get; set; }
        public string SessionInfo { get; set; }
    }
}