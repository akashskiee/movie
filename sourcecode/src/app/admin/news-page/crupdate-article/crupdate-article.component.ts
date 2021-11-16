import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../../site/news/news.service';
import {NewsArticle} from '../../../models/news-article';
import {MESSAGES} from '../../../toast-messages';
import {BehaviorSubject, Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {UploadQueueService} from '@common/uploads/upload-queue/upload-queue.service';
import {TextEditorComponent} from '@common/text-editor/text-editor.component';
import {UploadInputTypes} from '@common/uploads/upload-input-config';
import {Toast} from '@common/core/ui/toast.service';
import {openUploadWindow} from '@common/uploads/utils/open-upload-window';
import {Settings} from '@common/core/config/settings.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';

@Component({
    selector: 'crupdate-article',
    templateUrl: './crupdate-article.component.html',
    styleUrls: ['./crupdate-article.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UploadQueueService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrupdateArticleComponent implements OnInit {
    @ViewChild(TextEditorComponent, {static: true}) textEditor: TextEditorComponent;
    public errors$: Subject<object> = new Subject();
    public loading$ = new BehaviorSubject(false);
    public articleId: number;

    public articleForm = this.fb.group({
        title: [''],
        body: [''],
        image: [''],
    });

    constructor(
        private news: NewsService,
        private route: ActivatedRoute,
        private toast: Toast,
        private router: Router,
        private fb: FormBuilder,
        private uploadQueue: UploadQueueService,
        private settings: Settings,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadArticle(params['id']);
        });
    }

    public loadArticle(id: number) {
        if ( ! id) return;
        this.loading$.next(true);
        this.news.get(id)
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.hydrateForm(response.article);
                this.textEditor.setContents(response.article.body || '');
                this.articleId = response.article.id;
            });
    }

    public crupdateArticle() {
        this.loading$.next(true);
        const payload = this.getPayload();

        const request = this.articleId ?
            this.news.update(this.articleId, payload) :
            this.news.create(payload);

        request
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(() => {
                this.toast.open(this.articleId ? MESSAGES.NEWS_UPDATE_SUCCESS : MESSAGES.NEWS_CREATE_SUCCESS);
                this.router.navigate(['/admin/news']);
            }, (errResponse: BackendErrorResponse) => {
                this.errors$.next(errResponse.errors);
            });
    }

    private hydrateForm(article: NewsArticle) {
        this.articleForm.setValue({
            title: article.title,
            body: article.body,
            image: article.meta.image,
        });
    }

    private getPayload(): NewsArticle {
        this.articleForm.get('body')
            .setValue(this.textEditor.getContents(), {emitEvent: false});
        return this.articleForm.value;
    }

    public openUploadImageDialog() {
        openUploadWindow({types: [UploadInputTypes.image]})
            .then(files => {
                const params  = {
                    uri: 'uploads/images',
                    httpParams: {diskPrefix: 'news-media'}
                };
                this.uploadQueue.start(files, params).subscribe(entry => {
                    this.toast.open(MESSAGES.IMAGE_UPDATE_SUCCESS);
                    this.articleForm.patchValue({
                        image: entry.fileEntry.url
                    });
                });
            });
    }
}
