namespace cems.API.Models.javascript
{
    public class JavascriptDeminifiedStackFrame : CemsStackFrame
    {
        public int DeminificationError { get; set; }
        public string SourceCode { get; set; }
    }
}
