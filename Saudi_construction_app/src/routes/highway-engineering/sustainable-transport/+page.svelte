<!-- src/routes/transport-planning/sustainable-transport-initiatives/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		Target, 
		BarChart3, 
		Route, 
		Building2, 
		Zap,
		Layers,
		Globe,
		Settings,
		Award,
		TrendingUp,
		Shield,
		Activity,
		Car,
		AlertTriangle,
		FileText,
		Calculator,
		Monitor,
		Smartphone,
		Wifi,
		Camera,
		Navigation,
		Radio,
		Eye,
		Search,
		FileSearch,
		Construction,
		Timer,
		MapPinned,
		TrafficCone,
		RotateCcw,
		Compass,
		Truck,
		ParkingCircle,
		Building,
		Grid3x3,
		ArrowUpDown,
		Maximize,
		Clipboard,
		Calendar,
		Siren,
		GitBranch,
		Crosshair,
		CircleDot,
		Waypoints,
		Network,
		Gauge,
		Droplets,
		Leaf,
		Trees,
		Bike,
		Bus,
		Footprints,
		Wind,
		Sun,
		Recycle,
		Battery,
		Lightbulb
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	let activeFeature = $state(0);

	onMount(() => {
		mounted = true;
		
		// Generate eco-themed particles for background animation
		particles = Array.from({ length: 90 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 8 + 2,
			speed: Math.random() * 4 + 0.5,
			opacity: Math.random() * 0.8 + 0.2,
			shape: i % 6, // 0: circle, 1: square, 2: triangle, 3: diamond, 4: hexagon, 5: leaf
			color: i % 3 // 0: green, 1: blue, 2: teal
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			if (mounted) {
				mousePosition = {
					x: (e.clientX / window.innerWidth) * 100,
					y: (e.clientY / window.innerHeight) * 100
				};
			}
		};
		
		if (typeof window !== 'undefined') {
			window.addEventListener('mousemove', handleMouseMove);
		}
		
		// Intersection observer for animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						visibleSections.add(entry.target.id);
						visibleSections = new Set(visibleSections);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '50px' }
		);

		setTimeout(() => {
			const animateElements = document.querySelectorAll('[data-animate]');
			animateElements.forEach(el => {
				if (el) observer.observe(el);
			});
		}, 100);

		// Auto-rotate active feature
		const featureInterval = setInterval(() => {
			activeFeature = (activeFeature + 1) % features.length;
		}, 4000);

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			observer.disconnect();
			clearInterval(featureInterval);
		};
	});

	const features = [
		{
			icon: Bus,
			title: 'تطوير أنظمة النقل العام المستدام',
			titleEn: 'Sustainable Public Transport Development',
			description: 'تصميم وتطوير أنظمة نقل عام حديثة ومستدامة تشمل الحافلات الكهربائية والقطارات الخضراء وفقاً لرؤية 2030',
			descriptionEn: 'Design and development of modern sustainable public transport systems including electric buses and green trains aligned with Vision 2030',
			color: 'from-green-500 to-emerald-600',
			image: '/images/features/sustainable-bus.jpg'
		},
		{
			icon: Bike,
			title: 'شبكات الدراجات الهوائية',
			titleEn: 'Cycling Network Infrastructure',
			description: 'تخطيط وتصميم شبكات آمنة ومتكاملة للدراجات الهوائية مع محطات الإيجار ومسارات محمية',
			descriptionEn: 'Planning and design of safe integrated cycling networks with rental stations and protected lanes',
			color: 'from-emerald-500 to-teal-600',
			image: '/images/features/cycling-network.jpg'
		},
		{
			icon: Footprints,
			title: 'مسارات المشي المستدامة',
			titleEn: 'Sustainable Walking Pathways',
			description: 'تطوير مسارات مشي صديقة للبيئة مع مظلات شمسية وأنظمة تبريد طبيعية مناسبة للمناخ السعودي',
			descriptionEn: 'Development of eco-friendly walking pathways with solar shades and natural cooling systems suitable for Saudi climate',
			color: 'from-teal-500 to-cyan-600',
			image: '/images/features/walking-paths.jpg'
		},
		{
			icon: Battery,
			title: 'محطات الشحن الكهربائي',
			titleEn: 'Electric Charging Stations',
			description: 'تخطيط وتصميم شبكة محطات شحن كهربائية تعمل بالطاقة الشمسية لدعم المركبات الكهربائية',
			descriptionEn: 'Planning and design of solar-powered electric charging station networks supporting electric vehicles',
			color: 'from-blue-500 to-green-600',
			image: '/images/features/charging-stations.jpg'
		},
		{
			icon: Wind,
			title: 'تقنيات النقل الذكي البيئي',
			titleEn: 'Green Smart Transport Technologies',
			description: 'تطبيق أحدث التقنيات الذكية الصديقة للبيئة في إدارة المرور وتحسين جودة الهواء',
			descriptionEn: 'Implementation of latest eco-friendly smart technologies in traffic management and air quality improvement',
			color: 'from-cyan-500 to-blue-600',
			image: '/images/features/smart-green-tech.jpg'
		},
		{
			icon: Trees,
			title: 'التشجير الحضري للطرق',
			titleEn: 'Urban Road Landscaping',
			description: 'تصميم مناظر طبيعية مستدامة للطرق مع أشجار محلية وأنظمة ري ذكية لتحسين البيئة الحضرية',
			descriptionEn: 'Sustainable road landscaping design with native trees and smart irrigation systems enhancing urban environment',
			color: 'from-green-500 to-teal-600',
			image: '/images/features/urban-landscaping.jpg'
		},
		{
			icon: Recycle,
			title: 'إعادة تدوير مواد البناء',
			titleEn: 'Construction Material Recycling',
			description: 'استخدام مواد بناء معاد تدويرها ومستدامة في مشاريع البنية التحتية للنقل',
			descriptionEn: 'Using recycled and sustainable construction materials in transport infrastructure projects',
			color: 'from-teal-500 to-emerald-600',
			image: '/images/features/material-recycling.jpg'
		},
		{
			icon: Sun,
			title: 'حلول الطاقة المتجددة',
			titleEn: 'Renewable Energy Solutions',
			description: 'دمج أنظمة الطاقة الشمسية والمتجددة في البنية التحتية للنقل لتحقيق الاستدامة الكاملة',
			descriptionEn: 'Integration of solar and renewable energy systems in transport infrastructure for complete sustainability',
			color: 'from-yellow-500 to-green-600',
			image: '/images/features/renewable-energy.jpg'
		}
	];

	const benefits = [
		{
			title: 'دعم رؤية السعودية 2030',
			titleEn: 'Supporting Saudi Vision 2030',
			description: 'جميع مبادراتنا تدعم أهداف رؤية المملكة 2030 في تحقيق الاستدامة البيئية وتقليل الانبعاثات الكربونية وتحسين جودة الحياة',
			descriptionEn: 'All our initiatives support Saudi Vision 2030 goals in achieving environmental sustainability, reducing carbon emissions, and improving quality of life',
			image: '/images/benefits/vision-2030.jpg'
		},
		{
			title: 'خبرة عالمية متقدمة',
			titleEn: 'Advanced International Expertise',
			description: 'نستفيد من المعرفة والخبرة الدولية لتطبيق أفضل الممارسات العالمية في النقل المستدام المناسبة للبيئة السعودية',
			descriptionEn: 'We leverage international knowledge and experience to implement global best practices in sustainable transport suitable for Saudi environment',
			image: '/images/benefits/global-expertise.jpg'
		},
		{
			title: 'حلول مبتكرة للتحول النمطي',
			titleEn: 'Innovative Modal Shift Solutions',
			description: 'نقدم حلول تصميم مبتكرة لتشجيع التحول من استخدام المركبات الخاصة إلى وسائل النقل المستدامة والصديقة للبيئة',
			descriptionEn: 'We provide innovative design solutions to encourage shift from private vehicles to sustainable and environmentally friendly transport modes',
			image: '/images/benefits/modal-shift.jpg'
		}
	];

	const caseStudies = [
		{
			title: 'مشروع النقل المستدام - نيوم',
			titleEn: 'Sustainable Transport Project - NEOM',
			description: 'تطوير نظام نقل مستدام متكامل في نيوم يعتمد على الطاقة المتجددة والتقنيات الذكية مع شبكة دراجات وممرات مشي',
			descriptionEn: 'Development of integrated sustainable transport system in NEOM based on renewable energy and smart technologies with cycling and walking networks',
			location: 'نيوم، المملكة العربية السعودية',
			locationEn: 'NEOM, Saudi Arabia',
			scope: '500 كم مسارات، نظام ذكي متكامل',
			scopeEn: '500 km pathways, integrated smart system',
			image: '/images/case-studies/neom-sustainable.jpg',
			stats: { pathways: '500km', emissions: '-80%', users: '2M' }
		},
		{
			title: 'شبكة الدراجات الخضراء - الرياض',
			titleEn: 'Green Cycling Network - Riyadh',
			description: 'إنشاء شبكة دراجات هوائية شاملة في الرياض مع 200 محطة إيجار ومسارات محمية تخدم 500,000 مستخدم',
			descriptionEn: 'Establishment of comprehensive cycling network in Riyadh with 200 rental stations and protected lanes serving 500,000 users',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			scope: '300 كم مسارات، 200 محطة',
			scopeEn: '300 km lanes, 200 stations',
			image: '/images/case-studies/riyadh-cycling.jpg',
			stats: { lanes: '300km', stations: '200', users: '500K' }
		},
		{
			title: 'الحافلات الكهربائية - جدة',
			titleEn: 'Electric Bus System - Jeddah',
			description: 'تطوير نظام حافلات كهربائية بالكامل في جدة مع محطات شحن شمسية وتطبيق ذكي لإدارة الرحلات',
			descriptionEn: 'Development of fully electric bus system in Jeddah with solar charging stations and smart trip management app',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			scope: '150 حافلة كهربائية، 50 محطة شحن',
			scopeEn: '150 electric buses, 50 charging stations',
			image: '/images/case-studies/jeddah-electric-bus.jpg',
			stats: { buses: '150', stations: '50', reduction: '90%' }
		}
	];

	const stats = [
		{ 
			value: '75%', 
			label: 'تقليل في الانبعاثات الكربونية', 
			labelEn: 'Carbon Emissions Reduction', 
			icon: Leaf,
			color: 'from-green-500 to-emerald-600'
		},
		{ 
			value: '200+', 
			label: 'مشروع نقل مستدام', 
			labelEn: 'Sustainable Transport Projects', 
			icon: Trees,
			color: 'from-emerald-500 to-teal-600'
		},
		{ 
			value: '1.5M+', 
			label: 'مستخدم للنقل الأخضر', 
			labelEn: 'Green Transport Users', 
			icon: Bus,
			color: 'from-teal-500 to-cyan-600'
		},
		{ 
			value: '100%', 
			label: 'طاقة متجددة', 
			labelEn: 'Renewable Energy Powered', 
			icon: Sun,
			color: 'from-yellow-500 to-green-600'
		}
	];

	const contactInfo = {
		riyadhPhone: '+966 11 234 5678',
		jeddahPhone: '+966 12 345 6789',
		neomPhone: '+966 50 987 6543',
		mobile: '+966 50 123 4567',
		email: 'sustainability@engineering-sa.com',
		address: 'مركز الأعمال المستدامة، طريق الملك فهد، الرياض 12345، المملكة العربية السعودية',
		addressEn: 'Sustainable Business Center, King Fahd Road, Riyadh 12345, Saudi Arabia',
		company: 'شركة الاستشارات الهندسية المتقدمة',
		companyEn: 'Advanced Engineering Consultancy'
	};

	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}

	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}

	function getParticleShape(shape) {
		switch(shape) {
			case 0: return 'rounded-full';
			case 1: return 'rounded-none';
			case 2: return 'rounded-sm rotate-45';
			case 3: return 'rounded-lg rotate-45';
			case 4: return 'rounded-md rotate-30';
			case 5: return 'rounded-full'; // leaf shape approximation
			default: return 'rounded-full';
		}
	}

	function getParticleColor(color) {
		switch(color) {
			case 0: return 'from-green-400 to-emerald-500';
			case 1: return 'from-emerald-400 to-teal-500';
			case 2: return 'from-teal-400 to-cyan-500';
			default: return 'from-green-400 to-emerald-500';
		}
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'مبادرات النقل المستدام' : 'Sustainable Transport Initiatives'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'مبادرات النقل المستدام العالمية لدعم رؤية السعودية 2030 وتحقيق الاستدامة البيئية' : 'Global sustainable transport initiatives supporting Saudi Vision 2030 and achieving environmental sustainability'}" />
</svelte:head>

