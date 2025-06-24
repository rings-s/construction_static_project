<!-- src/routes/transport-planning/highway-junction-design/+page.svelte -->
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
		Droplets  // Add this line
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
		particles = Array.from({ length: 80 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 7 + 2,
			speed: Math.random() * 4 + 0.5,
			opacity: Math.random() * 0.7 + 0.3,
			shape: i % 5 // 0: circle, 1: square, 2: triangle, 3: diamond, 4: hexagon
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
		}, 4500);

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
			icon: Route,
			title: 'تصميم الطرق السريعة',
			titleEn: 'Highway Design & Planning',
			description: 'تصميم شامل للطرق السريعة والشريانية وفقاً للمعايير السعودية والدولية مع مراعاة السعة المرورية المستقبلية',
			descriptionEn: 'Comprehensive highway and arterial road design according to Saudi and international standards considering future traffic capacity',
			color: 'from-emerald-500 to-teal-600',
			image: '/images/features/highway-design.jpg'
		},
		{
			icon: GitBranch,
			title: 'تصميم التقاطعات والجسور',
			titleEn: 'Junction & Interchange Design',
			description: 'تصميم متطور للتقاطعات متعددة المستويات والجسور لضمان انسيابية حركة المرور وتقليل الازدحام',
			descriptionEn: 'Advanced multi-level junction and bridge design ensuring smooth traffic flow and congestion reduction',
			color: 'from-blue-500 to-cyan-600',
			image: '/images/features/junction-design.jpg'
		},
		{
			icon: CircleDot,
			title: 'تصميم الدوارات الحديثة',
			titleEn: 'Modern Roundabout Design',
			description: 'تصميم دوارات حديثة ومتطورة تحسن من سلامة المرور وتقلل من أوقات الانتظار مع مراعاة الجماليات الحضرية',
			descriptionEn: 'Modern and advanced roundabout design improving traffic safety and reducing wait times while considering urban aesthetics',
			color: 'from-teal-500 to-emerald-600',
			image: '/images/features/roundabout-design.jpg'
		},
		{
			icon: Monitor,
			title: 'أنظمة الإشارات المرورية الذكية',
			titleEn: 'Smart Traffic Signal Systems',
			description: 'تصميم وتنفيذ أنظمة إشارات مرورية ذكية ومتكيفة مع أحدث التقنيات لتحسين تدفق المرور',
			descriptionEn: 'Design and implementation of smart and adaptive traffic signal systems with latest technologies for improved traffic flow',
			color: 'from-cyan-500 to-blue-600',
			image: '/images/features/traffic-signals.jpg'
		},
		{
			icon: Shield,
			title: 'ميزات السلامة المرورية',
			titleEn: 'Road Safety Features',
			description: 'تطبيق أحدث ميزات السلامة المرورية من حواجز وعلامات وإضاءة لضمان أقصى درجات الأمان',
			descriptionEn: 'Implementation of latest road safety features including barriers, markings, and lighting for maximum safety',
			color: 'from-green-500 to-teal-600',
			image: '/images/features/safety-features.jpg'
		},
		{
			icon: Compass,
			title: 'التصميم الهندسي الهندسي',
			titleEn: 'Geometric Engineering Design',
			description: 'تصميم هندسي دقيق للمنحنيات والانحدارات والمقاطع العرضية وفقاً للمعايير الهندسية المتقدمة',
			descriptionEn: 'Precise geometric design of curves, gradients, and cross-sections according to advanced engineering standards',
			color: 'from-indigo-500 to-blue-600',
			image: '/images/features/geometric-design.jpg'
		},
		{
			icon: Layers,
			title: 'تصميم الرصف والطبقات',
			titleEn: 'Pavement & Layer Design',
			description: 'تصميم متخصص لطبقات الرصف والأساسات مع مراعاة المناخ السعودي والأحمال المرورية المتوقعة',
			descriptionEn: 'Specialized pavement layer and foundation design considering Saudi climate and expected traffic loads',
			color: 'from-slate-500 to-gray-600',
			image: '/images/features/pavement-design.jpg'
		},
		{
			icon: Droplets,
			title: 'أنظمة الصرف والتصريف',
			titleEn: 'Drainage & Water Management',
			description: 'تصميم أنظمة صرف فعالة لمياه الأمطار والسيول مع مراعاة الظروف المناخية للمملكة',
			descriptionEn: 'Effective drainage system design for rainwater and floods considering Kingdom climatic conditions',
			color: 'from-blue-500 to-indigo-600',
			image: '/images/features/drainage-systems.jpg'
		}
	];

	const benefits = [
		{
			title: 'تصميم وفقاً للمعايير السعودية',
			titleEn: 'Design According to Saudi Standards',
			description: 'جميع تصاميمنا تتوافق مع كود البناء السعودي ومعايير وزارة النقل والخدمات اللوجستية والمعايير الدولية',
			descriptionEn: 'All our designs comply with Saudi Building Code, Ministry of Transport standards, and international guidelines',
			image: '/images/benefits/saudi-standards.jpg'
		},
		{
			title: 'تقنيات متقدمة ومستدامة',
			titleEn: 'Advanced & Sustainable Technologies',
			description: 'استخدام أحدث التقنيات في التصميم الهندسي مع التركيز على الاستدامة البيئية والكفاءة في استخدام الطاقة',
			descriptionEn: 'Using latest engineering design technologies with focus on environmental sustainability and energy efficiency',
			image: '/images/benefits/advanced-technology.jpg'
		},
		{
			title: 'خبرة واسعة في المناخ السعودي',
			titleEn: 'Extensive Saudi Climate Experience',
			description: 'خبرة عميقة في التعامل مع التحديات المناخية السعودية من حرارة عالية ورياح رملية وسيول موسمية',
			descriptionEn: 'Deep experience handling Saudi climatic challenges including high temperatures, sandstorms, and seasonal floods',
			image: '/images/benefits/climate-expertise.jpg'
		}
	];

	const caseStudies = [
		{
			title: 'طريق الملك عبدالعزيز - الرياض',
			titleEn: 'King Abdulaziz Road - Riyadh',
			description: 'تطوير وتوسعة طريق الملك عبدالعزيز في الرياض بطول 25 كم مع 8 تقاطعات رئيسية ونظام إضاءة LED متطور',
			descriptionEn: 'Development and expansion of King Abdulaziz Road in Riyadh spanning 25 km with 8 major junctions and advanced LED lighting system',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			scope: '25 كم طريق، 8 تقاطعات، 6 حارات',
			scopeEn: '25 km road, 8 junctions, 6 lanes',
			image: '/images/case-studies/riyadh-highway.jpg',
			stats: { length: '25km', junctions: '8', lanes: '6' }
		},
		{
			title: 'طريق مكة - المدينة السريع',
			titleEn: 'Makkah - Madinah Express Highway',
			description: 'تصميم طريق سريع حديث يربط بين مكة والمدينة مع محطات خدمة ذكية ونظام مراقبة متطور',
			descriptionEn: 'Modern expressway design connecting Makkah and Madinah with smart service stations and advanced monitoring system',
			location: 'مكة - المدينة، المملكة العربية السعودية',
			locationEn: 'Makkah - Madinah, Saudi Arabia',
			scope: '450 كم طريق سريع، 12 محطة خدمة',
			scopeEn: '450 km expressway, 12 service stations',
			image: '/images/case-studies/makkah-madinah.jpg',
			stats: { length: '450km', stations: '12', capacity: '120K' }
		},
		{
			title: 'تقاطع الملك فهد - جدة',
			titleEn: 'King Fahd Junction - Jeddah',
			description: 'تطوير تقاطع متعدد المستويات في جدة يخدم 200,000 مركبة يومياً مع أنظمة إدارة مرور ذكية',
			descriptionEn: 'Multi-level junction development in Jeddah serving 200,000 vehicles daily with smart traffic management systems',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			scope: '4 مستويات، 12 مسار، نظام ذكي',
			scopeEn: '4 levels, 12 ramps, smart system',
			image: '/images/case-studies/jeddah-junction.jpg',
			stats: { levels: '4', ramps: '12', vehicles: '200K' }
		}
	];

	const stats = [
		{ 
			value: '500+', 
			label: 'كيلومتر طرق مصممة', 
			labelEn: 'Kilometers of Roads Designed', 
			icon: Route,
			color: 'from-emerald-500 to-teal-600'
		},
		{ 
			value: '120+', 
			label: 'تقاطع وجسر مكتمل', 
			labelEn: 'Completed Junctions & Bridges', 
			icon: GitBranch,
			color: 'from-blue-500 to-cyan-600'
		},
		{ 
			value: '15+', 
			label: 'سنة خبرة متخصصة', 
			labelEn: 'Years Specialized Experience', 
			icon: Award,
			color: 'from-teal-500 to-emerald-600'
		},
		{ 
			value: '99%', 
			label: 'معدل نجاح المشاريع', 
			labelEn: 'Project Success Rate', 
			icon: CheckCircle,
			color: 'from-green-500 to-teal-600'
		}
	];

	const contactInfo = {
		riyadhPhone: '+966 11 234 5678',
		jeddahPhone: '+966 12 345 6789',
		dammamPhone: '+966 13 456 7890',
		mobile: '+966 50 123 4567',
		email: 'highways@engineering-sa.com',
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

	function getParticleShape(shape) {
		switch(shape) {
			case 0: return 'rounded-full';
			case 1: return 'rounded-none';
			case 2: return 'rounded-sm rotate-45';
			case 3: return 'rounded-lg rotate-45';
			case 4: return 'rounded-md rotate-30';
			default: return 'rounded-full';
		}
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'تصميم الطرق والتقاطعات' : 'Highway & Junction Design'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تصميم الطرق السريعة والتقاطعات المتخصصة وفقاً للمعايير السعودية والدولية' : 'Specialized highway and junction design services according to Saudi and international standards'}" />
</svelte:head>

<!-- Enhanced Hero Section with Highway Theme -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-teal-900/20">
	
	<!-- Advanced Highway-Themed Background -->
	<div class="absolute inset-0">
		<!-- Enhanced Gradient Orbs -->
		<div class="absolute top-10 left-10 w-[700px] h-[700px] bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.9)}></div>
		<div class="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.6)}></div>
		<div class="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Highway Network Grid Pattern -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-15" viewBox="0 0 1200 800">
			<defs>
				<pattern id="highwayGrid" width="200" height="150" patternUnits="userSpaceOnUse">
					<!-- Highway Lanes -->
					<path d="M 0 50 L 200 50" stroke="currentColor" stroke-width="3" opacity="0.3" stroke-dasharray="15 10"/>
					<path d="M 0 70 L 200 70" stroke="currentColor" stroke-width="2" opacity="0.2"/>
					<path d="M 0 90 L 200 90" stroke="currentColor" stroke-width="3" opacity="0.3" stroke-dasharray="15 10"/>
					<path d="M 0 110 L 200 110" stroke="currentColor" stroke-width="2" opacity="0.2"/>
					
					<!-- Junction Points -->
					<circle cx="50" cy="80" r="5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="4;7;4" dur="4s" repeatCount="indefinite"/>
						<animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/>
					</circle>
					<circle cx="150" cy="80" r="5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="4;7;4" dur="4s" repeatCount="indefinite" begin="2s"/>
						<animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" begin="2s"/>
					</circle>
					
					<!-- Connecting Roads -->
					<path d="M 50 80 Q 100 40 150 80" stroke="currentColor" stroke-width="2" opacity="0.25" fill="none"/>
					<path d="M 50 80 Q 100 120 150 80" stroke="currentColor" stroke-width="2" opacity="0.25" fill="none"/>
				</pattern>
				<linearGradient id="highwayWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#0d9488;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#0891b2;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#highwayGrid)" />
			
			<!-- Animated Highway Networks -->
			<path d="M0,200 Q150,150 300,200 Q450,250 600,200 Q750,150 900,200 Q1050,250 1200,200" stroke="url(#highwayWave)" stroke-width="5" fill="none" opacity="0.7" class="highway-line-1"/>
			<path d="M0,400 Q200,350 400,400 Q600,450 800,400 Q1000,350 1200,400" stroke="url(#highwayWave)" stroke-width="6" fill="none" opacity="0.6" class="highway-line-2"/>
			<path d="M0,600 Q250,550 500,600 Q750,650 1000,600 Q1125,575 1200,600" stroke="url(#highwayWave)" stroke-width="4" fill="none" opacity="0.5" class="highway-line-3"/>
		</svg>
		
		<!-- Enhanced Multi-Shape Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute bg-gradient-to-r from-emerald-400 to-teal-500 animate-float-particle {getParticleShape(particle.shape)}"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 3}s;
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 12 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Enhanced Light Rays -->
		<div class="absolute inset-0 opacity-25">
			<div class="absolute top-0 left-1/6 w-4 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/5 w-4 h-full bg-gradient-to-b from-teal-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-4/5 w-3 h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent transform rotate-8 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge with Highway Theme -->
			<div class={`inline-flex items-center px-8 py-5 bg-gradient-to-r from-emerald-100/90 to-teal-100/90 dark:from-emerald-900/40 dark:to-teal-900/40 backdrop-blur-2xl text-emerald-700 dark:text-emerald-300 rounded-full border-2 border-emerald-200/60 dark:border-emerald-700/60 text-base font-black mb-10 transition-all duration-1200 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'} shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer`}>
				<Route class="w-5 h-5 mr-4 rtl:ml-4 rtl:mr-0 animate-pulse-highway" />
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-2xl animate-bounce-highway">🛣️</span>
				{($locale || 'en') === 'ar' ? 'تصميم الطرق والتقاطعات' : 'Highway & Junction Design'}
			</div>
			
			<!-- Enhanced Title with Highway Colors -->
			<div class={`transition-all duration-1200 delay-300 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<h1 class="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-10">
					<span class="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-flow-enhanced bg-400% drop-shadow-lg">
						{($locale || 'en') === 'ar' ? 'تصميم الطرق' : 'Highway & Junction'}
					</span>
					<span class="block text-3xl lg:text-4xl xl:text-5xl font-black text-slate-700 dark:text-slate-300 mt-8 animate-fade-in-delayed-enhanced transform hover:scale-105 transition-transform duration-300">
						{($locale || 'en') === 'ar' ? 'والتقاطعات الحديثة' : 'Design Specialists'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1200 delay-600 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<p class="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto mb-10 font-medium">
					{($locale || 'en') === 'ar' 
						? 'خدمات تصميم الطرق السريعة والتقاطعات المتخصصة وفقاً للمعايير السعودية والدولية'
						: 'Specialized highway and junction design services according to Saudi and international standards'
					}
				</p>
				
				<!-- Enhanced Contact Info with Professional Layout -->
				<div class="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 max-w-6xl mx-auto">
					<div class="grid md:grid-cols-5 gap-4 text-base font-bold">
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
							<span class="text-3xl mb-2">🏢</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب الرياض</div>
							<a href={`tel:${contactInfo.riyadhPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center text-sm">
								{contactInfo.riyadhPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
							<span class="text-3xl mb-2">🕌</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب جدة</div>
							<a href={`tel:${contactInfo.jeddahPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center text-sm">
								{contactInfo.jeddahPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
							<span class="text-3xl mb-2">🏭</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">مكتب الدمام</div>
							<a href={`tel:${contactInfo.dammamPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center text-sm">
								{contactInfo.dammamPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
							<span class="text-3xl mb-2">📱</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جوال</div>
							<a href={`tel:${contactInfo.mobile}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center text-sm">
								{contactInfo.mobile}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
							<span class="text-3xl mb-2">📧</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">بريد إلكتروني</div>
							<a href={`mailto:${contactInfo.email}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-center text-xs">
								{contactInfo.email}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Features Section with Highway Grid -->
<section id="features" data-animate class="py-32 bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-slate-900 dark:via-emerald-900/10 dark:to-slate-900 relative overflow-hidden">
	
	<!-- Enhanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-32 right-32 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/8 to-teal-500/8 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 left-32 w-[500px] h-[500px] bg-gradient-to-r from-teal-400/8 to-cyan-500/8 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'خدمات تصميم الطرق والتقاطعات' : 'Highway & Junction Design Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'حلول هندسية متكاملة لتصميم البنية التحتية للطرق والنقل'
					: 'Integrated engineering solutions for road and transport infrastructure design'
				}
			</p>
		</div>

		<!-- Enhanced Features Grid with Highway Theme -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature, index}
				<div 
					class={`group relative bg-gradient-to-br from-white/95 to-emerald-50/95 dark:from-slate-800/95 dark:to-emerald-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-emerald-200/30 dark:border-emerald-700/30 overflow-hidden cursor-pointer ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'} ${activeFeature === index ? 'ring-4 ring-emerald-500/50 scale-105' : ''}`} 
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-700`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-teal-600/30 to-cyan-600/30 group-hover:from-emerald-600/40 group-hover:via-teal-600/40 group-hover:to-cyan-600/40 transition-all duration-700"></div>
						
						<!-- Floating Icon -->
						<div class="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
							<svelte:component this={feature.icon} class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
					</div>
					
					<div class="relative z-10 p-6">
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-500 leading-tight">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
						
						<!-- Learn More Button -->
						<div class="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
							<button class="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:text-emerald-700 dark:hover:text-emerald-300">
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

<!-- Enhanced Stats Section with Highway Colors -->
<section class="py-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
	<!-- Enhanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/6 w-4 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform rotate-15 animate-light-ray"></div>
		<div class="absolute top-0 right-1/5 w-4 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -rotate-15 animate-light-ray-reverse"></div>
		<div class="absolute top-0 left-4/5 w-3 h-full bg-gradient-to-b from-white/25 via-transparent to-transparent transform rotate-8 animate-light-ray-slow"></div>
		
		<!-- Floating Highway Elements -->
		<div class="absolute top-20 left-20 w-28 h-28 border-4 border-white/20 rounded-lg animate-float-slow transform rotate-45">
			<div class="absolute inset-3 bg-white/10 rounded"></div>
			<div class="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20"></div>
		</div>
		<div class="absolute bottom-20 right-20 w-24 h-24 border-4 border-white/20 rounded-full animate-float-reverse">
			<div class="absolute inset-3 bg-white/10 rounded-full"></div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
		</div>
		<div class="absolute top-1/2 right-1/4 w-20 h-20 border-4 border-white/20 transform rotate-45 animate-pulse-subtle">
			<div class="absolute inset-2 bg-white/10"></div>
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
<section id="benefits" data-animate class="py-32 bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-50 dark:from-slate-800 dark:via-teal-900/10 dark:to-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-emerald-400/5 to-teal-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدمات تصميم الطرق المتخصصة أن تحسن من مشروعك' : 'Discover how specialized highway design services can enhance your project'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			{#each benefits as benefit, index}
				<div class={`group bg-gradient-to-br from-white/98 to-emerald-50/50 dark:from-slate-900/98 dark:to-emerald-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 border border-emerald-200/30 dark:border-emerald-700/30 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.25}s;">
					
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-8xl mb-6 animate-bounce-highway">🛣️</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'فائدة تصميم الطرق' : 'Highway Design Benefit'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/25 via-teal-600/25 to-emerald-600/25"></div>
						
						<!-- Floating Badge -->
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

<!-- Enhanced Case Studies Section -->
<section id="case-studies" data-animate class="py-32 bg-gradient-to-br from-white via-cyan-50/30 to-white dark:from-slate-900 dark:via-cyan-900/10 dark:to-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400/10 to-teal-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-teal-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'دراسات حالة مشاريعنا' : 'Our Project Case Studies'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة في تصميم الطرق والتقاطعات عبر المملكة'
					: 'Examples of our successful highway and junction design projects across the Kingdom'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-9xl mb-6">🏗️</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
									{($locale || 'en') === 'ar' ? 'مشروع متميز' : 'Featured Project'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-teal-600/30 to-cyan-600/30"></div>
						
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
							<div class="flex items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl">
								<Target class="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
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
<section class="py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-4xl lg:text-5xl font-black text-white mb-6">
			{($locale || 'en') === 'ar' ? 'هل تحتاج تصميم طريق أو تقاطع متخصص؟' : 'Need Specialized Highway or Junction Design?'}
		</h2>
		<p class="text-2xl text-emerald-100 mb-12 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'خبراؤنا في تصميم الطرق والتقاطعات جاهزون لتطوير حلول هندسية متطورة لمشروعك'
				: 'Our highway and junction design experts are ready to develop advanced engineering solutions for your project'
			}
		</p>
		
		<!-- Enhanced Contact Grid -->
		<div class="grid md:grid-cols-5 gap-6 mb-12">
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏢</div>
				<div class="font-bold text-emerald-100 mb-2 text-sm">الرياض</div>
				<a href={`tel:${contactInfo.riyadhPhone}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-xs">
					{contactInfo.riyadhPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🕌</div>
				<div class="font-bold text-emerald-100 mb-2 text-sm">جدة</div>
				<a href={`tel:${contactInfo.jeddahPhone}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-xs">
					{contactInfo.jeddahPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏭</div>
				<div class="font-bold text-emerald-100 mb-2 text-sm">الدمام</div>
				<a href={`tel:${contactInfo.dammamPhone}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-xs">
					{contactInfo.dammamPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📱</div>
				<div class="font-bold text-emerald-100 mb-2 text-sm">جوال</div>
				<a href={`tel:${contactInfo.mobile}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-xs">
					{contactInfo.mobile}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📧</div>
				<div class="font-bold text-emerald-100 mb-2 text-sm">إيميل</div>
				<a href={`mailto:${contactInfo.email}`} class="text-white hover:text-emerald-300 transition-colors font-bold text-xs">
					{contactInfo.email}
				</a>
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-8 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-3xl shadow-2xl text-xl"
			>
				{($locale || 'en') === 'ar' ? 'احصل على استشارة تصميم' : 'Get Design Consultation'}
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

	@keyframes bounce-highway {
		0%, 100% { 
			transform: translateY(0) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(-8px) rotate(-3deg) scale(1.05); 
		}
		50% { 
			transform: translateY(-12px) rotate(0deg) scale(1.1); 
		}
		75% { 
			transform: translateY(-8px) rotate(3deg) scale(1.05); 
		}
	}

	@keyframes pulse-highway {
		0%, 100% { 
			transform: scale(1); 
			opacity: 0.8;
		}
		50% { 
			transform: scale(1.1); 
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

	@keyframes highway-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -150; }
	}
	
	/* Enhanced Animation Classes */
	.animate-slide-up-bounce-enhanced { animation: slide-up-bounce-enhanced 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.8s ease-out forwards; }
	.animate-scale-in-enhanced { animation: scale-in-enhanced 0.8s ease-out forwards; }
	.animate-gradient-flow-enhanced { 
		background-size: 400% 400%;
		animation: gradient-flow-enhanced 8s ease infinite;
	}
	.animate-bounce-highway { animation: bounce-highway 3s ease-in-out infinite; }
	.animate-pulse-highway { animation: pulse-highway 2s ease-in-out infinite; }
	.animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
	.animate-spin-slower { animation: spin-slower 25s linear infinite; }
	.animate-fade-in-delayed-enhanced { animation: fade-in-delayed-enhanced 2.5s ease-out; }
	.animate-count-up-enhanced { animation: count-up-enhanced 1.2s ease-out; }
	
	/* Highway Animation */
	.highway-line-1 {
		stroke-dasharray: 40 25;
		animation: highway-line-flow 10s linear infinite;
	}
	
	.highway-line-2 {
		stroke-dasharray: 35 20;
		animation: highway-line-flow 12s linear infinite reverse;
	}
	
	.highway-line-3 {
		stroke-dasharray: 30 15;
		animation: highway-line-flow 8s linear infinite;
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
	.group:hover .animate-bounce-highway {
		animation-duration: 2s;
	}

	.group:hover .animate-pulse-highway {
		animation-duration: 1.5s;
	}
</style>