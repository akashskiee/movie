import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'back-to-top-button',
    templateUrl: './back-to-top-button.component.html',
    styleUrls: ['./back-to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'class': 'hidden'},
})
export class BackToTopButtonComponent {
    public initialHeight: number;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.initialHeight = window.document.documentElement.clientHeight;

        fromEvent(window.document, 'scroll')
            .pipe(debounceTime(50))
            .subscribe(() => {
                if ((this.initialHeight - 300) < window.document.documentElement.scrollTop) {
                    this.el.nativeElement.classList.remove('hidden');
                } else if (window.document.documentElement.scrollTop < 200) {
                    this.el.nativeElement.classList.add('hidden');
                }
            });
    }

    public backToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
