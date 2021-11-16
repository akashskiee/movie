import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchInputComponent} from './search-input.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {TranslationsModule} from '../../../../common/core/translations/translations.module';
import {MatButtonModule} from '@angular/material/button';
import {MediaImageModule} from '../../shared/media-image/media-image.module';
import {KnowForWidgetModule} from '../../people/known-for-widget/know-for-widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        SearchInputComponent,
    ],
    imports: [
        CommonModule,
        TranslationsModule,
        MediaImageModule,
        KnowForWidgetModule,
        FormsModule,
        ReactiveFormsModule,

        // material
        MatAutocompleteModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        SearchInputComponent,
    ]
})
export class SearchInputModule {
}
