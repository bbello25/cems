using SourcemapToolkit.CallstackDeminifier.Core;

namespace cems.API.Features.LogEndpoint
{
    public interface IStackTraceDeminifierService   
    {
        DeminifyStackTraceResult Deminfy(string stackTraceString);
    }
}