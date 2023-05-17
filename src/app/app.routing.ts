import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CsComponent } from './pages/cs/cs.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'cs', component: CsComponent },
	{ path: '**', redirectTo: '/home' },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }