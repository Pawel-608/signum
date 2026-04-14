<script lang="ts">
	let activeSection = $state('overview');

	function handleScroll() {
		const sections = document.querySelectorAll<HTMLElement>('section, #overview');
		sections.forEach((s) => {
			if (window.scrollY >= s.offsetTop - 200) {
				activeSection = s.id;
			}
		});
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-12 py-6 max-md:px-6"
	style="background: rgba(242, 241, 236, 0.8); backdrop-filter: blur(20px);"
>
	<a
		href="#"
		class="font-display text-[0.9rem] font-bold tracking-[0.1em] uppercase no-underline text-text-primary"
	>
		Signum
	</a>
	<div class="hidden md:flex items-center gap-8">
		{#each [['protocols', 'Protocols'], ['matrix', 'Risk Matrix']] as [id, label]}
			<a
				href="#{id}"
				class="font-mono text-[0.7rem] tracking-[0.04em] no-underline transition-colors duration-300
					{activeSection === id ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}"
			>
				{label}
			</a>
		{/each}
		<a
			href="/pitch"
			class="font-mono text-[0.7rem] tracking-[0.04em] no-underline text-accent hover:text-accent-hover transition-colors duration-300"
		>
			Deck &rarr;
		</a>
	</div>
</nav>
