import {Injectable} from '@angular/core';
import {MEDIA_TYPE} from '../media-type';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {SearchResult} from './search-result';

export interface SearchEverythingParams {
    type?: MEDIA_TYPE;
    limit?: number;
    with?: string[];
    provider?: SearchProvider | null;
}

export interface SearchResponse {
    results: SearchResult[];
    query: string;
}

export type SearchProvider = 'local'|'tmdb'|'all';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private http: AppHttpClient) {}

    public everything(query: string, queryParams: SearchEverythingParams): BackendResponse<SearchResponse> {
        return this.http.get('search/' + encodeURIComponent(query), queryParams);
    }
}
