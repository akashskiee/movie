import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {TitlePageService} from '../../../titles/title-page-container/title-page.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Video} from '../../../../models/video';
import {finalize} from 'rxjs/operators';
import {VideoService} from '../../video.service';
import {Toast} from '@common/core/ui/toast.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';

@Component({
    selector: 'title-video-table',
    templateUrl: './title-video-table.component.html',
    styleUrls: ['./title-video-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleVideoTableComponent implements OnInit, OnDestroy {
    private changeSub: Subscription;
    public loading$ = new BehaviorSubject(false);
    public videos: Video[] = [];
    constructor(
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef,
        private videoApi: VideoService,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.changeSub = this.titlePage.changed$.subscribe(() => {
            this.videos = [...this.titlePage.videos.values()];
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }

    public reportVideo(video: Video) {
        this.loading$.next(true);
        return this.videoApi.report(video.id)
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(() => {
                this.toast.open('Video reported.');
            }, (errResponse: BackendErrorResponse) => {
                this.toast.open(errResponse.message);
            });
    }
}
