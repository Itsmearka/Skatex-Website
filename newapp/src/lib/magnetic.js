import { prefersReducedMotion, isCoarsePointer } from '$lib/motion';

/**
 * Svelte action that gently pulls an element toward the pointer while it is
 * nearby, and springs back on leave. The offset is lerped in a rAF loop so
 * motion stays smooth, and pointer distance is measured from the element's
 * resting center (not its already-shifted position) to avoid oscillation.
 * Purely cosmetic transform, so it never interferes with click targets.
 */
export function magnetic(node, options = {}) {
	if (prefersReducedMotion() || isCoarsePointer()) return {};

	const { strength = 0.28, ease = 0.18 } = options;

	node.classList.add('is-magnetic');

	let rafId = null;
	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;

	function write() {
		node.style.setProperty('--magnet-x', `${currentX.toFixed(2)}px`);
		node.style.setProperty('--magnet-y', `${currentY.toFixed(2)}px`);
	}

	function tick() {
		currentX += (targetX - currentX) * ease;
		currentY += (targetY - currentY) * ease;

		if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05) {
			currentX = targetX;
			currentY = targetY;
			write();
			rafId = null;
			return;
		}

		write();
		rafId = requestAnimationFrame(tick);
	}

	function wake() {
		if (rafId === null) rafId = requestAnimationFrame(tick);
	}

	const handleMove = (event) => {
		const bounds = node.getBoundingClientRect();
		// Subtract the current pull so the target is measured from where the
		// element would sit at rest, not where it has already drifted to.
		const centerX = bounds.left + bounds.width / 2 - currentX;
		const centerY = bounds.top + bounds.height / 2 - currentY;
		targetX = (event.clientX - centerX) * strength;
		targetY = (event.clientY - centerY) * strength;
		wake();
	};

	const handleLeave = () => {
		targetX = 0;
		targetY = 0;
		wake();
	};

	node.addEventListener('pointermove', handleMove, { passive: true });
	node.addEventListener('pointerleave', handleLeave, { passive: true });

	return {
		destroy() {
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
			if (rafId !== null) cancelAnimationFrame(rafId);
			node.classList.remove('is-magnetic');
		}
	};
}
