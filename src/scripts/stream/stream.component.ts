import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {StreamService} from './stream.service';
import {NotificationService} from './notification.service';

@Component({
	selector: 'stream',
	providers: [StreamService, NotificationService]
})
@View({
	directives: [FORM_DIRECTIVES],
	template: `
		<form
			class="stream-item"
			(ngSubmit)="stream(urlToStream)">
			<input
				type="text"
				class="form-control"
				placeholder="Url to stream"
				[(ngModel)]="urlToStream" />

			<input
				class="btn btn-primary btn-block"
				type="button"
				value="Stream"
				(click)="stream(urlToStream)">
		</form>
	`
})
export class StreamComponent {
	constructor(
		private streamService: StreamService,
		public notificationService: NotificationService
	) {}

	stream(urlToStream: string): void {
		if (!urlToStream) {
			return;
		}

		// get unrestricted link from real debrid
		this.streamService.realDebridUnrestrictLink(urlToStream).then(
			(unrestrictedLink: string) =>  {
				// send the link of the file to kodi
				this.streamService.streamOnKodi(unrestrictedLink).then(
					(kodiSuccess: any) => {
						this.notificationService.create(kodiSuccess);
					},
					(kodiError: any) => {
						this.notificationService.create(`Error from Kodi : "${kodiError}"`);
					}
				);
			},
			(realDebridError: string) => {
				this.notificationService.create(`Error from RD : "${realDebridError}"`);
			}
		);
	}
}
