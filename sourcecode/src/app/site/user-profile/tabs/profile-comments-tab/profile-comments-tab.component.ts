import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseProfileTab} from '../base-profile-tab';
import {Comment} from '@common/shared/comments/comment';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PROFILE_TAB_ANIMATION} from '../profile-tab-animation';

@Component({
    selector: 'profile-comments-tab',
    templateUrl: './profile-comments-tab.component.html',
    styleUrls: ['./profile-comments-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: PROFILE_TAB_ANIMATION,
})
export class ProfileCommentsTabComponent extends BaseProfileTab<Comment> {
    protected fetchData(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Comment> {
        return this.profile.loadComments(userId, params);
    }
}
