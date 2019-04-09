
using System.Collections.Generic;
using Microsoft.AspNetCore.Http.Features;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace cems.API.Models.javascript
{
    public class BrowserStackTrace
    {
        public List<CemsStackFrame> MinifiedStackFrames { get; set; }
        public List<DeminifiedBrowserStackFrame> DeminifiedStackFrames { get; set; }

        public BrowserStackTrace(string stackTraceJson)
        {
            var json = JsonConvert.DeserializeObject(stackTraceJson) as JObject;

            var minifiedStackFramesJArray = json.GetValue("minifiedStackFrames") as JArray;
            this.MinifiedStackFrames = parseMinifiedStackTrackFrames(minifiedStackFramesJArray);

            var deminifiedStackFramesResultJArray = json.GetValue("deminifiedStackFrameResults") as JArray;
            this.DeminifiedStackFrames = parseDeminifiedStackTrackFrames(deminifiedStackFramesResultJArray);
        }

        private List<CemsStackFrame> parseMinifiedStackTrackFrames(JArray minifiedStackFramesJArray)
        {
            List<CemsStackFrame> newStackFrames = new List<CemsStackFrame>();
            foreach (JObject item in minifiedStackFramesJArray)
            {
                var stackFrame = new CemsStackFrame();
                stackFrame.File = item.GetValue("filePath").ToString();
                stackFrame.Method = item.GetValue("methodName").ToString();
                var source = item.GetValue("sourcePosition") as JObject;
                if (source != null)
                {
                    stackFrame.Line = (int)source.GetValue("zeroBasedLineNumber");
                    stackFrame.Column = (int)source.GetValue("zeroBasedColumnNumber");
                }
                newStackFrames.Add(stackFrame);
            }
            return newStackFrames;
        }

        private List<DeminifiedBrowserStackFrame> parseDeminifiedStackTrackFrames(JArray deminifiedStackFramesJArray)
        {
            List<DeminifiedBrowserStackFrame> newStackFrames = new List<DeminifiedBrowserStackFrame>();

            foreach (JObject item in deminifiedStackFramesJArray)
            {
                var stackFrame = new DeminifiedBrowserStackFrame();
                stackFrame.DeminificationError = (int)item.GetValue("deminificationError");
                var deminifiedStackFrameJObject = item.GetValue("deminifiedStackFrame") as JObject;
                if (deminifiedStackFrameJObject != null)
                {
                    stackFrame.SourceCode = deminifiedStackFrameJObject.GetValue("sourceCode").ToString();
                    stackFrame.File = deminifiedStackFrameJObject.GetValue("filePath").ToString();
                    stackFrame.Method = deminifiedStackFrameJObject.GetValue("methodName").ToString();
                    var source = deminifiedStackFrameJObject.GetValue("sourcePosition") as JObject;
                    if (source != null)
                    {
                        stackFrame.Line = (int)source.GetValue("zeroBasedLineNumber");
                        stackFrame.Column = (int)source.GetValue("zeroBasedColumnNumber");
                    }
                }

                newStackFrames.Add(stackFrame);
            }
            return newStackFrames;
        }
    }
}
