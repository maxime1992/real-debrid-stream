import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {StorageService} from '../shared/services/storage.service';

@Component({
	selector: 'settings',
	providers: [StorageService]
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

	constructor(private storageService: StorageService) {
		// at the beginning, restore settings
		this.getSettings();
	}

	public saveSettings() {
		this.storageService.set('realDebridEmail', this.realDebridEmail);
		this.storageService.set('realDebridPassword', this.realDebridPassword);
		this.storageService.set('kodiIp', this.kodiIp);
	}

	public getSettings() {
		this.storageService.get('realDebridEmail').then((value: string) => this.realDebridEmail = value);
		this.storageService.get('realDebridPassword').then((value: string) => this.realDebridPassword = value);
		this.storageService.get('kodiIp').then((value: string) => this.kodiIp = value);
	}
}
