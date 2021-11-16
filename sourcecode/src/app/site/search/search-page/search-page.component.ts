import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SearchResponse, SearchService} from '../search.service';
import {SearchResult} from '../search-result';
import {MEDIA_TYPE} from '../../media-type';
import {filter, map, skip} from 'rxjs/operators';

@Component({
    selector: 'search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
    public query$ = new BehaviorSubject<string>('');
    public movies$ = new BehaviorSubject<SearchResult[]>([]);
    public series$ = new BehaviorSubject<SearchResult[]>([]);
    public people$ = new BehaviorSubject<SearchResult[]>([]);

    constructor(
        private route: ActivatedRoute,
        private search: SearchService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: {api: SearchResponse}) => {
           this.setResults(data.api.query, data.api.results);
        });

        this.route.queryParams
            .pipe(map(params => params.query), filter(q => !!q), skip(1))
            .subscribe(query => {
                this.search.everything(query, {limit: 20}).subscribe(response => {
                    this.setResults(response.query, response.results);
                });
            });
    }

    private setResults(query: string, results: SearchResult[]) {
        this.query$.next(query);
        this.movies$.next(results.filter(r => r.model_type === MEDIA_TYPE.TITLE && !r.is_series));
        this.series$.next(results.filter(r => r.model_type === MEDIA_TYPE.TITLE && r.is_series));
        this.people$.next(results.filter(r => r.model_type === MEDIA_TYPE.PERSON));
    }
}
