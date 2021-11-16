import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Person} from '../../../../../models/person';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'person-landscape-item',
    templateUrl: './person-landscape-item.component.html',
    styleUrls: [
        './person-landscape-item.component.scss',
        '../../styles/media-view-landscape.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonLandscapeItemComponent {
    @Input() person: Person;
    constructor(public url: UrlGeneratorService) {}
}
