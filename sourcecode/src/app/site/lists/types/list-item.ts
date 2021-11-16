import {Title} from '../../../models/title';
import {Episode} from '../../../models/episode';
import {Person} from '../../../models/person';

interface ListPivot {
    id: number;
    listable_type: string;
    listable_id: number;
    order: number;
}

interface ListTitle extends Title {
    pivot?: ListPivot;
}

interface ListPerson extends Person {
    pivot?: ListPivot;
}

interface ListEpisode extends Episode {
    pivot?: ListPivot;
}

export type ListItem = ListTitle|ListEpisode|ListPerson;
