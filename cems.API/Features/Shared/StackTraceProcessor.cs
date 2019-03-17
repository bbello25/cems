using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace cems.API.Features.Shared
{
    public class StackTraceProcessor
    {

        public double StackTracesSimilarity(StackTrace stackTrace1, StackTrace stackTrace2)
        {
            var stackFrames = stackTrace1.GetFrames();
            var otherStackFrames = stackTrace2.GetFrames();
            var numberOfMatchingStackFrames = 0.0;

            for (var i = 0; i < stackFrames.Length; i++)
            {
                if (i >= otherStackFrames.Length)
                    break;

                if (CompareStackFrames(stackFrames[i], otherStackFrames[i]))
                {
                    numberOfMatchingStackFrames += 1.0;
                }
                else
                {
                    break;
                }
            }

            var countDiff = Math.Abs(stackFrames.Length - otherStackFrames.Length);
            if (countDiff != 0 && numberOfMatchingStackFrames != 0.0)
                numberOfMatchingStackFrames += (1.0 / countDiff / 10);


            return numberOfMatchingStackFrames;
        }

        private bool CompareStackFrames(StackFrame stackFrame1, StackFrame stackFrame2)
        {
            if (stackFrame1 == null)
            {
                throw new ArgumentNullException(nameof(stackFrame1));
            }
            if (stackFrame2 == null)
            {
                throw new ArgumentNullException(nameof(stackFrame2));
            }

            var areSame = stackFrame1.GetFileName() == stackFrame2.GetFileName();
            if (stackFrame1.GetMethod() != stackFrame2.GetMethod())
                areSame = false;
            if (stackFrame1.GetFileLineNumber() != stackFrame2.GetFileLineNumber())
                areSame = false;
            //if (stackFrame1.GetFileColumnNumber() != stackFrame1.GetFileColumnNumber())
            //    areSame = false;
            return areSame;

        }
    }
}
