<script>
	import { page } from '$app/stores';
	import { cursorGlow } from '$lib/cursorGlow';
	import { magnetic } from '$lib/magnetic';
	import { reveal } from '$lib/scrollReveal';

	$: status = $page.status;
	$: isNotFound = status === 404;
</script>

<svelte:head>
	<title>{status} | Skatex</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error-page" aria-labelledby="error-title">
	<div class="error-orbit orbit-one" aria-hidden="true" />
	<div class="error-orbit orbit-two" aria-hidden="true" />
	<div class="error-card" use:cursorGlow use:reveal>
		<p class="error-code">{status}</p>
		<p class="error-kicker">{isNotFound ? 'Off the map' : 'A little detour'}</p>
		<h1 id="error-title">
			{isNotFound ? 'That line is out of bounds.' : 'Something went off course.'}
		</h1>
		<p class="error-copy">
			{isNotFound
				? 'We could not find the page you were looking for. It may have moved, or the address may be off.'
				: 'The page could not load right now. Give it another try, or head back to the start.'}
		</p>
		<div class="error-actions">
			<a class="home-button" use:magnetic href="/">Back to home</a>
			<a class="secondary-link" href="/resources">Explore resources</a>
		</div>
	</div>
</section>

<style>
	.error-page {
		position: relative;
		display: grid;
		min-height: min(68vh, 680px);
		place-items: center;
		overflow: hidden;
		padding: clamp(24px, 7vw, 80px) 0;
	}

	.error-card {
		position: relative;
		z-index: 1;
		isolation: isolate;
		overflow: hidden;
		width: min(100%, 680px);
		padding: clamp(26px, 6vw, 56px);
		border: 1px solid rgba(207, 202, 255, 0.15);
		border-radius: 26px;
		background: linear-gradient(145deg, rgba(25, 25, 49, 0.9), rgba(13, 14, 29, 0.82));
		box-shadow: 0 30px 100px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(20px);
	}

	.error-card::after {
		position: absolute;
		z-index: 0;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			280px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(116, 218, 255, 0.16),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.error-card > * {
		position: relative;
		z-index: 1;
	}

	.error-code {
		position: absolute;
		top: 8px;
		right: clamp(20px, 6vw, 58px);
		margin: 0;
		color: rgba(160, 142, 255, 0.08);
		font-size: clamp(7rem, 22vw, 15rem);
		font-weight: 900;
		letter-spacing: -0.1em;
		line-height: 1;
		pointer-events: none;
		user-select: none;
	}

	.error-kicker {
		position: relative;
		margin: 0 0 18px;
		color: #85eaf1;
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	h1 {
		position: relative;
		max-width: 600px;
		margin: 0;
		color: #f8f6ff;
		font-size: clamp(2.25rem, 6vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.065em;
		line-height: 0.98;
	}

	.error-copy {
		position: relative;
		max-width: 510px;
		margin: 24px 0 0;
		color: #b5b3c7;
		font-size: clamp(1rem, 2vw, 1.14rem);
		line-height: 1.75;
	}

	.error-actions {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px 24px;
		margin-top: 34px;
	}

	.home-button {
		display: inline-flex;
		min-height: 50px;
		align-items: center;
		justify-content: center;
		padding: 0 22px;
		border: 1px solid rgba(132, 231, 243, 0.5);
		border-radius: 999px;
		background: linear-gradient(110deg, #9af0e8, #a6a0ff);
		box-shadow: 0 8px 32px rgba(108, 217, 229, 0.17);
		color: #101222;
		font-size: 0.9rem;
		font-weight: 800;
		transition: transform 160ms ease, box-shadow 160ms ease;
	}

	.home-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 38px rgba(108, 217, 229, 0.26);
		color: #101222;
	}

	.secondary-link {
		color: #d7d4e7;
		font-size: 0.9rem;
		font-weight: 650;
	}

	.secondary-link:hover {
		color: #8cecf2;
	}

	.error-orbit {
		position: absolute;
		width: 270px;
		aspect-ratio: 1;
		border: 1px solid rgba(151, 125, 255, 0.18);
		border-radius: 50%;
		box-shadow: 0 0 60px rgba(117, 42, 255, 0.12), inset 0 0 60px rgba(117, 42, 255, 0.08);
		pointer-events: none;
	}

	.orbit-one {
		top: 2%;
		right: 2%;
	}

	.orbit-two {
		bottom: -12%;
		left: 1%;
		width: 200px;
		border-color: rgba(113, 231, 244, 0.16);
		box-shadow: 0 0 60px rgba(0, 188, 212, 0.1), inset 0 0 50px rgba(0, 188, 212, 0.06);
	}

	@media (max-width: 600px) {
		.error-page {
			min-height: 60vh;
		}

		.error-card {
			border-radius: 24px;
		}

		.error-code {
			top: 22px;
		}

		.error-actions {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
