import {Component} from '@angular/core';
import {SettingsPanelComponent} from '@common/admin/settings/settings-panel.component';

@Component({
  selector: 'streaming-settings',
  templateUrl: './streaming-settings.component.html',
  styleUrls: ['./streaming-settings.component.scss'],
  host: {'class': 'settings-panel'},
})
export class StreamingSettingsComponent extends SettingsPanelComponent {

}
