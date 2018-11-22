using System;
using cems.Logger;

namespace cems.ExampleApp_csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            var logger = new Logger_csharp.Logger("8kt22m9frw");
            try
            {
                throw new Exception("Example exception");
            }
            catch (Exception ex)
            {
                var error = new LogEntry
                {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Source = ex.Source,
                };
                logger.LogError(error);
            }
        }
    }
}