import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';
import {ListItem} from '../../../lists/types/list-item';
import {BehaviorSubject} from 'rxjs';
import {UserLibraryService} from '../../../user-library.service';

@Component({
    selector: 'title-action-buttons',
    templateUrl: './title-action-buttons.component.html',
    styleUrls: ['./title-action-buttons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleActionButtonsComponent implements OnChanges {
    @Input() item: ListItem;
    public loading$ = new BehaviorSubject(false);
    public itemInWatchlist$ = new BehaviorSubject(false);

    constructor(public userLibrary: UserLibraryService) {}

    ngOnChanges() {
        this.itemInWatchlist$.next(
            this.userLibrary.watchlist && this.userLibrary.watchlist.items
                .findIndex(i => i.id === this.item?.id && i.type === this.item?.model_type) > -1
        );
    }

    public addToWatchlist() {
        this.loading$.next(true);
        this.userLibrary.addToWatchlist(this.item).then(() => {
            this.itemInWatchlist$.next(true);
            this.loading$.next(false);
        });
    }

    public removeFromWatchlist() {
        this.loading$.next(true);
        this.userLibrary.removeFromWatchlist(this.item).then(() => {
            this.itemInWatchlist$.next(false);
            this.loading$.next(false);
        });
    }
}
