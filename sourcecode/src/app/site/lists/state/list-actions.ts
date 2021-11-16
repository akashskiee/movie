import {List} from '../../../models/list';
import {ListQueryParams} from '../types/list-query-params';
import {ListItem} from '../types/list-item';

export class AttachItem {
    static readonly type = '[List] Attach Item';
    constructor(public item: ListItem) {}
}

export class DetachItem {
    static readonly type = '[List] DetachItem';
    constructor(public item: ListItem) {}
}

export class UpdateDetails {
    static readonly type = '[List] Update Details';
    constructor(public details: Partial<List>) {}
}

export class CreateOrUpdateList {
    static readonly type = '[List] Create or Update List';
}

export class ReloadList {
    static readonly type = '[List] Reload List';
    constructor(public id: number, public params?: ListQueryParams) {}
}

export class ReorderList {
    static readonly type = '[List] Reorder';
    constructor(public currentIndex: number, public newIndex: number) {}
}

export class DeleteList {
    static readonly type = '[List] Delete';
    constructor(public id: number) {}
}

export class ResetState {
    static readonly type = '[List] Reset State';
}

