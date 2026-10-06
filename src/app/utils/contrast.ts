/** The site's own text colors, matching --bg-color and --text-color */
export const DARK_TEXT = '#090909';
export const LIGHT_TEXT = '#fdfdfd';

/** WCAG relative luminance of a `#rrggbb` color */
export function luminance(hex: string): number {
	const [r, g, b] = [1, 3, 5].map((i) => {
		const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
		return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two `#rrggbb` colors, from 1 to 21 */
export function contrast(a: string, b: string): number {
	const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (light + 0.05) / (dark + 0.05);
}

/** Whichever of the site's text colors reads best on top of `background` */
export function textColorOn(background: string): string {
	return contrast(DARK_TEXT, background) >= contrast(LIGHT_TEXT, background)
		? DARK_TEXT
		: LIGHT_TEXT;
}
