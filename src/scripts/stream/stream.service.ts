import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http, Jsonp} from 'angular2/http';
import {SettingsService} from './settings.service';
import {NotificationService} from './notification.service';

@Injectable()
export class StreamService {
	private realDebridToken: string;

	constructor(
		private http: Http,
		private jsonp: Jsonp,
		public settingsService: SettingsService,
		public notificationService: NotificationService
	) {}

	private realDebridConnect(): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			this.settingsService.getSetting('realDebridToken').then((realDebridToken: string) => {
				this.realDebridToken = realDebridToken;

				// if a token is already set
				if (this.realDebridToken) {
					// just return the token
					resolve();
					return;
				}

				// otherwise try to connect to get a token
				this.settingsService.getSetting('realDebridEmail').then((realDebridEmail: string) => {
					this.settingsService.getSetting('realDebridPassword').then((realDebridPassword: string) => {
						// otherwise reach real-debrid API to get one
						return this.http.get(`https://real-debrid.com/ajax/login.php?user=${encodeURIComponent(realDebridEmail)}&pass=${encodeURIComponent(realDebridPassword)}`)
							.map((res: any) => res.json())
							.subscribe((data: any) => {
								// if a problem happened (wrong password, captacha|pin required, etc)
								if (data.error !== 0 || data.captcha !== 0 || data.pin !== 0) {
									// remove the old token as it's no longer valid
									delete this.realDebridToken;
									this.settingsService.removeSetting('realDebridToken');

									// send the error message
									reject(data.message);
									return;
								}

								// if everything is good, save the token
								this.realDebridToken = data.cookie.match(/auth=(.*);/)[1];
								this.settingsService.setSetting('realDebridToken', this.realDebridToken);
								resolve();
							});
					});
				});
			});
		});
	}

	public realDebridUnrestrictLink(link: string): Promise<string> {
		let self = this;

		return new Promise<string>((resolve: any, reject: any) => {
			this.realDebridConnect().then(
				() => {
					self.http.get(`https://real-debrid.com/api/unrestrict.php?auth=${encodeURIComponent(this.realDebridToken)}&link=${encodeURIComponent(link)}`)
						.map((res: any) => res.json())
						.subscribe((data: any) => {
							// return the unrestricted link
							resolve(data.main_link);
						});
				},
				(realDebridError: string) => {
					reject(realDebridError);
				}
			);
		});
	}

	public streamOnKodi(link: string): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			this.settingsService.getSetting('kodiIp').then((kodiIp: string) => {
				this.http.get(`http://${kodiIp}/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "file": "${encodeURIComponent(link)}" }}, "id": 1 }`)
					.map((res: any) => res.json())
					.subscribe((data: any) => {
						if (data.result === 'ok') {
							resolve('Link has been streaming to Kodi');
						}

						else {
							reject('A problem came up while trying to stream to Kodi');
						}
					});
			});
		});
	}
}
