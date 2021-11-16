import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
} from '@angular/core';
import {Title} from '../../../../models/title';
import {PlayerOverlayService} from '../../../player/player-overlay.service';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'media-view-play-button',
    templateUrl: './media-view-play-button.component.html',
    styleUrls: ['./media-view-play-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaViewPlayButtonComponent implements OnChanges {
    @Input() title: Title;

    @HostBinding('class.hidden') shouldHide = false;

    ngOnChanges() {
        this.shouldHide =
            !this.title?.videos?.length ||
            !this.settings.get('homepage.show_play_buttons');
    }

    constructor(
        private playerOverlay: PlayerOverlayService,
        private settings: Settings
    ) {}

    playVideo() {
        this.playerOverlay.open(this.title.videos[0], this.title);
    }
}
