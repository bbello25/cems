using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace cems.API.Models.csharp
{
    public class DotnetWebErrorLogWithDistance : DotnetWebErrorLog
    {
        public double Distance { get; set; }

        public void SetDistance(DotnetWebErrorLogWithDistance other)
        {
            var stackFrames = JsonConvert.DeserializeObject<List<CemsStackFrame>>(StackTraceJson);
            var otherStackFrames = JsonConvert.DeserializeObject<List<CemsStackFrame>>(other.StackTraceJson);
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
