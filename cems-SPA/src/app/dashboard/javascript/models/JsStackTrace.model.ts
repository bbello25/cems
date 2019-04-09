import * as normalize from 'normalize-path';
import { StackFrame } from 'src/app/_models/StackFrame.model';

export class JsStackTrace {
  public minifiedStackFrames: StackFrame[] = [];
  public deminifiedStackFrames: DeminfiedJsStackFrame[] = [];

  constructor(stackTraceJson: string) {
    const object = JSON.parse(stackTraceJson);
    if (!object) {
      throw new Error('Failed to parse StackTrace');
    }
    this.minifiedStackFrames = this.parseMinifiedStackFrames(object.minifiedStackFrames);
    this.deminifiedStackFrames = this.parseDeminifiedStackFrames(object.deminifiedStackFrameResults);
  }

  private parseMinifiedStackFrames(stackFramesObj: any): StackFrame[] {
    const newStackFrames: StackFrame[] = [];
    for (const stackFrameObj of stackFramesObj) {
      const stackFrame = new StackFrame();
      stackFrame.file = normalize(stackFrameObj.filePath);
      stackFrame.method = stackFrameObj.methodName;
      stackFrame.line = stackFrameObj.sourcePosition.zeroBasedLineNumber;
      stackFrame.column = stackFrameObj.sourcePosition.zeroBasedColumnNumber;
      newStackFrames.push(stackFrame);
    }
    return newStackFrames;
  }

  private parseDeminifiedStackFrames(stackFramesObj: any): DeminfiedJsStackFrame[] {
    const newStackFrames: DeminfiedJsStackFrame[] = [];
    for (const stackFrameObj of stackFramesObj) {
      const stackFrame = new DeminfiedJsStackFrame();
      stackFrame.deminificationError = stackFrameObj.deminificationError;
      if (stackFrameObj.deminifiedStackFrame) {
        stackFrame.sourceCode = stackFrameObj.deminifiedStackFrame.sourceCode;
        stackFrame.file = stackFrameObj.deminifiedStackFrame.filePath;
        stackFrame.method = stackFrameObj.deminifiedStackFrame.methodName;
        if (stackFrameObj.deminifiedStackFrame.sourcePosition) {
          stackFrame.line = stackFrameObj.deminifiedStackFrame.sourcePosition.zeroBasedLineNumber;
          stackFrame.column = stackFrameObj.deminifiedStackFrame.sourcePosition.zeroBasedColumnNumber;
        }
      }

      newStackFrames.push(stackFrame);
    }
    return newStackFrames;
  }
}

export class DeminfiedJsStackFrame extends StackFrame {
  public deminificationError: number;
  public sourceCode: string;
}
