import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Title } from '@app/components/title/title';
import { Link } from '@app/models/link.model';

const LINKS: Link[] = [
	{
		title: 'csfloat listing',
		href: 'https://csfloat.com/item/784934779127729881',
		color: '#343744',
	},
	{
		title: 'inspect',
		href: 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198121030123A40527508208D14727347745577562509',
		color: '#dbe1e3',
	},
	{
		title: 'steam',
		href: 'https://steamcommunity.com/profiles/76561198121030123',
		color: '#171a21',
	},
	{
		title: 'trade',
		href: 'https://steamcommunity.com/tradeoffer/new/?partner=160764395&token=vwcpkFVk',
		color: '#1d5676',
	},
	{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198121030123', color: '#00d632' },
];

/** The listing for the 449 skeleton knife */
@Component({
	selector: 'app-page-cs-449',
	imports: [NgOptimizedImage, Title],
	templateUrl: './cs-449.page.html',
	styleUrl: './cs-449.page.css',
})
export class Cs449Page {
	private readonly document = inject(DOCUMENT);

	public readonly links = LINKS;

	/** The link showing its color. Only one at a time, so hovering one clears another that has focus. */
	public readonly hoveredIndex = signal<number | null>(null);

	/** For links opening in a new tab: reloads once it has opened, so this page doesn't stay on the link's hover state */
	public refresh(): void {
		setTimeout(() => this.document.location.reload());
	}
}
