namespace cems.API.Models.javascript
{
    public class JavascriptLogModel : CemsLogModel
    {
        public JavascriptSessionInfoModel JavascriptSessionInfo { get; set; }
        public JavascriptApplicationInfoModel JavascriptApplicationInfo { get; set; }
        public JavascriptExceptionDetailsModel JavascriptExceptionDetails { get; set; }
        public JavascriptBrowserInfoModel JavascriptBrowserInfo { get; set; }

        public JavascriptLogModel() : base(Platforms.Javascript)
        {
            JavascriptExceptionDetails = new JavascriptExceptionDetailsModel();
        }
    }
}