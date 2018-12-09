import { ErrorLog } from './ErrorLog';

export class BrowserErrorLogFromServer extends ErrorLog {
  headers: string;
  sessionInfo: string;
}
