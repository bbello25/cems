using System;

namespace cems.API.Models.javascript
{
    public class JavascriptMouseEventModel
    {
        public EventTarget Target { get; set; }
        public bool AltKey { get; set; }
        public bool MetaKey { get; set; }
        public bool CtrlKey { get; set; }
        public int Detail { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class EventTarget
    {
        public string ElementName { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }

    }
}