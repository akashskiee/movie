import {MEDIA_TYPE} from '../site/media-type';
import {Title} from './title';

export class Person {
    id: number;
    name: string;
    poster: string;
    known_for?: string;
    gender?: string;
    birth_date: string;
    death_date: string;
    birth_place: string;
    credits?: Title[];
    popular_credits?: Title[];
    views?: number;
    popularity?: number;
    updated_at?: string;
    description: string;
    model_type: MEDIA_TYPE.PERSON;

    constructor(params: object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
