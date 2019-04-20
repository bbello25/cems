import { DotnetStackTraceModel } from './DotnetStackTrace.model';

export class DotnetExceptionDetailsModel {

    public dotnetStackTrace: DotnetStackTraceModel = null;

    constructor(dotnetExceptionDetailsModelObj) {
        this.dotnetStackTrace = dotnetExceptionDetailsModelObj.dotnetStackTrace;
    }
}
