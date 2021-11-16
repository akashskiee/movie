import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {LoadingIndicatorModule} from '../../../../common/core/ui/loading-indicator/loading-indicator.module';
import {SelectTitleInputComponent} from './select-title-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslationsModule} from '../../../../common/core/translations/translations.module';


@NgModule({
    declarations: [
        SelectTitleInputComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingIndicatorModule,
        TranslationsModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [
        SelectTitleInputComponent,
    ]
})
export class SelectTitleInputModule {
}
