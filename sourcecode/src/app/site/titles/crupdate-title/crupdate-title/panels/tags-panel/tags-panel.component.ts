import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import {Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {AttachTags, DetachTag} from '../../state/crupdate-title-actions';
import {MESSAGES} from '../../../../../../toast-messages';
import {Tag} from '@common/core/types/models/Tag';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {Toast} from '@common/core/ui/toast.service';
import {SelectTagsModalComponent} from '@common/tags/tags-manager/select-tags-modal/select-tags-modal.component';
import {DatatableService} from '@common/datatable/datatable.service';

@Component({
    selector: 'tags-panel',
    templateUrl: './tags-panel.component.html',
    styleUrls: ['./tags-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService]
})
export class TagsPanelComponent implements OnInit, OnDestroy {
    @Input() type: 'keyword' | 'genre' | 'production_country';
    @Input() displayType: string;

    constructor(
        private store: Store,
        private modal: Modal,
        private toast: Toast,
        public datatable: DatatableService<Tag>,
    ) {}

    ngOnInit() {
        this.datatable.init();
        const tags$ = this.getTagObservable();
        tags$.subscribe(tags => {
            this.datatable.data = tags || [];
        });
    }

    ngOnDestroy() {
        this.datatable.destroy();
    }

    public openTagManagerModal() {
        this.modal.open(
            SelectTagsModalComponent,
            {tagType: this.type, pluralName: this.type === 'production_country' ? 'countries' : `${this.type}s`},
        ).beforeClosed().subscribe(tagNames => {
           if (tagNames && tagNames.length) {
               this.store.dispatch(new AttachTags(tagNames, this.type));
           }
        });
    }

    public detachTag(tag: Tag) {
        this.store.dispatch(new DetachTag(tag))
            .subscribe(() => {
                this.toast.open(MESSAGES.TAG_DETACH_SUCCESS);
            });
    }

    private getTagObservable() {
        if (this.type === 'keyword') {
            return this.store.select(CrupdateTitleState.keywords);
        } else if (this.type === 'genre') {
            return this.store.select(CrupdateTitleState.genres);
        } else {
            return this.store.select(CrupdateTitleState.countries);
        }
    }
}
