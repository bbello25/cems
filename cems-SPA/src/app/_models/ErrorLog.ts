export class ErrorLog {
  public id: number;
  public exceptionMessage: string;
  public source: string;
  public timestamp: Date;
  public progLanguage: string;
  public name: string;
  public stackTraceRaw: string;
  public distance: number;

  public constructor(obj: any) {
    this.id = obj.id;
    this.exceptionMessage = obj.exceptionMessage;
    this.source = obj.source;
    this.timestamp = obj.timestamp;
    this.progLanguage = obj.progLanguage;
    this.name = obj.name;
    this.stackTraceRaw = this.repalceNewLine(obj.stackTraceRaw);
    if (obj.distance >= 0) {
      this.distance = obj.distance;
    }
  }

  private repalceNewLine(stackTraceRaw: string) {
    return stackTraceRaw.replace('\r\n', '\n');
  }
}
