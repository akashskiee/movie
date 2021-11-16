import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject, interval, Subscription} from 'rxjs';
import {List} from '../../../models/list';
import {ListItem} from '../../lists/types/list-item';
import {MEDIA_TYPE} from '../../media-type';
import {Title} from '../../../models/title';
import {BreakpointsService} from '@common/core/ui/breakpoints.service';
import {filter} from 'rxjs/operators';
import {Settings} from '@common/core/config/settings.service';
import {PlayerOverlayService} from '../../player/player-overlay.service';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

const AUTO_SLIDE_INTERVAL_MS = 5000;
const SLIDE_CLASS = '.slide';

@Component({
    selector: 'slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(mouseenter)': 'focused = true',
        '(mouseleave)': 'focused = false',
    },
})
export class SliderComponent implements AfterViewInit, OnDestroy {
    @Input() list: List;
    @ViewChild('sliderTrack') sliderTrack: ElementRef<HTMLElement>;
    public activeSlide$ = new BehaviorSubject(0);
    private focused = false;
    private autoSlideSub: Subscription;
    private slideWidth: number;

    constructor(
        public url: UrlGeneratorService,
        public breakpoints: BreakpointsService,
        private settings: Settings,
        private playerOverlay: PlayerOverlayService
    ) {}

    ngAfterViewInit() {
        if (this.list) {
            this.setupInitialCss();
            this.enableAutoSlide();
        }
    }

    ngOnDestroy() {
        this.autoSlideSub?.unsubscribe();
    }

    private enableAutoSlide() {
        if (!this.settings.get('homepage.autoslide')) {
            return;
        }
        this.autoSlideSub = interval(AUTO_SLIDE_INTERVAL_MS)
            .pipe(filter(() => !this.focused))
            .subscribe(() => {
                this.changeSlide('next');
            });
    }

    public changeSlide(index: number | 'previous' | 'next') {
        const active = this.activeSlide$.value;
        if (index === 'next') {
            index = active + 1;
        } else if (index === 'previous') {
            index = active - 1;
        }

        const lastSlide = this.list?.items?.length - 1;

        if (index > lastSlide) {
            index = 0;
        } else if (index < 0) {
            index = lastSlide;
        }

        if (this.activeSlide$.value !== index) {
            this.activeSlide$.next(index);
            this.setTransformStyle(index);
        }
    }

    public filterTitles(items: ListItem[]): Title[] {
        return items.filter(item => {
            return item.model_type === MEDIA_TYPE.TITLE;
        }) as Title[];
    }

    public playVideo(title: Title) {
        this.playerOverlay.open(title.videos[0], title);
    }

    private setupInitialCss() {
        const el = this.sliderTrack.nativeElement as HTMLDivElement,
            rect = el.getBoundingClientRect(),
            slideCount = this.list?.items?.length;

        this.slideWidth = rect.width;
        el.style.width = this.slideWidth * slideCount + 'px';

        Array.from(el.querySelectorAll(SLIDE_CLASS)).forEach(slideEl => {
            (slideEl as HTMLElement).style.width = `${this.slideWidth}px`;
        });
    }

    private setTransformStyle(index: number) {
        const value = this.slideWidth * index;
        this.sliderTrack.nativeElement.style.transform = `translate3d(${-value}px, 0px, 0px)`;
    }
}
