<script>
	import { onMount, onDestroy } from 'svelte';
	import { prefersReducedMotion, isCoarsePointer } from '$lib/motion';

	let enabled = false;
	let dot;
	let ring;
	let hovering = false;
	let visible = false;
	let rafId;
	let targetX = 0;
	let targetY = 0;
	let ringX = 0;
	let ringY = 0;

	function loop() {
		ringX += (targetX - ringX) * 0.2;
		ringY += (targetY - ringY) * 0.2;
		if (ring) {
			ring.style.setProperty('--x', `${ringX}px`);
			ring.style.setProperty('--y', `${ringY}px`);
		}
		rafId = requestAnimationFrame(loop);
	}

	function handlePointerMove(event) {
		if (!visible) visible = true;
		targetX = event.clientX;
		targetY = event.clientY;
		if (dot) {
			dot.style.setProperty('--x', `${targetX}px`);
			dot.style.setProperty('--y', `${targetY}px`);
		}
		const interactive = event.target?.closest?.(
			'a, button, input, textarea, select, summary, label, [role="button"], [role="link"], [role="option"], [role="tab"]'
		);
		hovering = !!interactive;
	}

	function handlePointerLeaveWindow() {
		visible = false;
	}

	onMount(() => {
		if (prefersReducedMotion() || isCoarsePointer()) return;
		enabled = true;
		document.body.classList.add('custom-cursor-active');
		targetX = ringX = window.innerWidth / 2;
		targetY = ringY = window.innerHeight / 2;
		loop();
	});

	onDestroy(() => {
		if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(rafId);
		if (typeof document !== 'undefined') document.body.classList.remove('custom-cursor-active');
	});
</script>

<svelte:window
	on:pointermove={enabled ? handlePointerMove : undefined}
	on:pointerleave={enabled ? handlePointerLeaveWindow : undefined}
	on:blur={enabled ? handlePointerLeaveWindow : undefined}
/>

{#if enabled}
	<div class="cursor-dot" class:is-visible={visible} bind:this={dot} aria-hidden="true" />
	<div
		class="cursor-ring"
		class:is-visible={visible}
		class:is-active={hovering}
		bind:this={ring}
		aria-hidden="true"
	/>
{/if}

<style>
	.cursor-dot,
	.cursor-ring {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		border-radius: 50%;
		opacity: 0;
		pointer-events: none;
		transform: translate3d(var(--x, 50vw), var(--y, 50vh), 0) translate(-50%, -50%);
		transition: opacity 220ms ease;
	}

	.cursor-dot.is-visible,
	.cursor-ring.is-visible {
		opacity: 1;
	}

	.cursor-dot {
		width: 7px;
		height: 7px;
		background: #8debf1;
		box-shadow: 0 0 8px rgba(141, 235, 241, 0.95), 0 0 20px rgba(141, 235, 241, 0.55);
	}

	.cursor-ring {
		--ring-scale: 1;
		width: 34px;
		height: 34px;
	}

	.cursor-ring::before {
		position: absolute;
		inset: 0;
		border: 1.5px solid rgba(167, 139, 250, 0.55);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(167, 139, 250, 0.12), transparent 70%);
		content: '';
		transform: scale(var(--ring-scale));
		transition: transform 280ms ease-in-out, border-color 200ms ease, background 200ms ease;
	}

	.cursor-ring.is-active {
		--ring-scale: 1.35;
	}

	.cursor-ring.is-active::before {
		border-color: rgba(141, 235, 241, 0.85);
		background: radial-gradient(circle, rgba(141, 235, 241, 0.22), transparent 70%);
	}

	@media (max-width: 680px) {
		.cursor-dot,
		.cursor-ring {
			display: none;
		}
	}
</style>
