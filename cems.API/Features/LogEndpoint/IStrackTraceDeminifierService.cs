using SourcemapToolkit.CallstackDeminifier.Core;

namespace cems.API.Features.LogEndpoint
{
    public interface IStrackTraceDeminifierService
    {
        DeminifyStackTraceResult Deminfy(string stackTraceString);
    }
}