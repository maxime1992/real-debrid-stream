import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class StreamService {
	private tokenRealDebrid: string;

	constructor(private http: Http) {}

	private realDebridConnect(): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			if (this.tokenRealDebrid) {
				// if a token is already set, just return the token
				resolve(this.tokenRealDebrid);
				return;
			}

			// otherwise reach real-debrid API to get one
			return this.http.get(`https://real-debrid.com/ajax/login.php?user=YourEmail&pass=YourPassword`)
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
				(resolve: any) => {
					console.log(`Connected, token : ` + resolve);
					console.log(`https://real-debrid.com/api/unrestrict.php?auth=${this.tokenRealDebrid}&link=${encodeURIComponent(link)}`);

					setTimeout(() => {
						self.http.get(`https://real-debrid.com/api/unrestrict.php?auth=${this.tokenRealDebrid}&link=${encodeURIComponent(link)}`)
							.map((res: any) => res.json())
							.subscribe((data: any) => {
								// return the unrestricted link
								resolve(data.main_link);
							});
					}, 100);
				},
				(reject: any) => {
					alert('A problem happened while reaching real-debrid API');
				}
			);
		});
	}
}
