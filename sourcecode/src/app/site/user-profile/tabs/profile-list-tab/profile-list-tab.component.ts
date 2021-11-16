import {ChangeDetectionStrategy, Component} from '@angular/core';
import {List} from '../../../../models/list';
import {BaseProfileTab} from '../base-profile-tab';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PROFILE_TAB_ANIMATION} from '../profile-tab-animation';

@Component({
    selector: 'profile-list-tab',
    templateUrl: './profile-list-tab.component.html',
    styleUrls: ['./profile-list-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: PROFILE_TAB_ANIMATION,
})
export class ProfileListTabComponent extends BaseProfileTab<List> {
    protected fetchData(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<List> {
        return this.profile.loadLists(userId, params);
    }
}
