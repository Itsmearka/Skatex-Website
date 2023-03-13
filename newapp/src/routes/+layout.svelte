<script>
    import pico from "@picocss/pico"
</script>

<nav class="layout">
    <a prefetch href="/">My Site</a>
    <a prefetch href="/resources">Resources</a>
    <a prefetch href="/basics">Basics</a>
    <a prefetch href="/contact">Contact</a>
</nav>

<main>
    <slot/>
</main>

<footer>
    Acme Corporation 2023
</footer>

<style>
    nav
    {
        background: rgba(0, 0, 0, 0.4);
        padding-top: 1rem;
        padding-bottom: 1rem;
        box-shadow: 0px 0px 20px #9D00FF;
    }

    nav,footer
    {
        text-transform: uppercase;
        font-size: 0.7rem;
        letter-spacing: 0.1px;
        font-weight: 500;
    }

    :global(html)
    {
        background: rgb(20,20,40);
        overflow-y: scroll;
    }

    :global(.layout)
    {
        --width: 700px;
        padding-left: max(1rem, calc(calc(100vw - var(--width))/2));
        padding-right: max(1rem, calc(calc(100vw - var(--width))/2));
    }

    main
    {
        margin-bottom: 5rem;
        margin-top: 5vw;
    }

    footer
    {
        text-align: center;
        margin: 3rem 0;
        color: rgba(255,255,255,0.4);
    }
</style>