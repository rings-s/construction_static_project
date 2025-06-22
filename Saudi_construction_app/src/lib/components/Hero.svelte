<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { ArrowRight, Play, CheckCircle, Users, Award, Globe } from 'lucide-svelte';

	let mounted = $state(false);
	let heroSection = $state(null);
	let currentFeature = $state(0);

	const features = [
		{
			icon: '🛣️',
			title: $_('services.highway_engineering.title'),
			description: 'Advanced highway design and infrastructure solutions'
		},
		{
			icon: '🚦',
			title: $_('services.traffic_engineering.title'),
			description: 'Intelligent traffic management and optimization'
		},
		{
			icon: '🗺️',
			title: $_('services.transport_planning.title'),
			description: 'Strategic planning for sustainable mobility'
		}
	];

	const achievements = [
		{ icon: Users, value: '500+', label: 'Projects Completed' },
		{ icon: Award, value: '20+', label: 'Years Experience' },
		{ icon: Globe, value: '98%', label: 'Client Satisfaction' },
		{ icon: CheckCircle, value: '50+', label: 'Expert Team' }
	];

	onMount(() => {
		mounted = true;
		
		// Rotate through features
		const interval = setInterval(() => {
			currentFeature = (currentFeature + 1) % features.length;
		}, 4000);

		// Parallax effect
		const handleScroll = () => {
			if (heroSection) {
				const scrolled = window.pageYOffset;
				const parallax = scrolled * 0.5;
				heroSection.style.transform = `translateY(${parallax}px)`;
			}
		};

		window.addEventListener('scroll', handleScroll);
		
		return () => {
			clearInterval(interval);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section bind:this={heroSection} class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-30">
		<svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
			<defs>
				<linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
					<stop offset="33%" style="stop-color:#10b981;stop-opacity:0.1" />
					<stop offset="66%" style="stop-color:#f59e0b;stop-opacity:0.1" />
					<stop offset="100%" style="stop-color:#64748b;stop-opacity:0.1" />
				</linearGradient>
				<pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
					<circle cx="30" cy="30" r="2" fill="#64748b" opacity="0.1"/>
				</pattern>
			</defs>
			
			<!-- Grid Pattern -->
			<rect width="100%" height="100%" fill="url(#heroGrid)" />
			
			<!-- Flowing Lines -->
			<path class="hero-line-1" d="M0,200 Q300,100 600,200 T1200,200" 
				  stroke="url(#heroGradient)" stroke-width="3" fill="none" opacity="0.6"/>
			<path class="hero-line-2" d="M0,400 Q400,300 800,400 T1200,400" 
				  stroke="url(#heroGradient)" stroke-width="2" fill="none" opacity="0.4"/>
			<path class="hero-line-3" d="M0,600 Q200,500 400,600 T1200,600" 
				  stroke="url(#heroGradient)" stroke-width="2" fill="none" opacity="0.3"/>
			
			<!-- Animated Elements -->
			{#each Array(15) as _, i}
				<circle class="floating-element" r="{2 + i * 0.3}" fill="#3b82f6" opacity="0.2">
					<animate attributeName="cx" values="0;1200;0" dur="{10 + i}s" repeatCount="indefinite"/>
					<animate attributeName="cy" values="{100 + i * 40};{150 + i * 40};{100 + i * 40}" dur="{8 + i * 0.5}s" repeatCount="indefinite"/>
					<animate attributeName="opacity" values="0.1;0.3;0.1" dur="{6 + i * 0.3}s" repeatCount="indefinite"/>
				</circle>
			{/each}
		</svg>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<!-- Left Column - Content -->
			<div class="text-left space-y-8">
				<!-- Badge -->
				<div class={`inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 rounded-full border border-primary-200 text-sm font-semibold transition-all duration-1000 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
					<div class="w-2 h-2 bg-primary-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
					{$_('hero.badge') || 'Award-Winning Engineering Solutions'}
				</div>

				<!-- Main Title -->
				<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
					<h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-6">
						<span class="block">{$_('hero.title')}</span>
					</h1>
				</div>

				<!-- Subtitle -->
				<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
					<p class="text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl">
						{$_('hero.subtitle')}
					</p>
				</div>

				<!-- CTA Buttons -->
				<div class={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
					<a 
						href="/services" 
						class="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
					>
						{$_('hero.cta_primary')}
						<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
					</a>
					
					<a 
						href="/about" 
						class="group inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
					>
						<Play class="mr-2 rtl:ml-2 rtl:mr-0 w-5 h-5 transition-transform group-hover:scale-110" />
						{$_('hero.cta_secondary')}
					</a>
				</div>

				<!-- Quick Stats -->
				<div class={`grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 transition-all duration-1000 delay-800 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
					{#each achievements.slice(0, 2) as achievement}
						<div class="text-center sm:text-left">
							<div class="flex items-center justify-center sm:justify-start mb-2">
								<div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
									<svelte:component this={achievement.icon} class="w-4 h-4 text-primary-600" />
								</div>
							</div>
							<div class="text-2xl font-bold text-slate-900">{achievement.value}</div>
							<div class="text-sm text-slate-600">{achievement.label}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right Column - Visual Elements -->
			<div class="relative">
				<!-- Main Visual Card -->
				<div class={`bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 transform transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
					<!-- Header -->
					<div class="flex items-center justify-between mb-8">
						<div>
							<h3 class="text-lg font-bold text-slate-900 mb-1">Our Expertise</h3>
							<p class="text-sm text-slate-600">20+ Years of Excellence</p>
						</div>
						<div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-xl flex items-center justify-center">
							<span class="text-2xl">{features[currentFeature].icon}</span>
						</div>
					</div>

					<!-- Rotating Features -->
					<div class="space-y-6">
						{#each features as feature, index}
							<div class={`transition-all duration-500 ${index === currentFeature ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
								<div class="flex items-start space-x-4 rtl:space-x-reverse">
									<div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<span class="text-lg">{feature.icon}</span>
									</div>
									<div>
										<h4 class="font-semibold text-slate-900 mb-1">{feature.title}</h4>
										<p class="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Progress Indicators -->
					<div class="flex space-x-2 rtl:space-x-reverse mt-6">
						{#each features as _, index}
							<div class={`h-1 flex-1 rounded transition-all duration-300 ${
								index === currentFeature ? 'bg-primary-500' : 'bg-slate-200'
							}`}></div>
						{/each}
					</div>
				</div>

				<!-- Floating Achievement Cards -->
				<div class={`absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 transform transition-all duration-1000 delay-700 ${mounted ? 'animate-float' : 'opacity-0'}`}>
					<div class="flex items-center space-x-3 rtl:space-x-reverse">
						<div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
							<CheckCircle class="w-5 h-5 text-emerald-600" />
						</div>
						<div>
							<div class="text-lg font-bold text-slate-900">98%</div>
							<div class="text-xs text-slate-600">Client Satisfaction</div>
						</div>
					</div>
				</div>

				<div class={`absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 transform transition-all duration-1000 delay-900 ${mounted ? 'animate-float' : 'opacity-0'}`} style="animation-delay: 1s;">
					<div class="flex items-center space-x-3 rtl:space-x-reverse">
						<div class="w-10 h-10 bg-golden-100 rounded-xl flex items-center justify-center">
							<Award class="w-5 h-5 text-golden-600" />
						</div>
						<div>
							<div class="text-lg font-bold text-slate-900">500+</div>
							<div class="text-xs text-slate-600">Projects Delivered</div>
						</div>
					</div>
				</div>

				<!-- Background Accent -->
				<div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-3xl transform rotate-3 -z-10 opacity-50"></div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<div class="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
			<div class="w-1 h-3 bg-slate-500 rounded-full mt-2 animate-pulse"></div>
		</div>
	</div>
</section>

<style>
	/* Animation Keyframes */
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
	
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}
	
	/* Animation Classes */
	.animate-slide-in-left {
		animation: slideInLeft 0.8s ease-out forwards;
	}
	
	.animate-slide-in-right {
		animation: slideInRight 0.8s ease-out forwards;
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
	
	/* SVG Animations */
	.hero-line-1 {
		stroke-dasharray: 30 15;
		animation: lineFlow 4s linear infinite;
	}
	
	.hero-line-2 {
		stroke-dasharray: 20 10;
		animation: lineFlow 5s linear infinite reverse;
	}
	
	.hero-line-3 {
		stroke-dasharray: 15 8;
		animation: lineFlow 6s linear infinite;
	}
	
	@keyframes lineFlow {
		to {
			stroke-dashoffset: -200;
		}
	}
</style>