<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { CheckCircle, Users, Target, Award, Globe, Zap, Quote, Star, ArrowRight, Calendar, MapPin, TrendingUp } from 'lucide-svelte';

	let mounted = $state(false);
	let visibleSections = $state(new Set());

	onMount(() => {
		mounted = true;
		
		// Intersection Observer for scroll animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						visibleSections.add(entry.target.id);
						visibleSections = new Set(visibleSections); // Trigger reactivity
					}
				});
			},
			{ threshold: 0.1, rootMargin: '50px' }
		);

		// Observe all sections
		document.querySelectorAll('[data-animate]').forEach(el => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});

	const values = [
		{
			icon: Target,
			title: $_('about.values.innovation'),
			color: 'from-primary-500 to-primary-600'
		},
		{
			icon: Award,
			title: $_('about.values.excellence'),
			color: 'from-emerald-500 to-emerald-600'
		},
		{
			icon: Users,
			title: $_('about.values.collaboration'),
			color: 'from-golden-500 to-golden-600'
		},
		{
			icon: Globe,
			title: $_('about.values.sustainability'),
			color: 'from-slate-500 to-slate-600'
		}
	];

	const stats = [
		{
			icon: Calendar,
			value: $_('about.experience_section.years_experience'),
			label: 'Experience',
			color: 'text-primary-600'
		},
		{
			icon: CheckCircle,
			value: $_('about.experience_section.projects_completed'),
			label: 'Projects Completed',
			color: 'text-emerald-600'
		},
		{
			icon: Globe,
			value: $_('about.experience_section.global_reach'),
			label: 'International Presence',
			color: 'text-golden-600'
		},
		{
			icon: TrendingUp,
			value: $_('about.experience_section.client_satisfaction'),
			label: 'Client Satisfaction',
			color: 'text-slate-600'
		}
	];

	const testimonials = [
		{
			content: $_('about.testimonials.testimonial_1'),
			author: $_('about.testimonials.client_1_name'),
			company: $_('about.testimonials.client_1_company'),
			rating: 5
		},
		{
			content: $_('about.testimonials.testimonial_2'),
			author: $_('about.testimonials.client_2_name'),
			company: $_('about.testimonials.client_2_company'),
			rating: 5
		}
	];

	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
</script>

<svelte:head>
	<title>{$_('about.title')} - Transport Engineering Consultancy</title>
	<meta name="description" content="Learn about Transport Consulting - 20 years of excellence in highway, transport, planning and design services for private and public sectors worldwide." />
</svelte:head>

