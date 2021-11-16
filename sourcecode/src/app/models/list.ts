import {ListItem} from '../site/lists/types/list-item';
import {User} from '@common/core/types/models/User';
import {MediaViewMode} from '../site/shared/media-view/media-view-mode';

export class List {
    id: number;
    name: string;
    image: string;
    description: string;
    style: MediaViewMode;
    items: ListItem[];
    system: boolean;
    public: boolean;
    user_id: number;
    user?: User;
    items_count?: number;
    updated_at?: string;
    created_at?: string;

    constructor(params: object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
