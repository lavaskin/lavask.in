import {
	afterNextRender,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	viewChild,
} from '@angular/core';
import { Swell } from '@app/services/swell';

/** The whole grid is turned this far clockwise, pluses included */
const ROTATION = (12 * Math.PI) / 180;
const AXIS_X = Math.cos(ROTATION);
const AXIS_Y = Math.sin(ROTATION);

const SPACING = 32;
/** Half the length of each bar of a plus, in a trough. Crests grow it. */
const ARM = 5;
const STROKE = 2;
/** How far a crest lifts a plus, in px */
const LIFT = 2;

/** The old title gradient, looped so it can drift forever */
const PALETTE: [number, number, number][] = [
	[255, 0, 0], // red
	[255, 165, 0], // orange
	[255, 192, 203], // pink
];
/** Width of one full red → orange → pink → red cycle, measured along the grid */
const GRADIENT_SPAN = 1800;
/** Time for the colors to drift one full cycle along the grid, in ms */
const DRIFT_PERIOD = 40_000;

const MIN_ALPHA = 0.07;
const MAX_ALPHA = 0.32;

/** Pluses are drawn in batches that share a color, so these set how finely colors are rounded */
const COLOR_STEPS = 36;
const ALPHA_STEPS = 12;

/** Every batch's stroke style, indexed by `color * ALPHA_STEPS + alpha` */
const STYLES = Array.from({ length: COLOR_STEPS * ALPHA_STEPS }, (_, bucket) => {
	const position = (Math.floor(bucket / ALPHA_STEPS) / COLOR_STEPS) * PALETTE.length;
	const from = PALETTE[Math.floor(position)];
	const to = PALETTE[(Math.floor(position) + 1) % PALETTE.length];
	const mix = position % 1;
	const [r, g, b] = from.map((channel, i) => Math.round(channel + (to[i] - channel) * mix));
	const alpha =
		MIN_ALPHA + ((MAX_ALPHA - MIN_ALPHA) * (bucket % ALPHA_STEPS)) / (ALPHA_STEPS - 1);
	return `rgb(${r} ${g} ${b} / ${alpha.toFixed(3)})`;
});

/** The page background: a tilted grid of faint pluses, with a swell rolling across it */
@Component({
	selector: 'app-plus-grid',
	template: '<canvas #canvas></canvas>',
	styles: `
		:host {
			position: fixed;
			inset: 0;
			z-index: -1;
			pointer-events: none;
		}

		canvas {
			display: block;
			width: 100%;
			height: 100%;
		}
	`,
	host: { 'aria-hidden': 'true' },
})
export class PlusGrid {
	private readonly swell = inject(Swell);
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

	private context: CanvasRenderingContext2D | null = null;
	private width = 0;
	private height = 0;

	// Per plus: resting position, and its place along the gradient
	private restX = new Float32Array(0);
	private restY = new Float32Array(0);
	private gradient = new Float32Array(0);

	// Per frame scratch space, kept between frames so drawing doesn't allocate
	private x = new Float32Array(0);
	private y = new Float32Array(0);
	private arm = new Float32Array(0);
	private bucket = new Uint16Array(0);
	private order = new Uint32Array(0);
	private readonly bucketStart = new Uint32Array(STYLES.length + 1);
	private readonly bucketNext = new Uint32Array(STYLES.length);

	constructor() {
		const destroyRef = inject(DestroyRef);

		afterNextRender(() => {
			this.context = this.canvas().nativeElement.getContext('2d');
			if (!this.context) return;

			const resizes = new ResizeObserver(() => {
				this.resize();
				// Resizing clears the canvas, so redraw now rather than leave it blank until the next frame
				this.draw(this.swell.time);
			});
			resizes.observe(this.host);
			const stop = this.swell.onFrame((time) => this.draw(time));

			destroyRef.onDestroy(() => {
				resizes.disconnect();
				stop();
			});
		});
	}

