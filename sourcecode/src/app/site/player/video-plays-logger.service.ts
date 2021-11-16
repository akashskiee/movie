import {Injectable} from '@angular/core';
import {VideoService} from '../videos/video.service';
import {Video} from '../../models/video';

@Injectable({
    providedIn: 'root',
})
export class VideoPlaysLoggerService {
    constructor(private videos: VideoService) {}

    log(video: Video, params?: {timeWatched: number}) {
        this.videos.logPlay(video, params).subscribe(
            () => {},
            () => {}
        );
    }
}
