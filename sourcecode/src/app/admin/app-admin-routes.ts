import {Routes} from '@angular/router';
import {TitlesPageComponent} from './titles-page/titles-page.component';
import {NewsPageComponent} from './news-page/news-page.component';
import {CrupdateArticleComponent} from './news-page/crupdate-article/crupdate-article.component';
import {ContentSettingsComponent} from './settings/content/content-settings.component';
import {PeoplePageComponent} from './people-page/people-page.component';
import {ListsPageComponent} from './lists-page/lists-page.component';
import {VideoIndexComponent} from './video-index/video-index.component';
import {StreamingSettingsComponent} from './settings/streaming-settings/streaming-settings.component';
import {ReviewsIndexComponent} from './reviews-index/reviews-index.component';

// TODO: maybe add "primary_credit" id on person table and remove lazy loading of all credits

export const APP_ADMIN_ROUTES: Routes = [
    // videos
    {
        path: 'videos',
        component: VideoIndexComponent,
        data: {permissions: ['videos.view']},
    },

    // lists
    {
        path: 'lists',
        component: ListsPageComponent,
        data: {permissions: ['lists.view']},
    },

    // news
    {
        path: 'news',
        component: NewsPageComponent,
        data: {permissions: ['news.view']},
    },
    {
        path: 'news/:id/edit',
        component: CrupdateArticleComponent,
        data: {permissions: ['news.update']},
    },
    {
        path: 'news/create',
        component: CrupdateArticleComponent,
        data: {permissions: ['news.create']},
    },

    // titles
    {
        path: 'titles',
        component: TitlesPageComponent,
        data: {permissions: ['titles.view']},
    },
    {
        path: 'titles/new',
        loadChildren: () =>
            import(
                'src/app/site/titles/crupdate-title/crupdate-title.module'
            ).then(m => m.CrupdateTitleModule),
    },
    {
        path: 'titles/:titleId/edit',
        loadChildren: () =>
            import(
                'src/app/site/titles/crupdate-title/crupdate-title.module'
            ).then(m => m.CrupdateTitleModule),
    },

    // people
    {
        path: 'people',
        component: PeoplePageComponent,
        data: {permissions: ['people.view']},
    },
    {
        path: 'people/new',
        loadChildren: () =>
            import(
                'src/app/site/people/crupdate-person/crupdate-person.module'
            ).then(m => m.CrupdatePersonModule),
    },
    {
        path: 'people/:id/edit',
        loadChildren: () =>
            import(
                'src/app/site/people/crupdate-person/crupdate-person.module'
            ).then(m => m.CrupdatePersonModule),
    },

    // reviews
    {
        path: 'reviews',
        component: ReviewsIndexComponent,
        data: {permissions: ['reviews.view']},
    },
];

export const APP_SETTING_ROUTES: Routes = [
    {
        path: 'content',
        component: ContentSettingsComponent,
    },
    {
        path: 'streaming',
        component: StreamingSettingsComponent,
    },
];
