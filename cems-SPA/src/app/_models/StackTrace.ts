export class StackTrace {
  DeminifiedStackFrameResults: DeminifiedStackFrameResult[];
  MinifiedStackFrames: StackFrame[];
}

export class DeminifiedStackFrameResult {
  DeminificationError: number;
  DeminifiedStackFrame: StackFrame;
}

export class StackFrame {
  FilePath = 'unknownPath';
  MethodName = 'UnknowMethod';
  SourceCode: string;
  SourcePosition: SourcePosition = new SourcePosition();
}

export class SourcePosition {
  ZeroBasedLineNumber = 0;
  ZeroBasedColumnNumber = 0;
}
