import { DOCUMENT } from '@angular/common';
import { inject, Service } from '@angular/core';

const degrees = (angle: number) => (angle * Math.PI) / 180;

/** The main swell rolls down and to the right */
const MAIN_X = Math.cos(degrees(32));
const MAIN_Y = Math.sin(degrees(32));
const MAIN_K = (2 * Math.PI) / 640; // 640px between crests
const MAIN_SPEED = 0.16; // px per ms, so a crest passes any point every 4s

/** A longer, slower cross swell, so the crests aren't perfectly straight lines */
const CROSS_X = Math.cos(degrees(64));
const CROSS_Y = Math.sin(degrees(64));
const CROSS_K = (2 * Math.PI) / 1100;
const CROSS_SPEED = 0.09;

/** The moment the swell holds at when it's still */
const FROZEN_TIME = 0;

export type FrameCallback = (time: number) => void;

/**
 * The swell rolling across the background grid. One clock drives both the grid and the cards
 * floating on it, so a card rises exactly as a crest passes under it.
 */
@Service()
export class Swell {
	private readonly window = inject(DOCUMENT).defaultView;
	private readonly callbacks = new Set<FrameCallback>();
	private frame: number | null = null;
	private lastTime = FROZEN_TIME;

	/** Whether the visitor asked for reduced motion. While still, nothing animates. */
	public still = false;

	constructor() {
		// jsdom has no matchMedia
		const query = this.window?.matchMedia?.('(prefers-reduced-motion: reduce)');
		if (!query) return;

		this.still = query.matches;
		query.addEventListener('change', ({ matches }) => {
			this.still = matches;
			if (matches) {
				this.stop();
				this.callbacks.forEach((callback) => callback(FROZEN_TIME));
			} else {
				this.start();
			}
		});
	}

	/** The current time on the swell's clock, in ms */
	public get time(): number {
		return this.still ? FROZEN_TIME : this.lastTime;
	}

	/**
	 * Height of the swell at a point in the viewport (in CSS px), from -1 in a trough to 1 on a
	 * crest. `time` comes from the swell's clock.
	 */
	public height(x: number, y: number, time: number): number {
		const main = Math.sin(MAIN_K * (x * MAIN_X + y * MAIN_Y - MAIN_SPEED * time));
		const cross = Math.sin(CROSS_K * (x * CROSS_X + y * CROSS_Y - CROSS_SPEED * time) + 1.3);
		return main * 0.75 + cross * 0.25;
	}

	/**
	 * Calls `callback` with the swell's time on every animation frame. While still, it's called
	 * once with the frozen time instead. Returns a function that stops the calls.
	 */
	public onFrame(callback: FrameCallback): () => void {
		this.callbacks.add(callback);
		if (this.still) {
			callback(FROZEN_TIME);
		} else {
			this.start();
		}

		return () => {
			this.callbacks.delete(callback);
			if (!this.callbacks.size) this.stop();
		};
	}

	private start(): void {
		if (this.frame === null && this.callbacks.size && this.window?.requestAnimationFrame) {
			this.frame = this.window.requestAnimationFrame(this.tick);
		}
	}

	private stop(): void {
		if (this.frame !== null) this.window?.cancelAnimationFrame(this.frame);
		this.frame = null;
	}

	private readonly tick = (time: number): void => {
		this.frame = null;
		this.lastTime = time;
		this.callbacks.forEach((callback) => callback(time));
		if (!this.still) this.start();
	};
}
