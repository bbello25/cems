namespace cems.API.Models
{
    public class CemsExceptionDetailsModel
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public string Source { get; set; }
        public string RawStackTrace { get; set; }
    }
}
