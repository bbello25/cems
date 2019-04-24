import { Platforms } from 'src/app/_models/Platforms.enum';
import { TrackedState } from 'src/app/_models/TrackedState.enum';

export class LogHeader {

    public id: number;
    public platform: Platforms;
    public timestamp: Date;

    public exceptionMessage: string;
    public exceptionType: string;

    public stateChangedTime: Date;
    public currentState: TrackedState;

    constructor(logHeaderObj) {
        this.id = logHeaderObj.id;
        this.platform = logHeaderObj.platform;
        this.timestamp = logHeaderObj.timestamp;
        this.exceptionMessage = logHeaderObj.exceptionMessage;
        this.exceptionType = logHeaderObj.exceptionType;
        this.stateChangedTime = logHeaderObj.stateChangedTime;
        this.currentState = logHeaderObj.currentState;
    }
}
