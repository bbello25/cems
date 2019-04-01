using System.Collections.Generic;
using System.Linq;
using cems.API.Models;
using Newtonsoft.Json;

namespace cems.API.Features.Users
{
    public static class KNN
    {
        public static IEnumerable<object> Compute(IEnumerable<BaseErrorLog> otherLogs,
            BaseErrorLog currentLog, int k)
        {
        
           /* var currentStackTrace =  JsonConvert.DeserializeObject(currentLog.StackTraceJson);



            IEnumerable<BaseErrorLog> browserErrorLogs = otherLogs.ToList();
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

            return similarLogDtos;*/
           return null;
        }
    }
}