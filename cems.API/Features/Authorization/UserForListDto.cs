
using System.Collections.Generic;
using cems.API.Models.user;

namespace cems.API.Features.Authorization
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public ICollection<ApiKey> ApiKeys { get; set; }
    }
}