import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    switchMap,
} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SearchProvider, SearchService} from '../search.service';
import {Title} from '../../../models/title';
import {Router} from '@angular/router';
import {Person} from '../../../models/person';
import {GetTitleResponse, TitlesService} from '../../titles/titles.service';
import {
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import {MEDIA_TYPE} from '../../media-type';
import {GetPersonResponse, PeopleService} from '../../people/people.service';
import {SearchResult} from '../search-result';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit {
    @ViewChild('inputEl', {static: true}) inputEl: ElementRef<HTMLInputElement>;
    @ViewChild(MatAutocompleteTrigger) auto: MatAutocompleteTrigger;
    @Output() resultSelected: EventEmitter<Title | Person> = new EventEmitter();
    @Input() placeholder = 'Search for movies, tv shows and people...';
    @Input() label: string;
    @Input() type: MEDIA_TYPE;
    @Input() resetInputOnSelect = true;
    @Input() searchProvider: SearchProvider = null;

    public searchControl = new FormControl();
    public results$ = new BehaviorSubject<SearchResult[]>([]);

    constructor(
        private search: SearchService,
        private router: Router,
        private titles: TitlesService,
        private people: PeopleService,
        private url: UrlGeneratorService
    ) {}

    ngOnInit() {
        this.bindToSearchQueryControl();
    }

    selectResult(e: MatAutocompleteSelectedEvent) {
        this.reset();
        const shouldNavigate = !this.resultSelected.observers.length;
        const result = e.option.value as SearchResult;

        if (shouldNavigate) {
            this.router.navigateByUrl(this.url.generate(result));
        } else {
            this.loadResult(result).subscribe(response => {
                const mediaItem = response['title'] || response['person'];
                this.resultSelected.emit(mediaItem);
            });
        }
    }

    onSubmit() {
        if (!this.resultSelected.observers.length) {
            this.router.navigate(['search'], {
                queryParams: {query: this.searchControl.value},
            });
        }
    }

    isPerson(result: SearchResult): boolean {
        return result.model_type === MEDIA_TYPE.PERSON;
    }

    displayFn(result: Person | Title): string {
        return result ? result.name : null;
    }

    isSearchPage(): boolean {
        return this.router.url.includes('/search?query');
    }

    private bindToSearchQueryControl() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                filter(query => typeof query === 'string'),
                switchMap(query => {
                    if ( ! query) {
                        return of({results: []});
                    }
                    return this.search.everything(query, {
                        type: this.type,
                        limit: 8,
                        provider: this.searchProvider,
                    });
                }),
                catchError(() => of({results: []}))
            )
            .subscribe(response => {
                this.results$.next(response.results);
            });
    }

    private loadResult(
        result: SearchResult
    ): Observable<GetPersonResponse | GetTitleResponse> {
        if (result.model_type === MEDIA_TYPE.PERSON) {
            return this.people.get(result.id).pipe(map(response => response));
        } else {
            return this.titles.get(result.id).pipe(map(response => response));
        }
    }

    private reset() {
        this.inputEl.nativeElement.blur();
        if (this.resetInputOnSelect) {
            this.searchControl.reset();
        }
    }
}
