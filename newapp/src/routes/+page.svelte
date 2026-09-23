<script>
	import { SliceZone } from '@prismicio/svelte';
	import { dev } from '$app/environment';
	import * as components from '$lib/slices';
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
</div>

<style>
	.page-content {
		display: grid;
		gap: clamp(24px, 3vw, 36px);
	}
</style>
