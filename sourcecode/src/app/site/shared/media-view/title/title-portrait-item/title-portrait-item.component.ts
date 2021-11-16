import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Title} from '../../../../../models/title';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-portrait-item',
    templateUrl: './title-portrait-item.component.html',
    styleUrls: ['../../styles/media-view-portrait.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlePortraitItemComponent {
    @Input() title: Title;
    constructor(public url: UrlGeneratorService) {}
}
