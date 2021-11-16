import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {CrupdateReviewModalComponent} from '../crupdate-review-modal/crupdate-review-modal.component';
import {Review} from '../../../models/review';
import {Store} from '@ngxs/store';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ReviewService} from '../../shared/review.service';
import {CurrentUser} from '@common/auth/current-user';
import {Toast} from '@common/core/ui/toast.service';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {TitlePageService} from '../../titles/title-page-container/title-page.service';
import {createMap} from '@common/core/utils/create-map';
import {MEDIA_TYPE} from '../../media-type';

@Component({
    selector: 'review-tab',
    templateUrl: './review-tab.component.html',
    styleUrls: ['./review-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewTabComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public reviews = new Map<number, Review>();

    constructor(
        private modal: Modal,
        private store: Store,
        public currentUser: CurrentUser,
        public reviewsApi: ReviewService,
        private toast: Toast,
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadReviews();
    }

    private loadReviews() {
        this.loading$.next(true);
        const params = {
            titleId: this.titlePage.title.id,
            season: this.titlePage.activeSeason?.number,
            episode: this.titlePage.activeEpisode?.episode_number,
            limit: 35,
            withTextOnly: true,
            with: 'user',
        };
        this.reviewsApi
            .getAll(params)
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.reviews = createMap(response.pagination.data);
                this.cd.markForCheck();
            });
    }

    public openCrupdateReviewModal() {
        const review = [...this.reviews.values()].find(
            r => r.user_id === this.currentUser.get('id')
        );
        const mediaId =
            this.titlePage.activeEpisode?.id || this.titlePage.title.id;
        this.modal
            .open(CrupdateReviewModalComponent, {
                review,
                mediaId,
                mediaType: this.titlePage.activeEpisode
                    ? MEDIA_TYPE.EPISODE
                    : MEDIA_TYPE.TITLE,
            })
            .beforeClosed()
            .subscribe(newReview => {
                if (newReview) {
                    this.reviews.set(newReview.id, newReview);
                    this.cd.markForCheck();
                }
            });
    }
}
