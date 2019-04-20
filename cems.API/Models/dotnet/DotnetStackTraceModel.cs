using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace cems.API.Models.dotnet
{
    public class DotnetStackTraceModel
    {
        public List<CemsStackFrameModel> StackFrames { get; set; }
        public double Distance { get; set; }

        public void SetDistance(DotnetStackTraceModel other)
        {
            var stackFrames = StackFrames;
            var otherStackFrames = other.StackFrames;
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

        public string GetNormalizedExceptionLocation()
        {
            var file = "";
            var path = StackFrames[0].File;
            if (path != null)
            {
                var pos = path.LastIndexOf("/", StringComparison.Ordinal);
                if (pos == -1)
                {
                    pos = path.LastIndexOf("\\", StringComparison.Ordinal);
                }

                file = path.Substring(pos + 1);
            }

            return file;
        }
    }
}