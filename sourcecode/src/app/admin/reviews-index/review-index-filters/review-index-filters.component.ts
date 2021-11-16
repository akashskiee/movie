import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DatatableService} from '../../../../common/datatable/datatable.service';
import {Model} from '../../../../common/core/types/models/model';
import {Title} from '../../../models/title';

@Component({
    selector: 'review-index-filters',
    templateUrl: './review-index-filters.component.html',
    styleUrls: ['./review-index-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewIndexFiltersComponent implements OnInit {
    @Input() title: Title;
    public form = this.fb.group({
        type: null,
        user: null,
        title: null,
        season: null,
        episode: null,
    });

    constructor(
        private fb: FormBuilder,
        private datable: DatatableService<Model>,
    ) {}

    ngOnInit() {
        this.form.patchValue({
            title: this.title,
            ...this.datable.filters$.value,
        });
        if (this.title) {
            this.form.get('title').disable();
        }
        this.form.valueChanges.subscribe(value => {
            this.datable.filters$.next(value);
        });
    }
}
