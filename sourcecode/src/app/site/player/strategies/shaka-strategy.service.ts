import {Injectable} from '@angular/core';
import {LazyLoaderService} from '@common/core/utils/lazy-loader.service';
import {Video} from '../../../models/video';
import {Settings} from '@common/core/config/settings.service';

declare const shaka: any;

export interface PlayerQualityVariant {
    quality?: number|string;
    bandwidth?: number;
    label?: string;
    id?: number;
}

export interface PlayerQualityVariantOptions {
    onChange: (number) => any;
    variants: PlayerQualityVariant[];
}

@Injectable({
    providedIn: 'root'
})
export class ShakaStrategyService {
    private player: any;
    public variantOptions: PlayerQualityVariantOptions = {
        onChange: (quality) => {
            // enable auto quality selection
            if (quality === 0) {
                this.player.configure({abr: {enabled: true}});

            // force specified quality
            } else {
                const variant = this.player.getVariantTracks().find(vt => vt.height === quality);
                this.player.configure({abr: {enabled: false}});
                this.player.selectVariantTrack(variant, true);
            }
        },
        variants: [],
    };

    constructor(
        private lazyLoader: LazyLoaderService,
        private settings: Settings,
    ) {}

    public loadSource(videoEl: HTMLVideoElement, video: Video): Promise<void> {
        return this.initPlayer(videoEl, video).then(() => {
            return this.player.load(video.url);
        });
    }

    private initPlayer(videoEl: HTMLVideoElement, video: Video): Promise<void> {
        if (this.player) {
            return Promise.resolve();
        } else {
            return Promise.all([
                this.lazyLoader.loadAsset('js/shaka.min.js', {type: 'js'}),
                this.lazyLoader.loadAsset('js/mux.js', {type: 'js'}),
            ]).then(() => {
                shaka.polyfill.installAll();
                if ( ! shaka.Player.isBrowserSupported()) {
                    console.warn('Browser is not supported by shaka player!');
                } else {
                    this.player = new shaka.Player(videoEl);
                    this.player.addEventListener('trackschanged', () => {
                        // TODO: use "adaptation" events to show "Auto (420p)"
                        // in plyr when quality options can be overwritten in plyr
                        // https://github.com/google/shaka-player/issues/1474
                        this.buildQualityVariants();

                        const tracks = (video.captions || []).forEach((caption, i) => {
                            const track = document.createElement('track');
                            Object.assign(track, {
                                label: caption.name,
                                srclang: caption.language,
                                src: caption.url ? caption.url : this.settings.getBaseUrl() + '/secure/caption/' + caption.id,
                                default: i === 0,
                            });
                            videoEl.appendChild(track);
                        });
                    });
                }
            });
        }
    }

    private buildQualityVariants() {
        this.variantOptions.variants = [
            {label: 'Auto', quality: 0},
        ];
        this.player.getVariantTracks().forEach(shakaVariant => {
            const variant: Partial<PlayerQualityVariant> = {};

            if (shakaVariant.height) {
                variant.quality = shakaVariant.height;
            }
            if (shakaVariant.bandwidth) {
                variant.bandwidth = Math.round(shakaVariant.bandwidth / 1000);
            }
            variant.label = shakaVariant.label || shakaVariant.language;
            variant.id = shakaVariant.id;

            this.variantOptions.variants.push(variant);
        });
    }

    public destroy() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    }
}
