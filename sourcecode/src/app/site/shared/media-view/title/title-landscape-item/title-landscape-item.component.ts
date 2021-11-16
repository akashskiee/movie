import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Title} from '../../../../../models/title';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-landscape-item',
    templateUrl: './title-landscape-item.component.html',
    styleUrls: ['../../styles/media-view-landscape.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleLandscapeItemComponent {
    @Input() title: Title;
    constructor(public url: UrlGeneratorService) {}
}
