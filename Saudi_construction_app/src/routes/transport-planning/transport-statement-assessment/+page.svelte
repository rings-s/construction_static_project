<!-- src/routes/transport-planning/transport-statement-assessment/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		FileText,
		BarChart3,
		Search,
		AlertTriangle,
		Award,
		Zap,
		Target,
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
		Car,
		Shield,
		PieChart,
		LineChart,
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
			icon: FileText,
			title: 'إعداد البيانات التفصيلية',
			titleEn: 'Detailed Statement Preparation',
			description: 'إعداد بيانات نقل شاملة ومفصلة تلبي متطلبات السلطات التخطيطية والتنظيمية مع توثيق كامل للتأثيرات المرورية',
			descriptionEn: 'Comprehensive and detailed transport statement preparation meeting planning and regulatory authority requirements with complete traffic impact documentation',
			color: 'from-blue-500 to-emerald-600',
			image: '/images/features/statement-preparation.jpg'
		},
		{
			icon: BarChart3,
			title: 'تحليل توليد المرور',
			titleEn: 'Traffic Generation Analysis',
			description: 'تحليل دقيق لكمية المرور المتوقعة من التطوير المقترح باستخدام أحدث المعايير والطرق المعتمدة دولياً',
			descriptionEn: 'Accurate analysis of expected traffic generation from proposed development using latest internationally approved standards and methodologies',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/traffic-generation.jpg'
		},
		{
			icon: MapPin,
			title: 'تقييم ترتيبات الوصول',
			titleEn: 'Access Arrangement Assessment',
			description: 'تقييم شامل لترتيبات الوصول والدخول مع ضمان السلامة والكفاءة التشغيلية وتحليل المسارات المتحركة',
			descriptionEn: 'Comprehensive assessment of access and entry arrangements ensuring safety and operational efficiency with swept path analysis',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/access-assessment.jpg'
		},
		{
			icon: CheckSquare,
			title: 'تقييم الامتثال للسياسات',
			titleEn: 'Policy Compliance Assessment',
			description: 'فحص الامتثال لسياسات النقل المحلية والوطنية والمعايير التخطيطية المعتمدة مع توثيق كامل للمتطلبات',
			descriptionEn: 'Examination of compliance with local and national transport policies and approved planning standards with complete requirements documentation',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/policy-compliance.jpg'
		},
		{
			icon: Users,
			title: 'تحليل إمكانية الوصول',
			titleEn: 'Accessibility Analysis',
			description: 'تقييم إمكانية الوصول بوسائل النقل المختلفة بما في ذلك النقل العام والمشي وركوب الدراجات والمركبات الخاصة',
			descriptionEn: 'Assessment of accessibility by different transport modes including public transport, walking, cycling, and private vehicles',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/accessibility-analysis.jpg'
		},
		{
			icon: Car,
			title: 'تحليل الاحتياجات للمواقف',
			titleEn: 'Parking Requirements Analysis',
			description: 'تحديد وتبرير متطلبات مواقف السيارات وفقاً للمعايير المحلية واحتياجات التطوير مع تحليل الطلب والعرض',
			descriptionEn: 'Determination and justification of parking requirements according to local standards and development needs with supply and demand analysis',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/parking-analysis.jpg'
		}
	];

	const assessmentTypes = [
		{
			title: 'بيانات النقل للمشاريع السكنية',
			titleEn: 'Residential Development Transport Statements',
			description: 'بيانات نقل متخصصة للمشاريع السكنية من جميع الأحجام',
			descriptionEn: 'Specialized transport statements for residential projects of all sizes',
			items: [
				'تحليل توليد الرحلات السكنية',
				'تقييم الوصول للخدمات',
				'تحليل احتياجات المواقف',
				'تقييم النقل العام'
			],
			itemsEn: [
				'Residential trip generation analysis',
				'Service accessibility assessment',
				'Parking needs analysis',
				'Public transport evaluation'
			],
			icon: Home,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'تقييمات النقل التجارية',
			titleEn: 'Commercial Transport Assessments',
			description: 'تقييمات شاملة للمشاريع التجارية والمكتبية',
			descriptionEn: 'Comprehensive assessments for commercial and office projects',
			items: [
				'تحليل ساعات الذروة',
				'تقييم حركة البضائع',
				'تحليل مواقف الزوار',
				'دراسة التوزيع المكاني'
			],
			itemsEn: [
				'Peak hour analysis',
				'Freight movement assessment',
				'Visitor parking analysis',
				'Spatial distribution study'
			],
			icon: Building,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			title: 'بيانات المرافق الخاصة',
			titleEn: 'Special Facility Statements',
			description: 'بيانات نقل للمرافق الطبية والتعليمية والترفيهية',
			descriptionEn: 'Transport statements for medical, educational, and recreational facilities',
			items: [
				'تحليل أنماط الزيارة',
				'تقييم الوصول للطوارئ',
				'دراسة النقل المدرسي',
				'تحليل الأحداث الخاصة'
			],
			itemsEn: [
				'Visit pattern analysis',
				'Emergency access assessment',
				'School transport study',
				'Special events analysis'
			],
			icon: Hospital,
			color: 'from-purple-500 to-amber-600'
		}
	];

	const benefits = [
		{
			title: 'تسريع عملية الموافقات التخطيطية',
			titleEn: 'Accelerating Planning Approval Process',
			description: 'نساعد في تسريع عملية الحصول على التراخيص التخطيطية من خلال إعداد وثائق شاملة ومطابقة للمتطلبات من المرة الأولى',
			descriptionEn: 'We help accelerate planning licensing process through comprehensive documentation that meets requirements from the first submission',
			image: '/images/benefits/approval-acceleration.jpg',
			icon: Zap,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'ضمان الامتثال الكامل للمعايير',
			titleEn: 'Complete Standards Compliance Assurance',
			description: 'نضمن الامتثال الكامل لجميع المتطلبات التنظيمية والقانونية مع تقليل مخاطر رفض الطلبات أو طلب تعديلات إضافية',
			descriptionEn: 'We ensure complete compliance with all regulatory and legal requirements while reducing risks of application rejections or additional modification requests',
			image: '/images/benefits/compliance-assurance.jpg',
			icon: Shield,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'دعم تقني متخصص ومستمر',
			titleEn: 'Specialized Continuous Technical Support',
			description: 'نوفر دعماً تقنياً متخصصاً ومستمراً طوال عملية المراجعة والموافقة مع الرد على جميع الاستفسارات والتعليقات الفنية',
			descriptionEn: 'We provide specialized continuous technical support throughout review and approval process with responses to all technical queries and comments',
			image: '/images/benefits/technical-support.jpg',
			icon: Target,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const caseStudies = [
		{
			title: 'بيان نقل للمجمع التجاري الكبير - الرياض',
			titleEn: 'Major Commercial Complex Transport Statement - Riyadh',
			description: 'إعداد بيان نقل شامل لمجمع تجاري بمساحة 80,000 م² يضم مراكز تسوق ومكاتب ومطاعم مع تحليل توليد 5,000 رحلة يومية وتقييم التأثير على الشبكة المحيطة',
			descriptionEn: 'Comprehensive transport statement for 80,000 m² commercial complex including shopping centers, offices, and restaurants with 5,000 daily trip generation analysis and surrounding network impact assessment',
			location: 'شمال الرياض، المملكة العربية السعودية',
			locationEn: 'North Riyadh, Saudi Arabia',
			duration: '4 أشهر',
			durationEn: '4 months',
			team: '8 متخصصين',
			teamEn: '8 specialists',
			image: '/images/case-studies/commercial-complex-statement.jpg',
			icon: Building,
			challenges: [
				'موقع حساس بالقرب من مدرسة',
				'تقاطعات مرورية معقدة',
				'متطلبات مواقف صارمة',
				'تنسيق مع جهات متعددة'
			],
			challengesEn: [
				'Sensitive location near school',
				'Complex traffic intersections',
				'Strict parking requirements',
				'Multi-agency coordination'
			],
			outcomes: [
				'موافقة سريعة خلال 6 أسابيع',
				'تصميم وصول محسّن',
				'خطة إدارة مرور فعالة',
				'تقليل التأثير على المدرسة'
			],
			outcomesEn: [
				'Fast approval within 6 weeks',
				'Enhanced access design',
				'Effective traffic management plan',
				'Reduced impact on school'
			],
			stats: { area: '80,000 m²', trips: '5,000/day', approval: '6 weeks' }
		},
		{
			title: 'تقييم نقل للمجتمع السكني المتكامل - جدة',
			titleEn: 'Integrated Residential Community Transport Assessment - Jeddah',
			description: 'تقييم نقل شامل لمجتمع سكني متكامل من 1,500 وحدة سكنية مع مرافق تجارية وتعليمية وترفيهية ودراسة تفصيلية لأنماط التنقل الداخلي والخارجي',
			descriptionEn: 'Comprehensive transport assessment for integrated residential community of 1,500 units with commercial, educational, and recreational facilities including detailed internal and external mobility patterns study',
			location: 'شرق جدة، المملكة العربية السعودية',
			locationEn: 'East Jeddah, Saudi Arabia',
			duration: '6 أشهر',
			durationEn: '6 months',
			team: '10 متخصصين',
			teamEn: '10 specialists',
			image: '/images/case-studies/residential-community-assessment.jpg',
			icon: Home,
			challenges: [
				'مجتمع متعدد الاستخدامات',
				'تدرج في مراحل التطوير',
				'متطلبات نقل متنوعة',
				'تكامل مع النقل العام'
			],
			challengesEn: [
				'Mixed-use community',
				'Phased development stages',
				'Diverse transport requirements',
				'Public transport integration'
			],
			outcomes: [
				'خطة تنقل متكاملة',
				'تصميم شوارع آمنة',
				'نظام نقل داخلي فعال',
				'اتصال ممتاز بالنقل العام'
			],
			outcomesEn: [
				'Integrated mobility plan',
				'Safe street design',
				'Effective internal transport system',
				'Excellent public transport connectivity'
			],
			stats: { units: '1,500', phases: '4', facilities: '15' }
		},
		{
			title: 'بيان نقل للمرفق الطبي التخصصي - الدمام',
			titleEn: 'Specialized Medical Facility Transport Statement - Dammam',
			description: 'إعداد بيان نقل متخصص لمستشفى تخصصي بسعة 400 سرير مع تحليل معقد لأنماط الوصول المختلفة للمرضى والزوار والموظفين والطوارئ على مدار الساعة',
			descriptionEn: 'Specialized transport statement for 400-bed specialist hospital with complex analysis of different access patterns for patients, visitors, staff, and 24/7 emergency services',
			location: 'وسط الدمام، المملكة العربية السعودية',
			locationEn: 'Central Dammam, Saudi Arabia',
			duration: '5 أشهر',
			durationEn: '5 months',
			team: '9 متخصصين',
			teamEn: '9 specialists',
			image: '/images/case-studies/medical-facility-statement.jpg',
			icon: Hospital,
			challenges: [
				'عمليات على مدار الساعة',
				'أنماط وصول متعددة',
				'متطلبات الطوارئ',
				'قيود الموقع الحضري'
			],
			challengesEn: [
				'24/7 operations',
				'Multiple access patterns',
				'Emergency requirements',
				'Urban site constraints'
			],
			outcomes: [
				'تصميم وصول متدرج',
				'فصل حركة الطوارئ',
				'مواقف متنوعة حسب الحاجة',
				'نظام توجيه ذكي'
			],
			outcomesEn: [
				'Hierarchical access design',
				'Emergency traffic separation',
				'Diverse need-based parking',
				'Smart guidance system'
			],
			stats: { beds: '400', users: '3K/day', parking: '800 spaces' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'المسح والتحليل الأولي',
			titleEn: 'Survey & Initial Analysis',
			description: 'إجراء مسوحات ميدانية شاملة وجمع البيانات الأساسية وتحليل الوضع الحالي للموقع والشبكة المحيطة',
			descriptionEn: 'Conducting comprehensive field surveys, baseline data collection, and current situation analysis of site and surrounding network',
			icon: Search,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			step: '02',
			title: 'تحليل توليد المرور والتوزيع',
			titleEn: 'Traffic Generation & Distribution Analysis',
			description: 'تحليل كمية المرور المتوقعة من التطوير وتوزيعها على الشبكة مع دراسة أنماط الرحلات المختلفة',
			descriptionEn: 'Analysis of expected traffic from development and its distribution on network with different trip pattern studies',
			icon: BarChart3,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			step: '03',
			title: 'إعداد البيان والتقييم',
			titleEn: 'Statement Preparation & Assessment',
			description: 'كتابة البيان التفصيلي مع جميع التحليلات والتقييمات والرسوم التوضيحية والتوصيات التقنية',
			descriptionEn: 'Writing detailed statement with all analyses, assessments, illustrations, and technical recommendations',
			icon: FileText,
			color: 'from-purple-500 to-amber-600'
		},
		{
			step: '04',
			title: 'المراجعة والتقديم والمتابعة',
			titleEn: 'Review, Submission & Follow-up',
			description: 'مراجعة نهائية شاملة وتقديم البيان للسلطات مع المتابعة المستمرة والرد على الاستفسارات',
			descriptionEn: 'Comprehensive final review and statement submission to authorities with continuous follow-up and query responses',
			icon: CheckSquare,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const stats = [
		{
			value: '280+',
			label: 'بيان نقل مكتمل',
			labelEn: 'Transport Statements Completed',
			icon: FileText,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '98%',
			label: 'معدل الموافقة من المرة الأولى',
			labelEn: 'First-Time Approval Rate',
			icon: CheckCircle,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '25',
			label: 'يوم متوسط التسليم',
			labelEn: 'Days Average Delivery',
			icon: Clock,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '100%',
			label: 'الامتثال للمعايير',
			labelEn: 'Standards Compliance',
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
	<title>{($locale || 'en') === 'ar' ? 'تقييم بيانات النقل' : 'Transport Statement Assessment'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'إعداد بيانات نقل شاملة للطلبات التخطيطية والتطويرية مع ضمان الامتثال للمعايير' : 'Comprehensive transport statement preparation for planning and development applications ensuring standards compliance'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Advanced Document Flow SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="statementGrid" width="50" height="50" patternUnits="userSpaceOnUse">
					<circle cx="25" cy="25" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="statementWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#statementGrid)" />
			
			<!-- Document Flow Lines -->
			<g class="document-flow" opacity="0.6">
				<path d="M100,300 L250,250 L400,300 L550,250 L700,300 L850,250" 
					  stroke="url(#statementWave)" stroke-width="3" fill="none" class="statement-flow-1"/>
				<path d="M150,500 L300,450 L450,500 L600,450 L750,500 L900,450" 
					  stroke="url(#statementWave)" stroke-width="2" fill="none" class="statement-flow-2"/>
				
				<!-- Document Nodes -->
				<rect x="245" y="240" width="10" height="12" rx="2" fill="#3b82f6" opacity="0.8">
					<animate attributeName="height" values="10;16;10" dur="3s" repeatCount="indefinite"/>
				</rect>
				<rect x="545" y="240" width="10" height="12" rx="2" fill="#10b981" opacity="0.8">
					<animate attributeName="height" values="10;16;10" dur="4s" repeatCount="indefinite"/>
				</rect>
				<rect x="845" y="240" width="10" height="12" rx="2" fill="#8b5cf6" opacity="0.8">
					<animate attributeName="height" values="10;16;10" dur="5s" repeatCount="indefinite"/>
				</rect>
			</g>
			
			<!-- Assessment Icons -->
			<g class="assessment-icons" opacity="0.4">
				<circle cx="200" cy="400" r="6" fill="#3b82f6">
					<animate attributeName="r" values="4;8;4" dur="6s" repeatCount="indefinite"/>
				</circle>
				<circle cx="500" cy="350" r="6" fill="#10b981">
					<animate attributeName="r" values="4;8;4" dur="7s" repeatCount="indefinite"/>
				</circle>
				<circle cx="800" cy="400" r="6" fill="#8b5cf6">
					<animate attributeName="r" values="4;8;4" dur="8s" repeatCount="indefinite"/>
				</circle>
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
				<FileText class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">📄</span>
				{($locale || 'en') === 'ar' ? 'إعداد بيانات نقل شاملة للطلبات التخطيطية والتطويرية' : 'Comprehensive Transport Statement Preparation for Planning and Development Applications'}
			</div>
			
			<!-- Enhanced Title with Better Spacing -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} mb-12`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
					<span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'تقييم بيانات النقل' : 'Transport Statement'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'والتقييمات' : 'Assessment'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description with Better Spacing -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} space-y-6`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نقدم خدمات تقييم وإعداد بيانات النقل المتخصصة للمشاريع التطويرية لضمان الامتثال للمتطلبات التخطيطية وتسريع عملية الحصول على التراخيص'
						: 'We provide specialized transport statement assessment and preparation services for development projects ensuring planning requirement compliance and accelerating licensing processes'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'خدماتنا تشمل التحليل الشامل للتأثيرات المرورية وإعداد الوثائق التقنية المطلوبة وضمان الامتثال لجميع المعايير والسياسات المحلية والدولية'
						: 'Our services include comprehensive traffic impact analysis, required technical documentation preparation, and ensuring compliance with all local and international standards and policies'
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
				{($locale || 'en') === 'ar' ? 'خدمات بيانات النقل المتخصصة' : 'Specialized Transport Statement Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم خدمات شاملة في إعداد وتقييم بيانات النقل مع ضمان الجودة والامتثال للمعايير'
					: 'We provide comprehensive services in transport statement preparation and assessment ensuring quality and standards compliance'
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
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:via-emerald-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
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
				{($locale || 'en') === 'ar' ? 'أنواع بيانات النقل والتقييمات' : 'Types of Transport Statements & Assessments'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نغطي جميع أنواع المشاريع التطويرية بخدمات مخصصة لكل نوع' : 'We cover all types of development projects with tailored services for each type'}
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
				{($locale || 'en') === 'ar' ? 'منهجية إعداد بيانات النقل' : 'Transport Statement Preparation Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية منظمة ومتقدمة لضمان جودة ودقة بيانات النقل المعدة' : 'We follow an organized advanced methodology to ensure quality and accuracy of prepared transport statements'}
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
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد خدمات بيانات النقل' : 'Benefits of Transport Statement Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدماتنا أن تعزز من نجاح مشروعك التطويري' : 'Discover how our services can enhance your development project success'}
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
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة لبيانات النقل' : 'Successful Transport Statement Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على بيانات النقل والتقييمات الناجحة التي أعددناها لمشاريع متنوعة'
					: 'Examples of successful transport statements and assessments we prepared for diverse projects'
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
					? '"خدمة ممتازة ومهنية جداً في إعداد بيان النقل لمشروعنا التجاري. تحليل دقيق للبيانات مع عرض واضح ومقنع أدى إلى موافقة سريعة من السلطات دون أي تعديلات مطلوبة."'
					: '"Excellent and very professional service in preparing transport statement for our commercial project. Accurate data analysis with clear convincing presentation resulted in fast authority approval without any required modifications."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">محمد العتيبي</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'مدير التطوير، شركة الأندلس العقارية' : 'Development Manager, Al-Andalus Real Estate Company'}
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
			{($locale || 'en') === 'ar' ? 'هل تحتاج إلى بيان نقل لمشروعك؟' : 'Need a Transport Statement for Your Project?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في إعداد بيان نقل شامل ومتوافق مع المعايير لضمان الحصول على الموافقات بسرعة وسهولة'
				: 'Let us help you prepare a comprehensive standards-compliant transport statement to ensure fast and easy approval acquisition'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ بيان النقل' : 'Start Transport Statement'}
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

	/* Statement specific animations */
	.statement-flow-1 {
		stroke-dasharray: 15 10;
		animation: statement-flow 6s linear infinite;
	}
	
	.statement-flow-2 {
		stroke-dasharray: 10 8;
		animation: statement-flow 8s linear infinite reverse;
	}
	
	@keyframes statement-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -100; }
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