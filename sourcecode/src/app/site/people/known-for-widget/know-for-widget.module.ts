import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KnownForWidgetComponent} from './known-for-widget.component';
import {TranslationsModule} from '../../../../common/core/translations/translations.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        KnownForWidgetComponent,
    ],
    imports: [
        CommonModule,
        TranslationsModule,
        RouterModule,
    ],
    exports: [
        KnownForWidgetComponent
    ],
})
export class KnowForWidgetModule {
}
