using System;

namespace cems.API.Features.Users
{
    public class SimilarLogDto
    {
        public int Id { get; set; }
        
        public double Distance { get; set; }
        
        public DateTime Timestamp { get; set; }
        
        public string Source { get; set; }
    }
}