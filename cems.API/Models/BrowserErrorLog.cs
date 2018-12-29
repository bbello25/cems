
namespace cems.API.Models
{
    public class BrowserErrorLog : ErrorLogBase
    {
        public string Name { get; set; }
        public string Headers { get; set; }
        public string SessionInfo { get; set; }
    }
}