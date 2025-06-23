<!-- src/lib/components/ServicePageLayout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		Calendar, 
		Clock, 
		ArrowRight, 
		CheckCircle, 
		Star, 
		MapPin, 
		Users, 
		Timer,
		Zap,
		Award,
		TrendingUp,
		Shield,
		Sparkles
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let { 
		title, 
		subtitle, 
		description, 
		icon, 
		features = [], 
		benefits = [], 
		process = [], 
		caseStudies = [], 
		stats = [] 
	} = $props();
	
	let mounted = $state(false);
	let currentTestimonial = $state(0);
	let heroRef = $state(null);
	let particles = $state([]);
	
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.4 + 0.2
		}));
		
		// Rotate testimonials if available
		if (caseStudies.length > 0) {
			const testimonialInterval = setInterval(() => {
				currentTestimonial = (currentTestimonial + 1) % caseStudies.length;
			}, 6000);
			
			return () => clearInterval(testimonialInterval);
		}
	});

	// Enhanced icon mapping for better visual appeal
	const enhancedIcons = {
		features: [Zap, Shield, TrendingUp, Award, Sparkles, Star],
		process: [CheckCircle, ArrowRight, Star, Award]
	};

	function getEnhancedIcon(index, type = 'features') {
		const iconSet = enhancedIcons[type] || enhancedIcons.features;
		return iconSet[index % iconSet.length];
	}
</script>

