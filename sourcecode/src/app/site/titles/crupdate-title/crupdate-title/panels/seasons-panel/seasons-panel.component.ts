import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit
} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {Season} from '../../../../../../models/season';
import {CreateSeason, DeleteSeason} from '../../state/crupdate-title-actions';
import {Modal} from '../../../../../../../common/core/ui/dialogs/modal.service';
import {ConfirmModalComponent} from '../../../../../../../common/core/ui/confirm-modal/confirm-modal.component';
import {MESSAGES} from '../../../../../../toast-messages';
import {Toast} from '../../../../../../../common/core/ui/toast.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'seasons-panel',
    templateUrl: './seasons-panel.component.html',
    styleUrls: ['./seasons-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonsPanelComponent implements OnInit, AfterViewInit {
    @Select(CrupdateTitleState.seasons) seasons$: Observable<Season[]>;
    @Select(CrupdateTitleState.loading) loading$: Observable<boolean>;
    public activeSeason$ = new BehaviorSubject<number>(1);

    constructor(
        private store: Store,
        private modal: Modal,
        private toast: Toast,
        private route: ActivatedRoute,
        private el: ElementRef<HTMLElement>,
    ) {}

    ngOnInit() {
        this.activeSeason$.next(+this.route.snapshot.params.seasonNumber || 1);
    }

    ngAfterViewInit() {
       setTimeout(() => {
           if (this.activeSeason$.value > 1) {
               this.el.nativeElement.querySelector(`.season-${this.activeSeason$.value}-panel`)
                   ?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
           }
       });
    }

    public addSeason() {
        this.store.dispatch(new CreateSeason()).subscribe(() => {
            this.toast.open(MESSAGES.SEASON_CREATE_SUCCESS);
        });
    }

    public maybeDeleteSeason(season: Season) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Delete Season',
            body:  'Are you sure you want to delete this season?',
            bodyBold: 'This will also delete all episodes attached to this season.',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.store.dispatch(new DeleteSeason(season)).subscribe(() => {
                this.toast.open(MESSAGES.SEASON_DELETE_SUCCESS);
            });
        });
    }

    trackByFn(index: number, season: Season) {
        return season.id;
    }
}
