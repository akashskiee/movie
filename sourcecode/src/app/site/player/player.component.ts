import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Video} from '../../models/video';
import {OverlayPanelRef} from '@common/core/ui/overlay-panel/overlay-panel-ref';
import {BreakpointsService} from '@common/core/ui/breakpoints.service';
import {Settings} from '@common/core/config/settings.service';
import {PlayerService} from './player.service';
import {OVERLAY_PANEL_DATA} from '@common/core/ui/overlay-panel/overlay-panel-data';
import {Title} from '../../models/title';
import {Episode} from '../../models/episode';
import {ShakaStrategyService} from './strategies/shaka-strategy.service';
import {PlyrStrategyService} from './strategies/plyr-strategy.service';

@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        PlayerService,
        ShakaStrategyService,
        PlyrStrategyService,
    ]
})
export class PlayerComponent implements OnInit, OnDestroy {
    @ViewChild('videoContainer', {static: true}) videoContainer: ElementRef<HTMLElement>;

    public trackByFn = (i: number, video: Video) => video.id;

    constructor(
        private overlayRef: OverlayPanelRef,
        public breakpoints: BreakpointsService,
        public player: PlayerService,
        public settings: Settings,
        @Inject(OVERLAY_PANEL_DATA) private data: {video: Video, mediaItem?: Title|Episode},
    ) {}

    ngOnInit() {
        this.player.registerPlyrEl(this.videoContainer);
        this.player.play(this.data.video, this.data.mediaItem);
        // hide sidebar on mobile
        if (this.breakpoints.isMobile$.value) {
            this.player.toggleSidebar();
        }
    }

    ngOnDestroy() {
        this.player.destroy();
    }

    public close() {
        this.overlayRef.close();
    }

    public isTabletOrMobile() {
        return this.breakpoints.isMobile$.value ||
            this.breakpoints.isTablet$.value;
    }
}
