import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import {Injectable} from 'angular2/core';
import {Http, Jsonp} from 'angular2/http';
import {StorageService} from '../shared/services/storage.service';
import {NotificationService} from './notification.service';

@Injectable()
export class StreamService {
	private realDebridToken: string;

	public static realDebridHosts: Array<string> = [
		'1fichier', '24uploading', '2shared', '4shared', 'allmyvideos',
		'anafile', 'canalplus', 'cbs', 'clicknupload', 'divxstage',
		'dailymotion', 'datafilehost', 'dateito', 'depfile', 'free',
		'easybytez', 'exashare', 'extmatrix', 'faststore', 'filef',
		'fileflyer', 'filerio', 'filesflash', 'gigapeta', 'hugefiles',
		'hulkshare', 'kingfiles', 'letitbit', 'loadto', 'mediafire',
		'mega', 'megashares', 'movshare', 'novamov', 'nowdownload',
		'nowvideo',	'oboom', 'openload', 'ozofiles', 'purevid',
		'skyfm', 'rapidgator', 'rarefile', 'rutuberu', 'salefiles',
		'scribd', 'secureupload', 'sendspace', 'shareflare', 'soundcloud',
		'speedyshare', 'thevideo', 'turbobit', 'tusfiles', 'uloz',
		'unibytes', 'uplea', 'uploadaf', 'uploadable', 'uploadc',
		'ulto', 'uploadrocket', 'uploadx', 'uptobox', 'userscloud',
		'videoweed', 'vimeo', 'vipfile', 'wat', 'youtube',
		'youwatch',	'yunfile',	'zippyshare'
	];

	constructor(
		private http: Http,
		private jsonp: Jsonp,
		public storageService: StorageService,
		public notificationService: NotificationService
	) {}

	private realDebridConnect(): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			this.storageService.get('realDebridToken').then((realDebridToken: string) => {
				this.realDebridToken = realDebridToken;

				// if a token is already set
				if (this.realDebridToken) {
					// just return the token
					resolve();
					return;
				}

				// otherwise try to connect to get a token
				this.storageService.get('realDebridEmail').then((realDebridEmail: string) => {
					this.storageService.get('realDebridPassword').then((realDebridPassword: string) => {
						// otherwise reach real-debrid API to get one
						return this.http.get(`https://real-debrid.com/ajax/login.php?user=${encodeURIComponent(realDebridEmail)}&pass=${encodeURIComponent(realDebridPassword)}`)
							.timeout(2000)
							.map((res: any) => res.json())
							.subscribe((data: any) => {
								// if a problem happened (wrong password, captacha|pin required, etc)
								if (data.error !== 0 || data.captcha !== 0 || data.pin !== 0) {
									// remove the old token as it's no longer valid
									delete this.realDebridToken;
									this.storageService.remove('realDebridToken');

									// send the error message
									reject(data.message);
									return;
								}

								// if everything is good, save the token
								this.realDebridToken = data.cookie.match(/auth=(.*);/)[1];
								this.storageService.set('realDebridToken', this.realDebridToken);
								resolve();
							},
							(error: any) => {
								reject('Timeout : Real-debrid did not give any answer after 2s');
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
				(data: any) => {
					// if real-debrid could not unrestrict the link
					self.http.get(`https://real-debrid.com/api/unrestrict.php?auth=${encodeURIComponent(this.realDebridToken)}&link=${encodeURIComponent(link)}`)
						.map((res: any) => res.json())
						.subscribe((data: any) => {
							if (data.message === 'Hébergeur non supporté ou format de lien non reconnu') {
								reject('Host is not supported by Real-debrid');
								return;
							}

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
			this.storageService.get('kodiIp').then((kodiIp: string) => {
				this.http.get(`http://${kodiIp}/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "file": "${encodeURIComponent(link)}" }}, "id": 1 }`)
					.timeout(2000)
					.map((res: any) => res.json())
					.subscribe((data: any) => {
						if (data.result && data.result.toLowerCase() === 'ok') {
							resolve('Link has been streamed on Kodi');
						}

						else {
							reject('A problem came up while trying to stream on Kodi');
						}
					},
					(error: any) => {
						reject('Kodi does not give any answer. Please check Kodi\'s IP. (Are you on the same network ?).');
					});
			});
		});
	}
}
