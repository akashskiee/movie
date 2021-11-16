import {Title, TitleCredit, TitleCreditPivot} from '../../../../../models/title';
import {Episode} from '../../../../../models/episode';
import {Video} from '../../../../../models/video';
import {Season} from '../../../../../models/season';
import {Creditable} from '../../../../people/creditable';
import {Image} from '../../../../../models/image';
import {Tag} from '../../../../../../common/core/types/models/Tag';

export class HydrateTitle {
    static readonly type = '[CrupdateTitle] Hydrate';
    constructor(public title?: Title) {}
}

export class LoadSelectOptions {
    static readonly type = '[CrupdateTitle] Load Select Options';
}

export class UpdateCredit {
    static readonly type = '[CrupdateTitle] Update Credit';
    constructor(public id: number, public credit: TitleCreditPivot) {}
}

export class ToggleLoading {
    static readonly type = '[CrupdateTitle] Toggle Loading';
    constructor(public state: boolean) {}
}

export class AddCredit {
    static readonly type = '[CrupdateTitle] Add Credit';
    constructor(
        public personId: number,
        public creditable: Creditable,
        public pivot: TitleCreditPivot
    ) {}
}

export class RemoveCredit {
    static readonly type = '[CrupdateTitle] Remove Credit';
    constructor(public creditable: Creditable, public credit: TitleCredit) {}
}

export class ChangeCreditOrder {
    static readonly type = '[CrupdateTitle] Change Credit Order';
    constructor(
        public creditable: Creditable,
        public currentIndex: number,
        public newIndex: number,
        public creditType: 'cast'|'crew'
    ) {}
}

export class ChangeVideosOrder {
    static readonly type = '[CrupdateTitle] Change Videos Order';
    constructor(
        public currentIndex: number,
        public newIndex: number
    ) {}
}

export class ChangeImageOrder {
    static readonly type = '[CrupdateTitle] Change Image Order';
    constructor(
        public currentIndex: number,
        public newIndex: number
    ) {}
}

export class LoadEpisodeCredits {
    static readonly type = '[CrupdateTitle] Load Episode Credits';
    constructor(public episode: Episode) {}
}

export class UpdateEpisode {
    static readonly type = '[CrupdateTitle] Update Episode';
    constructor(public episode: Episode, public payload: Partial<Episode>) {}
}

export class CreateEpisode {
    static readonly type = '[CrupdateTitle] Create Episode';
    constructor(public season: Season, public payload: Partial<Episode>) {}
}

export class DeleteEpisode {
    static readonly type = '[CrupdateTitle] Delete Episode';
    constructor(public episode: Episode) {}
}

export class AddVideo {
    static readonly type = '[CrupdateTitle] Add Video';
    constructor(public video: Video) {}
}

export class UpdateVideo {
    static readonly type = '[CrupdateTitle] Update Video';
    constructor(public video: Video) {}
}

export class DeleteVideo {
    static readonly type = '[CrupdateTitle] Delete Video';
    constructor(public video: Video) {}
}

export class AddImage {
    static readonly type = '[CrupdateTitle] Add Image';
    constructor(public image: Image) {}
}

export class DeleteImage {
    static readonly type = '[CrupdateTitle] Delete Image';
    constructor(public image: Image) {}
}

export class AttachTags {
    static readonly type = '[CrupdateTitle] Attach Tags';
    constructor(public tags: string[], public tagType: string) {}
}

export class DetachTag {
    static readonly type = '[CrupdateTitle] Detach Tag';
    constructor(public tag: Tag) {}
}

export class CreateSeason {
    static readonly type = '[CrupdateTitle] Create Season';
}

export class DeleteSeason {
    static readonly type = '[CrupdateTitle] Delete Season';
    constructor(public season: Season) {}
}

export class ResetState {
    static readonly type = '[CrupdateTitle] Reset State';
}





