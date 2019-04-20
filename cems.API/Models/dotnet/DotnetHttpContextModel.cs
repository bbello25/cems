namespace cems.API.Features.LogEndpoint.dotnet.Models
{
    public class DotnetHttpContextModel 
    {
        public DotnetRequestPropertiesModel Request { get; set; }
        public DotnetConnectionInfoModel Connection { get; set; }
        public string User { get; set; }

        public DotnetHttpContextModel()
        {
            Request = new DotnetRequestPropertiesModel();
            Connection = new DotnetConnectionInfoModel();
        }
    }
}