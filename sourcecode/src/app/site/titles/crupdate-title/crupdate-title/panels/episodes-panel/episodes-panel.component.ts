import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {Episode} from '../../../../../../models/episode';
import {DeleteEpisode} from '../../state/crupdate-title-actions';
import {MESSAGES} from '../../../../../../toast-messages';
import {CrupdateEpisodeModalComponent} from '../seasons-panel/crupdate-episode-modal/crupdate-episode-modal.component';
import {Store} from '@ngxs/store';
import {Season} from '../../../../../../models/season';
import {Modal} from '../../../../../../../common/core/ui/dialogs/modal.service';
import {Toast} from '../../../../../../../common/core/ui/toast.service';
import {ConfirmModalComponent} from '../../../../../../../common/core/ui/confirm-modal/confirm-modal.component';
import {ActivatedRoute} from '@angular/router';
import {DatatableService} from '../../../../../../../common/datatable/datatable.service';

@Component({
    selector: 'episodes-panel',
    templateUrl: './episodes-panel.component.html',
    styleUrls: ['./episodes-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService]
})
export class EpisodesPanelComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() season: Season;
    public trackByFn = (i: number, episode: Episode) => episode.id;

    constructor(
        private store: Store,
        private dialog: Modal,
        private toast: Toast,
        private route: ActivatedRoute,
        public datatable: DatatableService<Episode>,
    ) {}

    ngOnInit() {
        this.datatable.init();
    }

    ngAfterViewInit() {
        const episodeNum = +this.route.snapshot.params.episodeNumber;
        if (episodeNum) {
            const episode = this.season.episodes.find(e => e.episode_number === episodeNum);
            if (episode) {
                this.openCrupdateEpisodeModal(episode);
            }
        }
    }

    ngOnChanges(changes: {season?: SimpleChange}) {
        if (changes.season.currentValue && changes.season.currentValue.episodes) {
            this.datatable.data = this.season.episodes;
        }
    }

    ngOnDestroy() {
        this.datatable.destroy();
    }

    public deleteEpisode(episode: Episode) {
        this.dialog.open(ConfirmModalComponent, {
            title: 'Delete Episode',
            body:  'Are you sure you want to delete this episode?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.store.dispatch(new DeleteEpisode(episode)).subscribe(() => {
                this.toast.open(MESSAGES.EPISODE_DELETE_SUCCESS);
            });
        });
    }

    public openCrupdateEpisodeModal(episode?: Episode) {
        this.dialog.open(
            CrupdateEpisodeModalComponent,
            {episode, season: this.season},
            {panelClass: 'crupdate-episode-modal-container'}
        );
    }
}
