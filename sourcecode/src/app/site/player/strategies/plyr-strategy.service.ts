import {Injectable} from '@angular/core';
import {Video} from '../../../models/video';
import {LazyLoaderService} from '@common/core/utils/lazy-loader.service';
import {Settings} from '@common/core/config/settings.service';
import {PlayerQualityVariantOptions} from './shaka-strategy.service';
import {Subject} from 'rxjs';
import {VideoPlaysLoggerService} from '../video-plays-logger.service';

declare const Plyr: any;

@Injectable({
    providedIn: 'root',
})
export class PlyrStrategyService {
    player: any;
    playbackEnded$ = new Subject();
    private video: Video;

    constructor(
        private lazyLoader: LazyLoaderService,
        private settings: Settings,
        private playLogger: VideoPlaysLoggerService
    ) {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.logTimeWatched();
            }
        });
    }

    loadSource(
        videoEl: HTMLVideoElement,
        video: Video,
        variantOptions?: PlayerQualityVariantOptions
    ): Promise<void> {
        return this.initPlayer(videoEl, video, variantOptions).then(() => {
            if (!video) return;

            if (video.type !== 'stream') {
                this.player.source = this.buildSource(video);
            }

            setTimeout(() => {
                this.player.once('canplay', () => {
                    if (video.latest_play?.time_watched) {
                        // TODO: https://github.com/sampotts/plyr/issues/1978
                        this.player.currentTime =
                            video.latest_play.time_watched;
                    }
                });
            }, 50);
        });
    }

    loadAssets(): Promise<any> {
        return Promise.all([
            this.lazyLoader.loadAsset('js/plyr.min.js', {type: 'js'}),
            this.lazyLoader.loadAsset('css/plyr.css', {type: 'css'}),
        ]);
    }

    destroy() {
        this.logTimeWatched();
        this.player && this.player.destroy();
        this.player = null;
        this.video = null;
    }

    stop() {
        if (this.player) {
            this.logTimeWatched();
            this.player.stop();
        }
    }

    alreadyLoaded() {
        return !!this.player;
    }

    supported(video: Video) {
        return (
            video.type === 'video' ||
            video.type === 'stream' ||
            (video.type === 'embed' && this.embedSupportedByPlyr(video.url))
        );
    }

    private initPlayer(
        videoEl: HTMLVideoElement,
        video: Video,
        variantOptions?: PlayerQualityVariantOptions
    ): Promise<void> {
        this.video = video;
        if (this.player) {
            return Promise.resolve();
        } else {
            return this.loadAssets().then(() => {
                const plyrOptions = {
                    autoplay: true,
                    quality: {},
                    // plyr doesn't allow "auto" quality for whatever reason,
                    // need to use zero for auto quality and translate it
                    i18n: {qualityLabel: {0: 'Auto'}},
                };
                if (variantOptions && variantOptions.variants.length) {
                    plyrOptions.quality = {
                        default: variantOptions.variants[0].quality,
                        forced: true,
                        onChange: variantOptions.onChange,
                        options: variantOptions.variants.map(qv => qv.quality),
                    };
                }
                this.player = new Plyr(videoEl, plyrOptions);

                this.player.on('ended', () => {
                    this.playbackEnded$.next();
                });
            });
        }
    }

    private buildSource(video: Video) {
        if (video.type === 'embed') {
            return {
                type: 'video',
                poster: video.thumbnail,
                sources: [
                    {
                        src: video.url,
                        provider: this.isYoutube(video.url)
                            ? 'youtube'
                            : 'vimeo',
                    },
                ],
            };
        } else {
            const tracks = (video.captions || []).map((caption, i) => {
                return {
                    kind: 'captions',
                    label: caption.name,
                    srclang: caption.language,
                    src: caption.url
                        ? caption.url
                        : this.settings.getBaseUrl() +
                          '/secure/caption/' +
                          caption.id,
                    default: i === 0,
                };
            });
            return {
                type: 'video',
                captions: {active: false},
                title: video.name,
                sources: [{src: video.url}],
                poster: video.thumbnail,
                tracks,
            };
        }
    }

    private isYoutube(url: string): boolean {
        return url.includes('youtube.com');
    }

    private isVimeo(url: string): boolean {
        return url.includes('vimeo.com');
    }

    private embedSupportedByPlyr(url: string): boolean {
        return this.isYoutube(url) || this.isVimeo(url);
    }

    private logTimeWatched() {
        if (!this.player) return;
        // if user watched over 95%, we can assume video is fully watched
        const fullyWatched =
            this.player.currentTime >= (95 / 100) * this.player.duration;
        this.playLogger.log(this.video, {
            timeWatched:
                fullyWatched || this.player.currentTime < 60
                    ? 0
                    : this.player.currentTime,
        });
        if (!this.video.latest_play) {
            this.video.latest_play = {};
        }
        this.video.latest_play.time_watched = this.player.currentTime;
    }
}
