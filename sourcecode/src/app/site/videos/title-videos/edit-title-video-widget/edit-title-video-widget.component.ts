import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input
} from '@angular/core';
import {Video} from '../../../../models/video';
import {Store} from '@ngxs/store';
import {CurrentUser} from '@common/auth/current-user';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {VideoService} from '../../video.service';
import {TitlePageService} from '../../../titles/title-page-container/title-page.service';
import {Toast} from '@common/core/ui/toast.service';

@Component({
    selector: 'edit-title-video-widget',
    templateUrl: './edit-title-video-widget.component.html',
    styleUrls: ['./edit-title-video-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTitleVideoWidgetComponent  {
    public loading$ = new BehaviorSubject(false);
    @Input() video: Video;
    @HostBinding('class.hidden') get shouldShow() {
        return !this.canDeleteVideo() && !this.canEditVideo();
    }

    constructor(
        private store: Store,
        private currentUser: CurrentUser,
        private videoApi: VideoService,
        public titlePage: TitlePageService,
        private toast: Toast,
        private cd: ChangeDetectorRef,
    ) {}

    public deleteVideo() {
        this.loading$.next(true);
        this.videoApi.delete([this.video.id])
            .pipe(finalize(() => this.loading$.next(false)))
                .subscribe(() => {
                    this.titlePage.videos.delete(this.video.id);
                    this.titlePage.changed$.next(this.titlePage.title);
                    this.toast.open('Video deleted.');
                    this.cd.markForCheck();
                });
    }

    public canDeleteVideo() {
        return this.video.user_id === this.currentUser.get('id') ||
            this.currentUser.hasPermission('videos.delete');
    }

    public canEditVideo() {
        return this.video.user_id === this.currentUser.get('id') ||
            this.currentUser.hasPermission('videos.update');
    }
}
