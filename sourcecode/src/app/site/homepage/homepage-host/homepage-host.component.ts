import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';
import {CurrentUser} from '@common/auth/current-user';
import {Store} from '@ngxs/store';
import {AppearanceListenerService} from '@common/shared/appearance/appearance-listener.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {LANDING_PAGE_NAME} from '../../../app.component';
import {AuthService} from '@common/auth/auth.service';

@Component({
    selector: 'homepage-host',
    templateUrl: './homepage-host.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageHostComponent implements OnInit {
    public homeComponent$ = new ReplaySubject(1);

    constructor(
        public settings: Settings,
        public currentUser: CurrentUser,
        private store: Store,
        private appearance: AppearanceListenerService,
        private route: ActivatedRoute,
        private auth: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        if (this.appearance.active) {
            this.route.queryParams.subscribe(() => {
                this.setShouldShowLandingPage();
            });
        } else {
            this.setShouldShowLandingPage();
        }
    }

    private setShouldShowLandingPage() {
        const landingPageSelected = this.settings.get('homepage.type') === 'component' && this.settings.get('homepage.value') === LANDING_PAGE_NAME;
        const shouldShowLandingPage = (landingPageSelected && !this.currentUser.isLoggedIn()) ||
            (this.appearance.active && this.route.snapshot.queryParams.landing);

        if (shouldShowLandingPage) {
            this.homeComponent$.next('landing');
        } else if (!shouldShowLandingPage && this.currentUser.hasPermission('titles.view')) {
            this.homeComponent$.next('home');
        } else {
            this.router.navigateByUrl(this.getRedirectUri());
        }
    }

    private getRedirectUri() {
        if ( ! this.currentUser.isLoggedIn()) {
            return 'login';
        } else {
            return this.settings.get('billing.enable') ?
                '/billing/upgrade' :
                this.auth.getRedirectUri();
        }
    }
}
