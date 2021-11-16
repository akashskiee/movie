import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UrlGeneratorService {
    generate(model: {model_type: string}, extra?: object): string {
        return this[model.model_type](model, extra);
    }
}
