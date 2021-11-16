import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchResult} from '../../search/search-result';
import {Select, Store} from '@ngxs/store';
import {
    AttachItem,
    CreateOrUpdateList,
    DeleteList,
    DetachItem,
    ReloadList,
    ReorderList,
    ResetState,
    UpdateDetails,
} from '../state/list-actions';
import {ListState} from '../state/list-state';
import {Observable} from 'rxjs';
import {Title} from '../../../models/title';
import {Person} from '../../../models/person';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ListItem} from '../types/list-item';
import {MESSAGES} from '../../../toast-messages';
import {LIST_AUTO_UPDATE_OPTIONS} from '../list-auto-update-options';
import {Toast} from '@common/core/ui/toast.service';
import {CurrentUser} from '@common/auth/current-user';
import {ConfirmModalComponent} from '@common/core/ui/confirm-modal/confirm-modal.component';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {MediaViewMode} from '../../shared/media-view/media-view-mode';

@Component({
    selector: 'crupdate-list',
    templateUrl: './crupdate-list.component.html',
    styleUrls: ['./crupdate-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrupdateListComponent implements OnInit, OnDestroy {
    @Select(ListState.items) items$: Observable<(Title | Person)[]>;
    @Select(ListState.updating) updating$: Observable<boolean>;
    @Select(ListState.loading) loading$: Observable<boolean>;
    @Select(ListState.system) system$: Observable<boolean>;
    public autoUpdateOptions = LIST_AUTO_UPDATE_OPTIONS;

    public form = new FormGroup({
        name: new FormControl(''),
        public: new FormControl(false),
        style: new FormControl(MediaViewMode.Portrait),
        description: new FormControl(''),
        auto_update: new FormControl(null),
    });

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private modal: Modal,
        private toast: Toast,
        public currentUser: CurrentUser
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.hydrateList(params.id);
        });
    }

    ngOnDestroy() {
        this.store.dispatch(new ResetState());
    }

    public attachItem(item: SearchResult) {
        this.store.dispatch(new AttachItem(item));
    }

    public detachItem(item: ListItem) {
        this.store.dispatch(new DetachItem(item));
    }

    public createOrUpdateList() {
        this.store.dispatch([
            new UpdateDetails(this.form.getRawValue()),
            new CreateOrUpdateList(),
        ]);
    }

    public reorderList(e: CdkDragDrop<ListItem>) {
        if (this.store.selectSnapshot(ListState.loading)) return;
        this.store.dispatch(new ReorderList(e.previousIndex, e.currentIndex));
    }

    private hydrateList(id: number) {
        if (!id) return;
        this.store.dispatch(new ReloadList(id)).subscribe(() => {
            const list = this.store.selectSnapshot(ListState.list);
            this.form.patchValue(list);
            if (list.system) {
                this.form.get('name').disable();
                this.form.get('public').disable();
            }
        });
    }

    public maybeDeleteList() {
        this.modal
            .open(ConfirmModalComponent, {
                title: 'Delete List',
                body: 'Are you sure you want to delete this list?',
                ok: 'Delete',
            })
            .afterClosed()
            .subscribe(confirmed => {
                if (!confirmed) return;
                const id = this.store.selectSnapshot(ListState.list).id;
                return this.store.dispatch(new DeleteList(id)).subscribe(() => {
                    this.router.navigate(['/lists']);
                    this.toast.open(MESSAGES.LIST_DELETE_SUCCESS);
                });
            });
    }
}
