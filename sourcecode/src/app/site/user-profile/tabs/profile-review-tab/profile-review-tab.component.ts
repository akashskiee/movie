import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Review} from '../../../../models/review';
import {BaseProfileTab} from '../base-profile-tab';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PROFILE_TAB_ANIMATION} from '../profile-tab-animation';

@Component({
    selector: 'profile-review-tab',
    templateUrl: './profile-review-tab.component.html',
    styleUrls: ['./profile-review-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: PROFILE_TAB_ANIMATION,
})
export class ProfileReviewTabComponent extends BaseProfileTab<Review> {
    protected fetchData(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Review> {
        return this.profile.loadReviews(userId, params);
    }

    removeReview(reviewId: number) {
        const newData = this.pagination$.value.data.filter(
            r => r.id !== reviewId
        );
        this.pagination$.next({
            ...this.pagination$.value,
            data: newData,
        });
    }
}
