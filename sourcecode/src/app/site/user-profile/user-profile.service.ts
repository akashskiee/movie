import {Injectable} from '@angular/core';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {User} from '@common/core/types/models/User';
import {List} from '../../models/list';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {Review} from '../../models/review';
import {BehaviorSubject} from 'rxjs';
import {Comment} from '@common/shared/comments/comment';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserProfileService {
    static BASE_URI = 'user-profile';
    userId: number;
    user$ = new BehaviorSubject<User>(null);

    constructor(private http: AppHttpClient) {}

    getProfile(userId: number): BackendResponse<{user: User}> {
        this.userId = userId;
        return this.http
            .get<{user: User}>(`${UserProfileService.BASE_URI}/${userId}`)
            .pipe(
                tap(response => {
                    this.user$.next(response.user);
                })
            );
    }

    loadLists(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<List> {
        return this.http.get(
            `${UserProfileService.BASE_URI}/${userId}/lists`,
            params
        );
    }

    loadRatings(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Review> {
        return this.http.get(
            `${UserProfileService.BASE_URI}/${userId}/ratings`,
            params
        );
    }

    loadReviews(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Review> {
        return this.http.get(
            `${UserProfileService.BASE_URI}/${userId}/reviews`,
            params
        );
    }

    loadComments(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<Comment> {
        return this.http.get(
            `${UserProfileService.BASE_URI}/${userId}/comments`,
            params
        );
    }
}
