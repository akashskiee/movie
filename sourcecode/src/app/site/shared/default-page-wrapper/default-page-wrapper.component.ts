import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'default-page-wrapper',
    templateUrl: './default-page-wrapper.component.html',
    styleUrls: ['./default-page-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultPageWrapperComponent {}
