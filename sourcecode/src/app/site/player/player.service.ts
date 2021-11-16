import {ElementRef, Injectable} from '@angular/core';
import {Video} from '../../models/video';
import {Episode} from '../../models/episode';
import {Title} from '../../models/title';
import {Settings} from '@common/core/config/settings.service';
import {BehaviorSubject} from 'rxjs';
import {RelatedVideosParams, TitlesService} from '../titles/titles.service';
import {MEDIA_TYPE} from '../media-type';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LazyLoaderService} from '@common/core/utils/lazy-loader.service';
import {Store} from '@ngxs/store';
import {ShakaStrategyService} from './strategies/shaka-strategy.service';
import {PlyrStrategyService} from './strategies/plyr-strategy.service';
import {VideoPlaysLoggerService} from './video-plays-logger.service';

type MediaItem = Title|Episode;

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    public activeVideo: Video;
    public mediaItem: MediaItem;
    public relatedVideos$ = new BehaviorSubject<Video[]>([]);
    public sidebarOpen$ = new BehaviorSubject<boolean>(true);
    public iframeUrl$: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject(null);
    public loading$ = new BehaviorSubject<boolean>(false);
    private videoContainer: HTMLElement;
    private videoEl: HTMLVideoElement;

    constructor(
        private settings: Settings,
        private titles: TitlesService,
        private lazyLoader: LazyLoaderService,
        private store: Store,
        private sanitizer: DomSanitizer,
        private shaka: ShakaStrategyService,
        private plyr: PlyrStrategyService,
        private playLogger: VideoPlaysLoggerService,
    ) {
        this.plyr.playbackEnded$.subscribe(() => {
            this.playNext();
        });
    }

    public play(video: Video, mediaItem?: MediaItem) {
        // already have this video and title loaded
        if (this.activeVideo?.id === video.id) {
            return;
        }
        this.activeVideo = video;
        this.mediaItem = mediaItem || video.title || this.mediaItem;
        this.cueVideo();
        this.loadRelatedVideos();
    }

    public playNext() {
        const i = this.relatedVideos$.value.findIndex(v => v.id === this.activeVideo.id);
        if (i !== -1 && this.relatedVideos$.value[i + 1]) {
            this.play(this.relatedVideos$.value[i + 1]);
        }
    }

    public toggleSidebar() {
        this.sidebarOpen$.next(!this.sidebarOpen$.value);
    }

    private createVideoEl() {
        if ( ! this.videoEl) {
            this.videoEl = document.createElement('video');
            this.videoEl.style.width = '100%';
            this.videoEl.style.height = '100%';
            this.videoEl['playsInline'] = true;
            this.videoContainer.appendChild(this.videoEl);
        }
    }

    private cueVideo() {
        this.iframeUrl$.next(null);
        this.plyr.stop();
        if (this.plyr.supported(this.activeVideo)) {
            this.loading$.next(true);

            // need to re-create plyr when switching to stream video
            if (this.plyr.alreadyLoaded() && this.activeVideo.type === 'stream') {
                this.plyr.destroy();
                this.shaka.destroy();
                // plyr will restore video element from clone which will invalidate
                // instance on the class, need to remove it from parent to fix this
                this.videoContainer.children[0].remove();
                this.videoEl = null;
            }

            this.createVideoEl();

            Promise.all([
                this.plyr.loadAssets(),
                this.activeVideo.type === 'stream' ? this.shaka.loadSource(this.videoEl, this.activeVideo) : Promise.resolve(),
            ]).then(() => {
                this.loading$.next(false);
                this.plyr.loadSource(this.videoEl, this.activeVideo, this.shaka.variantOptions);
            });
        } else {
            // plyr strategy will log plays already
            this.playLogger.log(this.activeVideo);
            if (this.activeVideo.type === 'external') {
                window.open(this.activeVideo.url, '_blank');
            } else {
                this.iframeUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(this.activeVideo.url));
            }
        }
    }

    private loadRelatedVideos() {
        const videoType = this.settings.get('streaming.related_videos_type');

        // related videos panel will be hidden
        if (videoType === 'hide' || !this.mediaItem || !this.activeVideo) {
            return;
        }

        // load related videos from other titles or other episodes from same title (if it's a series)
        const loadRelatedEpisodes = this.activeVideo.episode_num && this.settings.get('player.show_next_episodes');
        if (videoType === 'other_titles' || loadRelatedEpisodes) {
            const params = {
                episode: this.activeVideo.episode_num,
                season: this.activeVideo.season_num,
                videoId: this.activeVideo.id,
                titleId: this.mediaItem.model_type === MEDIA_TYPE.EPISODE ? this.mediaItem.title_id : this.mediaItem.id,
            } as RelatedVideosParams;
            return this.titles.getRelatedVideos(params).subscribe(response => {
                this.relatedVideos$.next(response.videos);
            });
        // show other videos from this title
        } else {
            const contentType = this.settings.get('streaming.video_panel_content'),
                relatedVideos = (this.mediaItem.videos || []).filter(video => {
                    return contentType === 'all' ||
                        (contentType === 'short' && video.category !== 'full') ||
                        video.category === contentType;
                });
            this.relatedVideos$.next(relatedVideos);
        }
    }

    public registerPlyrEl(videoContainer: ElementRef<HTMLElement>) {
        this.videoContainer = videoContainer.nativeElement;
    }

    public destroy() {
        this.iframeUrl$.next(null);
        this.activeVideo = null;
        this.relatedVideos$.next([]);
        this.mediaItem = null;
        this.loading$.next(false);
        this.sidebarOpen$.next(true);
        this.videoContainer = null;
        this.plyr.destroy();
        this.shaka.destroy();
    }
}
