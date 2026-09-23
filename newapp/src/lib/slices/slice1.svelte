<script>
	import * as prismicH from '@prismicio/helpers';
	import { normalizeUiText } from '$lib/typography';
	export let slice;
</script>

<section class="section-heading">
	<span class="section-marker" aria-hidden="true" />
	<h2>{normalizeUiText(prismicH.asText(slice.primary.title))}</h2>
</section>

<style>
	.section-heading {
		display: flex;
		max-width: 900px;
		align-items: center;
		gap: 14px;
		margin: clamp(12px, 2.5vw, 24px) auto 0;
		padding: 0 clamp(4px, 2vw, 20px) 12px;
		border-bottom: 1px solid rgba(207, 202, 255, 0.15);
	}

	.section-marker {
		width: 10px;
		height: 10px;
		flex: 0 0 auto;
		border-radius: 50%;
		background: #8debf1;
		box-shadow: 0 0 18px rgba(113, 231, 244, 0.72);
	}

	h2 {
		margin: 0;
		color: #e7e4f3;
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 750;
		letter-spacing: -0.045em;
		text-shadow: 0 0 14px #090b16;
	}
</style>
