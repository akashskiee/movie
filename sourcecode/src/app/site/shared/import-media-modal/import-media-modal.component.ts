import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MEDIA_TYPE} from '../../media-type';
import {TitlesService} from '../../titles/titles.service';
import {finalize} from 'rxjs/operators';
import {Title} from '../../../models/title';
import {Person} from '../../../models/person';
import {Toast} from '@common/core/ui/toast.service';

interface ImportMediaModalData {
    mediaTypes: MEDIA_TYPE.MOVIE|MEDIA_TYPE.SERIES|MEDIA_TYPE.PERSON;
}

@Component({
    selector: 'import-media-modal',
    templateUrl: './import-media-modal.component.html',
    styleUrls: ['./import-media-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportMediaModalComponent {
    public loading$ = new BehaviorSubject(false);
    public importForm = this.fb.group({
        tmdbId: [],
        mediaType: [],
    });

    constructor(
        private fb: FormBuilder,
        private toast: Toast,
        private titles: TitlesService,
        private dialogRef: MatDialogRef<ImportMediaModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImportMediaModalData,
    ) {
        this.hydrateForm();
    }

    public confirm() {
        this.loading$.next(true);
        this.titles.import(this.importForm.getRawValue())
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.close(response.mediaItem);
            }, errorResponse => {
                // 403 error will already show error toast by default
                if (errorResponse.status !== 403) {
                    this.toast.open('There was an issue with importing this media item.');
                }
            });
    }

    public close(mediaItem?: Title|Person) {
        this.toast.open(
            this.importForm.value.mediaType === MEDIA_TYPE.PERSON ?
                'Person imported successfully.' :
                'Title imported successfully.'
        );
        this.dialogRef.close(mediaItem);
    }

    private hydrateForm() {
        this.importForm.get('mediaType').setValue(this.data.mediaTypes[0]);
        if (this.data.mediaTypes.length === 1) {
            this.importForm.get('mediaType').disable();
        }
    }
}
