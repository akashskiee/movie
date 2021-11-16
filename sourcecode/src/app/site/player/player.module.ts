import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerComponent} from './player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TranslationsModule} from '@common/core/translations/translations.module';
import {LoadingIndicatorModule} from '@common/core/ui/loading-indicator/loading-indicator.module';
import {MediaImageModule} from '../shared/media-image/media-image.module';

@NgModule({
    declarations: [PlayerComponent],
    imports: [
        CommonModule,

        // material
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        TranslationsModule,
        LoadingIndicatorModule,
        MediaImageModule,
    ],
})
export class PlayerModule {}
