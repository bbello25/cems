export class DotnetConnectionInfoModel {
    public localIpAddressV4: string = null;
    public localIpAddressV6: string = null;
    public localPort: number = 0;
    public remoteIpAddressV4: string = null;
    public remoteIpAddressV6: string = null;
    public remotePort: number = 0;

    constructor(dotnetConnectionInfoModelObj) {
        this.localIpAddressV4 = dotnetConnectionInfoModelObj.localIpAddressV4;
        this.localIpAddressV6 = dotnetConnectionInfoModelObj.localIpAddressV6;
        this.localPort = dotnetConnectionInfoModelObj.localPort;
        this.remoteIpAddressV4 = dotnetConnectionInfoModelObj.remoteIpAddressV4;
        this.remoteIpAddressV6 = dotnetConnectionInfoModelObj.remoteIpAddressV6;
        this.remotePort = dotnetConnectionInfoModelObj.remotePort;
    }

}
