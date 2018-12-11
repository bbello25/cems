namespace cems.API.Dtos.EndpointDTOs
{
    public class StackFrame
    {
        public int ColumnNumber { get; set; }
        public string FileName { get; set; }
        public string FunctionName { get; set; }
        public int LineNumber { get; set; }
    }
}