<!-- Hero Section with Animated Background -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
	<!-- Animated Background SVG -->
	<div class="absolute inset-0 opacity-20">
		<svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
			<defs>
				<linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.2" />
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
				</linearGradient>
			</defs>
			
			<!-- Animated Road Network -->
			<path class="road-animation" d="M0,400 Q300,200 600,400 T1200,400" 
				  stroke="url(#roadGradient)" stroke-width="8" fill="none" opacity="0.6"/>
			<path class="road-animation-delay-1" d="M0,300 Q400,500 800,300 T1200,300" 
				  stroke="url(#roadGradient)" stroke-width="6" fill="none" opacity="0.4"/>
			<path class="road-animation-delay-2" d="M0,500 Q200,300 400,500 T1200,500" 
				  stroke="url(#roadGradient)" stroke-width="4" fill="none" opacity="0.3"/>
			
			<!-- Animated Particles -->
			{#each Array(20) as _, i}
				<circle class="particle particle-{i}" r="2" fill="#3b82f6" opacity="0.6">
					<animate attributeName="cx" values="0;1200;0" dur="{8 + i * 0.5}s" repeatCount="indefinite"/>
					<animate attributeName="cy" values="{350 + i * 10};{450 + i * 10};{350 + i * 10}" dur="{8 + i * 0.5}s" repeatCount="indefinite"/>
					<animate attributeName="opacity" values="0;0.8;0" dur="{4 + i * 0.3}s" repeatCount="indefinite"/>
				</circle>
			{/each}
		</svg>
	</div>

	<!-- Content -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="max-w-5xl mx-auto">
			<!-- Animated Badge -->
			<div class="inline-flex items-center px-6 py-3 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 animate-fade-in">
				<Calendar class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
				{$_('about.subtitle')}
			</div>

			<!-- Main Title -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
				{$_('about.title')}
			</h1>

			<!-- Subtitle -->
			<p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up" style="animation-delay: 0.2s;">
				{$_('about.hero_description')}
			</p>

			<!-- Scroll Indicator -->
			<div class="animate-bounce mt-12">
				<div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
					<div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Company Introduction -->
<section id="intro" data-animate class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div class={`space-y-8 ${isVisible('intro') ? 'animate-slide-in-left' : 'opacity-0'}`}>
				<div>
					<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
						Two Decades of Engineering Excellence
					</h2>
					<div class="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						<p>{$_('about.company_intro')}</p>
						<p>{$_('about.experience_text')}</p>
						<p>{$_('about.mission_statement')}</p>
						<p class="font-semibold text-primary-600 dark:text-primary-400">{$_('about.partnership_text')}</p>
					</div>
				</div>
				
				<!-- Key Highlights -->
				<div class="grid grid-cols-2 gap-6">
					<div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 text-center">
						<div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">20+</div>
						<div class="text-slate-600 dark:text-slate-300 font-medium">Years Experience</div>
					</div>
					<div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 text-center">
						<div class="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">500+</div>
						<div class="text-slate-600 dark:text-slate-300 font-medium">Projects Delivered</div>
					</div>
				</div>
			</div>
			
			<!-- Animated SVG Illustration -->
			<div class={`relative ${isVisible('intro') ? 'animate-slide-in-right' : 'opacity-0'}`}>
				<div class="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
					<svg viewBox="0 0 400 400" class="w-full h-full p-8">
						<defs>
							<linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:#3b82f6"/>
								<stop offset="50%" style="stop-color:#10b981"/>
								<stop offset="100%" style="stop-color:#f59e0b"/>
							</linearGradient>
						</defs>
						
						<!-- City Skyline -->
						<rect x="50" y="200" width="40" height="150" fill="url(#buildingGradient)" opacity="0.8" rx="4">
							<animate attributeName="height" values="150;180;150" dur="4s" repeatCount="indefinite"/>
						</rect>
						<rect x="100" y="180" width="35" height="170" fill="url(#buildingGradient)" opacity="0.9" rx="4">
							<animate attributeName="height" values="170;200;170" dur="3s" repeatCount="indefinite"/>
						</rect>
						<rect x="145" y="160" width="45" height="190" fill="url(#buildingGradient)" opacity="0.7" rx="4">
							<animate attributeName="height" values="190;220;190" dur="5s" repeatCount="indefinite"/>
						</rect>
						<rect x="200" y="140" width="50" height="210" fill="url(#buildingGradient)" opacity="0.8" rx="4">
							<animate attributeName="height" values="210;240;210" dur="3.5s" repeatCount="indefinite"/>
						</rect>
						<rect x="260" y="170" width="35" height="180" fill="url(#buildingGradient)" opacity="0.9" rx="4">
							<animate attributeName="height" values="180;210;180" dur="4.5s" repeatCount="indefinite"/>
						</rect>
						<rect x="305" y="190" width="40" height="160" fill="url(#buildingGradient)" opacity="0.8" rx="4">
							<animate attributeName="height" values="160;190;160" dur="3.8s" repeatCount="indefinite"/>
						</rect>
						
						<!-- Roads -->
						<path d="M0,350 L400,350" stroke="#64748b" stroke-width="8" opacity="0.6"/>
						<path d="M0,320 Q200,300 400,320" stroke="#64748b" stroke-width="6" opacity="0.4"/>
						
						<!-- Moving Vehicles -->
						<circle r="4" fill="#f59e0b">
							<animateMotion dur="6s" repeatCount="indefinite">
								<path d="M0,350 L400,350"/>
							</animateMotion>
						</circle>
						<circle r="3" fill="#10b981">
							<animateMotion dur="8s" repeatCount="indefinite">
								<path d="M400,320 Q200,300 0,320"/>
							</animateMotion>
						</circle>
					</svg>
				</div>
				
				<!-- Floating Stats -->
				<div class="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-float">
					<div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">98%</div>
					<div class="text-slate-600 dark:text-slate-300 text-sm font-medium">Client Satisfaction</div>
				</div>
				
				<div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-float" style="animation-delay: 1s;">
					<div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">Global</div>
					<div class="text-slate-600 dark:text-slate-300 text-sm font-medium">Reach</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section id="mission" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('about.mission_title')} & {$_('about.vision_title')}
			</h2>
		</div>

		<div class="grid lg:grid-cols-2 gap-16">
			<div class={`${isVisible('mission') ? 'animate-slide-in-left' : 'opacity-0'}`}>
				<div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 h-full">
					<div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
						<Target class="w-8 h-8 text-white" />
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
						{$_('about.mission_title')}
					</h3>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						{$_('about.mission_text')}
					</p>
				</div>
			</div>
			
			<div class={`${isVisible('mission') ? 'animate-slide-in-right' : 'opacity-0'}`}>
				<div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 h-full">
					<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
						<Zap class="w-8 h-8 text-white" />
					</div>
					<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
						{$_('about.vision_title')}
					</h3>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						{$_('about.vision_text')}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Core Values -->
