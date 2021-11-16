import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MediaViewMode} from '../media-view-mode';
import {LocalStorage} from '@common/core/services/local-storage.service';

@Component({
    selector: 'media-view-mode-switcher',
    templateUrl: './media-view-mode-switcher.component.html',
    styleUrls: ['./media-view-mode-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaViewModeSwitcherComponent implements OnInit {
    @Input() storageKey: string;
    modeControl = new FormControl();

    constructor(private localStorage: LocalStorage) {}

    ngOnInit() {
        this.modeControl.valueChanges.subscribe(value => {
            this.localStorage.set(`view-mode-${this.storageKey}`, value);
        });
        const initial = this.localStorage.get(
            `view-mode-${this.storageKey}`,
            MediaViewMode.Portrait
        );
        this.modeControl.setValue(initial, {emitEvent: false});
    }
}
