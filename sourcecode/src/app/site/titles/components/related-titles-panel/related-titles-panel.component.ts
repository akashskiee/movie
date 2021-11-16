import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs';
import {Title} from '../../../../models/title';
import {TitlesService} from '../../titles.service';
import {TitlePageService} from '../../title-page-container/title-page.service';

@Component({
    selector: 'related-titles-panel',
    templateUrl: './related-titles-panel.component.html',
    styleUrls: ['./related-titles-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedTitlesPanelComponent implements OnInit, OnDestroy {
    public related: Title[];

    // need at least 4 related titles to display properly
    private chaneSub: Subscription;
    @HostBinding('class.hidden') get noRelatedTitles() {
        return this.related?.length < 4;
    }

    constructor(
        private titleApi: TitlesService,
        private titlePage: TitlePageService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.chaneSub = this.titlePage.changed$.subscribe(() => {
            this.loadRelatedTitles();
        });
    }

    ngOnDestroy() {
        this.chaneSub.unsubscribe();
    }

    private loadRelatedTitles() {
        this.titleApi.getRelatedTitles(this.titlePage.title, {limit: 5}).subscribe(response => {
            this.related = response.titles;
            this.cd.markForCheck();
        });
    }
}
