import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Image} from '../../../models/image';
import {ImageGalleryOverlayComponent} from '../../shared/image-gallery-overlay/image-gallery-overlay.component';
import {ViewportScroller} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CurrentUser} from '@common/auth/current-user';
import {TitlePageService} from './title-page.service';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {Settings} from '@common/core/config/settings.service';
import {OverlayPanel} from '@common/core/ui/overlay-panel/overlay-panel.service';

@Component({
    selector: 'title-page-container',
    templateUrl: './title-page-container.component.html',
    styleUrls: ['./title-page-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TitlePageContainerComponent implements OnInit {
    @ViewChild(MatTabGroup, {static: true}) matTabGroup: MatTabGroup;
    public map: Map<string, string>;

    constructor(
        public settings: Settings,
        private overlay: OverlayPanel,
        private route: ActivatedRoute,
        private viewportScroller: ViewportScroller,
        public titlePage: TitlePageService,
        public currentUser: CurrentUser,
        private cd: ChangeDetectorRef,
    ) {

        this.map = new Map([['key', 'value']]);
    }

    ngOnInit() {
        this.titlePage.changed$.subscribe(() => {
            this.matTabGroup.selectedIndex = 0;
            this.cd.markForCheck();
        });
    }

    public openImageGallery(images: Image[], activeIndex: number) {
        this.overlay.open(ImageGalleryOverlayComponent, {
            origin: 'global',
            position: 'center',
            panelClass: 'image-gallery-overlay-container',
            backdropClass: 'image-gallery-overlay-backdrop',
            hasBackdrop: true,
            data: {images, activeIndex}
        });
    }

    public selectedTabChanged(e: MatTabChangeEvent) {
        this.titlePage.selectedTab$.next(e.index);
    }
}
