export class DotnetRequestPropertiesModel {

    public body: string = null;
    public headersJson: string = null;
    public host: string = null;
    public isHttps: boolean = false;
    public method: string = null;
    public path: string = null;
    public pathBase: string = null;
    public protocol: string = null;
    public query: string = null;
    public queryString: string = null;
    public scheme: string = null;

    constructor(dotnetRequestPropertiesModelObj) {
        this.body = dotnetRequestPropertiesModelObj.body;
        this.headersJson = JSON.parse(dotnetRequestPropertiesModelObj.headersJson);
        this.isHttps = dotnetRequestPropertiesModelObj.isHttps;
        this.method = dotnetRequestPropertiesModelObj.method;
        this.path = dotnetRequestPropertiesModelObj.path;
        this.pathBase = dotnetRequestPropertiesModelObj.pathBase;
        this.protocol = dotnetRequestPropertiesModelObj.protocol;
        this.query = dotnetRequestPropertiesModelObj.query;
        this.queryString = dotnetRequestPropertiesModelObj.queryString;
        this.scheme = dotnetRequestPropertiesModelObj.scheme;
    }

}
