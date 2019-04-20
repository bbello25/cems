export class JavascriptSessionInfo {
  public sessionId: string;
  public eventHistory: IMouseEvent[];
  public sessionDuration: number;

  constructor(javascriptSessionInfoObj) {
    this.sessionId = javascriptSessionInfoObj.sessionId;
    this.eventHistory = javascriptSessionInfoObj.eventHistory;
    this.sessionDuration = javascriptSessionInfoObj.sessionDuration;
  }
}

export interface IEventTarget {
  elementName: string;
  id: string;
  name: string;
}

export interface IMouseEvent {
  target: object;
  readonly altKey: boolean;
  readonly metaKey: boolean;
  readonly ctrlKey: boolean;
  readonly shiftKey: boolean;
  readonly detail: number;
  readonly timestamp: Date;
}
