import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SettingsState} from '../../settings-state.service';
import {SocialAuthService} from '../../../../auth/social-auth.service';
import {Toast} from '../../../../core/ui/toast.service';

@Component({
    selector: 'incoming-mail-settings',
    templateUrl: './incoming-mail-settings.component.html',
    styleUrls: ['./incoming-mail-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomingMailSettingsComponent {
    constructor(
        public state: SettingsState,
        private social: SocialAuthService,
        private toast: Toast
    ) {}

    connectGmailAccount() {
        const url = `secure/settings/mail/gmail/connect`;
        this.social.openNewSocialAuthWindow(url).then(user => {
            this.state.server['connectedGmailAccount'] = user.email;
            this.state.errors$.next({});
            this.toast.open(`Connected gmail account: ${user.email}`);
        });
    }
}
