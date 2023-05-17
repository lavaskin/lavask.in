import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { CsComponent } from './pages/cs/cs.component';

// Components
// ...

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
