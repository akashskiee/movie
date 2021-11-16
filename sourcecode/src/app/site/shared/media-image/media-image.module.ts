import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaImageComponent} from './media-image.component';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
    declarations: [
        MediaImageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        LazyLoadImageModule,
    ],
    exports: [
        MediaImageComponent,
    ]
})
export class MediaImageModule {
}
