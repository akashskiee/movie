import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {List} from '../../models/list';
import {Settings} from '@common/core/config/settings.service';
import {CurrentUser} from '@common/auth/current-user';
import {ActivatedRoute} from '@angular/router';
import {MediaViewMode} from '../shared/media-view/media-view-mode';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
    modes = MediaViewMode;
    lists$ = new BehaviorSubject<List[]>([]);
    sliderList: List;

    constructor(
        public settings: Settings,
        public currentUser: CurrentUser,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.sliderList = data.api.lists.shift();
            this.lists$.next(data.api.lists);
        });
    }
}
