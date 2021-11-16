import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {Episode} from '../../../../models/episode';

@Component({
    selector: 'season-episode-number',
    templateUrl: './season-episode-number.component.html',
    styleUrls: ['./season-episode-number.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonEpisodeNumberComponent {
    @Input() episode: Episode;

    public getSeasonNum() {
        let base = 'S';
        if (this.episode.season_number < 10) base += '0';
        return base + this.episode.season_number;
    }

    public getEpisodeNum() {
        let base = 'E';
        if (this.episode.episode_number < 10) base += '0';
        return base + this.episode.episode_number;
    }
}
