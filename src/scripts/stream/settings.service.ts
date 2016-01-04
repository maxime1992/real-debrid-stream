import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService {
	public getSetting(key: string) {
		if (sessionStorage.getItem(key) != null) {
			return sessionStorage.getItem(key);
		}

		return '';
	}

	public setSetting(key: string, value: string) {
		sessionStorage.setItem(key, value);
	}
}
