import { prefersReducedMotion, isCoarsePointer } from '$lib/motion';

/**
 * Svelte action that applies a subtle pointer-driven 3D tilt to a node,
 * exposing --tilt-x / --tilt-y for companion CSS (shine, parallax, etc).
 */
export function tilt(node, options = {}) {
	if (prefersReducedMotion() || isCoarsePointer()) return {};

	const { max = 7, scale = 1.02 } = options;

	const handleMove = (event) => {
		const bounds = node.getBoundingClientRect();
		const px = (event.clientX - bounds.left) / bounds.width;
		const py = (event.clientY - bounds.top) / bounds.height;
		const rotateY = (px - 0.5) * max * 2;
		const rotateX = (0.5 - py) * max * 2;
		node.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
		node.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
		node.style.setProperty('--tilt-scale', `${scale}`);
	};

	const handleLeave = () => {
		node.style.setProperty('--tilt-x', '0deg');
		node.style.setProperty('--tilt-y', '0deg');
		node.style.setProperty('--tilt-scale', '1');
	};

	node.addEventListener('pointermove', handleMove, { passive: true });
	node.addEventListener('pointerleave', handleLeave, { passive: true });

	return {
		destroy() {
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
		}
	};
}
