namespace cems.API.Features.LogEndpoint.dotnet.Models
{
    public class DotnetApplicationInfo 
    {
        public string Name { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
        public string HostName { get; set; }
        public string Os { get; set; }
        public string Environment { get; set; }
        public string AssemblyVersion { get; set; }
    }
}