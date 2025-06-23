<!-- src/routes/traffic-engineering/traffic-modelling/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		Activity,
		BarChart3,
		Zap,
		Target,
		TrendingUp,
		Award,
		AlertTriangle,
		Database,
		Cpu,
		Network,
		Route,
		Navigation,
		Globe,
		Shield,
		CheckSquare,
		Building,
		Factory,
		Home,
		Hospital,
		Car,
		Truck,
		Bus,
		Settings,
		LineChart,
		PieChart,
		Layers,
		Search,
		Eye,
		Brain,
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
		particles = Array.from({ length: 60 }, (_, i) => ({
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
			icon: Activity,
			title: 'المحاكاة الدقيقة للحركة المرورية',
			titleEn: 'Precise Traffic Microsimulation',
			description: 'محاكاة مفصلة لحركة المركبات الفردية والتفاعلات المرورية باستخدام أحدث برامج المحاكاة مثل SUMO وAIMSUN وVISSIM',
			descriptionEn: 'Detailed simulation of individual vehicle movements and traffic interactions using latest simulation software like SUMO, AIMSUN, and VISSIM',
			color: 'from-blue-500 to-purple-600',
			image: '/images/features/microsimulation.jpg'
		},
		{
			icon: Network,
			title: 'نمذجة الشبكات المرورية الكبيرة',
			titleEn: 'Large-Scale Traffic Network Modelling',
			description: 'تطوير نماذج شاملة للشبكات المرورية الحضرية والإقليمية مع تحليل التدفقات والازدحام والتفاعلات المعقدة',
			descriptionEn: 'Developing comprehensive models for urban and regional traffic networks with flow, congestion, and complex interaction analysis',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/network-modelling.jpg'
		},
		{
			icon: TrendingUp,
			title: 'توقع الطلب المروري',
			titleEn: 'Traffic Demand Forecasting',
			description: 'تطوير نماذج متقدمة لتوقع الطلب المروري المستقبلي وتحليل تأثير التطوير الحضري والتغيرات الديموغرافية',
			descriptionEn: 'Developing advanced models for future traffic demand forecasting and analyzing urban development and demographic change impacts',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/demand-forecasting.jpg'
		},
		{
			icon: Target,
			title: 'تحسين أداء التقاطعات',
			titleEn: 'Junction Performance Optimization',
			description: 'تحليل وتحسين أداء التقاطعات المرورية باستخدام النمذجة المتقدمة لتقليل أوقات الانتظار وزيادة السعة',
			descriptionEn: 'Analyzing and optimizing traffic junction performance using advanced modelling to reduce waiting times and increase capacity',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/junction-optimization.jpg'
		},
		{
			icon: BarChart3,
			title: 'تحليل البيانات المرورية',
			titleEn: 'Traffic Data Analysis',
			description: 'معالجة وتحليل البيانات المرورية الضخمة من أجهزة الاستشعار والكاميرات لفهم أنماط الحركة واتجاهاتها',
			descriptionEn: 'Processing and analyzing big traffic data from sensors and cameras to understand movement patterns and trends',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/data-analysis.jpg'
		},
		{
			icon: Gauge,
			title: 'معايرة والتحقق من النماذج',
			titleEn: 'Model Calibration & Validation',
			description: 'معايرة دقيقة للنماذج المرورية باستخدام البيانات الحقيقية والتحقق من دقة النتائج والتنبؤات',
			descriptionEn: 'Precise calibration of traffic models using real data and validation of results and prediction accuracy',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/model-calibration.jpg'
		}
	];

	const modellingTypes = [
		{
			title: 'النمذجة الدقيقة (Microsimulation)',
			titleEn: 'Microsimulation Modelling',
			description: 'محاكاة تفصيلية لحركة كل مركبة على حدة',
			descriptionEn: 'Detailed simulation of individual vehicle movements',
			items: [
				'سلوك القائد والمركبة',
				'التفاعلات بين المركبات',
				'محاكاة التقاطعات المعقدة',
				'تحليل التصادمات المحتملة'
			],
			itemsEn: [
				'Driver and vehicle behavior',
				'Inter-vehicle interactions',
				'Complex junction simulation',
				'Potential collision analysis'
			],
			icon: Eye,
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'النمذجة المتوسطة (Mesoscopic)',
			titleEn: 'Mesoscopic Modelling',
			description: 'توازن بين التفاصيل وسرعة المعالجة للشبكات الكبيرة',
			descriptionEn: 'Balance between detail and processing speed for large networks',
			items: [
				'مجموعات المركبات',
				'الشبكات الإقليمية',
				'تحليل الكفاءة',
				'التخطيط طويل المدى'
			],
			itemsEn: [
				'Vehicle groups',
				'Regional networks',
				'Efficiency analysis',
				'Long-term planning'
			],
			icon: Network,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'النمذجة الكلية (Macroscopic)',
			titleEn: 'Macroscopic Modelling',
			description: 'تحليل التدفقات على مستوى الشبكة الكاملة',
			descriptionEn: 'Flow analysis at complete network level',
			items: [
				'تدفقات الشبكة',
				'التخطيط الاستراتيجي',
				'تحليل السيناريوهات',
				'التقييم الاقتصادي'
			],
			itemsEn: [
				'Network flows',
				'Strategic planning',
				'Scenario analysis',
				'Economic evaluation'
			],
			icon: Globe,
			color: 'from-purple-500 to-amber-600'
		}
	];

	const benefits = [
		{
			title: 'تحسين كفاءة الشبكة المرورية',
			titleEn: 'Traffic Network Efficiency Improvement',
			description: 'تساعد النماذج المرورية في تحديد نقاط الازدحام وتطوير حلول فعالة لتحسين تدفق المرور وتقليل أوقات السفر مع زيادة السعة التشغيلية',
			descriptionEn: 'Traffic models help identify congestion points and develop effective solutions to improve traffic flow, reduce travel times, and increase operational capacity',
			image: '/images/benefits/network-efficiency.jpg',
			icon: Zap,
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'دعم اتخاذ القرارات المبنية على البيانات',
			titleEn: 'Data-Driven Decision Making Support',
			description: 'توفر النماذج المرورية أساساً علمياً قوياً لاتخاذ قرارات التخطيط والاستثمار في البنية التحتية مع تقليل المخاطر وزيادة العائد على الاستثمار',
			descriptionEn: 'Traffic models provide strong scientific foundation for planning and infrastructure investment decisions while reducing risks and increasing return on investment',
			image: '/images/benefits/data-driven-decisions.jpg',
			icon: Brain,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'تقليل التكاليف وتوفير الوقت',
			titleEn: 'Cost Reduction & Time Savings',
			description: 'تتيح النمذجة اختبار سيناريوهات متعددة افتراضياً قبل التنفيذ الفعلي مما يوفر تكاليف هائلة ويقلل من المخاطر والأخطاء في التصميم',
			descriptionEn: 'Modelling enables testing multiple scenarios virtually before actual implementation, saving huge costs and reducing design risks and errors',
			image: '/images/benefits/cost-time-savings.jpg',
			icon: Target,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const caseStudies = [
		{
			title: 'نمذجة شبكة مرور مدينة الرياض الكبرى',
			titleEn: 'Greater Riyadh Traffic Network Modelling',
			description: 'تطوير نموذج مروري شامل لمدينة الرياض يغطي 2,000 كم من الطرق مع محاكاة 2.5 مليون رحلة يومية وتحليل تأثير مشروع قطار الرياض على الشبكة المرورية',
			descriptionEn: 'Comprehensive traffic model development for Riyadh city covering 2,000 km of roads with simulation of 2.5 million daily trips and analysis of Riyadh Metro project impact on traffic network',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			duration: '18 شهر',
			durationEn: '18 months',
			team: '20 متخصص',
			teamEn: '20 specialists',
			image: '/images/case-studies/riyadh-traffic-model.jpg',
			icon: Globe,
			challenges: [
				'شبكة معقدة ومتنامية',
				'تكامل مع مشروع القطار',
				'بيانات متنوعة ومتعددة',
				'سيناريوهات مستقبلية متعددة'
			],
			challengesEn: [
				'Complex growing network',
				'Metro project integration',
				'Diverse multiple data sources',
				'Multiple future scenarios'
			],
			outcomes: [
				'تحسين 35% في كفاءة الشبكة',
				'تقليل 25% في أوقات السفر',
				'نموذج معاير بدقة 95%',
				'توفير 50 مليون ريال في التخطيط'
			],
			outcomesEn: [
				'35% improvement in network efficiency',
				'25% reduction in travel times',
				'95% accuracy calibrated model',
				'50 million SAR planning savings'
			],
			stats: { roads: '2,000 km', trips: '2.5M/day', accuracy: '95%' }
		},
		{
			title: 'محاكاة تقاطع الملك فهد الرئيسي - جدة',
			titleEn: 'King Fahd Main Junction Microsimulation - Jeddah',
			description: 'محاكاة دقيقة لأحد أكثر التقاطعات ازدحاماً في جدة مع تطوير حلول تحسين متقدمة تشمل إشارات ذكية وتصميم هندسي محسّن لخدمة 150,000 مركبة يومياً',
			descriptionEn: 'Precise microsimulation of one of Jeddah\'s busiest junctions with advanced improvement solutions including smart signals and enhanced geometric design serving 150,000 vehicles daily',
			location: 'وسط جدة، المملكة العربية السعودية',
			locationEn: 'Central Jeddah, Saudi Arabia',
			duration: '8 أشهر',
			durationEn: '8 months',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/jeddah-junction-simulation.jpg',
			icon: Activity,
			challenges: [
				'ازدحام شديد متعدد الاتجاهات',
				'أنماط مرور معقدة',
				'قيود المساحة للتوسع',
				'تكامل مع الشبكة المحيطة'
			],
			challengesEn: [
				'Severe multi-directional congestion',
				'Complex traffic patterns',
				'Space constraints for expansion',
				'Integration with surrounding network'
			],
			outcomes: [
				'تقليل 45% في أوقات الانتظار',
				'زيادة 30% في السعة التشغيلية',
				'تحسين السلامة بنسبة 40%',
				'نظام إشارات ذكي متكيف'
			],
			outcomesEn: [
				'45% reduction in waiting times',
				'30% increase in operational capacity',
				'40% safety improvement',
				'Adaptive smart signal system'
			],
			stats: { vehicles: '150K/day', delay: '-45%', capacity: '+30%' }
		},
		{
			title: 'نمذجة منطقة صناعية متكاملة - الدمام',
			titleEn: 'Integrated Industrial Zone Modelling - Dammam',
			description: 'تطوير نموذج مروري متخصص للمنطقة الصناعية يأخذ في الاعتبار حركة الشاحنات الثقيلة والنقل الصناعي مع تحليل التأثير على الشبكة المدنية المجاورة',
			descriptionEn: 'Specialized traffic model development for industrial zone considering heavy truck movements and industrial transport with analysis of impact on adjacent civilian network',
			location: 'المنطقة الصناعية الثانية، الدمام',
			locationEn: 'Second Industrial City, Dammam',
			duration: '12 شهر',
			durationEn: '12 months',
			team: '15 متخصص',
			teamEn: '15 specialists',
			image: '/images/case-studies/dammam-industrial-model.jpg',
			icon: Factory,
			challenges: [
				'حركة شاحنات كثيفة ومعقدة',
				'تفاعل مع المرور المدني',
				'نوبات عمل متعددة',
				'متطلبات أمنية خاصة'
			],
			challengesEn: [
				'Dense complex truck movements',
				'Interaction with civilian traffic',
				'Multiple work shifts',
				'Special security requirements'
			],
			outcomes: [
				'تحسين تدفق الشاحنات 50%',
				'تقليل التأثير على المرور المدني',
				'تحسين السلامة الصناعية',
				'خطة توزيع زمني محسّنة'
			],
			outcomesEn: [
				'50% improvement in truck flow',
				'Reduced impact on civilian traffic',
				'Enhanced industrial safety',
				'Optimized temporal distribution plan'
			],
			stats: { trucks: '25K/day', companies: '50+', improvement: '50%' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'جمع البيانات والتحليل الأولي',
			titleEn: 'Data Collection & Initial Analysis',
			description: 'جمع وتحليل البيانات المرورية من مصادر متعددة وإجراء مسوحات ميدانية شاملة لفهم الوضع الحالي',
			descriptionEn: 'Collecting and analyzing traffic data from multiple sources and conducting comprehensive field surveys to understand current situation',
			icon: Database,
			color: 'from-blue-500 to-purple-600'
		},
		{
			step: '02',
			title: 'تطوير وبناء النموذج',
			titleEn: 'Model Development & Construction',
			description: 'بناء النموذج المروري باستخدام أحدث البرامج والتقنيات مع تمثيل دقيق للشبكة والسلوكيات',
			descriptionEn: 'Building traffic model using latest software and technologies with accurate network and behavior representation',
			icon: Cpu,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			step: '03',
			title: 'المعايرة والتحقق',
			titleEn: 'Calibration & Validation',
			description: 'معايرة النموذج باستخدام البيانات الحقيقية والتحقق من دقة النتائج ومطابقتها للواقع',
			descriptionEn: 'Model calibration using real data and validation of result accuracy and reality matching',
			icon: Gauge,
			color: 'from-emerald-500 to-amber-600'
		},
		{
			step: '04',
			title: 'التحليل وتطبيق السيناريوهات',
			titleEn: 'Analysis & Scenario Application',
			description: 'تطبيق سيناريوهات متعددة وتحليل النتائج لتقديم التوصيات والحلول المثلى',
			descriptionEn: 'Applying multiple scenarios and analyzing results to provide optimal recommendations and solutions',
			icon: Settings,
			color: 'from-amber-500 to-blue-600'
		}
	];

	const stats = [
		{
			value: '200+',
			label: 'مشروع نمذجة مكتمل',
			labelEn: 'Completed Modelling Projects',
			icon: Activity,
			color: 'from-blue-500 to-purple-600'
		},
		{
			value: '97%',
			label: 'دقة النماذج المعايرة',
			labelEn: 'Calibrated Model Accuracy',
			icon: Gauge,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '15M+',
			label: 'مركبة في النماذج',
			labelEn: 'Vehicles in Models',
			icon: Car,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '40%',
			label: 'متوسط تحسين الكفاءة',
			labelEn: 'Average Efficiency Improvement',
			icon: TrendingUp,
			color: 'from-amber-500 to-purple-600'
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
	<title>{($locale || 'en') === 'ar' ? 'نمذجة حركة المرور' : 'Traffic Modelling'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات نمذجة حركة المرور المتقدمة والمحاكاة لتحليل وتحسين الشبكات المرورية' : 'Advanced traffic modelling and simulation services for analyzing and optimizing traffic networks'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Advanced Traffic Flow SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="trafficGrid" width="40" height="40" patternUnits="userSpaceOnUse">
					<circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="0.5;2;0.5" dur="3s" repeatCount="indefinite"/>
					</circle>
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.2"/>
				</pattern>
				<linearGradient id="trafficWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#trafficGrid)" />
			
			<!-- Traffic Flow Network -->
			<g class="traffic-network" opacity="0.7">
				<!-- Main Arterials -->
				<path d="M0,200 Q200,180 400,200 Q600,220 800,200 Q1000,180 1200,200" 
					  stroke="url(#trafficWave)" stroke-width="6" fill="none" class="traffic-flow-1"/>
				<path d="M0,400 Q200,380 400,400 Q600,420 800,400 Q1000,380 1200,400" 
					  stroke="url(#trafficWave)" stroke-width="5" fill="none" class="traffic-flow-2"/>
				<path d="M0,600 Q200,580 400,600 Q600,620 800,600 Q1000,580 1200,600" 
					  stroke="url(#trafficWave)" stroke-width="4" fill="none" class="traffic-flow-3"/>
				
				<!-- Connecting Roads -->
				<path d="M200,180 Q250,300 300,420 Q350,540 400,580" 
					  stroke="url(#trafficWave)" stroke-width="3" fill="none" class="connector-1"/>
				<path d="M600,220 Q650,300 700,380 Q750,460 800,580" 
					  stroke="url(#trafficWave)" stroke-width="3" fill="none" class="connector-2"/>
				
				<!-- Traffic Nodes/Junctions -->
				<g class="traffic-nodes">
					<circle cx="200" cy="200" r="8" fill="#3b82f6" opacity="0.8">
						<animate attributeName="r" values="6;12;6" dur="4s" repeatCount="indefinite"/>
					</circle>
					<circle cx="400" cy="400" r="8" fill="#8b5cf6" opacity="0.8">
						<animate attributeName="r" values="6;12;6" dur="5s" repeatCount="indefinite"/>
					</circle>
					<circle cx="800" cy="600" r="8" fill="#10b981" opacity="0.8">
						<animate attributeName="r" values="6;12;6" dur="6s" repeatCount="indefinite"/>
					</circle>
				</g>
			</g>
			
			<!-- Moving Vehicles -->
			<g class="moving-vehicles" opacity="0.6">
				<!-- Vehicle 1 -->
				<rect x="50" y="195" width="12" height="6" rx="1" fill="#3b82f6">
					<animateTransform attributeName="transform" type="translate" values="0,0; 400,0; 800,0; 1200,0" dur="10s" repeatCount="indefinite"/>
				</rect>
				<!-- Vehicle 2 -->
				<rect x="100" y="395" width="12" height="6" rx="1" fill="#8b5cf6">
					<animateTransform attributeName="transform" type="translate" values="0,0; 350,0; 700,0; 1050,0" dur="12s" repeatCount="indefinite"/>
				</rect>
				<!-- Vehicle 3 -->
				<rect x="150" y="595" width="12" height="6" rx="1" fill="#10b981">
					<animateTransform attributeName="transform" type="translate" values="0,0; 300,0; 600,0; 900,0" dur="8s" repeatCount="indefinite"/>
				</rect>
			</g>
			
			<!-- Data Visualization Elements -->
			<g class="data-viz" opacity="0.4">
				<rect x="900" y="100" width="80" height="50" rx="5" fill="none" stroke="#3b82f6" stroke-width="1">
					<animate attributeName="height" values="40;60;40" dur="3s" repeatCount="indefinite"/>
				</rect>
				<text x="940" y="85" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">Analytics</text>
			</g>
		</svg>
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-float-particle"
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
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Activity class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🚗</span>
				{($locale || 'en') === 'ar' ? 'خدمات نمذجة حركة المرور المتقدمة والمحاكاة لتحليل وتحسين الشبكات المرورية' : 'Advanced Traffic Modelling and Simulation Services for Network Analysis and Optimization'}
			</div>
			
			<!-- Enhanced Title with Better Spacing -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} mb-12`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
					<span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'نمذجة حركة المرور' : 'Traffic Modelling'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'والمحاكاة المتقدمة' : '& Advanced Simulation'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description with Better Spacing -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} space-y-6`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نقدم خدمات نمذجة حركة المرور المتقدمة والمحاكاة لتحليل وتحسين الشبكات المرورية باستخدام أحدث التقنيات والبرامج المتخصصة'
						: 'We provide advanced traffic modelling and simulation services for analyzing and optimizing traffic networks using latest technologies and specialized software'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'خدماتنا تشمل المحاكاة الدقيقة للحركة المرورية وتطوير نماذج تنبؤية متقدمة لدعم اتخاذ القرارات التخطيطية والاستثمارية'
						: 'Our services include precise traffic microsimulation and advanced predictive model development to support planning and investment decision making'
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
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات نمذجة المرور المتخصصة' : 'Specialized Traffic Modelling Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم مجموعة شاملة من خدمات النمذجة المرورية لتلبية احتياجات التخطيط والتحليل المختلفة'
					: 'We provide a comprehensive range of traffic modelling services to meet various planning and analysis needs'
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
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20 group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-emerald-600/30 transition-all duration-500"></div>
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

<!-- Enhanced Modelling Types Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'أنواع النمذجة المرورية' : 'Traffic Modelling Types'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نستخدم أنواعاً مختلفة من النمذجة حسب نطاق المشروع ومتطلبات التحليل' : 'We use different types of modelling based on project scope and analysis requirements'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each modellingTypes as type, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center gap-4 mb-6">
						<div class={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center shadow-xl`}>
							<svelte:component this={type.icon} class="w-8 h-8 text-white" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? type.title : type.titleEn}
						</h3>
					</div>
					
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? type.description : type.descriptionEn}
					</p>
					
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? type.items : type.itemsEn) as item}
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
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'منهجية النمذجة المرورية' : 'Traffic Modelling Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية علمية متقدمة لضمان دقة ومصداقية النماذج المرورية المطورة' : 'We follow an advanced scientific methodology to ensure accuracy and reliability of developed traffic models'}
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
						<div class="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 transform translate-x-4"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
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
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد النمذجة المرورية المتقدمة' : 'Benefits of Advanced Traffic Modelling'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن للنمذجة المرورية أن تحدث فرقاً جوهرياً في مشاريعك' : 'Discover how traffic modelling can make a fundamental difference in your projects'}
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
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={benefit.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20"></div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة للنمذجة المرورية' : 'Successful Traffic Modelling Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريع النمذجة المرورية المتقدمة التي نفذناها بنجاح في مدن مختلفة'
					: 'Examples of advanced traffic modelling projects we successfully implemented in various cities'
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
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-200 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
									<svelte:component this={study.icon} class="w-10 h-10 text-white" />
								</div>
								<div class="text-blue-600 dark:text-blue-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'دراسة حالة متميزة' : 'Featured Case Study'}
								</div>
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20"></div>
						
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
							<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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
							<div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
								<Clock class="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.duration : study.durationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
								<Users class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
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
<section class="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
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
					? '"النموذج المروري الذي طورتموه لمدينتنا كان دقيقاً بشكل مذهل. ساعدنا في توفير 50 مليون ريال في استثمارات البنية التحتية وحسّن كفاءة الشبكة بنسبة 35%. عمل احترافي ومتميز."'
					: '"The traffic model you developed for our city was amazingly accurate. It helped us save 50 million SAR in infrastructure investments and improved network efficiency by 35%. Professional and outstanding work."'
				}
			</blockquote>
			<div class="text-blue-100">
				<div class="font-bold text-lg">م. عبدالله السعيد</div>
				<div class="text-blue-200">
					{($locale || 'en') === 'ar' ? 'مدير إدارة النقل، أمانة منطقة الرياض' : 'Transport Department Director, Riyadh Municipality'}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل أنت مستعد لتطوير نموذج مروري متقدم؟' : 'Ready to Develop an Advanced Traffic Model?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في تطوير نماذج مرورية دقيقة ومتقدمة تدعم اتخاذ قراراتك التخطيطية وتحسن كفاءة شبكتك المرورية'
				: 'Let us help you develop accurate advanced traffic models that support your planning decisions and improve your traffic network efficiency'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ مشروع النمذجة' : 'Start Modelling Project'}
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

	/* Traffic flow specific animations */
	.traffic-flow-1 {
		stroke-dasharray: 30 15;
		animation: traffic-flow 12s linear infinite;
	}
	
	.traffic-flow-2 {
		stroke-dasharray: 25 12;
		animation: traffic-flow 15s linear infinite reverse;
	}
	
	.traffic-flow-3 {
		stroke-dasharray: 20 10;
		animation: traffic-flow 18s linear infinite;
	}
	
	.connector-1 {
		stroke-dasharray: 15 8;
		animation: traffic-flow 10s linear infinite;
	}
	
	.connector-2 {
		stroke-dasharray: 15 8;
		animation: traffic-flow 14s linear infinite reverse;
	}
	
	@keyframes traffic-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -150; }
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