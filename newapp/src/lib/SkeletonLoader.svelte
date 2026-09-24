<div class="skeleton-page" aria-hidden="true">
	<div class="skeleton-block skeleton-hero" />
	<div class="skeleton-grid">
		<div class="skeleton-block skeleton-tile" />
		<div class="skeleton-block skeleton-tile" />
	</div>
	<div class="skeleton-block skeleton-line" />
	<div class="skeleton-block skeleton-line short" />
</div>

<style>
	.skeleton-page {
		display: grid;
		gap: clamp(20px, 3vw, 32px);
	}

	.skeleton-block {
		position: relative;
		overflow: hidden;
		border: 1px solid rgba(207, 202, 255, 0.12);
		border-radius: 22px;
		background: rgba(20, 21, 40, 0.65);
	}

	.skeleton-block::after {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			transparent 30%,
			rgba(167, 139, 255, 0.14) 48%,
			rgba(141, 235, 241, 0.16) 52%,
			transparent 70%
		);
		background-size: 200% 100%;
		animation: skeleton-shimmer 1.6s ease-in-out infinite;
		content: '';
	}

	.skeleton-hero {
		height: clamp(180px, 26vw, 260px);
	}

	.skeleton-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: clamp(16px, 2.5vw, 28px);
	}

	.skeleton-tile {
		height: clamp(200px, 24vw, 280px);
	}

	.skeleton-line {
		height: 64px;
	}

	.skeleton-line.short {
		max-width: 60%;
	}

	@keyframes skeleton-shimmer {
		0% {
			background-position: -120% 0;
		}
		100% {
			background-position: 120% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton-block::after {
			animation: none;
		}
	}
</style>
