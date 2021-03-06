import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Settings} from '../../core/config/settings.service';
import {FileEntry} from '../../uploads/types/file-entry';
import {CurrentUser} from '../../auth/current-user';
import {UploadsApiService} from '../../uploads/uploads-api.service';
import {Observable} from 'rxjs';
import {DatatableService} from '../../datatable/datatable.service';
import {FILE_ENTRY_INDEX_FILTERS} from '@common/admin/file-entry-index/file-entry-index-filters';

@Component({
    selector: 'file-entry-index',
    templateUrl: './file-entry-index.component.html',
    styleUrls: ['./file-entry-index.component.scss'],
    providers: [DatatableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileEntryIndexComponent implements OnInit {
    files$ = this.datatable.data$ as Observable<FileEntry[]>;
    filters = FILE_ENTRY_INDEX_FILTERS;

    constructor(
        public currentUser: CurrentUser,
        public settings: Settings,
        private uploads: UploadsApiService,
        public datatable: DatatableService<FileEntry>
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: UploadsApiService.BASE_URI,
        });
    }

    public maybeDeleteSelectedEntries() {
        this.datatable.confirmResourceDeletion('files').subscribe(() => {
            const entryIds = this.datatable.selectedRows$.value;
            this.uploads
                .delete({entryIds, deleteForever: true})
                .subscribe(() => {
                    this.datatable.reset();
                });
        });
    }
}
