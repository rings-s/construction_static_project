<!-- src/lib/components/AdvancedHero.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, Play, Zap, Shield, Award, Users } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
  
	let mounted = false;
	let heroRef;
	let isIntersecting = false;
	let mousePosition = { x: 0, y: 0 };
	let currentFeature = 0;
	let particles = [];
  
	// Advanced features showcase
	const features = [
		{
			icon: Zap,
			title: 'التقنيات المتطورة',
			titleEn: 'Advanced Technology',
			value: '99.9%',
			metric: 'دقة التصميم',
			metricEn: 'Design Accuracy'
		},
		{
			icon: Shield,
			title: 'معايير الأمان',
			titleEn: 'Safety Standards',
			value: '100%',
			metric: 'امتثال السلامة',
			metricEn: 'Safety Compliance'
		},
		{
			icon: Award,
			title: 'جودة مضمونة',
			titleEn: 'Quality Assured',
			value: '500+',
			metric: 'مشروع مكتمل',
			metricEn: 'Projects Completed'
		},
		{
			icon: Users,
			title: 'فريق محترف',
			titleEn: 'Expert Team',
			value: '50+',
			metric: 'مهندس خبير',
			metricEn: 'Expert Engineers'
		}
	];

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.5 + 0.2
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			mousePosition = {
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			};
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		
		// Feature rotation
		const featureInterval = setInterval(() => {
			currentFeature = (currentFeature + 1) % features.length;
		}, 3000);
		
		// Intersection observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isIntersecting = entry.isIntersecting;
				});
			},
			{ threshold: 0.3 }
		);
		
		if (heroRef) {
			observer.observe(heroRef);
		}
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(featureInterval);
			if (observer) observer.disconnect();
		};
	});
</script>

<section 
	bind:this={heroRef}
	class="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 overflow-hidden"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;"
	aria-label={($locale || 'en') === 'ar' ? 'القسم الرئيسي' : 'Main hero section'}
