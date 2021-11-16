import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {
    ShareableNetworks,
    shareLinkSocially,
} from '@common/core/utils/share-link-socially';
import {shareViaEmail} from '@common/core/utils/share-via-email';
import {copyToClipboard} from '@common/core/utils/copy-link-to-clipboard';
import {MESSAGES} from '../../../../toast-messages';
import {Title} from '../../../../models/title';
import {Episode} from '../../../../models/episode';
import {Settings} from '@common/core/config/settings.service';
import {Translations} from '@common/core/translations/translations.service';
import {Toast} from '@common/core/ui/toast.service';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Component({
    selector: 'share-buttons',
    templateUrl: './share-buttons.component.html',
    styleUrls: ['./share-buttons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {class: 'social-icons'},
})
export class ShareButtonsComponent {
    @Input() mediaItem: Title | Episode;

    constructor(
        private url: UrlGeneratorService,
        private settings: Settings,
        private i18n: Translations,
        private toast: Toast
    ) {}

    public shareUsing(type: ShareableNetworks | 'mail' | 'copy') {
        const link =
            this.settings.getBaseUrl() +
            this.url.generate(this.mediaItem).replace(/^\//, '');
        if (type === 'mail') {
            const siteName = this.settings.get('branding.site_name');
            const subject = this.i18n.t('Check out this link on ') + siteName;
            const body = `${this.mediaItem.name} - ${siteName} - ${link}`;
            shareViaEmail(subject, body);
        } else if (type === 'copy') {
            if (copyToClipboard(link)) {
                this.toast.open(MESSAGES.COPY_TO_CLIPBOARD_SUCCESS);
            }
        } else {
            shareLinkSocially(type, link, this.mediaItem.name);
        }
    }
}
