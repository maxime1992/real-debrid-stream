import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http, Jsonp} from 'angular2/http';
import {SettingsService} from './settings.service';
import {NotificationService} from './notification.service';

@Injectable()
export class StreamService {
	private tokenRealDebrid: string;

	constructor(
		private http: Http,
		private jsonp: Jsonp,
		public settingsService: SettingsService,
		public notificationService: NotificationService
	) {}

	private realDebridConnect(): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			if (this.tokenRealDebrid) {
				// if a token is already set, just return the token
				resolve(this.tokenRealDebrid);
				return;
			}

			// otherwise reach real-debrid API to get one
			return this.http.get(`https://real-debrid.com/ajax/login.php?user=${encodeURIComponent(this.settingsService.getSetting('realDebridEmail'))}&pass=${encodeURIComponent(this.settingsService.getSetting('realDebridPassword'))}`)
				.map((res: any) => res.json())
				.subscribe((data: any) => {
					// save the token
					this.tokenRealDebrid = data.cookie.match(/auth=(.*);/)[1];
					resolve(this.tokenRealDebrid);
				});
		});
	}

	public realDebridUnrestrictLink(link: string) {
		let self = this;

		return new Promise<string>((resolve: any, reject: any) => {
			this.realDebridConnect().then(
				() => {
					self.http.get(`https://real-debrid.com/api/unrestrict.php?auth=${encodeURIComponent(this.tokenRealDebrid)}&link=${encodeURIComponent(link)}`)
						.map((res: any) => res.json())
						.subscribe((data: any) => {
							// return the unrestricted link
							resolve('data.main_link');
						});
				},
				(reject: any) => {
					this.notificationService.notify('A problem happened while reaching real-debrid API');
				}
			);
		});
	}

	public streamOnKodi(link: string) {
		this.jsonp.request(`http://${encodeURIComponent(this.settingsService.getSetting('kodiIp'))}/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "file": "${encodeURIComponent(link)}" }}, "id": 1 }`)
			.map((res: any) => res.json())
			.subscribe((data: any) => {
				this.notificationService.notify('The link has been streamed on Kodi');
			});
	}
}
