export class ExceptionDetails {
    message: string;
    type: string;
    source: string;
    rawStackTrace: string;

    constructor(exectionDetailsObj) {
        this.message = exectionDetailsObj.message;
        this.type = exectionDetailsObj.type;
        this.source = exectionDetailsObj.source;
        this.rawStackTrace = exectionDetailsObj.rawStackTrace;
    }

}
