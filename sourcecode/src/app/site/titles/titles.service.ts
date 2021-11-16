import {Injectable} from '@angular/core';
import {Title, TitleCredit, TitleCreditPivot} from '../../models/title';
import {Video} from '../../models/video';
import {Episode} from '../../models/episode';
import {Person} from '../../models/person';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {MetaTag} from '@common/core/meta/meta-tags.service';
import {Tag} from '@common/core/types/models/Tag';
import {BrowseTitlesPageFormValues} from './components/browse-titles/browse-titles.component';

export interface GetTitleResponse {
    title: Title;
    seo?: MetaTag[];
    current_episode?: Episode;
    next_episode?: Episode;
}

export interface GetTitleQueryParams {
    titleId?: number;
    seasonNumber?: number;
    episodeNumber?: number;
    fullCredits?: boolean;
    keywords?: boolean;
    seasons?: boolean;
    countries?: boolean;
    skipUpdating?: boolean;
}

export interface BrowseTitlesQueryParams
    extends Partial<BrowseTitlesPageFormValues> {
    query?: string;
    perPage?: number;
    with?: string[];
}

export interface RelatedVideosParams {
    titleId?: number;
    videoId?: number;
    episode?: number;
    season?: number;
}

@Injectable({
    providedIn: 'root',
})
export class TitlesService {
    static BASE_URI = 'titles';
    constructor(private http: AppHttpClient) {}

    public get(
        titleId: number,
        queryParams?: GetTitleQueryParams
    ): BackendResponse<GetTitleResponse> {
        return this.http.get('titles/' + titleId, queryParams);
    }

    public getAll(
        queryParams?: BrowseTitlesQueryParams
    ): PaginatedBackendResponse<Title> {
        return this.http.get('titles', queryParams);
    }

    public getRelatedVideos(
        params: RelatedVideosParams
    ): BackendResponse<{videos: Video[]}> {
        return this.http.get('related-videos', params);
    }

    public getRelatedTitles(
        title: Title,
        params?: {limit: number}
    ): BackendResponse<{titles: Title[]}> {
        return this.http.get('titles/' + title.id + '/related', params);
    }

    public create(payload: Partial<Title>): BackendResponse<{title: Title}> {
        return this.http.post('titles', payload);
    }

    public update(
        id: number,
        payload: Partial<Title>
    ): BackendResponse<{title: Title}> {
        return this.http.put('titles/' + id, payload);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete('titles', {ids});
    }

    public updateCredit(
        id: number,
        payload: TitleCreditPivot
    ): BackendResponse<{credit: TitleCreditPivot}> {
        return this.http.put('titles/credits/' + id, {credit: payload});
    }

    public addCredit(
        personId: number,
        creditable: {type: string; id: number},
        pivot: TitleCreditPivot
    ): BackendResponse<{credit: TitleCredit}> {
        return this.http.post('titles/credits', {personId, creditable, pivot});
    }

    public removeCredit(id: number): BackendResponse<void> {
        return this.http.delete('titles/credits/' + id);
    }

    public changeCreditsOrder(payload: {
        [key: number]: number;
    }): BackendResponse<void> {
        return this.http.post('titles/credits/reorder', {ids: payload});
    }

    public getEpisode(id: number): BackendResponse<{episode: Episode}> {
        return this.http.get('episodes/' + id);
    }

    public deleteEpisode(id: number): BackendResponse<void> {
        return this.http.delete('episodes/' + id);
    }

    public createEpisode(
        seasonId: number,
        payload: Partial<Episode>
    ): BackendResponse<{episode: Episode}> {
        return this.http.post('seasons/' + seasonId + '/episodes', payload);
    }

    public updateEpisode(
        id: number,
        payload: Partial<Episode>
    ): BackendResponse<{episode: Episode}> {
        return this.http.put('episodes/' + id, payload);
    }

    public attachTags(
        titleId: number,
        params: {tags: string[]; tagType: string}
    ): BackendResponse<{tags: Tag[]}> {
        return this.http.post('titles/' + titleId + '/tags', params);
    }

    public detachTag(titleId: number, tag: Tag): BackendResponse<void> {
        return this.http.delete(
            'titles/' + titleId + '/tags/' + tag.type + '/' + tag.id
        );
    }

    public changeVideosOrder(titleId: number, order: {[key: number]: number}) {
        return this.http.post('titles/' + titleId + '/videos/change-order', {
            ids: order,
        });
    }

    public changeImageOrder(titleId: number, order: {[key: number]: number}) {
        return this.http.post('titles/' + titleId + '/images/change-order', {
            ids: order,
        });
    }

    public import(
        params: object
    ): BackendResponse<{mediaItem: Title | Person}> {
        return this.http.post('media/import', params);
    }
}
