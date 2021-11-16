import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {VideoService} from '../../site/videos/video.service';
import {Video} from '../../models/video';
import {CrupdateVideoModalComponent} from '../../site/videos/crupdate-video-modal/crupdate-video-modal.component';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {CurrentUser} from '@common/auth/current-user';
import {Settings} from '@common/core/config/settings.service';
import {finalize} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Toast} from '@common/core/ui/toast.service';
import {HttpErrors} from '@common/core/http/errors/http-errors.enum';
import {Title} from '../../models/title';
import {DatatableService} from '@common/datatable/datatable.service';
import {VIDEO_INDEX_FILTERS} from './video-index-filters';

@Component({
    selector: 'video-index',
    templateUrl: './video-index.component.html',
    styleUrls: ['./video-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class VideoIndexComponent implements OnInit {
    @Input() title: Title;
    filters = VIDEO_INDEX_FILTERS;
    videos$ = this.datatable.data$ as Observable<Video[]>;
    modifying$ = new BehaviorSubject<boolean>(false);

    constructor(
        public datatable: DatatableService<Video>,
        private videos: VideoService,
        private modal: Modal,
        public currentUser: CurrentUser,
        public settings: Settings,
        private toast: Toast
    ) {}

    ngOnInit() {
        // will be paginating inside parent component, so should not update query
        this.datatable.paginator.dontUpdateQueryParams = !!this.title;

        // make sure table filter "titleId" is not overwritten with null from staticParams
        const config = {uri: VideoService.BASE_URI, staticParams: {}};
        if (this.title) {
            config.staticParams = {titleId: this.title.id};
        }
        this.datatable = this.datatable.init(config);
    }

    public maybeDeleteSelectedVideos() {
        this.datatable.confirmResourceDeletion('videos').subscribe(() => {
            this.videos
                .delete(this.datatable.selectedRows$.value)
                .subscribe(() => {
                    this.datatable.reset();
                });
        });
    }

    public openCrupdateVideoModal(video?: Video) {
        this.datatable
            .openCrupdateResourceModal(CrupdateVideoModalComponent, {
                video,
                title: video ? video.title : this.title,
            })
            .subscribe();
    }

    public toggleApprovedState(video: Video) {
        this.modifying$.next(true);
        const request = video.approved
            ? this.videos.disapprove(video.id)
            : this.videos.approve(video.id);
        video.approved = !video.approved;
        request.pipe(finalize(() => this.modifying$.next(false))).subscribe(
            () => {},
            () => {
                this.toast.open(HttpErrors.Default);
                video.approved = !video.approved;
            }
        );
    }
}
