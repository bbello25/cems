import { ErrorLog } from 'src/app/_models/ErrorLog';
import ConnectionInfo from './ConnectionRequest.model';
import RequestInfo from './RequestInfo.model';

export default class CsharpErrorLog extends ErrorLog {
  public request: RequestInfo;
  public connectionInfo: ConnectionInfo;
  public host: string;
  public port: string;

  public constructor(obj: any) {
    super(obj);

    this.request = this.parseRequestJson(obj.requestJson);
    this.connectionInfo = this.parseConnectionInfo(obj.connectionInfoJson);
    this.host = obj.host;
    this.port = obj.port;
  }

  private parseRequestJson(requestJson: string): RequestInfo {
    const object = JSON.parse(requestJson);
    if (!object) {
      throw new Error('Failed to parse request info');
    }
    const requestInfo: RequestInfo = new RequestInfo();
    requestInfo.body = object.body;
    requestInfo.headers = object.headers;
    requestInfo.host = object.host;
    requestInfo.isHttps = object.isHttps;
    requestInfo.method = object.method;
    requestInfo.path = object.path;
    requestInfo.basePath = object.basePath;
    requestInfo.protocol = object.protocol;
    requestInfo.query = object.query;
    requestInfo.quesryString = object.quesryString;
    requestInfo.scheme = object.scheme;
    return requestInfo;
  }

  private parseConnectionInfo(connectionInfoJson: string): ConnectionInfo {
    const object = JSON.parse(connectionInfoJson);
    if (!object) {
      throw new Error('Failed to parse connection info info');
    }
    const connectionInfo: ConnectionInfo = new ConnectionInfo();
    connectionInfo.localipAddressV4 = object.localIpAddressV4;
    connectionInfo.localipAddressV6 = object.localIpAddressV6;
    connectionInfo.LocalPort = object.localPort;
    connectionInfo.remoteipAddressV4 = object.remoteIpAddressV4;
    connectionInfo.remoteipAddressV6 = object.remoteIpAddressV6;
    connectionInfo.RemotpPort = object.remotpPort;
    return connectionInfo;
  }
}
