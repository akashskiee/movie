import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Person} from '../../../../models/person';
import {finalize, tap} from 'rxjs/operators';
import {
    CreatePerson,
    DetachCredit,
    LoadPerson,
    ResetState,
    UpdatePerson
} from './crupdate-person-state-actions';
import {PeopleService} from '../../people.service';
import {TitleCredit} from '../../../../models/title';
import {TitlesService} from '../../../titles/titles.service';
import {Injectable} from '@angular/core';

interface CrupdatePersonStateModel {
    person: Person;
    credits: TitleCredit[];
    loading: boolean;
}

@State<CrupdatePersonStateModel>({
    name: 'crupdatePerson',
    defaults: {
        person: new Person(),
        credits: [],
        loading: false,
    },
})
@Injectable()
export class CrupdatePersonState {
    @Selector()
    static person(state: CrupdatePersonStateModel) {
        return state.person;
    }

    @Selector()
    static loading(state: CrupdatePersonStateModel) {
        return state.loading;
    }

    @Selector()
    static credits(state: CrupdatePersonStateModel) {
        return state.credits;
    }

    constructor(
        private people: PeopleService,
        private titles: TitlesService,
    ) {}

    @Action(LoadPerson)
    loadPerson(ctx: StateContext<CrupdatePersonStateModel>, action: LoadPerson) {
        ctx.patchState({loading: true});
        return this.people.get(action.id).pipe(tap(response => {
            ctx.patchState({
                person: response.person,
                credits: this.flattenCredits(response.credits),
                loading: false
            });
        }));
    }

    @Action(CreatePerson)
    createPerson(ctx: StateContext<CrupdatePersonStateModel>, action: CreatePerson) {
        ctx.patchState({loading: true});
        return this.people.create(action.payload).pipe(
            finalize(() => ctx.patchState({loading: false})),
            tap(response => ctx.patchState({person: response.person}))
        );
    }

    @Action(UpdatePerson)
    updatePerson(ctx: StateContext<CrupdatePersonStateModel>, action: UpdatePerson) {
        ctx.patchState({loading: true});
        return this.people.update(ctx.getState().person.id, action.payload).pipe(
            finalize(() => ctx.patchState({loading: false})),
            tap(response => ctx.patchState({person: response.person}))
        );
    }

    @Action(DetachCredit)
    removeCredit(ctx: StateContext<CrupdatePersonStateModel>, action: DetachCredit) {
        ctx.patchState({loading: true});
        return this.titles.removeCredit(action.id).pipe(
            tap(() => {
                const newCredits = ctx.getState().credits.filter(credit => {
                    return credit.pivot.id !== action.id;
                });
                ctx.patchState({credits: newCredits});
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ResetState)
    resetState(ctx: StateContext<CrupdatePersonStateModel>) {
        ctx.patchState({
            person: new Person(),
            credits: [],
            loading: false,
        });
    }

    private flattenCredits(credits: object) {
        const flatCredits = [];
        Object.keys(credits).forEach(key => {
            flatCredits.push(...credits[key]);
        });
        return flatCredits;
    }
}
