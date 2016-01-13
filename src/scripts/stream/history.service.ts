import {Injectable, EventEmitter} from 'angular2/core';
import {IdService} from '../shared/services/id.service';
import {StorageService} from '../shared/services/storage.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class HistoryService {
	public static HISTORY_LENGTH: number = 5;
	public static urlToStreamEventEmiter: EventEmitter<any> = new EventEmitter();

	private _historyObserver: any;
	private _history: Array<Object> = new Array<Object>();
	public history$: Observable<Array<Object>>;

	constructor(
		private idService: IdService,
		private storageService: StorageService
	) {
		this.history$ = new Observable((observer: any) => {
			console.log('create observer');
			this._historyObserver = observer;
		}).share();
	}

	public create(link: string, status: string) {
		let id = this.idService.getId();

		let date = (new Date()).toString().match(/(.*) [0-9]{4} ([0-9]{1,2}:[0-9]{1,2}).*/);

		let lineHistory = {id, date: `${date[1]} - ${date[2]}`, link, status};

		this._history.unshift(lineHistory);

		this.storageService.set('history', JSON.stringify(this._history));

		this._history = this._history.slice(0, HistoryService.HISTORY_LENGTH);

		this._historyObserver.next(this._history);
	}

	public read() {
		this.storageService.get('history').then((history: string) => {
			if (!history) {
				this._history = new Array<Object>();
				this._historyObserver.next(null);
				return;
			}

			this._history = JSON.parse(history).slice(0, HistoryService.HISTORY_LENGTH);
			this._historyObserver.next(this._history);
		});
	}
}
