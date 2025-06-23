<!-- src/routes/transport-planning/site-access/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		Navigation,
		Search,
		Truck,
		ShieldCheck,
		CheckSquare,
		BarChart3,
		Award,
		Zap,
		Target,
		Eye,
		Route,
		Building,
		Hospital,
		Home,
		Factory,
		AlertTriangle,
		FileCheck,
		TrendingUp,
		Layers
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 40 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.5 + 0.2
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

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			observer.disconnect();
		};
	});

	const features = [
		{
			icon: Navigation,
			title: 'تصميم الوصول للموقع',
			titleEn: 'Site Access Design',
			description: 'تصميمات مفصلة للوصول للموقع تشمل المحاذاة الأفقية والعمودية ومناطق الرؤية وفقاً لأحدث معايير الطرق السريعة',
			descriptionEn: 'Detailed site access designs including horizontal and vertical alignment with visibility splays according to latest highway standards',
			color: 'from-blue-500 to-emerald-600',
			image: '/images/features/site-access-design.jpg'
		},
		{
			icon: Eye,
			title: 'تحليل مناطق الرؤية',
			titleEn: 'Visibility Splay Analysis',
			description: 'تقييم شامل لمناطق الرؤية وزوايا الرؤية لضمان السلامة المرورية وفقاً لمعايير Manual for Streets و DMRB',
			descriptionEn: 'Comprehensive assessment of visibility splays and sight lines ensuring traffic safety according to Manual for Streets and DMRB standards',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/visibility-analysis.jpg'
		},
		{
			icon: Truck,
			title: 'تحليل المسار المتحرك (SPA)',
			titleEn: 'Swept Path Analysis (SPA)',
			description: 'محاكاة دقيقة لحركة المركبات المختلفة بما في ذلك الشاحنات والحافلات ومركبات الطوارئ لضمان الوصول الآمن',
			descriptionEn: 'Precise simulation of various vehicle movements including trucks, buses, and emergency vehicles ensuring safe access',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/swept-path-analysis.jpg'
		},
		{
			icon: ShieldCheck,
			title: 'تقييم السلامة والمعايير',
			titleEn: 'Safety & Standards Assessment',
			description: 'تحليل شامل للمخاطر المرورية والامتثال لمعايير الطرق السريعة المحلية والدولية مع وضع تدابير التخفيف',
			descriptionEn: 'Comprehensive traffic risk analysis and compliance with local and international highway standards with mitigation measures',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/safety-assessment.jpg'
		},
		{
			icon: CheckSquare,
			title: 'العناية الواجبة للموقع',
			titleEn: 'Site Due Diligence',
			description: 'فحص دقيق لإمكانية استيعاب الوصول المروري وفقاً لمعايير الطرق السريعة الحالية وتحديد التحديات المحتملة',
			descriptionEn: 'Thorough examination of vehicular access feasibility according to current highway standards and identification of potential challenges',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/due-diligence.jpg'
		},
		{
			icon: BarChart3,
			title: 'تحليل السعة والأداء',
			titleEn: 'Capacity & Performance Analysis',
			description: 'تحليل قدرة الطريق على استيعاب الحركة المرورية الإضافية مع تحسين الأداء التشغيلي للتقاطعات',
			descriptionEn: 'Analysis of road capacity to accommodate additional traffic with operational performance optimization for junctions',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/capacity-analysis.jpg'
		}
	];

	const benefits = [
		{
			title: 'ضمان الامتثال الكامل للمعايير',
			titleEn: 'Complete Standards Compliance Assurance',
			description: 'نضمن أن جميع تصميمات الوصول تلبي معايير الطرق السريعة الحالية والمتطلبات التنظيمية المحلية لتجنب أي تأخير في الموافقات أو رفض التطبيقات',
			descriptionEn: 'We ensure all access designs meet current highway standards and local regulatory requirements to avoid approval delays or application rejections',
			image: '/images/benefits/compliance-assurance.jpg',
			icon: ShieldCheck,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'تقليل المخاطر والتكاليف',
			titleEn: 'Risk & Cost Reduction',
			description: 'خدماتنا في العناية الواجبة تقلل من مخاطر رفض التطبيقات التخطيطية وتوفر حلولاً فعالة من حيث التكلفة للوصول للمواقع',
			descriptionEn: 'Our due diligence services reduce planning application rejection risks and provide cost-effective site access solutions',
			image: '/images/benefits/risk-reduction.jpg',
			icon: Target,
			color: 'from-amber-500 to-emerald-600'
		},
		{
			title: 'خبرة دولية متخصصة',
			titleEn: 'Specialized International Expertise',
			description: 'فريق من الخبراء المتخصصين في تصميم الوصول للمواقع مع خبرة واسعة في المملكة المتحدة وأستراليا ومشاريع دولية متنوعة',
			descriptionEn: 'Team of experts specialized in site access design with extensive experience in UK, Australia, and diverse international projects',
			image: '/images/benefits/international-expertise.jpg',
			icon: Award,
			color: 'from-blue-500 to-purple-600'
		}
	];

	const technicalServices = [
		{
			title: 'تحليل الرؤية والمحاذاة',
			titleEn: 'Visibility & Alignment Analysis',
			items: [
				'مناطق الرؤية الأفقية والعمودية',
				'تحليل المحاذاة الأفقية والعمودية',
				'مسافات الرؤية للإيقاف والتجاوز',
				'تقييم السرعات التشغيلية'
			],
			itemsEn: [
				'Horizontal and vertical visibility splays',
				'Horizontal and vertical alignment analysis',
				'Stopping and overtaking sight distances',
				'Operating speed assessments'
			]
		},
		{
			title: 'النمذجة والتصميم التقني',
			titleEn: 'Modeling & Technical Design',
			items: [
				'تحليل المسار المتحرك للمركبات',
				'تصميم رؤوس الدوران والمناورات',
				'نمذجة حركة مركبات الطوارئ',
				'تحليل التدرجات والانحدارات'
			],
			itemsEn: [
				'Vehicle swept path analysis',
				'Turning head and maneuver design',
				'Emergency vehicle movement modeling',
				'Gradient and slope analysis'
			]
		},
		{
			title: 'التوثيق والتقارير',
			titleEn: 'Documentation & Reports',
			items: [
				'تقارير تقنية شاملة',
				'رسومات تفصيلية بمقاييس دقيقة',
				'توثيق الامتثال للمعايير',
				'دعم طلبات التخطيط'
			],
			itemsEn: [
				'Comprehensive technical reports',
				'Detailed scaled drawings',
				'Standards compliance documentation',
				'Planning application support'
			]
		}
	];

	const caseStudies = [
		{
			title: 'مسكن جديد - منطقة التطوير السكني',
			titleEn: 'New Dwelling - Residential Development Area',
			description: 'تطوير وصول مروري جديد لمسكن من طابقين باستخدام حق طريق زراعي موجود مع تصميم تفصيلي شامل يشمل مناطق الرؤية وتحليل المسار المتحرك',
			descriptionEn: 'Development of new vehicular access for two-storey dwelling using existing agricultural Right of Way with comprehensive detailed design including visibility splays and swept path analysis',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			duration: '4 أشهر',
			durationEn: '4 months',
			team: '5 متخصصين',
			teamEn: '5 specialists',
			image: '/images/case-studies/residential-dwelling-access.jpg',
			icon: Home,
			challenges: [
				'عرض طريق محدود',
				'محاذاة عمودية صعبة',
				'معايير سلامة صارمة',
				'تصميم رأس دوران'
			],
			challengesEn: [
				'Restricted carriageway width',
				'Challenging vertical alignment',
				'Strict safety standards',
				'Turning head design'
			],
			solutions: [
				'تصميم محاذاة مُحسَّن',
				'مناطق رؤية محسوبة دقيقاً',
				'تحليل شامل للمسار المتحرك',
				'توثيق تقني مفصل'
			],
			solutionsEn: [
				'Optimized alignment design',
				'Precisely calculated visibility splays',
				'Comprehensive swept path analysis',
				'Detailed technical documentation'
			],
			stats: { width: '3.5m', gradient: '8%', visibility: '43m' }
		},
		{
			title: 'وصول المجمع التجاري الكبير',
			titleEn: 'Major Commercial Complex Access',
			description: 'تطوير نظام وصول متعدد النقاط لمجمع تجاري كبير يخدم مئات المركبات يومياً مع تحليل شامل للحركة المرورية والسعة',
			descriptionEn: 'Multi-point access system development for major commercial complex serving hundreds of vehicles daily with comprehensive traffic and capacity analysis',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			duration: '8 أشهر',
			durationEn: '8 months',
			team: '10 متخصصين',
			teamEn: '10 specialists',
			image: '/images/case-studies/commercial-complex-access.jpg',
			icon: Building,
			challenges: [
				'حجم مرور عالي',
				'نقاط وصول متعددة',
				'تنسيق مع السلطات',
				'معايير سلامة معقدة'
			],
			challengesEn: [
				'High traffic volume',
				'Multiple access points',
				'Authority coordination',
				'Complex safety standards'
			],
			solutions: [
				'تصميم تقاطعات محسَّن',
				'تحليل سعة متقدم',
				'إشارات مرور ذكية',
				'خطة إدارة مرور'
			],
			solutionsEn: [
				'Optimized junction design',
				'Advanced capacity analysis',
				'Smart traffic signals',
				'Traffic management plan'
			],
			stats: { area: '50,000 m²', visitors: '25K/day', entrances: '4' }
		},
		{
			title: 'وصول المستشفى التخصصي',
			titleEn: 'Specialized Hospital Access',
			description: 'حلول وصول معقدة لمستشفى تخصصي تشمل وصول الطوارئ والخدمات اللوجستية ومواقف الزوار مع ضمان السلامة والكفاءة',
			descriptionEn: 'Complex access solutions for specialized hospital including emergency, logistics, and visitor access ensuring safety and efficiency',
			location: 'الدمام، المملكة العربية السعودية',
			locationEn: 'Dammam, Saudi Arabia',
			duration: '12 شهر',
			durationEn: '12 months',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/hospital-access.jpg',
			icon: Hospital,
			challenges: [
				'وصول الطوارئ الحرج',
				'حركة مرور مختلطة',
				'متطلبات أمنية',
				'تشغيل على مدار الساعة'
			],
			challengesEn: [
				'Critical emergency access',
				'Mixed traffic flow',
				'Security requirements',
				'24/7 operations'
			],
			solutions: [
				'مسارات طوارئ منفصلة',
				'أنظمة توجيه ذكية',
				'تحكم أمني متقدم',
				'تصميم مرن ومستدام'
			],
			solutionsEn: [
				'Dedicated emergency lanes',
				'Smart guidance systems',
				'Advanced security control',
				'Flexible sustainable design'
			],
			stats: { beds: '500', ambulances: '50/day', helipads: '2' }
		}
	];

	const stats = [
		{
			value: '250+',
			label: 'مشروع وصول مكتمل',
			labelEn: 'Completed Access Projects',
			icon: Navigation,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '96%',
			label: 'معدل الموافقة',
			labelEn: 'Approval Success Rate',
			icon: CheckCircle,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '20+',
			label: 'سنة خبرة',
			labelEn: 'Years Experience',
			icon: Award,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '100%',
			label: 'امتثال للمعايير',
			labelEn: 'Standards Compliance',
			icon: ShieldCheck,
			color: 'from-amber-500 to-blue-600'
		}
	];

	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}

	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'الوصول للموقع والعناية الواجبة' : 'Site Access & Due Diligence'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تصميم الوصول للموقع والعناية الواجبة المتخصصة مع ضمان الامتثال لمعايير الطرق السريعة' : 'Specialized site access design and due diligence services ensuring highway standards compliance'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Road Network SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="accessGrid" width="80" height="80" patternUnits="userSpaceOnUse">
					<circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;2.5;1" dur="3s" repeatCount="indefinite"/>
					</circle>
					<path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="accessWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.5"/>
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.7"/>
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.5"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#accessGrid)" />
			
			<!-- Animated Access Roads -->
			<path d="M100,400 Q300,300 500,400 Q700,500 900,400" stroke="url(#accessWave)" stroke-width="6" fill="none" opacity="0.6" class="access-line-1"/>
			<path d="M200,200 Q400,250 600,200 Q800,150 1000,200" stroke="url(#accessWave)" stroke-width="4" fill="none" opacity="0.5" class="access-line-2"/>
			<path d="M150,600 Q350,550 550,600 Q750,650 950,600" stroke="url(#accessWave)" stroke-width="3" fill="none" opacity="0.4" class="access-line-3"/>
		</svg>
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute rounded-full bg-gradient-to-r from-blue-400 to-emerald-500 animate-float-particle"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 4}s;
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-100/80 to-emerald-100/80 dark:from-blue-900/30 dark:to-emerald-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Route class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🛣️</span>
				{($locale || 'en') === 'ar' ? 'تحديد الجوانب المحتملة للطرق السريعة والنقل' : 'Identifying Potential Highway & Transport Aspects'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'الوصول للموقع' : 'Site Access'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'والعناية الواجبة' : '& Due Diligence'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'هل تسعى لاستحواذ أرض للتطوير ولكن لست متأكداً من إمكانية استيعاب وصول مروري يلبي معايير الطرق السريعة؟ أم أن السلطة المحلية لديها مخاوف حول الوصول الحالي للموقع؟'
						: 'Are you seeking to acquire land to develop but not sure whether you can accommodate vehicular access that meets highway standards, or the local highway authority has concerns with the existing site access?'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نساعدك في تطوير حلول الوصول للموقع من المشورة المكتبية إلى الرسوم التفصيلية مع مناطق الرؤية والمحاذاة العمودية وتحليل المسار المتحرك'
						: 'We help you develop site access solutions from desktop advice to detailed drawings with visibility splays, vertical alignments, and swept path analysis'
					}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Challenge Statement Section -->
