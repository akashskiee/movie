import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    constructor(public settings: Settings) {}

    public siteName(): string {
        return this.settings.get('branding.site_name');
    }

    public siteDescription(): string {
        return this.settings.get('branding.site_description');
    }

    public year(): number {
        return (new Date()).getFullYear();
    }
}
