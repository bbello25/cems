using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using SourcemapToolkit.CallstackDeminifier;
using SourcemapToolkit.CallstackDeminifier.Core;
using SourcemapToolkit.SourcemapParser;
using SourcemapToolkit.SourcemapParser.Core;
using static System.String;

namespace cems.API.StackTraceUtils
{
    public class CemsSourceCodeProvider : ISourceCodeProvider
    {
        public StreamReader GetSourceCode(string sourceCodeUrl)
        {
            var uri = new Uri(sourceCodeUrl);
            var lastSlash = uri.AbsoluteUri.LastIndexOf("/", StringComparison.Ordinal);
            var path = uri.AbsoluteUri.Substring(0, lastSlash);
            string fileString;
            var sourceMapString = "";
            using (var client = new WebClient())
            {
                fileString = client.DownloadString(sourceCodeUrl);
            }

            /* var lines = fileString.Split(new string[] { "\n" },
                 StringSplitOptions.RemoveEmptyEntries).Reverse();
 
             foreach (var line in lines)
             {
                 if (!line.StartsWith("//# ")) continue;
                 var sourceMapUrl = Format($"{path}/{line.Split('=')[1]}");
 
                 A a;
                 using (WebClient client = new WebClient())
                 {
                     sourceMapString = client.DownloadString(sourceMapUrl);
                     if (!IsNullOrWhiteSpace(sourceMapString))
                         break;
                 }
             }
             var parser = new SourceMapParser();
             SourceMap sourceMap;
       
              sourceMap = parser.ParseSourceMap(StreamReaderFromString(sourceMapString));
           
 
             var sourceFileUrl = sourceMap.Sources[0];
             var sourceUrl = Format($"{path}/{sourceFileUrl}");
             var sourceCode = "";
 
             using (var client = new WebClient())
             {
                 sourceCode = client.DownloadString(sourceUrl);
             }*/

//            sourceCode.Replace("\r\n", "\n");

            var byteArray = Encoding.UTF8.GetBytes(fileString);
            return new StreamReader(new MemoryStream(byteArray));
        }
    }
}