import {
	afterNextRender,
	booleanAttribute,
	Component,
	computed,
	DestroyRef,
	ElementRef,
	inject,
	input,
} from '@angular/core';
import { Link } from '@app/models/link.model';
import { Swell } from '@app/services/swell';
import { textColorOn } from '@app/utils/contrast';

/** How far the swell raises and lowers a card, in px */
const FLOAT = 6;
/** How far a hovered or focused card lifts, in px */
const LIFT = 4;
/** How quickly a card eases between floating and lifted, in ms */
const EASE = 120;

/**
 * A frosted link that floats on the background swell. Hovering (or focusing from the keyboard)
 * stops it, lifts it, and fills it with the link's color.
 */
@Component({
	selector: 'a[app-link-card]',
	template: '<ng-content />',
	styleUrl: './link-card.css',
	host: {
		'[href]': 'link().href',
		'[attr.target]': "newTab() ? '_blank' : null",
		'[attr.rel]': "newTab() ? 'noopener' : null",
		'[style.--accent]': 'link().color',
		'[style.--accent-text]': 'accentText()',
		'(pointerenter)': 'hovered = $event.pointerType !== "touch"',
		'(pointerleave)': 'hovered = false',
		'(focus)': 'focused = isFocusVisible()',
		'(blur)': 'focused = false',
	},
})
export class LinkCard {
	public readonly link = input.required<Link>();
	public readonly newTab = input(false, { transform: booleanAttribute });

	protected readonly accentText = computed(() => textColorOn(this.link().color));

	protected hovered = false;
	protected focused = false;

	private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly swell = inject(Swell);

	constructor() {
		const destroyRef = inject(DestroyRef);

		let offset = 0;
		let lastTime: number | null = null;

		afterNextRender(() => {
			const stop = this.swell.onFrame((time) => {
				if (this.swell.still) {
					offset = 0;
					lastTime = null;
				} else {
					// The rect includes this frame's float, so take it off to find where the card rests
					const rect = this.element.getBoundingClientRect();
					const x = rect.left + rect.width / 2;
					const y = rect.top + rect.height / 2 - offset;

					// A crest raises the card, which is up (negative) on screen
					const target =
						this.hovered || this.focused
							? -LIFT
							: -FLOAT * this.swell.height(x, y, time);
					const elapsed = lastTime === null ? Infinity : time - lastTime;
					offset += (target - offset) * (1 - Math.exp(-elapsed / EASE));
					lastTime = time;
				}

				this.element.style.translate = offset ? `0 ${offset.toFixed(2)}px` : '';
			});
			destroyRef.onDestroy(stop);
		});
	}

	protected isFocusVisible(): boolean {
		try {
			return this.element.matches(':focus-visible');
		} catch {
			// Older selector engines (like jsdom's) may not know :focus-visible
			return false;
		}
	}
}
