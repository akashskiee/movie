import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Title} from '../../../../../models/title';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'title-detail-item',
    templateUrl: './title-detail-item.component.html',
    styleUrls: ['../../styles/media-view-detail.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDetailItemComponent {
    @Input() title: Title;
    constructor(public url: UrlGeneratorService) {}
}
