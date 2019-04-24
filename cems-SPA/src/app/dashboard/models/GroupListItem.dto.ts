import { GroupingReason } from 'src/app/_models/GroupingReason.enum';
import { LogHeader } from './LogHeader.dto';

export class GroupListItem {
    public id: number;
    public groupingReason: GroupingReason;
    public groupingContext: string;
    public firstOccured: Date;
    public lastOccured: Date;
    public logsCount: number;

    public lastLogHeader: LogHeader;

    constructor(groupItemObj) {
        this.id = groupItemObj.id;
        this.groupingReason = groupItemObj.groupingReason;
        this.groupingContext = groupItemObj.groupingContext;
        this.firstOccured = groupItemObj.firstOccured;
        this.lastOccured = groupItemObj.lastOccured;
        this.logsCount = groupItemObj.logsCount;

        this.lastLogHeader = new LogHeader(groupItemObj.lastLogHeader);
    }


}