>
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-float-reverse"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Geometric Grid -->
		<svg class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" viewBox="0 0 1200 800">
			<defs>
				<pattern id="advancedGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
				</pattern>
				<linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.4"/>
					<stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.6"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.4"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#advancedGrid)" />
			
			<!-- Animated Waves -->
			<path d="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z" fill="url(#waveGradient)" opacity="0.1">
				<animate attributeName="d" values="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z;M0,420 Q300,370 600,420 T1200,420 L1200,0 L0,0 Z;M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z" dur="8s" repeatCount="indefinite"/>
			</path>
			<path d="M0,450 Q400,400 800,450 T1200,450 L1200,800 L0,800 Z" fill="url(#waveGradient)" opacity="0.05">
				<animate attributeName="d" values="M0,450 Q400,400 800,450 T1200,450 L1200,800 L0,800 Z;M0,470 Q400,420 800,470 T1200,470 L1200,800 L0,800 Z;M0,450 Q400,400 800,450 T1200,450 L1200,800 L0,800 Z" dur="12s" repeatCount="indefinite"/>
			</path>
		</svg>
		
		<!-- Floating Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each particles as particle}
				<div 
					class="absolute rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 animate-float-particle"
					style="
						left: {particle.x}%;
						top: {particle.y}%;
						width: {particle.size}px;
						height: {particle.size}px;
						opacity: {particle.opacity};
						animation-duration: {particle.speed * 4}s;
						transform: translate(calc(var(--mouse-x) * 0.{Math.floor(particle.id % 10) + 1}px), calc(var(--mouse-y) * 0.{Math.floor(particle.id % 10) + 1}px));
					"
				></div>
			{/each}
		</div>

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-amber-400 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"></div>
		</div>
	</div>

	<!-- Main Container -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-40 lg:pb-28">
		<div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[80vh]">
			
			<!-- Left Content Block (7 columns) -->
			<div class="lg:col-span-7 space-y-10">
				
				<!-- Enhanced Badge with Pulse Effect -->
				<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
					<div class="relative mr-3 rtl:ml-3 rtl:mr-0">
						<div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse-glow"></div>
						<div class="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
					</div>
					<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg animate-bounce-gentle">🏗️</span>
					<span class="font-semibold">{($locale || 'en') === 'ar' ? APP_CONFIG.location : APP_CONFIG.locationEn}</span>
					<div class="ml-3 rtl:mr-3 rtl:ml-0 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full animate-pulse">
						{($locale || 'en') === 'ar' ? 'جديد' : 'NEW'}
					</div>
				</div>

				<!-- Enhanced Main Title -->
				<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
						<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
							{($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}
						</span>
						{#if ($locale || 'en') === 'ar'}
							<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
								{APP_CONFIG.tagline}
							</span>
						{:else}
							<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
								{APP_CONFIG.taglineEn}
							</span>
						{/if}
					</h1>
				</div>

				<!-- Enhanced Description -->
				<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
						{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
					</p>
					<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
						{($locale || 'en') === 'ar' 
							? 'خبرة تمتد لأكثر من 20 عاماً في تقديم حلول هندسية مبتكرة ومستدامة باستخدام أحدث التقنيات والمعايير العالمية'
							: 'Over 20 years of experience delivering innovative and sustainable engineering solutions using cutting-edge technology and international standards'
						}
					</p>
				</div>

				<!-- Enhanced CTA Section -->
				<div class={`space-y-6 transition-all duration-1000 delay-600 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<div class="flex flex-col sm:flex-row gap-6">
						<a 
							href="/services" 
							class="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 text-white text-lg font-bold rounded-2xl transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-lg hover:shadow-xl w-full sm:w-auto overflow-hidden"
							aria-label={($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore our services'}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
							<span class="relative mr-3 rtl:ml-3 rtl:mr-0 text-xl group-hover:scale-110 transition-transform duration-300">🚀</span>
							<span class="relative">{($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}</span>
							<ArrowRight class="relative ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
						</a>
						
						<a 
							href="/about" 
							class="group inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-lg font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg w-full sm:w-auto"
							aria-label={($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn about us'}
						>
							<Play class="mr-3 rtl:ml-3 rtl:mr-0 w-6 h-6 transition-transform group-hover:scale-110 duration-300" />
							<span>{($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn About Us'}</span>
						</a>
					</div>

					<!-- Trust Indicators -->
					<div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
						{#each features as feature, index}
							<div class={`text-center group hover:scale-110 transition-all duration-500 ${index === currentFeature ? 'scale-110' : ''}`} style="animation-delay: {index * 0.2}s;">
								<div class="flex items-center justify-center mb-3">
									<div class={`w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${index === currentFeature ? 'animate-pulse-glow' : ''}`}>
										<svelte:component this={feature.icon} class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
									</div>
								</div>
								<div class={`text-3xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 ${index === currentFeature ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
									{feature.value}
								</div>
								<div class="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">
									{($locale || 'en') === 'ar' ? feature.metric : feature.metricEn}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right Advanced SVG Illustration (5 columns) - INCREASED SIZE -->
			<div class="lg:col-span-5 relative">
				<div class={`relative max-w-[900px] mx-auto transition-all duration-1000 delay-300 ${mounted ? 'animate-fade-in-right-advanced' : 'opacity-0'}`}>
					
					<!-- Advanced Construction Scene SVG - SIGNIFICANTLY INCREASED SIZE -->
					<svg 
						viewBox="0 0 1000 900" 
						class="w-full h-auto drop-shadow-2xl scale-125"
						aria-hidden="true"
						role="img"
					>
						<defs>
							<filter id="glow">
								<fegaussianblur stdDeviation="3" result="coloredBlur"/>
								<femerge> 
									<femergenode in="coloredBlur"/>
									<femergenode in="SourceGraphic"/>
								</femerge>
							</filter>
						</defs>

						<!-- Modern City Skyline -->
						<g class="skyline" stroke="#374151" stroke-width="2" fill="none">
							<!-- Skyscraper 1 -->
							<rect x="60" y="180" width="100" height="250" rx="5">
								<animate attributeName="height" values="250;260;250" dur="12s" repeatCount="indefinite" />
							</rect>
							<rect x="75" y="200" width="15" height="15" fill="#fbbf24" opacity="0.8">
								<animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
							</rect>
							<rect x="100" y="230" width="15" height="15" fill="#fbbf24" opacity="0.6">
								<animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
							</rect>
							<rect x="125" y="250" width="15" height="15" fill="#3b82f6" opacity="0.7">
								<animate attributeName="opacity" values="0.7;0.3;0.7" dur="5s" repeatCount="indefinite" />
							</rect>
							
							<!-- Skyscraper 2 -->
							<rect x="175" y="150" width="110" height="290" rx="5">
								<animate attributeName="height" values="290;300;290" dur="15s" repeatCount="indefinite" />
							</rect>
							<circle cx="230" cy="230" r="20" fill="none" stroke="#10b981" stroke-width="2">
								<animate attributeName="r" values="20;23;20" dur="6s" repeatCount="indefinite" />
							</circle>
							<text x="230" y="237" text-anchor="middle" font-size="10" font-weight="bold" fill="#10b981">BIM</text>
							
							<!-- Skyscraper 3 -->
							<rect x="300" y="170" width="90" height="270" rx="5">
								<animate attributeName="height" values="270;280;270" dur="10s" repeatCount="indefinite" />
							</rect>
							
							<!-- Modern Glass Building -->
							<rect x="405" y="130" width="125" height="310" rx="10" stroke-dasharray="12,6">
								<animate attributeName="stroke-dashoffset" values="0;24;0" dur="8s" repeatCount="indefinite" />
							</rect>
							
							<!-- Construction Building (Under Development) -->
							<rect x="545" y="220" width="150" height="220" rx="5" stroke-dasharray="18,12">
								<animate attributeName="height" values="220;235;220" dur="8s" repeatCount="indefinite" />
								<animate attributeName="stroke-dashoffset" values="0;30;0" dur="6s" repeatCount="indefinite" />
							</rect>
						</g>

						<!-- Advanced Construction Machinery -->
						<g class="machinery">
							<!-- Tower Crane with detailed structure -->
							<g class="tower-crane">
								<!-- Crane Base -->
								<rect x="720" y="410" width="50" height="40" fill="none" stroke="#374151" stroke-width="4" rx="3"/>
								
								<!-- Crane Mast -->
								<rect x="740" y="100" width="12" height="310" fill="none" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 746 255;3 746 255;-3 746 255;0 746 255" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Crane Jib (horizontal arm) -->
								<rect x="560" y="98" width="320" height="8" fill="none" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 746 102;4 746 102;-4 746 102;0 746 102" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Counter Jib -->
								<rect x="756" y="98" width="100" height="8" fill="none" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 746 102;4 746 102;-4 746 102;0 746 102" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Crane Hook with realistic movement -->
								<circle cx="620" cy="120" r="5" fill="none" stroke="#dc2626" stroke-width="3">
									<animateTransform 
										attributeName="transform" 
										type="translate" 
										values="0,0;0,40;0,0" 
										dur="12s" 
										repeatCount="indefinite"
									/>
								</circle>
								
								<!-- Crane Cables -->
								<line x1="620" y1="106" x2="620" y2="150" stroke="#374151" stroke-width="1.5">
									<animate attributeName="y2" values="150;190;150" dur="12s" repeatCount="indefinite" />
								</line>
								<line x1="645" y1="106" x2="645" y2="140" stroke="#374151" stroke-width="1.5"/>
								<line x1="720" y1="106" x2="720" y2="125" stroke="#374151" stroke-width="1.5"/>
							</g>

							<!-- Mobile Crane -->
							<g class="mobile-crane">
								<rect x="810" y="410" width="100" height="40" rx="5" fill="none" stroke="#374151" stroke-width="3"/>
								<circle cx="830" cy="460" r="15" fill="none" stroke="#374151" stroke-width="3"/>
								<circle cx="890" cy="460" r="15" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="850" y="360" width="8" height="50" fill="none" stroke="#374151" stroke-width="3">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 854 410;15 854 410;-15 854 410;0 854 410" 
										dur="18s" 
										repeatCount="indefinite"
									/>
								</rect>
							</g>

							<!-- Excavator -->
							<g class="excavator">
								<rect x="125" y="425" width="75" height="32" rx="10" fill="none" stroke="#374151" stroke-width="3"/>
								<circle cx="150" cy="470" r="13" fill="none" stroke="#374151" stroke-width="3"/>
								<circle cx="175" cy="470" r="13" fill="none" stroke="#374151" stroke-width="3"/>
								
								<!-- Excavator Arm -->
								<line x1="162" y1="425" x2="210" y2="400" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 162 425;20 162 425;0 162 425" 
										dur="15s" 
										repeatCount="indefinite"
									/>
								</line>
								<line x1="210" y1="400" x2="235" y2="420" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 210 400;-30 210 400;0 210 400" 
										dur="15s" 
										repeatCount="indefinite"
									/>
								</line>
								
								<!-- Bucket -->
								<path d="M235,420 L250,427 L242,442 L227,435 Z" fill="none" stroke="#374151" stroke-width="3">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 240 431;45 240 431;0 240 431" 
										dur="15s" 
										repeatCount="indefinite"
									/>
								</path>
							</g>
						</g>

						<!-- Construction Workers with Safety Equipment -->
						<g class="workers">
							<!-- Worker 1 with tablet -->
							<g class="worker-1">
								<circle cx="440" cy="430" r="10" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="432" y="438" width="13" height="20" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="425" y="445" width="25" height="15" fill="none" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
								<circle cx="440" cy="422" r="15" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.5"/>
							</g>
							
							<!-- Worker 2 surveying -->
							<g class="worker-2">
								<circle cx="350" cy="437" r="10" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="343" y="445" width="13" height="20" fill="none" stroke="#374151" stroke-width="3"/>
								<line x1="343" y1="430" x2="375" y2="410" stroke="#374151" stroke-width="3"/>
								<rect x="375" y="405" width="10" height="10" fill="none" stroke="#374151" stroke-width="1.5"/>
								<circle cx="350" cy="429" r="15" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.5"/>
							</g>
							
							<!-- Worker 3 with safety vest -->
							<g class="worker-3">
								<circle cx="565" cy="437" r="10" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="557" y="445" width="13" height="20" fill="none" stroke="#f59e0b" stroke-width="3"/>
								<circle cx="565" cy="429" r="15" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.5"/>
							</g>
						</g>

						<!-- Advanced Digital Elements -->
						<g class="digital-overlay">
							<!-- Drone Survey -->
							<g class="drone">
								<rect x="250" y="60" width="25" height="5" rx="3" fill="none" stroke="#374151" stroke-width="1.5"/>
								<circle cx="257" cy="57" r="4" fill="none" stroke="#374151" stroke-width="1.5"/>
								<circle cx="268" cy="57" r="4" fill="none" stroke="#374151" stroke-width="1.5"/>
								<circle cx="257" cy="68" r="4" fill="none" stroke="#374151" stroke-width="1.5"/>
								<circle cx="268" cy="68" r="4" fill="none" stroke="#374151" stroke-width="1.5"/>
								
								<animateTransform 
									attributeName="transform" 
									type="translate" 
									values="0,0;125,25;250,0;125,-25;0,0" 
									dur="25s" 
									repeatCount="indefinite"
								/>
							</g>
							
							<!-- 3D Hologram Display -->
							<g class="hologram">
								<rect x="475" y="490" width="75" height="50" rx="5" fill="none" stroke="#374151" stroke-width="3"/>
								<rect x="482" y="498" width="62" height="38" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.7">
									<animate attributeName="opacity" values="0.7;0.3;0.7" dur="4s" repeatCount="indefinite" />
								</rect>
								
								<!-- 3D Building Model -->
								<g opacity="0.8">
									<rect x="488" y="503" width="19" height="25" fill="none" stroke="#10b981" stroke-width="1.5">
										<animate attributeName="height" values="25;31;25" dur="6s" repeatCount="indefinite" />
									</rect>
									<rect x="510" y="498" width="19" height="32" fill="none" stroke="#10b981" stroke-width="1.5">
										<animate attributeName="height" values="32;38;32" dur="8s" repeatCount="indefinite" />
									</rect>
									<rect x="531" y="508" width="19" height="19" fill="none" stroke="#10b981" stroke-width="1.5">
										<animate attributeName="height" values="19;25;19" dur="7s" repeatCount="indefinite" />
									</rect>
								</g>
							</g>
							
							<!-- IoT Sensors -->
							<g class="sensors">
								<circle cx="375" cy="255" r="5" fill="none" stroke="#10b981" stroke-width="3">
									<animate attributeName="r" values="5;10;5" dur="3s" repeatCount="indefinite" />
								</circle>
								<circle cx="625" cy="230" r="5" fill="none" stroke="#f59e0b" stroke-width="3">
									<animate attributeName="r" values="5;10;5" dur="4s" repeatCount="indefinite" />
								</circle>
								<circle cx="500" cy="280" r="5" fill="none" stroke="#ef4444" stroke-width="3">
									<animate attributeName="r" values="5;10;5" dur="5s" repeatCount="indefinite" />
								</circle>
								
								<!-- Sensor Connections -->
								<path d="M375,255 Q437,243 500,280" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.5" stroke-dasharray="4,4">
									<animate attributeName="stroke-dashoffset" values="0;8;0" dur="3s" repeatCount="indefinite" />
								</path>
								<path d="M500,280 Q562,255 625,230" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.5" stroke-dasharray="4,4">
									<animate attributeName="stroke-dashoffset" values="0;8;0" dur="4s" repeatCount="indefinite" />
								</path>
							</g>
							
							<!-- Progress Tracking -->
							<g class="progress-displays">
								<circle cx="650" cy="150" r="32" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="201">
									<animate attributeName="stroke-dasharray" values="0,201;170,31;201,0" dur="8s" repeatCount="indefinite" />
								</circle>
								<text x="650" y="157" text-anchor="middle" font-size="15" font-weight="bold" fill="#10b981">85%</text>
								
								<circle cx="775" cy="180" r="25" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="157">
									<animate attributeName="stroke-dasharray" values="0,157;113,44;157,0" dur="10s" repeatCount="indefinite" />
								</circle>
								<text x="775" y="186" text-anchor="middle" font-size="12" font-weight="bold" fill="#f59e0b">72%</text>
							</g>
						</g>

						<!-- Environmental Elements -->
						<g class="environment">
							<!-- Ground Level Details -->
							<line x1="0" y1="465" x2="1000" y2="465" stroke="#6b7280" stroke-width="1.5" opacity="0.3"/>
							
							<!-- Trees and Landscaping -->
							<g class="trees">
								<circle cx="38" cy="450" r="19" fill="none" stroke="#22c55e" stroke-width="3" opacity="0.7"/>
								<line x1="38" y1="450" x2="38" y2="475" stroke="#8b5a2b" stroke-width="4"/>
								
								<circle cx="940" cy="455" r="15" fill="none" stroke="#22c55e" stroke-width="3" opacity="0.7"/>
								<line x1="940" y1="455" x2="940" y2="475" stroke="#8b5a2b" stroke-width="3"/>
							</g>
							
							<!-- Clouds -->
							<g class="clouds" opacity="0.4">
								<ellipse cx="190" cy="38" rx="32" ry="15" fill="none" stroke="#9ca3af" stroke-width="1.5">
									<animateTransform attributeName="transform" type="translate" values="0,0;62,0;0,0" dur="30s" repeatCount="indefinite" />
								</ellipse>
								<ellipse cx="625" cy="25" rx="38" ry="19" fill="none" stroke="#9ca3af" stroke-width="1.5">
									<animateTransform attributeName="transform" type="translate" values="0,0;-50,0;0,0" dur="35s" repeatCount="indefinite" />
								</ellipse>
							</g>
						</g>

						<!-- Safety and Quality Indicators -->
						<g class="safety-indicators">
							<!-- Safety Zone -->
							<rect x="100" y="385" width="250" height="100" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="12,6" opacity="0.6">
								<animate attributeName="stroke-dashoffset" values="0;18;0" dur="4s" repeatCount="indefinite" />
							</rect>
							<text x="225" y="410" text-anchor="middle" font-size="12" font-weight="bold" fill="#fbbf24">SAFETY ZONE</text>
							
							<!-- Quality Control Checkpoint -->
							<circle cx="500" cy="385" r="25" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="6,6">
								<animate attributeName="stroke-dashoffset" values="0;12;0" dur="3s" repeatCount="indefinite" />
							</circle>
							<text x="500" y="391" text-anchor="middle" font-size="10" font-weight="bold" fill="#3b82f6">QC</text>
						</g>
					</svg>

					<!-- Smart Construction Management Card -->
					<div class={`absolute top-1/3 -right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-200/50 dark:border-slate-700/50 max-w-xs transition-all duration-1000 delay-1000 ${mounted ? 'animate-float-reverse-advanced' : 'opacity-0'}`}>
						<div class="flex items-center space-x-3">
							<div class="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-xl flex items-center justify-center">
								<span class="text-2xl animate-pulse-gentle">🌿</span>
							</div>
							<div>
								<div class="text-lg font-bold text-slate-900 dark:text-white">
									{($locale || 'en') === 'ar' ? 'البناء المستدام' : 'Sustainable Construction'}
								</div>
								<div class="text-xs text-slate-600 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? 'تقنيات صديقة للبيئة' : 'Eco-Friendly Technologies'}
								</div>
							</div>
						</div>
					</div>

					<!-- Advanced Construction Technology Badge -->
					<div class={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-1000 delay-1200 ${mounted ? 'animate-float-gentle-advanced' : 'opacity-0'}`}>
						<div class="flex items-center space-x-3">
							<div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl flex items-center justify-center">
								<span class="text-2xl animate-spin-slow">🔧</span>
							</div>
							<div>
								<div class="text-lg font-bold text-slate-900 dark:text-white">
									{($locale || 'en') === 'ar' ? 'التقنيات المتقدمة' : 'Advanced Engineering'}
								</div>
								<div class="text-xs text-slate-600 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? 'حلول هندسية ذكية' : 'Smart Engineering Solutions'}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Advanced Animation Keyframes */
	@keyframes slide-up-bounce {
		0% {
			opacity: 0;
			transform: translateY(60px) scale(0.95);
		}
		60% {
			opacity: 0.8;
			transform: translateY(-10px) scale(1.02);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fade-in-right-advanced {
		0% {
			opacity: 0;
			transform: translateX(40px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	@keyframes float-reverse-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(8px) rotate(-2deg) scale(1.02); 
		}
		75% { 
			transform: translateY(-4px) rotate(1deg) scale(0.98); 
		}
	}

	@keyframes float-gentle-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		50% { 
			transform: translateY(-10px) rotate(1deg) scale(1.03); 
		}
	}

	@keyframes float-slow {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-30px) scale(1.1); 
		}
	}

	@keyframes float-reverse {
		0%, 100% { 
			transform: translateY(0px) scale(1) rotate(0deg); 
		}
		50% { 
			transform: translateY(25px) scale(0.9) rotate(180deg); 
		}
	}

	@keyframes gradient-flow {
		0%, 100% { 
			background-position: 0% 50%; 
		}
		50% { 
			background-position: 100% 50%; 
		}
	}

	@keyframes pulse-glow {
		0%, 100% { 
			box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2);
			transform: scale(1);
		}
		50% { 
			box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
			transform: scale(1.05);
		}
	}

	@keyframes bounce-gentle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-8px) scale(1.05); 
		}
	}

	@keyframes pulse-subtle {
		0%, 100% { 
			opacity: 0.5; 
			transform: scale(1);
		}
		50% { 
			opacity: 0.8; 
			transform: scale(1.05);
		}
	}

	@keyframes pulse-gentle {
		0%, 100% { 
			transform: scale(1); 
		}
		50% { 
			transform: scale(1.2); 
		}
	}

	@keyframes fade-in-delayed {
		0%, 30% { 
			opacity: 0; 
			transform: translateY(20px); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}

	@keyframes float-particle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
			opacity: 0.4;
		}
		50% { 
			transform: translateY(-20px) scale(1.2); 
			opacity: 0.8;
		}
	}

	@keyframes light-ray {
		0%, 100% { 
			opacity: 0.2; 
			transform: scaleY(1);
		}
		50% { 
			opacity: 0.6; 
			transform: scaleY(1.2);
		}
	}

	@keyframes light-ray-reverse {
		0%, 100% { 
			opacity: 0.3; 
			transform: scaleY(1) rotate(-12deg);
		}
		50% { 
			opacity: 0.7; 
			transform: scaleY(1.3) rotate(-12deg);
		}
	}

	@keyframes light-ray-slow {
		0%, 100% { 
			opacity: 0.1; 
			transform: scaleY(1) rotate(6deg);
		}
		50% { 
			opacity: 0.4; 
			transform: scaleY(1.1) rotate(6deg);
		}
	}

	@keyframes spin-slow {
		from { 
			transform: rotate(0deg); 
		}
		to { 
			transform: rotate(360deg); 
		}
	}

	@keyframes pulse-border {
		0%, 100% { 
			border-color: rgba(148, 163, 184, 0.5); 
		}
		50% { 
			border-color: rgba(16, 185, 129, 0.8); 
		}
	}

	@keyframes scroll-indicator {
		0% { 
			transform: translateY(0px); 
			opacity: 1; 
		}
		50% { 
			transform: translateY(8px); 
			opacity: 0.5; 
		}
		100% { 
			transform: translateY(0px); 
			opacity: 1; 
		}
	}

	/* Animation Classes */
	.animate-slide-up-bounce {
		animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.animate-fade-in-right-advanced {
		animation: fade-in-right-advanced 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.animate-float-reverse-advanced {
		animation: float-reverse-advanced 6s ease-in-out infinite;
	}

	.animate-float-gentle-advanced {
		animation: float-gentle-advanced 8s ease-in-out infinite;
	}

	.animate-float-slow {
		animation: float-slow 15s ease-in-out infinite;
	}

	.animate-float-reverse {
		animation: float-reverse 20s ease-in-out infinite;
	}

	.animate-gradient-flow {
		animation: gradient-flow 8s ease infinite;
	}

	.animate-pulse-glow {
		animation: pulse-glow 3s ease-in-out infinite;
	}

	.animate-bounce-gentle {
		animation: bounce-gentle 3s ease-in-out infinite;
	}

	.animate-pulse-subtle {
		animation: pulse-subtle 4s ease-in-out infinite;
	}

	.animate-pulse-gentle {
		animation: pulse-gentle 3s ease-in-out infinite;
	}

	.animate-fade-in-delayed {
		animation: fade-in-delayed 2s ease-out;
	}

	.animate-float-particle {
		animation: float-particle 4s ease-in-out infinite;
	}

	.animate-light-ray {
		animation: light-ray 8s ease-in-out infinite;
	}

	.animate-light-ray-reverse {
		animation: light-ray-reverse 10s ease-in-out infinite;
	}

	.animate-light-ray-slow {
		animation: light-ray-slow 12s ease-in-out infinite;
	}

	.animate-spin-slow {
		animation: spin-slow 8s linear infinite;
	}

	.animate-pulse-border {
		animation: pulse-border 3s ease-in-out infinite;
	}

	.animate-scroll-indicator {
		animation: scroll-indicator 2s ease-in-out infinite;
	}

	/* Utility Classes */
	.bg-300\% {
		background-size: 300% 300%;
	}

	.shadow-2xl {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Responsive Typography */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.25rem !important; /* text-4xl */
			line-height: 1.1;
		}
		
		h1 span:last-child {
			font-size: 1.125rem !important; /* text-lg */
		}
		
		p {
			font-size: 1rem !important; /* text-base */
		}
	}

	/* RTL Support */
	[dir="rtl"] .group-hover\:translate-x-1 {
		transform: translateX(-0.25rem);
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

	/* Dark Mode Enhancements */
	.dark .backdrop-blur-sm {
		backdrop-filter: blur(12px) saturate(180%);
	}

	/* Performance optimizations */
	.transform {
		will-change: transform;
	}

	.transition-all {
		will-change: auto;
	}

	/* Focus Styles */
	.focus\:ring-4:focus {
		box-shadow: 0 0 0 4px var(--tw-ring-color);
	}

	/* GPU Acceleration */
	.animate-float-reverse-advanced,
	.animate-float-gentle-advanced,
	.animate-gradient-flow,
	.animate-pulse-glow {
		will-change: transform;
		transform: translateZ(0);
	}
</style>