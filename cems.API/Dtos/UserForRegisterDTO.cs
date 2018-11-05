using System.ComponentModel.DataAnnotations;

namespace cems.API.Dtos
{
    public class UserForRegisterDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 cahracters")]
        public string Password { get; set; }
    }
}