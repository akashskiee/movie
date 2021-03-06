import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageOrIconComponent} from '@common/core/ui/image-or-icon/image-or-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { SvgImageModule } from '@common/core/ui/svg-image/svg-image.module';


@NgModule({
    declarations: [
        ImageOrIconComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        SvgImageModule,
    ],
    exports: [
        ImageOrIconComponent
    ]
})
export class ImageOrIconModule {
}
