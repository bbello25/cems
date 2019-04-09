import * as normalize from 'normalize-path';
import { StackFrame } from 'src/app/_models/StackFrame.model';

export class CsharpStackTrace {
  public stackFrames: StackFrame[] = [];

  constructor(stackTraceJson: string) {
    const object = JSON.parse(stackTraceJson);
    if (!object) {
      throw new Error('Failed to parse StackTrace');
    }

    for (const stackFrameObj of object) {
      const stackFrame = new StackFrame();
      stackFrame.file = normalize(stackFrameObj.File);
      stackFrame.method = stackFrameObj.Method;
      stackFrame.line = stackFrameObj.Line;
      stackFrame.column = stackFrameObj.Column;

      this.stackFrames.push(stackFrame);
    }
  }
}
