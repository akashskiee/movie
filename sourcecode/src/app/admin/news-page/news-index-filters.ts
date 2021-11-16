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

export const NEWS_INDEX_FILTERS: DatatableFilter[] = [
    new UpdatedAtFilter({
        description: 'Date article was last updated',
    }),
    new CreatedAtFilter({
        description: 'Date article was created',
    }),
    new DatatableFilter({
        type: FilterControlType.SelectModel,
        key: 'user_id',
        label: 'User',
        description: 'User article was created by',
        component: SelectModelDialogComponent,
        componentData: {modelType: USER_MODEL},
    }),
];
