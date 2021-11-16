import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Title} from '../../../models/title';
import {VideoService} from '../video.service';
import {finalize} from 'rxjs/operators';
import {MESSAGES} from '../../../toast-messages';
import {Video} from '../../../models/video';
import {UploadQueueService} from '@common/uploads/upload-queue/upload-queue.service';
import {Toast} from '@common/core/ui/toast.service';
import {Settings} from '@common/core/config/settings.service';
import {openUploadWindow} from '@common/uploads/utils/open-upload-window';
import {UploadInputTypes} from '@common/uploads/upload-input-config';
import {LanguageListItem, ValueLists} from '@common/core/services/value-lists.service';
import {Router} from '@angular/router';
import {scrollInvalidInputIntoView} from '@common/core/utils/scroll-invalid-input-into-view';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {UploadApiConfig} from '@common/uploads/types/upload-api-config';

interface AddVideoModalData {
    video?: Video;
    title?: Title;
    season_num?: number;
    episode_num?: number;
}

@Component({
    selector: 'crupdate-video-modal',
    templateUrl: './crupdate-video-modal.component.html',
    styleUrls: ['./crupdate-video-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UploadQueueService],
})
export class CrupdateVideoModalComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public languages$ = new BehaviorSubject<LanguageListItem[]>([]);
    public episodeCount$ = new BehaviorSubject([]);
    public qualities: string[] = [];
    public errors: {[key: string]: any} = {};
    public videoForm = this.fb.group({
        name: [],
        thumbnail: [],
        url: [],
        quality: [null],
        type: ['video'],
        category: ['trailer'],
        title: [],
        title_id: [],
        season_num: [],
        episode_num: [],
        language: ['en'],
        order: [0],
    });

    constructor(
        private fb: FormBuilder,
        private videos: VideoService,
        private toast: Toast,
        private uploadQueue: UploadQueueService,
        private valueLists: ValueLists,
        public settings: Settings,
        private router: Router,
        private dialogRef: MatDialogRef<CrupdateVideoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddVideoModalData,
    ) {
        this.qualities = this.settings.getJson('streaming.qualities', []);
    }

    ngOnInit() {
        this.hydrateForm();
        this.valueLists.get(['languages']).subscribe(response => {
            this.languages$.next(response.languages);
        });
    }

    public confirm() {
        this.loading$.next(true);
        const request = !this.data.video ?
            this.videos.create(this.getPayload()) :
            this.videos.update(this.data.video.id, this.getPayload());
        request.pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                let message: string;
                if (this.data.video) {
                    message = MESSAGES.VIDEO_UPDATE_SUCCESS;
                } else {
                    message = response.video.approved ?
                        MESSAGES.VIDEO_CREATE_SUCCESS :
                        MESSAGES.VIDEO_CREATE_SUCCESS_NEEDS_APPROVAL;
                }

                this.toast.open(message);
                this.errors = {};
                this.close(response.video);
            }, (errResponse: BackendErrorResponse) => {
                this.errors = {};
                if (Object.keys(errResponse.errors).length) {
                    this.errors = errResponse.errors;
                    scrollInvalidInputIntoView(this.errors, 'crupdate-video-modal');
                } else {
                    this.toast.open(MESSAGES.VIDEO_CREATE_FAILED);
                }
            });
    }

    public getPayload() {
        const payload = this.videoForm.getRawValue();
        payload.title_id = payload.title ? payload.title.id : null;
        delete payload.title;
        return payload;
    }

    public close(video?: Video) {
        this.dialogRef.close(video);
    }

    public uploadFile(type: 'image'|'video') {
        openUploadWindow({types: [UploadInputTypes[type]]}).then(uploads => {
            const htmlVideo = document.createElement('video');
            if (type === 'video' &&  !htmlVideo.canPlayType(uploads[0].mime)) {
                return this.toast.open('This video format is not supported.');
            }
            const params = {
                uri: `uploads/${type}s`,
                httpParams: {
                    diskPrefix: type === 'image' ? 'media-images/videos' : 'title-videos',
                    disk: 'public',
                },
            } as UploadApiConfig;

            this.uploadQueue.start(uploads, params).subscribe(response => {
                const prop = type === 'image' ? 'thumbnail' : 'url';
                this.videoForm.patchValue({
                    [prop]: response.fileEntry.url
                });
                if (type === 'video') {
                    this.videoForm.patchValue({type: 'video'});
                }
            });
        });
    }

    public getIterableFromNumber(number) {
        return Array.from(new Array(number), (v, i) => i + 1);
    }

    public isSeries() {
        return this.data.title && this.data.title.is_series;
    }

    private hydrateForm() {
        // update episode count, when season number changes
        this.videoForm.get('season_num').valueChanges.subscribe(number => {
            this.episodeCount$.next(this.getEpisodeCountForSeason(number));
        });

        // set specified video
        if (this.data.video) {
            this.data.video.category = this.data.video.category.toLowerCase() as any;
            this.videoForm.patchValue(this.data.video);
        }

        if (this.data.title) {
            this.videoForm.patchValue({title: this.data.title});
            this.videoForm.get('title').disable();
        }

        // hydrate season and episode number, if media item is series
        if (this.isSeries() && ! this.data.video && ! this.videoForm.value.season_num) {
            this.videoForm.patchValue({
                season_num: this.data.season_num || this.getFirstSeasonNumber(),
                episode_num: this.data.episode_num || 1
            });
        }
    }

    public getEpisodeCountForSeason(seasonNum: number) {
        let episodeCount = 24;
        if (this.data.title) {
            const season = this.data.title.seasons ? this.data.title.seasons.find(s => s.number === seasonNum) : null;
            if (season) {
                episodeCount = season.episodes && season.episodes.length ? season.episodes.length : season.episode_count;
            }
        }
        return this.getIterableFromNumber(episodeCount);
    }

    private getFirstSeasonNumber(): number {
        const title = this.data.title;
        if (title.seasons && title.seasons.length) {
            return title.seasons[0].number;
        } else {
            return 1;
        }
    }

    public insideAdmin(): boolean {
        return this.router.url.indexOf('admin') > -1;
    }

    public supportsCaptions(): boolean {
        const type = this.videoForm.get('type').value;
        return type === 'video' || type === 'stream';
    }

    public isDirectVideo(): boolean {
        return this.videoForm.get('type').value === 'video';
    }

    public isEmbed(): boolean {
        return this.videoForm.get('type').value === 'embed';
    }
}
