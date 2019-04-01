import * as normalize from 'normalize-path';

export class CsharpStackTrace {
  public stackFrames: CsharpStackFrame[] = [];

  constructor(stackTraceJson: string) {
    const object = JSON.parse(stackTraceJson);
    if (!object) {
      throw new Error('Failed to parse StackTrace');
    }

    for (const stackFrameObj of object) {
      const stackFrame = new CsharpStackFrame();
      stackFrame.file = normalize(stackFrameObj.File);
      stackFrame.method = stackFrameObj.Method;
      stackFrame.line = stackFrameObj.Line;
      stackFrame.column = stackFrameObj.Column;

      this.stackFrames.push(stackFrame);
    }
  }
}

export class CsharpStackFrame {
  public file: string;
  public method: string;
  public line: number;
  public column: number;
}
