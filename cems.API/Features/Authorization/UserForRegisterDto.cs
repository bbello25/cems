using System.ComponentModel.DataAnnotations;

namespace cems.API.Features.Authorization
{
    public class UserForRegisterDto
    {
        [Required] public string UserName { get; set; }

        [Required] public string FirstName { get; set; }

        [Required] public string LastName { get; set; }
        [Required] public string Password { get; set; }
    }
}