namespace cems.API.Models
{
    public class CemsStackFrame
    {
        public string File { get; set; }
        public string Method { get; set; }
        public int Line { get; set; }
        public int Column { get; set; }


        public bool AreSame(CemsStackFrame otherStackFrame)
        {
            if (otherStackFrame == null)
                return false;
            if (GetType() != otherStackFrame.GetType())
                return false;

            var areSame = true;
            if (File != otherStackFrame.File)
                areSame = false;
            if (Method != otherStackFrame.Method)
                areSame = false;
            if (Line != otherStackFrame.Line)
                areSame = false;
            if (Column != otherStackFrame.Column)
                areSame = false;

            return areSame;

        }
    }
}
