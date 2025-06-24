<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Users, Award, Globe, Zap } from 'lucide-svelte';
	
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import TestimonialSection from '$lib/components/TestimonialSection.svelte';
	import { APP_CONFIG, COMPANY_STATS } from '$lib/config/app.js';

	let mounted = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	let scrollY = $state(0);
  
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 40 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.4 + 0.2
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			mousePosition = {
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			};
		};
		
		// Scroll tracking for parallax effects
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const services = [
		{
			title: 'تخطيط النقل',
			titleEn: 'Transport Planning',
			description: 'خدمات تخطيط النقل الاستراتيجية للحلول المستدامة والفعالة للتنقل',
			descriptionEn: 'Strategic transport planning services for sustainable and efficient mobility solutions',
			href: '/transport-planning',
			icon: '🗺️',
			features: ['دراسات الجدوى', 'التخطيط الرئيسي', 'الوصول للموقع', 'خطط السفر'],
			featuresEn: ['Feasibility Studies', 'Master Planning', 'Site Access', 'Travel Plans']
		},
		{
			title: 'هندسة المرور',
			titleEn: 'Traffic Engineering',
			description: 'حلول هندسة مرور متقدمة للتحديات المعقدة في النقل',
			descriptionEn: 'Advanced traffic engineering solutions for complex transportation challenges',
			href: '/traffic-engineering',
			icon: '🚦',
			features: ['نمذجة المرور', 'تقييم التأثير', 'حلول ITS', 'هندسة السلامة'],
			featuresEn: ['Traffic Modelling', 'Impact Assessment', 'ITS Solutions', 'Safety Engineering']
		},
		{
			title: 'هندسة الطرق السريعة',
			titleEn: 'Highway Engineering',
			description: 'خدمات شاملة لتصميم وهندسة الطرق السريعة لتطوير البنية التحتية الحديثة',
			descriptionEn: 'Comprehensive highway design and engineering services for modern infrastructure development',
			href: '/highway-engineering', 
			icon: '🛣️',
			features: ['تصميم مواقف السيارات', 'إدارة المرور', 'تصميم التقاطعات', 'الحلول المستدامة'],
			featuresEn: ['Parking Design', 'Traffic Management', 'Junction Design', 'Sustainable Solutions']
		}
	];
  
	// Use COMPANY_STATS from config
	const stats = COMPANY_STATS.map(stat => ({
		value: stat.number,
		label: ($locale || 'en') === 'ar' ? stat.label : stat.labelEn
	}));
  
	const features = [
		{
			icon: Users,
			title: ($locale || 'en') === 'ar' ? 'فريق خبراء' : 'Expert Team',
			description: ($locale || 'en') === 'ar' ? 'مهندسون ومخططون مؤهلون تأهيلاً عالياً مع خبرة واسعة في الصناعة' : 'Highly qualified engineers and planners with extensive industry experience'
		},
		{
			icon: Award,
			title: ($locale || 'en') === 'ar' ? 'حائز على جوائز' : 'Award Winning',
			description: ($locale || 'en') === 'ar' ? 'معترف به للتميز في هندسة النقل والحلول المبتكرة' : 'Recognized for excellence in transport engineering and innovative solutions'
		},
		{
			icon: Globe,
			title: ($locale || 'en') === 'ar' ? 'انتشار عالمي' : 'Global Reach',
			description: ($locale || 'en') === 'ar' ? 'مشاريع دولية عبر أسواق وبيئات تنظيمية متنوعة' : 'International projects across diverse markets and regulatory environments'
		},
		{
			icon: Zap,
			title: ($locale || 'en') === 'ar' ? 'الابتكار أولاً' : 'Innovation First',
			description: ($locale || 'en') === 'ar' ? 'تكنولوجيا وأساليب متطورة لنتائج مشاريع متفوقة' : 'Cutting-edge technology and methodologies for superior project outcomes'
		}
	];

	// Parallax offset calculations using $derived
	let parallaxOffset = $derived(scrollY * 0.5);
	let parallaxOffsetSlow = $derived(scrollY * 0.3);
	let parallaxOffsetFast = $derived(scrollY * 0.7);
</script>
  
