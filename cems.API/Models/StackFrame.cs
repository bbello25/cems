namespace cems.API.Models
{
    public class StackFrame
    {
        public int ColumnNumber { get; set; }
        public string FileName { get; set; }
        public string FunctionName { get; set; }
        public int LineNumber { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;
            if (this.GetType() != obj.GetType()) return false;

            StackFrame stackFrame = (StackFrame) obj;

            return stackFrame.FileName == FileName && stackFrame.FunctionName == FunctionName &&
                   stackFrame.LineNumber == LineNumber && stackFrame.ColumnNumber == ColumnNumber;
        }
    }
}