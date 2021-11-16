import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {VideoCaption} from '../../../captions/caption';
import {CrupdateCaptionModalComponent} from '../../../captions/crupdate-caption-modal/crupdate-caption-modal.component';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {BehaviorSubject} from 'rxjs';
import {Video} from '../../../../models/video';
import {ConfirmModalComponent} from '@common/core/ui/confirm-modal/confirm-modal.component';
import {CaptionService} from '../../../captions/caption.service';
import {Toast} from '@common/core/ui/toast.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'captions-panel',
    templateUrl: './captions-panel.component.html',
    styleUrls: ['./captions-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionsPanelComponent implements OnInit {
    @Input() video: Video;
    public captions$ = new BehaviorSubject<VideoCaption[]>([]);

    constructor(
        private modal: Modal,
        private captions: CaptionService,
        private toast: Toast,
    ) {}

    ngOnInit() {
        if (this.video) {
            this.captions$.next(this.video.captions);
        }
    }

    public openCrupdateCaptionModal(caption?: VideoCaption) {
        this.modal.open(CrupdateCaptionModalComponent, {video: this.video, caption})
            .afterClosed()
            .subscribe(newCaption => {
                if ( ! newCaption) return;
                const captions = [...this.captions$.value];
                if (caption) {
                    const i = captions.findIndex(c => c.id === newCaption.id);
                    captions[i] = newCaption;
                } else {
                    captions.push(newCaption);
                }
                this.captions$.next(captions);
                this.video.captions = captions;
            });
    }

    public maybeDeleteCaption(caption: VideoCaption) {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Caption',
            body:  'Are you sure you want to delete this caption?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteCaption(caption);
        });
    }

    private deleteCaption(caption: VideoCaption) {
        this.captions.delete([caption.id]).subscribe(() => {
            this.toast.open('Caption deleted.');
            const newCaptions = this.captions$.value.filter(c => c.id !== caption.id);
            this.captions$.next(newCaptions);
            this.video.captions = newCaptions;
        });
    }

    public reorderCaptions(e: CdkDragDrop<any>) {
        const newCaptions = [...this.captions$.value];
        moveItemInArray(newCaptions, e.previousIndex, e.currentIndex);
        this.captions$.next(newCaptions);
        this.video.captions = newCaptions;

        const order = {};
        newCaptions.forEach((video, i) => order[i] = video.id);
        this.captions.reorder(this.video.id, order).subscribe();
    }
}
