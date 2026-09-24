<script>
	import * as prismicH from '@prismicio/helpers';
	import { cursorGlow } from '$lib/cursorGlow';
	import { reveal } from '$lib/scrollReveal';
	import { normalizeUiText } from '$lib/typography';
	export let slice;

	$: label = normalizeUiText(slice.slice_label ?? prismicH.asText(slice.primary.title));
</script>

<div class="welcome-wrap" data-tour="welcome">
	<div class="welcome-banner" use:cursorGlow use:reveal>
		<span class="welcome-glow" aria-hidden="true" />
		<h2 class="welcome-text">{label}</h2>
		<span class="welcome-caption">Skate culture, in motion</span>
	</div>
</div>

<style>
	.welcome-wrap {
		max-width: 980px;
		margin: 0 auto;
	}

	.welcome-banner {
		position: relative;
		isolation: isolate;
		display: flex;
		min-height: clamp(100px, 13vw, 140px);
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 7px;
		overflow: hidden;
		padding: 20px;
		border: 1px solid rgba(165, 145, 255, 0.24);
		border-radius: 22px;
		background: radial-gradient(ellipse at 50% 0%, rgba(113, 82, 204, 0.24), transparent 72%),
			linear-gradient(130deg, rgba(20, 21, 43, 0.96), rgba(12, 14, 29, 0.94));
		box-shadow: 0 18px 58px rgba(0, 0, 0, 0.23), inset 0 1px rgba(255, 255, 255, 0.045);
		text-align: center;
	}

	.welcome-banner::before {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, #8f65ff, #78eaf1, #e66fc5, #8f65ff);
		background-size: 220% 100%;
		animation: gradient-flow 9s ease-in-out infinite alternate;
		content: '';
	}

	.welcome-glow {
		position: absolute;
		z-index: -1;
		top: -110px;
		left: calc(50% - 140px);
		width: 280px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: rgba(127, 82, 255, 0.18);
		filter: blur(68px);
	}

	.welcome-banner::after {
		position: absolute;
		z-index: 0;
		inset: 0;
		background: radial-gradient(
			260px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(132, 216, 255, 0.18),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.welcome-text,
	.welcome-caption {
		position: relative;
		z-index: 1;
	}

	.welcome-text {
		margin: 0;
		color: #f7f5ff;
		font-size: clamp(1rem, 2.8vw, 1.4rem);
		font-weight: 850;
		letter-spacing: 0.17em;
		line-height: 1.2;
		text-shadow: 0 0 28px rgba(176, 155, 255, 0.19);
	}

	.welcome-caption {
		color: #aaa8c1;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.07em;
	}

	@keyframes gradient-flow {
		from {
			background-position: 0% 50%;
		}
		to {
			background-position: 100% 50%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.welcome-banner::before {
			animation: none;
		}
	}

	@media (max-width: 520px) {
		.welcome-banner {
			min-height: 98px;
			padding: 18px 12px;
			border-radius: 18px;
		}

		.welcome-text {
			letter-spacing: 0.11em;
		}
	}
</style>
