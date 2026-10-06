import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Cs449Page } from '@app/pages/cs/449/cs-449.page';
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
	});

	it('puts the path after the site name on the cs pages', async () => {
		await harness.navigateByUrl('/cs', CsPage);
		expect(title()).toEqual(['lavask.in', '/cs']);

		await harness.navigateByUrl('/cs/449', Cs449Page);
		expect(title()).toEqual(['lavask.in', '/cs/449']);
	});

	it('sends unknown pages home', async () => {
		await harness.navigateByUrl('/nowhere', HomePage);

		expect(TestBed.inject(Router).url).toBe('/');
	});
});
