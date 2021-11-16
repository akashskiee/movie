import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs';
import {TitlePageService} from '../title-page.service';

@Component({
    selector: 'title-secondary-details-panel',
    templateUrl: './title-secondary-details-panel.component.html',
    styleUrls: ['./title-secondary-details-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TitleSecondaryDetailsPanelComponent implements OnInit, OnDestroy {
    private changeSub: Subscription;
    public description: string;

    constructor(
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.changeSub = this.titlePage.changed$.subscribe(() => {
            this.description = (this.titlePage.activeEpisode || this.titlePage.title).description;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }
}
