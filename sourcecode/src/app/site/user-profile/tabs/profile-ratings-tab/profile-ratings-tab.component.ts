import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Review} from '../../../../models/review';
import {PROFILE_TAB_ANIMATION} from '../profile-tab-animation';
import {BaseProfileTab} from '../base-profile-tab';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';

@Component({
    selector: 'profile-ratings-tab',
    templateUrl: './profile-ratings-tab.component.html',
    styleUrls: ['./profile-ratings-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: PROFILE_TAB_ANIMATION,
})
export class ProfileRatingsTabComponent extends BaseProfileTab<Review> {
    protected fetchData(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Review> {
        return this.profile.loadRatings(userId, params);
    }
}
