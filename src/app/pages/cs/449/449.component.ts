import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
	selector: 'app-449',
	templateUrl: './449.component.html',
	styleUrls: ['./449.component.css']
})
export class Four49Component implements OnInit {
	public title: string = 'lavask.in';
	public hoveredIndex: number | null = null;

	public links: Link[] = [
		{ title: 'csfloat listing', href: 'https://csfloat.com/item/784934779127729881', color: '#343744', },
		{ title: 'steam', href: 'https://steamcommunity.com/profiles/76561198121030123', color: '#171a21', },
		{ title: 'trade', href: 'https://steamcommunity.com/tradeoffer/new/?partner=160764395&token=vwcpkFVk', color: '#1d5676' },
		{ title: 'cashrep', href: 'https://csgo-rep.com/profile/76561198121030123', color: '#00d632' },
	];
	
	ngOnInit(): void { }

	public refresh(): void {
		setTimeout(() => {
			window.location.reload();
		});
	}
}