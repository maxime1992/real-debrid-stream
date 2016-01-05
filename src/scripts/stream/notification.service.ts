import {Injectable} from 'angular2/core';
declare var Notification: any;

@Injectable()
export class NotificationService {
	constructor() {
		if(Notification.permission !== 'granted') {
			Notification.requestPermission();
		}
	}

	notify(text: string): void {
		if (!Notification) {
			alert('Desktop notifications not available in your browser. Try Chromium.');
		}

		else if (Notification.permission !== 'granted') {
			Notification.requestPermission();
		}

		else {
			/* tslint:disable:no-unused-expression */
			new Notification('Real-debrid stream', {
				icon: './icon.png',
				body: text
			});
			/* tslint:enable:no-unused-expression */
		}
	}
}
