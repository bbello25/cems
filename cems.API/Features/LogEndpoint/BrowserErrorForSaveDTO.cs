
namespace cems.API.Features.LogCollector
{
    public class BrowserErrorForSaveDto : ErrorForSaveBaseDto
    {
        public string Name { get; set; }
        public string SessionInfo { get; set; }
    }
}