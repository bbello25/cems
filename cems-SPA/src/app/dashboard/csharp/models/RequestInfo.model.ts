export default class RequestInfo {
  public body?: string;
  // TODO refactor into array
  public headers?: any;
  public host?: string;
  public isHttps?: boolean;
  public method?: string;
  public path?: string;
  public basePath?: string;
  public protocol?: string;
  public query?: any[];
  public quesryString?: string;
  public scheme?: string;
  constructor() {}
}
