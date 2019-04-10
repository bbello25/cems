using System;
using Newtonsoft.Json;

namespace cems.API.Models.javascript
{
    public class BrowserErrorLogWithDistance : BrowserErrorLog
    {
        public double Distance { get; set; }

        public void SetDistance(BrowserErrorLogWithDistance other)
        {
            var stackTrace = new BrowserStackTrace(StackTraceJson);
            var otherStackTrace = new BrowserStackTrace(other.StackTraceJson);
            var stackFrames = stackTrace.MinifiedStackFrames;
            var otherStackFrames = otherStackTrace.MinifiedStackFrames;
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
