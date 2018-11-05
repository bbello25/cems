using cems.API.Models;

namespace cems.API.Dtos
{
    public class UserForDetailedDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public WebApiKey WebApiKey { get; set; }
    }
}