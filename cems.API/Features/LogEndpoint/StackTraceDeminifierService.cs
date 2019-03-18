using System;
using System.Linq;
using cems.API.Models;
using cems.API.StackTraceUtils;
using SourcemapToolkit.CallstackDeminifier.Core;
using SourcePosition = SourcemapToolkit.SourcemapParser.Core.SourcePosition;
using StackFrame = SourcemapToolkit.CallstackDeminifier.Core.StackFrame;

namespace cems.API.Features.LogEndpoint
{
    public class StackTraceDeminifierService : IStackTraceDeminifierService
    {
        private readonly CemsOriginalSourceCodeProvider _originalSourceCodeProvider;
        private readonly StackTraceDeminifier _sourceMapCallstackDeminifier;

        public StackTraceDeminifierService()
        {
            ISourceMapProvider sourceMapProvider = new CemsSourceMapProvider();
            ISourceCodeProvider sourceCodeProvider = new CemsSourceCodeProvider();
            _originalSourceCodeProvider = new CemsOriginalSourceCodeProvider();
            _sourceMapCallstackDeminifier = StackTraceDeminfierFactory.GetStackTraceDeminfier(sourceMapProvider, sourceCodeProvider);
        }

        public DeminifyStackTraceResult Deminfy(string stackTraceString)
        {
            var deminifyStackTraceResult = _sourceMapCallstackDeminifier.DeminifyStackTrace(stackTraceString);

            for (var i = 0; i < deminifyStackTraceResult.DeminifiedStackFrameResults.Count; i++)
            {
                if (deminifyStackTraceResult.MinifiedStackFrames[i] == null &&
                    (deminifyStackTraceResult.DeminifiedStackFrameResults[i].DeminificationError != DeminificationError.None ||
                    deminifyStackTraceResult.DeminifiedStackFrameResults[i].DeminificationError != DeminificationError.NoWrapingFunctionFound))
                    continue;

                var sourceCodePath = GetFullPath(deminifyStackTraceResult.DeminifiedStackFrameResults[i].DeminifiedStackFrame, deminifyStackTraceResult.MinifiedStackFrames[i]);

                //TODO cache this result
                try
                {
                    var originalCode = _originalSourceCodeProvider.GetSourceCodeString(sourceCodePath);
                    var finalCode = GetWrappingCode(originalCode, deminifyStackTraceResult.DeminifiedStackFrameResults[i].DeminifiedStackFrame.SourcePosition);
                    deminifyStackTraceResult.DeminifiedStackFrameResults[i].DeminifiedStackFrame.SourceCode = finalCode;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            return deminifyStackTraceResult;
        }

        private string GetFullPath(StackFrame deminifiedStackFrame, StackFrame minifiedStackFrame)
        {
            var uri = new Uri(minifiedStackFrame.FilePath);
            var lastSlash = uri.AbsoluteUri.LastIndexOf("/", StringComparison.Ordinal);
            var path = uri.AbsoluteUri.Substring(0, lastSlash);
            var sourceUrl = string.Format($"{uri.Scheme}://{uri.Host}:{uri.Port}/{deminifiedStackFrame.FilePath}");
            return sourceUrl;
        }

        private string GetWrappingCode(string originalCode, SourcePosition sourcePosition)
        {
            var lines = originalCode.Split(new string[] { "\r\n" },
                StringSplitOptions.None);

            const int numOfWrappingLines = 2;
            var lineFrom =
                sourcePosition
                    .ZeroBasedLineNumber - numOfWrappingLines;
            if (lineFrom < 0)
                lineFrom = 0;

            var lineTo = sourcePosition
                             .ZeroBasedLineNumber + 1 +
                         numOfWrappingLines;
            if (lineTo >= lines.Length)
                lineTo = lines.Length - 1;
            var finalCode = "";
            for (var j = lineFrom; j < lineTo; j++)
            {
                if (j == sourcePosition
                        .ZeroBasedLineNumber)
                    finalCode += $">{j}{lines.ElementAt(j)}\r\n";
                else
                    finalCode += $" {j}{lines.ElementAt(j)}\r\n";
            }

            return finalCode;
        }
    }
}