import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Person} from '../../../../../models/person';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'person-portrait-item',
    templateUrl: './person-portrait-item.component.html',
    styleUrls: [
        './person-portrait-item.component.scss',
        '../../styles/media-view-portrait.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPortraitItemComponent {
    @Input() person: Person;
    constructor(public url: UrlGeneratorService) {}
}
