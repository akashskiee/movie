import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input
} from '@angular/core';
import {Video} from '../../../../models/video';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {VideoService} from '../../video.service';
import {TitlePageService} from '../../../titles/title-page-container/title-page.service';

@Component({
    selector: 'video-rating-widget',
    templateUrl: './video-rating-widget.component.html',
    styleUrls: ['./video-rating-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoRatingWidgetComponent {
    public loading$ = new BehaviorSubject<boolean>(false);
    @Input() video: Video;

    constructor(
        private videoApi: VideoService,
        private titlePage: TitlePageService,
        private cd: ChangeDetectorRef,
    ) {}

    public rateVideo(video: Video, rating: 'positive' | 'negative') {
        this.loading$.next(true);
        return this.videoApi.rate(video.id, rating)
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                const updatedVideo = this.titlePage.videos.get(video.id);
                updatedVideo.positive_votes = response.video.positive_votes;
                updatedVideo.negative_votes = response.video.negative_votes;
                this.titlePage.videos.set(video.id, updatedVideo);
                this.cd.markForCheck();
            });
    }
}
