<!-- src/lib/components/ServiceCard.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { ArrowRight, CheckCircle } from 'lucide-svelte';

	let { service } = $props();
</script>

<div class="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
	<div class="p-8">
		<!-- Icon -->
		<div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
			<span class="text-3xl">{service.icon}</span>
		</div>

		<!-- Title -->
		<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
			{$_(service.title)}
		</h3>

		<!-- Description -->
		<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
			{$_(service.description)}
		</p>

		<!-- Features -->
		{#if service.features}
			<ul class="space-y-3 mb-8">
				{#each service.features as feature}
					<li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
						<CheckCircle class="w-4 h-4 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
						{feature}
					</li>
				{/each}
			</ul>
		{/if}

		<!-- CTA -->
		<a 
			href={service.href} 
			class="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
		>
			Learn More
			<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
		</a>
	</div>
</div>