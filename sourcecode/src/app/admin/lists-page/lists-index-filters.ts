import {
    DatatableFilter,
    FilterControlType,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';
import {SelectModelDialogComponent} from '@common/datatable/datatable-filters/select-model-dialog/select-model-dialog.component';
import {USER_MODEL} from '@common/core/types/models/User';

export const LISTS_INDEX_FILTERS: DatatableFilter[] = [
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'public',
        label: 'Status',
        description: 'Whether list is public or not',
        defaultValue: true,
        options: [
            {key: 'public', value: true},
            {key: 'private', value: false},
        ]
    }),
    new UpdatedAtFilter({
        description: 'Date list was last updated',
    }),
    new CreatedAtFilter({
        description: 'Date list was created',
    }),
    new DatatableFilter({
        type: FilterControlType.SelectModel,
        key: 'user_id',
        label: 'User',
        description: 'User list was created by',
        component: SelectModelDialogComponent,
        componentData: {modelType: USER_MODEL},
    }),
];
