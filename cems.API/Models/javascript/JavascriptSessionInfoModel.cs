using System.Collections.Generic;

namespace cems.API.Models.javascript
{
    public class JavascriptSessionInfoModel
    {
        public string SessionId { get; set; }
        public double SessionDuration { get; set; }
        public ICollection<JavascriptMouseEventModel> EventHistory { get; set; }
    }
}