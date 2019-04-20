import { JavascriptStackTrace } from './JavascriptStackTrace.model';

export class JavascriptExceptionDetails {
    public javascriptStackTrace: JavascriptStackTrace;
    constructor(JavascriptExceptionDetailsObj) {
        this.javascriptStackTrace = JavascriptExceptionDetailsObj.javascriptStackTrace;
    }
}
