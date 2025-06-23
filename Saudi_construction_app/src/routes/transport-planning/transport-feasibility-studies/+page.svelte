<!-- src/routes/transport-planning/transport-feasibility-studies/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		BarChart3,
		Calculator,
		TrendingUp,
		FileCheck,
		Target,
		DollarSign,
		Leaf,
		Award,
		Zap,
		AlertTriangle,
		Building,
		Factory,
		Truck,
		Globe,
		Activity,
		PieChart,
		LineChart,
		Database
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);

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
			icon: BarChart3,
			title: 'التحليل الاقتصادي الشامل',
			titleEn: 'Comprehensive Economic Analysis',
			description: 'تقييم مفصل للجدوى الاقتصادية والمالية لمشاريع النقل مع تحليل التكلفة والعائد على المدى القصير والطويل',
			descriptionEn: 'Detailed assessment of economic and financial viability of transport projects with short and long-term cost-benefit analysis',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/economic-analysis.jpg'
		},
		{
			icon: Calculator,
			title: 'نمذجة وتوقع حركة المرور',
			titleEn: 'Traffic Modeling & Forecasting',
			description: 'توقع وتحليل مستويات المرور وأنماط الحركة المستقبلية باستخدام أحدث تقنيات النمذجة المرورية',
			descriptionEn: 'Forecasting and analyzing traffic levels and future movement patterns using advanced traffic modeling techniques',
			color: 'from-blue-500 to-purple-600',
			image: '/images/features/traffic-modeling.jpg'
		},
		{
			icon: TrendingUp,
			title: 'تقييم تأثير المشروع',
			titleEn: 'Project Impact Assessment',
			description: 'تحليل شامل لتأثير المشروع المقترح على شبكة الطرق السريعة المحيطة من سيناريو عدم التدخل إلى سنوات التوقع',
			descriptionEn: 'Comprehensive analysis of proposed project impact on surrounding highway network from do-nothing scenarios to forecast years',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/impact-assessment.jpg'
		},
		{
			icon: Leaf,
			title: 'تقييم الأثر البيئي',
			titleEn: 'Environmental Impact Assessment',
			description: 'دراسة شاملة للتأثيرات البيئية والاجتماعية مع اقتراح تدابير التخفيف والحلول المستدامة',
			descriptionEn: 'Comprehensive study of environmental and social impacts with mitigation measures and sustainable solutions',
			color: 'from-green-500 to-blue-600',
			image: '/images/features/environmental-assessment.jpg'
		},
		{
			icon: Target,
			title: 'تحليل البدائل والخيارات',
			titleEn: 'Alternative Analysis & Options',
			description: 'تطوير وتحليل بدائل متعددة للمشروع مع تقييم المنافع والتكاليف لكل خيار من الخيارات المطروحة',
			descriptionEn: 'Development and analysis of multiple project alternatives with benefits and costs evaluation for each proposed option',
			color: 'from-amber-500 to-emerald-600',
			image: '/images/features/alternatives-analysis.jpg'
		},
		{
			icon: DollarSign,
			title: 'تحليل مصادر التمويل',
			titleEn: 'Funding Sources Analysis',
			description: 'تحديد وتقييم خيارات التمويل المختلفة مع هيكلة مالية مثلى للمشروع وخطط الاستثمار',
			descriptionEn: 'Identification and evaluation of different funding options with optimal financial structuring and investment plans',
			color: 'from-indigo-500 to-purple-600',
			image: '/images/features/funding-analysis.jpg'
		}
	];

	const benefits = [
		{
			title: 'اتخاذ قرارات مدروسة ومبنية على الأدلة',
			titleEn: 'Evidence-Based Informed Decision Making',
			description: 'نوفر معلومات أولية شاملة في المراحل المبكرة من المشروع لدعم اتخاذ قرارات استراتيجية مدروسة تقلل من المخاطر وتزيد من احتمالية النجاح',
			descriptionEn: 'We provide comprehensive preliminary information in early project stages to support strategic informed decisions that reduce risks and increase success probability',
			image: '/images/benefits/informed-decisions.jpg',
			icon: Target,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'تحليل شامل للمنافع والتأثيرات',
			titleEn: 'Comprehensive Benefits & Impact Analysis',
			description: 'تحليل مفصل لمنافع المشروع ومستويات المرور والتأثير على البيئة المحيطة مع خيارات قصيرة وطويلة المدى للتطوير أو ترقية الطرق السريعة',
			descriptionEn: 'Detailed analysis of project benefits, traffic levels, and environmental impact with short and long-term options for development or highway upgrades',
			image: '/images/benefits/comprehensive-analysis.jpg',
			icon: BarChart3,
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'دعم المشاريع الكبيرة والمعقدة',
			titleEn: 'Support for Large & Complex Projects',
			description: 'خدماتنا مصممة خصيصاً للمشاريع الكبيرة أو المعقدة أو التي تواجه تردداً أو جدلاً حول الخطة المقترحة، مما يوفر الوضوح والثقة للمطورين',
			descriptionEn: 'Our services are specifically designed for large or complex projects facing hesitation or controversy regarding proposed plans, providing clarity and confidence to developers',
			image: '/images/benefits/complex-projects.jpg',
			icon: Building,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const studyTypes = [
		{
			title: 'دراسات جدوى المشاريع الجديدة',
			titleEn: 'New Project Feasibility Studies',
			description: 'تقييم شامل للمشاريع الجديدة من البداية',
			descriptionEn: 'Comprehensive assessment of new projects from inception',
			items: [
				'تحليل الموقع والجدوى التقنية',
				'دراسة الطلب على النقل',
				'تقييم التأثير المروري',
				'تحليل التكلفة والعائد'
			],
			itemsEn: [
				'Site analysis and technical feasibility',
				'Transport demand study',
				'Traffic impact assessment',
				'Cost-benefit analysis'
			],
			icon: Building,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'دراسات ترقية البنية التحتية',
			titleEn: 'Infrastructure Upgrade Studies',
			description: 'تحليل خيارات تحسين وترقية الشبكات الموجودة',
			descriptionEn: 'Analysis of improvement and upgrade options for existing networks',
			items: [
				'تقييم الأداء الحالي',
				'تحديد نقاط الاختناق',
				'خيارات التحسين والترقية',
				'تحليل المردود الاستثماري'
			],
			itemsEn: [
				'Current performance evaluation',
				'Bottleneck identification',
				'Improvement and upgrade options',
				'Return on investment analysis'
			],
			icon: TrendingUp,
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'دراسات المشاريع المثيرة للجدل',
			titleEn: 'Controversial Project Studies',
			description: 'دعم المشاريع التي تواجه معارضة أو تردد',
			descriptionEn: 'Support for projects facing opposition or hesitation',
			items: [
				'تحليل أسباب المعارضة',
				'تطوير حلول بديلة',
				'إشراك أصحاب المصلحة',
				'استراتيجيات التواصل'
			],
			itemsEn: [
				'Opposition reasons analysis',
				'Alternative solutions development',
				'Stakeholder engagement',
				'Communication strategies'
			],
			icon: AlertTriangle,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const caseStudies = [
		{
			title: 'دراسة جدوى نظام النقل السريع - مدينة جدة',
			titleEn: 'Rapid Transit System Feasibility - Jeddah City',
			description: 'دراسة جدوى شاملة لنظام نقل سريع يخدم 800,000 راكب يومياً مع تحليل اقتصادي متعمق وتقييم التأثير البيئي والاجتماعي',
			descriptionEn: 'Comprehensive feasibility study for rapid transit system serving 800,000 daily passengers with in-depth economic analysis and environmental-social impact assessment',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			duration: '24 شهر',
			durationEn: '24 months',
			team: '18 متخصص',
			teamEn: '18 specialists',
			image: '/images/case-studies/jeddah-rapid-transit.jpg',
			icon: Activity,
			challenges: [
				'كثافة مرورية عالية',
				'تضاريس متنوعة',
				'تكامل مع الأنظمة الموجودة',
				'متطلبات بيئية صارمة'
			],
			challengesEn: [
				'High traffic density',
				'Diverse terrain',
				'Integration with existing systems',
				'Strict environmental requirements'
			],
			outcomes: [
				'توفير 40% في أوقات السفر',
				'تقليل 35% في الانبعاثات',
				'عائد استثماري إيجابي',
				'موافقة 85% من المجتمع'
			],
			outcomesEn: [
				'40% travel time savings',
				'35% emission reduction',
				'Positive investment return',
				'85% community approval'
			],
			stats: { passengers: '800K/day', lines: '4', investment: '$8.5B' }
		},
		{
			title: 'جدوى طريق الربط الإقليمي - المنطقة الشرقية',
			titleEn: 'Regional Connector Highway Feasibility - Eastern Province',
			description: 'دراسة جدوى طريق سريع بطول 120 كم يربط بين المدن الرئيسية في المنطقة الشرقية مع تقييم شامل للأثر الاقتصادي والاجتماعي',
			descriptionEn: 'Feasibility study for 120km highway connecting major cities in Eastern Province with comprehensive economic and social impact assessment',
			location: 'المنطقة الشرقية، المملكة العربية السعودية',
			locationEn: 'Eastern Province, Saudi Arabia',
			duration: '18 شهر',
			durationEn: '18 months',
			team: '15 متخصص',
			teamEn: '15 specialists',
			image: '/images/case-studies/eastern-highway.jpg',
			icon: Globe,
			challenges: [
				'تنسيق بين مدن متعددة',
				'تأثير على البيئة الصحراوية',
				'تحديات التمويل',
				'التكامل مع الموانئ'
			],
			challengesEn: [
				'Multi-city coordination',
				'Desert environment impact',
				'Funding challenges',
				'Port integration'
			],
			outcomes: [
				'ربط 5 مدن رئيسية',
				'تقليل زمن السفر 50%',
				'زيادة التجارة الإقليمية',
				'خلق 15,000 وظيفة'
			],
			outcomesEn: [
				'Connecting 5 major cities',
				'50% travel time reduction',
				'Increased regional trade',
				'15,000 jobs created'
			],
			stats: { length: '120 km', cities: '5', cost: '$3.2B' }
		},
		{
			title: 'جدوى مركز النقل المتعدد الوسائط - الرياض',
			titleEn: 'Multimodal Transport Hub Feasibility - Riyadh',
			description: 'دراسة جدوى مركز نقل متكامل يجمع بين قطار الرياض والحافلات ومواقف السيارات مع تحليل مفصل للتدفقات والعمليات',
			descriptionEn: 'Feasibility study for integrated transport hub combining Riyadh Metro, buses, and parking facilities with detailed flow and operations analysis',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			duration: '15 شهر',
			durationEn: '15 months',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/riyadh-transport-hub.jpg',
			icon: Truck,
			challenges: [
				'تكامل أنظمة مختلفة',
				'إدارة التدفقات الكبيرة',
				'قيود المساحة الحضرية',
				'التشغيل على مدار الساعة'
			],
			challengesEn: [
				'Different systems integration',
				'Large flow management',
				'Urban space constraints',
				'24/7 operations'
			],
			outcomes: [
				'خدمة 200,000 مسافر يومياً',
				'تقليل الازدحام 30%',
				'تحسين تجربة المسافر',
				'كفاءة تشغيلية عالية'
			],
			outcomesEn: [
				'Serving 200,000 daily passengers',
				'30% congestion reduction',
				'Enhanced passenger experience',
				'High operational efficiency'
			],
			stats: { passengers: '200K/day', modes: '5', area: '50,000 m²' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'التحليل الأولي والتقييم',
			titleEn: 'Initial Analysis & Assessment',
			description: 'جمع البيانات الأساسية وتحليل الوضع الحالي وتحديد نطاق الدراسة والأهداف المطلوبة',
			descriptionEn: 'Baseline data collection, current situation analysis, and study scope and objectives definition',
			icon: Database,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			step: '02',
			title: 'النمذجة وتحليل الطلب',
			titleEn: 'Modeling & Demand Analysis',
			description: 'تطوير النماذج المرورية وتحليل الطلب الحالي والمستقبلي مع سيناريوهات مختلفة',
			descriptionEn: 'Traffic model development and current/future demand analysis with different scenarios',
			icon: LineChart,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			step: '03',
			title: 'تطوير البدائل وتقييمها',
			titleEn: 'Alternative Development & Evaluation',
			description: 'إعداد بدائل متعددة للمشروع وتقييمها من النواحي التقنية والاقتصادية والبيئية',
			descriptionEn: 'Multiple project alternatives preparation and technical, economic, environmental evaluation',
			icon: PieChart,
			color: 'from-purple-500 to-amber-600'
		},
		{
			step: '04',
			title: 'التوصيات وخطة التنفيذ',
			titleEn: 'Recommendations & Implementation Plan',
			description: 'وضع التوصيات النهائية مع خطة تنفيذ مفصلة وجداول زمنية ومتطلبات التمويل',
			descriptionEn: 'Final recommendations with detailed implementation plan, timelines, and funding requirements',
			icon: Target,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const stats = [
		{
			value: '120+',
			label: 'دراسة جدوى مكتملة',
			labelEn: 'Completed Feasibility Studies',
			icon: FileCheck,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '96%',
			label: 'دقة التوقعات',
			labelEn: 'Forecast Accuracy',
			icon: TrendingUp,
			color: 'from-blue-500 to-purple-600'
		},
		{
			value: '$45B',
			label: 'قيمة المشاريع المدروسة',
			labelEn: 'Value of Projects Studied',
			icon: DollarSign,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '100%',
			label: 'معدل الموافقة',
			labelEn: 'Approval Success Rate',
			icon: Award,
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
	<title>{($locale || 'en') === 'ar' ? 'دراسات الجدوى النقلية' : 'Transport Feasibility Studies'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'دراسات جدوى النقل للمشاريع المقترحة وترقية المشاريع الموجودة' : 'Traffic feasibility studies for proposed and upgrade projects'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Advanced Data Visualization SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="feasibilityGrid" width="60" height="60" patternUnits="userSpaceOnUse">
					<circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="feasibilityWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#feasibilityGrid)" />
			
			<!-- Animated Data Charts -->
			<g class="chart-lines">
				<!-- Rising Chart Line -->
				<path d="M100,600 Q200,500 300,400 Q400,300 500,350 Q600,400 700,250 Q800,200 900,150" 
					  stroke="url(#feasibilityWave)" stroke-width="4" fill="none" opacity="0.7" class="feasibility-chart-1"/>
				<!-- Data Points -->
				<circle cx="300" cy="400" r="6" fill="#10b981" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite"/>
				</circle>
				<circle cx="500" cy="350" r="6" fill="#3b82f6" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite"/>
				</circle>
				<circle cx="700" cy="250" r="6" fill="#8b5cf6" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="5s" repeatCount="indefinite"/>
				</circle>
			</g>
			
			<!-- Floating Data Nodes -->
			<g class="data-nodes" opacity="0.6">
				<circle cx="150" cy="300" r="4" fill="#10b981">
					<animate attributeName="cy" values="300;280;300" dur="6s" repeatCount="indefinite"/>
				</circle>
				<circle cx="450" cy="500" r="4" fill="#3b82f6">
					<animate attributeName="cy" values="500;480;500" dur="7s" repeatCount="indefinite"/>
				</circle>
				<circle cx="750" cy="400" r="4" fill="#8b5cf6">
					<animate attributeName="cy" values="400;380;400" dur="8s" repeatCount="indefinite"/>
				</circle>
				<circle cx="950" cy="350" r="4" fill="#f59e0b">
					<animate attributeName="cy" values="350;330;350" dur="5s" repeatCount="indefinite"/>
				</circle>
			</g>
		</svg>
		
		<!-- Floating Particles -->
		{#if mounted}
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
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<BarChart3 class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">📊</span>
				{($locale || 'en') === 'ar' ? 'دراسات جدوى النقل للمشاريع المقترحة والترقية' : 'Traffic Feasibility Studies for Proposed and Upgrade Projects'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'دراسات الجدوى' : 'Feasibility Studies'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'النقلية' : 'Transport'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'دراسات الجدوى النقلية هي معلومات أولية يتم إجراؤها في المرحلة المبكرة من المشروع. غالباً ما يتم تنفيذها للمشاريع الكبيرة أو المعقدة، أو حيث يوجد تردد أو جدل حول الخطة المقترحة'
						: 'Transport feasibility studies are preliminary information undertaken in the early stage of a project. They often are carried out for large or complex projects, or where there is hesitation or controversy regarding the proposed plan'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'يمكن لدراسات الجدوى المرورية أن تقدم وثائق لتسليط الضوء على المنافع ومستويات المرور وتأثير المشروع المقترح مع خيارات قصيرة إلى طويلة المدى'
						: 'Our traffic feasibility studies can provide documents to highlight benefits, levels of traffic, the impact of the proposed project with short-term to long-term options'
					}
				</p>
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
				{($locale || 'en') === 'ar' ? 'خدمات دراسات الجدوى النقلية' : 'Transport Feasibility Study Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'يمكن لمكون النقل الخاص بنا تقييم تأثير المرور على شبكة الطرق السريعة المحيطة من عدم فعل شيء إلى سنوات التوقع مع المشروع في التشغيل الكامل'
					: 'Our transport component can assess the traffic impact on the surrounding highway network from do-nothing through to forecast years with the proposed project in full operation'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20 group-hover:from-emerald-600/30 group-hover:via-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
					</div>
					
					<div class="relative z-10 p-8">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
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

<!-- Enhanced Study Types Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'أنواع دراسات الجدوى' : 'Types of Feasibility Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم أنواعاً مختلفة من دراسات الجدوى المصممة حسب احتياجات مشروعك' : 'We offer different types of feasibility studies tailored to your project needs'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each studyTypes as study, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center gap-4 mb-6">
						<div class={`w-16 h-16 bg-gradient-to-br ${study.color} rounded-2xl flex items-center justify-center shadow-xl`}>
							<svelte:component this={study.icon} class="w-8 h-8 text-white" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? study.title : study.titleEn}
						</h3>
					</div>
					
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
					</p>
					
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? study.items : study.itemsEn) as item}
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

<!-- Enhanced Process Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'منهجية دراسة الجدوى' : 'Feasibility Study Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية شاملة ومثبتة لضمان جودة ودقة نتائج دراسة الجدوى' : 'We follow a comprehensive proven methodology to ensure quality and accuracy of feasibility study results'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class={`relative ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.15}s;">
					
					<!-- Step Number -->
					<div class="text-center mb-6">
						<div class={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl shadow-xl text-white font-black text-2xl mb-4`}>
							{step.step}
						</div>
						<div class={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto shadow-lg`}>
							<svelte:component this={step.icon} class="w-6 h-6 text-white" />
						</div>
					</div>
					
					<div class="text-center">
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3">
							{($locale || 'en') === 'ar' ? step.title : step.titleEn}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
							{($locale || 'en') === 'ar' ? step.description : step.descriptionEn}
						</p>
					</div>
					
					<!-- Connecting Line (except last item) -->
					{#if index < process.length - 1}
						<div class="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-30 transform translate-x-4"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 relative overflow-hidden">
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
					<div class="text-emerald-100 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد دراسات الجدوى النقلية' : 'Benefits of Transport Feasibility Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لدراسات الجدوى أن تضيف قيمة لمشروعك وتقلل من المخاطر' : 'Discover how feasibility studies can add value to your project and reduce risks'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each benefits as benefit, index}
				<div class={`group bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
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
<section id="case-studies" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة' : 'Successful Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على دراسات الجدوى النقلية الناجحة التي نفذناها لمشاريع مختلفة في المملكة'
					: 'Examples of successful transport feasibility studies we executed for various projects in the Kingdom'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
									<svelte:component this={study.icon} class="w-10 h-10 text-white" />
								</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'دراسة حالة متميزة' : 'Featured Case Study'}
								</div>
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-4 left-4 right-4">
							<div class="bg-white/90 backdrop-blur-sm rounded-xl p-4">
								<div class="flex justify-between text-sm">
									{#each Object.entries(study.stats) as [key, value]}
										<div class="text-center">
											<div class="font-black text-emerald-600">{value}</div>
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
							<div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
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
							<div class="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
								<MapPin class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.location : study.locationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
								<Clock class="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
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
						
						<!-- Challenges and Outcomes -->
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
									{($locale || 'en') === 'ar' ? 'النتائج' : 'Outcomes'}
								</h4>
								<ul class="space-y-2">
									{#each (($locale || 'en') === 'ar' ? study.outcomes : study.outcomesEn) as outcome}
										<li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
											<CheckCircle class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
											{outcome}
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
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء دراسة جدوى مشروعك؟' : 'Ready to Start Your Project Feasibility Study?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في تقييم جدوى مشروعك النقلي مع تحليل شامل للمنافع والتأثيرات والخيارات المختلفة'
				: 'Let us help you assess your transport project feasibility with comprehensive analysis of benefits, impacts, and various options'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ دراسة الجدوى' : 'Start Feasibility Study'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/transport-planning" 
				class="inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف خدمات أخرى' : 'Explore Other Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Same enhanced animations and styles as previous pages */
	
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

	/* Feasibility specific animations */
	.feasibility-chart-1 {
		stroke-dasharray: 20 10;
		animation: chart-flow 8s linear infinite;
	}
	
	@keyframes chart-flow {
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