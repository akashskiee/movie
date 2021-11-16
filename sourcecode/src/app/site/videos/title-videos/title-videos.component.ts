import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CurrentUser} from '@common/auth/current-user';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {Settings} from '@common/core/config/settings.service';
import {TitlePageService} from '../../titles/title-page-container/title-page.service';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-videos',
    templateUrl: './title-videos.component.html',
    styleUrls: ['./title-videos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleVideosComponent implements OnInit, OnDestroy {
    public loading$ = new BehaviorSubject(false);
    private changeSub: Subscription;
    @HostBinding('class.hidden') shouldHide = false;

    constructor(
        private modal: Modal,
        private store: Store,
        public currentUser: CurrentUser,
        public settings: Settings,
        public titlePage: TitlePageService,
        private cd: ChangeDetectorRef,
        public url: UrlGeneratorService
    ) {}

    ngOnInit() {
        this.changeSub = this.titlePage.changed$.subscribe(() => {
            this.shouldHide =
                !this.currentUser.hasPermission('videos.view') ||
                (!this.titlePage.videos.size &&
                    !this.currentUser.hasPermission('videos.create'));
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }
}
