import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrupdatePersonRoutingModule} from './crupdate-person-routing.module';
import {CrupdatePersonPageComponent} from './crupdate-person-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TranslationsModule} from '../../../../common/core/translations/translations.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MediaImageModule} from '../../shared/media-image/media-image.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatIconModule} from '@angular/material/icon';
import {NoResultsMessageModule} from '../../../../common/core/ui/no-results-message/no-results-message.module';
import {LoadingIndicatorModule} from '../../../../common/core/ui/loading-indicator/loading-indicator.module';
import {NgxsModule} from '@ngxs/store';
import {CrupdatePersonState} from './state/crupdate-person-state';
import {DatatableModule} from '../../../../common/datatable/datatable.module';


@NgModule({
    declarations: [
        CrupdatePersonPageComponent,
    ],
    imports: [
        CommonModule,
        CrupdatePersonRoutingModule,
        TranslationsModule,
        FormsModule,
        ReactiveFormsModule,
        MediaImageModule,
        NoResultsMessageModule,
        LoadingIndicatorModule,
        DatatableModule,

        NgxsModule.forFeature([
            CrupdatePersonState
        ]),

        // material
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TextFieldModule,
    ]
})
export class CrupdatePersonModule {
}
