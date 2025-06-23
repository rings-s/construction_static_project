<!-- src/routes/transport-planning/travel-plan-development/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		Bus,
		Bike,
		Car,
		Leaf,
		BarChart3,
		Target,
		TrendingDown,
		Award,
		Zap,
		AlertTriangle,
		Activity,
		BookOpen,
		Scale,
		MessageSquare,
		TrendingUp,
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
		Navigation,
		Heart,
		DollarSign
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
			icon: Users,
			title: 'مسوحات السفر الشاملة',
			titleEn: 'Comprehensive Travel Surveys',
			description: 'إجراء مسوحات مفصلة لأنماط السفر والتنقل للموظفين والزوار لفهم الاحتياجات الحالية وتحديد الفرص للتحسين',
			descriptionEn: 'Conducting detailed travel pattern surveys for employees and visitors to understand current mobility needs and identify improvement opportunities',
			color: 'from-blue-500 to-emerald-600',
			image: '/images/features/travel-surveys.jpg'
		},
		{
			icon: Leaf,
			title: 'خطط النقل المستدامة',
			titleEn: 'Sustainable Transport Plans',
			description: 'تطوير استراتيجيات نقل مستدامة تقلل من الاعتماد على المركبات الخاصة وتعزز البدائل الخضراء والصديقة للبيئة',
			descriptionEn: 'Developing sustainable transport strategies that reduce private vehicle dependency and promote green eco-friendly alternatives',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/sustainable-transport.jpg'
		},
		{
			icon: BarChart3,
			title: 'تحليل البيانات المتقدم',
			titleEn: 'Advanced Data Analysis',
			description: 'استخدام تقنيات التحليل المتقدمة والذكاء الاصطناعي لفهم أنماط التنقل وتحديد الحلول الأمثل للتحسين',
			descriptionEn: 'Using advanced analytical techniques and AI to understand mobility patterns and identify optimal solutions for improvement',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/data-analysis.jpg'
		},
		{
			icon: Target,
			title: 'وضع الأهداف القابلة للقياس',
			titleEn: 'Measurable Goal Setting',
			description: 'تحديد أهداف واقعية وقابلة للقياس لتقليل السفر بالمركبات الفردية وزيادة استخدام وسائل النقل البديلة',
			descriptionEn: 'Setting realistic and measurable goals for reducing single-occupancy vehicle trips and increasing alternative transport mode usage',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/goal-setting.jpg'
		},
		{
			icon: Bus,
			title: 'تطوير خدمات النقل العام',
			titleEn: 'Public Transport Development',
			description: 'تصميم وتحسين خدمات النقل العام والمكوكية لخدمة المواقع والمرافق بكفاءة عالية وراحة للمستخدمين',
			descriptionEn: 'Designing and improving public transport and shuttle services to efficiently serve sites and facilities with high user comfort',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/public-transport.jpg'
		},
		{
			icon: Bike,
			title: 'تعزيز النقل النشط',
			titleEn: 'Active Transport Promotion',
			description: 'تطوير برامج وبنية تحتية لتشجيع المشي وركوب الدراجات كوسائل نقل يومية صحية ومستدامة',
			descriptionEn: 'Developing programs and infrastructure to encourage walking and cycling as healthy sustainable daily transport modes',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/active-transport.jpg'
		}
	];

	const planTypes = [
		{
			title: 'خطط السفر للمؤسسات الكبيرة',
			titleEn: 'Large Organization Travel Plans',
			description: 'خطط مخصصة للشركات والمؤسسات الحكومية الكبيرة',
			descriptionEn: 'Tailored plans for large companies and government institutions',
			items: [
				'تحليل أنماط تنقل الموظفين',
				'برامج الحوافز للنقل المستدام',
				'خدمات النقل المكوكية',
				'مرافق ركوب الدراجات'
			],
			itemsEn: [
				'Employee commuting pattern analysis',
				'Sustainable transport incentive programs',
				'Shuttle transport services',
				'Cycling facilities'
			],
			icon: Building,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'خطط التنقل للمرافق التعليمية',
			titleEn: 'Educational Facility Mobility Plans',
			description: 'حلول متكاملة للجامعات والمدارس والمعاهد',
			descriptionEn: 'Integrated solutions for universities, schools, and institutes',
			items: [
				'إدارة النقل الطلابي',
				'مسارات المشي الآمنة',
				'مواقف الدراجات المحمية',
				'تنسيق مع النقل العام'
			],
			itemsEn: [
				'Student transport management',
				'Safe walking pathways',
				'Protected bicycle parking',
				'Public transport coordination'
			],
			icon: Hospital,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			title: 'خطط النقل للمجمعات التجارية',
			titleEn: 'Commercial Complex Transport Plans',
			description: 'استراتيجيات شاملة للمراكز التجارية والمكتبية',
			descriptionEn: 'Comprehensive strategies for shopping centers and office complexes',
			items: [
				'إدارة ذروة الزوار',
				'مواقف ذكية متدرجة',
				'خدمات التوصيل الأخضر',
				'تكامل مع وسائل النقل'
			],
			itemsEn: [
				'Visitor peak management',
				'Smart tiered parking',
				'Green delivery services',
				'Transport mode integration'
			],
			icon: Factory,
			color: 'from-purple-500 to-amber-600'
		}
	];

	const benefits = [
		{
			title: 'تقليل التأثير البيئي والاستدامة',
			titleEn: 'Environmental Impact Reduction & Sustainability',
			description: 'تساهم خطط السفر في تقليل الازدحام المروري والانبعاثات الضارة مع تعزيز الاستدامة البيئية وتحسين جودة الهواء في المناطق الحضرية',
			descriptionEn: 'Travel plans contribute to reducing traffic congestion and harmful emissions while promoting environmental sustainability and improving air quality in urban areas',
			image: '/images/benefits/environmental-impact.jpg',
			icon: Leaf,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'توفير التكاليف وزيادة الكفاءة',
			titleEn: 'Cost Savings & Increased Efficiency',
			description: 'تؤدي خطط السفر إلى توفير كبير في تكاليف التنقل للموظفين والمؤسسات مع زيادة الكفاءة التشغيلية وتقليل الحاجة لمساحات الوقوف',
			descriptionEn: 'Travel plans result in significant savings in commuting costs for employees and organizations while increasing operational efficiency and reducing parking space requirements',
			image: '/images/benefits/cost-savings.jpg',
			icon: DollarSign,
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'تحسين الصحة والرفاهية',
			titleEn: 'Health & Wellbeing Improvement',
			description: 'تعزز خطط السفر النشط صحة ورفاهية الموظفين من خلال تشجيع المشي وركوب الدراجات مع تقليل التوتر المرتبط بقيادة السيارات',
			descriptionEn: 'Active travel plans promote employee health and wellbeing by encouraging walking and cycling while reducing stress associated with car driving',
			image: '/images/benefits/health-wellbeing.jpg',
			icon: Heart,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const caseStudies = [
		{
			title: 'خطة السفر للمجمع الطبي الشامل - الرياض',
			titleEn: 'Comprehensive Medical Complex Travel Plan - Riyadh',
			description: 'تطوير خطة سفر متكاملة لمجمع طبي يضم 6,000 موظف و15,000 زائر يومياً مع تحقيق تقليل 45% من رحلات المركبات الفردية وتحسين إمكانية الوصول للجميع',
			descriptionEn: 'Integrated travel plan development for medical complex with 6,000 employees and 15,000 daily visitors achieving 45% reduction in single-occupancy vehicle trips and improved accessibility for all',
			location: 'شمال الرياض، المملكة العربية السعودية',
			locationEn: 'North Riyadh, Saudi Arabia',
			duration: '10 أشهر',
			durationEn: '10 months',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/medical-complex-travel-plan.jpg',
			icon: Hospital,
			challenges: [
				'عمليات على مدار الساعة',
				'أنماط زيارة متعددة ومعقدة',
				'متطلبات وصول الطوارئ',
				'مساحة محدودة للتوسع'
			],
			challengesEn: [
				'24/7 operations',
				'Multiple complex visit patterns',
				'Emergency access requirements',
				'Limited expansion space'
			],
			outcomes: [
				'تقليل 45% من المركبات الفردية',
				'زيادة 300% في استخدام النقل العام',
				'توفير 2.5 مليون ريال سنوياً',
				'تحسين رضا الموظفين بنسبة 85%'
			],
			outcomesEn: [
				'45% reduction in single-occupancy vehicles',
				'300% increase in public transport usage',
				'2.5 million SAR annual savings',
				'85% improvement in employee satisfaction'
			],
			stats: { employees: '6,000', visitors: '15K/day', reduction: '45%' }
		},
		{
			title: 'خطة التنقل المستدام للجامعة - جدة',
			titleEn: 'Sustainable University Mobility Plan - Jeddah',
			description: 'خطة تنقل شاملة لجامعة كبيرة تضم 30,000 طالب و5,000 موظف مع نظام حافلات ذكي ومسارات دراجات آمنة وبرامج تحفيزية مبتكرة',
			descriptionEn: 'Comprehensive mobility plan for large university with 30,000 students and 5,000 staff featuring smart bus system, safe cycling paths, and innovative incentive programs',
			location: 'شرق جدة، المملكة العربية السعودية',
			locationEn: 'East Jeddah, Saudi Arabia',
			duration: '14 شهر',
			durationEn: '14 months',
			team: '15 متخصص',
			teamEn: '15 specialists',
			image: '/images/case-studies/university-mobility-plan.jpg',
			icon: Building,
			challenges: [
				'تدفقات كبيرة في أوقات محددة',
				'تنوع أنماط التنقل',
				'قيود الميزانية',
				'تكامل مع النقل العام'
			],
			challengesEn: [
				'Large flows at specific times',
				'Diverse mobility patterns',
				'Budget constraints',
				'Public transport integration'
			],
			outcomes: [
				'نظام حافلات ذكي يخدم 85% من الطلاب',
				'مسارات دراجات بطول 25 كم',
				'تقليل 50% من استخدام السيارات',
				'توفير 3 مليون ريال في البنية التحتية'
			],
			outcomesEn: [
				'Smart bus system serving 85% of students',
				'25 km cycling network',
				'50% reduction in car usage',
				'3 million SAR infrastructure savings'
			],
			stats: { students: '30,000', staff: '5,000', cycling: '25 km' }
		},
		{
			title: 'خطة سفر المنطقة الصناعية المتكاملة - الدمام',
			titleEn: 'Integrated Industrial Zone Travel Plan - Dammam',
			description: 'تطوير خطة سفر شاملة للمنطقة الصناعية الكبيرة تخدم 20 شركة مع 12,000 موظف ونظام نقل مشترك متطور وحلول مرونة في أوقات العمل',
			descriptionEn: 'Comprehensive travel plan development for large industrial zone serving 20 companies with 12,000 employees featuring advanced shared transport system and flexible working time solutions',
			location: 'المنطقة الصناعية الثانية، الدمام',
			locationEn: 'Second Industrial City, Dammam',
			duration: '12 شهر',
			durationEn: '12 months',
			team: '10 متخصصين',
			teamEn: '10 specialists',
			image: '/images/case-studies/industrial-zone-travel-plan.jpg',
			icon: Factory,
			challenges: [
				'تنسيق بين شركات متعددة',
				'نوبات عمل مختلفة',
				'مسافات طويلة للسكن',
				'تحديات الأمان والحماية'
			],
			challengesEn: [
				'Multi-company coordination',
				'Different work shifts',
				'Long residential distances',
				'Safety and security challenges'
			],
			outcomes: [
				'نظام نقل مشترك يخدم 75% من الموظفين',
				'تقليل 40% من السيارات الفردية',
				'برامج مرونة في العمل',
				'توفير 5 مليون ريال سنوياً للشركات'
			],
			outcomesEn: [
				'Shared transport system serving 75% of employees',
				'40% reduction in individual cars',
				'Flexible working programs',
				'5 million SAR annual savings for companies'
			],
			stats: { companies: '20', employees: '12,000', savings: '5M SAR' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'التحليل والمسح الشامل',
			titleEn: 'Comprehensive Analysis & Survey',
			description: 'إجراء مسوحات تفصيلية لأنماط السفر الحالية وتحليل البيانات وتحديد التحديات والفرص للتحسين',
			descriptionEn: 'Conducting detailed surveys of current travel patterns, data analysis, and identifying challenges and improvement opportunities',
			icon: BarChart3,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			step: '02',
			title: 'تطوير الاستراتيجيات والحلول',
			titleEn: 'Strategy & Solution Development',
			description: 'تصميم استراتيجيات مخصصة للموقع مع تحديد البدائل المناسبة والأهداف الواقعية القابلة للقياس',
			descriptionEn: 'Designing site-specific strategies with identification of suitable alternatives and realistic measurable targets',
			icon: Target,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			step: '03',
			title: 'إعداد خطة التنفيذ التفصيلية',
			titleEn: 'Detailed Implementation Planning',
			description: 'وضع خطة تنفيذ شاملة مع الجداول الزمنية والموارد المطلوبة والمسؤوليات وخطط الطوارئ',
			descriptionEn: 'Developing comprehensive implementation plan with timelines, required resources, responsibilities, and contingency plans',
			icon: CheckSquare,
			color: 'from-purple-500 to-amber-600'
		},
		{
			step: '04',
			title: 'المراقبة والتقييم المستمر',
			titleEn: 'Continuous Monitoring & Evaluation',
			description: 'تطبيق نظام مراقبة متقدم لقياس الأداء وتقييم النتائج وإجراء التحسينات المستمرة',
			descriptionEn: 'Implementing advanced monitoring system to measure performance, evaluate results, and make continuous improvements',
			icon: Activity,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const stats = [
		{
			value: '85+',
			label: 'خطة سفر مطورة',
			labelEn: 'Travel Plans Developed',
			icon: Route,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '42%',
			label: 'متوسط تقليل المركبات الفردية',
			labelEn: 'Average Single-Vehicle Reduction',
			icon: TrendingDown,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '280K+',
			label: 'مستفيد من الخطط',
			labelEn: 'Plan Beneficiaries',
			icon: Users,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '95%',
			label: 'معدل تحقيق الأهداف',
			labelEn: 'Target Achievement Rate',
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
	<title>{($locale || 'en') === 'ar' ? 'تطوير خطط السفر' : 'Travel Plan Development'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'تصميم استراتيجيات تنقل مستدامة وذكية للمؤسسات والمرافق لتقليل التأثير المروري' : 'Designing sustainable and smart mobility strategies for organizations and facilities to reduce traffic impact'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Advanced Mobility Network SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="mobilityGrid" width="60" height="60" patternUnits="userSpaceOnUse">
					<circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="mobilityWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#22c55e;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#mobilityGrid)" />
			
			<!-- Mobility Network Lines -->
			<g class="mobility-network" opacity="0.6">
				<!-- Bus Routes -->
				<path d="M50,200 Q200,150 350,200 Q500,250 650,200 Q800,150 950,200" 
					  stroke="url(#mobilityWave)" stroke-width="4" fill="none" class="mobility-line-1"/>
				<!-- Cycling Paths -->
				<path d="M100,400 Q250,350 400,400 Q550,450 700,400 Q850,350 1000,400" 
					  stroke="url(#mobilityWave)" stroke-width="3" fill="none" class="mobility-line-2"/>
				<!-- Walking Paths -->
				<path d="M150,600 Q300,550 450,600 Q600,650 750,600 Q900,550 1050,600" 
					  stroke="url(#mobilityWave)" stroke-width="2" fill="none" class="mobility-line-3"/>
				
				<!-- Transport Nodes -->
				<g class="transport-nodes">
					<!-- Bus Stops -->
					<rect x="195" y="195" width="10" height="10" rx="2" fill="#3b82f6" opacity="0.8">
						<animate attributeName="width" values="8;12;8" dur="3s" repeatCount="indefinite"/>
						<animate attributeName="height" values="8;12;8" dur="3s" repeatCount="indefinite"/>
					</rect>
					<rect x="645" y="195" width="10" height="10" rx="2" fill="#3b82f6" opacity="0.8">
						<animate attributeName="width" values="8;12;8" dur="4s" repeatCount="indefinite"/>
						<animate attributeName="height" values="8;12;8" dur="4s" repeatCount="indefinite"/>
					</rect>
					
					<!-- Bike Stations -->
					<circle cx="250" cy="400" r="6" fill="#10b981" opacity="0.8">
						<animate attributeName="r" values="4;8;4" dur="5s" repeatCount="indefinite"/>
					</circle>
					<circle cx="700" cy="400" r="6" fill="#10b981" opacity="0.8">
						<animate attributeName="r" values="4;8;4" dur="6s" repeatCount="indefinite"/>
					</circle>
				</g>
			</g>
			
			<!-- Moving Elements -->
			<g class="moving-elements" opacity="0.5">
				<!-- Bus Animation -->
				<rect x="200" y="195" width="15" height="8" rx="2" fill="#3b82f6">
					<animateTransform attributeName="transform" type="translate" values="0,0; 400,0; 800,0" dur="8s" repeatCount="indefinite"/>
				</rect>
				<!-- Cyclist Animation -->
				<circle cx="250" cy="400" r="3" fill="#10b981">
					<animateTransform attributeName="transform" type="translate" values="0,0; 300,0; 600,0" dur="6s" repeatCount="indefinite"/>
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

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Bus class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🚌</span>
				{($locale || 'en') === 'ar' ? 'تصميم استراتيجيات تنقل مستدامة وذكية للمؤسسات والمرافق' : 'Designing Sustainable and Smart Mobility Strategies for Organizations and Facilities'}
			</div>
			
			<!-- Enhanced Title with Better Spacing -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} mb-12`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'تطوير خطط السفر' : 'Travel Plan'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'المستدامة' : 'Development'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description with Better Spacing -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} space-y-6`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نقدم خدمات تطوير خطط السفر المتخصصة لتصميم وتنفيذ استراتيجيات التنقل المستدامة التي تقلل من الاعتماد على المركبات الخاصة وتعزز استخدام وسائل النقل البديلة'
						: 'We provide specialized travel plan development services for designing and implementing sustainable mobility strategies that reduce private vehicle dependency and promote alternative transport modes'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'خدماتنا تشمل التحليل الشامل لأنماط السفر الحالية وتطوير حلول مبتكرة تحقق الاستدامة البيئية والاجتماعية والاقتصادية مع تحسين تجربة التنقل للجميع'
						: 'Our services include comprehensive analysis of current travel patterns and developing innovative solutions that achieve environmental, social, and economic sustainability while improving mobility experience for all'
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
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات تطوير خطط السفر المتخصصة' : 'Specialized Travel Plan Development Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم حلولاً شاملة ومبتكرة لتطوير خطط السفر المستدامة التي تلبي احتياجات المؤسسات المختلفة'
					: 'We provide comprehensive innovative solutions for developing sustainable travel plans that meet diverse organizational needs'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-green-600/20 group-hover:from-emerald-600/30 group-hover:via-blue-600/30 group-hover:to-green-600/30 transition-all duration-500"></div>
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

<!-- Enhanced Plan Types Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'أنواع خطط السفر المتخصصة' : 'Specialized Travel Plan Types'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نقدم خطط سفر مخصصة لمختلف أنواع المؤسسات والمرافق حسب احتياجاتها الخاصة' : 'We offer customized travel plans for different types of organizations and facilities based on their specific needs'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each planTypes as plan, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center gap-4 mb-6">
						<div class={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-xl`}>
							<svelte:component this={plan.icon} class="w-8 h-8 text-white" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? plan.title : plan.titleEn}
						</h3>
					</div>
					
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? plan.description : plan.descriptionEn}
					</p>
					
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? plan.items : plan.itemsEn) as item}
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
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'منهجية تطوير خطط السفر' : 'Travel Plan Development Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية علمية متقدمة لضمان فعالية ونجاح خطط السفر المطورة' : 'We follow an advanced scientific methodology to ensure effectiveness and success of developed travel plans'}
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
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد تطوير خطط السفر المستدامة' : 'Benefits of Sustainable Travel Plan Development'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخطط السفر المستدامة أن تحول مؤسستك وتحقق فوائد متعددة' : 'Discover how sustainable travel plans can transform your organization and achieve multiple benefits'}
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
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة لخطط السفر' : 'Successful Travel Plan Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على خطط السفر المستدامة الناجحة التي طورناها لمؤسسات ومرافق مختلفة'
					: 'Examples of successful sustainable travel plans we developed for various organizations and facilities'
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
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-green-600/20"></div>
						
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
					? '"خطة السفر التي طورتموها لجامعتنا حققت نتائج مذهلة. تقليل 50% من استخدام السيارات الخاصة وزيادة كبيرة في رضا الطلاب والموظفين. حلول مبتكرة وعملية في نفس الوقت."'
					: '"The travel plan you developed for our university achieved amazing results. 50% reduction in private car usage and significant increase in student and staff satisfaction. Innovative yet practical solutions."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">د. سارة المطيري</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'نائب رئيس الجامعة للشؤون الإدارية، جامعة الملك عبدالعزيز' : 'Vice President for Administrative Affairs, King Abdulaziz University'}
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
			{($locale || 'en') === 'ar' ? 'هل أنت مستعد لتطوير خطة سفر مستدامة؟' : 'Ready to Develop a Sustainable Travel Plan?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في تطوير خطة سفر مستدامة ومبتكرة تحقق أهدافك البيئية والاقتصادية وتحسن تجربة التنقل لجميع المستخدمين'
				: 'Let us help you develop a sustainable innovative travel plan that achieves your environmental and economic goals while improving mobility experience for all users'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ خطة السفر' : 'Start Travel Plan'}
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

	/* Mobility specific animations */
	.mobility-line-1 {
		stroke-dasharray: 20 10;
		animation: mobility-flow 8s linear infinite;
	}
	
	.mobility-line-2 {
		stroke-dasharray: 15 8;
		animation: mobility-flow 10s linear infinite reverse;
	}
	
	.mobility-line-3 {
		stroke-dasharray: 10 5;
		animation: mobility-flow 12s linear infinite;
	}
	
	@keyframes mobility-flow {
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