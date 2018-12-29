using System.Collections.Generic;
using System.Linq;
using StackTrace = cems.API.Models.StackTrace;

namespace cems.API.Features.Users
{
    public class KNN
    {
        public static IEnumerable<StackTrace> Compute(IEnumerable<StackTrace> otherStackTraces,
            StackTrace currentStackTrace, int k)
        {
            var ordered = otherStackTraces.OrderBy(currentStackTrace.Distance);
            var knearest = ordered.Take(k).ToList();

            return knearest;
        }
    }
}