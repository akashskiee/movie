import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {Tag} from '@common/core/types/models/Tag';

@Component({
    selector: 'genre-widget',
    templateUrl: './genre-widget.component.html',
    styleUrls: ['./genre-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreWidgetComponent {
    @Input() genres: Tag[];
    @Input() limit = 4;
    @Input() separator = '/';
}
