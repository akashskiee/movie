import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {CurrentUser} from '@common/auth/current-user';
import {Settings} from '@common/core/config/settings.service';
import {Review} from '../../models/review';
import {ReviewService} from '../../site/shared/review.service';
import {CrupdateReviewModalComponent} from '../../site/reviews/crupdate-review-modal/crupdate-review-modal.component';
import {Observable} from 'rxjs';
import {
    DatatableService,
    DatatableStaticParams,
} from '@common/datatable/datatable.service';
import {MESSAGES} from '../../toast-messages';
import {Toast} from '@common/core/ui/toast.service';
import {Title} from '../../models/title';
import {REVIEW_INDEX_FILTERS} from './review-index-filters';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'reviews-index',
    templateUrl: './reviews-index.component.html',
    styleUrls: ['./reviews-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class ReviewsIndexComponent implements OnInit {
    @Input() title: Title;
    filters = REVIEW_INDEX_FILTERS;
    reviews$ = this.datatable.data$ as Observable<Review[]>;

    constructor(
        public datatable: DatatableService<Review>,
        private reviews: ReviewService,
        private modal: Modal,
        public currentUser: CurrentUser,
        public settings: Settings,
        private toast: Toast,
        public url: UrlGeneratorService
    ) {}

    ngOnInit() {
        // will be paginating inside parent component, so should not update query
        this.datatable.paginator.dontUpdateQueryParams = !!this.title;

        // make sure table filter "titleId" is not overwritten with null from staticParams
        const config = {
            uri: ReviewService.BASE_URI,
            staticParams: {
                with: ['user', 'reviewable'],
            } as DatatableStaticParams,
        };
        if (this.title) {
            config.staticParams = {titleId: this.title.id};
        }
        this.datatable.init(config);
    }

    public openCrupdateReviewModal(review?: Review) {
        this.datatable
            .openCrupdateResourceModal(CrupdateReviewModalComponent, {
                review,
                mediaId: this.title?.id,
                mediaType: this.title?.model_type,
            })
            .subscribe();
    }

    public maybeDeleteSelectedReviews() {
        this.datatable.confirmResourceDeletion('reviews').subscribe(() => {
            this.reviews
                .delete(this.datatable.selectedRows$.value)
                .subscribe(() => {
                    this.toast.open(MESSAGES.REVIEW_DELETE_SUCCESS);
                    this.datatable.reset();
                });
        });
    }
}
