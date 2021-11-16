import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Settings} from '@common/core/config/settings.service';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {MetaTagsService} from '@common/core/meta/meta-tags.service';
import {CookieNoticeService} from '@common/gdpr/cookie-notice/cookie-notice.service';
import {BrowseTitlesComponent} from './site/titles/components/browse-titles/browse-titles.component';
import {GlobalLoaderService} from './site/global-loader.service';
import {CustomHomepage} from '@common/pages/shared/custom-homepage.service';

export const LANDING_PAGE_NAME = 'Landing Page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private customHomepage: CustomHomepage,
        private settings: Settings,
        private httpClient: AppHttpClient,
        private router: Router,
        private meta: MetaTagsService,
        private cookieNotice: CookieNoticeService,
        public globalLoader: GlobalLoaderService,
    ) {}

    ngOnInit() {
        this.customHomepage.select({routes: [
            {
                routeConfig: {
                    path: 'browse',
                    component: BrowseTitlesComponent,
                    data: {permissions: ['titles.view'], name: 'browse', willSetSeo: true},
                },
                makeRoot: false,
                name: 'browse',
            },
            {
                name: LANDING_PAGE_NAME,
                ignore: true,
            }
        ]});
        this.settings.setHttpClient(this.httpClient);
        this.meta.init();

        // google analytics
        if (this.settings.get('analytics.tracking_code')) {
            this.triggerAnalyticsPageView();
        }

        this.cookieNotice.maybeShow();
    }

    private triggerAnalyticsPageView() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                if ( ! window['ga']) return;
                window['ga']('set', 'page', event.urlAfterRedirects);
                window['ga']('send', 'pageview');
            });
    }
}
