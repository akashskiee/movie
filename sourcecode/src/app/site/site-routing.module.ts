import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TitlePageContainerComponent} from './titles/title-page-container/title-page-container.component';
import {TitleResolverService} from './titles/title-resolver.service';
import {CrupdateListComponent} from './lists/crupdate-list/crupdate-list.component';
import {SeasonPageComponent} from './titles/components/season-page/season-page.component';
import {MEDIA_TYPE} from './media-type';
import {PersonPageComponent} from './people/person-page/person-page.component';
import {PersonResolverService} from './people/person-resolver.service';
import {SearchPageComponent} from './search/search-page/search-page.component';
import {SearchResultsResolverService} from './search/search-page/search-results-resolver.service';
import {ListPageComponent} from './lists/list-page/list-page.component';
import {UserListsComponent} from './lists/user-lists/user-lists.component';
import {BrowseTitlesComponent} from './titles/components/browse-titles/browse-titles.component';
import {FullCreditsPageComponent} from './titles/components/full-credits-page/full-credits-page.component';
import {NewsArticleComponent} from './news/news-article/news-article.component';
import {NewsIndexComponent} from './news/news-index/news-index.component';
import {PeopleIndexComponent} from './people/people-index/people-index.component';
import {CheckPermissionsGuard} from '@common/guards/check-permissions-guard.service';
import {AuthGuard} from '@common/guards/auth-guard.service';
import {DefaultPageWrapperComponent} from './shared/default-page-wrapper/default-page-wrapper.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ProfileListTabComponent} from './user-profile/tabs/profile-list-tab/profile-list-tab.component';
import {ProfileRatingsTabComponent} from './user-profile/tabs/profile-ratings-tab/profile-ratings-tab.component';
import {ProfileReviewTabComponent} from './user-profile/tabs/profile-review-tab/profile-review-tab.component';
import {ProfileCommentsTabComponent} from './user-profile/tabs/profile-comments-tab/profile-comments-tab.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [CheckPermissionsGuard],
        canActivateChild: [CheckPermissionsGuard],
        children: [
            // user profile
            {
                path: 'users/:userId',
                component: UserProfileComponent,
                children: [
                    {path: '', component: ProfileListTabComponent},
                    {path: 'lists', component: ProfileListTabComponent},
                    {path: 'ratings', component: ProfileRatingsTabComponent},
                    {path: 'reviews', component: ProfileReviewTabComponent},
                    {path: 'comments', component: ProfileCommentsTabComponent},
                ],
            },

            // browse
            {
                path: 'movies',
                redirectTo: 'browse',
            },
            {
                path: 'series',
                redirectTo: 'browse',
            },
            {
                path: 'browse',
                component: BrowseTitlesComponent,
                data: {
                    permissions: ['titles.view'],
                    name: 'browse',
                    willSetSeo: true,
                },
            },

            // titles
            {
                path: 'movies/:titleId',
                redirectTo: 'titles/:titleId',
            },
            {
                path: 'series/:titleId',
                redirectTo: 'titles/:titleId',
            },
            {
                path: 'titles/create',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/titles/crupdate-title/crupdate-title.module'
                    ).then(m => m.CrupdateTitleModule),
            },
            {
                path: 'titles/:titleId/:titleName',
                component: TitlePageContainerComponent,
                resolve: {api: TitleResolverService},
                data: {
                    permissions: ['titles.view'],
                    name: MEDIA_TYPE.MOVIE,
                    animationState: 'One',
                },
            },
            {
                path: 'titles/:titleId/:titleName/edit',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/titles/crupdate-title/crupdate-title.module'
                    ).then(m => m.CrupdateTitleModule),
            },
            {
                path: 'titles/:titleId/:titleName/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {
                    permissions: ['titles.view'],
                    name: MEDIA_TYPE.MOVIE,
                    fullCredits: true,
                },
            },

            // SEASONS
            {
                path: 'series/:titleId/seasons/:seasonNumber',
                redirectTo: 'titles/:titleId/season/:seasonNumber',
            },
            {
                path: 'titles/:titleId/:titleName/season/:seasonNumber',
                component: SeasonPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.SEASON},
            },
            {
                path: 'titles/:titleId/:titleName/season/:seasonNumber/edit',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/titles/crupdate-title/crupdate-title.module'
                    ).then(m => m.CrupdateTitleModule),
            },

            // EPISODES
            {
                path: 'series/:titleId/seasons/:seasonNumber/episodes/:episodeNumber',
                redirectTo:
                    'titles/:titleId/season/:seasonNumber/episode/:episodeNumber',
            },
            {
                path: 'titles/:titleId/:titleName/season/:seasonNumber/episode/:episodeNumber',
                component: TitlePageContainerComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.EPISODE},
            },
            {
                path: 'titles/:titleId/:titleName/season/:seasonNumber/episode/:episodeNumber/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE},
            },
            {
                path: 'titles/:titleId/:titleName/season/:seasonNumber/episode/:episodeNumber/edit',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/titles/crupdate-title/crupdate-title.module'
                    ).then(m => m.CrupdateTitleModule),
            },

            // people
            {
                path: 'people',
                component: PeopleIndexComponent,
                data: {
                    permissions: ['people.view'],
                    name: 'people',
                    willSetSeo: true,
                },
            },
            {
                path: 'people/create',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/people/crupdate-person/crupdate-person.module'
                    ).then(m => m.CrupdatePersonModule),
            },
            {
                path: 'people/:id/:name',
                component: PersonPageComponent,
                resolve: {api: PersonResolverService},
                data: {
                    permissions: ['people.view'],
                    name: MEDIA_TYPE.PERSON,
                    willSetSeo: true,
                },
            },
            {
                path: 'people/:id/:name/edit',
                component: DefaultPageWrapperComponent,
                loadChildren: () =>
                    import(
                        'src/app/site/people/crupdate-person/crupdate-person.module'
                    ).then(m => m.CrupdatePersonModule),
            },

            // lists
            {
                path: 'lists/new',
                pathMatch: 'full',
                component: CrupdateListComponent,
                data: {permissions: ['lists.create']},
            },
            {
                path: 'lists/:id',
                component: ListPageComponent,
                data: {name: 'list', willSetSeo: true},
            },
            {
                path: 'lists/:id/edit',
                component: CrupdateListComponent,
            },

            // search
            {
                path: 'search',
                component: SearchPageComponent,
                resolve: {api: SearchResultsResolverService},
                data: {name: 'search', willSetSeo: true},
            },

            // user
            {
                path: 'watchlist',
                component: ListPageComponent,
                canActivate: [AuthGuard],
                data: {watchlist: true, name: 'watchlist', willSetSeo: true},
            },
            {
                path: 'lists',
                component: UserListsComponent,
                canActivate: [AuthGuard],
                data: {name: 'Your Lists'},
            },

            // news
            {
                path: 'news',
                component: NewsIndexComponent,
                data: {
                    permissions: ['news.view'],
                    name: 'news',
                    willSetSeo: true,
                },
            },
            {
                path: 'news/:id',
                component: NewsArticleComponent,
                data: {permissions: ['news.view'], willSetSeo: true},
            },

            // LEGACY (Without name/title in url)
            {
                path: 'titles/:titleId',
                component: TitlePageContainerComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE},
            },
            {
                path: 'titles/:titleId/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {
                    permissions: ['titles.view'],
                    name: MEDIA_TYPE.MOVIE,
                    fullCredits: true,
                },
            },
            {
                path: 'titles/:titleId/season/:seasonNumber',
                component: SeasonPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.SEASON},
            },
            {
                path: 'titles/:titleId/season/:seasonNumber/episode/:episodeNumber',
                component: TitlePageContainerComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.EPISODE},
            },
            {
                path: 'titles/:titleId/season/:seasonNumber/episode/:episodeNumber/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE},
            },
            {
                path: 'people/:id',
                component: PersonPageComponent,
                resolve: {api: PersonResolverService},
                data: {
                    permissions: ['people.view'],
                    name: MEDIA_TYPE.PERSON,
                    willSetSeo: true,
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SiteRoutingModule {}
