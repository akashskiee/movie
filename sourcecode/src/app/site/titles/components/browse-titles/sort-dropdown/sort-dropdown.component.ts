import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'sort-dropdown',
    templateUrl: './sort-dropdown.component.html',
    styleUrls: ['./sort-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SortDropdownComponent,
        multi: true,
    }]
})
export class SortDropdownComponent implements ControlValueAccessor {
    @Input() inactive = false;
    public sort$ = new BehaviorSubject('popularity');
    public direction$ = new BehaviorSubject('desc');
    private propagateChange: Function;
    @Input() sortOptions: {[key: string]: string} = {};

    public directionIsActive(direction: string) {
        return this.direction$.value === direction;
    }

    public sortIsActive(sort: string) {
        return this.sort$.value === sort;
    }

    public changeSort(sort: string) {
        this.sort$.next(sort);
        this.propagateChange(this.getValueForForm());
    }

    public changeDirection(direction: string) {
        this.direction$.next(direction);
        this.propagateChange(this.getValueForForm());
    }

    private getValueForForm() {
        return this.sort$.value + ':' + this.direction$.value;
    }

    public writeValue(value: string) {
        if ( ! value) {
            value = 'popularity:desc';
        }
        const values = value.split(':');
        this.sort$.next(values[0]);
        this.direction$.next(values[1]);
    }

    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
