import {
    DatatableFilter,
    FilterControlType, FilterOperator,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';
import {SelectModelDialogComponent} from '@common/datatable/datatable-filters/select-model-dialog/select-model-dialog.component';
import {MEDIA_TYPE} from '../../site/media-type';
import {USER_MODEL} from '@common/core/types/models/User';

export const VIDEO_INDEX_FILTERS: DatatableFilter[] = [
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'type',
        label: 'Type',
        description: 'Type of the video',
        defaultValue: 'embed',
        options: [
            {key: 'All', value: {value: null, operator: FilterOperator.ne}},
            {key: 'Embed', value: 'embed'},
            {key: 'Direct Video', value: 'video'},
            {key: 'Frame', value: 'frame'},
            {key: 'Remote Link', value: 'remote'},
        ]
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'approved',
        label: 'Status',
        description: 'Whether video is approved or not',
        defaultValue: false,
        options: [
            {key: 'Approved', value: true},
            {key: 'Not Approved', value: false},
        ]
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'source',
        label: 'Source',
        description: 'Whether video source is local or external',
        defaultValue: 'local',
        options: [
            {key: 'All', value: {value: null, operator: FilterOperator.ne}},
            {key: 'Local', value: 'local'},
            {key: 'External', value: 'external'},
        ]
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'category',
        label: 'Category',
        description: 'Category video is attched to',
        defaultValue: 'trailer',
        options: [
            {key: 'All', value: {value: null, operator: FilterOperator.ne}},
            {key: 'Trailer', value: 'trailer'},
            {key: 'Full Movie or episode', value: 'full'},
            {key: 'Clip', value: 'clip'},
            {key: 'Teaser', value: 'teaser'},
            {key: 'Featurette', value: 'featurette'},
        ]
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        key: 'quality',
        description: 'Quality of the video',
        defaultValue: 'hd',
        options: [
            {key: 'SD', value: 'sd'},
            {key: 'HD', value: 'hd'},
            {key: '4k', value: '4k'},
            {key: 'HDR', value: 'hdr'},
        ]
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
        description: 'User video was created by',
        component: SelectModelDialogComponent,
        componentData: {modelType: USER_MODEL},
    }),
    new DatatableFilter({
        type: FilterControlType.SelectModel,
        key: 'title_id',
        label: 'Title',
        description: 'Title video is attached to',
        component: SelectModelDialogComponent,
        componentData: {modelType: MEDIA_TYPE.TITLE},
    }),
];
