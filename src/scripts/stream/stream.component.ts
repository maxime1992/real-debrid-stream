import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {StreamService} from './stream.service';

@Component({
	selector: 'stream',
	providers: [StreamService]
})
@View({
	directives: [FORM_DIRECTIVES],
	template: `
		<form
			class="stream-item"
			(ngSubmit)="stream(urlToStream)">
			<input
				type="text"
				class="form-control form-control-lg"
				placeholder="Url to stream"
				[(ngModel)]="urlToStream" />

			<input
				class="btn btn-default btn-block"
				type="button"
				value="Stream"
				(click)="stream(urlToStream)">
		</form>
	`
})
export class StreamComponent {
	constructor(private streamService: StreamService) {}

	stream(urlToStream: string): void {
		if (!urlToStream) {
			return;
		}

		this.streamService.realDebridUnrestrictLink('https://1fichier.com/?ncmo9iqy1r');
	}
}
