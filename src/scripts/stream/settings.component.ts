import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {SettingsService} from './settings.service';

@Component({
	selector: 'settings',
	providers: [SettingsService]
})
@View({
	directives: [FORM_DIRECTIVES],
	template: `
		<form class="settings-item">
			<div class="real-debrid">
				<h1>Real-debrid</h1>

				<input
					type="text"
					class="form-control real-debrid-email"
					placeholder="Real-debrid email"
					[(ngModel)]="realDebridEmail"
					(keyup)="saveSettings()" />

				<input
					type="password"
					class="form-control real-debrid-password"
					placeholder="Real-debrid password"
					[(ngModel)]="realDebridPassword"
					(keyup)="saveSettings()" />
			</div>

			<div class="kodi">
				<h1>Kodi</h1>

				<input
					type="text"
					class="form-control kodi-ip"
					placeholder="Kodi IP"
					[(ngModel)]="kodiIp"
					(keyup)="saveSettings()" />
			</div>
		</form>
	`
})
export class SettingsComponent {
	private realDebridEmail: string;
	private realDebridPassword: string;
	private kodiIp: string;

	constructor(private settingsService: SettingsService) {
		// at the beginning, restore settings
		this.getSettings();
	}

	public saveSettings() {
		this.settingsService.setSetting('realDebridEmail', this.realDebridEmail);
		this.settingsService.setSetting('realDebridPassword', this.realDebridPassword);
		this.settingsService.setSetting('kodiIp', this.kodiIp);
	}

	public getSettings() {
		this.settingsService.getSetting('realDebridEmail').then((value: string) => this.realDebridEmail = value);
		this.settingsService.getSetting('realDebridPassword').then((value: string) => this.realDebridPassword = value);
		this.settingsService.getSetting('kodiIp').then((value: string) => this.kodiIp = value);
	}
}
