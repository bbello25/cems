import { JavascriptApplicationInfo } from './JavascriptApplicationInfo.model';
import { JavascriptSessionInfo } from './JavascriptSessionInfo.model';
import { JavascriptBrowserInfo } from './JavascriptBrowserInfo.model';
import { CemsLog } from '../../../_models/CemsLog.model';
import { JavascriptExceptionDetails } from './JavascriptExceptionDetails.model';

export class JavascripLog extends CemsLog {
    public javascriptApplicationInfo: JavascriptApplicationInfo;
    public javascriptSessionInfo: JavascriptSessionInfo;
    public javascriptBrowserInfo: JavascriptBrowserInfo;
    public javascriptExceptionDetails: JavascriptExceptionDetails;

    constructor(logObj) {
        super(logObj);
        this.javascriptApplicationInfo = new JavascriptApplicationInfo(logObj.javascriptApplicationInfo);
        this.javascriptSessionInfo = new JavascriptSessionInfo(logObj.javascriptSessionInfo);
        this.javascriptBrowserInfo = new JavascriptBrowserInfo(logObj.javascriptBrowserInfo);
        this.javascriptExceptionDetails = new JavascriptExceptionDetails(logObj.javascriptExceptionDetails);
    }

    public getNormalizedExceptionFile() {

        const stackTrace = this.javascriptExceptionDetails.javascriptStackTrace;
        let fullPath;
        if (stackTrace.deminifiedStackFrames && stackTrace.deminifiedStackFrames[0] && stackTrace.deminifiedStackFrames[0].file) {
            fullPath = stackTrace.deminifiedStackFrames[0].file;
        } else if (stackTrace.minifiedStackFrames[0] && stackTrace.minifiedStackFrames[0].file) {
            fullPath = stackTrace.minifiedStackFrames[0].file;
        } else {
            return '';
        }
        const lastSlash = fullPath.lastIndexOf('/');
        const fileName = fullPath.substring(lastSlash + 1);
        return fileName;
    }


}
