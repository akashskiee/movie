import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TitlesPageComponent} from './titles-page/titles-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {NewsPageComponent} from './news-page/news-page.component';
import {CrupdateArticleComponent} from './news-page/crupdate-article/crupdate-article.component';
import {ContentSettingsComponent} from './settings/content/content-settings.component';
import {PeoplePageComponent} from './people-page/people-page.component';
import {ListsPageComponent} from './lists-page/lists-page.component';
import {BaseAdminModule} from '@common/admin/base-admin.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {StreamingSettingsComponent} from './settings/streaming-settings/streaming-settings.component';
import {LoadingIndicatorModule} from '@common/core/ui/loading-indicator/loading-indicator.module';
import {NoResultsMessageModule} from '@common/core/ui/no-results-message/no-results-message.module';
import {TagsManagerModule} from '@common/tags/tags-manager/tags-manager.module';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MediaImageModule} from '../site/shared/media-image/media-image.module';
import {TextFieldModule} from '@angular/cdk/text-field';
import {SelectTitleInputModule} from './video-index/select-title-input/select-title-input.module';
import {SelectUserInputModule} from '@common/core/ui/select-user-input/select-user-input.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BaseAdminModule,
        LoadingIndicatorModule,
        NoResultsMessageModule,
        TagsManagerModule,
        MediaImageModule,
        SelectUserInputModule,
        SelectTitleInputModule,

        // material
        MatExpansionModule,
        MatTabsModule,
        MatProgressBarModule,
        DragDropModule,
        MatAutocompleteModule,
        TextFieldModule,
    ],
    declarations: [
        TitlesPageComponent,
        NewsPageComponent,
        CrupdateArticleComponent,
        ContentSettingsComponent,
        PeoplePageComponent,
        ListsPageComponent,
        StreamingSettingsComponent,
    ],
    providers: [Modal],
})
export class AppAdminModule {}