<section class="py-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/5 to-orange-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
					{($locale || 'en') === 'ar' ? 'التحديات الشائعة' : 'Common Challenges'}
				</h2>
				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mt-1">
							<AlertTriangle class="w-5 h-5 text-white" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' 
								? 'تنفيذ وصول جديد للموقع أو تعديل الوصول الحالي يمكن أن يكون تحدياً إذا اعتبرته السلطة المحلية غير آمن'
								: 'The implementation of new site access or modifying existing site access can be challenging if the local authority deems it unsafe'
							}
						</p>
					</div>
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mt-1">
							<AlertTriangle class="w-5 h-5 text-white" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' 
								? 'المطورون الحاليون الذين يسعون للتوسع أو تغيير الاستخدام مطالبون الآن بامتثال وصول الموقع لمعايير الطرق السريعة الحالية'
								: 'Existing developments requiring expanding, or sites seeking a use change are now requiring site access to comply with today\'s highway standards'
							}
						</p>
					</div>
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mt-1">
							<AlertTriangle class="w-5 h-5 text-white" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' 
								? 'عدم الامتثال لمعايير الطرق السريعة الحالية قد يُعتبر تكثيفاً للاستخدام ويتطلب ترقيات أمنية'
								: 'Non-compliance with current highway standards may be deemed an intensification of use requiring safety upgrades'
							}
						</p>
					</div>
				</div>
			</div>
			
			<div class="relative">
				<div class="aspect-square bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-amber-800/30 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
					<div class="absolute inset-0 opacity-10">
						<svg width="100%" height="100%" viewBox="0 0 100 100">
							<pattern id="challenge-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
								<path d="M 0 20 L 20 0 M 0 0 L 20 20" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
							</pattern>
							<rect width="100%" height="100%" fill="url(#challenge-pattern)" />
						</svg>
					</div>
					
					<div class="text-center relative z-10">
						<div class="relative mb-6">
							<div class="text-8xl">⚠️</div>
							<div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
						</div>
						<div class="text-amber-600 dark:text-amber-400 font-black text-xl">
							{($locale || 'en') === 'ar' ? 'تحديات الوصول' : 'Access Challenges'}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Features Section -->
