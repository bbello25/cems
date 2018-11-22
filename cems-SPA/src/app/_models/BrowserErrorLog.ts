import { ErrorLog } from './ErrorLog';

export class BrowserErrorLog extends ErrorLog {
  userAgent: string;
  referer: String;
  origin: String;
}
