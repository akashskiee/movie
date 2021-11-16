import {Injectable} from '@angular/core';
import {Image} from '../../models/image';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {UploadedFile} from '@common/uploads/uploaded-file';
import {BackendResponse} from '@common/core/types/backend-response';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    constructor(private http: AppHttpClient) {}

    public create(file: UploadedFile, params: {modelId: number}): BackendResponse<{image: Image}> {
        const payload = new FormData();
        payload.append('file', file.native);
        Object.keys(params).forEach(key => {
            payload.append(key, params[key]);
        });
        return this.http.post('images', payload);
    }

    public delete(id: number): BackendResponse<void> {
        return this.http.delete('images', {id});
    }
}
