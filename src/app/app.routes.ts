import { Routes } from '@angular/router';
import { HomePage } from '@app/pages/home/home.page';

export const routes: Routes = [
	{ path: '', component: HomePage },
	{ path: 'cs', loadComponent: () => import('@app/pages/cs/cs.page').then((m) => m.CsPage) },
	{
		path: 'cs/449',
		loadComponent: () => import('@app/pages/cs/449/cs-449.page').then((m) => m.Cs449Page),
	},
	{ path: '**', redirectTo: '' },
];
