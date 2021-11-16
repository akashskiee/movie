import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '../../../../../../models/title';
import {LoadSelectOptions, ToggleLoading} from '../../state/crupdate-title-actions';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadQueueService} from '../../../../../../../common/uploads/upload-queue/upload-queue.service';
import {LanguageListItem} from '../../../../../../../common/core/services/value-lists.service';
import {openUploadWindow} from '../../../../../../../common/uploads/utils/open-upload-window';
import {UploadInputTypes} from '../../../../../../../common/uploads/upload-input-config';
import {filter, finalize, take} from 'rxjs/operators';
import {Settings} from '../../../../../../../common/core/config/settings.service';
import {MESSAGES} from '../../../../../../toast-messages';
import {TitlesService} from '../../../../titles.service';
import {Toast} from '../../../../../../../common/core/ui/toast.service';

@Component({
    selector: 'primary-facts-panel',
    templateUrl: './primary-facts-panel.component.html',
    styleUrls: ['./primary-facts-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UploadQueueService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryFactsPanelComponent implements OnInit {
    @Select(CrupdateTitleState.title) title$: Observable<Title>;
    @Select(CrupdateTitleState.loading) loading$: Observable<boolean>;
    @Select(CrupdateTitleState.languageOptions) languageOptions$: Observable<LanguageListItem[]>;
    public certificationOptions: string[];
    public poster$ = new BehaviorSubject<string>(null);

    public form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        original_title: ['', [Validators.required, Validators.minLength(1)]],
        is_series: [false, [Validators.required]],
        language: [''],
        tagline: ['', [Validators.minLength(1), Validators.maxLength(250)]],
        poster: ['', [Validators.minLength(1), Validators.maxLength(250)]],
        backdrop: ['', [Validators.minLength(1), Validators.maxLength(250)]],
        description: ['', [Validators.minLength(1)]],
        budget: ['', Validators.min(1)],
        revenue: ['', Validators.min(1)],
        runtime: ['', [Validators.min(1), Validators.max(300)]],
        country: ['', [Validators.minLength(1), Validators.maxLength(50)]],
        popularity: [1, [Validators.min(1), Validators.max(100)]],
        certification: ['pg'],
        release_date: [''],
        allow_update: [true],
    });

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private uploadQueue: UploadQueueService,
        private settings: Settings,
        private router: Router,
        private titles: TitlesService,
        private toast: Toast,
    ) {
        this.certificationOptions = this.settings.getJson('browse.ageRatings');
    }

    ngOnInit() {
        this.store.dispatch(new LoadSelectOptions());

        this.store.select(CrupdateTitleState.title)
            .pipe(filter(t => !!t.id), take(1))
            .subscribe(title => {
                this.form.patchValue({
                    ...title,
                    release_date: title.release_date ? title.release_date.split('T')[0] : null,
                });
                this.poster$.next(title.poster);
            });

        this.form.get('poster').valueChanges.subscribe(value => {
            this.poster$.next(value);
        });
    }

    public uploadImage(type: 'poster'|'backdrop') {
        openUploadWindow({types: [UploadInputTypes.image]}).then(upload => {
            const params = {
                uri: 'uploads/images',
                httpParams: {
                    diskPrefix: `media-images/${type}s`
                },
            };
            this.uploadQueue.start(upload, params).subscribe(fileEntry => {
                this.form.patchValue({
                    [type]: fileEntry.fileEntry.url
                });
            });
        });
    }

    public submit() {
        this.store.dispatch(new ToggleLoading(true));
        const titleId = this.store.selectSnapshot(CrupdateTitleState.title).id;
        const request = titleId ?
            this.titles.update(titleId, this.form.value) :
            this.titles.create(this.form.value);
        request
            .pipe(finalize(() => this.store.dispatch(new ToggleLoading(false))))
            .subscribe(response => {
            this.toast.open(titleId ? MESSAGES.TITLE_UPDATE_SUCCESS : MESSAGES.TITLE_CREATE_SUCCESS);
            if (titleId) {
                this.router.navigate([this.router.url.includes('admin') ? '/admin/titles' : this.router.url.split('?')[0].replace('/edit', '')]);
            } else {
                this.router.navigate([this.router.url.replace('new', '' + response.title.id), 'edit']);
            }
        });
    }
}
