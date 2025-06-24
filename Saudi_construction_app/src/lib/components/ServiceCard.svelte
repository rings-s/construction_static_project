<!-- src/lib/components/ServiceCard.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle } from 'lucide-svelte';

	let { service } = $props();
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	// Get the appropriate features based on locale
	let currentFeatures = ($locale || 'en') === 'ar' ? service.features : (service.featuresEn || service.features);
</script>

<div class={`group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 overflow-hidden ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
	
	<!-- Subtle gradient overlay -->
	<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-50/30 dark:from-emerald-900/0 dark:via-emerald-900/0 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
	
	<div class="relative p-6">
		<!-- Compact Icon -->
		<div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30">
			<span class="text-lg">{service.icon}</span>
		</div>

		<!-- Enhanced Title with Hierarchy -->
		<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
			{($locale || 'en') === 'ar' ? service.title : service.titleEn}
		</h3>

		<!-- Refined Description -->
		<p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-medium">
			{($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
		</p>

		<!-- Compact Features List with Proper Translation -->
		{#if currentFeatures && currentFeatures.length > 0}
			<ul class="space-y-2 mb-5">
				{#each currentFeatures.slice(0, 3) as feature}
					<li class="flex items-center text-xs text-slate-600 dark:text-slate-300">
						<CheckCircle class="w-3 h-3 text-emerald-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
						<span class="font-medium">{feature}</span>
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Refined CTA -->
		<a 
			href={service.href} 
			class="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 group/cta text-sm"
		>
			{($locale || 'en') === 'ar' ? 'استكشف الخدمة' : 'Explore Service'}
			<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-3 h-3 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1 transition-transform duration-300" />
		</a>
	</div>

	<!-- Bottom accent line -->
	<div class="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
</div>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
</style>