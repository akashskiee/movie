import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {TitlePageService} from '../title-page.service';
import {Subscription} from 'rxjs';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-primary-details-panel',
    templateUrl: './title-primary-details-panel.component.html',
    styleUrls: ['./title-primary-details-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TitlePrimaryDetailsPanelComponent implements OnInit, OnDestroy {
    private changeSub: Subscription;

    constructor(
        public url: UrlGeneratorService,
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.changeSub = this.titlePage.changed$.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }

    public isReleased() {
        return (
            new Date(
                (
                    this.titlePage.activeEpisode || this.titlePage.title
                ).release_date
            ) < new Date()
        );
    }
}
