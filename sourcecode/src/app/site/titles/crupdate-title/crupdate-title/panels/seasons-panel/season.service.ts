import {Injectable} from '@angular/core';
import {AppHttpClient} from '../../../../../../../common/core/http/app-http-client.service';
import {BackendResponse} from '../../../../../../../common/core/types/backend-response';
import {Season} from '../../../../../../models/season';

@Injectable({
    providedIn: 'root'
})
export class SeasonService {
    constructor(private http: AppHttpClient) {}

    public create(titleId: number): BackendResponse<{season: Season}> {
        return this.http.post('titles/' + titleId + '/seasons');
    }

    public delete(id: number): BackendResponse<void> {
        return this.http.delete('seasons/' + id);
    }
}
