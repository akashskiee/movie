import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {TitleCredit} from '../../../../models/title';
import {Subscription} from 'rxjs';
import {TitlePageService} from '../title-page.service';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-cast-panel',
    templateUrl: './title-cast-panel.component.html',
    styleUrls: ['./title-cast-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TitleCastPanelComponent implements OnInit, OnDestroy {
    public cast: TitleCredit[] = [];
    private changeSub: Subscription;
    constructor(
        public url: UrlGeneratorService,
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.changeSub = this.titlePage.changed$.subscribe(() => {
            this.cast = this.titlePage
                .getTitleOrEpisodeCredits()
                .filter(p => p.pivot.department === 'cast')
                .slice(0, 10);
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }
}
