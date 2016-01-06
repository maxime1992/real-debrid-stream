import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService {
	public getSetting(key: string) {
		return new Promise<string>((resolve: any, reject: any) => {
			chrome.storage.sync.get(key, (response: string) => {
				resolve(response[key]);
			});
		});
	}

	public setSetting(key: string, value: string) {
		let keyValue = {};
		keyValue[key] = value;

		chrome.storage.sync.set(keyValue);
	}
}
