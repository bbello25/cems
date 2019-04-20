using cems.API.Models;

namespace cems.API.Features.LogBrowser.Dtos
{
    public class EventLogStatusUpdateDto
    {
        public int Id { get; set; }
        public TrackedState NewState { get; set; }
    }
}
