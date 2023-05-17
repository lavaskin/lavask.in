import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
	selector: 'app-cs',
	templateUrl: './cs.component.html',
	styleUrls: ['./cs.component.css']
})
export class CsComponent implements OnInit {
	public links: Link[] = [
		{ title: 'steam', href: 'https://steamcommunity.com/profiles/76561198121030123' },
		{ title: 'trade', href: 'https://steamcommunity.com/tradeoffer/new/?partner=160764395&token=vwcpkFVk' },
		{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198121030123' },
		{ title: 'twitter', href: 'https://twitter.com/lavaskin_trade' },
	];
	
	constructor() { }

	ngOnInit(): void { }
}