export class JavascriptApplicationInfo {
    public applicationName: string;
    public applicationVersion: string;
    public ipAddress: string;
    public email: string;

    constructor(JavascriptApplicationInfoObj) {
        this.applicationName = JavascriptApplicationInfoObj.applicationName;
        this.applicationVersion = JavascriptApplicationInfoObj.applicationVersion;
        this.ipAddress = JavascriptApplicationInfoObj.ipAddress;
        this.email = JavascriptApplicationInfoObj.email;
    }
}
