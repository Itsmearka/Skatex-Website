<script>
    import * as prismicH from "@prismicio/helpers"
    export let slice
    const image = slice.primary.optional_image
    const imageSrc = image ? prismicH.asImageWidthSrcSet(image) : null
    const reverse = slice.primary.image_side === 'right'
</script>

<div class:reverse class="layout box">
    {#if imageSrc}
        <img src={imageSrc.src} srcset={imageSrc.srcset} alt={image.alt ?? ''}>
    {/if}
    <p class="txt">{@html prismicH.asHTML(slice.primary.description)}</p>
</div>

<style>

    img
    {
        width: 40%;
        border-radius: 2.5rem;
        aspect-ratio: 0.9;
        object-fit: cover;
        flex: 1.2;
        box-shadow: 0px 0px 15px #9D00FF;
        padding: 20px;
    }

    .box
    {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin-top: 5vw;
        margin-bottom: 5vw;
    }

    .box.reverse
    {
        flex-direction: row-reverse;
    }

    p{
        padding-left: 1.5rem;
    }

    @media (max-width: 640px)
    {
        .box, .box.reverse
        {
            flex-direction: column;
        }

        img
        {
            width: 100%;
        }
    }

</style>