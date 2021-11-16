import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '../../models/title';
import {TitlesService} from '../../site/titles/titles.service';
import {ImportMediaModalComponent} from '../../site/shared/import-media-modal/import-media-modal.component';
import {MEDIA_TYPE} from '../../site/media-type';
import {Router} from '@angular/router';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {CurrentUser} from '@common/auth/current-user';
import {Settings} from '@common/core/config/settings.service';
import {DatatableService} from '@common/datatable/datatable.service';
import {Observable} from 'rxjs';
import {TITLE_INDEX_FILTERS} from './title-index-filters';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'titles-page',
    templateUrl: './titles-page.component.html',
    styleUrls: ['./titles-page.component.scss'],
    providers: [DatatableService],
    encapsulation: ViewEncapsulation.None,
})
export class TitlesPageComponent implements OnInit {
    filters = TITLE_INDEX_FILTERS;
    titles$ = this.datatable.data$ as Observable<Title[]>;
    constructor(
        public datatable: DatatableService<Title>,
        private titleService: TitlesService,
        private modal: Modal,
        public currentUser: CurrentUser,
        public settings: Settings,
        public url: UrlGeneratorService,
        private router: Router
    ) {}

    ngOnInit() {
        this.datatable.init({
            uri: TitlesService.BASE_URI,
        });
    }

    public maybeDeleteSelectedTitles() {
        this.datatable.confirmResourceDeletion('titles').subscribe(() => {
            this.titleService
                .delete(this.datatable.selectedRows$.value)
                .subscribe(() => {
                    this.datatable.reset();
                });
        });
    }

    public openImportMediaModal() {
        this.modal
            .open(ImportMediaModalComponent, {
                mediaTypes: [MEDIA_TYPE.MOVIE, MEDIA_TYPE.SERIES],
            })
            .beforeClosed()
            .subscribe(mediaItem => {
                if (mediaItem) {
                    this.router.navigate([
                        '/admin/titles',
                        mediaItem.id,
                        'edit',
                    ]);
                }
            });
    }
}
