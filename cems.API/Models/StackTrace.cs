using System.Collections.Generic;
using System.Linq;

namespace cems.API.Models
{
    public class StackTrace
    {
        public IEnumerable<StackFrame> StackFrames { get; set; }
        public int LogId { get; set; }

        public double Distance(StackTrace other)
        {
            var stackFrames = StackFrames.Reverse().ToList();
            var otherStackFrames = other.StackFrames.Reverse().ToList();
            var numberOfMatchigStackFrames = 0;


            for (int i = 0; i < stackFrames.Count; i++)
            {
                if (stackFrames[i].Equals(otherStackFrames[i]))
                    numberOfMatchigStackFrames++;
            }

            foreach (var stackFrame in stackFrames)
            {
                foreach (var otherStackFrame in otherStackFrames)
                {
                    if (stackFrame.Equals(otherStackFrame))
                        numberOfMatchigStackFrames++;
                }
            }

            if (numberOfMatchigStackFrames == 0)
                return 0.0;
            return stackFrames.Count / (double) numberOfMatchigStackFrames;
        }
    }
}