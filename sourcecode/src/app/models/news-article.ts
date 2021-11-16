import {MEDIA_TYPE} from '../site/media-type';

export class NewsArticle {
    id: number;
    title?: string;
    body: string;
    slug: string;
    model_type = MEDIA_TYPE.NEWS;
    created_at?: string;
    updated_at?: string;
    meta: {
        image: string,
        source: string,
    };

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
