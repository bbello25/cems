export class JavascriptBrowserInfo {
  public osName: string;
  public osVersion: any;
  public browserName: string;
  public browserVersion: any;
  public browserUserAgent: string;
  public browserLanguage: string;
  public browserIsOnline: boolean;
  public browserPlatform: string;
  public javaEnabled: boolean;
  public dataCookiesEnabled: boolean;
  public dataCookies: string;
  public dataStorage: any;

  public screenScreenW: number;
  public screenScreenH: number;
  public sizeInnerW: number;
  public sizeInnerH: number;
  public screenAvailW: number;
  public screenAvailH: number;
  public scrColorDepth: number;
  public scrPixelDepth: number;

  constructor(javascriptBrowserInfoObj) {
    this.osName = javascriptBrowserInfoObj.osName;
    this.osVersion = javascriptBrowserInfoObj.osVersion;
    this.browserName = javascriptBrowserInfoObj.browserName;
    this.browserVersion = javascriptBrowserInfoObj.browserVersion;
    this.browserUserAgent = javascriptBrowserInfoObj.browserUserAgent;
    this.browserLanguage = javascriptBrowserInfoObj.browserLanguage;
    this.browserIsOnline = javascriptBrowserInfoObj.browserIsOnline;
    this.browserPlatform = javascriptBrowserInfoObj.browserPlatform;
    this.javaEnabled = javascriptBrowserInfoObj.javaEnabled;
    this.dataCookiesEnabled = javascriptBrowserInfoObj.dataCookiesEnabled;
    this.dataCookies = javascriptBrowserInfoObj.dataCookies;
    this.dataStorage = JSON.parse(javascriptBrowserInfoObj.dataStorage);

    this.screenScreenW = javascriptBrowserInfoObj.screenScreenW;
    this.screenScreenH = javascriptBrowserInfoObj.screenScreenH;
    this.sizeInnerW = javascriptBrowserInfoObj.sizeInnerW;
    this.sizeInnerH = javascriptBrowserInfoObj.sizeInnerH;
    this.screenAvailW = javascriptBrowserInfoObj.screenAvailW;
    this.screenAvailH = javascriptBrowserInfoObj.screenAvailH;
    this.scrColorDepth = javascriptBrowserInfoObj.scrColorDepth;
    this.scrPixelDepth = javascriptBrowserInfoObj.scrPixelDepth;
  }

}
