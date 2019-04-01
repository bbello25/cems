export class StackTrace {
  DeminifiedStackFrameResults: DeminifiedStackFrameResult[];
  MinifiedStackFrames: StackFrame[];

  constructor(stackTraceJson: string) {
    const object = JSON.parse(stackTraceJson);
    for (const stackFrameObj of object) {
      const stackFrame: StackFrame = stackFrameObj;
      this.MinifiedStackFrames.push(stackFrame);
    }
  }
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
