import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';
import {ReplaySubject} from 'rxjs';
import {LandingContent} from './landing-content';

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
    public content$ = new ReplaySubject<LandingContent>(1);

    constructor(
        public settings: Settings,
    ) {}

    ngOnInit() {
        this.settings.all$().subscribe(() => {
            this.content$.next(this.settings.getJson('landing.appearance'));
        });
    }

    public isInlineIcon(url: string): boolean {
        return !url.includes('.') && !url.includes('/');
    }
}
