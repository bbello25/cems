import { ExceptionDetails } from './ExceptionDetails.model';
import { TrackedState } from './TrackedState.enum';

export class CemsLog {
    public id: number;
    public platform: number;
    public timestamp: Date;
    public exceptionDetails: ExceptionDetails;

    public createdTime: Date;
    public stateChangedTime: Date;
    public currentState: TrackedState;

    constructor(logObj) {
        this.id = logObj.id;
        this.platform = logObj.platform;
        this.timestamp = new Date(logObj.timestamp);
        this.createdTime = new Date(logObj.createdTime);
        this.stateChangedTime = new Date(logObj.stateChangedTime);
        this.currentState = logObj.currentState;
        this.exceptionDetails = new ExceptionDetails(logObj.exceptionDetails);
    }
}
