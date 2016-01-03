import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
	selector: 'stream'
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

			<button
				class="btn btn-default btn-block"
				(click)="stream(urlToStream)">Stream</button>
		</form>
	`
})
export class StreamComponent {
	stream(urlToStream: string): void {
		if (!urlToStream) {
			return;
		}

		alert(urlToStream);
	}
}
