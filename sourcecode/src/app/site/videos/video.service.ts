import {Injectable} from '@angular/core';
import {Video} from '../../models/video';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    static BASE_URI = 'videos';
    constructor(private http: AppHttpClient) {}

    public create(payload: Partial<Video>): BackendResponse<{video: Video}> {
        return this.http.post(VideoService.BASE_URI, payload);
    }

    public update(id: number, payload: Partial<Video>): BackendResponse<{video: Video}> {
        return this.http.put(`${VideoService.BASE_URI}/${id}`, payload);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(`${VideoService.BASE_URI}/${ids}`);
    }

    public rate(id: number, rating: 'positive' | 'negative'): BackendResponse<{video: Video}> {
        return this.http.post(`${VideoService.BASE_URI}/${id}/rate`, {rating});
    }

    public approve(id: number) {
        return this.http.post(`${VideoService.BASE_URI}/${id}/approve`);
    }

    public disapprove(id: number) {
        return this.http.post(`${VideoService.BASE_URI}/${id}/disapprove`);
    }

    public report(id: number) {
        return this.http.post(`${VideoService.BASE_URI}/${id}/report`);
    }

    public logPlay(video: Video, params: object): BackendResponse<void> {
        return this.http.post(`${VideoService.BASE_URI}/${video.id}/log-play`, params);
    }
}
