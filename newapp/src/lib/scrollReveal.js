import { prefersReducedMotion } from '$lib/motion';

/**
 * Svelte action that fades/rises an element into view the first time it
 * crosses into the viewport. No-ops entirely under reduced-motion.
 */
export function reveal(node, options = {}) {
	if (prefersReducedMotion()) {
		node.classList.add('is-revealed');
		return {};
	}

	const { delay = 0 } = options;
	node.classList.add('reveal-init');
	node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-revealed');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
