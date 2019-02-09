using SourcemapToolkit.CallstackDeminifier;
using SourcemapToolkit.CallstackDeminifier.Core;

namespace cems.API.Features.Users
{
    public interface IStrackTraceDeminifierService
    {
        DeminifyStackTraceResult Deminfy(string stackTraceString);
    }
}