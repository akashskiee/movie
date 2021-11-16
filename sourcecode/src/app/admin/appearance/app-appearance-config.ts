import {HomepageAppearancePanelComponent} from './homepage-appearance-panel/homepage-appearance-panel.component';
import {LandingAppearancePanelComponent} from './landing-appearance-panel/landing-appearance-panel.component';
import {AppearanceEditorConfig} from '../../../common/admin/appearance/appearance-editor-config.token';

export const APP_APPEARANCE_CONFIG: AppearanceEditorConfig = {
    defaultRoute: '/',
    navigationRoutes: [
        '/',
        'movies',
        'series',
        'account/settings',
        'admin',
    ],
    menus: {
        availableRoutes: [
            'movies',
            'series',
            'news',
            'people',
        ],
        positions: [
            'primary',
            'admin-navbar',
            'custom-page-navbar',
            'landing',
            'footer-1',
            'footer-2',
            'footer-3',
        ]
    },
    sections: [
        {
            name: 'Homepage',
            position: 1,
            route: '/',
            component: HomepageAppearancePanelComponent,
        },
        {
            name: 'Landing',
            position: 1,
            route: '/',
            queryParams: {landing: true},
            component: LandingAppearancePanelComponent,
        }
    ]
};
