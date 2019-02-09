using System.Collections.Generic;

namespace SourcemapToolkit.CallstackDeminifier.Core
{
	public class DeminifyStackTraceResult
	{
		public List<StackFrame> MinifiedStackFrames;

		public List<StackFrameDeminificationResult> DeminifiedStackFrameResults;
	}
}