<svelte:head>
	<title>{title} - {APP_CONFIG.name}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{title} - {APP_CONFIG.name}" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section bind:this={heroRef} class="relative pt-32 pb-16 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900 overflow-hidden">
	
	<!-- Advanced Background Animation -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute rounded-full bg-gradient-to-r from-emerald-400 to-amber-500 animate-float-particle"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 4}s;
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Service Background Animation -->
		<div class="absolute inset-0 opacity-20">
			<svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
				<defs>
					<linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
						<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
						<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
						<feMerge> 
							<feMergeNode in="coloredBlur"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>
				</defs>
				
				<!-- Engineering Grid Animation -->
				{#each Array(10) as _, i}
					<g class="grid-item-{i}" transform="translate({50 + i * 100},{100 + (i % 3) * 150})">
						<rect width="60" height="60" rx="8" fill="url(#serviceGradient)" opacity="0.4" filter="url(#glow)">
							<animate attributeName="opacity" values="0.4;0.8;0.4" dur="{4 + i * 0.2}s" repeatCount="indefinite"/>
						</rect>
						<!-- Enhanced Connection lines -->
						{#if i < 9}
							<line x1="60" y1="30" x2="100" y2="30" stroke="url(#serviceGradient)" stroke-width="3" opacity="0.6"
								class="connection-line" style="animation-delay: {i * 0.3}s; filter: url(#glow);"/>
						{/if}
					</g>
				{/each}
				
				<!-- Enhanced Floating Service Icons -->
				{#each ['⚙️', '📐', '🔧', '📊', '🎯', '✅'] as serviceIcon, i}
					<g class="service-icon-{i}">
						<circle cx="{150 + i * 180}" cy="{250 + Math.sin(i * 1.5) * 80}" r="25" 
								fill="url(#serviceGradient)" opacity="0.3" filter="url(#glow)">
							<animate attributeName="r" values="20;30;20" dur="{6 + i * 0.5}s" repeatCount="indefinite"/>
						</circle>
						<text x="{150 + i * 180}" y="{250 + Math.sin(i * 1.5) * 80}" 
							  font-size="28" text-anchor="middle" dominant-baseline="central" opacity="0.8" filter="url(#glow)">
							{serviceIcon}
							<animateTransform attributeName="transform" type="translate" 
											values="0,0; 0,-25; 0,0" dur="{5 + i * 0.4}s" repeatCount="indefinite"/>
						</text>
					</g>
				{/each}
			</svg>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Animated Badge -->
			<div class={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-xl rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<div class="relative mr-3 rtl:ml-3 rtl:mr-0">
					<span class="text-2xl relative z-10">{icon}</span>
					<div class="absolute inset-0 bg-emerald-400/30 rounded-full blur-md animate-pulse"></div>
				</div>
				<Sparkles class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 animate-spin-slow" />
				{($locale || 'en') === 'ar' ? 'خدمة متخصصة' : 'Professional Service'}
			</div>
			
			<!-- Enhanced Main Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
					<span class="block bg-gradient-to-r from-emerald-400 via-white to-amber-400 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{title}
					</span>
				</h1>
			</div>
			
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-6">
					{subtitle}
				</p>
			</div>
			
			<div class={`transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in-bounce' : 'opacity-0'}`}>
				<p class="text-lg text-slate-400 max-w-3xl mx-auto">
					{description}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
{#if stats.length > 0}
<section class="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 relative overflow-hidden">
	<!-- Background Effect -->
	<div class="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-amber-50/50 dark:from-emerald-900/10 dark:to-amber-900/10"></div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center transition-all duration-1000 delay-${index * 200} ${mounted ? 'animate-fade-in-up-bounce' : 'opacity-0'}`}>
					<!-- Enhanced Stat Container -->
					<div class="relative mb-4">
						<div class="text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
							{($locale || 'en') === 'ar' && stat.valueEn ? stat.valueEn : stat.value}
						</div>
						<!-- Glow Effect -->
						<div class="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-amber-600/20 blur-lg rounded-full"></div>
					</div>
					<div class="text-slate-600 dark:text-slate-300 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn || stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Features Section -->
{#if features.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-amber-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'مميزاتنا الأساسية' : 'Our Core Features'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم حلولاً شاملة ومتقدمة لضمان نجاح مشروعك' : 'We provide comprehensive and advanced solutions to ensure your project success'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class={`group relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-bounce' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					
					<!-- Background Gradient -->
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 group-hover:from-emerald-500/10 group-hover:to-amber-500/10 rounded-3xl transition-all duration-500"></div>
					
					<!-- Enhanced Icon Container -->
					<div class="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-xl group-hover:rotate-12">
						<!-- Icon Glow Effect -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
						<!-- Enhanced Icon -->
						{#if feature.icon}
							<svelte:component this={feature.icon} class="relative z-10 w-8 h-8 text-white drop-shadow-lg" />
						{:else}
							<svelte:component this={getEnhancedIcon(index)} class="relative z-10 w-8 h-8 text-white drop-shadow-lg" />
						{/if}
						<!-- Sparkle Effect -->
						<div class="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
					</div>
					
					<!-- Content -->
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
						{($locale || 'en') === 'ar' ? feature.title : feature.titleEn || feature.title}
					</h3>
					
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn || feature.description}
					</p>

					<!-- Bottom Accent -->
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Benefits Section -->
{#if benefits.length > 0}
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-amber-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			
			<!-- Content -->
			<div>
				<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
					{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-300 mb-8">
					{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدماتنا المتخصصة أن تضيف قيمة لمشروعك' : 'Discover how our specialized services can add value to your project'}
				</p>
				
				<div class="space-y-4">
					{#each benefits as benefit, index}
						<div class={`flex items-start gap-4 transition-all duration-1000 delay-${index * 100} ${mounted ? 'animate-fade-in-left-bounce' : 'opacity-0'}`}>
							<div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full flex items-center justify-center mt-1 shadow-lg">
								<CheckCircle class="w-5 h-5 text-white" />
							</div>
							<p class="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
								{($locale || 'en') === 'ar' ? benefit.text || benefit : benefit.textEn || benefit}
							</p>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Enhanced Visual -->
			<div class={`relative transition-all duration-1000 delay-400 ${mounted ? 'animate-fade-in-right-bounce' : 'opacity-0'}`}>
				<div class="aspect-square bg-gradient-to-br from-emerald-100 via-amber-50 to-emerald-200 dark:from-emerald-900/30 dark:via-amber-900/20 dark:to-emerald-800/30 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
					<!-- Background Pattern -->
					<div class="absolute inset-0 opacity-10">
						<svg width="100%" height="100%" viewBox="0 0 100 100">
							<pattern id="service-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
								<circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
							</pattern>
							<rect width="100%" height="100%" fill="url(#service-pattern)" />
						</svg>
					</div>
					
					<div class="text-center relative z-10">
						<div class="relative mb-6">
							<div class="text-8xl">{icon}</div>
							<!-- Glow Effect -->
							<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-full blur-xl"></div>
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-black text-xl">
							{($locale || 'en') === 'ar' ? 'خدمة متميزة' : 'Excellence in Service'}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Process Section -->
{#if process.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'عمليتنا المُجرَّبة' : 'Our Proven Process'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية منظمة لضمان تحقيق أفضل النتائج' : 'We follow a structured methodology to ensure optimal results'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class={`relative transition-all duration-1000 delay-${index * 200} ${mounted ? 'animate-fade-in-up-bounce' : 'opacity-0'}`}>
					
					<!-- Enhanced Step Number -->
					<div class="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-br from-emerald-600 to-amber-600 text-white rounded-full flex items-center justify-center font-black text-sm z-10 shadow-lg">
						{index + 1}
						<!-- Glow Effect -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-full blur-md opacity-50"></div>
					</div>
					
					<!-- Enhanced Card -->
					<div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 pt-8 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
						<!-- Background Gradient -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 group-hover:from-emerald-500/10 group-hover:to-amber-500/10 rounded-2xl transition-all duration-500"></div>
						
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 relative z-10">
							{($locale || 'en') === 'ar' ? step.title : step.titleEn || step.title}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10">
							{($locale || 'en') === 'ar' ? step.description : step.descriptionEn || step.description}
						</p>
					</div>
					
					<!-- Enhanced Arrow (not for last item) -->
					{#if index < process.length - 1}
						<div class="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
							<div class="relative">
								<ArrowRight class="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-lg" />
								<!-- Glow Effect -->
								<div class="absolute inset-0 bg-emerald-500/30 rounded-full blur-sm"></div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Case Studies Section -->
{#if caseStudies.length > 0}
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/5 to-amber-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'أمثلة على مشاريعنا الناجحة وخبراتنا المتنوعة' : 'Examples of our successful projects and diverse expertise'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each caseStudies as study, index}
				<article class={`group bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-bounce' : 'opacity-0'}`} style="animation-delay: {index * 0.15}s;">
					
					<!-- Enhanced Header -->
					<div class="relative h-48 bg-gradient-to-br from-emerald-100 via-amber-50 to-emerald-200 dark:from-emerald-900/30 dark:via-amber-900/20 dark:to-emerald-800/30 flex items-center justify-center overflow-hidden">
						<!-- Background Pattern -->
						<div class="absolute inset-0 opacity-20">
							<svg width="100%" height="100%" viewBox="0 0 100 100">
								<pattern id="case-pattern-{index}" width="15" height="15" patternUnits="userSpaceOnUse">
									<circle cx="7.5" cy="7.5" r="1" fill="currentColor" opacity="0.3"/>
								</pattern>
								<rect width="100%" height="100%" fill="url(#case-pattern-{index})" />
							</svg>
						</div>
						
						<div class="text-center relative z-10">
							<div class="relative mb-3">
								<div class="text-5xl group-hover:scale-110 transition-transform duration-500">{icon}</div>
								<!-- Glow Effect -->
								<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
							</div>
							<div class="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
								{($locale || 'en') === 'ar' ? 'دراسة حالة' : 'Case Study'}
							</div>
						</div>
					</div>
					
					<!-- Enhanced Content -->
					<div class="p-6 relative">
						<!-- Background Gradient -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 group-hover:from-emerald-500/10 group-hover:to-amber-500/10 transition-all duration-500"></div>
						
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight relative z-10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? study.title : study.titleEn || study.title}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed relative z-10">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn || study.description}
						</p>
						
						<!-- Enhanced Meta Information -->
						<div class="space-y-3 text-sm relative z-10">
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<MapPin class="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.location : study.locationEn || study.location}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<Timer class="w-3 h-3 text-amber-600 dark:text-amber-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.duration : study.durationEn || study.duration}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<Users class="w-3 h-3 text-blue-600 dark:text-blue-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.team : study.teamEn || study.team}</span>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Enhanced CTA Section -->
<section class="py-24 bg-gradient-to-br from-emerald-600 via-slate-600 to-amber-600 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="mb-8">
			<div class="relative inline-block mb-6">
				<div class="text-6xl">{icon}</div>
				<!-- Enhanced Glow Effect -->
				<div class="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-amber-400/30 rounded-full blur-2xl animate-pulse"></div>
			</div>
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-4">
				{($locale || 'en') === 'ar' ? 'ابدأ مشروعك معنا اليوم' : 'Start Your Project with Us Today'}
			</h2>
			<p class="text-xl text-emerald-100 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'تواصل معنا للحصول على استشارة مجانية ومناقشة كيف يمكننا مساعدتك في تحقيق أهدافك'
					: 'Contact us for a free consultation and discuss how we can help you achieve your goals'
				}
			</p>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center px-12 py-5 bg-white text-emerald-600 font-black rounded-2xl hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
			>
				{($locale || 'en') === 'ar' ? 'تواصل معنا' : 'Contact Us'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/services" 
				class="inline-flex items-center px-12 py-5 bg-emerald-700/80 backdrop-blur-xl text-white font-black rounded-2xl hover:bg-emerald-600/80 transition-all duration-300 border-2 border-emerald-500/50 hover:scale-105 hover:shadow-2xl"
			>
				{($locale || 'en') === 'ar' ? 'جميع الخدمات' : 'All Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes */
	@keyframes fadeInBounce {
		0% { opacity: 0; transform: translateY(30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateY(-5px) scale(1.05); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}
	
	@keyframes slideInUpBounce {
		0% { opacity: 0; transform: translateY(50px) scale(0.9); }
		60% { opacity: 0.8; transform: translateY(-10px) scale(1.02); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}
	
	@keyframes fadeInUpBounce {
		0% { opacity: 0; transform: translateY(30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateY(-5px) scale(1.02); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}
	
	@keyframes fadeInLeftBounce {
		0% { opacity: 0; transform: translateX(-30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateX(5px) scale(1.02); }
		100% { opacity: 1; transform: translateX(0) scale(1); }
	}
	
	@keyframes fadeInRightBounce {
		0% { opacity: 0; transform: translateX(30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateX(-5px) scale(1.02); }
		100% { opacity: 1; transform: translateX(0) scale(1); }
	}

	@keyframes gradientFlow {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	@keyframes floatSlow {
		0%, 100% { transform: translateY(0px) scale(1); }
		50% { transform: translateY(-30px) scale(1.05); }
	}

	@keyframes floatReverse {
		0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
		50% { transform: translateY(25px) scale(0.95) rotate(180deg); }
	}

	@keyframes pulseSubtle {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.02); }
	}

	@keyframes floatParticle {
		0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
		50% { transform: translateY(-15px) scale(1.1); opacity: 0.8; }
	}

	@keyframes lightRay {
		0%, 100% { opacity: 0.2; transform: scaleY(1); }
		50% { opacity: 0.5; transform: scaleY(1.2); }
	}

	@keyframes lightRayReverse {
		0%, 100% { opacity: 0.3; transform: scaleY(1) rotate(-12deg); }
		50% { opacity: 0.6; transform: scaleY(1.3) rotate(-12deg); }
	}

	@keyframes spinSlow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
	
	@keyframes connectionAnimate {
		0% { stroke-dasharray: 0 100; }
		100% { stroke-dasharray: 100 0; }
	}
	
	/* Enhanced Animation Classes */
	.animate-fade-in-bounce { animation: fadeInBounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-slide-in-up-bounce { animation: slideInUpBounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-bounce { animation: fadeInUpBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-left-bounce { animation: fadeInLeftBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-right-bounce { animation: fadeInRightBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-gradient-flow { 
		background-size: 200% 200%;
		animation: gradientFlow 6s ease infinite;
	}
	.animate-float-slow { animation: floatSlow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: floatReverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulseSubtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: floatParticle 4s ease-in-out infinite; }
	.animate-light-ray { animation: lightRay 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: lightRayReverse 10s ease-in-out infinite; }
	.animate-spin-slow { animation: spinSlow 3s linear infinite; }
	.connection-line { animation: connectionAnimate 2s ease-out; }

	/* Utility Classes */
	.bg-300\% { background-size: 300% 300%; }
	.shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle,
	.animate-gradient-flow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Dark mode enhancements */
	.dark .backdrop-blur-xl {
		backdrop-filter: blur(24px) saturate(180%);
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>