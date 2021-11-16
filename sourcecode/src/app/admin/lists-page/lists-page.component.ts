import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {ListsService} from '../../site/lists/lists.service';
import {List} from '../../models/list';
import {CurrentUser} from '@common/auth/current-user';
import {Settings} from '@common/core/config/settings.service';
import {Observable} from 'rxjs';
import {DatatableService} from '@common/datatable/datatable.service';
import {MESSAGES} from '../../toast-messages';
import {Toast} from '@common/core/ui/toast.service';
import {LISTS_INDEX_FILTERS} from './lists-index-filters';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'lists-page',
    templateUrl: './lists-page.component.html',
    styleUrls: ['./lists-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService],
})
export class ListsPageComponent implements OnInit {
    filters = LISTS_INDEX_FILTERS;
    lists$ = this.datatable.data$ as Observable<List[]>;

    constructor(
        public datatable: DatatableService<List>,
        private lists: ListsService,
        public currentUser: CurrentUser,
        public settings: Settings,
        public url: UrlGeneratorService,
        private toast: Toast
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: ListsService.BASE_URI,
            staticParams: {
                excludeSystem: true,
                with: 'user',
                withCount: 'items',
            },
        });
    }

    public maybeDeleteSelectedLists() {
        this.datatable.confirmResourceDeletion('lists').subscribe(() => {
            this.lists
                .delete(this.datatable.selectedRows$.value)
                .subscribe(() => {
                    this.toast.open(MESSAGES.LIST_DELETE_SUCCESS);
                    this.datatable.reset();
                });
        });
    }
}
