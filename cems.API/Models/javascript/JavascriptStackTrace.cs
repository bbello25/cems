using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SourcemapToolkit.CallstackDeminifier.Core;

namespace cems.API.Models.javascript
{
    public class JavascriptStackTrace
    {
        public List<CemsStackFrameModel> MinifiedStackFrames { get; set; }
        public List<JavascriptDeminifiedStackFrameModel> DeminifiedStackFrames { get; set; }
        public double Distance { get; set; }
        public static JavascriptStackTrace FromJsonString(string stackTraceJson)
        {
            var stackTrace = new JavascriptStackTrace();
            var json = JsonConvert.DeserializeObject(stackTraceJson) as JObject;

            var minifiedStackFramesJArray = json.GetValue("MinifiedStackFrames") as JArray;
            stackTrace.MinifiedStackFrames = parseMinifiedStackTrackFrames(minifiedStackFramesJArray);

            var deminifiedStackFramesResultJArray = json.GetValue("DeminifiedStackFrameResults") as JArray;
            stackTrace.DeminifiedStackFrames = parseDeminifiedStackTrackFrames(deminifiedStackFramesResultJArray);
            return stackTrace;
        }

        private static List<CemsStackFrameModel> parseMinifiedStackTrackFrames(JArray minifiedStackFramesJArray)
        {
            List<CemsStackFrameModel> newStackFrames = new List<CemsStackFrameModel>();
            foreach (JObject item in minifiedStackFramesJArray)
            {
                var stackFrame = new CemsStackFrameModel();
                stackFrame.File = item.GetValue("FilePath").ToString();
                stackFrame.Method = item.GetValue("MethodName").ToString();
                var source = item.GetValue("sourcePosition") as JObject;
                if (source != null)
                {
                    stackFrame.Line = (int) source.GetValue("ZeroBasedLineNumber");
                    stackFrame.Column = (int) source.GetValue("ZeroBasedColumnNumber");
                }

                newStackFrames.Add(stackFrame);
            }

            return newStackFrames;
        }

        private static List<JavascriptDeminifiedStackFrameModel> parseDeminifiedStackTrackFrames(JArray deminifiedStackFramesJArray)
        {
            List<JavascriptDeminifiedStackFrameModel> newStackFrames = new List<JavascriptDeminifiedStackFrameModel>();

            foreach (JObject item in deminifiedStackFramesJArray)
            {
                var stackFrame = new JavascriptDeminifiedStackFrameModel();
                stackFrame.DeminificationError = (int) item.GetValue("DeminificationError");
                var deminifiedStackFrameJObject = item.GetValue("DeminifiedStackFrame") as JObject;
                if (deminifiedStackFrameJObject != null)
                {
                    stackFrame.SourceCode = deminifiedStackFrameJObject.GetValue("SourceCode").ToString();
                    stackFrame.File = deminifiedStackFrameJObject.GetValue("FilePath").ToString();
                    stackFrame.Method = deminifiedStackFrameJObject.GetValue("MethodName").ToString();
                    var source = deminifiedStackFrameJObject.GetValue("SourcePosition") as JObject;
                    if (source != null)
                    {
                        stackFrame.Line = (int) source.GetValue("ZeroBasedLineNumber");
                        stackFrame.Column = (int) source.GetValue("ZeroBasedColumnNumber");
                    }
                }

                newStackFrames.Add(stackFrame);
            }

            return newStackFrames;
        }

        public string GetNormalizedExceptionLocation()
        {
            var fullPath = "";
            if (DeminifiedStackFrames[0] != null && DeminifiedStackFrames[0].File != null)
            {
                fullPath = DeminifiedStackFrames[0].File;
            }
            else if (MinifiedStackFrames[0] != null && MinifiedStackFrames[0].File != null)
            {
                fullPath = MinifiedStackFrames[0].File;
            }
            else
            {
                return "";
            }

            var lastSlash = fullPath.LastIndexOf('/');
            if (lastSlash == -1)
            {
                lastSlash = fullPath.LastIndexOf("\\", StringComparison.Ordinal);
            }

            var fileName = fullPath.Substring(lastSlash + 1);
            return fileName;
        }

        public void SetDistance(JavascriptStackTrace other)
        {
            if (other == null)
                return ;
            var stackFrames = MinifiedStackFrames;
            var otherStackFrames = other.MinifiedStackFrames;
            var numberOfMatchingStackFrames = 0.0;

            for (var i = 0; i < stackFrames.Count; i++)
            {
                if (i >= otherStackFrames.Count)
                    break;

                if (stackFrames[i].AreSame(otherStackFrames[i]))
                    numberOfMatchingStackFrames++;
                else
                    break;
            }

            var countDiff = Math.Abs(stackFrames.Count - otherStackFrames.Count);
            if (countDiff != 0 && numberOfMatchingStackFrames != 0.0)
                numberOfMatchingStackFrames += (1.0 / countDiff / 10);

            Distance = numberOfMatchingStackFrames;
        }


    }
}