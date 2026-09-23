<script>
	import * as prismicH from '@prismicio/helpers';
	import { cursorGlow } from '$lib/cursorGlow';
	import { normalizeUiText } from '$lib/typography';
	export let slice;

	const image = slice.primary.optional_image;
	const imageSrc = image ? prismicH.asImageWidthSrcSet(image) : null;
	const portrait = image?.dimensions?.height > image?.dimensions?.width;
	const reverse = slice.primary.image_side === 'right';
</script>

<section
	class:reverse
	class="feature-grid"
	aria-label="Featured skate content"
	data-tour="feature"
	use:cursorGlow
>
	{#if imageSrc}
		<div class="image-frame" class:portrait>
			<img
				src={imageSrc.src}
				srcset={imageSrc.srcset}
				alt={normalizeUiText(image.alt)}
				loading="lazy"
			/>
		</div>
	{/if}
	<div class="feature-copy">
		<span class="feature-index">Skatex field notes</span>
		<div class="feature-description">
			{@html normalizeUiText(prismicH.asHTML(slice.primary.description))}
		</div>
	</div>
</section>

<style>
	.feature-grid {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: grid;
		max-width: 1000px;
		grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(20px, 3vw, 40px);
		margin: 0 auto;
		padding: clamp(16px, 2.5vw, 24px);
		border: 1px solid rgba(207, 202, 255, 0.13);
		border-radius: 24px;
		background: linear-gradient(130deg, rgba(28, 27, 53, 0.97), rgba(14, 15, 31, 0.96));
		box-shadow: 0 18px 56px rgba(0, 0, 0, 0.18), inset 0 1px rgba(255, 255, 255, 0.04);
	}

	.feature-grid::before {
		position: absolute;
		z-index: 0;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			320px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(135, 109, 255, 0.18),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.feature-grid > * {
		position: relative;
		z-index: 1;
	}

	.feature-grid.reverse {
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr);
	}

	.feature-grid.reverse .image-frame {
		grid-column: 2;
		grid-row: 1;
	}

	.feature-grid.reverse .feature-copy {
		grid-column: 1;
		grid-row: 1;
	}

	.image-frame {
		position: relative;
		min-width: 0;
		overflow: hidden;
		aspect-ratio: 1.32;
		border: 1px solid rgba(156, 137, 255, 0.22);
		border-radius: 18px;
		background: #131428;
		box-shadow: 0 0 34px rgba(122, 67, 255, 0.1);
	}

	.image-frame.portrait {
		background: #05060b;
	}

	.image-frame.portrait img {
		object-fit: contain;
	}

	.image-frame::after {
		position: absolute;
		inset: 0;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: inherit;
		content: '';
		pointer-events: none;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	.feature-grid:hover img {
		transform: scale(1.035);
	}

	.feature-grid:hover .image-frame.portrait img {
		transform: scale(1.015);
	}

	.feature-copy {
		max-width: 390px;
		padding: clamp(6px, 1.5vw, 18px);
	}

	.feature-index {
		display: inline-block;
		margin-bottom: 14px;
		color: #86eaf2;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.17em;
		text-transform: uppercase;
	}

	.feature-description {
		color: #cfccdd;
		font-size: clamp(1rem, 1.8vw, 1.18rem);
		line-height: 1.7;
	}

	.feature-description :global(p) {
		margin: 0;
	}

	@media (max-width: 760px) {
		.feature-grid,
		.feature-grid.reverse {
			grid-template-columns: 1fr;
			gap: 18px;
			border-radius: 21px;
		}

		.feature-grid.reverse .image-frame,
		.feature-grid.reverse .feature-copy {
			grid-column: 1;
			grid-row: auto;
		}

		.feature-grid.reverse .image-frame {
			order: 1;
		}

		.feature-grid.reverse .feature-copy {
			order: 2;
		}

		.feature-copy {
			padding: 8px 4px 12px;
		}
	}
</style>
