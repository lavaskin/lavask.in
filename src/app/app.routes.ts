import { Routes } from '@angular/router';
import { HomePage } from '@app/pages/home/home.page';

export const routes: Routes = [
	{ path: '', component: HomePage, title: 'lavask.in' },
	{
		path: 'cs',
		loadComponent: () => import('@app/pages/cs/cs.page').then((m) => m.CsPage),
		title: 'lavask.in/cs',
	},
	{ path: '**', redirectTo: '' },
];
