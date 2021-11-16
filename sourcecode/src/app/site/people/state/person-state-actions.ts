import {GetPersonResponse} from '../people.service';
import {Person} from '../../../models/person';
import {Title} from '../../../models/title';

export class LoadPerson {
    static readonly type = '[Person] Load';
    constructor(public personId: number) {}
}

export class SetPerson {
    static readonly type = '[Person] Set Person';
    constructor(public response: GetPersonResponse) {}
}

export class LoadFullTitleCredits {
    static readonly type = '[person] Load Full Title Credits';
    constructor(public person: Person, public title: Title, public department: string) {}
}
