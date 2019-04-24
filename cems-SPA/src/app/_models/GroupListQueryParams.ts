import { GroupingReason } from './GroupingReason.enum';
import { QueryParamas } from './QueryParams';

export class GroupListQueryParams extends QueryParamas {
    groupingReason: GroupingReason;

    constructor() {
        super();
        this.orderBy = 'count';
        this.orderByDir = 'desc';
    }
}
