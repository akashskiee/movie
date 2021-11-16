import {Injectable} from '@angular/core';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {VideoCaption} from './caption';

const BASE_URI = 'caption';

@Injectable({
    providedIn: 'root'
})
export class CaptionService {
    constructor(private http: AppHttpClient) {}

    public all(): PaginatedBackendResponse<VideoCaption> {
        return this.http.get(BASE_URI);
    }

    public create(params: FormData): BackendResponse<{ caption: VideoCaption }> {
        return this.http.post(BASE_URI, params);
    }

    public update(id, params: Partial<VideoCaption>|FormData): BackendResponse<{ caption: VideoCaption }> {
        return this.http.put(`${BASE_URI}/${id}`, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${BASE_URI}/${ids}`);
    }

    public reorder(videoId: number, captionIds: {[key: number]: number}): BackendResponse<void> {
        return this.http.post(`${BASE_URI}/${videoId}/order`, {ids: captionIds});
    }
}
