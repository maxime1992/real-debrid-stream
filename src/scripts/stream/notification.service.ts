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
			let notif = new Notification('Real-debrid stream', {body: text,	icon: './icon.png'});

			// on click, close the notification
			notif.onclick = (() => {
				notif.close();
			});
			/* tslint:enable */
		}
	}
}
