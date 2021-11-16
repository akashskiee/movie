import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrupdateTitleComponent} from './crupdate-title/crupdate-title.component';
import {PrimaryFactsPanelComponent} from './crupdate-title/panels/primary-facts-panel/primary-facts-panel.component';
import {ImagesPanelComponent} from './crupdate-title/panels/images-panel/images-panel.component';
import {CreditsPanelComponent} from './crupdate-title/panels/credits-panel/credits-panel.component';
import {CrupdateCreditModalComponent} from './crupdate-title/panels/crupdate-credit-modal/crupdate-credit-modal.component';
import {TagsPanelComponent} from './crupdate-title/panels/tags-panel/tags-panel.component';
import {SeasonsPanelComponent} from './crupdate-title/panels/seasons-panel/seasons-panel.component';
import {CrupdateEpisodeModalComponent} from './crupdate-title/panels/seasons-panel/crupdate-episode-modal/crupdate-episode-modal.component';
import {VideoIndexComponent} from '../../../admin/video-index/video-index.component';
import {CrupdateTitleRoutingModule} from './crupdate-title-routing.module';
import {TranslationsModule} from '../../../../common/core/translations/translations.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {NoResultsMessageModule} from '../../../../common/core/ui/no-results-message/no-results-message.module';
import {MediaImageModule} from '../../shared/media-image/media-image.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {EpisodesPanelComponent} from './crupdate-title/panels/episodes-panel/episodes-panel.component';
import {FormatPipesModule} from '../../../../common/core/ui/format-pipes/format-pipes.module';
import {LoadingIndicatorModule} from '../../../../common/core/ui/loading-indicator/loading-indicator.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SearchInputModule} from '../../search/seach-input/search-input.module';
import {DatatableModule} from '../../../../common/datatable/datatable.module';
import {SelectUserInputModule} from '../../../../common/core/ui/select-user-input/select-user-input.module';
import {SelectTitleInputModule} from '../../../admin/video-index/select-title-input/select-title-input.module';
import {ReviewsIndexComponent} from '../../../admin/reviews-index/reviews-index.component';
import {ReviewIndexFiltersComponent} from '../../../admin/reviews-index/review-index-filters/review-index-filters.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        CrupdateTitleComponent,
        PrimaryFactsPanelComponent,
        ImagesPanelComponent,
        CreditsPanelComponent,
        CrupdateCreditModalComponent,
        TagsPanelComponent,
        SeasonsPanelComponent,
        EpisodesPanelComponent,
        CrupdateEpisodeModalComponent,
        VideoIndexComponent,
        ReviewsIndexComponent,
        ReviewIndexFiltersComponent,
    ],
    imports: [
        CommonModule,
        CrupdateTitleRoutingModule,
        TranslationsModule,
        FormsModule,
        ReactiveFormsModule,
        NoResultsMessageModule,
        MediaImageModule,
        FormatPipesModule,
        LoadingIndicatorModule,
        SearchInputModule,
        DatatableModule,
        SelectUserInputModule,
        SelectTitleInputModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatTabsModule,
        TextFieldModule,
        MatExpansionModule,
        DragDropModule,
        MatAutocompleteModule,
        MatProgressBarModule,
    ],
})
export class CrupdateTitleModule {}
