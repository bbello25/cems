using cems.API.Models;

namespace cems.API.Features.Users
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public WebApiKey WebApiKey { get; set; }
    }
}