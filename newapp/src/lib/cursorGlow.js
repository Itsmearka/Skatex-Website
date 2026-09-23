export function cursorGlow(node) {
	const handlePointerMove = (event) => {
		if (event.pointerType === 'touch') return;
		const bounds = node.getBoundingClientRect();
		node.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
		node.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
		node.style.setProperty('--cursor-glow-opacity', '1');
	};

	const handlePointerLeave = () => node.style.setProperty('--cursor-glow-opacity', '0');

	node.addEventListener('pointermove', handlePointerMove, { passive: true });
	node.addEventListener('pointerleave', handlePointerLeave, { passive: true });

	return {
		destroy() {
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerleave', handlePointerLeave);
		}
	};
}
