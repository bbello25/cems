using System;
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
//            var stackFrames = StackFrames.Reverse().ToList();
//            var otherStackFrames = other.StackFrames.Reverse().ToList();
            var stackFrames = StackFrames.ToList();
            var otherStackFrames = other.StackFrames.ToList();
            var numberOfMatchigStackFrames = 0;


            for (var i = 0; i < stackFrames.Count; i++)
            {
                if (i >= otherStackFrames.Count)
                    break;

                if (stackFrames[i].areSame(otherStackFrames[i]))
                    numberOfMatchigStackFrames++;
                else
                    break;
            }

            return  Math.Round( numberOfMatchigStackFrames / (double) stackFrames.Count, 2);
        }
    }
}