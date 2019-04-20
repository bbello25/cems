export class DotnetApplicationInfoModel {

    public name: string = null;
    public host: string = null;
    public port: string = null;
    public hostName: string = null;
    public os: string = null;
    public environment: string = null;
    public assemblyVersion: string = null;

    constructor(dotnetApplicationInfoModelObj) {
        this.name = dotnetApplicationInfoModelObj.name;
        this.host = dotnetApplicationInfoModelObj.host;
        this.port = dotnetApplicationInfoModelObj.port;
        this.hostName = dotnetApplicationInfoModelObj.hostName;
        this.os = dotnetApplicationInfoModelObj.os;
        this.environment = dotnetApplicationInfoModelObj.environment;
        this.assemblyVersion = dotnetApplicationInfoModelObj.assemblyVersion;
    }
}
