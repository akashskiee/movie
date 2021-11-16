import {Person} from '../../../../models/person';

export class LoadPerson {
    static readonly type = '[CrupdatePerson] Load Person';
    constructor(public id: number) {}
}

export class DetachCredit {
    static readonly type = '[CrupdatePerson] Detach Credit';
    constructor(public id: number) {}
}

export class CreatePerson {
    static readonly type = '[CrupdatePerson] Create Person';
    constructor(public payload: Partial<Person>) {}
}

export class UpdatePerson {
    static readonly type = '[CrupdatePerson] Update Person';
    constructor(public payload: Partial<Person>) {}
}

export class ResetState {
    static readonly type = '[CrupdatePerson] Reset State';
}
