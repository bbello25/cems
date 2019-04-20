namespace cems.API.Models
{
    public class CemsStackFrameModel
    {
        public string File { get; set; }
        public string Method { get; set; }
        public int Line { get; set; }
        public int Column { get; set; }


        public bool AreSame(CemsStackFrameModel otherStackFrameModel)
        {
            if (otherStackFrameModel == null)
                return false;
            if (GetType() != otherStackFrameModel.GetType())
                return false;

            var areSame = true;
            if (File != otherStackFrameModel.File)
                areSame = false;
            if (Method != otherStackFrameModel.Method)
                areSame = false;
            if (Line != otherStackFrameModel.Line)
                areSame = false;
            if (Column != otherStackFrameModel.Column)
                areSame = false;

            return areSame;

        }

    }
}
