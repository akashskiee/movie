import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';
import {StarRatingOverlayComponent} from './star-rating-overlay/star-rating-overlay.component';
import {Episode} from '../../../../models/episode';
import {Title} from '../../../../models/title';
import {BehaviorSubject} from 'rxjs';
import {Review} from '../../../../models/review';
import {OverlayPanel} from '@common/core/ui/overlay-panel/overlay-panel.service';
import {RIGHT_POSITION} from '@common/core/ui/overlay-panel/positions/right-position';
import {UserLibraryService} from '../../../user-library.service';

@Component({
    selector: 'rating-widget',
    templateUrl: './rating-widget.component.html',
    styleUrls: ['./rating-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingWidgetComponent implements OnChanges {
    @Input() item: Episode|Title;
    @Input() rating: number;
    @Input() showRateButton = true;
    public userRating$ = new BehaviorSubject<Review>(null);

    constructor(
        private overlay: OverlayPanel,
        private userLibrary: UserLibraryService,
    ) {}

    ngOnChanges() {
        this.updateUserRating();
    }

    openRatingOverlay(e: MouseEvent) {
        this.overlay.open(StarRatingOverlayComponent, {
            origin: new ElementRef(e.target),
            position: RIGHT_POSITION,
            data: {item: this.item, userRating: this.userRating$.value}
        }).afterClosed().subscribe(() => {
            this.updateUserRating();
        });
    }

    private updateUserRating() {
        if ( ! this.item) return;
        this.userRating$.next(
            [...this.userLibrary.ratings.values()].find(review => {
                return review.reviewable_id === this.item.id && review.media_type === this.item.model_type;
            })
        );
    }
}
