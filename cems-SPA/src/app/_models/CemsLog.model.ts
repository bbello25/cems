import { ExceptionDetails } from './ExceptionDetails.model';

export class CemsLog {
    public id: number;
    public platform: number;
    public timestamp: Date;
    public exceptionDetails: ExceptionDetails;

    constructor(logObj) {
        this.id = logObj.id;
        this.platform = logObj.platform;
        this.timestamp = new Date(logObj.timestamp);
        this.exceptionDetails = new ExceptionDetails(logObj.exceptionDetails);
    }
}
