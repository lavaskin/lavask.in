import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
	selector: 'app-cs',
	templateUrl: './cs.component.html',
	styleUrls: ['./cs.component.css']
})
export class CsComponent implements OnInit {
	public title: string = 'lavask.in';

	public links: Link[] = [
		{ title: 'steam', href: 'https://steamcommunity.com/profiles/76561198121030123', color: '#171a21', },
		{ title: 'trade', href: 'https://steamcommunity.com/tradeoffer/new/?partner=160764395&token=vwcpkFVk', color: '#1d5676' },
		{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198121030123', color: '#00d632' },
		{ title: 'twitter', href: 'https://x.com/lavaskin_cs', color: '#1d9bf0' },
		{ title: 'knife history', href: 'https://docs.google.com/spreadsheets/d/113Ps8U5px1545O0x1Vk62yE7RitIt0QYXLLL-IpemAQ/edit?usp=sharing', color: '#00ac47' },
	];

	public hoveredIndex: number | null = null;
	public tenechi: boolean = false;

	ngOnInit(): void { }

	public refresh(): void {
		setTimeout(() => {
			window.location.reload();
		});
	}

	public swapTenechi(): void {
		// Change all the info to tenechi stuff
		this.tenechi = true;
		this.title = '♔tenec.hi';
		this.links = [
			{ title: 'steam', href: 'https://steamcommunity.com/profiles/76561198301309560/', color: '#171a21', },
			{ title: 'trade', href: 'https://steamcommunity.com/tradeoffer/new/?partner=341043832', color: '#1d5676' },
			{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198301309560', color: '#00d632' },
			{ title: 'twitter', href: 'https://twitter.com/KingTenechi', color: '#1d9bf0' },
		];
	}
}