<script>
	import { reveal } from '$lib/scrollReveal';

	// Placeholder quotes for demo purposes only — replace with real community
	// testimonials (ideally sourced from Prismic) before this ships live.
	export let quotes = [
		{ text: 'Skatex is where I check the local spot list before every trip.', author: 'Nina R.' },
		{
			text: 'The basics guides got my kid from wobbly to confident in a month.',
			author: 'Marcus T.'
		},
		{
			text: 'Field notes read like they were written by people who actually skate.',
			author: 'Priya D.'
		},
		{ text: 'Found three new parks in my city I never knew existed.', author: 'Jonah K.' },
		{ text: 'Clean layout, fast pages, zero clutter. Rare for a skate site.', author: 'El Vega' }
	];

	$: doubled = [...quotes, ...quotes];
</script>

<div
	class="marquee-wrap"
	data-tour="community"
	aria-label="What the community is saying"
	use:reveal
>
	<div class="marquee-fade marquee-fade--start" aria-hidden="true" />
	<div class="marquee-fade marquee-fade--end" aria-hidden="true" />
	<div class="marquee-track">
		{#each doubled as quote, index (index)}
			<figure class="quote-card">
				<blockquote>“{quote.text}”</blockquote>
				<figcaption>{quote.author}</figcaption>
			</figure>
		{/each}
	</div>
</div>

<style>
	.marquee-wrap {
		position: relative;
		overflow: hidden;
		max-width: 1120px;
		margin: 0 auto;
		mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
	}

	.marquee-fade {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 2;
		width: 60px;
		pointer-events: none;
	}

	.marquee-fade--start {
		left: 0;
		background: linear-gradient(90deg, #090b16, transparent);
	}

	.marquee-fade--end {
		right: 0;
		background: linear-gradient(-90deg, #090b16, transparent);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		gap: 18px;
		animation: marquee-scroll 42s linear infinite;
	}

	.marquee-wrap:hover .marquee-track {
		animation-play-state: paused;
	}

	.quote-card {
		width: min(360px, 82vw);
		flex: 0 0 auto;
		margin: 0;
		padding: clamp(18px, 2.5vw, 24px);
		border: 1px solid rgba(207, 202, 255, 0.13);
		border-radius: 20px;
		background: linear-gradient(140deg, rgba(26, 26, 51, 0.9), rgba(13, 14, 29, 0.9));
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
	}

	.quote-card blockquote {
		margin: 0;
		color: #e2dff2;
		font-size: 0.98rem;
		line-height: 1.6;
	}

	.quote-card figcaption {
		margin-top: 14px;
		color: #85eaf1;
		font-size: 0.78rem;
		font-weight: 750;
		letter-spacing: 0.04em;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			flex-wrap: wrap;
			width: 100%;
			animation: none;
		}

		.quote-card {
			width: min(320px, 100%);
		}
	}
</style>
