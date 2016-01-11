import {Injectable, EventEmitter} from 'angular2/core';
import {IdService} from '../shared/services/id.service';
import {StorageService} from '../shared/services/storage.service';

@Injectable()
export class HistoryService {
	public static HISTORY_LENGTH: number = 5;
	private history: Array<Object>;
	public static urlToStreamEventEmiter: EventEmitter<any> = new EventEmitter();

	constructor(
		private idService: IdService,
		private storageService: StorageService
	) {
		// restore the history
		this.read();
	}

	public create(link: string, status: string) {
		let id = this.idService.getId();

		let date = (new Date()).toString().match(/(.*) [0-9]{4} ([0-9]{1,2}:[0-9]{1,2}).*/);

		let lineHistory = {id, date, link, status};

		this.history.unshift(lineHistory);

		this.storageService.set('history', JSON.stringify(this.history));
	}

	public read(id?: string) {
		return new Promise<Array<Object>>((resolve: any, reject: any) => {
			// if id, get only one
			if (id) {
				this.storageService.get('history').then((history: string) => {
					if (!history) {
						resolve(null);
						return;
					}

					resolve(JSON.parse(history)[id]);
				});
			}

			// otherwise return the whole history
			else {
				this.storageService.get('history').then((history: string) => {
					if (!history) {
						this.history = new Array<Object>();
						resolve(null);
						return;
					}

					this.history = JSON.parse(history).slice(0, HistoryService.HISTORY_LENGTH);
					resolve(this.history);
				});
			}
		});
	}
}
