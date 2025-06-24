<!-- src/routes/transport-planning/traffic-management-plans/+page.svelte -->
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
		Siren
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
		particles = Array.from({ length: 70 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 6 + 2,
			speed: Math.random() * 3 + 0.5,
			opacity: Math.random() * 0.6 + 0.3,
			shape: i % 4 // 0: circle, 1: square, 2: triangle, 3: diamond
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
		}, 5000);

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
			icon: Construction,
			title: 'خطط إدارة المرور المؤقت',
			titleEn: 'Temporary Traffic Management Plans',
			description: 'خطط شاملة لإدارة المرور أثناء أعمال الإنشاء والصيانة مع ضمان السلامة والكفاءة التشغيلية',
			descriptionEn: 'Comprehensive plans for traffic management during construction and maintenance works ensuring safety and operational efficiency',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/temporary-traffic.jpg'
		},
		{
			icon: Calendar,
			title: 'خطط إدارة مرور الفعاليات',
			titleEn: 'Event Traffic Management Plans',
			description: 'تخطيط متخصص لإدارة المرور خلال الفعاليات الكبرى والمؤتمرات والمهرجانات في المملكة',
			descriptionEn: 'Specialized planning for traffic management during major events, conferences, and festivals in the Kingdom',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/event-traffic.jpg'
		},
		{
			icon: Siren,
			title: 'خطط الطوارئ المرورية',
			titleEn: 'Emergency Traffic Management Plans',
			description: 'خطط طوارئ سريعة الاستجابة لإدارة المرور في حالات الطوارئ والحوادث والظروف الاستثنائية',
			descriptionEn: 'Quick-response emergency plans for traffic management during emergencies, accidents, and exceptional circumstances',
			color: 'from-red-500 to-orange-600',
			image: '/images/features/emergency-traffic.jpg'
		},
		{
			icon: Route,
			title: 'خطط التحويلات المرورية',
			titleEn: 'Traffic Diversion Plans',
			description: 'تصميم مسارات بديلة وخطط تحويل المرور لضمان استمرارية التدفق أثناء الأعمال',
			descriptionEn: 'Design of alternative routes and traffic diversion plans ensuring flow continuity during works',
			color: 'from-blue-500 to-purple-600',
			image: '/images/features/traffic-diversion.jpg'
		},
		{
			icon: Timer,
			title: 'خطط المراحل الزمنية',
			titleEn: 'Phased Implementation Plans',
			description: 'تخطيط متدرج لتنفيذ المشاريع على مراحل زمنية مع تقليل التأثير على حركة المرور',
			descriptionEn: 'Gradual planning for project implementation in phases with minimized traffic impact',
			color: 'from-amber-500 to-emerald-600',
			image: '/images/features/phased-plans.jpg'
		},
		{
			icon: Monitor,
			title: 'أنظمة المراقبة والتحكم',
			titleEn: 'Monitoring & Control Systems',
			description: 'أنظمة مراقبة متقدمة وخطط تحكم ذكية لضمان تنفيذ الخطط المرورية بفعالية',
			descriptionEn: 'Advanced monitoring systems and smart control plans ensuring effective traffic plan implementation',
			color: 'from-green-500 to-blue-600',
			image: '/images/features/monitoring-systems.jpg'
		},
		{
			icon: Shield,
			title: 'خطط السلامة المرورية',
			titleEn: 'Traffic Safety Plans',
			description: 'خطط شاملة لضمان سلامة جميع مستخدمي الطريق أثناء تنفيذ الأعمال والفعاليات',
			descriptionEn: 'Comprehensive plans ensuring safety of all road users during work execution and events',
			color: 'from-indigo-500 to-purple-600',
			image: '/images/features/safety-plans.jpg'
		},
		{
			icon: FileText,
			title: 'التوثيق والموافقات',
			titleEn: 'Documentation & Approvals',
			description: 'إعداد التوثيق المطلوب والحصول على الموافقات اللازمة من الجهات المختصة',
			descriptionEn: 'Preparation of required documentation and obtaining necessary approvals from relevant authorities',
			color: 'from-teal-500 to-blue-600',
			image: '/images/features/documentation.jpg'
		}
	];

	const benefits = [
		{
			title: 'تقليل الاضطرابات المرورية',
			titleEn: 'Minimized Traffic Disruptions',
			description: 'خطط مرور محكمة تقلل من الاضطرابات المرورية إلى أدنى حد ممكن أثناء تنفيذ المشاريع والفعاليات',
			descriptionEn: 'Well-planned traffic strategies that minimize traffic disruptions during project implementation and events',
			image: '/images/benefits/minimal-disruption.jpg'
		},
		{
			title: 'الامتثال للمعايير السعودية',
			titleEn: 'Saudi Standards Compliance',
			description: 'جميع خططنا تتوافق مع المعايير السعودية ولوائح وزارة النقل والخدمات اللوجستية',
			descriptionEn: 'All our plans comply with Saudi standards and Ministry of Transport and Logistic Services regulations',
			image: '/images/benefits/saudi-compliance.jpg'
		},
		{
			title: 'استجابة سريعة ومرونة',
			titleEn: 'Quick Response & Flexibility',
			description: 'قدرة على التكيف السريع مع المتغيرات والظروف الطارئة مع خطط بديلة جاهزة',
			descriptionEn: 'Ability to quickly adapt to changes and emergency conditions with ready alternative plans',
			image: '/images/benefits/quick-response.jpg'
		}
	];

	const caseStudies = [
		{
			title: 'إدارة مرور مشروع الرياض الجديدة',
			titleEn: 'New Riyadh Project Traffic Management',
			description: 'خطة شاملة لإدارة المرور أثناء تطوير مشروع الرياض الجديدة مع 15 موقع عمل متزامن',
			descriptionEn: 'Comprehensive traffic management plan during New Riyadh development with 15 concurrent work sites',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			scope: '200 كم من الطرق، 15 موقع عمل',
			scopeEn: '200 km of roads, 15 work sites',
			image: '/images/case-studies/riyadh-new.jpg',
			stats: { roads: '200km', sites: '15', duration: '24mo' }
		},
		{
			title: 'خطة مرور موسم الحج',
			titleEn: 'Hajj Season Traffic Plan',
			description: 'خطة متكاملة لإدارة المرور خلال موسم الحج مع تنسيق شامل مع الجهات الأمنية',
			descriptionEn: 'Integrated traffic management plan during Hajj season with comprehensive coordination with security authorities',
			location: 'مكة المكرمة، المملكة العربية السعودية',
			locationEn: 'Makkah, Saudi Arabia',
			scope: '3 مليون حاج، 500 نقطة تحكم',
			scopeEn: '3 million pilgrims, 500 control points',
			image: '/images/case-studies/hajj-traffic.jpg',
			stats: { pilgrims: '3M', points: '500', days: '30' }
		},
		{
			title: 'إدارة مرور معرض الرياض الدولي',
			titleEn: 'Riyadh International Exhibition Traffic Management',
			description: 'تخطيط مروري متخصص للمعارض والفعاليات الكبرى مع إدارة مواقف السيارات',
			descriptionEn: 'Specialized traffic planning for major exhibitions and events with parking management',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			scope: '500,000 زائر، 50 فعالية',
			scopeEn: '500,000 visitors, 50 events',
			image: '/images/case-studies/exhibition-traffic.jpg',
			stats: { visitors: '500K', events: '50', parking: '10K' }
		}
	];

	const stats = [
		{ 
			value: '450+', 
			label: 'خطة إدارة مرور مكتملة', 
			labelEn: 'Completed Traffic Management Plans', 
			icon: Clipboard,
			color: 'from-emerald-500 to-blue-600'
		},
		{ 
			value: '2M+', 
			label: 'مستخدم طريق مخدوم', 
			labelEn: 'Road Users Served', 
			icon: Users,
			color: 'from-blue-500 to-purple-600'
		},
		{ 
			value: '85%', 
			label: 'تقليل في زمن التأخير', 
			labelEn: 'Delay Time Reduction', 
			icon: Timer,
			color: 'from-purple-500 to-emerald-600'
		},
		{ 
			value: '100%', 
			label: 'معدل الامتثال للسلامة', 
			labelEn: 'Safety Compliance Rate', 
			icon: Shield,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const contactInfo = {
		riyadhPhone: '+966 11 234 5678',
		jeddahPhone: '+966 12 345 6789',
		dammamPhone: '+966 13 456 7890',
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

	function getParticleShape(shape) {
		switch(shape) {
			case 0: return 'rounded-full';
			case 1: return 'rounded-none';
			case 2: return 'rounded-sm rotate-45';
			case 3: return 'rounded-lg rotate-45';
			default: return 'rounded-full';
		}
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'خطط إدارة المرور' : 'Traffic Management Plans'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خطط إدارة المرور المتخصصة للمشاريع والفعاليات والطوارئ في المملكة العربية السعودية' : 'Specialized traffic management plans for projects, events, and emergencies in Saudi Arabia'}" />
</svelte:head>

<!-- Enhanced Hero Section with Advanced Design -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-orange-900/20 dark:to-red-900/20">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Enhanced Gradient Orbs -->
		<div class="absolute top-10 left-10 w-[600px] h-[600px] bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.8)}></div>
		<div class="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-red-400/20 to-orange-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.5)}></div>
		<div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400/15 to-red-500/15 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Traffic Management Grid Pattern -->
		<svg class="absolute inset-0 w-full h-full opacity-15 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="trafficGrid" width="150" height="100" patternUnits="userSpaceOnUse">
					<!-- Traffic Cones -->
					<polygon points="15,70 25,30 35,70" fill="currentColor" opacity="0.3"/>
					<polygon points="65,70 75,30 85,70" fill="currentColor" opacity="0.3"/>
					<polygon points="115,70 125,30 135,70" fill="currentColor" opacity="0.3"/>
					
					<!-- Road Lines -->
					<path d="M 0 40 L 150 40" stroke="currentColor" stroke-width="2" opacity="0.2" stroke-dasharray="10 5"/>
					<path d="M 0 60 L 150 60" stroke="currentColor" stroke-width="2" opacity="0.2" stroke-dasharray="10 5"/>
					
					<!-- Moving Traffic Signal -->
					<circle cx="75" cy="15" r="4" fill="currentColor" opacity="0.5">
						<animate attributeName="fill" values="#ef4444;#f59e0b;#10b981;#ef4444" dur="3s" repeatCount="indefinite"/>
						<animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite"/>
					</circle>
				</pattern>
				<linearGradient id="trafficWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#ef4444;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#dc2626;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#trafficGrid)" />
			
			<!-- Animated Management Lines -->
			<path d="M0,250 Q200,200 400,250 Q600,300 800,250 Q1000,200 1200,250" stroke="url(#trafficWave)" stroke-width="4" fill="none" opacity="0.7" class="management-line-1"/>
			<path d="M0,450 Q300,400 600,450 Q900,500 1200,450" stroke="url(#trafficWave)" stroke-width="5" fill="none" opacity="0.6" class="management-line-2"/>
		</svg>
		
		<!-- Enhanced Multi-Shape Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute bg-gradient-to-r from-orange-400 to-red-500 animate-float-particle {getParticleShape(particle.shape)}"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 3}s;
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Enhanced Light Rays -->
		<div class="absolute inset-0 opacity-30">
			<div class="absolute top-0 left-1/6 w-3 h-full bg-gradient-to-b from-orange-400 via-transparent to-transparent transform rotate-20 animate-light-ray"></div>
			<div class="absolute top-0 right-1/5 w-3 h-full bg-gradient-to-b from-red-400 via-transparent to-transparent transform -rotate-20 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-4/5 w-2 h-full bg-gradient-to-b from-amber-400 via-transparent to-transparent transform rotate-10 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge with Traffic Theme -->
			<div class={`inline-flex items-center px-8 py-5 bg-gradient-to-r from-orange-100/90 to-red-100/90 dark:from-orange-900/40 dark:to-red-900/40 backdrop-blur-2xl text-orange-700 dark:text-orange-300 rounded-full border-2 border-orange-200/60 dark:border-orange-700/60 text-base font-black mb-10 transition-all duration-1200 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'} shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer`}>
				<Clipboard class="w-5 h-5 mr-4 rtl:ml-4 rtl:mr-0 animate-pulse" />
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-2xl animate-bounce-traffic">🚧</span>
				{($locale || 'en') === 'ar' ? 'خطط إدارة المرور' : 'Traffic Management Plans'}
			</div>
			
			<!-- Enhanced Title with Traffic Colors -->
			<div class={`transition-all duration-1200 delay-300 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<h1 class="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-10">
					<span class="block bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent animate-gradient-flow-enhanced bg-400% drop-shadow-lg">
						{($locale || 'en') === 'ar' ? 'خطط إدارة' : 'Traffic Management'}
					</span>
					<span class="block text-3xl lg:text-4xl xl:text-5xl font-black text-slate-700 dark:text-slate-300 mt-8 animate-fade-in-delayed-enhanced transform hover:scale-105 transition-transform duration-300">
						{($locale || 'en') === 'ar' ? 'المرور المتخصصة' : 'Plans'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1200 delay-600 ${mounted ? 'animate-slide-up-bounce-enhanced' : 'opacity-0'}`}>
				<p class="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto mb-10 font-medium">
					{($locale || 'en') === 'ar' 
						? 'خطط إدارة المرور المتخصصة للمشاريع والفعاليات والطوارئ في المملكة العربية السعودية'
						: 'Specialized traffic management plans for projects, events, and emergencies in Saudi Arabia'
					}
				</p>
				
				<!-- Enhanced Contact Info with Saudi Focus -->
				<div class="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 max-w-5xl mx-auto">
					<div class="grid md:grid-cols-4 gap-4 text-base font-bold">
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
							<span class="text-3xl mb-2">🏢</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">الرياض</div>
							<a href={`tel:${contactInfo.riyadhPhone}`} class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors text-center">
								{contactInfo.riyadhPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20">
							<span class="text-3xl mb-2">🕌</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جدة</div>
							<a href={`tel:${contactInfo.jeddahPhone}`} class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors text-center">
								{contactInfo.jeddahPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
							<span class="text-3xl mb-2">🏭</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">الدمام</div>
							<a href={`tel:${contactInfo.dammamPhone}`} class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors text-center">
								{contactInfo.dammamPhone}
							</a>
						</div>
						<div class="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
							<span class="text-3xl mb-2">📱</span>
							<div class="text-slate-500 dark:text-slate-400 text-sm mb-1">جوال طوارئ</div>
							<a href={`tel:${contactInfo.mobile}`} class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors text-center">
								{contactInfo.mobile}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Features Section with Traffic Theme -->
<section id="features" data-animate class="py-32 bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-slate-900 dark:via-orange-900/10 dark:to-slate-900 relative overflow-hidden">
	
	<!-- Enhanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/8 to-red-500/8 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-red-400/8 to-orange-500/8 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'خدمات خطط إدارة المرور' : 'Traffic Management Plan Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'حلول شاملة ومتطورة لإدارة المرور في جميع المواقف والظروف'
					: 'Comprehensive and advanced solutions for traffic management in all situations and conditions'
				}
			</p>
		</div>

		<!-- Enhanced Features Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature, index}
				<div 
					class={`group relative bg-gradient-to-br from-white/95 to-orange-50/95 dark:from-slate-800/95 dark:to-orange-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-orange-200/30 dark:border-orange-700/30 overflow-hidden cursor-pointer ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'} ${activeFeature === index ? 'ring-4 ring-orange-500/50 scale-105' : ''}`} 
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
						<div class="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-orange-200 dark:from-orange-900/30 dark:via-red-900/20 dark:to-orange-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-700`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-red-600/30 to-amber-600/30 group-hover:from-orange-600/40 group-hover:via-red-600/40 group-hover:to-amber-600/40 transition-all duration-700"></div>
						
						<!-- Floating Icon -->
						<div class="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
							<svelte:component this={feature.icon} class="w-6 h-6 text-orange-600 dark:text-orange-400" />
						</div>
					</div>
					
					<div class="relative z-10 p-6">
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500 leading-tight">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
						
						<!-- Learn More Button -->
						<div class="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
							<button class="inline-flex items-center text-orange-600 dark:text-orange-400 font-bold text-xs hover:text-orange-700 dark:hover:text-orange-300">
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

<!-- Enhanced Stats Section with Traffic Colors -->
<section class="py-32 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 relative overflow-hidden">
	<!-- Enhanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/6 w-3 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform rotate-15 animate-light-ray"></div>
		<div class="absolute top-0 right-1/5 w-3 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -rotate-15 animate-light-ray-reverse"></div>
		<div class="absolute top-0 left-4/5 w-2 h-full bg-gradient-to-b from-white/25 via-transparent to-transparent transform rotate-8 animate-light-ray-slow"></div>
		
		<!-- Floating Traffic Elements -->
		<div class="absolute top-20 left-20 w-24 h-24 border-4 border-white/20 rounded-lg animate-float-slow transform rotate-45">
			<div class="absolute inset-2 bg-white/10 rounded"></div>
		</div>
		<div class="absolute bottom-20 right-20 w-20 h-20 border-4 border-white/20 rounded-full animate-float-reverse">
			<div class="absolute inset-2 bg-white/10 rounded-full"></div>
		</div>
		<div class="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-white/20 transform rotate-45 animate-pulse-subtle">
			<div class="absolute inset-1 bg-white/10"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-10">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-enhanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<div class={`relative w-28 h-28 bg-white/25 backdrop-blur-2xl rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group hover:scale-125 transition-all duration-500 ${stat.color ? 'bg-gradient-to-br ' + stat.color : ''} border border-white/30`}>
						<svelte:component this={stat.icon} class="relative z-10 w-12 h-12 text-white drop-shadow-2xl" />
						<div class="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
						<!-- Enhanced Orbital Ring -->
						<div class="absolute inset-0 border-2 border-white/40 rounded-3xl animate-spin-slow"></div>
						<div class="absolute inset-2 border border-white/20 rounded-2xl animate-reverse-spin"></div>
					</div>
					<div class="text-5xl lg:text-6xl font-black text-white mb-3 animate-count-up-enhanced drop-shadow-lg">
						{stat.value}
					</div>
					<div class="text-orange-100 font-bold text-lg leading-tight">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-32 bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-50 dark:from-slate-800 dark:via-orange-900/10 dark:to-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-orange-400/5 to-red-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخطط إدارة المرور المتخصصة أن تحسن من مشروعك' : 'Discover how specialized traffic management plans can enhance your project'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-10">
			{#each benefits as benefit, index}
				<div class={`group bg-gradient-to-br from-white/98 to-orange-50/50 dark:from-slate-900/98 dark:to-orange-900/20 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 border border-orange-200/30 dark:border-orange-700/30 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.25}s;">
					
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
						<div class="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-orange-200 dark:from-orange-900/30 dark:via-red-900/20 dark:to-orange-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-8xl mb-6 animate-bounce-traffic">🚧</div>
								<div class="text-orange-600 dark:text-orange-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'فائدة إدارة المرور' : 'Traffic Management Benefit'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-orange-600/25 via-red-600/25 to-orange-600/25"></div>
						
						<!-- Floating Badge -->
						<div class="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
							0{index + 1}
						</div>
					</div>
					
					<div class="p-8">
						<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500 leading-tight">
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
<section id="case-studies" data-animate class="py-32 bg-gradient-to-br from-white via-red-50/30 to-white dark:from-slate-900 dark:via-red-900/10 dark:to-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-32 left-32 w-[400px] h-[400px] bg-gradient-to-r from-red-400/10 to-orange-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-32 right-32 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'دراسات حالة مشاريعنا' : 'Our Project Case Studies'}
			</h2>
			<p class="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة في إدارة المرور عبر المملكة'
					: 'Examples of our successful traffic management projects across the Kingdom'
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
						<div class="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-orange-200 dark:from-orange-900/30 dark:via-red-900/20 dark:to-orange-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="text-9xl mb-6">🏗️</div>
								<div class="text-orange-600 dark:text-orange-400 font-bold text-2xl">
									{($locale || 'en') === 'ar' ? 'مشروع متميز' : 'Featured Project'}
								</div>
							</div>
						</div>
						<!-- Enhanced Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-red-600/30 to-amber-600/30"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-6 left-6 right-6">
							<div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
								<div class="grid grid-cols-3 gap-4 text-center">
									{#each Object.entries(study.stats) as [key, value]}
										<div>
											<div class="text-2xl font-black text-orange-600">{value}</div>
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
							<span class="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
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
							<div class="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
								<MapPin class="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
								<div>
									<div class="text-sm text-slate-500 dark:text-slate-400 font-bold">
										{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
									</div>
									<div class="text-sm font-black text-slate-700 dark:text-slate-300">
										{($locale || 'en') === 'ar' ? study.location : study.locationEn}
									</div>
								</div>
							</div>
							<div class="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
								<Target class="w-6 h-6 text-red-600 dark:text-red-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
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
<section class="py-32 bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 dark:from-slate-950 dark:via-red-950 dark:to-orange-950 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-4xl lg:text-5xl font-black text-white mb-6">
			{($locale || 'en') === 'ar' ? 'هل تحتاج خطة إدارة مرور متخصصة؟' : 'Need a Specialized Traffic Management Plan?'}
		</h2>
		<p class="text-2xl text-orange-100 mb-12 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'خبراؤنا في إدارة المرور جاهزون لتطوير خطط شاملة ومتخصصة لمشروعك أو فعاليتك'
				: 'Our traffic management experts are ready to develop comprehensive and specialized plans for your project or event'
			}
		</p>
		
		<!-- Enhanced Contact Grid -->
		<div class="grid md:grid-cols-4 gap-6 mb-12">
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏢</div>
				<div class="font-bold text-orange-100 mb-2">الرياض</div>
				<a href={`tel:${contactInfo.riyadhPhone}`} class="text-white hover:text-orange-300 transition-colors font-bold text-sm">
					{contactInfo.riyadhPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🕌</div>
				<div class="font-bold text-orange-100 mb-2">جدة</div>
				<a href={`tel:${contactInfo.jeddahPhone}`} class="text-white hover:text-orange-300 transition-colors font-bold text-sm">
					{contactInfo.jeddahPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏭</div>
				<div class="font-bold text-orange-100 mb-2">الدمام</div>
				<a href={`tel:${contactInfo.dammamPhone}`} class="text-white hover:text-orange-300 transition-colors font-bold text-sm">
					{contactInfo.dammamPhone}
				</a>
			</div>
			<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 group">
				<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🚨</div>
				<div class="font-bold text-orange-100 mb-2">طوارئ 24/7</div>
				<a href={`tel:${contactInfo.mobile}`} class="text-white hover:text-orange-300 transition-colors font-bold text-sm">
					{contactInfo.mobile}
				</a>
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-8 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black rounded-3xl transition-all duration-500 hover:scale-110 hover:shadow-3xl shadow-2xl text-xl"
			>
				{($locale || 'en') === 'ar' ? 'احصل على استشارة فورية' : 'Get Immediate Consultation'}
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

	@keyframes bounce-traffic {
		0%, 100% { 
			transform: translateY(0) rotate(0deg); 
		}
		25% { 
			transform: translateY(-8px) rotate(-5deg); 
		}
		50% { 
			transform: translateY(-12px) rotate(0deg); 
		}
		75% { 
			transform: translateY(-8px) rotate(5deg); 
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

	@keyframes management-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -120; }
	}
	
	/* Enhanced Animation Classes */
	.animate-slide-up-bounce-enhanced { animation: slide-up-bounce-enhanced 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.8s ease-out forwards; }
	.animate-scale-in-enhanced { animation: scale-in-enhanced 0.8s ease-out forwards; }
	.animate-gradient-flow-enhanced { 
		background-size: 400% 400%;
		animation: gradient-flow-enhanced 8s ease infinite;
	}
	.animate-bounce-traffic { animation: bounce-traffic 3s ease-in-out infinite; }
	.animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
	.animate-fade-in-delayed-enhanced { animation: fade-in-delayed-enhanced 2.5s ease-out; }
	.animate-count-up-enhanced { animation: count-up-enhanced 1.2s ease-out; }
	
	/* Traffic Management Animation */
	.management-line-1 {
		stroke-dasharray: 30 20;
		animation: management-line-flow 8s linear infinite;
	}
	
	.management-line-2 {
		stroke-dasharray: 25 15;
		animation: management-line-flow 10s linear infinite reverse;
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

	/* Enhanced Responsive */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.5rem !important;
			line-height: 1.1;
		}
		
		.text-6xl {
			font-size: 3rem !important;
		}
		
		.grid-cols-4 {
			grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
		}
	}

	/* Enhanced Hover States */
	.group:hover .animate-bounce-traffic {
		animation-duration: 2s;
	}
</style>