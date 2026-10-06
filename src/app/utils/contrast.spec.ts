import { CS_LINKS } from '@app/pages/cs/cs.page';
import { APPS } from '@app/pages/home/home.page';
import { contrast, DARK_TEXT, LIGHT_TEXT, textColorOn } from './contrast';

describe('contrast', () => {
	it('matches the WCAG ratios', () => {
		expect(contrast('#000000', '#ffffff')).toBeCloseTo(21);
		expect(contrast('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
		expect(contrast('#ffffff', '#ffffff')).toBe(1);
	});

	it('puts dark text on bright colors and light text on dark ones', () => {
		expect(textColorOn('#ffff00')).toBe(DARK_TEXT);
		expect(textColorOn('#000080')).toBe(LIGHT_TEXT);
	});

	it('keeps the text on every link readable while hovered (WCAG AA)', () => {
		for (const { title, color } of [...APPS, ...CS_LINKS]) {
			const ratio = contrast(textColorOn(color), color);
			expect(ratio, `${title} on ${color}`).toBeGreaterThanOrEqual(4.5);
		}
	});
});
