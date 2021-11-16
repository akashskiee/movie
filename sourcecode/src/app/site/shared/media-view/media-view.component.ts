import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {Title} from '../../../models/title';
import {Person} from '../../../models/person';
import {MEDIA_TYPE} from '../../media-type';
import {MediaViewMode} from './media-view-mode';
import {Episode} from '../../../models/episode';
import {MediaViewModeSwitcherComponent} from './media-view-mode-switcher/media-view-mode-switcher.component';

@Component({
    selector: 'media-view',
    templateUrl: './media-view.component.html',
    styleUrls: ['./media-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaViewComponent implements OnInit {
    @Input() items: (Title | Person | Episode)[] = [];
    @Input() mode: MediaViewMode = MediaViewMode.Portrait;
    @Input() showPlayButton = false;
    @Input() switcher: MediaViewModeSwitcherComponent;
    @Output() actionClick = new EventEmitter();
    @HostBinding('class') get modeClass() {
        return `${this.mode}-mode`;
    }

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
       if (this.switcher) {
           this.mode = this.switcher.modeControl.value;
           this.switcher.modeControl.valueChanges.subscribe(value => {
               this.mode = value;
               this.cd.markForCheck();
           });
       }
    }

    trackByFn = (i: number, item: Title | Person) => item.id;

    isPerson(item: Title | Person) {
        return item.model_type === MEDIA_TYPE.PERSON;
    }
}
