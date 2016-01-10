import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor, NgIf} from 'angular2/common';
import {HistoryService} from './history.service';

@Component({
	selector: 'history'
})
@View({
	directives: [FORM_DIRECTIVES, NgFor, NgIf],
	template: `
		<div class="history-item">
			<h2 class="title">History</h2> ({{ historyLength }} item{{ historyLength<=1 ? '' : 's' }} max)

			<div *ngFor="#line of history" class="line">
				<div class="row">
					<div class="col-xs-10">{{ line.link }}</div>
					<div class="col-xs-2">
						<i *ngIf="line.status === 'streamed'" class="fa fa-check success"></i>
						<i *ngIf="line.status === 'streamFail'" class="fa fa-exclamation error"></i>
						<i *ngIf="line.status === 'debridFail'" class="fa fa-exclamation-circle error"></i>
					</div>
				</div>
			</div>
		</div>
	`
})
export class HistoryComponent {
	public history: Array<Object>;
	public historyLength: number;

	constructor(
		private historyService: HistoryService
	) {
		historyService.read().then((history: Array<Object>) => {
			this.history = history;
		});

		this.historyLength = HistoryService.HISTORY_LENGTH;
	}
}
