import {
    ChangeDetectionStrategy,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {Title} from '../../../../models/title';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounceTime, finalize, map} from 'rxjs/operators';
import {
    CountryListItem,
    LanguageListItem,
    ValueLists,
} from '@common/core/services/value-lists.service';
import {BreakpointsService} from '@common/core/ui/breakpoints.service';
import {Settings} from '@common/core/config/settings.service';
import {TITLE_SORT_OPTIONS} from './select-options/title-sort-options';
import {TitlesService} from '../../titles.service';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';

export interface BrowseTitlesPageFormValues {
    type: 'movie' | 'series' | null;
    genre: string[];
    released: string[];
    score: string[];
    country: string;
    language: string;
    runtime: string;
    certification: string[];
    order: string;
    onlyStreamable: boolean;
    page: number | string;
}

@Component({
    selector: 'browse-titles',
    templateUrl: './browse-titles.component.html',
    styleUrls: ['./browse-titles.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTitlesComponent implements OnInit, OnDestroy {
    countries: CountryListItem[] = [];
    languages: LanguageListItem[] = [];
    genres: string[] = this.settings.getJson('browse.genres');
    certifications: string[] = this.settings.getJson('browse.ageRatings');
    sortOptions = TITLE_SORT_OPTIONS;
    yearSliderMin: number;
    yearSliderMax: number;

    loading$ = new BehaviorSubject<boolean>(false);
    pagination$ = new BehaviorSubject<PaginationResponse<Title>>(null);
    anyFilterActive$ = new BehaviorSubject<boolean>(false);

    private formSub: Subscription;
    form = this.fb.group({
        type: [],
        genre: [],
        released: [],
        score: [],
        country: [],
        language: [],
        runtime: [],
        certification: [],
        order: [],
        onlyStreamable: [],
        page: 1,
    });

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

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public breakpoints: BreakpointsService,
        public settings: Settings,
        private router: Router,
        private titles: TitlesService,
        private valueLists: ValueLists,
        protected zone: NgZone
    ) {
        this.yearSliderMin = this.settings.get('browse.year_slider_min', 1880);
        this.yearSliderMax = this.settings.get(
            'browse.year_slider_max',
            this.currentYear()
        );
    }

    ngOnInit() {
        this.loadFilterOptions();

        // update query params when form is updated
        this.formSub = this.form.valueChanges
            .pipe(debounceTime(50))
            .subscribe(value => {
                // if filters other then page changed, reset page to first one
                if (+value.page === +this.pagination$.value.current_page) {
                    value.page = 1;
                }
                this.router.navigate([], {
                    queryParams: this.formValuesToQueryParams(value),
                    replaceUrl: true,
                });
            });

        // update titles when query params change
        this.route.queryParams.subscribe(queryParams => {
            const formValues = this.queryParamsToFormValues(queryParams);

            // "onlyStreamable" should not count as active filter
            this.anyFilterActive$.next(
                Object.keys(formValues).filter(
                    k => !['onlyStreamable', 'page', 'type'].includes(k)
                ).length > 0
            );

            this.reloadTitles(formValues);
            this.form.reset(formValues, {emitEvent: false});
        });
    }

    ngOnDestroy() {
        this.formSub.unsubscribe();
    }

    nextPage() {
        this.form.patchValue({page: +this.form.value.page + 1});
    }

    prevPage() {
        this.form.patchValue({page: this.form.value.page - 1 || 1});
    }

    clearAllFilters() {
        this.form.reset();
    }

    currentYear(): number {
        return new Date().getFullYear() + 3;
    }

    private reloadTitles(formValues: BrowseTitlesPageFormValues) {
        this.loading$.next(true);
        return this.titles
            .getAll({...formValues, perPage: 16})
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.pagination$.next(response.pagination);
            });
    }

    private loadFilterOptions() {
        this.valueLists
            .get(['tmdb-countries', 'tmdb-languages'])
            .subscribe(response => {
                this.languages = response['tmdb-languages'];
                this.countries = response['tmdb-countries'];
            });
    }

    private formValuesToQueryParams(formValues: BrowseTitlesPageFormValues) {
        const filtered = {};
        // filter out null and max values.
        // filters with these values are at maximum range. Rating at
        // (1 to 10) for example so we can remove this filter completely
        const maxValues = ['1,255', '1.0,10.0', '1880,' + this.currentYear()];
        Object.keys(formValues).forEach(key => {
            const value = formValues[key];
            const isEmpty = Array.isArray(value) && !value.length;
            if (value && !isEmpty && maxValues.indexOf(value) === -1) {
                filtered[key] = value;
            }
        });

        // convert arrays to comma string
        Object.keys(filtered).forEach(key => {
            filtered[key] = Array.isArray(filtered[key])
                ? filtered[key].join(',')
                : filtered[key];
        });

        return filtered;
    }

    private queryParamsToFormValues(
        queryParams: Params
    ): BrowseTitlesPageFormValues {
        const formValues: Partial<BrowseTitlesPageFormValues> = {};
        const keys = ['genre', 'released', 'score', 'runtime'];
        Object.keys(queryParams).forEach(key => {
            if (!queryParams[key]) return;
            if (keys.indexOf(key) > -1 && !Array.isArray(queryParams[key])) {
                formValues[key] = queryParams[key].split(',');
            } else if (queryParams[key] === 'true') {
                formValues[key] = true;
            } else if (queryParams[key] === 'false') {
                formValues[key] = false;
            } else {
                formValues[key] = queryParams[key];
            }
        });
        // get default option from settings, if none specified
        if (!formValues.onlyStreamable) {
            formValues.onlyStreamable = !!this.settings.get(
                'browse.streamable_filter_state',
                false
            );
        }
        if (!formValues.page) {
            formValues.page = 1;
        }
        return formValues as BrowseTitlesPageFormValues;
    }
}
