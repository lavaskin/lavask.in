import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@app/components/title/title';
import { Link } from '@app/models/link.model';

const LAVASKIN_LINKS: Link[] = [
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
	{ title: 'twitter', href: 'https://x.com/lavaskin_cs', color: '#1d9bf0' },
	{
		title: 'knife history',
		href: 'https://docs.google.com/spreadsheets/d/113Ps8U5px1545O0x1Vk62yE7RitIt0QYXLLL-IpemAQ/edit?usp=sharing',
		color: '#00ac47',
	},
];

const TENECHI_LINKS: Link[] = [
	{
		title: 'steam',
		href: 'https://steamcommunity.com/profiles/76561198301309560/',
		color: '#171a21',
	},
	{
		title: 'trade',
		href: 'https://steamcommunity.com/tradeoffer/new/?partner=341043832',
		color: '#1d5676',
	},
	{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198301309560', color: '#00d632' },
	{ title: 'twitter', href: 'https://twitter.com/KingTenechi', color: '#1d9bf0' },
];

@Component({
	selector: 'app-page-cs',
	imports: [RouterLink, Title],
	templateUrl: './cs.page.html',
	styleUrl: './cs.page.css',
})
export class CsPage {
	private readonly document = inject(DOCUMENT);

	/** Easter egg: the hidden square in the bottom right corner swaps the page over to tenechi's links */
	public readonly isTenechi = signal(false);

	public readonly title = computed(() => (this.isTenechi() ? '♔tenec.hi' : 'lavask.in'));
	public readonly links = computed(() => (this.isTenechi() ? TENECHI_LINKS : LAVASKIN_LINKS));

	/** The link showing its color. Only one at a time, so hovering one clears another that has focus. */
	public readonly hoveredIndex = signal<number | null>(null);

	/** For links opening in a new tab: reloads once it has opened, so this page doesn't stay on the link's hover state */
	public refresh(): void {
		setTimeout(() => this.document.location.reload());
	}

	public swapTenechi(): void {
		this.isTenechi.set(true);
	}
}
