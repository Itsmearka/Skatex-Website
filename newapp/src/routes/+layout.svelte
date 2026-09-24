<script>
	import '@picocss/pico';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page, navigating } from '$app/stores';
	import Tour from '$lib/Tour.svelte';
	import CursorTrail from '$lib/CursorTrail.svelte';
	import CommandPalette from '$lib/CommandPalette.svelte';
	import SkeletonLoader from '$lib/SkeletonLoader.svelte';
	import { magnetic } from '$lib/magnetic';
	import { prefersReducedMotion } from '$lib/motion';
	export let data;

	const labels = {
		homepage: 'Home',
		resources: 'Resources',
		basics: 'Basics',
		contact: 'Contact'
	};

	let commandPalette;
	let scrollProgress = 0;
	let isScrolled = false;
	let reducedMotion = false;

	$: currentPath = $page.url.pathname.replace(/\/+$/, '') || '/';

	function handleScroll() {
		const doc = document.documentElement;
		const max = doc.scrollHeight - doc.clientHeight;
		scrollProgress = max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0;
		isScrolled = isScrolled ? window.scrollY > 8 : window.scrollY > 40;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
	}

	onMount(() => {
		reducedMotion = prefersReducedMotion();
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const skateRoute =
		'M-80 440 C120 300 270 300 420 388 S650 490 820 330 S1120 180 1520 365 C1620 390 1620 280 1520 300 C1360 190 1420 150 1160 310 C900 470 840 380 600 260 C360 140 220 350 -80 220 C-160 270 -160 670 -80 790 C150 660 330 770 520 765 C560 765 590 770 620 770 a100 100 0 0 0 0 -200 a100 100 0 0 0 0 200 C740 790 960 650 1140 740 S1400 850 1520 710 C1700 750 1750 1070 900 1080 C200 1090 -240 640 -80 440';
</script>

<svelte:head>
	<meta name="theme-color" content="#090b16" />
	<meta
		name="description"
		content="Skatex brings together skate culture, practical guides, and stories from the park."
	/>
	<link rel="canonical" href="{$page.url.origin}{$page.url.pathname}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Skatex" />
	<meta property="og:title" content="Skatex | Skate culture in motion" />
	<meta
		property="og:description"
		content="Skatex brings together skate culture, practical guides, and stories from the park."
	/>
	<meta
		property="og:image"
		content="https://images.prismic.io/go84va8p/RtlaSmvyu_3MnwUO_neon-skateboard-deck.jpg?auto=format,compress&w=1200"
	/>
	<meta property="og:url" content="{$page.url.origin}{$page.url.pathname}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Skatex | Skate culture in motion" />
	<meta
		name="twitter:description"
		content="Skatex brings together skate culture, practical guides, and stories from the park."
	/>
	<meta
		name="twitter:image"
		content="https://images.prismic.io/go84va8p/RtlaSmvyu_3MnwUO_neon-skateboard-deck.jpg?auto=format,compress&w=1200"
	/>
	<title>Skatex | Skate culture in motion</title>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>

<div class="top-progress" aria-hidden="true">
	<span class="top-progress-fill" style={`width: ${scrollProgress}%`} />
	{#if $navigating}
		<span class="top-progress-sweep" />
	{/if}
</div>

<div class="app-shell">
	<div class="ambient" data-tour="motion" aria-hidden="true">
		<span class="orb orb-violet" />
		<span class="orb orb-cyan" />
		<span class="orb orb-pink" />
		<span class="grain-overlay" />
		<svg
			class="skate-art"
			viewBox="0 0 1440 900"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				<linearGradient id="skate-trail-gradient" x1="0" x2="1">
					<stop offset="0" stop-color="#a78bfa" stop-opacity="0.2" />
					<stop offset="0.45" stop-color="#67e8f9" stop-opacity="0.95" />
					<stop offset="0.8" stop-color="#f472b6" stop-opacity="0.7" />
					<stop offset="1" stop-color="#a78bfa" stop-opacity="0.15" />
				</linearGradient>
				<linearGradient id="deck-neon" x1="0" x2="1">
					<stop offset="0" stop-color="#22d3ee" />
					<stop offset="0.5" stop-color="#a78bfa" />
					<stop offset="1" stop-color="#f472b6" />
				</linearGradient>
			</defs>
			<path id="skate-route" class="skate-route" pathLength="1000" d={skateRoute} />
			<g class="skate-rider skate-rider--cyan">
				<animateMotion dur="75s" repeatCount="indefinite" rotate="auto">
					<mpath href="#skate-route" />
				</animateMotion>
				<g transform="translate(0 -11) scale(0.5625)">
					<circle cx="2" cy="-56" r="6.5" />
					<path d="M-4.5 -57.5 Q2 -64 8.5 -57.5 L10 -54" />
					<path d="M-2 -49 L8 -47" />
					<path d="M3 -48 Q1 -36 -2 -24" />
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="6 -1 -47;-6 -1 -47;6 -1 -47"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-1 -47 L-8 -38 L-16 -40" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="-6 7 -46;6 7 -46;-6 7 -46"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M7 -46 L14 -52 L19 -49" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="-8 -2 -24;8 -2 -24;-8 -2 -24"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-2 -24 L10 -15 L14 -6" />
						<circle cx="10" cy="-15" r="2.4" />
						<path d="M14 -6 L21 -7 L21 -4" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="8 -2 -24;-8 -2 -24;8 -2 -24"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-2 -24 L-13 -16 L-19 -8" />
						<circle cx="-13" cy="-16" r="2.4" />
						<path d="M-19 -8 L-25 -9 L-25 -6" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="2.5 0 3;-2.5 0 3;2.5 0 3"
							dur="3.2s"
							repeatCount="indefinite"
						/>
						<circle class="skate-wheel-glow" cx="-14" cy="14" r="4" />
						<circle class="skate-wheel-glow" cx="16" cy="14" r="4" />
						<path d="M-27 1 Q-25 -1.5 -21 0 L24 0 Q28 0.5 27.5 -2.5" />
						<path d="M-14 1 L-14 3.5 M16 1 L16 3.5" />
						<circle cx="-14" cy="6.5" r="2.6" />
						<circle cx="16" cy="6.5" r="2.6" />
					</g>
				</g>
			</g>
			<g class="skate-rider skate-rider--pink">
				<animateMotion dur="32s" begin="-7s" repeatCount="indefinite" rotate="auto">
					<mpath href="#skate-route" />
				</animateMotion>
				<g transform="translate(0 -11) scale(-0.5625 0.5625)">
					<circle cx="2" cy="-56" r="6.5" />
					<path d="M-4.5 -57.5 Q2 -64 8.5 -57.5 L10 -54" />
					<path d="M-2 -49 L8 -47" />
					<path d="M3 -48 Q1 -36 -2 -24" />
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="6 -1 -47;-6 -1 -47;6 -1 -47"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-1 -47 L-8 -38 L-16 -40" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="-6 7 -46;6 7 -46;-6 7 -46"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M7 -46 L14 -52 L19 -49" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="-8 -2 -24;8 -2 -24;-8 -2 -24"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-2 -24 L10 -15 L14 -6" />
						<circle cx="10" cy="-15" r="2.4" />
						<path d="M14 -6 L21 -7 L21 -4" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="8 -2 -24;-8 -2 -24;8 -2 -24"
							dur="1.6s"
							repeatCount="indefinite"
						/>
						<path d="M-2 -24 L-13 -16 L-19 -8" />
						<circle cx="-13" cy="-16" r="2.4" />
						<path d="M-19 -8 L-25 -9 L-25 -6" />
					</g>
					<g>
						<animateTransform
							attributeName="transform"
							type="rotate"
							values="2.5 0 3;-2.5 0 3;2.5 0 3"
							dur="3.2s"
							repeatCount="indefinite"
						/>
						<circle class="skate-wheel-glow" cx="-14" cy="14" r="4" />
						<circle class="skate-wheel-glow" cx="16" cy="14" r="4" />
						<path d="M-27 1 Q-25 -1.5 -21 0 L24 0 Q28 0.5 27.5 -2.5" />
						<path d="M-14 1 L-14 3.5 M16 1 L16 3.5" />
						<circle cx="-14" cy="6.5" r="2.6" />
						<circle cx="16" cy="6.5" r="2.6" />
					</g>
				</g>
			</g>
			<g class="skate-rider skate-deck">
				<animateMotion dur="100s" begin="-11s" repeatCount="indefinite" rotate="auto">
					<mpath href="#skate-route" />
				</animateMotion>
				<g transform="scale(0.75)">
					<ellipse class="skate-wheel-glow" cx="0" cy="18" rx="28" ry="4" />
					<path
						class="deck-body"
						d="M-36 0 Q-36 -10 -26 -10 L26 -10 Q36 -10 36 0 Q36 10 26 10 L-26 10 Q-36 10 -36 0 Z"
					/>
					<circle class="deck-wheel" cx="-26" cy="-13" r="3.4" />
					<circle class="deck-wheel" cx="-26" cy="13" r="3.4" />
					<circle class="deck-wheel" cx="26" cy="-13" r="3.4" />
					<circle class="deck-wheel" cx="26" cy="13" r="3.4" />
				</g>
			</g>
		</svg>
		<span class="ambient-grid" />
	</div>

	<header class="site-header" class:is-scrolled={isScrolled}>
		<nav class="site-nav" aria-label="Primary navigation" data-tour="navigation">
			<a prefetch href="/" class="brand" aria-label="Skatex home">
				<span class="brand-mark" aria-hidden="true">S</span>
				<span class="brand-name">Skatex</span>
			</a>
			<div class="nav-links">
				{#each data?.pages ?? [] as navItem (navItem.id)}
					<a
						prefetch
						href={navItem.uid === 'homepage' ? '/' : `/${navItem.uid}`}
						aria-current={currentPath === (navItem.uid === 'homepage' ? '/' : `/${navItem.uid}`)
							? 'page'
							: undefined}
					>
						{labels[navItem.uid] ?? navItem.uid}
					</a>
				{/each}
			</div>
			<button
				type="button"
				class="palette-trigger"
				data-tour="palette"
				use:magnetic
				aria-label="Open command palette"
				on:click={() => commandPalette?.open()}
			>
				<span aria-hidden="true">Search</span>
				<kbd aria-hidden="true">⌘K</kbd>
			</button>
		</nav>
	</header>

	<main id="main-content" class="site-main">
		<div class="route-viewport">
			{#key $page.url.pathname}
				<div
					class="route-transition"
					in:fly={reducedMotion ? { duration: 0 } : { y: 14, duration: 420, easing: quintOut }}
					out:fade={reducedMotion ? { duration: 0 } : { duration: 120 }}
				>
					<slot />
				</div>
			{/key}
			{#if $navigating}
				<div class="route-loading" transition:fade={{ duration: 150 }}>
					<SkeletonLoader />
				</div>
			{/if}
		</div>
	</main>

	<footer class="site-footer" data-tour="operations">
		<div class="footer-top">
			<div class="footer-brand-block">
				<a class="footer-brand" href="/">Skatex</a>
				<p class="footer-blurb">
					Skate culture, practical guides, and stories from the park &mdash; built for the ones who
					keep rolling.
				</p>
			</div>
			<nav class="footer-links" aria-label="Footer navigation">
				<span class="footer-heading">Explore</span>
				<a prefetch href="/">Home</a>
				{#each data?.pages ?? [] as navItem (navItem.id)}
					{#if navItem.uid !== 'homepage'}
						<a prefetch href={`/${navItem.uid}`}>{labels[navItem.uid] ?? navItem.uid}</a>
					{/if}
				{/each}
			</nav>
			<div class="footer-connect">
				<span class="footer-heading">Connect</span>
				<button type="button" class="footer-link-button">Instagram</button>
				<button type="button" class="footer-link-button">YouTube</button>
				<button type="button" class="footer-link-button">Newsletter</button>
			</div>
		</div>
		<div class="footer-bottom">
			<small>Skate culture, in motion.</small>
			<button type="button" class="back-to-top" use:magnetic on:click={scrollToTop}>
				Back to top ↑
			</button>
		</div>
	</footer>

	<CursorTrail />
	<CommandPalette bind:this={commandPalette} pages={data?.pages} />
	<Tour />
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		min-width: 320px;
		background: #090b16;
		color-scheme: dark;
		scroll-behavior: smooth;
	}

	:global(body) {
		min-width: 320px;
		margin: 0;
		background: transparent;
		color: #f4f2ff;
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
			sans-serif;
		font-size: 15.5px;
		line-height: 1.65;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(a:focus-visible) {
		outline: 2px solid #71e7f4;
		outline-offset: 4px;
	}

	:global(html) {
		scrollbar-color: #8a64ff #12132a;
		scrollbar-width: thin;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #0c0e1c;
	}

	:global(::-webkit-scrollbar-thumb) {
		border: 2px solid #0c0e1c;
		border-radius: 999px;
		background: linear-gradient(180deg, #8a64ff, #7de8f0);
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, #a084ff, #9af0e8);
	}

	:global(.reveal-init) {
		opacity: 0;
		transform: translateY(22px);
		transition: opacity 620ms cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
			transform 620ms cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms);
		will-change: opacity, transform;
	}

	:global(.reveal-init.is-revealed) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.is-magnetic) {
		--magnet-x: 0px;
		--magnet-y: 0px;
		translate: var(--magnet-x) var(--magnet-y);
		transition: transform 200ms ease;
		will-change: translate;
	}

	.skip-link {
		position: absolute;
		top: -60px;
		left: 16px;
		z-index: 3000;
		padding: 12px 18px;
		border: 1px solid rgba(167, 139, 250, 0.5);
		border-radius: 12px;
		background: #101222;
		color: #f4f2ff;
		font-size: 0.85rem;
		font-weight: 750;
		transition: top 180ms ease;
	}

	.skip-link:focus-visible {
		top: 16px;
		outline: 2px solid #71e7f4;
		outline-offset: 2px;
	}

	.top-progress {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1500;
		width: 100%;
		height: 3px;
		overflow: hidden;
		pointer-events: none;
	}

	.top-progress-fill {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, #8f65ff, #78eaf1, #e66fc5);
		transition: width 120ms ease;
	}

	.top-progress-sweep {
		position: absolute;
		top: 0;
		left: 0;
		width: 32%;
		height: 100%;
		background: linear-gradient(90deg, transparent, #9af0e8, #a6a0ff, transparent);
		animation: top-progress-sweep-move 900ms ease-in-out infinite;
	}

	@keyframes top-progress-sweep-move {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(410%);
		}
	}

	.app-shell {
		position: relative;
		isolation: isolate;
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		overflow-x: clip;
	}

	.ambient {
		position: fixed;
		z-index: -1;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		background: radial-gradient(ellipse at 50% -20%, rgba(93, 53, 176, 0.2), transparent 48%),
			linear-gradient(180deg, #0a0b18 0%, #0c0e1c 58%, #090b16 100%);
	}

	.orb {
		position: absolute;
		display: block;
		width: clamp(220px, 34vw, 520px);
		aspect-ratio: 1;
		border-radius: 50%;
		filter: blur(90px);
		opacity: 0.2;
		animation: orb-bob 9s cubic-bezier(0.34, 1.3, 0.64, 1) infinite;
	}

	.orb-violet {
		top: 12%;
		left: -14%;
		background: #752aff;
		animation-duration: 8.5s;
	}

	.orb-cyan {
		top: 42%;
		right: -16%;
		width: clamp(200px, 28vw, 420px);
		background: #00bcd4;
		animation-duration: 10.5s;
		animation-delay: -3.5s;
	}

	.orb-pink {
		top: 78%;
		left: 38%;
		width: clamp(180px, 24vw, 340px);
		background: #eb3fab;
		opacity: 0.12;
		animation-duration: 11.5s;
		animation-delay: -6.2s;
	}

	.skate-art {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.skate-route {
		fill: none;
		stroke: url(#skate-trail-gradient);
		stroke-width: 1.8;
		stroke-dasharray: 0.35 0.65;
		stroke-linecap: round;
		opacity: 0.14;
		animation: skate-trail-reverse 208s linear infinite;
	}

	.skate-wheel-glow {
		fill: url(#skate-trail-gradient);
		stroke: none;
		filter: drop-shadow(0 0 6px #a8f4ff);
		opacity: 0.95;
	}

	.skate-rider {
		fill: none;
		stroke: #c5b5ff;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		filter: drop-shadow(0 0 6px rgba(141, 235, 241, 0.68));
		opacity: 0.75;
	}

	.skate-rider--cyan {
		stroke: #a5f3fc;
		filter: drop-shadow(0 0 9px rgba(103, 232, 249, 0.85));
	}

	.skate-rider--pink {
		stroke: #f9a8d4;
		filter: drop-shadow(0 0 9px rgba(244, 114, 182, 0.8));
	}

	.skate-deck {
		stroke-width: 2.4;
		filter: drop-shadow(0 0 12px rgba(167, 139, 250, 0.75));
	}

	.deck-body {
		fill: rgba(9, 11, 22, 0.6);
		stroke: url(#deck-neon);
	}

	.deck-wheel {
		fill: rgba(103, 232, 249, 0.25);
		stroke: #67e8f9;
		stroke-width: 2.2;
	}

	.ambient-grid {
		position: absolute;
		inset: 0;
		opacity: 0.16;
		background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 72px 72px;
		mask-image: linear-gradient(to bottom, black, transparent 86%);
	}

	.grain-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 160px 160px;
	}

	:global(body.tour-open) .site-header,
	:global(body.tour-open) .site-main,
	:global(body.tour-open) .site-footer {
		z-index: 100;
	}

	.site-header {
		position: sticky;
		top: 10px;
		z-index: 60;
		width: min(100% - 40px, 1120px);
		margin: 20px auto 0;
		transition: margin-top 320ms ease-in-out, width 320ms ease-in-out;
	}

	.site-header.is-scrolled {
		width: min(calc((100% - 40px) * 0.75), 840px);
		margin-top: 10px;
	}

	.site-nav {
		display: flex;
		min-height: 68px;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 10px 18px;
		border: 1px solid rgba(207, 202, 255, 0.12);
		border-radius: 22px;
		background: rgba(15, 16, 33, 0.74);
		box-shadow: 0 14px 48px rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(22px);
		transition: padding 320ms ease-in-out, min-height 320ms ease-in-out,
			background 320ms ease-in-out, box-shadow 320ms ease-in-out;
	}

	.site-header.is-scrolled .site-nav {
		min-height: 54px;
		padding: 6px 14px;
		background: rgba(10, 11, 24, 0.88);
		box-shadow: 0 18px 60px rgba(0, 0, 0, 0.36);
	}

	.palette-trigger {
		display: inline-flex;
		width: max-content;
		flex: 0 0 auto;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border: 1px solid rgba(207, 202, 255, 0.16);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: #aaa9bd;
		font-size: 0.78rem;
		font-weight: 650;
		transition: color 160ms ease, background 160ms ease, border-color 160ms ease;
	}

	.palette-trigger:hover {
		border-color: rgba(167, 135, 255, 0.32);
		background: rgba(137, 96, 255, 0.14);
		color: #fff;
	}

	.palette-trigger kbd {
		padding: 2px 6px;
		border: 1px solid rgba(207, 202, 255, 0.24);
		border-radius: 6px;
		font-family: inherit;
		font-size: 0.68rem;
	}

	.brand {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		gap: 11px;
		font-size: 1.08rem;
		font-weight: 800;
		letter-spacing: -0.04em;
	}

	.brand-mark {
		display: grid;
		width: 34px;
		height: 34px;
		place-items: center;
		border: 1px solid rgba(116, 231, 244, 0.65);
		border-radius: 12px;
		background: linear-gradient(145deg, rgba(113, 231, 244, 0.16), rgba(130, 73, 255, 0.28));
		box-shadow: 0 0 24px rgba(113, 231, 244, 0.16), inset 0 0 14px rgba(113, 231, 244, 0.08);
		color: #96f4fa;
		font-size: 1.2rem;
		font-style: italic;
	}

	.brand-name {
		color: #f8f6ff;
	}

	.nav-links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
	}

	.nav-links a {
		padding: 8px 12px;
		border: 1px solid transparent;
		border-radius: 999px;
		color: #aaa9bd;
		font-size: 0.84rem;
		font-weight: 600;
		transition: color 160ms ease, background 160ms ease, border-color 160ms ease;
	}

	.nav-links a:hover,
	.nav-links a[aria-current='page'] {
		border-color: rgba(167, 135, 255, 0.22);
		background: rgba(137, 96, 255, 0.12);
		color: #fff;
	}

	.nav-links a[aria-current='page'] {
		animation: nav-tab-bounce 560ms cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: center;
	}

	.site-main {
		position: relative;
		z-index: 1;
		width: min(100% - 40px, 1120px);
		flex: 1;
		margin: clamp(30px, 4vw, 52px) auto clamp(48px, 6vw, 68px);
	}

	.route-viewport {
		position: relative;
	}

	.route-loading {
		position: absolute;
		inset: 0;
		z-index: 5;
		padding: 2px;
		background: rgba(9, 11, 22, 0.94);
		border-radius: 18px;
	}

	.site-footer {
		position: relative;
		z-index: 1;
		width: min(100% - 40px, 1120px);
		margin: 0 auto 28px;
		padding: 30px 4px 0;
		border-top: 1px solid rgba(207, 202, 255, 0.12);
		color: #85849a;
	}

	.footer-top {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(20px, 4vw, 48px);
	}

	.footer-brand {
		display: inline-block;
		color: #e8e4ff;
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.footer-blurb {
		max-width: 320px;
		margin: 12px 0 0;
		color: #85849a;
		font-size: 0.85rem;
		line-height: 1.65;
	}

	.footer-heading {
		display: block;
		margin-bottom: 12px;
		color: #8debf1;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.footer-links,
	.footer-connect {
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	.footer-links a,
	.footer-link-button {
		width: max-content;
		border: 0;
		background: transparent;
		padding: 0;
		color: #b5b3c7;
		font-size: 0.86rem;
		font-family: inherit;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
		transition: color 160ms ease;
	}

	.footer-links a:hover,
	.footer-link-button:hover {
		color: #8debf1;
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-top: 28px;
		padding: 18px 0;
		border-top: 1px solid rgba(207, 202, 255, 0.08);
	}

	.footer-bottom small {
		color: inherit;
		font-size: 0.78rem;
	}

	.back-to-top {
		width: max-content;
		padding: 8px 14px;
		border: 1px solid rgba(207, 202, 255, 0.18);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: #d7d4e7;
		font-size: 0.78rem;
		font-weight: 650;
		transition: color 160ms ease, background 160ms ease, border-color 160ms ease;
	}

	.back-to-top:hover {
		border-color: rgba(141, 235, 241, 0.4);
		background: rgba(141, 235, 241, 0.1);
		color: #fff;
	}

	@keyframes skate-trail-reverse {
		to {
			stroke-dashoffset: 1000;
		}
	}

	@keyframes nav-tab-bounce {
		0% {
			transform: translateY(3px) scale(0.9);
			box-shadow: 0 0 0 rgba(137, 96, 255, 0);
		}
		45% {
			transform: translateY(-2px) scale(1.08);
			box-shadow: 0 0 14px rgba(137, 96, 255, 0.28);
		}
		68% {
			transform: translateY(1px) scale(0.975);
			box-shadow: 0 0 6px rgba(137, 96, 255, 0.14);
		}
		85% {
			transform: translateY(-0.5px) scale(1.02);
		}
		100% {
			transform: translateY(0) scale(1);
			box-shadow: 0 0 0 rgba(137, 96, 255, 0);
		}
	}

	@keyframes orb-bob {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(0.98);
		}
		42% {
			transform: translate3d(0, -13px, 0) scale(1.015);
		}
		56% {
			transform: translate3d(0, -7px, 0) scale(1.005);
		}
	}

	@media (max-width: 680px) {
		.site-header,
		.site-main,
		.site-footer {
			width: min(100% - 28px, 1120px);
		}

		.site-header {
			margin-top: 14px;
		}

		.site-header.is-scrolled {
			width: min(100% - 28px, 1120px);
		}

		.site-nav {
			min-height: 0;
			align-items: flex-start;
			flex-direction: column;
			gap: 10px;
			padding: 12px;
			border-radius: 16px;
		}

		.nav-links {
			width: 100%;
			justify-content: flex-start;
			gap: 6px;
		}

		.nav-links a {
			padding: 8px 11px;
			font-size: 0.82rem;
		}

		.palette-trigger {
			width: 100%;
			justify-content: center;
		}

		.site-main {
			margin-top: 30px;
			margin-bottom: 48px;
		}

		.site-footer {
			padding-top: 18px;
		}

		.footer-top {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.footer-bottom {
			flex-wrap: wrap;
			justify-content: flex-start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		:global(.reveal-init) {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.orb,
		.skate-route,
		.nav-links a[aria-current='page'],
		.top-progress-sweep {
			animation: none;
		}

		.skate-rider {
			display: none;
		}

		.site-header,
		.site-nav,
		.top-progress-fill {
			transition: none;
		}
	}
</style>
