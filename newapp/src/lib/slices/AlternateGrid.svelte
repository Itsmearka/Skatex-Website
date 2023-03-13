<script>
    import * as prismicH from "@prismicio/helpers"
    export let slice
    const imageSrc=prismicH.asImageWidthSrcSet(slice.primary.optional_image)
    const reverse = slice.primary.image_side === 'right'
</script>

<div class="layout box">
        <img src={imageSrc.src} srcset={imageSrc.srcset} alt={slice.primary.optional_image.alt}>
        <p class="txt">{@html prismicH.asHTML(slice.primary.description)} </p>
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
    
    p{
        padding-left: 1.5rem;
    }

</style>