namespace cems.API.Models
{
    public class StackFrame
    {
        public string FilePath { get; set; }
        public string MethodName { get; set; }
        public SourcePosition SourcePosition { get; set; }

        public bool areSame(StackFrame otheStackFrame)
        {
            if (otheStackFrame == null)
                return false;
            if (GetType() != otheStackFrame.GetType())
                return false;

            var areSame = true;
            if (FilePath != otheStackFrame.FilePath)
                areSame = false;
            if (MethodName != otheStackFrame.MethodName)
                areSame = false;
            if (SourcePosition == otheStackFrame.SourcePosition)
                areSame = false;

            return areSame;
            

        }
    }
}