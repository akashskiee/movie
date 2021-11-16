import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChange
} from '@angular/core';
import {Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {TitleCredit} from '../../../../../../models/title';
import {CrupdateCreditModalComponent} from '../crupdate-credit-modal/crupdate-credit-modal.component';
import {ChangeCreditOrder, RemoveCredit} from '../../state/crupdate-title-actions';
import {MESSAGES} from '../../../../../../toast-messages';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Person} from '../../../../../../models/person';
import {Creditable} from '../../../../../people/creditable';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {Toast} from '@common/core/ui/toast.service';
import {ConfirmModalComponent} from '@common/core/ui/confirm-modal/confirm-modal.component';
import {DatatableService} from '@common/datatable/datatable.service';

@Component({
    selector: 'credits-panel',
    templateUrl: './credits-panel.component.html',
    styleUrls: ['./credits-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatatableService]
})
export class CreditsPanelComponent implements OnChanges, OnInit, OnDestroy {
    @Input() mediaItem: Creditable;
    @Input() type: 'cast'|'crew';

    constructor(
        private dialog: Modal,
        private store: Store,
        private toast: Toast,
        public datatable: DatatableService<TitleCredit>,
    ) {}

    ngOnInit() {
        this.datatable.init();
    }

    ngOnChanges(changes: {mediaItem?: SimpleChange}) {
        if (changes.mediaItem && changes.mediaItem.currentValue) {
            this.datatable.data = this.type === 'cast' ?
                this.getCast(this.mediaItem.credits) :
                this.getCrew(this.mediaItem.credits);
        }
    }

    ngOnDestroy() {
        this.datatable.destroy();
    }

    public openCrupdateCreditModal(credit?: TitleCredit) {
        this.dialog.open(
            CrupdateCreditModalComponent,
            {credit, type: this.type, mediaItem: this.mediaItem}
        );
    }

    public detachCredit(credit: TitleCredit) {
        this.dialog.open(ConfirmModalComponent, {
            title: 'Remove Credit',
            body:  'Are you sure you want to remove this credit?',
            ok:    'Remove'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.store.dispatch(new RemoveCredit(this.mediaItem, credit)).subscribe(() => {
                this.toast.open(MESSAGES.CREDIT_REMOVE_SUCCESS);
            });
        });
    }

    public changeCreditsOrder(e: CdkDragDrop<Person>) {
        if (this.store.selectSnapshot(CrupdateTitleState.loading)) return;
        this.store.dispatch(new ChangeCreditOrder(this.mediaItem, e.previousIndex, e.currentIndex, this.type));
    }

    public getCast(credits: TitleCredit[]) {
        if ( ! credits) return [];
        return credits.filter(credit => credit.pivot.department === 'cast');
    }

    public getCrew(credits: TitleCredit[]) {
        if ( ! credits) return [];
        return credits.filter(credit => credit.pivot.department !== 'cast');
    }
}
