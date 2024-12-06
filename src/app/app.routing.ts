import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CsComponent } from './pages/cs/cs.component';
import { Four49Component } from './pages/cs/449/449.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'cs', component: CsComponent },
	{ path: 'cs/449', component: Four49Component },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }