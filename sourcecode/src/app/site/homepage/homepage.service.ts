import {Injectable} from '@angular/core';
import {List} from '../../models/list';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BackendResponse} from '@common/core/types/backend-response';

@Injectable({
    providedIn: 'root'
})
export class HomepageService {
    constructor(private http: AppHttpClient) {}

    public getLists(): BackendResponse<{lists: List[]}> {
        return this.http.get('homepage/lists');
    }
}
