import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { CsComponent } from './pages/cs/cs.component';
import { Four49Component } from './pages/cs/449/449.component';

// Components
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CsComponent,
    Four49Component,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
