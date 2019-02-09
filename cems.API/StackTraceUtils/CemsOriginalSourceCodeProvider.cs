using System;
using System.IO;
using System.Net;
using SourcemapToolkit.CallstackDeminifier.Core;

namespace cems.API.StackTraceUtils
{
    class CemsOriginalSourceCodeProvider : ISourceCodeProvider
    {
        public StreamReader GetSourceCode(string sourceCodeUrl)
        {
            throw new NotImplementedException();
        }

        public string GetSourceCodeString(string sourceCodeUrl)
        {
            String sourceCodeString;
            using (WebClient client = new WebClient())
            {
                sourceCodeString = client.DownloadString(sourceCodeUrl);
            }

            return sourceCodeString;
        }
    }
}