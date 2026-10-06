import { Component } from '@angular/core';
import { Title } from '@app/components/title/title';

@Component({
	selector: 'app-page-home',
	imports: [Title],
	templateUrl: './home.page.html',
	styleUrl: './home.page.css',
})
export class HomePage {}
