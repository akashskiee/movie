import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Toast} from '@common/core/ui/toast.service';
import {FormBuilder} from '@angular/forms';
import {VideoCaption} from '../caption';
import {Video} from '../../../models/video';
import {CaptionService} from '../caption.service';
import {BehaviorSubject} from 'rxjs';
import {objToFormData} from '@common/core/utils/obj-to-form-data';
import {finalize} from 'rxjs/operators';
import {LanguageListItem, ValueLists} from '@common/core/services/value-lists.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';

interface CrupdateCaptionModalComponentData {
    caption?: VideoCaption;
    video?: Video;
}

interface CaptionPayload {
    name?: string;
    caption_file?: File;
    video_id?: number;
}

interface CaptionErrors {
    name?: string;
    caption_file?: string;
    video_id?: string;
}

@Component({
    selector: 'crupdate-caption-modal',
    templateUrl: './crupdate-caption-modal.component.html',
    styleUrls: ['./crupdate-caption-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateCaptionModalComponent implements OnInit {
    @ViewChild('captionFileInput') captionFileInput: ElementRef<HTMLInputElement>;
    public errors$ = new BehaviorSubject<CaptionErrors>({});
    public loading$ = new BehaviorSubject<boolean>(false);
    public languages$ = new BehaviorSubject<LanguageListItem[]>([]);
    public form = this.fb.group({
        name: [''],
        language: ['en'],
    });

    constructor(
        private dialogRef: MatDialogRef<CrupdateCaptionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateCaptionModalComponentData,
        private toast: Toast,
        private fb: FormBuilder,
        private caption: CaptionService,
        private valueLists: ValueLists,
    ) {
        if (data.caption) {
            this.form.patchValue(data.caption);
        }
    }

    ngOnInit() {
        this.valueLists.get(['languages']).subscribe(response => {
            this.languages$.next(response.languages);
        });
    }

    public confirm() {
        const payload = this.getPayload();
        if (this.captionChanged(payload)) {
            this.loading$.next(true);
            const request = this.data.caption ?
                this.caption.update(this.data.caption.id, objToFormData(payload)) :
                this.caption.create(objToFormData(payload));
            request
                .pipe(finalize(() => this.loading$.next(false)))
                .subscribe(response => {
                    this.toast.open(this.data.caption ? 'Caption updated' : 'Caption created');
                    this.close(response.caption);
                }, (errResponse: BackendErrorResponse) => this.errors$.next(errResponse.errors));
        } else {
            this.close();
        }
    }

    public close(caption?: CaptionPayload) {
        this.dialogRef.close(caption);
    }

    private getPayload(): CaptionPayload {
        const payload = this.form.value as CaptionPayload;
        payload.caption_file = this.captionFileInput.nativeElement.files[0];
        if (this.data.video) {
            payload.video_id = this.data.video.id;
        }
        return payload;
    }

    private captionChanged(payload: CaptionPayload) {
        // creating new caption
        if ( ! this.data.caption) return true;

        // check whether caption name changed or file was uploaded
        return this.data.caption.name !== payload.name || payload.caption_file;
    }
}
