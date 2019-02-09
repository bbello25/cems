using System.Collections.Generic;
using System.Linq;
using cems.API.Models;
using StackTrace = cems.API.Models.StackTrace;

namespace cems.API.Features.Users
{
    public static class KNN
    {
        public static IEnumerable<object> Compute(IEnumerable<ErrorLogBase> otherLogs,
            ErrorLogBase currentLog, int k)
        {
            var currentStackTrace = currentLog.GetStackTrace();
            IEnumerable<ErrorLogBase> browserErrorLogs = otherLogs.ToList();
            var otherStackTraces = browserErrorLogs.Select(log => log.GetStackTrace())
                .Where(log => log.LogId != currentLog.Id);

            var ordered = otherStackTraces.OrderBy(currentStackTrace.Distance);
            var kNearest = ordered.Take(k).ToList();

            var similarLogDtos = new List<object>();
            kNearest.ForEach(stackTrace =>
            {
                var correspondingLog = browserErrorLogs.First(log => log.Id == stackTrace.LogId);
                var withDistance = new SimilarLogDto
                {
                    Id = stackTrace.LogId,
                    Distance = currentStackTrace.Distance(stackTrace),
                    Timestamp = correspondingLog.Timestamp,
                    Source = correspondingLog.Source
                };

                similarLogDtos.Add(withDistance);
            });

            return similarLogDtos;
        }
    }
}