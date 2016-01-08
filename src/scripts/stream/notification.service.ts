import {Injectable} from 'angular2/core';
declare var Notification: any;

@Injectable()
export class NotificationService {
	constructor() {
		Notification.requestPermission();
	}

	create(text: string): void {
		if (Notification.permission === 'granted') {
			/* tslint:disable */
			new Notification('Real-debrid stream', {body: text,	icon: './icon.png'});
			/* tslint:enable */
		}
	}
}