<!-- Enhanced Hero Section with Sustainability Theme -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
	
	<!-- Advanced Eco-Themed Background -->
	<div class="absolute inset-0">
		<!-- Enhanced Gradient Orbs -->
		<div class="absolute top-10 left-10 w-[800px] h-[800px] bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 1.0)}></div>
		<div class="absolute bottom-10 right-10 w-[700px] h-[700px] bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.7)}></div>
		<div class="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-teal-400/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Sustainability Network Grid Pattern -->
		<svg class="absolute inset-0 w-full h-full opacity-15 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="sustainableGrid" width="250" height="200" patternUnits="userSpaceOnUse">
					<!-- Bike Paths -->
					<path d="M 0 100 L 250 100" stroke="currentColor" stroke-width="2" opacity="0.3" stroke-dasharray="5 5"/>
					<path d="M 0 120 L 250 120" stroke="currentColor" stroke-width="1" opacity="0.2"/>
					
					<!-- Trees/Nature Elements -->
					<circle cx="50" cy="110" r="8" fill="currentColor" opacity="0.2"/>
					<circle cx="50" cy="110" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					
					<circle cx="150" cy="110" r="8" fill="currentColor" opacity="0.2"/>
					<circle cx="150" cy="110" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					
					<circle cx="200" cy="110" r="8" fill="currentColor" opacity="0.2"/>
					<circle cx="200" cy="110" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					
					<!-- Eco Connections -->
					<path d="M 50 110 Q 100 80 150 110" stroke="currentColor" stroke-width="1" opacity="0.2" fill="none"/>
					<path d="M 150 110 Q 175 90 200 110" stroke="currentColor" stroke-width="1" opacity="0.2" fill="none"/>
					
					<!-- Solar Panels -->
					<rect x="20" y="60" width="15" height="8" fill="currentColor" opacity="0.2"/>
					<rect x="170" y="60" width="15" height="8" fill="currentColor" opacity="0.2"/>
					
					<!-- Animated Elements -->
					<circle cx="125" cy="110" r="3" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="2;6;2" dur="5s" repeatCount="indefinite"/>
						<animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite"/>
					</circle>
				</pattern>
				<linearGradient id="sustainableWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6"/>
					<stop offset="33%" style="stop-color:#059669;stop-opacity:0.8"/>
					<stop offset="66%" style="stop-color:#0d9488;stop-opacity:0.7"/>
					<stop offset="100%" style="stop-color:#0891b2;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#sustainableGrid)" />
			
			<!-- Animated Sustainable Networks -->
			<path d="M0,150 Q200,100 400,150 Q600,200 800,150 Q1000,100 1200,150" stroke="url(#sustainableWave)" stroke-width="6" fill="none" opacity="0.7" class="sustainable-line-1"/>
			<path d="M0,350 Q150,300 300,350 Q450,400 600,350 Q750,300 900,350 Q1050,400 1200,350" stroke="url(#sustainableWave)" stroke-width="5" fill="none" opacity="0.6" class="sustainable-line-2"/>
			<path d="M0,550 Q300,500 600,550 Q900,600 1200,550" stroke="url(#sustainableWave)" stroke-width="4" fill="none" opacity="0.5" class="sustainable-line-3"/>
		</svg>
		
		<!-- Enhanced Multi-Color Eco Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute bg-gradient-to-r {getParticleColor(particle.color)} animate-float-particle {getParticleShape(particle.shape)}"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 3}s;
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 15 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Enhanced Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/6 w-5 h-full bg-gradient-to-b from-green-400 via-transparent to-transparent transform rotate-10 animate-light-ray"></div>
			<div class="absolute top-0 right-1/5 w-5 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform -rotate-10 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-4/5 w-4 h-full bg-gradient-to-b from-teal-400 via-transparent to-transparent transform rotate-5 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge with Sustainability Theme -->
			<div class={`inline-flex items-center px-8 py-5 bg-gradient-to-r from-green-100/90 to-emerald-100/90 dark:from-green-900/40 dark:to-emerald-900/40 backdrop-blur-2xl text-green-700 dark:text-green-300 rounded-full border-2 border-green-200/60 dark:border-green-700/60 text-base font-black mb-10 transition-all duration-1200 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'} shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer`}>
				<Leaf class="w-5 h-5 mr-4 rtl:ml-4 rtl:mr-0 animate-pulse-eco" />
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-2xl animate-bounce-eco">🌱</span>
				{($locale || 'en') === 'ar' ? 'مبادرات النقل المستدام' : 'Sustainable Transport Initiatives'}
			</div>
			
			<!-- Enhanced Title with Eco Colors -->
			<div class={`transition-all duration-1200 delay-300 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<h1 class="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-10">
					<span class="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient-flow-enhanced bg-400% drop-shadow-lg">
						{($locale || 'en') === 'ar' ? 'النقل المستدام' : 'Sustainable Transport'}
					</span>
					<span class="block text-3xl lg:text-4xl xl:text-5xl font-black text-slate-700 dark:text-slate-300 mt-8 animate-fade-in-delayed-enhanced transform hover:scale-105 transition-transform duration-300">
						{($locale || 'en') === 'ar' ? 'لمستقبل أخضر' : 'For Green Future'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1200 delay-600 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<p class="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto mb-10 font-medium">
					{($locale || 'en') === 'ar' 
						? 'مبادرات النقل المستدام العالمية لدعم رؤية السعودية 2030 وتحقيق الاستدامة البيئية'
						: 'Global sustainable transport initiatives supporting Saudi Vision 2030 and achieving environmental sustainability'
					}
				</p>
				
				<!-- Enhanced Contact Info with Sustainability Focus -->
				<div class="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 max-w-6xl mx-auto">
					<div class="grid md:grid-cols-5 gap-4 text-base font-bold">
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
							<span class="text-3xl mb-2">🏢</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب الرياض</div>
							<a href={`tel:${contactInfo.riyadhPhone}`} class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-center text-sm">
								{contactInfo.riyadhPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
							<span class="text-3xl mb-2">🕌</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب جدة</div>
							<a href={`tel:${contactInfo.jeddahPhone}`} class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-center text-sm">
								{contactInfo.jeddahPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
							<span class="text-3xl mb-2">🌟</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب نيوم</div>
							<a href={`tel:${contactInfo.neomPhone}`} class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-center text-sm">
								{contactInfo.neomPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-green-50 dark:from-cyan-900/20 dark:to-green-900/20">
							<span class="text-3xl mb-2">📱</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جوال</div>
							<a href={`tel:${contactInfo.mobile}`} class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-center text-sm">
								{contactInfo.mobile}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
							<span class="text-3xl mb-2">🌱</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">استدامة</div>
							<a href={`mailto:${contactInfo.email}`} class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors text-center text-xs">
								{contactInfo.email}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Features Section with Sustainability Grid -->
<section id="features" data-animate class="py-32 bg-gradient-to-br from-white via-green-50/30 to-white dark:from-slate-900 dark:via-green-900/10 dark:to-slate-900 relative overflow-hidden">
	
	<!-- Enhanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-32 right-32 w-[700px] h-[700px] bg-gradient-to-r from-green-400/8 to-emerald-500/8 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 left-32 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/8 to-teal-500/8 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'خدمات النقل المستدام' : 'Sustainable Transport Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'حلول مبتكرة للنقل الأخضر تدعم رؤية المملكة 2030 نحو مستقبل مستدام'
					: 'Innovative green transport solutions supporting Kingdom Vision 2030 towards sustainable future'
				}
			</p>
		</div>

		<!-- Enhanced Features Grid with Sustainability Theme -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature, index}
				<div 
					class={`group relative bg-gradient-to-br from-white/95 to-green-50/95 dark:from-slate-800/95 dark:to-green-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-green-200/30 dark:border-green-700/30 overflow-hidden cursor-pointer ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'} ${activeFeature === index ? 'ring-4 ring-green-500/50 scale-105' : ''}`} 
					style="animation-delay: {index * 0.1}s;"
					on:mouseenter={() => activeFeature = index}
				>
					
					<!-- Enhanced Background Gradient -->
					<div class={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}></div>
					
					<!-- Enhanced Feature Image -->
					<div class="h-48 overflow-hidden rounded-t-3xl relative">
						<img 
							src={feature.image} 
							alt={($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Enhanced Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-700`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-600/30 via-emerald-600/30 to-teal-600/30 group-hover:from-green-600/40 group-hover:via-emerald-600/40 group-hover:to-teal-600/40 transition-all duration-700"></div>
						
						<!-- Floating Icon -->
						<div class="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
							<svelte:component this={feature.icon} class="w-6 h-6 text-green-600 dark:text-green-400" />
						</div>
					</div>
					
					<div class="relative z-10 p-6">
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-500 leading-tight">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
						
						<!-- Learn More Button -->
						<div class="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
							<button class="inline-flex items-center text-green-600 dark:text-green-400 font-bold text-xs hover:text-green-700 dark:hover:text-green-300">
								{($locale || 'en') === 'ar' ? 'اعرف المزيد' : 'Learn More'}
								<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-3 h-3 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
							</button>
						</div>
					</div>
					
					<!-- Enhanced Bottom Accent -->
					<div class={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Stats Section with Eco Colors -->
<section class="py-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
	<!-- Enhanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/6 w-5 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/5 w-5 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<div class="absolute top-0 left-4/5 w-4 h-full bg-gradient-to-b from-white/25 via-transparent to-transparent transform rotate-8 animate-light-ray-slow"></div>
		
		<!-- Floating Eco Elements -->
		<div class="absolute top-20 left-20 w-32 h-32 border-4 border-white/20 rounded-full animate-float-slow">
			<div class="absolute inset-4 bg-white/10 rounded-full"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
		</div>
		<div class="absolute bottom-20 right-20 w-28 h-28 border-4 border-white/20 rounded-lg animate-float-reverse transform rotate-45">
			<div class="absolute inset-3 bg-white/10 rounded"></div>
		</div>
		<div class="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-white/20 rounded-full animate-pulse-subtle">
			<div class="absolute inset-3 bg-white/10 rounded-full"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-10">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-enhanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<div class={`relative w-28 h-28 bg-white/25 backdrop-blur-2xl rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group hover:scale-125 transition-all duration-500 ${stat.color ? 'bg-gradient-to-br ' + stat.color : ''} border border-white/30`}>
						<svelte:component this={stat.icon} class="relative z-10 w-12 h-12 text-white drop-shadow-2xl" />
						<div class="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
						<!-- Enhanced Orbital Rings -->
						<div class="absolute inset-0 border-2 border-white/40 rounded-3xl animate-spin-slow"></div>
						<div class="absolute inset-2 border border-white/20 rounded-2xl animate-reverse-spin"></div>
						<div class="absolute inset-4 border border-white/10 rounded-xl animate-spin-slower"></div>
						<div class="absolute inset-6 border border-white/5 rounded-lg animate-reverse-spin-slow"></div>
					</div>
					<div class="text-5xl lg:text-6xl font-black text-white mb-3 animate-count-up-enhanced drop-shadow-lg">
						{stat.value}
					</div>
					<div class="text-green-100 font-bold text-lg leading-tight">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-32 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50 dark:from-slate-800 dark:via-emerald-900/10 dark:to-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-green-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن للنقل المستدام أن يحسن من بيئتك ومستقبلك' : 'Discover how sustainable transport can improve your environment and future'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			{#each benefits as benefit, index}
				<div class={`group bg-gradient-to-br from-white/98 to-green-50/50 dark:from-slate-900/98 dark:to-green-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 border border-green-200/30 dark:border-green-700/30 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.25}s;">
					
					<!-- Enhanced Benefit Image -->
					<div class="h-56 overflow-hidden relative">
						<img 
							src={benefit.image} 
							alt={($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Enhanced Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-8xl mb-6 animate-bounce-eco">🌱</div>
								<div class="text-green-600 dark:text-green-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'فائدة مستدامة' : 'Sustainable Benefit'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-600/25 via-emerald-600/25 to-green-600/25"></div>
						
						<!-- Floating Badge -->
						<div class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
							0{index + 1}
						</div>
					</div>
					
					<div class="p-8">
						<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-500 leading-tight">
							{($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
							{($locale || 'en') === 'ar' ? benefit.description : benefit.descriptionEn}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Case Studies Section -->
<section id="case-studies" data-animate class="py-32 bg-gradient-to-br from-white via-teal-50/30 to-white dark:from-slate-900 dark:via-teal-900/10 dark:to-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-teal-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400/10 to-green-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'دراسات حالة مشاريعنا المستدامة' : 'Our Sustainable Project Case Studies'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة في النقل المستدام عبر المملكة'
					: 'Examples of our successful sustainable transport projects across the Kingdom'
				}
			</p>
		</div>

		<div class="space-y-20">
			{#each caseStudies as study, index}
				<div class={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''} ${isVisible('case-studies') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.4}s;">
					
					<!-- Case Study Image -->
					<div class={`relative rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:col-start-2' : ''} group`}>
						<img 
							src={study.image} 
							alt={($locale || 'en') === 'ar' ? study.title : study.titleEn}
							class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Enhanced Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-9xl mb-6">🌍</div>
								<div class="text-green-600 dark:text-green-400 font-bold text-2xl">
									{($locale || 'en') === 'ar' ? 'مشروع مستدام' : 'Sustainable Project'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-green-600/30 via-emerald-600/30 to-teal-600/30"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-6 left-6 right-6">
							<div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
								<div class="grid grid-cols-3 gap-4 text-center">
									{#each Object.entries(study.stats) as [key, value]}
										<div>
											<div class="text-2xl font-black text-green-600">{value}</div>
											<div class="text-sm text-slate-600 capitalize font-bold">{key}</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
					
					<!-- Case Study Content -->
					<div class={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
						<div class="mb-6">
							<span class="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
								{($locale || 'en') === 'ar' ? 'مشروع مستدام مكتمل' : 'Completed Sustainable Project'}
							</span>
							<h3 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
								{($locale || 'en') === 'ar' ? study.title : study.titleEn}
							</h3>
						</div>
						
						<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<div class="grid grid-cols-2 gap-6">
							<div class="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
								<MapPin class="w-6 h-6 text-green-600 dark:text-green-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
								<div>
									<div class="text-sm text-slate-500 dark:text-slate-400 font-bold">
										{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
									</div>
									<div class="text-sm font-black text-slate-700 dark:text-slate-300">
										{($locale || 'en') === 'ar' ? study.location : study.locationEn}
									</div>
								</div>
							</div>
							<div class="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
								<Target class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
								<div>
									<div class="text-sm text-slate-500 dark:text-slate-400 font-bold">
										{($locale || 'en') === 'ar' ? 'النطاق' : 'Scope'}
									</div>
									<div class="text-sm font-black text-slate-700 dark:text-slate-300">
										{($locale || 'en') === 'ar' ? study.scope : study.scopeEn}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-32 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 dark:from-slate-950 dark:via-green-950 dark:to-emerald-950 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-4xl lg:text-5xl font-black text-white mb-6">
			{($locale || 'en') === 'ar' ? 'هل تريد بناء مستقبل نقل مستدام؟' : 'Ready to Build Sustainable Transport Future?'}
		</h2>
		<p class="text-2xl text-green-100 mb-12 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'انضم إلينا في رحلة تحويل النقل إلى نظام أخضر ومستدام يدعم رؤية المملكة 2030'
				: 'Join us in transforming transport into a green and sustainable system supporting Kingdom Vision 2030'
			}
		</p>
		
		<!-- Enhanced Contact Grid -->
		<div class="grid md:grid-cols-5 gap-6 mb-12">
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏢</div>
				<div class="font-bold text-green-100 mb-2 text-sm">الرياض</div>
				<a href={`tel:${contactInfo.riyadhPhone}`} class="text-white hover:text-green-300 transition-colors font-bold text-xs">
					{contactInfo.riyadhPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🕌</div>
				<div class="font-bold text-green-100 mb-2 text-sm">جدة</div>
				<a href={`tel:${contactInfo.jeddahPhone}`} class="text-white hover:text-green-300 transition-colors font-bold text-xs">
					{contactInfo.jeddahPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌟</div>
				<div class="font-bold text-green-100 mb-2 text-sm">نيوم</div>
				<a href={`tel:${contactInfo.neomPhone}`} class="text-white hover:text-green-300 transition-colors font-bold text-xs">
					{contactInfo.neomPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📱</div>
				<div class="font-bold text-green-100 mb-2 text-sm">جوال</div>
				<a href={`tel:${contactInfo.mobile}`} class="text-white hover:text-green-300 transition-colors font-bold text-xs">
					{contactInfo.mobile}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌱</div>
				<div class="font-bold text-green-100 mb-2 text-sm">استدامة</div>
				<a href={`mailto:${contactInfo.email}`} class="text-white hover:text-green-300 transition-colors font-bold text-xs">
					{contactInfo.email}
				</a>
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-8 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-3xl shadow-2xl text-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ رحلتك المستدامة' : 'Start Your Sustainable Journey'}
				<ArrowRight class="ml-4 rtl:mr-4 rtl:ml-0 w-7 h-7 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
			</a>
			<a 
				href="/transport-planning" 
				class="inline-flex items-center justify-center px-16 py-6 border-3 border-white/50 text-white font-black rounded-3xl hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:shadow-2xl text-xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف جميع الخدمات' : 'Explore All Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes */
	@keyframes slide-up-bounce-enhanced {
		0% {
			opacity: 0;
			transform: translateY(80px) scale(0.9);
		}
		60% {
			opacity: 0.8;
			transform: translateY(-15px) scale(1.05);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fade-in-up-advanced {
		0% {
			opacity: 0;
			transform: translateY(40px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes scale-in-enhanced {
		0% {
			opacity: 0;
			transform: scale(0.6) rotate(-10deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	@keyframes gradient-flow-enhanced {
		0%, 100% { 
			background-position: 0% 50%; 
		}
		50% { 
			background-position: 100% 50%; 
		}
	}

	@keyframes bounce-eco {
		0%, 100% { 
			transform: translateY(0) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(-10px) rotate(-5deg) scale(1.1); 
		}
		50% { 
			transform: translateY(-15px) rotate(0deg) scale(1.15); 
		}
		75% { 
			transform: translateY(-10px) rotate(5deg) scale(1.1); 
		}
	}

	@keyframes pulse-eco {
		0%, 100% { 
			transform: scale(1) rotate(0deg); 
			opacity: 0.8;
		}
		50% { 
			transform: scale(1.2) rotate(180deg); 
			opacity: 1;
		}
	}

	@keyframes reverse-spin {
		from { 
			transform: rotate(360deg); 
		}
		to { 
			transform: rotate(0deg); 
		}
	}

	@keyframes spin-slower {
		from { 
			transform: rotate(0deg); 
		}
		to { 
			transform: rotate(360deg); 
		}
	}

	@keyframes reverse-spin-slow {
		from { 
			transform: rotate(180deg); 
		}
		to { 
			transform: rotate(-180deg); 
		}
	}

	@keyframes fade-in-delayed-enhanced {
		0%, 40% { 
			opacity: 0; 
			transform: translateY(30px); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}

	@keyframes count-up-enhanced {
		0% { 
			opacity: 0; 
			transform: translateY(30px) scale(0.7); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0) scale(1); 
		}
	}

	@keyframes sustainable-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -200; }
	}
	
	/* Enhanced Animation Classes */
	.animate-slide-up-bounce-enhanced { animation: slide-up-bounce-enhanced 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.8s ease-out forwards; }
	.animate-scale-in-enhanced { animation: scale-in-enhanced 0.8s ease-out forwards; }
	.animate-gradient-flow-enhanced { 
		background-size: 400% 400%;
		animation: gradient-flow-enhanced 8s ease infinite;
	}
	.animate-bounce-eco { animation: bounce-eco 3s ease-in-out infinite; }
	.animate-pulse-eco { animation: pulse-eco 2.5s ease-in-out infinite; }
	.animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
	.animate-spin-slower { animation: spin-slower 25s linear infinite; }
	.animate-reverse-spin-slow { animation: reverse-spin-slow 20s linear infinite; }
	.animate-fade-in-delayed-enhanced { animation: fade-in-delayed-enhanced 2.5s ease-out; }
	.animate-count-up-enhanced { animation: count-up-enhanced 1.2s ease-out; }
	
	/* Sustainable Animation */
	.sustainable-line-1 {
		stroke-dasharray: 50 30;
		animation: sustainable-line-flow 12s linear infinite;
	}
	
	.sustainable-line-2 {
		stroke-dasharray: 40 25;
		animation: sustainable-line-flow 15s linear infinite reverse;
	}
	
	.sustainable-line-3 {
		stroke-dasharray: 35 20;
		animation: sustainable-line-flow 10s linear infinite;
	}

	/* Enhanced Utility Classes */
	.bg-400\% {
		background-size: 400% 400%;
	}

	.shadow-4xl {
		box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.35);
	}

	.border-3 {
		border-width: 3px;
	}

	.rotate-30 {
		transform: rotate(30deg);
	}

	/* Enhanced Responsive */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.5rem !important;
			line-height: 1.1;
		}
		
		.text-6xl {
			font-size: 3rem !important;
		}
		
		.grid-cols-5 {
			grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
		}
		
		.grid-cols-4 {
			grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
		}
	}

	/* Enhanced Hover States */
	.group:hover .animate-bounce-eco {
		animation-duration: 2s;
	}

	.group:hover .animate-pulse-eco {
		animation-duration: 2s;
	}
</style>