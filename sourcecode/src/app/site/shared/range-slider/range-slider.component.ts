import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import noUiSlider, {API} from 'nouislider';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RangeSliderComponent,
            multi: true,
        },
    ],
})
export class RangeSliderComponent
    implements OnInit, ControlValueAccessor, OnDestroy
{
    @ViewChild('sliderEl', {static: true}) sliderEl: ElementRef<HTMLDivElement>;
    @Input() min = 1;
    @Input() max = 100;
    @Input() step = 1;
    @Input() float = false;
    @Input() affix;

    private propagateChange: Function;
    private slider: API;
    public value$: BehaviorSubject<(string | number)[]> = new BehaviorSubject([
        this.min,
        this.max,
    ]);

    ngOnInit() {
        this.slider = noUiSlider.create(this.sliderEl.nativeElement, {
            start: [this.min, this.max],
            connect: true,
            step: this.step,
            range: {
                min: this.min,
                max: this.max,
            },
        });

        this.slider.on('change', sliderValue => {
            const value = this.formatValue(sliderValue as string[]);
            this.propagateChange(value);
            this.value$.next(value);
        });

        this.slider.on('update', sliderValue => {
            const value = this.formatValue(sliderValue as string[]);
            this.value$.next(value);
        });
    }

    private formatValue(value: string[]): string[] {
        return value.map(val => {
            return this.float
                ? parseFloat(val).toFixed(1)
                : parseInt(val).toFixed(0);
        });
    }

    ngOnDestroy() {
        this.slider.destroy();
    }

    public writeValue(value: number[]) {
        if (!this.slider) return;
        if (!value) value = [this.min, this.max];
        this.slider.set(value);
    }

    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
