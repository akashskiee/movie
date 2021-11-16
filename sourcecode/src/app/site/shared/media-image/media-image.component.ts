import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ElementRef,
    ViewChild,
} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';

declare type imageSizes = 'small'|'medium'|'large'|'original';

@Component({
    selector: 'media-image',
    templateUrl: './media-image.component.html',
    styleUrls: ['./media-image.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaImageComponent {
    @Input() link: string|any[];
    @Input() size: imageSizes = 'medium';
    @Input() mode: 'portrait'|'landscape' = 'portrait';
    @Input() alt: string;
    @Input() loadLazily = true;
    @ViewChild('image', {static: true}) image: ElementRef<HTMLImageElement>;

    private _src: string;
    get src(): string {
        return this._src;
    }

    @Input('src')
    set src(value: string) {
        this._src = this.getAbsoluteSrc(value);
    }

    constructor(private settings: Settings) {}

    private getAbsoluteSrc(initialSrc: string): string {
        if ( ! initialSrc) {
            return this.getDefaultPoster();
        } else if (initialSrc.indexOf('image.tmdb') > -1) {
            return this.getTmdbSrc(initialSrc);
        } else if (initialSrc.indexOf('http') > -1) {
            return initialSrc;
        } else {
            return this.getLocalSrc(initialSrc);
        }
    }

    private getTmdbSrc(initialSrc: string) {
        switch (this.size) {
            case 'small':
                return initialSrc.replace('original', 'w92');
            case 'medium':
                return initialSrc.replace('original', 'w300');
            case 'large':
                return initialSrc.replace('original', 'w500');
            case 'original':
                return initialSrc;
        }
    }

    private getLocalSrc(initialSrc: string) {
        const base = this.settings.getBaseUrl(true) + '/';
            let suffix;

        switch (this.size) {
            case 'small':
                suffix = initialSrc.replace('original', 'small');
                break;
            case 'medium':
                suffix = initialSrc.replace('original', 'medium');
                break;
            case 'large':
                suffix = initialSrc.replace('original', 'large');
                break;
            case 'original':
                suffix = initialSrc;
        }

        return base + suffix;
    }

    public getDefaultPoster() {
        if ( ! this.loadLazily) {
            return this.src;
        } else if (this.mode === 'landscape') {
            return this.settings.getAssetUrl('images/default_episode_poster.jpg');
        } else {
            return this.settings.getAssetUrl('images/default_title_poster.jpg');
        }
    }
}