<section id="features" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات الوصول للموقع' : 'Site Access Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'مع خبرتنا ومعرفتنا التصميمية في ترتيبات الوصول للموقع، نقدم حلولاً شاملة تلبي متطلبات سلطة الطرق السريعة'
					: 'With our experience and design knowledge with site access arrangements, we provide comprehensive solutions meeting highway authority requirements'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					
					<!-- Background Gradient -->
					<div class={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
					
					<!-- Feature Image -->
					<div class="h-48 overflow-hidden rounded-t-3xl relative">
						<img 
							src={feature.image} 
							alt={($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-amber-600/20 group-hover:from-blue-600/30 group-hover:via-emerald-600/30 group-hover:to-amber-600/30 transition-all duration-500"></div>
					</div>
					
					<div class="relative z-10 p-8">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
					</div>
					
					<!-- Bottom Accent -->
					<div class={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Technical Services Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'الخدمات التقنية المتخصصة' : 'Specialized Technical Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم مجموعة شاملة من الخدمات التقنية المتخصصة في تصميم الوصول للمواقع' : 'We provide a comprehensive range of specialized technical services in site access design'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each technicalServices as service, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-6">
						{($locale || 'en') === 'ar' ? service.title : service.titleEn}
					</h3>
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? service.items : service.itemsEn) as item}
							<li class="flex items-start gap-3">
								<CheckCircle class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
								<span class="text-slate-600 dark:text-slate-300">{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-24 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class={`relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300`}>
						<svelte:component this={stat.icon} class="relative z-10 w-10 h-10 text-white drop-shadow-lg" />
						<div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
						<div class={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
					</div>
					<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
						{stat.value}
					</div>
					<div class="text-blue-100 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخبرتنا في تصميم الوصول للمواقع أن تضيف قيمة لمشروعك' : 'Discover how our site access design expertise can add value to your project'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each benefits as benefit, index}
				<div class={`group bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<!-- Benefit Image -->
					<div class="h-48 overflow-hidden relative">
						<img 
							src={benefit.image} 
							alt={($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={benefit.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-emerald-600/20"></div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? benefit.description : benefit.descriptionEn}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Case Studies Section -->
<section id="case-studies" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات الحالة وأمثلة الوصول للموقع' : 'Site Access Case Studies & Examples'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة في تصميم الوصول للمواقع المختلفة'
					: 'Examples of our successful site access design projects for various developments'
				}
			</p>
		</div>

		<div class="space-y-16">
			{#each caseStudies as study, index}
				<div class={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''} ${isVisible('case-studies') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					
					<!-- Case Study Image -->
					<div class={`relative rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
						<img 
							src={study.image} 
							alt={($locale || 'en') === 'ar' ? study.title : study.titleEn}
							class="w-full h-80 lg:h-96 object-cover"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
									<svelte:component this={study.icon} class="w-10 h-10 text-white" />
								</div>
								<div class="text-blue-600 dark:text-blue-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'مشروع متميز' : 'Featured Project'}
								</div>
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-purple-600/20"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-4 left-4 right-4">
							<div class="bg-white/90 backdrop-blur-sm rounded-xl p-4">
								<div class="flex justify-between text-sm">
									{#each Object.entries(study.stats) as [key, value]}
										<div class="text-center">
											<div class="font-black text-blue-600">{value}</div>
											<div class="text-slate-600 capitalize">{key}</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
					
					<!-- Case Study Content -->
					<div class={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
								<svelte:component this={study.icon} class="w-6 h-6 text-white" />
							</div>
							<h3 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
								{($locale || 'en') === 'ar' ? study.title : study.titleEn}
							</h3>
						</div>
						
						<p class="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<!-- Project Details -->
						<div class="grid grid-cols-3 gap-4 mb-8">
							<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
								<MapPin class="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.location : study.locationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
								<Clock class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.duration : study.durationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
								<Users class="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'الفريق' : 'Team'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.team : study.teamEn}
								</div>
							</div>
						</div>
						
						<!-- Challenges and Solutions -->
						<div class="grid md:grid-cols-2 gap-6">
							<div>
								<h4 class="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
									<AlertTriangle class="w-5 h-5 text-amber-500" />
									{($locale || 'en') === 'ar' ? 'التحديات' : 'Challenges'}
								</h4>
								<ul class="space-y-2">
									{#each (($locale || 'en') === 'ar' ? study.challenges : study.challengesEn) as challenge}
										<li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
											<div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
											{challenge}
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<h4 class="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
									<CheckCircle class="w-5 h-5 text-emerald-500" />
									{($locale || 'en') === 'ar' ? 'الحلول' : 'Solutions'}
								</h4>
								<ul class="space-y-2">
									{#each (($locale || 'en') === 'ar' ? study.solutions : study.solutionsEn) as solution}
										<li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
											<CheckCircle class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
											{solution}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Client Testimonial Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
			<div class="text-6xl mb-8">💬</div>
			<blockquote class="text-xl lg:text-2xl text-white mb-8 leading-relaxed font-medium">
				{($locale || 'en') === 'ar'
					? '"خدمة ممتازة ومهنية جداً قدمتها شركتنا لدعم اعتراضنا على الخطة المحلية. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً."'
					: '"Excellent and very professional service provided by our company to support our Local Plan objection. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">أحمد الغامدي</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'مجلس منطقة الرياض، المملكة العربية السعودية' : 'Riyadh Regional Council, Saudi Arabia'}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروع الوصول للموقع؟' : 'Ready to Start Your Site Access Project?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'مقرنا في المملكة العربية السعودية، قمنا بإنتاج تصميمات وصول للمواقع لمجموعة متنوعة من المشاريع بما في ذلك التجزئة والتجارية والصناعية والسكنية والمدارس والجامعات والمستشفيات'
				: 'Based in Saudi Arabia, we have produced site access designs for a variety of sites including retail, commercial, industrial, residential, schools, universities and hospitals'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/transport-planning" 
				class="inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف المزيد' : 'Explore More Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes */
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

	@keyframes fade-in-up-advanced {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes scale-in-advanced {
		0% {
			opacity: 0;
			transform: scale(0.7);
		}
		100% {
			opacity: 1;
			transform: scale(1);
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

	@keyframes count-up-advanced {
		0% { 
			opacity: 0; 
			transform: translateY(20px) scale(0.8); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0) scale(1); 
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

	@keyframes access-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -120; }
	}
	
	/* Animation Classes */
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.6s ease-out forwards; }
	.animate-scale-in-advanced { animation: scale-in-advanced 0.6s ease-out forwards; }
	.animate-gradient-flow { 
		background-size: 200% 200%;
		animation: gradient-flow 6s ease infinite;
	}
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }
	.animate-count-up-advanced { animation: count-up-advanced 1s ease-out; }
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }
	
	/* Access Line Animation */
	.access-line-1 {
		stroke-dasharray: 25 15;
		animation: access-line-flow 6s linear infinite;
	}
	
	.access-line-2 {
		stroke-dasharray: 20 10;
		animation: access-line-flow 7s linear infinite reverse;
	}
	
	.access-line-3 {
		stroke-dasharray: 15 8;
		animation: access-line-flow 8s linear infinite;
	}

	/* Utility Classes */
	.bg-300\% {
		background-size: 300% 300%;
	}

	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle,
	.animate-gradient-flow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Dark mode enhancements */
	.dark .backdrop-blur-xl {
		backdrop-filter: blur(24px) saturate(180%);
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

	/* Responsive adjustments */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.25rem !important;
			line-height: 1.1;
		}
	}
</style>