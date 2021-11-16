import {Injectable} from '@angular/core';
import {Person} from '../../models/person';
import {Title} from '../../models/title';
import {MetaTag} from '@common/core/meta/meta-tags.service';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {BackendResponse} from '@common/core/types/backend-response';
import {Episode} from '../../models/episode';

export interface GetPersonResponse {
    person: Person;
    knownFor: Title[];
    credits: {[key: string]: Title[]};
    seo?: MetaTag[];
}

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    static BASE_URI = 'people';
    constructor(private http: AppHttpClient) {}

    public getAll(params: {perPage?: number, page?: number, mostPopular?: boolean, order?: string}): PaginatedBackendResponse<Person> {
        return this.http.get('people', params);
    }

    public get(id: number): BackendResponse<GetPersonResponse> {
        return this.http.get('people/' + id);
    }

    public create(payload: Partial<Person>): BackendResponse<{person: Person}> {
        return this.http.post('people', payload);
    }

    public update(id: number, payload: Partial<Person>): BackendResponse<{person: Person}> {
        return this.http.put('people/' + id, payload);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.http.delete('people', {ids});
    }

    public loadFullTitleCredits(personId: number, titleId: number, department: string): BackendResponse<{credits: Episode[]}> {
        return this.http.get(`people/${personId}/full-credits/${titleId}/${department}`);
    }
}
