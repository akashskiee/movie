import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TitlePageService} from '../../title-page-container/title-page.service';
import {CurrentUser} from '@common/auth/current-user';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'season-page',
    templateUrl: './season-page.component.html',
    styleUrls: ['./season-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonPageComponent implements OnInit {
    public seasonModel = new FormControl();

    constructor(
        public titlePage: TitlePageService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        public url: UrlGeneratorService,
        public currentUser: CurrentUser
    ) {}

    ngOnInit() {
        this.titlePage.changed$.subscribe(() => {
            this.cd.markForCheck();
        });

        this.route.params.subscribe(params => {
            this.seasonModel.setValue(+params.seasonNumber);
        });

        this.seasonModel.valueChanges.subscribe(seasonNum => {
            if (this.titlePage.activeSeason.number !== seasonNum) {
                this.router.navigateByUrl(
                    this.url.generate(this.titlePage.title, {seasonNum})
                );
            }
        });
    }
}
