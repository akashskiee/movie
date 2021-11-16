import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UserProfileService} from './user-profile.service';
import {SKELETON_ANIMATIONS} from '@common/core/ui/skeleton/skeleton-animations';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserProfileService],
    animations: SKELETON_ANIMATIONS,
})
export class UserProfileComponent implements OnInit, OnDestroy {
    tabs = ['lists', 'ratings', 'reviews', 'comments'];
    activeTab: string;
    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public profile: UserProfileService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.profile.userId = params.userId;
            this.setActiveTab(this.router.url);
            this.profile.getProfile(params.userId).subscribe();
        });

        const sub = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.setActiveTab(event.url);
            });
        this.subscriptions.push(sub);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    tabRoute(name: string) {
        return ['/users', this.profile.userId, `${name}`];
    }

    tabIsActive(name: string) {
        return this.activeTab === name;
    }

    setActiveTab(url: string) {
        // if no tab name is present in url, default to "lists"
        this.activeTab =
            url.match(/\//g).length >= 3 ? url.split('/').pop() : 'lists';
    }
}
