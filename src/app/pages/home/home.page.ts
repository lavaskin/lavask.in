import { Component } from '@angular/core';
import { LinkCard } from '@app/components/link-card/link-card';
import { Title } from '@app/components/title/title';
import { Link } from '@app/models/link.model';

/** The apps hosted on lavask.in subdomains, colored with each app's own theme */
export const APPS: Link[] = [
	{
		title: 'quiz helper',
		href: 'https://quiz.lavask.in/',
		color: '#a78bfa',
		description:
			'build quizzes with buzz-ins, multiple choice, true/false and more, then host them live for friends with a join code',
	},
	{
		title: 'tierlist maker',
		href: 'https://tierlist.lavask.in/',
		color: '#f472b6',
		description:
			"make tier lists by dragging images into rows, with several image variations per item so you can compare versions of what you're ranking",
	},
	{
		title: 'mentor roulette tracker',
		href: 'https://mentor.lavask.in/',
		color: '#38bdf8',
		description:
			'log your ffxiv mentor roulette runs and track progress toward the 2,000-clear achievement, with stats on which duties and jobs come up most',
	},
	{
		title: 'slimes!',
		href: 'https://slimes.lavask.in/',
		color: '#07ff30',
		description:
			'the website for the slimes discord bot. browse your collection of procedurally generated hand drawn slimes',
	},
];

@Component({
	selector: 'app-page-home',
	imports: [LinkCard, Title],
	templateUrl: './home.page.html',
	styleUrl: './home.page.css',
})
export class HomePage {
	protected readonly apps = APPS;
}
