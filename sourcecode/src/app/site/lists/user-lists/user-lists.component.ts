import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserLibraryService} from '../../user-library.service';

@Component({
    selector: 'user-lists',
    templateUrl: './user-lists.component.html',
    styleUrls: ['./user-lists.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListsComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);

    constructor(
        public userLibrary: UserLibraryService,
    ) {}

    ngOnInit() {
        this.loading$.next(true);
        this.userLibrary.loadLists().then(() => {
            this.loading$.next(false);
        });
    }
}
