import {Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'star-rating-widget',
    templateUrl: './star-rating-widget.component.html',
    styleUrls: ['./star-rating-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: StarRatingWidgetComponent,
        multi: true,
    }]
})
export class StarRatingWidgetComponent implements ControlValueAccessor {
    public rating$ = new BehaviorSubject(null);
    public stars = new Array(10);
    public userClickedOnStar = false;
    public propagateChange: Function;

    public setRating(rating: number) {
        this.rating$.next(rating);
    }

    @HostListener('mouseleave')
    public clearRating() {
        if ( ! this.userClickedOnStar) {
            this.rating$.next(null);
        }
    }

    public setRatingAndPropagate(rating: number) {
        this.setRating(rating);
        this.propagateChange(rating);
        this.userClickedOnStar = true;
    }

    public writeValue(value: number) {
        if (value) {
            this.rating$.next(value);
            // if we get passed a value, it means
            // user has already rated this item so we
            // can try it as if user clicked on a star
            this.userClickedOnStar = true;
        }
    }

    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
