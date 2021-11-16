import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TitleCredit} from '../../../../../../models/title';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {Actions, Select, Store} from '@ngxs/store';
import {AddCredit, UpdateCredit} from '../../state/crupdate-title-actions';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {Toast} from '../../../../../../../common/core/ui/toast.service';
import {MESSAGES} from '../../../../../../toast-messages';
import {Creditable} from '../../../../../people/creditable';
import {MEDIA_TYPE} from '../../../../../media-type';
import {ValueLists} from '../../../../../../../common/core/services/value-lists.service';
import {filter, map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {BackendErrorResponse} from '../../../../../../../common/core/types/backend-error-response';

interface CrupdateCreditModalData {
    credit?: TitleCredit;
    type: 'cast'|'crew';
    mediaItem: Creditable;
}

interface JobList {
    department: string;
    jobs: string[];
}

@Component({
    selector: 'crupdate-credit-modal',
    templateUrl: './crupdate-credit-modal.component.html',
    styleUrls: ['./crupdate-credit-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateCreditModalComponent implements OnInit {
    @Select(CrupdateTitleState.loading) loading$: Observable<boolean>;
    credit: TitleCredit;
    personModelType = MEDIA_TYPE.PERSON;

    public form = this.fb.group({
        character: [''],
        department: [''],
        job: [''],
    });

    public availableJobs: {job: string, department: string}[] = [];
    public filteredJobs: Observable<{job: string, department: string}[]>;

    constructor(
        private store: Store,
        private toast: Toast,
        private fb: FormBuilder,
        private actions$: Actions,
        private dialogRef: MatDialogRef<CrupdateCreditModalComponent>,
        private valueLists: ValueLists,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateCreditModalData,
    ) {
        if (this.data.credit) {
            this.credit = this.data.credit;
            this.form.patchValue(this.data.credit.pivot);
        }
    }

    ngOnInit() {
        this.valueLists.get(['tmdbJobs']).subscribe(response => {
            this.availableJobs = [];
            (response.tmdbJobs as JobList[]).forEach(jobGroup => {
                const jobs = jobGroup.jobs.map(jobName => {
                    return {job: jobName, department: jobGroup.department};
                });
                this.availableJobs = [...this.availableJobs, ...jobs];
            });

            this.filteredJobs = this.form.get('job').valueChanges
                .pipe(
                    startWith(''),
                    map(q => this.availableJobs.filter(v => {
                        q = q.toLowerCase();
                        return !q || v.job.toLowerCase().includes(q) || v.department.toLowerCase().includes(q);
                    }).slice(0, 10))
                );
        });
    }

    public confirm() {
        const action = this.data.credit
            ? new UpdateCredit(this.credit.pivot.id, this.getPayload())
            : new AddCredit(this.credit?.id, this.data.mediaItem, this.getPayload());
        this.store.dispatch(action).subscribe(() => {
            this.close();
            this.toast.open(this.data.credit ? MESSAGES.CREDIT_UPDATE_SUCCESS : MESSAGES.CREDIT_ADD_SUCCESS);
        }, (errResponse: BackendErrorResponse) => {
            this.toast.open(errResponse.message);
        });
    }

    public close() {
        this.dialogRef.close();
    }

    public setCredit(credit: TitleCredit) {
        this.credit = credit;
    }

    private getPayload() {
        const payload = this.form.value;
        if (this.data.type === 'cast') {
            payload.department = 'cast';
            payload.job = 'cast';
        }
        return payload;
    }

    public jobSelected(e: MatAutocompleteSelectedEvent) {
        const value = this.availableJobs.find(v => v.job === e.option.value);
        this.form.patchValue({job: value.job, department: value.department});
    }
}
