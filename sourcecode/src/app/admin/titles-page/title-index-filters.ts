import {
    ALL_PRIMITIVE_OPERATORS,
    DatatableFilter,
    FilterControlType,
    FilterOperator,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter,
    TimestampFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';

export const TITLE_INDEX_FILTERS: DatatableFilter[] = [
    new TimestampFilter({
        description: 'Release date for the title',
        key: 'release_date',
        label: 'Release Date',
    }),
    new DatatableFilter({
        type: FilterControlType.Input,
        inputType: 'number',
        label: 'Runtime',
        key: 'runtime',
        description: 'Release date for the title',
        operators: ALL_PRIMITIVE_OPERATORS,
    }),
    new DatatableFilter({
        type: FilterControlType.Input,
        inputType: 'number',
        label: 'Budget',
        key: 'budget',
        description: 'Budget for the title',
        operators: ALL_PRIMITIVE_OPERATORS,
    }),
    new DatatableFilter({
        type: FilterControlType.Input,
        inputType: 'number',
        label: 'Revenue',
        key: 'revenue',
        description: 'Revenue for the title',
        operators: ALL_PRIMITIVE_OPERATORS,
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        label: 'Poster',
        key: 'poster',
        description: 'Whether title has a poster',
        defaultValue: {operator: FilterOperator.ne, value: null},
        options: [
            {
                key: 'Has poster',
                value: {operator: FilterOperator.ne, value: null},
            },
            {
                key: "Doesn't have poster",
                value: {operator: FilterOperator.eq, value: null},
            },
        ],
    }),
    new DatatableFilter({
        type: FilterControlType.Input,
        inputType: 'number',
        label: 'Views',
        key: 'views',
        description: 'Number of page views title has on the site',
        defaultValue: 100,
        defaultOperator: FilterOperator.gte,
        operators: ALL_PRIMITIVE_OPERATORS,
    }),
    new UpdatedAtFilter({
        description: 'Date title was last updated',
    }),
    new CreatedAtFilter({
        description: 'Date title was created',
    }),
];
