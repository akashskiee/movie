import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';
import {TitlePageService} from '../../title-page-container/title-page.service';

@Component({
    selector: 'media-item-header',
    templateUrl: './media-item-header.component.html',
    styleUrls: ['./media-item-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaItemHeaderComponent {
    @Input() backdrop: string;
    @Input() transparent = false;

    constructor(
        public settings: Settings,
        public titlePage: TitlePageService,
    ) {}

    @HostBinding('style.background-image') get backgroundImage() {
        if (this.backdrop) {
            return 'url(' + this.backdrop + ')';
        }
    }

    @HostBinding('class.no-backdrop') get noBackdrop() {
        if ( ! this.backdrop) {
            return 'no-backdrop';
        }
    }
}
