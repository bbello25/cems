namespace cems.API.Models.javascript
{
    public class JavascriptBrowserInfoModel
    {
        public string osName { get; set; }
        public string osVersion { get; set; }
        public string browserName { get; set; }
        public string browserVersion { get; set; }
        public string browserUserAgent { get; set; }
        public string browserLanguage { get; set; }
        public bool browserIsOnline { get; set; }
        public string browserPlatform { get; set; }
        public bool javaEnabled { get; set; }
        public bool dataCookiesEnabled { get; set; }
        public string dataCookies { get; set; }
        public string dataStorage { get; set; }

        public int screenScreenW { get; set; }
        public int screenScreenH { get; set; }
        public int sizeInnerW { get; set; }
        public int sizeInnerH { get; set; }
        public int screenAvailW { get; set; }
        public int screenAvailH { get; set; }
        public int scrColorDepth { get; set; }
        public int scrPixelDepth { get; set; }
    }
}