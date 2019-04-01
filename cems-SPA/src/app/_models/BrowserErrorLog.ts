import { ErrorLog } from './ErrorLog';
import { StackTrace } from './StackTrace';

export class BrowserErrorLog extends ErrorLog {
  headers: any;
  sessionInfo: any;
  protocol: string;
  ip: string;
  stackTrace: StackTrace;
}
