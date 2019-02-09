using System.Collections.Generic;

namespace SourcemapToolkit.CallstackDeminifier.Core
{
	internal interface IFunctionMapStore
	{
		List<FunctionMapEntry> GetFunctionMapForSourceCode(string sourceCodeUrl);
	}
}