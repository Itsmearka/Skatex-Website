<script>
	import { prefersReducedMotion } from '$lib/motion';

	// Placeholder figures for demo purposes only — swap in real numbers
	// from Prismic (or an analytics source) before this ships to production.
	export let stats = [
		{ value: 480, suffix: '+', label: 'Guides & field notes' },
		{ value: 120, suffix: '', label: 'Parks mapped' },
		{ value: 18, suffix: 'K', label: 'Riders in the community' },
		{ value: 9, suffix: ' yrs', label: 'Rolling since' }
	];

	let counted = false;

	function countUp(node) {
		if (prefersReducedMotion()) {
			node.textContent = formatValue(node.dataset.target, node.dataset.suffix);
			return {};
		}

		const target = Number(node.dataset.target);
		const suffix = node.dataset.suffix ?? '';
		const duration = 1100;
		let startTime = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			node.textContent = formatValue(Math.round(target * eased), suffix);
			if (progress < 1) requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
		return {};
	}

	function formatValue(value, suffix) {
		return `${value}${suffix}`;
	}

	function handleReveal(node) {
		if (prefersReducedMotion()) {
			node.querySelectorAll('.stat-value').forEach((el) => countUp(el));
			return {};
		}

		node.classList.add('reveal-init');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !counted) {
						counted = true;
						node.classList.add('is-revealed');
						node.querySelectorAll('.stat-value').forEach((el) => countUp(el));
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section class="stats-strip" aria-label="Skatex by the numbers" use:handleReveal>
	{#each stats as stat, index (stat.label)}
		<div class="stat" style={`--stagger: ${index}`}>
			<p class="stat-value" data-target={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</p>
			<p class="stat-label">{stat.label}</p>
		</div>
	{/each}
</section>

<style>
	.stats-strip {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: clamp(16px, 3vw, 28px);
		max-width: 1000px;
		margin: 0 auto;
		padding: clamp(22px, 4vw, 36px);
		border: 1px solid rgba(207, 202, 255, 0.13);
		border-radius: 24px;
		background: linear-gradient(130deg, rgba(28, 27, 53, 0.9), rgba(14, 15, 31, 0.9));
		box-shadow: 0 18px 56px rgba(0, 0, 0, 0.18), inset 0 1px rgba(255, 255, 255, 0.04);
	}

	.stat {
		text-align: center;
	}

	.stat-value {
		margin: 0;
		color: #f7f5ff;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		font-weight: 850;
		letter-spacing: -0.04em;
		background: linear-gradient(120deg, #a5f3fc, #c4b5fd 55%, #f9a8d4);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.stat-label {
		margin: 6px 0 0;
		color: #aaa9bd;
		font-size: 0.82rem;
		font-weight: 650;
	}

	@media (max-width: 620px) {
		.stats-strip {
			grid-template-columns: repeat(2, 1fr);
			border-radius: 20px;
		}
	}
</style>
