import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {PersonState} from '../state/person-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {Person} from '../../../models/person';
import {Title} from '../../../models/title';
import {Episode} from '../../../models/episode';
import {LoadFullTitleCredits} from '../state/person-state-actions';
import {finalize} from 'rxjs/operators';
import {CurrentUser} from '@common/auth/current-user';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

interface CreditPivot {
    department: string;
    character: string;
    job: string;
}

interface TitleCredit extends Title {
    credited_episode_count: number;
    pivot: CreditPivot;
    episodes: (Episode & {pivot: CreditPivot})[];
}

@Component({
    selector: 'person-page',
    templateUrl: './person-page.component.html',
    styleUrls: ['./person-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPageComponent {
    @Select(PersonState.person) person$: Observable<Person>;
    @Select(PersonState.credits) credits$: Observable<{
        [key: string]: TitleCredit[];
    }>;
    @Select(PersonState.knownFor) knownFor$: Observable<Title[]>;
    @Select(PersonState.backdrop) backdrop$: Observable<string>;
    @Select(PersonState.creditsCount) creditsCount$: Observable<number>;

    public loadingAdditionalCredits$ = new BehaviorSubject(false);

    constructor(
        public url: UrlGeneratorService,
        private store: Store,
        public currentUser: CurrentUser
    ) {}

    trackByFn(index: number, title: TitleCredit) {
        return title.id;
    }

    originalOrder = (): number => 0;

    loadFullTitleCredits(person: Person, title: Title, department: string) {
        this.loadingAdditionalCredits$.next(true);
        this.store
            .dispatch(new LoadFullTitleCredits(person, title, department))
            .pipe(finalize(() => this.loadingAdditionalCredits$.next(false)))
            .subscribe();
    }
}
