import {environment} from '../environments/environment';
import {AppConfig} from '@common/core/config/app-config';

export const MTDB_CONFIG: AppConfig = {
    assetsPrefix: 'client',
    translations: {
        public_disk_driver_description: 'Where site uploads (video, subtitles, avatars etc.) should be stored.',
    },
    environment: environment.production ? 'production' : 'dev',
    navbar: {
        defaultColor: 'primary',
        defaultPosition: 'primary',
        dropdownItems: [
            {route: '/watchlist', name: 'Watchlist', icon: 'playlist-add-check'},
            {route: '/lists', name: 'Your Lists', icon: 'list'},
        ]
    },
    auth: {
        color: 'accent',
        redirectUri: '/',
        adminRedirectUri: '/admin',
    },
    accountSettings: {
        hideNavbar: false,
    },
    customPages: {
        hideNavbar: false,
    },
    admin: {
        tagTypes: [{name: 'keyword'}, {name: 'genre'}, {name: 'production_country'}],
        pages: [
            {name: 'titles', icon: 'movie', route: 'titles', permission: 'titles.view'},
            {name: 'people', icon: 'recent-actors', route: 'people', permission: 'people.view'},
            {name: 'news', icon: 'description', route: 'news', permission: 'news.view'},
            {name: 'videos', icon: 'slow-motion-video', route: 'videos', permission: 'videos.view'},
            {name: 'lists', icon: 'format-list-numbered', route: 'lists', permission: 'lists.view'},
            {name: 'reviews', icon: 'rate-review', route: 'reviews', permission: 'reviews.view'},
            {name: 'comments', icon: 'rate-review', route: 'comments', permission: 'comments.view'},
        ],
        settingsPages: [
            {name: 'content', route: 'content'},
        ],
        ads: [
            {slot: 'ads.shared', description: 'This ad will appear near the top on most pages.'},
            {slot: 'ads.homepage', description: 'This ad will appear between lists on the homepage.'},
            {slot: 'ads.title', description: 'This ad will appear after cast list on movie and tv series pages.'},
            {slot: 'ads.person', description: 'This ad will appear after credits list person page.'},
        ],
    },
};
