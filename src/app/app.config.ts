import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		// Every navigation starts at the top, rather than keeping the scroll position of the last page
		provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
	],
};
