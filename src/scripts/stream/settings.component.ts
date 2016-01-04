import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
	selector: 'settings'
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

	public saveSettings() {
		console.log('RD mail ' + this.realDebridEmail);
		console.log('RD pwd ' + this.realDebridPassword);
		console.log('KD mail ' + this.kodiIp);
	}
}
