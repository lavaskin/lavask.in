import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	private routeWatcher: any;

	constructor (private router: Router) { }
	
	ngOnInit(): void {
		// Setup watcher for route changes to scroll to the top of the page
		this.routeWatcher = this.router.events.subscribe(evt => {
			if (!(evt instanceof NavigationEnd)) return;
			
			window.scrollTo(0, 0);
		});
	}

	ngOnDestroy(): void {
		// Remove route watcher
		this.routeWatcher.unsubscribe();
	}
}