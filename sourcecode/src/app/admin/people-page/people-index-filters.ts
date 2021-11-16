import {
    ALL_PRIMITIVE_OPERATORS,
    DatatableFilter,
    FilterControlType,
    FilterOperator,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter, TimestampFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';

export const PEOPLE_INDEX_FILTERS: DatatableFilter[] = [
    new DatatableFilter({
        type: FilterControlType.Select,
        label: 'Image',
        key: 'poster',
        description: 'Whether person has an image',
        defaultValue: {operator: FilterOperator.ne, value: null},
        options: [
            {
                key: 'Has image',
                value: {operator: FilterOperator.ne, value: null},
            },
            {
                key: "Doesn't have image",
                value: {operator: FilterOperator.eq, value: null},
            },
        ],
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        label: 'Known For',
        key: 'known_for',
        description: 'What role is person known for',
        defaultValue: 'acting',
        options: [
            {value: 'acting'},
            {value: 'directing'},
            {value: 'production'},
            {value: 'writing'},
            {value: 'art'},
            {value: 'Costume & Make-Up'},
            {value: 'Camera'},
            {value: 'Editing'},
            {value: 'Visual Effects'},
            {value: 'Crew'},
            {value: 'Sound'},
            {value: 'Lighting'},
            {value: 'Creator'},
        ],
    }),
    new TimestampFilter({
        description: 'Date person was born',
        key: 'birth_date',
        label: 'Birthdate',
    }),
    new DatatableFilter({
        type: FilterControlType.Select,
        label: 'Gender',
        key: 'gender',
        description: "Person's gender",
        defaultValue: 'male',
        options: [
            {key: 'Male', value: 'male'},
            {key: 'Female', value: 'female'},
        ],
    }),
    new DatatableFilter({
        type: FilterControlType.Input,
        inputType: 'number',
        label: 'Views',
        key: 'views',
        description: 'Number of page views person has on the site',
        defaultValue: 100,
        defaultOperator: FilterOperator.gte,
        operators: ALL_PRIMITIVE_OPERATORS,
    }),
    new UpdatedAtFilter({
        description: 'Date person was last updated',
    }),
    new CreatedAtFilter({
        description: 'Date person was created',
    }),
];
