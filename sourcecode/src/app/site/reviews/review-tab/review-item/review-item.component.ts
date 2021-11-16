import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {Review} from '../../../../models/review';
import {ConfirmModalComponent} from '@common/core/ui/confirm-modal/confirm-modal.component';
import {finalize} from 'rxjs/operators';
import {ReviewScoreType} from '../review-score-type.enum';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {CurrentUser} from '@common/auth/current-user';
import {ReviewService} from '../../../shared/review.service';
import {BehaviorSubject} from 'rxjs';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'review-item',
    templateUrl: './review-item.component.html',
    styleUrls: ['./review-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewItemComponent {
    @Input() review: Review;
    @Output() deleted = new EventEmitter<number>();
    loading$ = new BehaviorSubject(false);

    constructor(
        private modal: Modal,
        public currentUser: CurrentUser,
        public reviewsApi: ReviewService,
        public url: UrlGeneratorService
    ) {}

    maybeDeleteReview(review: Review) {
        this.modal
            .show(ConfirmModalComponent, {
                title: 'Delete Review',
                body: 'Are you sure you want to delete your review?',
                ok: 'Delete',
            })
            .afterClosed()
            .subscribe(confirmed => {
                if (!confirmed) return;
                this.loading$.next(true);
                return this.reviewsApi
                    .delete([review.id])
                    .pipe(finalize(() => this.loading$.next(false)))
                    .subscribe(() => {
                        this.deleted.emit(this.review.id);
                    });
            });
    }

    getScoreColor(score: number): ReviewScoreType {
        if (score < 5) {
            return ReviewScoreType.LOW;
        } else if (score < 7) {
            return ReviewScoreType.MEDIUM;
        } else {
            return ReviewScoreType.HIGH;
        }
    }
}
