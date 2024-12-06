import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
	selector: 'app-449',
	templateUrl: './449.component.html',
	styleUrls: ['./449.component.css']
})
export class Four49Component implements OnInit {
	public title: string = 'lavask.in';
	public links: Link[] = [];
	public hoveredIndex: number | null = null;
	
	ngOnInit(): void { }

	public refresh(): void {
		setTimeout(() => {
			window.location.reload();
		});
	}
}