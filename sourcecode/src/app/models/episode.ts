import {MEDIA_TYPE} from '../site/media-type';
import {TitleCredit} from './title';
import {Video} from './video';

export class Episode {
    id: number;
    name: string;
    model_type: MEDIA_TYPE.EPISODE;
    poster: string;
    rating: number;
    description: string;
    season_number: number;
    episode_number: number;
    title_id: number;
    release_date: string;
    year: number;
    credits: TitleCredit[];
    videos?: Video[];
    stream_videos_count?: number;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
