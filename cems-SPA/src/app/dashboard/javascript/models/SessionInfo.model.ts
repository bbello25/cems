export class SessionInfo {
  public sessionId: string;
  public duration: number;
  public browserInfo: BrowserInfo;
  public screenInfo: ScreenInfo;
  public eventsHistory: string;

  constructor(sessionJson: string) {
    const object = JSON.parse(sessionJson);
    if (!object) {
      throw new Error('Failed to parse session info');
    }
    this.sessionId = object.sessionId;
    this.duration = object.sessionDuration;
    this.browserInfo = object.browserProperties;
    this.screenInfo = object.screenProperties;
    this.eventsHistory = object.eventsHistory;
  }
}

export class BrowserInfo {
  public os: string;
  public browser: string;
  public browserUserAgent: string;
  public browserLanguage: string;
  public browserOnline: string;
  public browserPlatform: string;
  public javaEnabled: string;
  public dataCookiesEnabled: string;
  public dataCookies1: string;
  public dataStorage: string;
}

export class ScreenInfo {
  screenScreenW: number;
  screenScreenH: number;
  sizeInnerW: number;
  sizeInnerH: number;
  screenAvailW: number;
  screenAvailH: number;
  scrColorDepth: number;
  scrPixelDepth: number;
}
