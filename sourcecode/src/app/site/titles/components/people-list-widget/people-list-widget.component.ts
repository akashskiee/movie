import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {Person} from '../../../../models/person';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'people-list-widget',
    templateUrl: './people-list-widget.component.html',
    styleUrls: ['./people-list-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListWidgetComponent {
    @Input() people: Person[];
    @Input() limit = 5;

    constructor(public url: UrlGeneratorService) {}
}
