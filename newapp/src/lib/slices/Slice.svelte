<script>
	import * as prismicH from '@prismicio/helpers';
	import { cursorGlow } from '$lib/cursorGlow';
	import { normalizeUiText } from '$lib/typography';
	export let slice;

	$: eyebrow = normalizeUiText(prismicH.asHTML(slice.primary.eyebrow_headline));
	$: title = normalizeUiText(prismicH.asHTML(slice.primary.title));
	$: description = normalizeUiText(prismicH.asHTML(slice.primary.description));
</script>

<section class="copy-section" data-tour="hero" use:cursorGlow>
	{#if eyebrow}
		<div class="copy-eyebrow">{@html eyebrow}</div>
	{/if}
	<div class="copy-heading">{@html title}</div>
	<div class="copy-description">{@html description}</div>
</section>

<style>
	.copy-section {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		max-width: 900px;
		margin: 0 auto;
		padding: clamp(22px, 4vw, 46px) clamp(18px, 5vw, 58px);
		border: 1px solid rgba(207, 202, 255, 0.12);
		border-radius: 24px;
		background: radial-gradient(ellipse at 50% 0%, rgba(108, 76, 191, 0.17), transparent 62%),
			rgba(18, 19, 38, 0.94);
		text-align: center;
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.14), inset 0 1px rgba(255, 255, 255, 0.035);
	}

	.copy-section::after {
		position: absolute;
		z-index: 0;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			280px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(116, 218, 255, 0.16),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.copy-section > * {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.copy-eyebrow,
	.copy-heading,
	.copy-description {
		width: 100%;
	}

	.copy-eyebrow {
		margin-bottom: 16px;
		color: #87eaf2;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.19em;
		text-transform: uppercase;
	}

	.copy-eyebrow :global(p) {
		margin: 0;
	}

	.copy-heading :global(h1),
	.copy-heading :global(h2),
	.copy-heading :global(p) {
		margin: 0;
		color: #fbf9ff;
		font-size: clamp(2.4rem, 6vw, 5rem);
		font-weight: 850;
		letter-spacing: -0.055em;
		line-height: 1;
		text-align: center;
		text-wrap: balance;
	}

	.copy-description {
		max-width: 660px;
		margin: 16px auto 0;
		color: #bdbbce;
		font-size: clamp(1rem, 1.8vw, 1.08rem);
		line-height: 1.7;
		text-align: center;
	}

	.copy-description :global(p) {
		margin: 0;
	}

	.copy-description :global(a) {
		color: #91eaf0;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 620px) {
		.copy-section {
			border-radius: 20px;
		}
	}
</style>
