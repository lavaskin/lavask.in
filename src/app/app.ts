import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlusGrid } from '@app/components/plus-grid/plus-grid';

@Component({
	selector: 'app-root',
	imports: [PlusGrid, RouterOutlet],
	// The grid lives here, outside the pages, so navigating doesn't restart it
	template: '<app-plus-grid /><router-outlet />',
})
export class App {}
