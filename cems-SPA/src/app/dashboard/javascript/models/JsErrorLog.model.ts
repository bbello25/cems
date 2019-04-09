import { ErrorLog } from 'src/app/_models/ErrorLog';
import { SessionInfo } from './SessionInfo.model';
import { JsStackTrace } from './JsStackTrace.model';

export default class JsErrorLog extends ErrorLog {
  public sessionInfo: SessionInfo;
  public ip: string;
  public stackTrace: JsStackTrace;
  public constructor(obj: any) {
    super(obj);
    this.stackTrace = new JsStackTrace(obj.stackTraceJson);
    this.sessionInfo = new SessionInfo(obj.sessionInfoJson);
    this.ip = obj.ip;
  }
}
