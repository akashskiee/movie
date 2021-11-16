import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Person} from '../../../../../models/person';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'person-detail-item',
    templateUrl: './person-detail-item.component.html',
    styleUrls: [
        './person-detail-item.component.scss',
        '../../styles/media-view-detail.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailItemComponent {
    @Input() person: Person;
    constructor(public url: UrlGeneratorService) {}
}
