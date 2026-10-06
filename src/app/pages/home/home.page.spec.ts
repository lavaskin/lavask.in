import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '@app/app.routes';
import { HomePage } from './home.page';

describe('HomePage', () => {
	let page: HTMLElement;

	beforeEach(async () => {
		TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
		const harness = await RouterTestingHarness.create();
		await harness.navigateByUrl('/', HomePage);
		page = harness.routeNativeElement!;
	});

	function cards(): HTMLAnchorElement[] {
		return Array.from(page.querySelectorAll<HTMLAnchorElement>('nav a'));
	}

	it('links each app by name, in order', () => {
		expect(cards().map((a) => [a.querySelector('h2')!.textContent!.trim(), a.href])).toEqual([
			['quiz helper', 'https://quiz.lavask.in/'],
			['tierlist maker', 'https://tierlist.lavask.in/'],
			['mentor roulette tracker', 'https://mentor.lavask.in/'],
			['slimes!', 'https://slimes.lavask.in/'],
		]);
	});

	it('describes every app', () => {
		for (const card of cards()) {
			expect(card.querySelector('p')!.textContent!.trim()).not.toBe('');
		}
	});

	it('opens the apps in the same tab', () => {
		for (const card of cards()) {
			expect(card.target).toBe('');
		}
	});

	it("doesn't link to the cs page", () => {
		expect(page.querySelector('a[href*="cs"]')).toBeNull();
	});
});
