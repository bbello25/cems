import {StackTrace} from "./StackTrace";

export class ErrorLog {
  id: number;
  message: string;
  stackTrace: StackTrace;
  source: string;
  timestamp: Date;
  progLanguage: string;
  protocol: string;
  ip: string;
}
