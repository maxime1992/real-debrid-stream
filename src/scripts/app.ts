import {bootstrap} from 'angular2/platform/browser';
import {Component, View, enableProdMode} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';

import {StreamComponent} from './stream/stream.component';
import {SettingsComponent} from './stream/settings.component';
import {StorageService} from './shared/services/storage.service';

@Component({
	selector: 'app'
})
@View({
	directives: [ROUTER_DIRECTIVES],
	template: `
		<div>
			<ul class="nav nav-pills">
				<li class="nav-item"><a class="nav-link" [routerLink]="['Stream']">Stream</a></li>
				<li class="nav-item"><a class="nav-link" [routerLink]="['Settings']">Settings</a></li>
			</ul>
			<hr>
			<router-outlet></router-outlet>
		</div>
	`
})
@RouteConfig([
	{ path: '/stream', name: 'Stream', component: StreamComponent, useAsDefault: true },
	{ path: '/settings', name: 'Settings', component: SettingsComponent }
])
export class AppComponent {
	/**
	 * This is a doc comment for `title`.
	 * @example This is a caption.
	 * ```ts
	 * var world: String = 'world';
	 * var hello: String = 'Hello ' + world;
	 * console.log(hello);
	 * ```
	 * @deprecated This is an example of the `deprecated` annotation tag.
	 */
	public title = 'Angular 2 Seed';
}

// @if isProd
enableProdMode();
// @endif

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	JSONP_PROVIDERS,
	StorageService
]);
