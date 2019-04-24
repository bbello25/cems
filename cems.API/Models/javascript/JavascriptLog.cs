namespace cems.API.Models.javascript
{
    public class JavascriptLog : CemsLog
    {
        public JavascriptSessionInfoModel JavascriptSessionInfo { get; set; }
        public JavascriptApplicationInfoModel JavascriptApplicationInfo { get; set; }
        public JavascriptExceptionDetailsModel JavascriptExceptionDetails { get; set; }
        public JavascriptBrowserInfoModel JavascriptBrowserInfo { get; set; }

        public JavascriptLog() : base(Platforms.Javascript)
        {
            JavascriptExceptionDetails = new JavascriptExceptionDetailsModel();
        }
    }
}