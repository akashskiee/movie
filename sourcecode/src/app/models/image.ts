export class Image {
    id: number;
    url: string;
    type: 'backdrop'|'poster';
    source: 'local'|'tmdb';

    constructor(params: object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
