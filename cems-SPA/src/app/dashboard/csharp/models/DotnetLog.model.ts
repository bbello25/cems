import { DotnetApplicationInfoModel } from './DotnetApplicationInfo.model';
import { DotnetHttpContextModel } from './DotnetHttpContext.model';
import { DotnetExceptionDetailsModel } from './DotnetExceptionDetails.model';
import { CemsLog } from 'src/app/_models/CemsLog.model';

export class DotnetLogModel extends CemsLog {
    public dotnetApplicationInfo: DotnetApplicationInfoModel;
    public dotnetHttpContext: DotnetHttpContextModel;
    public dotnetExceptionDetails: DotnetExceptionDetailsModel;

    constructor(logObj) {
        super(logObj);
        this.dotnetApplicationInfo = new DotnetApplicationInfoModel(logObj.dotnetApplicationInfo);
        this.dotnetHttpContext = new DotnetHttpContextModel(logObj.dotnetHttpContext);
        this.dotnetExceptionDetails = new DotnetExceptionDetailsModel(logObj.dotnetExceptionDetails);
    }
}


