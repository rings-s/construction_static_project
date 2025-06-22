<!-- src/lib/components/ServicePageLayout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { Calendar, Clock, ArrowRight, CheckCircle, Star, MapPin, Users, Timer } from 'lucide-svelte';
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
	
	onMount(() => {
		mounted = true;
		
		// Rotate testimonials if available
		if (caseStudies.length > 0) {
			const testimonialInterval = setInterval(() => {
				currentTestimonial = (currentTestimonial + 1) % caseStudies.length;
			}, 6000);
			
			return () => clearInterval(testimonialInterval);
		}
	});
</script>

<svelte:head>
	<title>{title} - {APP_CONFIG.name}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{title} - {APP_CONFIG.name}" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero Section -->
<section class="relative pt-32 pb-16 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900 overflow-hidden">
	
	<!-- Service Background Animation -->
	<div class="absolute inset-0 opacity-20">
		<svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
			<defs>
				<linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
					<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
				</linearGradient>
			</defs>
			
			<!-- Engineering Grid Animation -->
			{#each Array(10) as _, i}
				<g class="grid-item-{i}" transform="translate({50 + i * 100},{100 + (i % 3) * 150})">
					<rect width="60" height="60" rx="8" fill="url(#serviceGradient)" opacity="0.4">
						<animate attributeName="opacity" values="0.4;0.8;0.4" dur="{4 + i * 0.2}s" repeatCount="indefinite"/>
					</rect>
					<!-- Connection lines -->
					{#if i < 9}
						<line x1="60" y1="30" x2="100" y2="30" stroke="url(#serviceGradient)" stroke-width="2" opacity="0.6"
							class="connection-line" style="animation-delay: {i * 0.3}s;"/>
					{/if}
				</g>
			{/each}
			
			<!-- Floating Service Icons -->
			{#each ['⚙️', '📐', '🔧', '📊', '🎯', '✅'] as serviceIcon, i}
				<g class="service-icon-{i}">
					<text x="{150 + i * 180}" y="{250 + Math.sin(i * 1.5) * 80}" 
						  font-size="28" text-anchor="middle" opacity="0.7">
						{serviceIcon}
						<animateTransform attributeName="transform" type="translate" 
										values="0,0; 0,-25; 0,0" dur="{5 + i * 0.4}s" repeatCount="indefinite"/>
					</text>
				</g>
			{/each}
		</svg>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Animated Badge -->
			<div class={`inline-flex items-center px-6 py-3 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">{icon}</span>
				{($locale || 'en') === 'ar' ? 'خدمة متخصصة' : 'Professional Service'}
			</div>
			
			<!-- Main Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
				<h1 class="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
					<span class="block bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
						{title}
					</span>
				</h1>
			</div>
			
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-6">
					{subtitle}
				</p>
			</div>
			
			<div class={`transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
				<p class="text-lg text-slate-400 max-w-3xl mx-auto">
					{description}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
{#if stats.length > 0}
<section class="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center transition-all duration-1000 delay-${index * 200} ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
					<div class="text-3xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
						{($locale || 'en') === 'ar' && stat.valueEn ? stat.valueEn : stat.value}
					</div>
					<div class="text-slate-600 dark:text-slate-300 font-medium">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn || stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Features Section -->
{#if features.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'مميزاتنا الأساسية' : 'Our Core Features'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم حلولاً شاملة ومتقدمة لضمان نجاح مشروعك' : 'We provide comprehensive and advanced solutions to ensure your project success'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class={`group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					
					<!-- Icon -->
					<div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
						<svelte:component this={feature.icon} class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
					</div>
					
					<!-- Content -->
					<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
						{($locale || 'en') === 'ar' ? feature.title : feature.titleEn || feature.title}
					</h3>
					
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn || feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Benefits Section -->
{#if benefits.length > 0}
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			
			<!-- Content -->
			<div>
				<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
					{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-300 mb-8">
					{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدماتنا المتخصصة أن تضيف قيمة لمشروعك' : 'Discover how our specialized services can add value to your project'}
				</p>
				
				<div class="space-y-4">
					{#each benefits as benefit, index}
						<div class={`flex items-start gap-4 transition-all duration-1000 delay-${index * 100} ${mounted ? 'animate-fade-in-left' : 'opacity-0'}`}>
							<div class="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
								<CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
							</div>
							<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
								{($locale || 'en') === 'ar' ? benefit.text || benefit : benefit.textEn || benefit}
							</p>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Visual -->
			<div class={`relative transition-all duration-1000 delay-400 ${mounted ? 'animate-fade-in-right' : 'opacity-0'}`}>
				<div class="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-3xl flex items-center justify-center shadow-2xl">
					<div class="text-center">
						<div class="text-8xl mb-6">{icon}</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
							{($locale || 'en') === 'ar' ? 'خدمة متميزة' : 'Excellence in Service'}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Process Section -->
{#if process.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'عمليتنا المُجرَّبة' : 'Our Proven Process'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية منظمة لضمان تحقيق أفضل النتائج' : 'We follow a structured methodology to ensure optimal results'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class={`relative transition-all duration-1000 delay-${index * 200} ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
					
					<!-- Step Number -->
					<div class="absolute -top-4 left-6 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
						{index + 1}
					</div>
					
					<!-- Card -->
					<div class="bg-white dark:bg-slate-900 p-6 pt-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full">
						<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">
							{($locale || 'en') === 'ar' ? step.title : step.titleEn || step.title}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
							{($locale || 'en') === 'ar' ? step.description : step.descriptionEn || step.description}
						</p>
					</div>
					
					<!-- Arrow (not for last item) -->
					{#if index < process.length - 1}
						<div class="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
							<ArrowRight class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Case Studies Section -->
{#if caseStudies.length > 0}
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'أمثلة على مشاريعنا الناجحة وخبراتنا المتنوعة' : 'Examples of our successful projects and diverse expertise'}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each caseStudies as study, index}
				<article class={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.15}s;">
					
					<!-- Header -->
					<div class="relative h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center">
						<div class="text-center">
							<div class="text-5xl mb-3">{icon}</div>
							<div class="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
								{($locale || 'en') === 'ar' ? 'دراسة حالة' : 'Case Study'}
							</div>
						</div>
					</div>
					
					<!-- Content -->
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
							{($locale || 'en') === 'ar' ? study.title : study.titleEn || study.title}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn || study.description}
						</p>
						
						<!-- Meta Information -->
						<div class="space-y-3 text-sm">
							<div class="flex items-center text-slate-500 dark:text-slate-400">
								<MapPin class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-600 dark:text-emerald-400" />
								<span>{($locale || 'en') === 'ar' ? study.location : study.locationEn || study.location}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400">
								<Timer class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-600 dark:text-emerald-400" />
								<span>{($locale || 'en') === 'ar' ? study.duration : study.durationEn || study.duration}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400">
								<Users class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-600 dark:text-emerald-400" />
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

<!-- CTA Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="mb-8">
			<div class="text-6xl mb-6">{icon}</div>
			<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
				{($locale || 'en') === 'ar' ? 'ابدأ مشروعك معنا اليوم' : 'Start Your Project with Us Today'}
			</h2>
			<p class="text-xl text-emerald-100 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'تواصل معنا للحصول على استشارة مجانية ومناقشة كيف يمكننا مساعدتك في تحقيق أهدافك'
					: 'Contact us for a free consultation and discuss how we can help you achieve your goals'
				}
			</p>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl group"
			>
				{($locale || 'en') === 'ar' ? 'تواصل معنا' : 'Contact Us'}
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/services" 
				class="inline-flex items-center px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors border-2 border-emerald-500"
			>
				{($locale || 'en') === 'ar' ? 'جميع الخدمات' : 'All Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Animation Keyframes */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	
	@keyframes slideInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes fadeInLeft {
		from { opacity: 0; transform: translateX(-20px); }
		to { opacity: 1; transform: translateX(0); }
	}
	
	@keyframes fadeInRight {
		from { opacity: 0; transform: translateX(20px); }
		to { opacity: 1; transform: translateX(0); }
	}
	
	@keyframes connectionAnimate {
		0% { stroke-dasharray: 0 100; }
		100% { stroke-dasharray: 100 0; }
	}
	
	/* Animation Classes */
	.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
	.animate-fade-in-left { animation: fadeInLeft 0.6s ease-out forwards; }
	.animate-fade-in-right { animation: fadeInRight 0.6s ease-out forwards; }
	.connection-line { animation: connectionAnimate 2s ease-out; }
</style>