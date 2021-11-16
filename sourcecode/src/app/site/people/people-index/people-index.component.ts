import {
    ChangeDetectionStrategy,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {PeopleService} from '../people.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {Person} from '../../../models/person';
import {finalize, map} from 'rxjs/operators';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'people-index',
    templateUrl: './people-index.component.html',
    styleUrls: ['./people-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleIndexComponent implements OnInit, OnDestroy {
    loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    pagination$ = new BehaviorSubject<PaginationResponse<Person>>(null);
    form = this.fb.group({
        order: 'popularity:desc',
        page: 1,
    });
    sortOptions = {
        name: 'Name',
        birth_date: 'Birthday',
        popularity: 'Popularity',
        created_at: 'Date Added',
    };

    hasNext$ = combineLatest([this.loading$, this.pagination$]).pipe(
        map(([loading, pagi]) => {
            return !loading && pagi && pagi.current_page !== pagi.last_page;
        })
    );
    hasPrev$ = combineLatest([this.loading$, this.pagination$]).pipe(
        map(([loading, pagination]) => {
            return !loading && pagination && pagination.current_page !== 1;
        })
    );
    private formSub: Subscription;

    constructor(
        private people: PeopleService,
        private route: ActivatedRoute,
        private router: Router,
        protected zone: NgZone,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // update query params when form is updated
        this.formSub = this.form.valueChanges.subscribe(value => {
            // if filters other then page changed, reset page to first one
            if (+value.page === +this.pagination$.value.current_page) {
                value.page = 1;
            }
            this.router.navigate([], {
                queryParams: value,
                replaceUrl: true,
            });
        });

        // update people when query params change
        this.route.queryParams.subscribe(queryParams => {
            const params = {...queryParams};
            if (!params.order) {
                params.order = 'popularity:desc';
            }
            this.reloadPeople(params);
            this.form.reset(params, {emitEvent: false});
        });
    }

    ngOnDestroy() {
        this.formSub.unsubscribe();
    }

    nextPage() {
        const page = parseInt((this.form.value.page || 1));
        this.form.patchValue({page: page + 1});
    }

    prevPage() {
        this.form.patchValue({page: this.form.value.page - 1 || 1});
    }

    private reloadPeople(params: object) {
        this.loading$.next(true);
        this.people
            .getAll({
                ...params,
                perPage: 10,
                mostPopular: true,
            })
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.pagination$.next(response.pagination);
            });
    }
}
