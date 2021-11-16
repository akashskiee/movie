import {Person} from './person';
import {Video} from './video';
import {Image} from './image';
import {MEDIA_TYPE} from '../site/media-type';
import {Episode} from './episode';
import {Season} from './season';
import {Review} from './review';
import {Tag} from '@common/core/types/models/Tag';

export interface GroupedCredits {
    [key: string]: TitleCredit[];
}

export interface TitleCredit extends Person {
    pivot: TitleCreditPivot;
}

export interface TitleCreditPivot {
    id: number;
    job: string;
    department: string;
    character: string;
    order: number;
}

export class Title {
    id: number;
    name: string;
    model_type: MEDIA_TYPE.TITLE;
    is_series: boolean;
    description: string;
    tagline: string;
    runtime: number;
    rating: number;
    budget: number;
    poster: string;
    backdrop: string;
    revenue: number;
    views: number;
    popularity: number;
    season_count: number;
    episode_count: number;
    release_date: string;
    year: number;
    genres: Tag[];
    keywords: Tag[];
    countries: Tag[];
    videos: Video[];
    all_videos?: Video[];
    stream_videos_count?: number;
    certification?: string;
    images: Image[];
    credits: TitleCredit[];
    episodes: Episode[];
    season?: Season;
    seasons?: Season[];
    reviews?: Review[];
    language: string;
    show_videos: boolean;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
