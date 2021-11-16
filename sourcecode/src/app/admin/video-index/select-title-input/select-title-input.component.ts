import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    finalize,
    map,
    switchMap
} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Title} from '../../../models/title';
import {SearchService} from '../../../site/search/search.service';
import {MEDIA_TYPE} from '../../../site/media-type';
import {TitlesService} from '../../../site/titles/titles.service';
import {SearchResult} from '../../../site/search/search-result';

@Component({
    selector: 'select-title-input',
    templateUrl: './select-title-input.component.html',
    styleUrls: ['./select-title-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTitleInputComponent implements OnInit, OnDestroy {
    @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement>;
    @Input() titleError: string;
    @Input() formGroup: FormGroup;
    public searchFormControl = new FormControl();
    public loading$ = new BehaviorSubject(false);
    public titles$ = new BehaviorSubject<SearchResult[]>([]);
    public selectedTitle$ = new BehaviorSubject<Title>(null);
    public searchedOnce = false;
    private subscriptions: Subscription[] = [];

    constructor(
        private search: SearchService,
        private titles: TitlesService,
    ) {}

    ngOnInit() {
        this.bindToSearchControl();

        // clear selected episode on season change
        const seasonSub = this.formGroup.get('season_num').valueChanges.subscribe(() => {
            if (this.formGroup.get('episode_num').value) {
                this.formGroup.patchValue({episode_num: null});
            }
        });
        this.subscriptions.push(seasonSub);
        if (this.formGroup.get('title').value) {
            this.selectedTitle$.next(this.formGroup.get('title').value);
        }
    }

    ngOnDestroy()  {
        this.subscriptions.forEach(s => s && s.unsubscribe());
    }

    private bindToSearchControl() {
        this.searchFormControl.valueChanges.pipe(
            debounceTime(150),
            distinctUntilChanged(),
            switchMap(query => this.searchTitles(query)),
            catchError(() => of([])),
        ).subscribe(titles => {
            this.searchedOnce = true;
            this.titles$.next(titles);
        });
    }

    private searchTitles(query: string): Observable<SearchResult[]> {
        this.loading$.next(true);
        // search the titles if query is provided
        if (query) {
            return this.search.everything(query, {type: MEDIA_TYPE.TITLE, provider: 'local', with: ['seasons']})
                .pipe(
                    finalize(() =>  this.loading$.next(false)),
                    map(response => response.results),
                );
        // otherwise show a few most popular titles by default
        } else {
            return this.titles.getAll({query, perPage: 7, with: ['seasons']})
                .pipe(
                    finalize(() =>  this.loading$.next(false)),
                    map(response => response.pagination.data),
                );
        }
    }

    public onMenuOpened() {
        if (!this.searchedOnce) {
            this.clearSearchInput();
        }
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        });
    }

    public selectTitle(title: Title) {
        this.selectedTitle$.next(title);
        this.formGroup.patchValue({
            season_num: null,
            episode_num: null,
            title,
        });
    }

    public clearSearchInput() {
        this.searchFormControl.setValue('');
    }

    public onMenuClosed() {
        this.loading$.next(false);
        this.clearSearchInput();
    }

    public getEpisodeIterable(): undefined[] {
        const seasonNum = parseInt(this.formGroup.get('season_num').value || 1);
        const season = this.selectedTitle$.value.seasons.find(s => s.number === seasonNum);
        const count = season && season.episode_count ? season.episode_count : 24;
        return new Array(count);
    }

    public prefixWithZero(number: number|string) {
        if (number < 10) {
            number = '0' + number;
        }
        return number;
    }
}
