import {Person} from '../../../models/person';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {LoadFullTitleCredits, LoadPerson, SetPerson} from './person-state-actions';
import {PeopleService} from '../people.service';
import {Title} from '../../../models/title';
import {MetaTag} from '@common/core/meta/meta-tags.service';
import {Injectable} from '@angular/core';

export interface PersonStateModel {
    person?: Person;
    metaTags?: MetaTag[];
    knownFor?: Title[];
    credits?: {[key: string]: Title[]};
}

@State<PersonStateModel>({
    name: 'person',
    defaults: {
        knownFor: [],
        metaTags: [],
    }
})
@Injectable()
export class PersonState {
    @Selector()
    static person(state: PersonStateModel) {
        return state.person;
    }

    @Selector()
    static credits(state: PersonStateModel) {
        return state.credits;
    }

    @Selector()
    static creditsCount(state: PersonStateModel): number {
        return Object.keys(state.credits).map(department => {
            return state.credits[department].length;
        }).reduce((a, b) => a + b, 0);
    }

    @Selector()
    static knownFor(state: PersonStateModel) {
        return state.knownFor;
    }

    @Selector()
    static backdrop(state: PersonStateModel) {
        const titleWithBackdrop = state.knownFor.find(title => !!title.backdrop);
        return titleWithBackdrop ? titleWithBackdrop.backdrop : null;
    }

    constructor(
        private store: Store,
        private people: PeopleService,
    ) {}

    @Action(LoadPerson)
    loadPerson(ctx: StateContext<PersonStateModel>, action: LoadPerson) {
        const state = ctx.getState();

        if (state.person && state.person.id === action.personId) return;

        return this.people.get(action.personId).pipe(tap(response => {
            this.store.dispatch(new SetPerson(response));
        }));
    }

    @Action(SetPerson)
    setPerson(ctx: StateContext<PersonStateModel>, action: SetPerson) {
        ctx.patchState({
            person: action.response.person,
            credits: action.response.credits,
            knownFor: action.response.knownFor,
            metaTags: action.response.seo,
        });
    }

    @Action(LoadFullTitleCredits)
    loadFullTitleCredits(ctx: StateContext<PersonStateModel>, action: LoadFullTitleCredits) {
        return this.people.loadFullTitleCredits(action.person.id, action.title.id, action.department)
            .pipe(tap(response => {
                const newCredits = {...ctx.getState().credits};
                newCredits[action.department].find(t => t.id === action.title.id).episodes = response.credits;
                ctx.patchState({credits: newCredits});
            }));
    }
}
