import {Injectable} from '@angular/core';
import {List} from '../../models/list';
import {MEDIA_TYPE} from '../media-type';
import {ListItem} from './types/list-item';
import {ListQueryParams} from './types/list-query-params';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';

interface CrupdateListPayload {
    details: Partial<List>;
    items: { id: number, type: MEDIA_TYPE }[];
}

interface ListIndexParams extends PaginationParams {
    userId?: number;
    query?: string;
    listIds?: number[];
    excludeSystem?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    static BASE_URI = 'lists';
    constructor(private http: AppHttpClient) {}

    public get(id: number, params: ListQueryParams): BackendResponse<{list: List, items: PaginationResponse<ListItem>}> {
        return this.http.get('lists/' + id, params);
    }

    public getAll(params: ListIndexParams): PaginatedBackendResponse<List> {
        return this.http.get('lists', params);
    }

    public update(id: number, payload: CrupdateListPayload): BackendResponse<{list: List}> {
        return this.http.put('lists/' + id, payload);
    }

    public create(payload: CrupdateListPayload): BackendResponse<{list: List}> {
        return this.http.post('lists', payload);
    }

    public addItem(listId: number, mediaItem: ListItem): BackendResponse<{list: List}> {
        return this.http.post('lists/' + listId + '/add', {itemId: mediaItem.id, itemType: mediaItem.model_type});
    }

    public removeItem(listId: number, mediaItem: ListItem): BackendResponse<{list: List}> {
        return this.http.post('lists/' + listId + '/remove', {itemId: mediaItem.id, itemType: mediaItem.model_type});
    }

    public reorder(listId: number, itemIds: {[key: number]: number}) {
        return this.http.post('lists/' + listId + '/reorder', {itemIds});
    }

    public delete(listIds: number[]) {
        return this.http.delete(`lists/${listIds}`);
    }
}
