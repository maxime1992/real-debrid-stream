import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, NgIf} from 'angular2/common';
import {StreamService} from './stream.service';
import {NotificationService} from './notification.service';
import {HistoryComponent} from './history.component';
import {HistoryService} from './history.service';

@Component({
	selector: 'stream',
	providers: [StreamService, NotificationService, HistoryService]
})
@View({
	directives: [FORM_DIRECTIVES, NgIf, HistoryComponent],
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
				*ngIf="!isDebridingAndStreaming"
				type="button"
				value="Stream"
				(click)="stream(urlToStream)">

			<div
				class="sk-double-bounce"
				*ngIf="isDebridingAndStreaming">
				<div class="sk-child sk-double-bounce1"></div>
				<div class="sk-child sk-double-bounce2"></div>
			</div>
		</form>

		<hr *ngIf="history">

		<history *ngIf="history"></history>
	`
})
export class StreamComponent {
	public urlToStream: string;
	public isDebridingAndStreaming: boolean = false;
	public history: Array<string>;

	constructor(
		private streamService: StreamService,
		private notificationService: NotificationService,
		private historyService: HistoryService
	) {
		// if the user wants to restore a link to stream it again
		// listen for urlToStream event
		HistoryService.urlToStreamEventEmiter.subscribe((urlToStream: any) => {
			this.urlToStream = urlToStream;
		});

		this.historyService.read().then((history: Array<string>) => {
			this.history = history;
		});
	}

	stream(urlToStream: string): void {
		if (!urlToStream) {
			return;
		}

		// change the state of the button
		this.isDebridingAndStreaming = true;

		// get unrestricted link from real debrid
		this.streamService.realDebridUnrestrictLink(urlToStream).then(
			(unrestrictedLink: string) =>  {
				// send the link of the file to kodi
				this.streamService.streamOnKodi(unrestrictedLink).then(
					(kodiSuccess: any) => {
						this.isDebridingAndStreaming = false;

						this.notificationService.create(kodiSuccess);

						this.historyService.create(urlToStream, 'streamed');
					},
					(kodiError: any) => {
						this.isDebridingAndStreaming = false;

						this.notificationService.create(`Error from Kodi : "${kodiError}"`);

						this.historyService.create(urlToStream, 'streamFail');
					}
				);
			},
			(realDebridError: string) => {
				this.isDebridingAndStreaming = false;

				this.notificationService.create(`Error from RD : "${realDebridError}"`);

				this.historyService.create(urlToStream, 'debridFail');
			}
		);
	}
}
