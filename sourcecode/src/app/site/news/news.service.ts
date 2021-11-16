import {Injectable} from '@angular/core';
import {NewsArticle} from '../../models/news-article';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    static BASE_URI = 'news';
    constructor(private http: AppHttpClient) {}

    public getAll(params: PaginationParams & {stripHtml?: boolean}): PaginatedBackendResponse<NewsArticle> {
        return this.http.get(NewsService.BASE_URI, params);
    }

    public get(id: number): BackendResponse<{article: NewsArticle}> {
        return this.http.get(`${NewsService.BASE_URI}/${id}`);
    }

    public create(payload: Partial<NewsArticle>): BackendResponse<{article: NewsArticle}> {
        return this.http.post(NewsService.BASE_URI, payload);
    }

    public update(id: number, payload: Partial<NewsArticle>): BackendResponse<{article: NewsArticle}> {
        return this.http.put(`${NewsService.BASE_URI}/${id}`, payload);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete(NewsService.BASE_URI, {ids});
    }
}
