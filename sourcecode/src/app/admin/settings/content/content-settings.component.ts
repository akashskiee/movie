import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {MESSAGES} from '../../../toast-messages';
import {SettingsPanelComponent} from '@common/admin/settings/settings-panel.component';
import {BehaviorSubject} from 'rxjs';
import {LanguageListItem} from '@common/core/services/value-lists.service';
import {FormControl} from '@angular/forms';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {scrollInvalidInputIntoView} from '@common/core/utils/scroll-invalid-input-into-view';

interface SearchableModel {
    model: string;
    name: string;
}

@Component({
    selector: 'content-settings',
    templateUrl: './content-settings.component.html',
    styleUrls: ['./content-settings.component.scss'],
    host: {class: 'settings-panel'},
})
export class ContentSettingsComponent extends SettingsPanelComponent implements OnInit {
    public browseGenres: string[] = [];
    public ageRatings: string[] = [];
    public qualities: string[] = [];
    public defaultBrowseMaxYear: number;
    public languages$ = new BehaviorSubject<LanguageListItem[]>([]);

    public models$ = new BehaviorSubject<SearchableModel[]>([]);
    public searchableModelControl = new FormControl(null);

    ngOnInit() {
        this.http.get<{models: SearchableModel[]}>('admin/search/models').subscribe(response => {
            this.models$.next(response.models);
        });
        this.browseGenres = this.settings.getJson('browse.genres', []);
        this.ageRatings = this.settings.getJson('browse.ageRatings', []);
        this.qualities = this.settings.getJson('streaming.qualities', []);
        this.defaultBrowseMaxYear = (new Date()).getFullYear() + 3;
        this.valueLists.get(['tmdb-languages']).subscribe(response => {
            this.languages$.next(response['tmdb-languages']);
        });
    }

    importRecords() {
        this.state.loading$.next(true);
        this.http.post('admin/search/import', {
            model: this.searchableModelControl.value,
            driver: this.state.server.scout_driver
        }).pipe(finalize(() => this.state.loading$.next(false)))
            .subscribe(() => {
                this.toast.open('Records imported');
            }, (err: BackendErrorResponse) => {
                this.state.errors$.next({search_group: 'Could not import records: ' + err.message});
                scrollInvalidInputIntoView(this.state.errors$.value);
            });
    }

    updateNews() {
        this.state.loading$.next(true);
        this.http.post('news/import-from-remote-provider')
            .pipe(finalize(() => this.state.loading$.next(false)))
            .subscribe(() => {
                this.toast.open(MESSAGES.NEWS_MANUALLY_UPDATE_SUCCESS);
            });
    }

    updateLists() {
        this.state.loading$.next(true);
        this.http.post('lists/auto-update-content')
            .pipe(finalize(() => this.state.loading$.next(false)))
            .subscribe(() => {
                this.toast.open(MESSAGES.LISTS_MANUALLY_UPDATE_SUCCESS);
            });
    }

    saveSettings() {
        const settings = this.state.getModified();
        settings.client['browse.genres'] = JSON.stringify(this.browseGenres);
        settings.client['browse.ageRatings'] = JSON.stringify(this.ageRatings);
        settings.client['streaming.qualities'] = JSON.stringify(this.qualities);
        super.saveSettings(settings);
    }
}
