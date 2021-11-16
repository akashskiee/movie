import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Inject} from '@angular/core';
import {Episode} from '../../../../../../../models/episode';
import {Select, Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../../state/crupdate-title-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CreateEpisode, LoadEpisodeCredits, UpdateEpisode} from '../../../state/crupdate-title-actions';
import {MESSAGES} from '../../../../../../../toast-messages';
import {Season} from '../../../../../../../models/season';
import {UploadQueueService} from '../../../../../../../../common/uploads/upload-queue/upload-queue.service';
import {Toast} from '../../../../../../../../common/core/ui/toast.service';
import {openUploadWindow} from '../../../../../../../../common/uploads/utils/open-upload-window';
import {UploadInputTypes} from '../../../../../../../../common/uploads/upload-input-config';
import {BackendErrorResponse} from '../../../../../../../../common/core/types/backend-error-response';

interface CrupdateEpisodeModalData {
    episode?: Episode;
    season?: Season;
}

@Component({
    selector: 'crupdate-episode-modal',
    templateUrl: './crupdate-episode-modal.component.html',
    styleUrls: ['./crupdate-episode-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UploadQueueService],
})
export class CrupdateEpisodeModalComponent implements OnInit {
    @Select(CrupdateTitleState.loading) loading$: Observable<boolean>;
    public episode$: BehaviorSubject<Episode> = new BehaviorSubject(null);
    public errors$: BehaviorSubject<{episode_number?: string}> = new BehaviorSubject({});

    public episodeForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        poster: ['', [Validators.minLength(1), Validators.maxLength(250)]],
        description: ['', [Validators.minLength(1)]],
        popularity: [50, [Validators.min(1), Validators.max(1000)]],
        release_date: [''],
        episode_number: [''],
    });

    constructor(
        private store: Store,
        private toast: Toast,
        private fb: FormBuilder,
        private uploadQueue: UploadQueueService,
        private dialogRef: MatDialogRef<CrupdateEpisodeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateEpisodeModalData,
    ) {}

    ngOnInit() {
        if (this.data.episode) {
            this.bindToStoreEpisode();
            this.episodeForm.patchValue({
                ...this.episode$.value,
                release_date: this.episode$.value.release_date.split('T')[0]
            });
            setTimeout(() => this.loadEpisodeCredits());
        } else {
            const epNum = this.data.season ? this.data.season.episode_count + 1 : 1;
            this.episodeForm.patchValue({episode_number: epNum});
        }
    }

    public confirm() {
        if (this.data.episode) {
            this.updateEpisode();
        } else {
            this.createEpisode();
        }
    }

    public close() {
        this.dialogRef.close();
    }

    private createEpisode() {
        this.store.dispatch(new CreateEpisode(this.data.season, this.episodeForm.value))
            .subscribe(() => {
                this.errors$.next({});
                this.toast.open(MESSAGES.EPISODE_CREATE_SUCCESS);
                const episodes = this.store.selectSnapshot(CrupdateTitleState.seasons)
                    .find(s => s.id === this.data.season.id).episodes;
                this.data.episode = episodes[episodes.length - 1];
            }, (errResponse: BackendErrorResponse) => this.errors$.next(errResponse.errors));
    }

    private updateEpisode() {
        this.store.dispatch(new UpdateEpisode(this.data.episode, this.episodeForm.value))
            .subscribe(() => {
                this.errors$.next({});
                this.toast.open(MESSAGES.EPISODE_UPDATE_SUCCESS);
                this.close();
            }, (errResponse: BackendErrorResponse) => this.errors$.next(errResponse.errors));
    }

    public uploadPoster() {
        openUploadWindow({types: [UploadInputTypes.image]}).then(upload => {
            const params = {
                uri: 'uploads/images',
                httpParams: {
                    diskPrefix: 'media-images/posters'
                },
            };
            this.uploadQueue.start(upload, params).subscribe(response => {
                this.episodeForm.patchValue({
                    poster: response.fileEntry.url
                });
            });
        });
    }

    private bindToStoreEpisode() {
        this.store.select(CrupdateTitleState.title)
            .subscribe(title => {
               if (title.seasons) {
                   const episode = title.seasons.find(s => s.number === this.data.episode.season_number)
                       .episodes.find(e => e.episode_number === this.data.episode.episode_number);
                   this.episode$.next({...episode});
               }
            });
    }

    private loadEpisodeCredits() {
        if ( ! this.data.episode.credits) {
            this.store.dispatch(new LoadEpisodeCredits(this.episode$.value)).toPromise();
        }
    }
}
