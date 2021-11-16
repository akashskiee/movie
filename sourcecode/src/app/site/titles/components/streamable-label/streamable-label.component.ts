import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {Title} from '../../../../models/title';
import {Episode} from '../../../../models/episode';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'streamable-label',
    templateUrl: './streamable-label.component.html',
    styleUrls: ['./streamable-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamableLabelComponent {
    @Input() item: Title|Episode;
    @HostBinding('class.hidden') get isHidden() {
        return !this.item ||
            !this.item.stream_videos_count ||
            !this.settings.get('streaming.show_label');
    }

    constructor(private settings: Settings) {}
}
