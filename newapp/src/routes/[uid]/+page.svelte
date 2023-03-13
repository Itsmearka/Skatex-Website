<script>
    import { SliceZone } from '@prismicio/svelte'
    import { dev } from "$app/environment"
    import * as components from "$lib/slices"
    export let data
</script>

<SliceZone slices={data.document.data.body} {components} { dev }/> 