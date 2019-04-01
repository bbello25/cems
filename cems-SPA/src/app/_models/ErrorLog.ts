import { StackTrace } from './StackTrace';

export class ErrorLog {
  id: number;
  exceptionMessage: string;
  source: string;
  timestamp: Date;
  progLanguage: string;
  name: string;

  public constructor(obj: any) {
    this.id = obj.id;
    this.exceptionMessage = obj.exceptionMessage;
    this.source = obj.source;
    this.timestamp = obj.timestamp;
    this.progLanguage = obj.progLanguage;
    this.name = obj.name;
  }
}
