import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CrupdateTitleState} from '../../state/crupdate-title-state';
import {Observable} from 'rxjs';
import {Image} from '../../../../../../models/image';
import {ImagesService} from '../../../../../shared/images.service';
import {AddImage, ChangeImageOrder, DeleteImage} from '../../state/crupdate-title-actions';
import {MESSAGES} from '../../../../../../toast-messages';
import {UploadQueueService} from '../../../../../../../common/uploads/upload-queue/upload-queue.service';
import {CdkDrag, CdkDragMove, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {Toast} from '../../../../../../../common/core/ui/toast.service';
import {openUploadWindow} from '../../../../../../../common/uploads/utils/open-upload-window';
import {UploadInputTypes} from '../../../../../../../common/uploads/upload-input-config';
import {ViewportRuler} from '@angular/cdk/overlay';

@Component({
    selector: 'images-panel',
    templateUrl: './images-panel.component.html',
    styleUrls: ['./images-panel.component.scss'],
    providers: [UploadQueueService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesPanelComponent {
    @Select(CrupdateTitleState.images) images$: Observable<Image[]>;

    @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
    @ViewChild(CdkDropList) placeholder: CdkDropList;

    public target: CdkDropList;
    public targetIndex: number;
    public source: CdkDropList;
    public sourceIndex: number;
    public activeContainer;

    constructor(
        private images: ImagesService,
        private store: Store,
        private toast: Toast,
        private viewportRuler: ViewportRuler,
    ) {}

    public uploadImage() {
        openUploadWindow({types: [UploadInputTypes.image]}).then(upload => {
            const params = {
                modelId: this.store.selectSnapshot(CrupdateTitleState.title).id
            };
            this.images.create(upload[0], params)
                .subscribe(response => {
                    this.store.dispatch(new AddImage(response.image)).subscribe(() => {
                        this.toast.open(MESSAGES.IMAGE_CREATE_SUCCESS);
                    });
                });
        });
    }

    public deleteImage(image: Image) {
        this.store.dispatch(new DeleteImage(image)).subscribe(() => {
            this.toast.open(MESSAGES.IMAGE_DELETE_SUCCESS);
        });
    }

    /* GRID DRAG AND DROP */

    dragMoved(e: CdkDragMove) {
        const point = this.getPointerPositionOnPage(e.event);
        this.listGroup._items.forEach(dropList => {
            if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
                this.activeContainer = dropList;
                return;
            }
        });
    }

    dropListDropped() {
        if ( ! this.target) return;

        const phElement = this.placeholder.element.nativeElement;
        const parent = phElement.parentElement;

        phElement.style.display = 'none';

        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

        this.target = null;
        this.source = null;

        if (this.sourceIndex !== this.targetIndex) {
            this.store.dispatch(new ChangeImageOrder(this.sourceIndex, this.targetIndex));
        }
    }

    dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
        if (drop === this.placeholder) return true;


        if (drop !== this.activeContainer) return false;

        const phElement = this.placeholder.element.nativeElement;
        const sourceElement = drag.dropContainer.element.nativeElement;
        const dropElement = drop.element.nativeElement;

        const dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
        const dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

        if ( ! this.source) {
            this.sourceIndex = dragIndex;
            this.source = drag.dropContainer;

            phElement.style.width = sourceElement.clientWidth + 'px';
            phElement.style.height = sourceElement.clientHeight + 'px';

            sourceElement.parentElement.removeChild(sourceElement);
        }

        this.targetIndex = dropIndex;
        this.target = drop;

        phElement.style.display = '';
        dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
            ? dropElement.nextSibling : dropElement));

        this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
        return false;
    }

    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();

        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top
        };
    }
}

function __indexOf(collection, node) {
    return Array.prototype.indexOf.call(collection, node);
}

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
    const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
}
