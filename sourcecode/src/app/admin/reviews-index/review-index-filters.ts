import {
    DatatableFilter,
    FilterControlType,
    FilterOperator,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';
import {SelectModelDialogComponent} from '@common/datatable/datatable-filters/select-model-dialog/select-model-dialog.component';
import {MEDIA_TYPE} from '../../site/media-type';
import {USER_MODEL} from '@common/core/types/models/User';

export const REVIEW_INDEX_FILTERS: DatatableFilter[] = [
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'body',
        label: 'Type',
        description: 'Type of the review',
        defaultValue: {operator: FilterOperator.ne, value: null},
        options: [
            {key: 'Review', value: {operator: FilterOperator.ne, value: null}},
            {key: 'Rating', value: {operator: FilterOperator.eq, value: null}},
        ],
    }),
    new UpdatedAtFilter({
        description: 'Date video was last updated',
    }),
    new CreatedAtFilter({
        description: 'Date video was created',
    }),
    new DatatableFilter({
        type: FilterControlType.SelectModel,
        key: 'user_id',
        label: 'User',
        description: 'User review was created by',
        component: SelectModelDialogComponent,
        componentData: {modelType: USER_MODEL},
    }),
    new DatatableFilter({
        type: FilterControlType.SelectModel,
        key: 'reviewable_id',
        label: 'Title',
        description: 'Title review is for',
        component: SelectModelDialogComponent,
        componentData: {modelType: MEDIA_TYPE.TITLE},
    }),
];
