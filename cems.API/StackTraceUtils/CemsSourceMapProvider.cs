using SourcemapToolkit.CallstackDeminifier.Core;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using static System.String;

namespace cems.API.StackTraceUtils
{
    class CemsSourceMapProvider : ISourceMapProvider
    {
        public StreamReader GetSourceMapContentsForCallstackUrl(string correspondingCallStackFileUrl)
        {
            var uri = new Uri(correspondingCallStackFileUrl);
            string fileString;
            var sourceMap = "";
            using (var client = new WebClient())
            {
                fileString = client.DownloadString(correspondingCallStackFileUrl);
            }

            var lines = fileString.Split(new string[] {"\n"},
                StringSplitOptions.RemoveEmptyEntries).Reverse();

            foreach (var line in lines)
            {
                if (!line.StartsWith("//# ")) continue;
                var lastSlash = uri.AbsoluteUri.LastIndexOf("/", StringComparison.Ordinal);
                var sourceMapUrl = Format($"{uri.AbsoluteUri.Substring(0, lastSlash)}/{line.Split('=')[1]}");

                using (var client = new WebClient())
                {
                    sourceMap = client.DownloadString(sourceMapUrl);
                    break;
                }
            }

            var byteArray = Encoding.UTF8.GetBytes(sourceMap);
            return new StreamReader(new MemoryStream(byteArray));
        }
    }
}