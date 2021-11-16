import {animate, style, transition, trigger} from '@angular/animations';

export const PROFILE_TAB_ANIMATION = [
    trigger('fadeIn', [
        transition(':enter', [
            style({opacity: 0}),
            animate(
                '325ms ease-in',
                style({
                    opacity: 1,
                })
            ),
        ]),
    ]),
    trigger('fadeOut', [
        transition(':leave', [
            animate(
                '325ms ease-out',
                style({
                    opacity: 0,
                })
            ),
        ]),
    ]),
];
