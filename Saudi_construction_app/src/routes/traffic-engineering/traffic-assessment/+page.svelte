<!-- src/routes/traffic-engineering/traffic-assessment/+page.svelte -->
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
		Activity,
		TrendingUp,
		Search,
		Target,
		Zap,
		Award,
		AlertTriangle,
		Car,
		Navigation,
		Timer,
		Eye,
		Database,
		CheckSquare,
		Building,
		Factory,
		Home,
		Hospital,
		Globe,
		Shield,
		PieChart,
		LineChart,
		Layers,
		Route,
		Camera,
		Radio,
		Gauge
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 45 }, (_, i) => ({
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
			title: 'تحليل تدفق حركة المرور',
			titleEn: 'Traffic Flow Analysis',
			description: 'تحليل شامل لأنماط تدفق المرور والكثافة المرورية باستخدام أحدث تقنيات القياس والمراقبة المتطورة',
			descriptionEn: 'Comprehensive analysis of traffic flow patterns and density using advanced measurement and monitoring technologies',
			color: 'from-blue-500 to-emerald-600',
			image: '/images/features/traffic-flow-analysis.jpg'
		},
		{
			icon: Activity,
			title: 'دراسات التقاطعات المرورية',
			titleEn: 'Intersection Studies',
			description: 'تقييم مفصل لأداء التقاطعات المرورية وكفاءة إشارات المرور مع اقتراح حلول تحسين الأداء',
			descriptionEn: 'Detailed assessment of intersection performance and traffic signal efficiency with performance improvement solutions',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/intersection-studies.jpg'
		},
		{
			icon: Gauge,
			title: 'دراسات السرعة والحجم',
			titleEn: 'Speed & Volume Studies',
			description: 'قياس دقيق لسرعات المركبات وأحجام المرور في نقاط مختلفة مع تحليل الاتجاهات والأنماط الزمنية',
			descriptionEn: 'Precise measurement of vehicle speeds and traffic volumes at various points with trend and temporal pattern analysis',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/speed-volume-studies.jpg'
		},
		{
			icon: Shield,
			title: 'تقييم السلامة المرورية',
			titleEn: 'Traffic Safety Assessment',
			description: 'تحليل شامل للحوادث المرورية ونقاط الخطر مع وضع استراتيجيات شاملة لتحسين السلامة المرورية',
			descriptionEn: 'Comprehensive accident analysis and hazard identification with comprehensive strategies for traffic safety improvement',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/safety-assessment.jpg'
		},
		{
			icon: Eye,
			title: 'مسوحات السلوك المروري',
			titleEn: 'Traffic Behavior Surveys',
			description: 'دراسة سلوك المستخدمين وأنماط التنقل لفهم احتياجات المرور وتحسين تصميم الطرق والمرافق',
			descriptionEn: 'Study of user behavior and mobility patterns to understand traffic needs and improve road and facility design',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/behavior-surveys.jpg'
		},
		{
			icon: Database,
			title: 'تحليل البيانات المتقدم',
			titleEn: 'Advanced Data Analytics',
			description: 'استخدام الذكاء الاصطناعي وتعلم الآلة لتحليل البيانات المرورية واستخراج رؤى قابلة للتنفيذ',
			descriptionEn: 'Using AI and machine learning to analyze traffic data and extract actionable insights',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/data-analytics.jpg'
		}
	];

	const assessmentTypes = [
		{
			title: 'تقييم المرور الحضري',
			titleEn: 'Urban Traffic Assessment',
			description: 'دراسات شاملة للمرور في المناطق الحضرية المزدحمة',
			descriptionEn: 'Comprehensive studies for traffic in busy urban areas',
			items: [
				'تحليل ازدحام المرور في ساعات الذروة',
				'دراسة أنماط الحركة اليومية والأسبوعية',
				'تقييم كفاءة أنظمة النقل العام',
				'تحليل مواقف السيارات والطلب عليها'
			],
			itemsEn: [
				'Peak hour traffic congestion analysis',
				'Daily and weekly movement pattern studies',
				'Public transport system efficiency evaluation',
				'Parking analysis and demand assessment'
			],
			icon: Building,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'تقييم الطرق السريعة',
			titleEn: 'Highway Assessment',
			description: 'تحليل متخصص للطرق السريعة والشرايين الرئيسية',
			descriptionEn: 'Specialized analysis for highways and major arterials',
			items: [
				'قياس السعة والمستوى الخدمي',
				'تحليل نقاط الاختناق المروري',
				'دراسة حركة الشاحنات والمركبات الثقيلة',
				'تقييم مسافات الرؤية والسلامة'
			],
			itemsEn: [
				'Capacity and level of service measurement',
				'Traffic bottleneck analysis',
				'Truck and heavy vehicle movement studies',
				'Sight distance and safety evaluation'
			],
			icon: Route,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			title: 'تقييم المناطق التجارية والصناعية',
			titleEn: 'Commercial & Industrial Zone Assessment',
			description: 'دراسات متخصصة للمناطق التجارية والصناعية',
			descriptionEn: 'Specialized studies for commercial and industrial zones',
			items: [
				'تحليل حركة البضائع والتوريدات',
				'دراسة أوقات التحميل والتفريغ',
				'تقييم تأثير الأنشطة التجارية على المرور',
				'تحليل احتياجات مواقف المركبات التجارية'
			],
			itemsEn: [
				'Freight and supply movement analysis',
				'Loading and unloading time studies',
				'Commercial activity traffic impact assessment',
				'Commercial vehicle parking needs analysis'
			],
			icon: Factory,
			color: 'from-purple-500 to-amber-600'
		}
	];

	const benefits = [
		{
			title: 'تحسين كفاءة الشبكة المرورية',
			titleEn: 'Traffic Network Efficiency Improvement',
			description: 'تساعد تقييمات المرور في تحديد نقاط الضعف وتحسين كفاءة الشبكة المرورية مما يقلل أوقات السفر ويحسن تدفق المرور',
			descriptionEn: 'Traffic assessments help identify weaknesses and improve traffic network efficiency, reducing travel times and improving traffic flow',
			image: '/images/benefits/network-efficiency.jpg',
			icon: TrendingUp,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'تعزيز السلامة المرورية',
			titleEn: 'Enhanced Traffic Safety',
			description: 'من خلال تحليل أنماط الحوادث وسلوك المستخدمين، نساعد في وضع استراتيجيات فعالة لتقليل الحوادث وتحسين السلامة العامة',
			descriptionEn: 'Through accident pattern analysis and user behavior study, we help develop effective strategies to reduce accidents and improve public safety',
			image: '/images/benefits/safety-enhancement.jpg',
			icon: Shield,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'دعم اتخاذ القرارات المبنية على البيانات',
			titleEn: 'Data-Driven Decision Support',
			description: 'توفر البيانات والتحليلات المفصلة أساساً قوياً لاتخاذ قرارات مدروسة في تخطيط وتطوير البنية التحتية للنقل',
			descriptionEn: 'Detailed data and analytics provide a strong foundation for informed decision-making in transport infrastructure planning and development',
			image: '/images/benefits/data-driven-decisions.jpg',
			icon: Database,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const caseStudies = [
		{
			title: 'تقييم شامل للمرور - وسط الرياض',
			titleEn: 'Comprehensive Traffic Assessment - Central Riyadh',
			description: 'دراسة مرورية شاملة لمنطقة وسط الرياض تغطي 25 تقاطعاً رئيسياً و50 كم من الطرق مع تحليل تدفق 150,000 مركبة يومياً وتطوير حلول ذكية لتحسين الحركة المرورية',
			descriptionEn: 'Comprehensive traffic study for central Riyadh covering 25 major intersections and 50 km of roads with 150,000 daily vehicle flow analysis and smart solutions development for traffic improvement',
			location: 'وسط الرياض، المملكة العربية السعودية',
			locationEn: 'Central Riyadh, Saudi Arabia',
			duration: '8 أشهر',
			durationEn: '8 months',
			team: '15 متخصص',
			teamEn: '15 specialists',
			image: '/images/case-studies/riyadh-traffic-assessment.jpg',
			icon: Building,
			challenges: [
				'كثافة مرورية عالية في ساعات الذروة',
				'تعقيد شبكة الطرق في المنطقة التاريخية',
				'تنوع أنماط المرور والمستخدمين',
				'تداخل حركة المشاة والمركبات'
			],
			challengesEn: [
				'High traffic density during peak hours',
				'Complex road network in historic district',
				'Diverse traffic patterns and users',
				'Pedestrian and vehicle traffic overlap'
			],
			outcomes: [
				'تقليل 35% في أوقات التأخير',
				'تحسين 50% في كفاءة إشارات المرور',
				'انخفاض 25% في الحوادث المرورية',
				'وضع خطة ذكية لإدارة المرور'
			],
			outcomesEn: [
				'35% reduction in delay times',
				'50% improvement in traffic signal efficiency',
				'25% decrease in traffic accidents',
				'Smart traffic management plan development'
			],
			stats: { intersections: '25', roads: '50 km', vehicles: '150K/day' }
		},
		{
			title: 'دراسة الطريق السريع - جدة-مكة',
			titleEn: 'Highway Study - Jeddah-Makkah',
			description: 'تقييم مروري متطور للطريق السريع بين جدة ومكة المكرمة بطول 80 كم مع تحليل حركة المرور الموسمية خلال فترة الحج والعمرة وتطوير نظام إدارة مرور ديناميكي',
			descriptionEn: 'Advanced traffic assessment for 80 km Jeddah-Makkah highway with seasonal traffic analysis during Hajj and Umrah periods and dynamic traffic management system development',
			location: 'الطريق السريع جدة-مكة، المملكة العربية السعودية',
			locationEn: 'Jeddah-Makkah Highway, Saudi Arabia',
			duration: '12 شهر',
			durationEn: '12 months',
			team: '20 متخصص',
			teamEn: '20 specialists',
			image: '/images/case-studies/jeddah-makkah-highway.jpg',
			icon: Route,
			challenges: [
				'تقلبات مرورية موسمية شديدة',
				'حركة مرور كثيفة من الحافلات والمركبات الثقيلة',
				'ظروف جوية متغيرة',
				'متطلبات سلامة عالية'
			],
			challengesEn: [
				'Extreme seasonal traffic fluctuations',
				'Heavy bus and truck traffic',
				'Variable weather conditions',
				'High safety requirements'
			],
			outcomes: [
				'نظام إدارة مرور ديناميكي متطور',
				'تحسين 40% في معدل التدفق',
				'تقليل 60% في الحوادث الخطيرة',
				'خطة طوارئ شاملة للمواسم'
			],
			outcomesEn: [
				'Advanced dynamic traffic management system',
				'40% improvement in flow rate',
				'60% reduction in serious accidents',
				'Comprehensive seasonal emergency plan'
			],
			stats: { length: '80 km', vehicles: '300K/day', seasons: '2 major' }
		},
		{
			title: 'تقييم المنطقة الصناعية - الجبيل',
			titleEn: 'Industrial Zone Assessment - Jubail',
			description: 'دراسة متخصصة للحركة المرورية في المدينة الصناعية بالجبيل تركز على حركة الشاحنات والمركبات الثقيلة مع تحليل أوقات الذروة الصناعية وتطوير خطة مرور متكاملة للمنطقة',
			descriptionEn: 'Specialized traffic study for Jubail Industrial City focusing on truck and heavy vehicle movement with industrial peak time analysis and integrated traffic plan development',
			location: 'المدينة الصناعية، الجبيل',
			locationEn: 'Industrial City, Jubail',
			duration: '10 أشهر',
			durationEn: '10 months',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/jubail-industrial-assessment.jpg',
			icon: Factory,
			challenges: [
				'حركة مركبات ثقيلة مكثفة',
				'تداخل المرور الصناعي والعام',
				'متطلبات نقل المواد الخطرة',
				'تنسيق مع الشركات المتعددة'
			],
			challengesEn: [
				'Intensive heavy vehicle movement',
				'Industrial and public traffic overlap',
				'Hazardous material transport requirements',
				'Multi-company coordination'
			],
			outcomes: [
				'فصل مسارات المركبات الثقيلة',
				'نظام توقيت ذكي للمصانع',
				'تحسين 45% في كفاءة التوزيع',
				'تقليل 30% في تأثير المرور على السكان'
			],
			outcomesEn: [
				'Heavy vehicle lane separation',
				'Smart factory timing system',
				'45% improvement in distribution efficiency',
				'30% reduction in traffic impact on residents'
			],
			stats: { factories: '50+', trucks: '15K/day', efficiency: '+45%' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'التخطيط وجمع البيانات',
			titleEn: 'Planning & Data Collection',
			description: 'تحديد نطاق الدراسة وتجهيز أدوات القياس وجمع البيانات الأولية من المصادر المختلفة',
			descriptionEn: 'Study scope definition, measurement tools preparation, and baseline data collection from various sources',
			icon: Search,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			step: '02',
			title: 'المسوحات الميدانية والقياسات',
			titleEn: 'Field Surveys & Measurements',
			description: 'إجراء مسوحات ميدانية مفصلة وقياسات دقيقة لحركة المرور والسرعات والكثافة',
			descriptionEn: 'Conducting detailed field surveys and precise measurements of traffic movement, speeds, and density',
			icon: Camera,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			step: '03',
			title: 'التحليل والنمذجة',
			titleEn: 'Analysis & Modeling',
			description: 'تحليل البيانات المجمعة وإنشاء نماذج مرورية متقدمة لفهم الأنماط والاتجاهات',
			descriptionEn: 'Analyzing collected data and creating advanced traffic models to understand patterns and trends',
			icon: BarChart3,
			color: 'from-purple-500 to-amber-600'
		},
		{
			step: '04',
			title: 'التوصيات والحلول',
			titleEn: 'Recommendations & Solutions',
			description: 'وضع توصيات شاملة وحلول عملية لتحسين الأداء المروري وحل المشاكل المحددة',
			descriptionEn: 'Developing comprehensive recommendations and practical solutions to improve traffic performance and solve identified problems',
			icon: Target,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const stats = [
		{
			value: '200+',
			label: 'تقييم مروري مكتمل',
			labelEn: 'Traffic Assessments Completed',
			icon: BarChart3,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '95%',
			label: 'دقة التنبؤات المرورية',
			labelEn: 'Traffic Prediction Accuracy',
			icon: Target,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '500K+',
			label: 'مركبة مراقبة يومياً',
			labelEn: 'Daily Monitored Vehicles',
			icon: Car,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '85%',
			label: 'تحسين متوسط في التدفق',
			labelEn: 'Average Flow Improvement',
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
	<title>{($locale || 'en') === 'ar' ? 'تقييم حركة المرور' : 'Traffic Assessment'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تقييم وتحليل حركة المرور المتخصصة لتحسين كفاءة الشبكة المرورية والسلامة' : 'Specialized traffic assessment and analysis services to improve traffic network efficiency and safety'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Advanced Traffic Flow SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="trafficGrid" width="50" height="50" patternUnits="userSpaceOnUse">
					<circle cx="25" cy="25" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="trafficWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#trafficGrid)" />
			
			<!-- Traffic Flow Lines -->
			<g class="traffic-flow" opacity="0.6">
				<!-- Main Traffic Arteries -->
				<path d="M50,300 L200,280 L350,300 L500,280 L650,300 L800,280 L950,300" 
					  stroke="url(#trafficWave)" stroke-width="4" fill="none" class="traffic-flow-1"/>
				<path d="M50,400 L200,420 L350,400 L500,420 L650,400 L800,420 L950,400" 
					  stroke="url(#trafficWave)" stroke-width="4" fill="none" class="traffic-flow-2"/>
				<path d="M50,500 L200,480 L350,500 L500,480 L650,500 L800,480 L950,500" 
					  stroke="url(#trafficWave)" stroke-width="3" fill="none" class="traffic-flow-3"/>
				
				<!-- Intersection Nodes -->
				<g class="intersection-nodes">
					<circle cx="200" cy="300" r="8" fill="#3b82f6" opacity="0.8">
						<animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite"/>
					</circle>
					<circle cx="500" cy="400" r="8" fill="#10b981" opacity="0.8">
						<animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite"/>
					</circle>
					<circle cx="800" cy="500" r="8" fill="#f59e0b" opacity="0.8">
						<animate attributeName="r" values="6;10;6" dur="5s" repeatCount="indefinite"/>
					</circle>
				</g>
			</g>
			
			<!-- Moving Traffic Elements -->
			<g class="moving-traffic" opacity="0.5">
				<!-- Vehicle Animations -->
				<rect x="100" y="295" width="12" height="6" rx="1" fill="#3b82f6">
					<animateTransform attributeName="transform" type="translate" values="0,0; 400,0; 800,0" dur="6s" repeatCount="indefinite"/>
				</rect>
				<rect x="150" y="415" width="12" height="6" rx="1" fill="#10b981">
					<animateTransform attributeName="transform" type="translate" values="0,0; 300,0; 600,0" dur="8s" repeatCount="indefinite"/>
				</rect>
				<rect x="75" y="495" width="15" height="8" rx="1" fill="#f59e0b">
					<animateTransform attributeName="transform" type="translate" values="0,0; 500,0; 900,0" dur="10s" repeatCount="indefinite"/>
				</rect>
			</g>
			
			<!-- Traffic Monitoring Points -->
			<g class="monitoring-points" opacity="0.4">
				<rect x="295" y="295" width="8" height="8" fill="#8b5cf6">
					<animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
				</rect>
				<rect x="595" y="395" width="8" height="8" fill="#8b5cf6">
					<animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
				</rect>
			</g>
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

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-100/80 to-emerald-100/80 dark:from-blue-900/30 dark:to-emerald-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<BarChart3 class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">📊</span>
				{($locale || 'en') === 'ar' ? 'تحليل وتقييم شامل لحركة المرور لتحسين الكفاءة والسلامة' : 'Comprehensive Traffic Analysis and Assessment for Efficiency and Safety Improvement'}
			</div>
			
			<!-- Enhanced Title with Better Spacing -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} mb-12`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
					<span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'تقييم حركة المرور' : 'Traffic Assessment'}
					</span>
				</h1>
				<div class="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 animate-fade-in-delayed">
					{($locale || 'en') === 'ar' ? 'والتحليل المتقدم' : '& Advanced Analysis'}
				</div>
			</div>
			
			<!-- Enhanced Description with Better Spacing -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} space-y-6`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نقدم خدمات تقييم وتحليل حركة المرور المتخصصة باستخدام أحدث التقنيات والأساليب العلمية لفهم أنماط المرور وتحسين كفاءة الشبكة المرورية'
						: 'We provide specialized traffic assessment and analysis services using latest technologies and scientific methods to understand traffic patterns and improve network efficiency'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'خدماتنا تشمل التحليل الشامل لتدفق المرور، دراسات السلامة، تقييم التقاطعات، وتطوير حلول ذكية لتحسين الأداء المروري وتقليل الازدحام'
						: 'Our services include comprehensive traffic flow analysis, safety studies, intersection assessment, and smart solution development for traffic performance improvement and congestion reduction'
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
				{($locale || 'en') === 'ar' ? 'خدمات تقييم المرور المتخصصة' : 'Specialized Traffic Assessment Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم مجموعة شاملة من خدمات تقييم المرور لتحليل وتحسين أداء الشبكة المرورية'
					: 'We provide a comprehensive range of traffic assessment services to analyze and improve traffic network performance'
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
						/>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-amber-600/20 group-hover:from-blue-600/30 group-hover:via-emerald-600/30 group-hover:to-amber-600/30 transition-all duration-500"></div>
						
						<!-- Advanced Icon Overlay on Image -->
						<div class="absolute top-4 right-4">
							<div class={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
								<svelte:component this={feature.icon} class="w-6 h-6 text-white" />
							</div>
						</div>
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

<!-- Enhanced Assessment Types Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'أنواع تقييمات المرور' : 'Types of Traffic Assessments'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم تقييمات مرورية متخصصة لمختلف البيئات والاحتياجات' : 'We offer specialized traffic assessments for various environments and needs'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each assessmentTypes as assessment, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center gap-4 mb-6">
						<div class={`w-16 h-16 bg-gradient-to-br ${assessment.color} rounded-2xl flex items-center justify-center shadow-xl`}>
							<svelte:component this={assessment.icon} class="w-8 h-8 text-white" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? assessment.title : assessment.titleEn}
						</h3>
					</div>
					
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? assessment.description : assessment.descriptionEn}
					</p>
					
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? assessment.items : assessment.itemsEn) as item}
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
				{($locale || 'en') === 'ar' ? 'منهجية تقييم المرور' : 'Traffic Assessment Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية علمية متقدمة لضمان دقة وشمولية تقييمات المرور' : 'We follow an advanced scientific methodology to ensure accuracy and comprehensiveness of traffic assessments'}
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
						<div class="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-500 opacity-30 transform translate-x-4"></div>
					{/if}
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
<section id="benefits" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد تقييم المرور المتخصص' : 'Benefits of Professional Traffic Assessment'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لتقييمات المرور المتخصصة أن تحسن من كفاءة شبكتك المرورية' : 'Discover how professional traffic assessments can improve your traffic network efficiency'}
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
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={benefit.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-blue-600/20"></div>
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
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة لتقييم المرور' : 'Successful Traffic Assessment Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على تقييمات المرور الناجحة التي أجريناها لمشاريع مختلفة في المملكة'
					: 'Examples of successful traffic assessments we conducted for various projects in the Kingdom'
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
									{($locale || 'en') === 'ar' ? 'دراسة حالة متميزة' : 'Featured Case Study'}
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
					? '"التقييم المروري الذي أجرته الشركة لمنطقتنا الصناعية كان شاملاً ودقيقاً. النتائج والتوصيات ساعدتنا في تحسين كفاءة المرور بنسبة 45% وتقليل الحوادث بشكل كبير."'
					: '"The traffic assessment conducted by the company for our industrial zone was comprehensive and accurate. The results and recommendations helped us improve traffic efficiency by 45% and significantly reduce accidents."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">م. خالد الحربي</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'مدير النقل والمواصلات، مدينة الجبيل الصناعية' : 'Transport and Communications Manager, Jubail Industrial City'}
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
			{($locale || 'en') === 'ar' ? 'هل تحتاج إلى تقييم مروري متخصص؟' : 'Need a Professional Traffic Assessment?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في تحليل وتقييم شبكتك المرورية لتحسين الكفاءة والسلامة وتطوير حلول ذكية لمواجهة التحديات المرورية'
				: 'Let us help you analyze and assess your traffic network to improve efficiency and safety while developing smart solutions for traffic challenges'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ التقييم المروري' : 'Start Traffic Assessment'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/traffic-engineering" 
				class="inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف خدمات أخرى' : 'Explore Other Services'}
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

	/* Traffic specific animations */
	.traffic-flow-1 {
		stroke-dasharray: 20 10;
		animation: traffic-flow 8s linear infinite;
	}
	
	.traffic-flow-2 {
		stroke-dasharray: 15 8;
		animation: traffic-flow 10s linear infinite reverse;
	}
	
	.traffic-flow-3 {
		stroke-dasharray: 12 6;
		animation: traffic-flow 12s linear infinite;
	}
	
	@keyframes traffic-flow {
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