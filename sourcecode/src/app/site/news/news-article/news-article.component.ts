import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NewsService} from '../news.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {NewsArticle} from '../../../models/news-article';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'news-article',
    templateUrl: './news-article.component.html',
    styleUrls: ['./news-article.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleComponent implements OnInit {
    public article$: Subject<NewsArticle> = new Subject();
    public loading$: Subject<boolean> = new Subject();
    public sidebarArticles$: Subject<NewsArticle[]> = new Subject();

    constructor(
        private news: NewsService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {}

    ngOnInit() {
        this.bindToRouteParams();
    }

    public trustHtml(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    
    private getSidebarArticles() {
        return this.news.getAll({perPage: 10}).subscribe(response => {
            this.sidebarArticles$.next(response.pagination.data);
        });
    }
    
    private bindToRouteParams() {
        this.route.params.subscribe(params => {
            this.loading$.next(true);
            this.news.get(+params.id)
                .pipe(finalize(() => this.loading$.next(false)))
                .subscribe(response => {
                    this.article$.next(response.article);
                });
            this.getSidebarArticles();
        });
    }
}
