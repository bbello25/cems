using System;
using System.Diagnostics;
using System.Threading.Tasks;
using appLogger;

namespace consoleApp
{
    class Program
    {

        public static void Main(string[] args)
        {
            var logger = new CemsLogger();
            try
            {
                throw new Exception("Example exception");
            }
            catch (Exception ex)
            {
                StackTrace stkTrace = new System.Diagnostics.StackTrace(ex, true);
                var error = new LogEntry()
                {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Source = ex.Source
                };
                logger.LogError(error).GetAwaiter().GetResult();
            }

        }
    }
}