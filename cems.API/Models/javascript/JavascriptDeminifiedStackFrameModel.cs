namespace cems.API.Models.javascript
{
    public class JavascriptDeminifiedStackFrameModel : CemsStackFrameModel
    {
        public int DeminificationError { get; set; }
        public string SourceCode { get; set; }
    }
}
