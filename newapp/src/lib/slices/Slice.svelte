<script>
    import * as prismicH from "@prismicio/helpers"
    export let slice
</script>

<center>
    {@html prismicH.asHTML(slice.primary.eyebrow_headline)}
</center>

<div class="layout">
            
    <article>
        {@html prismicH.asHTML(slice.primary.title)}
    </article>
</div>

<div class="layout">

    <article>
            {@html prismicH.asHTML(slice.primary.description)}
    </article>
</div>

<style>
    center
    {
        margin-bottom: 2vw;
        margin-top: 2vw;
    }

    article
    {
        text-align: center;
        border-radius: 1rem;
    }
</style>


