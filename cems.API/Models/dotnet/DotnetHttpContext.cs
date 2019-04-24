namespace cems.API.Features.LogEndpoint.dotnet.Models
{
    public class DotnetHttpContext 
    {
        public DotnetRequestProperties Request { get; set; }
        public DotnetConnectionInfo Connection { get; set; }
        public string User { get; set; }

        public DotnetHttpContext()
        {
            Request = new DotnetRequestProperties();
            Connection = new DotnetConnectionInfo();
        }
    }
}