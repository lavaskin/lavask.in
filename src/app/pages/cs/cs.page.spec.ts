import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '@app/app.routes';
import { CsPage } from './cs.page';

describe('CsPage', () => {
	let page: HTMLElement;

	beforeEach(async () => {
		TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
		const harness = await RouterTestingHarness.create();
		await harness.navigateByUrl('/cs', CsPage);
		page = harness.routeNativeElement!;
	});

	function links(): HTMLAnchorElement[] {
		return Array.from(page.querySelectorAll<HTMLAnchorElement>('nav a'));
	}

	function link(label: string): HTMLAnchorElement {
		return links().find((a) => a.textContent!.trim() === label)!;
	}

	it("links lavaskin's profiles", () => {
		expect(links().map((a) => a.textContent!.trim())).toEqual([
			'steam',
			'trade',
			'cashrep',
			'twitter',
			'knife history',
		]);
		expect(link('steam').href).toBe('https://steamcommunity.com/profiles/76561198121030123');
	});

	it('opens every link in a new tab', () => {
		for (const a of links()) {
			expect(a.target).toBe('_blank');
			expect(a.rel).toBe('noopener');
		}
	});

	it("hands each link its color, and text that's readable on it", () => {
		expect(link('steam').style.getPropertyValue('--accent')).toBe('#171a21');
		expect(link('steam').style.getPropertyValue('--accent-text')).toBe('#fdfdfd');
		expect(link('cashrep').style.getPropertyValue('--accent')).toBe('#00d632');
		expect(link('cashrep').style.getPropertyValue('--accent-text')).toBe('#090909');
	});
});
