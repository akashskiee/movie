import {MEDIA_TYPE} from '../site/media-type';
import {TitleCredit} from './title';
import {Episode} from './episode';

export class Season {
    id: number;
    model_type: MEDIA_TYPE.SEASON;
    poster: string;
    number: number;
    release_date: string;
    credits: TitleCredit[];
    episodes: Episode[];
    episode_count: number;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
