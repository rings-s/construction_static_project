<script>
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Star, Users, Clock, MapPin } from 'lucide-svelte';
	import { getServiceImage, getProjectImage } from '$lib/config/images.js';

	let { 
		title,
		titleAr = '',
		subtitle,
		subtitleAr = '',
		description,
		descriptionAr = '',
		heroImage,
		features = [],
		benefits = [],
		benefitsAr = [],
		caseStudies = [],
		process = [],
		stats = [],
		children
	} = $props();
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? titleAr || title : title} - {($locale || 'en') === 'ar' ? 'استشارات النقل' : 'Transport Engineering Consultancy'}</title>
	<meta name="description" content={($locale || 'en') === 'ar' ? descriptionAr || description : description} />
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
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
			<!-- Hero Image -->
			{#if heroImage}
			<div class="inline-flex items-center justify-center w-40 h-40 bg-emerald-500/20 backdrop-blur-sm rounded-3xl border border-emerald-500/30 mb-8 overflow-hidden">
				<img 
					src={heroImage} 
					alt={($locale || 'en') === 'ar' ? titleAr || title : title}
					class="w-full h-full object-cover rounded-3xl"
					loading="lazy"
				/>
			</div>
			{/if}
			
			<h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
				{($locale || 'en') === 'ar' ? titleAr || title : title}
			</h1>
			<p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
				{($locale || 'en') === 'ar' ? subtitleAr || subtitle : subtitle}
			</p>
			<p class="text-lg text-slate-400 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? descriptionAr || description : description}
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
				{($locale || 'en') === 'ar' ? 'الميزات والقدرات الرئيسية' : 'Key Features & Capabilities'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'حلول شاملة مصممة لتلبية متطلباتك المحددة' : 'Comprehensive solutions designed to meet your specific requirements'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature}
				<div class="group bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<!-- Feature Image -->
					<div class="w-full h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
						{#if feature.image}
							<img 
								src={feature.image} 
								alt={($locale || 'en') === 'ar' ? feature.titleAr || feature.title : feature.title}
								class="w-full h-full object-cover rounded-2xl"
								loading="lazy"
							/>
						{:else}
							<div class="w-16 h-16 bg-emerald-600 dark:bg-emerald-500 rounded-xl flex items-center justify-center">
								<span class="text-2xl text-white">🔧</span>
							</div>
						{/if}
					</div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
						{($locale || 'en') === 'ar' ? feature.titleAr || feature.title : feature.title}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? feature.descriptionAr || feature.description : feature.description}
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
					{($locale || 'en') === 'ar' ? 'لماذا تختار خدماتنا؟' : 'Why Choose Our Services?'}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-300 mb-8">
					{($locale || 'en') === 'ar' ? 'فريقنا من الخبراء يحقق نتائج استثنائية من خلال منهجيات مثبتة ونهج مبتكرة' : 'Our expert team delivers exceptional results through proven methodologies and innovative approaches.'}
				</p>
				<ul class="space-y-4">
					{#each (($locale || 'en') === 'ar' ? benefitsAr.length > 0 ? benefitsAr : benefits : benefits) as benefit}
						<li class="flex items-start">
							<CheckCircle class="w-6 h-6 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 mt-0.5 flex-shrink-0" />
							<span class="text-slate-700 dark:text-slate-300">{benefit}</span>
						</li>
					{/each}
				</ul>
			</div>
			
			<div class="relative">
				<div class="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
					<div class="w-full h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center rounded-2xl">
						{#if heroImage}
							<img 
								src={heroImage} 
								alt={($locale || 'en') === 'ar' ? titleAr || title : title}
								class="w-full h-full object-cover rounded-2xl opacity-80"
								loading="lazy"
							/>
						{:else}
							<div class="text-center transform hover:scale-105 transition-transform duration-500">
								<span class="text-[8rem] leading-none opacity-80 select-none">🔧</span>
							</div>
						{/if}
					</div>
				</div>
				<div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
					<div class="text-3xl font-bold text-emerald-600 mb-1">500+</div>
					<div class="text-slate-600 dark:text-slate-300 font-medium">{($locale || 'en') === 'ar' ? 'المشاريع الناجحة' : 'Successful Projects'}</div>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Process Section -->
{#if process.length > 0}
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 opacity-5">
		<svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<pattern id="process-grid" width="20" height="20" patternUnits="userSpaceOnUse">
					<circle cx="10" cy="10" r="1" fill="currentColor" />
				</pattern>
			</defs>
			<rect width="100" height="100" fill="url(#process-grid)" />
		</svg>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
		<!-- Section Header -->
		<div class="text-center mb-20">
			<div class="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-6">
				<div class="w-2 h-2 bg-emerald-500 rounded-full mr-2 rtl:ml-2 rtl:mr-0"></div>
				{($locale || 'en') === 'ar' ? 'منهجيتنا' : 'Our Methodology'}
			</div>
			<h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'عمليتنا المثبتة' : 'Our Proven Process'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
				{($locale || 'en') === 'ar' ? 'نهج منهجي ومدروس يضمن تحقيق أعلى معايير الجودة والكفاءة في كل مرحلة من مراحل المشروع' : 'A systematic and thoughtful approach ensuring the highest standards of quality and efficiency at every stage of the project'}
			</p>
		</div>

		<!-- Process Steps -->
		<div class="relative">
			<!-- Connection Line for Desktop -->
			<div class="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-800"></div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
				{#each process as step, index}
					<div class="group relative">
						<!-- Mobile Connection Line -->
						{#if index < process.length - 1}
							<div class="lg:hidden absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-emerald-300 to-emerald-200 dark:from-emerald-700 dark:to-emerald-800"></div>
						{/if}

						<!-- Step Container -->
						<div class="relative z-10 text-center">
							<!-- Step Number Circle -->
							<div class="relative mb-8">
								<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border-4 border-white dark:border-slate-900">
									<span class="text-white font-bold text-xl">{index + 1}</span>
								</div>
								
								<!-- Floating Animation Element -->
								<div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"></div>
								
								<!-- Step Connector Dot for Desktop -->
								<div class="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-full shadow-md"></div>
							</div>

							<!-- Step Content -->
							<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
								<!-- Step Title -->
								<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
									{($locale || 'en') === 'ar' ? step.titleAr || step.title : step.title}
								</h3>
								
								<!-- Step Description -->
								<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
									{($locale || 'en') === 'ar' ? step.descriptionAr || step.description : step.description}
								</p>

								<!-- Progress Indicator -->
								<div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
									<div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
										<span>{($locale || 'en') === 'ar' ? 'الخطوة' : 'Step'} {index + 1}</span>
										<span>{Math.round(((index + 1) / process.length) * 100)}%</span>
									</div>
									<div class="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
										<div 
											class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1 rounded-full transition-all duration-1000 ease-out"
											style="width: {((index + 1) / process.length) * 100}%"
										></div>
									</div>
								</div>
							</div>

							<!-- Arrow for Desktop -->
							{#if index < process.length - 1}
								<div class="hidden lg:block absolute top-8 -right-4 text-emerald-400 group-hover:text-emerald-600 transition-colors">
									<ArrowRight class="w-8 h-8 animate-pulse" />
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Process Summary -->
		<div class="mt-20 text-center">
			<div class="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-700">
				<div class="flex items-center justify-center mb-4">
					<div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
						<CheckCircle class="w-6 h-6 text-white" />
					</div>
				</div>
				<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
					{($locale || 'en') === 'ar' ? 'ضمان الجودة والتميز' : 'Quality Assurance & Excellence'}
				</h3>
				<p class="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نلتزم بأعلى معايير الجودة في كل خطوة من خطوات العملية لضمان تحقيق النتائج المرجوة وتجاوز توقعاتكم'
						: 'We maintain the highest quality standards at every step of our process to ensure desired outcomes and exceed your expectations'
					}
				</p>
			</div>
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
				{($locale || 'en') === 'ar' ? 'قصص النجاح' : 'Success Stories'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'مشاريع حقيقية تعرض خبرتنا ونتائجنا المثبتة' : 'Real projects showcasing our expertise and proven results'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each caseStudies as study}
				<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700">
						<div class="w-full h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center">
							{#if study.image}
								<img 
									src={study.image} 
									alt={($locale || 'en') === 'ar' ? study.titleAr || study.title : study.title}
									class="w-full h-full object-cover"
									loading="lazy"
								/>
							{:else}
								<div class="text-center transform hover:scale-105 transition-transform duration-300">
									<span class="text-6xl leading-none select-none">🏗️</span>
								</div>
							{/if}
						</div>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
							{($locale || 'en') === 'ar' ? study.titleAr || study.title : study.title}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.descriptionAr || study.description : study.description}
						</p>
						
						<div class="grid grid-cols-3 gap-4 text-center border-t border-slate-200 dark:border-slate-700 pt-4">
							<div>
								<MapPin class="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.locationAr || study.location : study.location}
								</div>
							</div>
							<div>
								<Clock class="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.durationAr || study.duration : study.duration}
								</div>
							</div>
							<div>
								<Users class="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">{($locale || 'en') === 'ar' ? 'الفريق' : 'Team'}</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.teamAr || study.team : study.team}
								</div>
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
<section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-4xl lg:text-5xl font-bold text-white mb-2">
						{stat.value}
					</div>
					<div class="text-emerald-100 font-medium">
						{($locale || 'en') === 'ar' ? stat.labelAr || stat.label : stat.label}
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
		<div class="mb-8">
			{#if heroImage}
			<div class="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-3xl mb-6 shadow-lg overflow-hidden">
				<img 
					src={heroImage} 
					alt={($locale || 'en') === 'ar' ? titleAr || title : title}
					class="w-full h-full object-cover rounded-3xl"
					loading="lazy"
				/>
			</div>
			{/if}
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
				{($locale || 'en') === 'ar' ? 'دع فريقنا من الخبراء يساعدك في تحقيق أهداف مشروعك بحلول مبتكرة' : 'Let our expert team help you achieve your project goals with innovative solutions.'}
			</p>
		</div>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/about" 
				class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
			>
				{($locale || 'en') === 'ar' ? 'تعرف أكثر عنا' : 'Learn More About Us'}
			</a>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
</style>