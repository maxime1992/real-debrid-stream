import {Injectable} from 'angular2/core';

@Injectable()
export class StorageService {
	public get(key: string): Promise<string> {
		return new Promise<string>((resolve: any, reject: any) => {
			chrome.storage.sync.get(key, (items: {[key: string]: any}) => {
				resolve(items[key]);
			});
		});
	}

	public set(key: string, value: string): void {
		let keyValue = {};
		keyValue[key] = value;

		chrome.storage.sync.set(keyValue);
	}

	public remove(key: string): void {
		chrome.storage.sync.remove(key);
	}
}
