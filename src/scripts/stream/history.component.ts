import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor, NgIf} from 'angular2/common';
import {HistoryService} from './history.service';
import {StreamService} from './stream.service';

@Component({
	selector: 'history',
	providers: [HistoryService]
})
@View({
	directives: [FORM_DIRECTIVES, NgFor, NgIf],
	template: `
		<div class="history-item">
			<h2 class="title">History</h2> ({{ historyLength }} item{{ historyLength<=1 ? '' : 's' }} max)

			<div *ngFor="#line of history" class="line">
				<div class="row" (click)="selectLine(line)">
					<div class="col-xs-1 host"><img *ngIf="getImage(line.link)" [src]="getImage(line.link)" /></div>
					<div class="col-xs-8 date">{{ line.date }}</div>
					<div class="col-xs-2 status">
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

	// when line is clicked, broadcast the link (to stream.component)
	public selectLine(line: string): void {
		HistoryService.urlToStreamEventEmiter.next(line.link);
	}

	public getImage(url: string): string {
		for (let i=0; i < StreamService.realDebridHosts.length; i++) {
			if (url.indexOf(StreamService.realDebridHosts[i]) > 0) {
				return `images/real-debrid-hosts/${StreamService.realDebridHosts[i]}.png`;
			}
		}

		return null;
	}
}
