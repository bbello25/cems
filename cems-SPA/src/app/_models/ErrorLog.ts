import { StackTrace } from './StackTrace';

export class ErrorLog {
  id: number;
  exceptionMessage: string;
  stackTrace: StackTrace;
  source: string;
  timestamp: Date;
  progLanguage: string;

  public constructor(obj: any) {
    this.id = obj.id;
    this.exceptionMessage = obj.exceptionMessage;
    this.stackTrace = this.parseStackTrace(obj.stackTraceJson);
    this.source = obj.source;
    this.timestamp = obj.timestamp;
    this.progLanguage = obj.progLanguage;
  }

  private parseStackTrace(stacktraceJson: string): StackTrace {
    const stackTrace: StackTrace = JSON.parse(stacktraceJson);
    if (!stackTrace) {
      throw new Error('Failed to parse stacktrace');
    }
    return stackTrace;
  }
}
