import {Component, ViewEncapsulation, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MESSAGES} from '../../../toast-messages';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Review} from '../../../models/review';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ReviewService} from '../../shared/review.service';
import {MEDIA_TYPE} from '../../media-type';
import {Toast} from '@common/core/ui/toast.service';
import {
    BackendErrorMessages,
    BackendErrorResponse
} from '@common/core/types/backend-error-response';

interface CrupdateReviewModalData {
   review?: Review;
   mediaId?: number;
   mediaType?: MEDIA_TYPE;
}

@Component({
    selector: 'crupdate-review-modal',
    templateUrl: './crupdate-review-modal.component.html',
    styleUrls: ['./crupdate-review-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateReviewModalComponent {
    public errors$: BehaviorSubject<BackendErrorMessages> = new BehaviorSubject({});
    public loading$ = new BehaviorSubject(false);
    public reviewForm = new FormGroup({
        body: new FormControl(''),
        score: new FormControl(null),
    });

    constructor(
        private dialogRef: MatDialogRef<CrupdateReviewModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateReviewModalData,
        private toast: Toast,
        private reviews: ReviewService,
    ) {
        this.hydrateForm();
    }

    public close(review?: Review) {
        this.dialogRef.close(review);
    }

    public confirm() {
        this.loading$.next(true);
        const params = {
            ...this.reviewForm.value,
            mediaId: this.data.mediaId,
            mediaType: this.data.mediaType || MEDIA_TYPE.TITLE,
        };

        const observable = this.data.review ?
            this.reviews.update(this.data.review.id, this.reviewForm.value) :
            this.reviews.create(params);

        observable
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.toast.open(MESSAGES.REVIEW_CREATE_SUCCESS);
                this.close(response.review);
            }, (errResponse: BackendErrorResponse) => {
                this.errors$.next(errResponse.errors);
            });
    }

    private hydrateForm() {
        if (this.data.review) {
            this.reviewForm.patchValue(this.data.review);
        }
    }
}
