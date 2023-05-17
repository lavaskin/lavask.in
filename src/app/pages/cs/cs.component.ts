import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
	selector: 'app-cs',
	templateUrl: './cs.component.html',
	styleUrls: ['./cs.component.css']
})
export class CsComponent implements OnInit {
	public links: Link[] = [
		{ title: 'steam', href: 'https://steamcommunity.com/profiles/76561198121030123', color: '#171a21', },
		{ title: 'trade', href: 'https://steamcommunity.com/tradeoffer/new/?partner=160764395&token=vwcpkFVk', color: '#1d5676' },
		{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198121030123', color: '#00d632' },
		{ title: 'twitter', href: 'https://twitter.com/lavaskin_trade', color: '#1d9bf0' },
	];
	public hoveredIndex: number | null = null;
	
	constructor() { }

	ngOnInit(): void { }
}