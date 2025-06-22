<!-- src/lib/components/StatsSection.svelte -->
<script>
	import { onMount } from 'svelte';
	
	let { stats } = $props();
	
	let statsSection;
	let animated = $state(false);
	
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !animated) {
					animated = true;
					animateStats();
				}
			});
		});
		
		if (statsSection) {
			observer.observe(statsSection);
		}
		
		return () => observer.disconnect();
	});
	
	function animateStats() {
		stats.forEach((stat, index) => {
			const element = document.getElementById(`stat-${index}`);
			if (element) {
				const finalValue = parseInt(stat.value.replace(/\D/g, ''));
				const duration = 2000;
				const increment = finalValue / (duration / 16);
				let current = 0;
				
				const timer = setInterval(() => {
					current += increment;
					if (current >= finalValue) {
						current = finalValue;
						clearInterval(timer);
					}
					
					const suffix = stat.value.replace(/\d/g, '');
					element.textContent = Math.floor(current) + suffix;
				}, 16);
			}
		});
	}
</script>

<section bind:this={statsSection} class="py-24 bg-gradient-to-r from-primary-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class="text-center">
					<div id="stat-{index}" class="text-4xl lg:text-5xl font-bold text-white mb-2">
						{stat.value}
					</div>
					<div class="text-primary-100 font-medium">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>