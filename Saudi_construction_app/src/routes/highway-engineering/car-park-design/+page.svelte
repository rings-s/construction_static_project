<!-- src/routes/transport-planning/car-park-design/+page.svelte -->
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
		Maximize
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	let activeFeature = $state(0);

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 60 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 6 + 2,
			speed: Math.random() * 3 + 0.5,
			opacity: Math.random() * 0.6 + 0.3
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
			icon: Grid3x3,
			title: 'تصميم وتخطيط مواقف السيارات المتخصص',
			titleEn: 'Specialist Car Park Design & Layout',
			description: 'تصميم متخصص لمواقف السيارات السكنية والتجارية والعامة مع تحسين التشغيل وزيادة السعة',
			descriptionEn: 'Specialist design for residential, business and public parking with improved operation and increased capacity',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/parking-design.jpg'
		},
		{
			icon: RotateCcw,
			title: 'إعادة تكوين التخطيطات الحالية',
			titleEn: 'Current Layout Reconfiguration',
			description: 'إعادة تكوين تخطيط مواقف السيارات الحالية لتحسين التشغيل أو زيادة السعة التشغيلية',
			descriptionEn: 'Reconfiguration of current car park layouts to improve operation or increase operational capacity',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/layout-reconfig.jpg'
		},
		{
			icon: Building,
			title: 'تصميم مواقف متعددة الطوابق',
			titleEn: 'Multi-Storey Car Park Design',
			description: 'حلول مبتكرة لإدارة مواقف متعددة الطوابق مع استخدام غير منتظم في جميع الطوابق',
			descriptionEn: 'Innovative solutions for managing multi-storey car parks with non-uniform utilisation across all storeys',
			color: 'from-blue-500 to-purple-600',
			image: '/images/features/multi-storey.jpg'
		},
		{
			icon: Route,
			title: 'إدارة المسارات والتوجيه',
			titleEn: 'Route Management & Guidance',
			description: 'تصميم مسارات آمنة وغير متضاربة مع أنظمة اللافتات والتوجيه المتقدمة',
			descriptionEn: 'Safe and non-conflicting route design with advanced signage and guidance systems',
			color: 'from-amber-500 to-emerald-600',
			image: '/images/features/route-management.jpg'
		},
		{
			icon: Truck,
			title: 'مناطق الخدمات والتحميل',
			titleEn: 'Service & Loading Areas',
			description: 'تصميم مناطق إدارة النفايات وتسليم البضائع مع تحليل مسار الكنس المتكامل',
			descriptionEn: 'Design of waste management and freight delivery areas with integrated swept path analysis',
			color: 'from-green-500 to-blue-600',
			image: '/images/features/service-areas.jpg'
		},
		{
			icon: BarChart3,
			title: 'مسوحات ضغط مواقف السيارات',
			titleEn: 'Parking Stress Surveys',
			description: 'تقييم الظروف المحلية لمواقف السيارات وفقاً لمنهجيات لامبيث والمنهجيات المحلية',
			descriptionEn: 'Evaluation of local parking circumstances according to Lambeth Methodologies and local area methodologies',
			color: 'from-indigo-500 to-purple-600',
			image: '/images/features/parking-surveys.jpg'
		}
	];

	const benefits = [
		{
			title: 'تصميم آمن وفعال',
			titleEn: 'Safe & Efficient Design',
			description: 'تصميم مواقف السيارات يمكن أن يكون تحدياً، خاصة عند محاولة استيعاب الحد الأدنى لعدد أماكن الوقوف المطلوبة من السلطة المحلية',
			descriptionEn: 'Car parking design can be challenging, especially when accommodating local authority minimum parking space requirements',
			image: '/images/benefits/safe-design.jpg'
		},
		{
			title: 'خبرة عالمية مبتكرة',
			titleEn: 'Innovative Worldwide Experience',
			description: 'باستخدام خبرتنا العالمية المبتكرة وأنظمة إدارة مواقف السيارات الحالية، يمكن لمستشارينا تقديم تخطيطات مواقف مبتكرة',
			descriptionEn: 'Using our innovative worldwide experience and current parking management systems, our consultants provide innovative parking layouts',
			image: '/images/benefits/global-experience.jpg'
		},
		{
			title: 'حلول الطلب في ساعات الذروة',
			titleEn: 'Peak-Period Demand Solutions',
			description: 'حلول لتلبية طلب مواقف السيارات في ساعات الذروة مع طرق لإدارة الاستخدام في المناطق غير الجذابة',
			descriptionEn: 'Solutions for peak-period parking demand with methods to manage utilization in unattractive zones',
			image: '/images/benefits/peak-demand.jpg'
		}
	];

	const caseStudies = [
		{
			title: 'التطوير السكني - الرياض',
			titleEn: 'Residential Development - Riyadh',
			description: 'مشروع تطوير سكني في الرياض يضم 150 وحدة سكنية مع موقف سيارات تحت الأرض وأنظمة إدارة ذكية',
			descriptionEn: 'Residential development in Riyadh featuring 150 residential units with underground parking and smart management systems',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			scope: '400 موقف سيارات، 3 طوابق تحت الأرض',
			scopeEn: '400 parking spaces, 3 underground levels',
			image: '/images/case-studies/riyadh-residential.jpg',
			stats: { units: '150', parking: '400', levels: '3' }
		},
		{
			title: 'مركز تجاري - جدة',
			titleEn: 'Commercial Center - Jeddah',
			description: 'تصميم موقف سيارات متعدد الطوابق لمركز تجاري في جدة مع أنظمة توجيه ذكية وإدارة حركة المرور',
			descriptionEn: 'Multi-storey car park design for commercial center in Jeddah with smart guidance systems and traffic management',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			scope: '800 موقف سيارات، 5 طوابق',
			scopeEn: '800 parking spaces, 5 levels',
			image: '/images/case-studies/jeddah-commercial.jpg',
			stats: { retail: '50,000m²', parking: '800', levels: '5' }
		},
		{
			title: 'مجمع طبي - الدمام',
			titleEn: 'Medical Complex - Dammam',
			description: 'تخطيط مواقف السيارات لمجمع طبي في الدمام مع مناطق خدمة للطوارئ ووصول المرضى',
			descriptionEn: 'Car park layout for medical complex in Dammam with emergency service areas and patient access',
			location: 'الدمام، المملكة العربية السعودية',
			locationEn: 'Dammam, Saudi Arabia',
			scope: '600 موقف سيارات، مناطق طوارئ',
			scopeEn: '600 parking spaces, emergency areas',
			image: '/images/case-studies/dammam-medical.jpg',
			stats: { beds: '300', parking: '600', emergency: '24/7' }
		}
	];

	const stats = [
		{ 
			value: '350+', 
			label: 'مشروع موقف سيارات مكتمل', 
			labelEn: 'Completed Car Park Projects', 
			icon: ParkingCircle,
			color: 'from-emerald-500 to-blue-600'
		},
		{ 
			value: '15K+', 
			label: 'موقف سيارات مصمم', 
			labelEn: 'Parking Spaces Designed', 
			icon: Grid3x3,
			color: 'from-blue-500 to-purple-600'
		},
		{ 
			value: '12+', 
			label: 'سنة خبرة متخصصة', 
			labelEn: 'Years Specialized Experience', 
			icon: Award,
			color: 'from-purple-500 to-emerald-600'
		},
		{ 
			value: '98%', 
			label: 'رضا العملاء', 
			labelEn: 'Client Satisfaction', 
			icon: CheckCircle,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const contactInfo = {
		riyadhPhone: '+966 11 234 5678',
		jeddahPhone: '+966 12 345 6789',
		mobile: '+966 50 123 4567',
		address: 'مركز الأعمال، طريق الملك فهد، الرياض 12345، المملكة العربية السعودية',
		addressEn: 'Business Center, King Fahd Road, Riyadh 12345, Saudi Arabia',
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
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'تصميم مواقف السيارات' : 'Car Park Design'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تصميم وتخطيط مواقف السيارات المتخصصة للمباني السكنية والتجارية والعامة' : 'Specialist car park design and layout consultancy for residential, business and public parking'}" />
</svelte:head>

<!-- Enhanced Hero Section with New Design Variation -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-900 dark:to-emerald-900">
	
	<!-- Enhanced Animated Background with New Elements -->
	<div class="absolute inset-0">
		<!-- Enhanced Gradient Orbs -->
		<div class="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400/25 to-blue-500/25 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.7)}></div>
		<div class="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/25 to-emerald-500/25 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.4)}></div>
		<div class="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- New Parking Grid Pattern -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-15" viewBox="0 0 1200 800">
			<defs>
				<pattern id="parkingGrid" width="120" height="80" patternUnits="userSpaceOnUse">
					<!-- Parking Spaces -->
					<rect x="10" y="10" width="20" height="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					<rect x="35" y="10" width="20" height="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					<rect x="60" y="10" width="20" height="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					<rect x="85" y="10" width="20" height="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
					
					<!-- Road -->
					<path d="M 0 50 L 120 50" stroke="currentColor" stroke-width="2" opacity="0.2"/>
					<circle cx="60" cy="20" r="3" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
						<animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
					</circle>
				</pattern>
				<linearGradient id="parkingWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.5"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.7"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.5"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#parkingGrid)" />
			
			<!-- Animated Vehicle Paths -->
			<path d="M0,250 Q200,200 400,250 Q600,300 800,250 Q1000,200 1200,250" stroke="url(#parkingWave)" stroke-width="3" fill="none" opacity="0.6" class="parking-line-1"/>
			<path d="M0,450 Q300,400 600,450 Q900,500 1200,450" stroke="url(#parkingWave)" stroke-width="4" fill="none" opacity="0.5" class="parking-line-2"/>
		</svg>
		
		<!-- Enhanced Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute bg-gradient-to-r from-emerald-400 to-blue-500 animate-float-particle"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 3}s;
							border-radius: {particle.id % 3 === 0 ? '50%' : particle.id % 3 === 1 ? '20%' : '0%'};
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 8 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Enhanced Light Rays -->
		<div class="absolute inset-0 opacity-25">
			<div class="absolute top-0 left-1/5 w-2 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-15 animate-light-ray"></div>
			<div class="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-15 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform rotate-8 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge with New Animation -->
			<div class={`inline-flex items-center px-8 py-5 bg-gradient-to-r from-emerald-100/90 to-blue-100/90 dark:from-emerald-900/40 dark:to-blue-900/40 backdrop-blur-2xl text-emerald-700 dark:text-emerald-300 rounded-full border-2 border-emerald-200/60 dark:border-emerald-700/60 text-base font-black mb-10 transition-all duration-1200 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'} shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer`}>
				<ParkingCircle class="w-5 h-5 mr-4 rtl:ml-4 rtl:mr-0 animate-spin-slow" />
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-2xl animate-bounce-subtle">🅿️</span>
				{($locale || 'en') === 'ar' ? 'تصميم مواقف السيارات' : 'Car Park Design'}
			</div>
			
			<!-- Enhanced Title with Staggered Animation -->
			<div class={`transition-all duration-1200 delay-300 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<h1 class="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-10">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow-enhanced bg-400% drop-shadow-lg">
						{($locale || 'en') === 'ar' ? 'تصميم مواقف' : 'Car Park'}
					</span>
					<span class="block text-3xl lg:text-4xl xl:text-5xl font-black text-slate-700 dark:text-slate-300 mt-8 animate-fade-in-delayed-enhanced transform hover:scale-105 transition-transform duration-300">
						{($locale || 'en') === 'ar' ? 'السيارات المتخصص' : 'Design Specialists'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description with Rich Typography -->
			<div class={`transition-all duration-1200 delay-600 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<p class="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto mb-10 font-medium">
					{($locale || 'en') === 'ar' 
						? 'استشارات تصميم وتخطيط مواقف السيارات المتخصصة للمباني السكنية والتجارية والعامة'
						: 'Specialist car park design and layout consultancy for residential, business and public parking'
					}
				</p>
				
				<!-- Enhanced Contact Info with New Layout -->
				<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 max-w-4xl mx-auto">
					<div class="grid md:grid-cols-3 gap-6 text-lg font-bold">
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
							<span class="text-3xl mb-2">🇸🇦</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">الرياض</div>
							<a href={`tel:${contactInfo.riyadhPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center">
								{contactInfo.riyadhPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
							<span class="text-3xl mb-2">🏢</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جدة</div>
							<a href={`tel:${contactInfo.jeddahPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center">
								{contactInfo.jeddahPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-emerald-50 dark:from-purple-900/20 dark:to-emerald-900/20">
							<span class="text-3xl mb-2">📱</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جوال</div>
							<a href={`tel:${contactInfo.mobile}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center">
								{contactInfo.mobile}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Features Section with Interactive Design -->
<section id="features" data-animate class="py-32 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
	
	<!-- Enhanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400/8 to-blue-500/8 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/8 to-emerald-500/8 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'خدمات تصميم مواقف السيارات' : 'Car Park Design Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'حلول شاملة ومبتكرة لتصميم وتخطيط مواقف السيارات لجميع الأغراض'
					: 'Comprehensive and innovative solutions for car park design and layout for all purposes'
				}
			</p>
		</div>

		<!-- Interactive Features Grid with Hover Effects -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
			{#each features as feature, index}
				<div 
					class={`group relative bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-800/95 dark:to-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden cursor-pointer ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'} ${activeFeature === index ? 'ring-4 ring-emerald-500/50 scale-105' : ''}`} 
					style="animation-delay: {index * 0.15}s;"
					on:mouseenter={() => activeFeature = index}
				>
					
					<!-- Enhanced Background Gradient -->
					<div class={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}></div>
					
					<!-- Enhanced Feature Image with Overlay -->
					<div class="h-56 overflow-hidden rounded-t-3xl relative">
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-700`}>
								<svelte:component this={feature.icon} class="w-10 h-10 text-white" />
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-blue-600/30 to-purple-600/30 group-hover:from-emerald-600/40 group-hover:via-blue-600/40 group-hover:to-purple-600/40 transition-all duration-700"></div>
						
						<!-- New: Floating Icon -->
						<div class="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
							<svelte:component this={feature.icon} class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
					</div>
					
					<div class="relative z-10 p-8">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-500 leading-tight">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
						
						<!-- New: Learn More Button -->
						<div class="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
							<button class="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:text-emerald-700 dark:hover:text-emerald-300">
								{($locale || 'en') === 'ar' ? 'اعرف المزيد' : 'Learn More'}
								<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
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

<!-- Enhanced Stats Section with New Visual Design -->
<section class="py-32 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
	<!-- Enhanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/6 w-2 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/5 w-2 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<div class="absolute top-0 left-3/5 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"></div>
		
		<!-- New: Floating Geometric Shapes -->
		<div class="absolute top-20 left-20 w-20 h-20 border-4 border-white/20 rounded-lg animate-float-slow transform rotate-45"></div>
		<div class="absolute bottom-20 right-20 w-16 h-16 border-4 border-white/20 rounded-full animate-float-reverse"></div>
		<div class="absolute top-1/2 right-1/4 w-12 h-12 border-4 border-white/20 transform rotate-45 animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-10">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-enhanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<div class={`relative w-28 h-28 bg-white/25 backdrop-blur-2xl rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group hover:scale-125 transition-all duration-500 ${stat.color ? 'bg-gradient-to-br ' + stat.color : ''} border border-white/30`}>
						<svelte:component this={stat.icon} class="relative z-10 w-12 h-12 text-white drop-shadow-2xl" />
						<div class="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
						<!-- New: Orbital Ring -->
						<div class="absolute inset-0 border-2 border-white/30 rounded-3xl animate-spin-slow"></div>
					</div>
					<div class="text-5xl lg:text-6xl font-black text-white mb-3 animate-count-up-enhanced drop-shadow-lg">
						{stat.value}
					</div>
					<div class="text-emerald-100 font-bold text-lg leading-tight">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لتصميم مواقف السيارات المتخصص أن يحسن من مشروعك' : 'Discover how specialist car park design can enhance your project'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			{#each benefits as benefit, index}
				<div class={`group bg-gradient-to-br from-white/98 to-slate-50/98 dark:from-slate-900/98 dark:to-slate-800/98 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.25}s;">
					
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-8xl mb-6 animate-bounce-subtle">🅿️</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'فائدة تصميم' : 'Design Benefit'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/25 via-blue-600/25 to-emerald-600/25"></div>
						
						<!-- New: Floating Badge -->
						<div class="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
							0{index + 1}
						</div>
					</div>
					
					<div class="p-8">
						<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-500 leading-tight">
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

<!-- New: Enhanced Case Studies Section -->
<section id="case-studies" data-animate class="py-32 bg-gradient-to-br from-white via-emerald-50 to-white dark:from-slate-900 dark:via-emerald-900/10 dark:to-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'دراسات حالة مشاريعنا' : 'Our Project Case Studies'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة في تصميم مواقف السيارات عبر المملكة'
					: 'Examples of our successful car park design projects across the Kingdom'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-9xl mb-6">🏗️</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
									{($locale || 'en') === 'ar' ? 'مشروع متميز' : 'Featured Project'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-blue-600/30 to-purple-600/30"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-6 left-6 right-6">
							<div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
								<div class="grid grid-cols-3 gap-4 text-center">
									{#each Object.entries(study.stats) as [key, value]}
										<div>
											<div class="text-2xl font-black text-emerald-600">{value}</div>
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
							<span class="inline-block bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
								{($locale || 'en') === 'ar' ? 'مشروع مكتمل' : 'Completed Project'}
							</span>
							<h3 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
								{($locale || 'en') === 'ar' ? study.title : study.titleEn}
							</h3>
						</div>
						
						<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<div class="grid grid-cols-2 gap-6">
							<div class="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
								<MapPin class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
								<div>
									<div class="text-sm text-slate-500 dark:text-slate-400 font-bold">
										{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
									</div>
									<div class="text-sm font-black text-slate-700 dark:text-slate-300">
										{($locale || 'en') === 'ar' ? study.location : study.locationEn}
									</div>
								</div>
							</div>
							<div class="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
								<Target class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
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
<section class="py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-4xl lg:text-5xl font-black text-white mb-6">
			{($locale || 'en') === 'ar' ? 'هل تحتاج تصميم موقف سيارات متخصص؟' : 'Need Specialist Car Park Design?'}
		</h2>
		<p class="text-2xl text-emerald-100 mb-12 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'خبراؤنا في تصميم مواقف السيارات جاهزون لتطوير حلول مبتكرة ومتخصصة لمشروعك'
				: 'Our car park design experts are ready to develop innovative and specialized solutions for your project'
			}
		</p>
		
		<!-- Enhanced Contact Grid -->
		<div class="grid md:grid-cols-3 gap-8 mb-12">
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🇸🇦</div>
				<div class="font-bold text-emerald-100 mb-2 text-lg">مكتب الرياض</div>
				<a href={`tel:${contactInfo.riyadhPhone}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-lg">
					{contactInfo.riyadhPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
				<div class="font-bold text-emerald-100 mb-2 text-lg">مكتب جدة</div>
				<a href={`tel:${contactInfo.jeddahPhone}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-lg">
					{contactInfo.jeddahPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📱</div>
				<div class="font-bold text-emerald-100 mb-2 text-lg">الجوال</div>
				<a href={`tel:${contactInfo.mobile}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-lg">
					{contactInfo.mobile}
				</a>
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-8 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-black rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-3xl shadow-2xl text-xl"
			>
				{($locale || 'en') === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
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

	@keyframes bounce-subtle {
		0%, 100% { 
			transform: translateY(0); 
		}
		50% { 
			transform: translateY(-8px); 
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

	@keyframes parking-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -100; }
	}
	
	/* Enhanced Animation Classes */
	.animate-slide-up-bounce-enhanced { animation: slide-up-bounce-enhanced 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.8s ease-out forwards; }
	.animate-scale-in-enhanced { animation: scale-in-enhanced 0.8s ease-out forwards; }
	.animate-gradient-flow-enhanced { 
		background-size: 400% 400%;
		animation: gradient-flow-enhanced 8s ease infinite;
	}
	.animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
	.animate-spin-slow { animation: spin-slow 20s linear infinite; }
	.animate-fade-in-delayed-enhanced { animation: fade-in-delayed-enhanced 2.5s ease-out; }
	.animate-count-up-enhanced { animation: count-up-enhanced 1.2s ease-out; }
	
	/* Parking Animation */
	.parking-line-1 {
		stroke-dasharray: 25 15;
		animation: parking-line-flow 6s linear infinite;
	}
	
	.parking-line-2 {
		stroke-dasharray: 20 12;
		animation: parking-line-flow 8s linear infinite reverse;
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

	/* Enhanced GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle,
	.animate-gradient-flow-enhanced,
	.animate-spin-slow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Enhanced Dark mode */
	.dark .backdrop-blur-2xl {
		backdrop-filter: blur(40px) saturate(200%);
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
	}

	/* New: Enhanced Hover States */
	.group:hover .animate-bounce-subtle {
		animation-duration: 1s;
	}

	/* New: Custom Shadows */
	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}
</style>