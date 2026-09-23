<script>
	import '@picocss/pico';
	import { page } from '$app/stores';
	import Tour from '$lib/Tour.svelte';
	export let data;

	const labels = {
		homepage: 'Home',
		resources: 'Resources',
		basics: 'Basics',
		contact: 'Contact'
	};

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

<div class="app-shell">
	<div class="ambient" data-tour="motion" aria-hidden="true">
		<span class="orb orb-violet" />
		<span class="orb orb-cyan" />
		<span class="orb orb-pink" />
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

	<header class="site-header">
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
						aria-current={$page.url.pathname ===
						(navItem.uid === 'homepage' ? '/' : `/${navItem.uid}`)
							? 'page'
							: undefined}
					>
						{labels[navItem.uid] ?? navItem.uid}
					</a>
				{/each}
			</div>
		</nav>
	</header>

	<main id="main-content" class="site-main">
		<slot />
	</main>

	<footer class="site-footer" data-tour="operations">
		<a class="footer-brand" href="/">Skatex</a>
		<p>Built for the ones who keep rolling.</p>
		<span class="footer-rule" />
		<small>Skate culture, in motion.</small>
	</footer>

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

	.app-shell {
		position: relative;
		isolation: isolate;
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		overflow: hidden;
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

	:global(body.tour-open) .site-header,
	:global(body.tour-open) .site-main,
	:global(body.tour-open) .site-footer {
		z-index: 100;
	}

	.site-header {
		position: relative;
		z-index: 2;
		width: min(100% - 40px, 1120px);
		margin: 20px auto 0;
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
		animation: nav-tab-bounce 420ms cubic-bezier(0.34, 1.42, 0.64, 1);
		transform-origin: center;
	}

	.site-main {
		position: relative;
		z-index: 1;
		width: min(100% - 40px, 1120px);
		flex: 1;
		margin: clamp(30px, 4vw, 52px) auto clamp(48px, 6vw, 68px);
	}

	.site-footer {
		position: relative;
		z-index: 1;
		display: grid;
		width: min(100% - 40px, 1120px);
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 22px;
		margin: 0 auto 28px;
		padding: 22px 4px 0;
		border-top: 1px solid rgba(207, 202, 255, 0.12);
		color: #85849a;
	}

	.footer-brand {
		color: #e8e4ff;
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.site-footer p,
	.site-footer small {
		margin: 0;
		color: inherit;
		font-size: 0.78rem;
	}

	.site-footer p {
		justify-self: center;
	}

	.footer-rule {
		display: none;
	}

	@keyframes skate-trail-reverse {
		to {
			stroke-dashoffset: 1000;
		}
	}

	@keyframes nav-tab-bounce {
		0% {
			transform: translateY(3px) scale(0.92);
		}
		58% {
			transform: translateY(-2px) scale(1.06);
		}
		82% {
			transform: translateY(1px) scale(0.99);
		}
		100% {
			transform: translateY(0) scale(1);
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

		.site-main {
			margin-top: 30px;
			margin-bottom: 48px;
		}

		.site-footer {
			grid-template-columns: 1fr auto;
			gap: 8px 16px;
			padding-top: 18px;
		}

		.site-footer p {
			grid-row: 2;
			justify-self: start;
		}

		.site-footer small {
			grid-column: 2;
			grid-row: 1 / span 2;
			text-align: right;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		.orb,
		.skate-route,
		.nav-links a[aria-current='page'] {
			animation: none;
		}

		.skate-rider {
			display: none;
		}
	}
</style>
