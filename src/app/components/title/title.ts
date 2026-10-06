import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** The animated site name, which always links home. Pages put their own path after it. */
@Component({
	selector: 'app-title',
	imports: [RouterLink],
	templateUrl: './title.html',
	styleUrl: './title.css',
})
export class Title {
	public readonly title = input('lavask.in');
	public readonly addon = input('');
}
