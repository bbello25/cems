using cems.API.Models;
using cems.API.Models.dotnet;

namespace cems.API.Features.LogEndpoint.dotnet.Models
{
    public class DotnetLogModel : CemsLogModel
    {
        public DotnetApplicationInfoModel DotnetApplicationInfo { get; set; }
        public DotnetHttpContextModel DotnetHttpContext { get; set; }
        public DotnetExceptionDetailsModel DotnetExceptionDetails { get; set; }
        public DotnetLogModel() : base(Platforms.Dotnet)
        {
            DotnetApplicationInfo = new DotnetApplicationInfoModel();
            DotnetHttpContext = new DotnetHttpContextModel();
            DotnetExceptionDetails = new DotnetExceptionDetailsModel();
        }

       /* public void AppendExceptionDetails(Exception e)
        {
            
            ExceptionDetails.Message = e.Message;
            ExceptionDetails.Source = e.Source;
            ExceptionDetails.Type = e.GetType().Name;
            ExceptionDetails.RawStackTrace = e.StackTrace;

            var stackTrace = new StackTrace(e, true);

            var csharpStackFrames = stackTrace.GetFrames();
            if (csharpStackFrames != null)
            {
                var stackFrames = new List<CemsStackFrameModel>();
                foreach (var stackFrame in csharpStackFrames)
                {
                    var frame = new CemsStackFrameModel
                    {
                        File = stackFrame.GetFileName(),
                        Method = stackFrame.GetMethod().Name,
                        Line = stackFrame.GetFileLineNumber(),
                        Column = stackFrame.GetFileColumnNumber(),
                    };
                    stackFrames.Add(frame);
                }

                //ExceptionDetails.StackTrace = stackFrames;
            }
        }*/

        /*public void AddHttpContext(HttpContext httpContext)
        {
            DotnetHttpContext.Request.Body = httpContext.Request.Body.ToString();
            DotnetHttpContext.Request.HeadersJson = JsonConvert.SerializeObject(httpContext.Request.Headers);
            DotnetHttpContext.Request.Host = httpContext.Request.Host.ToString();
            DotnetHttpContext.Request.IsHttps = httpContext.Request.IsHttps;
            DotnetHttpContext.Request.Method = httpContext.Request.Method;
            DotnetHttpContext.Request.Path = httpContext.Request.Path;
            DotnetHttpContext.Request.PathBase = httpContext.Request.PathBase;
            DotnetHttpContext.Request.Protocol = httpContext.Request.Protocol;
            DotnetHttpContext.Request.Query = JsonConvert.SerializeObject(httpContext.Request.Query);
            DotnetHttpContext.Request.QueryString = httpContext.Request.QueryString.ToString();
            DotnetHttpContext.Request.Scheme = httpContext.Request.Scheme;

            DotnetHttpContext.Connection.LocalIpAddressV4 = httpContext.Connection.LocalIpAddress.MapToIPv4().ToString();
            DotnetHttpContext.Connection.LocalIpAddressV6 = httpContext.Connection.LocalIpAddress.MapToIPv6().ToString();
            DotnetHttpContext.Connection.LocalPort = httpContext.Connection.LocalPort;
            DotnetHttpContext.Connection.RemoteIpAddressV4 =
                httpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
            DotnetHttpContext.Connection.RemoteIpAddressV6 =
                httpContext.Connection.RemoteIpAddress.MapToIPv6().ToString();
            DotnetHttpContext.Connection.RemotePort = httpContext.Connection.RemotePort;
        }*/
    }
}