	/** Sizes the canvas to the viewport, and lays out the pluses that land on it */
	private resize(): void {
		const canvas = this.canvas().nativeElement;
		const ratio = Math.min(window.devicePixelRatio || 1, 2);
		this.width = this.host.clientWidth;
		this.height = this.host.clientHeight;
		canvas.width = Math.round(this.width * ratio);
		canvas.height = Math.round(this.height * ratio);
		this.context!.setTransform(ratio, 0, 0, ratio, 0, 0);

		// Lattice coordinates of the viewport's corners, to find which rows and columns can reach it
		const margin = SPACING;
		const corners = [
			[-margin, -margin],
			[this.width + margin, -margin],
			[-margin, this.height + margin],
			[this.width + margin, this.height + margin],
		];
		const across = corners.map(([x, y]) => (x * AXIS_X + y * AXIS_Y) / SPACING);
		const down = corners.map(([x, y]) => (y * AXIS_X - x * AXIS_Y) / SPACING);

		const xs: number[] = [];
		const ys: number[] = [];
		for (let i = Math.floor(Math.min(...across)); i <= Math.ceil(Math.max(...across)); i++) {
			for (let j = Math.floor(Math.min(...down)); j <= Math.ceil(Math.max(...down)); j++) {
				const x = (i * AXIS_X - j * AXIS_Y) * SPACING;
				const y = (i * AXIS_Y + j * AXIS_X) * SPACING;
				const inside =
					x >= -margin &&
					x <= this.width + margin &&
					y >= -margin &&
					y <= this.height + margin;
				if (inside) {
					xs.push(x);
					ys.push(y);
				}
			}
		}

		const count = xs.length;
		this.restX = Float32Array.from(xs);
		this.restY = Float32Array.from(ys);
		this.gradient = this.restX.map(
			(x, i) => (x * AXIS_X + this.restY[i] * AXIS_Y) / GRADIENT_SPAN,
		);
		this.x = new Float32Array(count);
		this.y = new Float32Array(count);
		this.arm = new Float32Array(count);
		this.bucket = new Uint16Array(count);
		this.order = new Uint32Array(count);
	}

	private draw(time: number): void {
		const context = this.context;
		if (!context || !this.width) return;

		const count = this.restX.length;
		const drift = time / DRIFT_PERIOD;
		const starts = this.bucketStart;
		starts.fill(0);

		// Work out where each plus is this frame, and which batch it's drawn in
		for (let i = 0; i < count; i++) {
			const height = this.swell.height(this.restX[i], this.restY[i], time);
			// 0 in a trough, 1 on a crest. Squaring keeps the crests narrow and the troughs wide.
			const crest = ((height + 1) / 2) ** 2;

			const shade = (((this.gradient[i] - drift) % 1) + 1) % 1;
			const color = Math.floor(shade * COLOR_STEPS) % COLOR_STEPS;
			const alpha = Math.round(crest * (ALPHA_STEPS - 1));
			const bucket = color * ALPHA_STEPS + alpha;

			this.x[i] = this.restX[i];
			this.y[i] = this.restY[i] - LIFT * height;
			this.arm[i] = ARM * (0.8 + 0.5 * crest);
			this.bucket[i] = bucket;
			starts[bucket + 1]++;
		}

		// Group the pluses by batch (a counting sort, which needs no allocation)
		const next = this.bucketNext;
		for (let b = 1; b < starts.length; b++) starts[b] += starts[b - 1];
		for (let b = 0; b < next.length; b++) next[b] = starts[b];
		for (let i = 0; i < count; i++) this.order[next[this.bucket[i]]++] = i;

		context.clearRect(0, 0, this.width, this.height);
		context.lineWidth = STROKE;

		for (let b = 0; b < STYLES.length; b++) {
			if (starts[b] === starts[b + 1]) continue;

			context.strokeStyle = STYLES[b];
			context.beginPath();
			for (let n = starts[b]; n < starts[b + 1]; n++) {
				const i = this.order[n];
				const x = this.x[i];
				const y = this.y[i];
				const alongX = AXIS_X * this.arm[i];
				const alongY = AXIS_Y * this.arm[i];
				context.moveTo(x - alongX, y - alongY);
				context.lineTo(x + alongX, y + alongY);
				context.moveTo(x + alongY, y - alongX);
				context.lineTo(x - alongY, y + alongX);
			}
			context.stroke();
		}
	}
}
