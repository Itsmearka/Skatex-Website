<script>
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { cursorGlow } from '$lib/cursorGlow';

	export let pages = [];

	const labels = {
		homepage: 'Home',
		resources: 'Resources',
		basics: 'Basics',
		contact: 'Contact'
	};

	let isOpen = false;
	let query = '';
	let input;
	let activeIndex = 0;

	$: navResults = (pages ?? []).map((navItem) => ({
		id: navItem.id,
		label: labels[navItem.uid] ?? navItem.uid,
		hint: 'Page',
		href: navItem.uid === 'homepage' ? '/' : `/${navItem.uid}`
	}));

	$: actionResults = [
		{ id: '__tour', label: 'Take a guided tour', hint: 'Action', action: 'tour' }
	];

	$: results = [...navResults, ...actionResults].filter((item) =>
		item.label.toLowerCase().includes(query.trim().toLowerCase())
	);

	$: activeIndex = query !== undefined ? 0 : activeIndex;

	export async function open() {
		isOpen = true;
		query = '';
		activeIndex = 0;
		await tick();
		input?.focus();
	}

	export function close() {
		isOpen = false;
	}

	function selectResult(item) {
		if (!item) return;
		if (item.action === 'tour') {
			window.dispatchEvent(new CustomEvent('skatex:start-tour'));
		} else if (item.href) {
			goto(item.href);
		}
		close();
	}

	function handleGlobalKeydown(event) {
		const isMeta = event.metaKey || event.ctrlKey;
		if (isMeta && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			isOpen ? close() : open();
		} else if (event.key === 'Escape' && isOpen) {
			close();
		}
	}

	function handleInputKeydown(event) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			activeIndex = Math.min(activeIndex + 1, Math.max(results.length - 1, 0));
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			activeIndex = Math.max(activeIndex - 1, 0);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			selectResult(results[activeIndex]);
		}
	}
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

{#if isOpen}
	<div class="palette-layer">
		<button
			class="palette-backdrop"
			type="button"
			aria-label="Close command palette"
			on:click={close}
		/>
		<div
			class="palette-card"
			use:cursorGlow
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
		>
			<div class="palette-input-row">
				<span class="palette-icon" aria-hidden="true">⌘</span>
				<input
					bind:this={input}
					bind:value={query}
					on:keydown={handleInputKeydown}
					type="text"
					placeholder="Jump to a page, or take the tour…"
					aria-label="Search pages and actions"
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd>Esc</kbd>
			</div>
			<ul class="palette-results" role="listbox">
				{#if results.length === 0}
					<li class="palette-empty">No matches. Try a different search.</li>
				{/if}
				{#each results as item, index (item.id)}
					<li>
						<button
							type="button"
							class="palette-result"
							class:is-active={index === activeIndex}
							role="option"
							aria-selected={index === activeIndex}
							on:mouseenter={() => (activeIndex = index)}
							on:click={() => selectResult(item)}
						>
							<span>{item.label}</span>
							<span class="palette-hint">{item.hint}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.palette-layer {
		position: fixed;
		z-index: 1300;
		inset: 0;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: clamp(72px, 16vh, 160px) 16px 16px;
	}

	.palette-backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: rgba(4, 5, 12, 0.62);
		backdrop-filter: blur(4px);
	}

	.palette-card {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		width: min(560px, 100%);
		border: 1px solid rgba(147, 132, 255, 0.38);
		border-radius: 20px;
		background: linear-gradient(145deg, rgba(25, 26, 50, 0.98), rgba(11, 13, 27, 0.98));
		box-shadow: 0 30px 100px rgba(0, 0, 0, 0.55), 0 0 40px rgba(129, 87, 255, 0.16);
		backdrop-filter: blur(22px);
		animation: palette-in 180ms cubic-bezier(0.2, 0.8, 0.3, 1);
	}

	.palette-card::before {
		position: absolute;
		z-index: 0;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			280px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
			rgba(135, 109, 255, 0.16),
			transparent 72%
		);
		opacity: var(--cursor-glow-opacity, 0);
		transition: opacity 180ms ease;
		content: '';
		pointer-events: none;
	}

	.palette-card > * {
		position: relative;
		z-index: 1;
	}

	.palette-input-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 18px 20px;
		border-bottom: 1px solid rgba(207, 202, 255, 0.12);
	}

	.palette-icon {
		color: #8debf1;
		font-size: 1rem;
	}

	.palette-input-row input {
		flex: 1;
		border: 0;
		background: transparent;
		color: #f6f4ff;
		font-size: 1rem;
		font-family: inherit;
		outline: none;
	}

	.palette-input-row input::placeholder {
		color: #7a7891;
	}

	.palette-input-row kbd {
		padding: 3px 7px;
		border: 1px solid rgba(207, 202, 255, 0.22);
		border-radius: 6px;
		color: #aaa9bd;
		font-size: 0.7rem;
		font-family: inherit;
	}

	.palette-results {
		max-height: min(360px, 50vh);
		margin: 0;
		padding: 8px;
		list-style: none;
		overflow-y: auto;
	}

	.palette-empty {
		padding: 18px 12px;
		color: #85849a;
		font-size: 0.86rem;
		text-align: center;
	}

	.palette-result {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 12px 14px;
		border: 0;
		border-radius: 12px;
		background: transparent;
		color: #e7e4f3;
		font-size: 0.92rem;
		font-weight: 650;
		text-align: left;
		cursor: pointer;
		transition: background 120ms ease, color 120ms ease;
	}

	.palette-result.is-active,
	.palette-result:hover {
		background: rgba(137, 96, 255, 0.16);
		color: #fff;
	}

	.palette-hint {
		color: #85849a;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.palette-result.is-active .palette-hint,
	.palette-result:hover .palette-hint {
		color: #8debf1;
	}

	@keyframes palette-in {
		from {
			transform: translateY(-8px) scale(0.98);
			opacity: 0;
		}
		to {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.palette-card {
			animation: none;
		}
	}
</style>
