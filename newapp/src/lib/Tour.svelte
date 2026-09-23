<script>
	import { onDestroy, onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { cursorGlow } from '$lib/cursorGlow';

	const steps = [
		{
			title: 'Welcome to Skatex',
			copy: 'A quick look at the experience, the content system, and the care behind the scenes.',
			target: '[data-tour="welcome"]'
		},
		{
			title: 'Find your way around',
			copy: 'Navigation is built from published Prismic pages. Publish a page and it appears here without a code change.',
			target: '[data-tour="navigation"]'
		},
		{
			title: 'Content that stays fresh',
			copy: 'The page sections are Prismic slices. Editors can update copy, imagery, and section order while the Svelte components keep the presentation consistent.',
			target: '[data-tour="content"]'
		},
		{
			title: 'Flexible feature blocks',
			copy: 'Feature imagery can move to either side or be omitted. The layout adapts for smaller screens.',
			target: '[data-tour="feature"]'
		},
		{
			title: 'A little motion, by design',
			copy: 'Soft ambient orbs add depth without getting in the way. Their motion respects reduced-motion settings.',
			target: null
		},
		{
			title: 'Secure content operations',
			copy: 'The site reads public Prismic content. Doppler protects the administrative write token and injects it only into authorized CLI tasks. It is never sent to the browser.',
			target: '[data-tour="operations"]'
		}
	];

	let active = false;
	let stepIndex = 0;
	let dialog;
	let launcher;
	let focusedElement;

	$: currentStep = steps[stepIndex];

	async function startTour() {
		stepIndex = 0;
		active = true;
		document.body.classList.add('tour-open');
		await tick();
		dialog?.focus();
		focusCurrentStep();
	}

	function focusCurrentStep() {
		focusedElement?.classList.remove('tour-focus');
		const selector = steps[stepIndex].target;
		focusedElement = selector ? document.querySelector(selector) : null;
		focusedElement?.classList.add('tour-focus');
		focusedElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
	}

	function goToStep(index) {
		stepIndex = index;
		focusCurrentStep();
	}

	async function closeTour() {
		const restoreFocus = active;
		active = false;
		if (typeof document !== 'undefined') document.body.classList.remove('tour-open');
		focusedElement?.classList.remove('tour-focus');
		focusedElement = null;
		if (restoreFocus) {
			await tick();
			launcher?.focus();
		}
	}

	function handleKeydown(event) {
		if (!active) return;
		if (event.key === 'Escape') closeTour();
		if (event.key === 'ArrowRight' && stepIndex < steps.length - 1) goToStep(stepIndex + 1);
		if (event.key === 'ArrowLeft' && stepIndex > 0) goToStep(stepIndex - 1);
		if (event.key === 'Tab' && dialog) {
			const focusable = dialog.querySelectorAll('button:not(:disabled)');
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (
				event.shiftKey &&
				(document.activeElement === first || document.activeElement === dialog)
			) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		}
	}

	onMount(() => {
		if (!$page.url.searchParams.has('tour')) return;
		const url = new URL($page.url);
		url.searchParams.delete('tour');
		history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
		startTour();
	});

	onDestroy(closeTour);
</script>

<svelte:window on:keydown={handleKeydown} />

{#if active}
	<div class="tour-layer">
		<button class="tour-backdrop" type="button" aria-label="Close tour" on:click={closeTour} />
		<section
			class="tour-card"
			use:cursorGlow
			role="dialog"
			aria-modal="true"
			aria-labelledby="tour-title"
			aria-describedby="tour-copy"
			tabindex="-1"
			bind:this={dialog}
		>
			<div class="tour-heading">
				<span class="tour-eyebrow">SKATEX FIELD GUIDE</span>
				<button class="close-tour" type="button" aria-label="Close tour" on:click={closeTour}
					>Close</button
				>
			</div>
			<div class="tour-progress" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
				<span>STEP {stepIndex + 1} OF {steps.length}</span>
				<span class="progress-track"
					><span style={`width: ${((stepIndex + 1) / steps.length) * 100}%`} /></span
				>
			</div>
			<div class="tour-copy" aria-live="polite">
				<h2 id="tour-title">{currentStep.title}</h2>
				<p id="tour-copy">{currentStep.copy}</p>
			</div>
			<div class="tour-actions">
				<button
					class="previous-button"
					type="button"
					disabled={stepIndex === 0}
					on:click={() => goToStep(stepIndex - 1)}
				>
					Previous
				</button>
				<button class="skip-button" type="button" on:click={closeTour}>Skip tour</button>
				<button
					class="next-button"
					type="button"
					on:click={() => (stepIndex === steps.length - 1 ? closeTour() : goToStep(stepIndex + 1))}
				>
					{stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
				</button>
			</div>
		</section>
	</div>
{:else}
	<button
		class="tour-launcher"
		type="button"
		aria-haspopup="dialog"
		bind:this={launcher}
		on:click={startTour}
	>
		<span class="launcher-dot" aria-hidden="true" />
		Take a tour
	</button>
{/if}

<style>
	.tour-layer {
		position: fixed;
		z-index: 1200;
		inset: 0;
		pointer-events: none;
	}

	.tour-backdrop {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		pointer-events: auto;
	}

	.tour-card {
		position: fixed;
		isolation: isolate;
		overflow: hidden;
		right: clamp(12px, 3vw, 32px);
		bottom: clamp(12px, 3vw, 28px);
		z-index: 1202;
		width: min(460px, calc(100vw - 24px));
		padding: clamp(20px, 4vw, 30px);
		border: 1px solid rgba(147, 132, 255, 0.38);
		border-radius: 24px;
		background: linear-gradient(145deg, rgba(25, 26, 50, 0.98), rgba(11, 13, 27, 0.98));
		box-shadow: 0 26px 90px rgba(0, 0, 0, 0.52), 0 0 38px rgba(129, 87, 255, 0.15);
		backdrop-filter: blur(22px);
		color: #f4f2ff;
		pointer-events: auto;
	}

	.tour-card::before {
		position: absolute;
		z-index: 0;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			260px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(135, 109, 255, 0.2),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.tour-card > * {
		position: relative;
		z-index: 1;
	}

	.tour-heading,
	.tour-progress,
	.tour-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.tour-eyebrow {
		color: #8debf1;
		font-size: 0.67rem;
		font-weight: 800;
		letter-spacing: 0.18em;
	}

	.close-tour,
	.skip-button,
	.previous-button {
		padding: 7px 10px;
		border: 0;
		background: transparent;
		color: #aaa9bd;
		font-size: 0.78rem;
	}

	.close-tour:hover,
	.skip-button:hover,
	.previous-button:hover:not(:disabled) {
		color: #fff;
	}

	.tour-progress {
		justify-content: flex-start;
		margin-top: 22px;
		color: #85849a;
		font-size: 0.64rem;
		font-weight: 700;
		letter-spacing: 0.12em;
	}

	.progress-track {
		height: 3px;
		flex: 1;
		overflow: hidden;
		border-radius: 99px;
		background: rgba(255, 255, 255, 0.1);
	}

	.progress-track span {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, #8a64ff, #7de8f0);
		transition: width 240ms ease;
	}

	.tour-copy {
		margin-top: 18px;
	}

	.tour-copy h2 {
		margin: 0;
		color: #f8f6ff;
		font-size: clamp(1.4rem, 3vw, 1.85rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 1.12;
	}

	.tour-copy p {
		margin: 12px 0 0;
		color: #c2bfd2;
		font-size: 0.92rem;
		line-height: 1.7;
	}

	.tour-actions {
		justify-content: flex-end;
		margin-top: 24px;
	}

	.previous-button:disabled {
		opacity: 0.35;
	}

	.next-button {
		min-width: 88px;
		padding: 10px 16px;
		border: 1px solid rgba(132, 231, 243, 0.48);
		border-radius: 999px;
		background: linear-gradient(110deg, #9af0e8, #a6a0ff);
		color: #101222;
		font-size: 0.82rem;
		font-weight: 800;
		transition: transform 160ms ease;
	}

	.next-button:hover {
		transform: translateY(-2px);
		background: linear-gradient(110deg, #adf5ef, #b7b2ff);
		color: #101222;
	}

	.tour-launcher {
		position: fixed;
		right: clamp(14px, 3vw, 30px);
		bottom: clamp(14px, 3vw, 30px);
		z-index: 30;
		display: inline-flex;
		width: max-content !important;
		max-width: calc(100vw - 28px);
		min-width: 0;
		min-height: 44px;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin: 0;
		padding: 0 14px;
		white-space: nowrap;
		border: 1px solid rgba(138, 115, 255, 0.55);
		border-radius: 999px;
		background: rgba(17, 18, 38, 0.94);
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35), inset 0 1px rgba(255, 255, 255, 0.07);
		color: #f6f4ff;
		font-size: 0.86rem;
		font-weight: 750;
		letter-spacing: 0.01em;
		animation: tour-pulse 4.8s ease-in-out infinite;
		backdrop-filter: blur(16px);
	}

	.launcher-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #82eaf1;
		box-shadow: 0 0 14px rgba(130, 234, 241, 0.8);
	}

	:global(.tour-focus) {
		position: relative !important;
		z-index: 40 !important;
		outline: 2px solid rgba(129, 234, 243, 0.94);
		outline-offset: 5px;
		box-shadow: 0 0 0 9999px rgba(3, 4, 14, 0.72), 0 0 36px rgba(100, 225, 239, 0.3);
	}

	@keyframes tour-pulse {
		0%,
		64%,
		100% {
			transform: scale(1);
		}
		68% {
			transform: scale(1.035);
		}
		72% {
			transform: scale(0.995);
		}
		76% {
			transform: scale(1.02);
		}
		80% {
			transform: scale(1);
		}
	}

	@media (max-width: 520px) {
		.tour-card {
			bottom: 12px;
			right: 12px;
			width: calc(100vw - 24px);
			padding: 19px;
		}

		.tour-actions {
			gap: 6px;
		}

		.previous-button,
		.skip-button {
			padding-right: 6px;
			padding-left: 6px;
			font-size: 0.72rem;
		}

		.tour-launcher {
			min-height: 46px;
			padding: 0 16px;
		}
	}

	@media (max-height: 560px) {
		.tour-card {
			max-height: calc(100vh - 24px);
			overflow-y: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tour-launcher,
		.progress-track span,
		.next-button {
			animation: none;
			transition: none;
		}
	}
</style>
