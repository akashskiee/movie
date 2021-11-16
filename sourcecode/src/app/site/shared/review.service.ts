import {Injectable} from '@angular/core';
import {MEDIA_TYPE} from '../media-type';
import {Review} from '../../models/review';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';

interface CreateReviewPayload {
    mediaId: number;
    mediaType: MEDIA_TYPE.EPISODE | MEDIA_TYPE.TITLE;
    score: number;
    review?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    static BASE_URI = 'reviews';
    constructor(private http: AppHttpClient) {}

    getAll(params: {
        titleId?: number;
        withTextOnly?: boolean;
        limit?: number;
    }): PaginatedBackendResponse<Review> {
        return this.http.get('reviews', params);
    }

    create(params: CreateReviewPayload): BackendResponse<{review: Review}> {
        return this.http.post('reviews', params);
    }

    update(
        id: number,
        payload: Partial<Review>
    ): BackendResponse<{review: Review}> {
        return this.http.put('reviews/' + id, payload);
    }

    delete(ids: number[]) {
        return this.http.delete(`reviews/${ids}`);
    }
}
