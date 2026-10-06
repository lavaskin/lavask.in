import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '@app/app.routes';
import { CsPage } from './cs.page';

describe('CsPage', () => {
	let harness: RouterTestingHarness;
	let page: HTMLElement;

	beforeEach(async () => {
		TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
		harness = await RouterTestingHarness.create();
		await harness.navigateByUrl('/cs', CsPage);
		page = harness.routeNativeElement!;
	});

	function links(): HTMLAnchorElement[] {
		return Array.from(page.querySelectorAll<HTMLAnchorElement>('.links a'));
	}

	function link(label: string): HTMLAnchorElement {
		return links().find((a) => a.textContent!.trim() === label)!;
	}

	it("links lavaskin's profiles, then the 449 skeleton page", () => {
		expect(links().map((a) => a.textContent!.trim())).toEqual([
			'steam',
			'trade',
			'cashrep',
			'twitter',
			'knife history',
			'449 skeleton',
		]);
		expect(link('steam').href).toBe('https://steamcommunity.com/profiles/76561198121030123');
		expect(link('steam').target).toBe('_blank');
		expect(link('449 skeleton').getAttribute('href')).toBe('/cs/449');
	});

	it('colors only the hovered link, until the mouse leaves', async () => {
		link('trade').dispatchEvent(new MouseEvent('mouseenter'));
		await harness.fixture.whenStable();

		expect(link('trade').style.backgroundColor).toBe('rgb(29, 86, 118)');
		expect(link('steam').style.backgroundColor).toBe('');

		link('trade').dispatchEvent(new MouseEvent('mouseleave'));
		await harness.fixture.whenStable();

		expect(link('trade').style.backgroundColor).toBe('');
	});

	it("swaps to tenechi's links from the hidden corner, without the 449 skeleton", async () => {
		page.querySelector<HTMLElement>('.tenechi')!.click();
		await harness.fixture.whenStable();

		expect(page.querySelector('h1')!.textContent).toBe('♔tenec.hi');
		expect(links().map((a) => a.textContent!.trim())).toEqual([
			'steam',
			'trade',
			'cashrep',
			'twitter',
		]);
		expect(link('steam').href).toBe('https://steamcommunity.com/profiles/76561198301309560/');
	});
});
