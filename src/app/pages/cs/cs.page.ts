import { Component } from '@angular/core';
import { LinkCard } from '@app/components/link-card/link-card';
import { Title } from '@app/components/title/title';
import { Link } from '@app/models/link.model';

export const CS_LINKS: Link[] = [
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

/** CS profile links. Deliberately not linked from anywhere on the site. */
@Component({
	selector: 'app-page-cs',
	imports: [LinkCard, Title],
	templateUrl: './cs.page.html',
	styleUrl: './cs.page.css',
})
export class CsPage {
	protected readonly links = CS_LINKS;
}