<svelte:head>
	<title>{($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn} - {($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
</svelte:head>

<!-- Global Animated Background -->
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden"
	 style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%; --scroll-offset: {parallaxOffset}px;">
	
	<!-- Primary Gradient Orbs -->
	<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow"
		 style="transform: translateY(calc(var(--scroll-offset) * -0.3))"></div>
	<div class="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-float-reverse"
		 style="transform: translateY(calc(var(--scroll-offset) * -0.5))"></div>
	<div class="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-gentle"
		 style="transform: translateY(calc(var(--scroll-offset) * -0.2))"></div>
	
	<!-- Secondary Gradient Orbs -->
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-subtle"
		 style="transform: translate(-50%, -50%) translateY(calc(var(--scroll-offset) * -0.1))"></div>
	<div class="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-rose-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-slow"
		 style="transform: translateY(calc(var(--scroll-offset) * -0.4))"></div>
	
	<!-- Animated Geometric Grid -->
	<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800"
		 style="transform: translateY(calc(var(--scroll-offset) * -0.1))">
		<defs>
			<pattern id="globalGrid" width="100" height="100" patternUnits="userSpaceOnUse">
				<circle cx="50" cy="50" r="1.5" fill="currentColor" opacity="0.4">
					<animate attributeName="r" values="1;2.5;1" dur="6s" repeatCount="indefinite"/>
				</circle>
				<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
			</pattern>
			<linearGradient id="globalWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3"/>
				<stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.5"/>
				<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3"/>
			</linearGradient>
		</defs>
		
		<rect width="100%" height="100%" fill="url(#globalGrid)" />
		
		<!-- Animated Waves -->
		<path d="M0,300 Q300,250 600,300 T1200,300 L1200,0 L0,0 Z" fill="url(#globalWaveGradient)" opacity="0.1">
			<animate attributeName="d" values="M0,300 Q300,250 600,300 T1200,300 L1200,0 L0,0 Z;M0,320 Q300,270 600,320 T1200,320 L1200,0 L0,0 Z;M0,300 Q300,250 600,300 T1200,300 L1200,0 L0,0 Z" dur="10s" repeatCount="indefinite"/>
		</path>
		<path d="M0,500 Q400,450 800,500 T1200,500 L1200,800 L0,800 Z" fill="url(#globalWaveGradient)" opacity="0.05">
			<animate attributeName="d" values="M0,500 Q400,450 800,500 T1200,500 L1200,800 L0,800 Z;M0,520 Q400,470 800,520 T1200,520 L1200,800 L0,800 Z;M0,500 Q400,450 800,500 T1200,500 L1200,800 L0,800 Z" dur="15s" repeatCount="indefinite"/>
		</path>
	</svg>
	
	<!-- Floating Particles -->
	<div class="absolute inset-0">
		{#each particles as particle}
			<div 
				class="absolute rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 animate-float-particle"
				style="
					left: {particle.x}%;
					top: {particle.y}%;
					width: {particle.size}px;
					height: {particle.size}px;
					opacity: {particle.opacity};
					animation-duration: {particle.speed * 6}s;
					transform: translate(calc(var(--mouse-x) * 0.{Math.floor(particle.id % 10) + 1}px), calc(var(--mouse-y) * 0.{Math.floor(particle.id % 10) + 1}px)) translateY(calc(var(--scroll-offset) * -0.{Math.floor(particle.id % 5) + 2}));
				"
			></div>
		{/each}
	</div>

	<!-- Dynamic Light Rays -->
	<div class="absolute inset-0 opacity-15 dark:opacity-10">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"
			 style="transform: rotate(12deg) translateY(calc(var(--scroll-offset) * -0.1))"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"
			 style="transform: rotate(-12deg) translateY(calc(var(--scroll-offset) * -0.15))"></div>
		<div class="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-amber-400 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"
			 style="transform: rotate(6deg) translateY(calc(var(--scroll-offset) * -0.05))"></div>
	</div>
</div>

<!-- Main Content with relative positioning -->
<div class="relative z-10">
	
	<!-- Hero Section -->
	<Hero />
	  
	<!-- Enhanced Services Overview -->
	<section class="py-24 bg-slate-50/80 dark:bg-slate-800/80 relative backdrop-blur-sm">
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
					{($locale || 'en') === 'ar' ? 'خدماتنا الأساسية' : 'Our Core Services'}
				</h2>
				<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'حلول هندسة النقل الشاملة المصممة لمواجهة تحديات تطوير البنية التحتية الحديثة'
						: 'Comprehensive transport engineering solutions designed to meet the challenges of modern infrastructure development'
					}
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each services as service}
					<ServiceCard {service} />
				{/each}
			</div>
		</div>
	</section>
	  

	<!-- Enhanced Features Section -->
	<section class="py-24 bg-white/80 dark:bg-slate-900/80 relative backdrop-blur-sm">
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
					{($locale || 'en') === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
				</h2>
				<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نجمع بين الخبرة التقنية والأساليب المبتكرة لتقديم نتائج استثنائية لكل مشروع'
						: 'We combine technical expertise with innovative approaches to deliver exceptional results for every project'
					}
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each features as feature, index}
					<div class={`text-center group transition-all duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
						<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 shadow-xl">
							<svelte:component this={feature.icon} class="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
	  

	<!-- Enhanced CTA Section -->
	<section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600 relative overflow-hidden">
		<!-- Enhanced Background Effects -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		</div>

		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-4">
				{($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروعك؟' : 'Ready to Start Your Project?'}
			</h2>
			<p class="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'دع فريقنا من الخبراء يساعدك في إنشاء حلول نقل مبتكرة تحقق النجاح'
					: 'Let our expert team help you create innovative transport solutions that drive success'
				}
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a 
					href="/contact" 
					class="group inline-flex items-center justify-center px-12 py-5 bg-white text-emerald-600 font-black rounded-2xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
				>
					{($locale || 'en') === 'ar' ? 'ابدأ اليوم' : 'Get Started Today'}
					<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
				</a>
				<a 
					href="/services" 
					class="inline-flex items-center justify-center px-12 py-5 border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
				>
					{($locale || 'en') === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
				</a>
			</div>
		</div>
	</section>

</div>

<style>
	/* Global Background Animation Keyframes */
	@keyframes float-slow {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-40px) scale(1.05); 
		}
	}

	@keyframes float-reverse {
		0%, 100% { 
			transform: translateY(0px) scale(1) rotate(0deg); 
		}
		50% { 
			transform: translateY(30px) scale(0.95) rotate(2deg); 
		}
	}

	@keyframes float-gentle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-20px) scale(1.03); 
		}
	}

	@keyframes pulse-subtle {
		0%, 100% { 
			opacity: 0.6; 
			transform: scale(1);
		}
		50% { 
			opacity: 0.9; 
			transform: scale(1.05);
		}
	}

	@keyframes float-particle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
			opacity: 0.4;
		}
		50% { 
			transform: translateY(-25px) scale(1.2); 
			opacity: 0.8;
		}
	}

	@keyframes light-ray {
		0%, 100% { 
			opacity: 0.3; 
			transform: scaleY(1);
		}
		50% { 
			opacity: 0.7; 
			transform: scaleY(1.3);
		}
	}

	@keyframes light-ray-reverse {
		0%, 100% { 
			opacity: 0.4; 
			transform: scaleY(1) rotate(-12deg);
		}
		50% { 
			opacity: 0.8; 
			transform: scaleY(1.4) rotate(-12deg);
		}
	}

	@keyframes light-ray-slow {
		0%, 100% { 
			opacity: 0.2; 
			transform: scaleY(1) rotate(6deg);
		}
		50% { 
			opacity: 0.5; 
			transform: scaleY(1.2) rotate(6deg);
		}
	}

	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Animation Classes */
	.animate-float-slow { 
		animation: float-slow 20s ease-in-out infinite; 
	}
	
	.animate-float-reverse { 
		animation: float-reverse 25s ease-in-out infinite; 
	}
	
	.animate-float-gentle { 
		animation: float-gentle 18s ease-in-out infinite; 
	}
	
	.animate-pulse-subtle { 
		animation: pulse-subtle 8s ease-in-out infinite; 
	}
	
	.animate-float-particle { 
		animation: float-particle 6s ease-in-out infinite; 
	}
	
	.animate-light-ray { 
		animation: light-ray 12s ease-in-out infinite; 
	}
	
	.animate-light-ray-reverse { 
		animation: light-ray-reverse 15s ease-in-out infinite; 
	}
	
	.animate-light-ray-slow { 
		animation: light-ray-slow 18s ease-in-out infinite; 
	}
	
	.animate-fade-in-up { 
		animation: fade-in-up 0.6s ease-out forwards; 
	}

	/* Enhanced Background Blur Support */
	.backdrop-blur-sm {
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	/* Performance Optimizations */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-float-gentle,
	.animate-pulse-subtle {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Enhanced Responsive Design */
	@media (max-width: 768px) {
		/* Reduce particle count and animation intensity on mobile */
		.animate-float-particle {
			animation-duration: 8s;
		}
	}

	/* Reduced Motion Support */
	@media (prefers-reduced-motion: reduce) {
		.animate-float-slow,
		.animate-float-reverse,
		.animate-float-gentle,
		.animate-pulse-subtle,
		.animate-float-particle,
		.animate-light-ray,
		.animate-light-ray-reverse,
		.animate-light-ray-slow,
		.animate-fade-in-up {
			animation: none !important;
		}
		
		/* Provide static fallback positions */
		.animate-float-slow,
		.animate-float-reverse,
		.animate-float-gentle {
			opacity: 0.3;
		}
	}

	/* Dark Mode Enhancements */
	.dark .backdrop-blur-sm {
		backdrop-filter: blur(4px) saturate(120%);
		-webkit-backdrop-filter: blur(4px) saturate(120%);
	}

	/* GPU Acceleration for smooth animations */
	.fixed,
	.absolute {
		will-change: transform, opacity;
	}

	/* Z-index management */
	.relative.z-10 {
		position: relative;
		z-index: 10;
	}
</style>