<section id="values" data-animate class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('about.values_title')}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				The fundamental principles that guide our approach to every project and client relationship.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each values as value, index}
				<div class={`text-center group ${isVisible('values') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					<div class="relative mb-6">
						<div class={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
							<svelte:component this={value.icon} class="w-10 h-10 text-white" />
						</div>
						<div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl group-hover:from-white/30 transition-colors duration-300"></div>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
						{value.title}
					</h3>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Experience Stats -->
<section id="stats" data-animate class="py-24 bg-gradient-to-r from-primary-600 via-emerald-600 to-golden-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
				{$_('about.experience_section.title')}
			</h2>
		</div>

		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${isVisible('stats') ? 'animate-scale-in' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svelte:component this={stat.icon} class={`w-8 h-8 ${stat.color}`} />
					</div>
					<div class="text-3xl lg:text-4xl font-bold text-white mb-2">
						{stat.value}
					</div>
					<div class="text-white/80 font-medium">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Client Testimonials -->
<section id="testimonials" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				{$_('about.testimonials.title')}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{$_('about.testimonials.subtitle')}
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-8">
			{#each testimonials as testimonial, index}
				<div class={`bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative ${isVisible('testimonials') ? 'animate-slide-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<!-- Quote Icon -->
					<div class="absolute -top-4 left-8">
						<div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
							<Quote class="w-4 h-4 text-white" />
						</div>
					</div>
					
					<!-- Stars -->
					<div class="flex mb-6 mt-4">
						{#each Array(testimonial.rating) as _}
							<Star class="w-5 h-5 text-golden-500 fill-current" />
						{/each}
					</div>
					
					<!-- Testimonial Content -->
					<blockquote class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
						"{testimonial.content}"
					</blockquote>
					
					<!-- Author -->
					<div class="border-t border-slate-200 dark:border-slate-700 pt-6">
						<div class="font-bold text-slate-900 dark:text-white">
							{testimonial.author}
						</div>
						<div class="text-primary-600 dark:text-primary-400 font-medium">
							{testimonial.company}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
			Ready to Work with Us?
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
			Let our 20 years of experience and expertise help bring your transport project vision to life.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
			>
				Start Your Project
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/services" 
				class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
			>
				Explore Our Services
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
	
	@keyframes slideUp {
		from { 
			opacity: 0; 
			transform: translateY(30px); 
		}
		to { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}
	
	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}
	
	/* Animation Classes */
	.animate-fade-in {
		animation: fadeIn 0.8s ease-out forwards;
		opacity: 0;
	}
	
	.animate-slide-up {
		animation: slideUp 0.8s ease-out forwards;
		opacity: 0;
	}
	
	.animate-slide-in-left {
		animation: slideInLeft 0.8s ease-out forwards;
	}
	
	.animate-slide-in-right {
		animation: slideInRight 0.8s ease-out forwards;
	}
	
	.animate-slide-in-up {
		animation: slideInUp 0.8s ease-out forwards;
	}
	
	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
	}
	
	.animate-scale-in {
		animation: scaleIn 0.6s ease-out forwards;
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
	
	/* SVG Animations */
	.road-animation {
		stroke-dasharray: 20 10;
		animation: roadMove 3s linear infinite;
	}
	
	.road-animation-delay-1 {
		stroke-dasharray: 15 8;
		animation: roadMove 4s linear infinite reverse;
	}
	
	.road-animation-delay-2 {
		stroke-dasharray: 10 5;
		animation: roadMove 5s linear infinite;
	}
	
	@keyframes roadMove {
		to {
			stroke-dashoffset: -100;
		}
	}
</style>