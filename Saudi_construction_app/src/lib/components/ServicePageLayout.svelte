<script>
	import { _ } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Star, Users, Clock, MapPin } from 'lucide-svelte';

	let { 
		title,
		subtitle,
		description,
		icon,
		features = [],
		benefits = [],
		caseStudies = [],
		process = [],
		stats = [],
		children
	} = $props();
</script>

<svelte:head>
	<title>{title} - Transport Engineering Consultancy</title>
	<meta name="description" content={description} />
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 relative overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<pattern id="service-grid" width="10" height="10" patternUnits="userSpaceOnUse">
					<path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
				</pattern>
			</defs>
			<rect width="100" height="100" fill="url(#service-grid)" />
		</svg>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
		<div class="text-center">
			<!-- Icon -->
			<div class="inline-flex items-center justify-center w-20 h-20 bg-primary-500/20 backdrop-blur-sm rounded-2xl border border-primary-500/30 mb-8">
				<span class="text-4xl">{icon}</span>
			</div>
			
			<h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
				{title}
			</h1>
			<p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
				{subtitle}
			</p>
			<p class="text-lg text-slate-400 max-w-3xl mx-auto">
				{description}
			</p>
		</div>
	</div>
</section>

<!-- Features Section -->
{#if features.length > 0}
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('pages.features_capabilities')}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{$_('pages.features_subtitle')}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature}
				<div class="group bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
						<svelte:component this={feature.icon} class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
						{feature.title}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Benefits Section -->
{#if benefits.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div>
				<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8">
					{$_('pages.why_choose')}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-300 mb-8">
					{$_('pages.why_choose_subtitle')}
				</p>
				<ul class="space-y-4">
					{#each benefits as benefit}
						<li class="flex items-start">
							<CheckCircle class="w-6 h-6 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 mt-0.5 flex-shrink-0" />
							<span class="text-slate-700 dark:text-slate-300">{benefit}</span>
						</li>
					{/each}
				</ul>
			</div>
			
			<div class="relative">
				<div class="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
					<div class="w-full h-96 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center rounded-2xl">
						<span class="text-6xl opacity-50">{icon}</span>
					</div>
				</div>
				<div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
					<div class="text-3xl font-bold text-primary-600 mb-1">500+</div>
					<div class="text-slate-600 dark:text-slate-300 font-medium">{$_('pages.successful_projects')}</div>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Process Section -->
{#if process.length > 0}
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('pages.our_process')}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{$_('pages.process_subtitle')}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class="text-center group">
					<div class="relative mb-6">
						<div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
							<span class="text-white font-bold text-xl">{index + 1}</span>
						</div>
						{#if index < process.length - 1}
							<div class="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-8"></div>
						{/if}
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
						{step.title}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">
						{step.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Case Studies Section -->
{#if caseStudies.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('pages.success_stories')}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{$_('pages.success_stories_subtitle')}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each caseStudies as study}
				<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700">
						<div class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
							<span class="text-4xl">{icon}</span>
						</div>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{study.title}</h3>
						<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{study.description}</p>
						
						<div class="grid grid-cols-3 gap-4 text-center border-t border-slate-200 dark:border-slate-700 pt-4">
							<div>
								<MapPin class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{$_('pages.location')}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{study.location}</div>
							</div>
							<div>
								<Clock class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{$_('pages.duration')}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{study.duration}</div>
							</div>
							<div>
								<Users class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{$_('pages.team')}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{study.team}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Stats Section -->
{#if stats.length > 0}
<section class="py-24 bg-gradient-to-r from-primary-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-4xl lg:text-5xl font-bold text-white mb-2">
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
{/if}

<!-- Additional Content Slot -->
{#if children}
	{@render children()}
{/if}

<!-- CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
			{$_('pages.ready_to_start')}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
			{$_('pages.ready_subtitle')}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
			>
				{$_('pages.start_project')}
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/about" 
				class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
			>
				{$_('pages.learn_more_about_us')}
			</a>
		</div>
	</div>
</section>