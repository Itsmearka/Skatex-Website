<script>
	import { SliceZone } from '@prismicio/svelte';
	import { dev } from '$app/environment';
	import * as components from '$lib/slices';
	import StatsStrip from '$lib/StatsStrip.svelte';
	import CommunityMarquee from '$lib/CommunityMarquee.svelte';
	export let data;
</script>

<svelte:head>
	<title>Skatex | Skate culture in motion</title>
	<meta
		name="description"
		content="Discover skate culture, considered gear, and practical guides from the park."
	/>
</svelte:head>

<div class="page-content" data-tour="content">
	<SliceZone slices={data.document.data.body} {components} {dev} />
	<StatsStrip />
	<CommunityMarquee />
</div>

<style>
	.page-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
		align-items: start;
		gap: clamp(24px, 3vw, 36px);
	}

	.page-content :global(.copy-section),
	.page-content :global(.welcome-wrap),
	.page-content :global(.section-heading),
	.page-content :global(.stats-strip),
	.page-content :global(.marquee-wrap) {
		grid-column: 1 / -1;
	}

	@media (max-width: 760px) {
		.page-content {
			grid-template-columns: 1fr;
		}
	}
</style>
