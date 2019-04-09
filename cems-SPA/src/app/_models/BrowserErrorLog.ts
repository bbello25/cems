import { ErrorLog } from './ErrorLog';

export class BrowserErrorLog extends ErrorLog {
  headers: any;
  sessionInfo: any;
  protocol: string;
  ip: string;
  stackTrace: any;
}
