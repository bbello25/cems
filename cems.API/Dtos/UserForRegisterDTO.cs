using System.ComponentModel.DataAnnotations;

namespace cems.API.Dtos
{
    public class UserForRegisterDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}