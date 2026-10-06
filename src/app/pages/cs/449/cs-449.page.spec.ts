import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cs449Page } from './cs-449.page';

describe('Cs449Page', () => {
	it('keeps the steam:// inspect link, which opens the knife in CS', async () => {
		TestBed.configureTestingModule({ providers: [provideRouter([])] });
		const fixture = TestBed.createComponent(Cs449Page);
		await fixture.whenStable();

		const inspect = Array.from<HTMLAnchorElement>(
			fixture.nativeElement.querySelectorAll('a'),
		).find((a) => a.textContent!.trim() === 'inspect')!;

		// Angular 13's sanitizer turned this into unsafe:steam://..., which did nothing when clicked
		expect(inspect.getAttribute('href')).toMatch(/^steam:\/\/rungame\/730\//);
	});
});
