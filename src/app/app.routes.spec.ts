import { TestBed } from '@angular/core/testing';
import { Title as DocumentTitle } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CsPage } from '@app/pages/cs/cs.page';
import { HomePage } from '@app/pages/home/home.page';
import { routes } from './app.routes';

describe('app routes', () => {
	let harness: RouterTestingHarness;

	beforeEach(async () => {
		TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
		harness = await RouterTestingHarness.create();
	});

	/** The site name, and the path the page puts after it */
	function title(): [string | undefined, string | undefined] {
		const link = harness.routeNativeElement?.querySelector('a[href="/"]');
		return [
			link?.querySelector('h1')?.textContent?.trim(),
			link?.querySelector('p')?.textContent?.trim(),
		];
	}

	it('shows just the site name on the home page', async () => {
		await harness.navigateByUrl('/', HomePage);

		expect(title()).toEqual(['lavask.in', undefined]);
		expect(TestBed.inject(DocumentTitle).getTitle()).toBe('lavask.in');
	});

	it('puts the path after the site name on the cs page', async () => {
		await harness.navigateByUrl('/cs', CsPage);

		expect(title()).toEqual(['lavask.in', '/cs']);
		expect(TestBed.inject(DocumentTitle).getTitle()).toBe('lavask.in/cs');
	});

	it('sends unknown pages home, including the old 449 page', async () => {
		for (const url of ['/nowhere', '/cs/449']) {
			await harness.navigateByUrl(url, HomePage);

			expect(TestBed.inject(Router).url).toBe('/');
		}
	});
});
