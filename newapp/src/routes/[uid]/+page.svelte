<script>
	import { SliceZone } from '@prismicio/svelte';
	import { dev } from '$app/environment';
	import * as components from '$lib/slices';
	export let data;

	const titles = {
		resources: 'Resources',
		basics: 'Skate Basics',
		contact: 'Contact Skatex'
	};
</script>

<svelte:head>
	<title>{titles[data.document.uid] ?? data.document.uid} | Skatex</title>
	<meta name="description" content="Skatex guides, stories, and ideas for life on wheels." />
</svelte:head>

<div class="page-content" data-tour="content">
	<SliceZone slices={data.document.data.body} {components} {dev} />
</div>

<style>
	.page-content {
		display: grid;
		gap: clamp(24px, 3vw, 36px);
	}
</style>
