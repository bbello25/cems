import { DotnetRequestPropertiesModel } from './DotnetRequestProperties.model';
import { DotnetConnectionInfoModel } from './DotnetConnectionInfo.model';

export class DotnetHttpContextModel {

    public request: DotnetRequestPropertiesModel = null;
    public connection: DotnetConnectionInfoModel = null;
    public user: string = null;

    constructor(dotnetHttpContextModelObj) {
        this.request = new DotnetRequestPropertiesModel(dotnetHttpContextModelObj.request);
        this.connection = new DotnetConnectionInfoModel(dotnetHttpContextModelObj.connection);
        this.user = dotnetHttpContextModelObj.user;
    }

}
