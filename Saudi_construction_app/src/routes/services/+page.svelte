<!-- src/routes/services/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
	import { fly, fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	
	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
	// Service images
	const serviceImages = {
		'transport-planning': '/images/services/transport-planning-hero.jpg',
		'traffic-engineering': '/images/services/traffic-engineering-systems.jpg',
		'highway-engineering': '/images/services/highway-design-construction.jpg',
		'industry-assessment': '/images/services/industry-analysis-consulting.jpg',
		'public-consultation': '/images/services/community-engagement-planning.jpg',
		'site-access': '/images/services/site-access-design.jpg',
		'feasibility-studies': '/images/services/transport-feasibility-analysis.jpg',
		'master-planning': '/images/services/comprehensive-master-planning.jpg',
		'traffic-modeling': '/images/services/advanced-traffic-modeling.jpg',
		'safety-engineering': '/images/services/traffic-safety-systems.jpg',
		'smart-systems': '/images/services/intelligent-transport-systems.jpg',
		'sustainable-transport': '/images/services/sustainable-transport-solutions.jpg',
		'default': '/images/services/transport-engineering-default.jpg'
	};
	
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 60 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.6 + 0.2
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
	
	const services = [
		{
			title: 'تقييم الصناعة',
			titleEn: 'Industry Assessment',
			description: 'تحليل وتقييم شامل للقطاعات الصناعية ومتطلبات النقل مع توفير رؤى استراتيجية متقدمة ودعم اتخاذ القرارات المدروسة',
			descriptionEn: 'Comprehensive analysis and assessment of industrial sectors and transport requirements with advanced strategic insights and informed decision-making support',
			href: '/services/industry-assessment',
			features: [
				'تحليل السوق المتقدم والمنافسة',
				'معايير الأداء الدولية والمقارنات',
				'الدعم الاستراتيجي المتخصص',
				'رسم خرائط أصحاب المصلحة',
				'تقييم المخاطر والفرص',
				'توصيات قابلة للتنفيذ'
			],
			featuresEn: [
				'Advanced market analysis and competition',
				'International performance standards and benchmarks',
				'Specialized strategic support',
				'Stakeholder mapping and analysis',
				'Risk and opportunity assessment',
				'Actionable recommendations'
			],
			image: serviceImages['industry-assessment'],
			color: 'from-blue-500 to-emerald-600',
			stats: { projects: '50+', clients: '25+', success: '95%' }
		},
		{
			title: 'الاستشارة العامة والاجتماعات',
			titleEn: 'Public Consultation & Meetings',
			description: 'خدمات الاستشارة المجتمعية والعامة المتقدمة لضمان مشاركة فعالة ومستدامة لجميع أصحاب المصلحة في مشاريع النقل الكبرى',
			descriptionEn: 'Advanced community and public consultation services ensuring effective and sustainable participation of all stakeholders in major transport projects',
			href: '/services/public-consultation',
			features: [
				'إشراك أصحاب المصلحة الشامل',
				'التواصل متعدد القنوات واللغات',
				'خدمات التيسير المتخصصة',
				'تحليل الملاحظات المتقدم',
				'إدارة النزاعات والوساطة',
				'تقارير شاملة وتوصيات'
			],
			featuresEn: [
				'Comprehensive stakeholder engagement',
				'Multi-channel and multilingual communication',
				'Specialized facilitation services',
				'Advanced feedback analysis',
				'Conflict management and mediation',
				'Comprehensive reports and recommendations'
			],
			image: serviceImages['public-consultation'],
			color: 'from-purple-500 to-blue-600',
			stats: { consultations: '100+', participants: '10K+', languages: '5+' }
		}
	];
	
	const allServices = [
		{
			category: 'تخطيط النقل',
			categoryEn: 'Transport Planning',
			color: 'from-blue-500 to-emerald-600',
			description: 'خدمات تخطيط النقل الاستراتيجية والمتقدمة لتطوير أنظمة نقل مستدامة وفعالة',
			descriptionEn: 'Strategic and advanced transport planning services for developing sustainable and efficient transport systems',
			href: '/transport-planning',
			image: serviceImages['transport-planning'],
			services: [
				{
					name: 'الوصول للموقع والتخطيط',
					nameEn: 'Site Access & Planning',
					description: 'تصميم حلول الوصول المتخصصة وفقاً لمعايير الطرق السريعة',
					descriptionEn: 'Specialized access design solutions according to highway standards',
					href: '/transport-planning/site-access'
				},
				{
					name: 'دراسات جدوى النقل المتقدمة',
					nameEn: 'Advanced Transport Feasibility Studies',
					description: 'تحليل شامل للجدوى الاقتصادية والتقنية لمشاريع النقل',
					descriptionEn: 'Comprehensive economic and technical feasibility analysis for transport projects',
					href: '/transport-planning/feasibility-studies'
				},
				{
					name: 'التخطيط الرئيسي الشامل',
					nameEn: 'Comprehensive Master Planning',
					description: 'وضع خطط رئيسية متكاملة للنقل والتنمية الحضرية',
					descriptionEn: 'Integrated master plans for transport and urban development',
					href: '/transport-planning/master-planning'
				},
				{
					name: 'الردود التقنية المتخصصة',
					nameEn: 'Specialized Technical Responses',
					description: 'ردود تقنية متخصصة لطلبات التخطيط والموافقات',
					descriptionEn: 'Specialized technical responses for planning applications and approvals',
					href: '/transport-planning/technical-responses'
				},
				{
					name: 'تقييم بيان النقل',
					nameEn: 'Transport Statement Assessment',
					description: 'تقييم وإعداد بيانات النقل للمشاريع التنموية',
					descriptionEn: 'Assessment and preparation of transport statements for development projects',
					href: '/transport-planning/transport-statements'
				},
				{
					name: 'تطوير خطة السفر المستدامة',
					nameEn: 'Sustainable Travel Plan Development',
					description: 'وضع خطط سفر مستدامة لتقليل التأثير البيئي',
					descriptionEn: 'Sustainable travel plan development to reduce environmental impact',
					href: '/transport-planning/travel-plans'
				}
			]
		},
		{
			category: 'هندسة المرور',
			categoryEn: 'Traffic Engineering',
			color: 'from-red-500 to-orange-600',
			description: 'حلول هندسة مرور متقدمة وذكية لتحسين تدفق المرور والسلامة',
			descriptionEn: 'Advanced and smart traffic engineering solutions for improving traffic flow and safety',
			href: '/traffic-engineering',
			image: serviceImages['traffic-engineering'],
			services: [
				{
					name: 'نمذجة المرور المتقدمة',
					nameEn: 'Advanced Traffic Modeling',
					description: 'نماذج رياضية معقدة لمحاكاة وتحليل الحركة المرورية',
					descriptionEn: 'Complex mathematical models for simulating and analyzing traffic movement',
					href: '/traffic-engineering/modeling'
				},
				{
					name: 'تقييم المرور الشامل',
					nameEn: 'Comprehensive Traffic Assessment',
					description: 'تقييم شامل لأنظمة المرور والأداء التشغيلي',
					descriptionEn: 'Comprehensive assessment of traffic systems and operational performance',
					href: '/traffic-engineering/assessment'
				},
				{
					name: 'تقييم تأثير المرور',
					nameEn: 'Traffic Impact Assessment',
					description: 'تحليل تأثير المشاريع الجديدة على الحركة المرورية',
					descriptionEn: 'Analysis of new project impacts on traffic movement',
					href: '/traffic-engineering/impact-assessment'
				},
				{
					name: 'أنظمة النقل الذكية',
					nameEn: 'Intelligent Transport Systems',
					description: 'تطوير وتنفيذ أنظمة النقل الذكية والمتصلة',
					descriptionEn: 'Development and implementation of smart and connected transport systems',
					href: '/traffic-engineering/its'
				},
				{
					name: 'هندسة السلامة المرورية',
					nameEn: 'Traffic Safety Engineering',
					description: 'تصميم حلول السلامة المرورية وتقليل الحوادث',
					descriptionEn: 'Traffic safety solution design and accident reduction',
					href: '/traffic-engineering/safety'
				},
				{
					name: 'مبادرة إدارة المرور',
					nameEn: 'Traffic Management Initiative',
					description: 'مبادرات شاملة لإدارة وتنظيم الحركة المرورية',
					descriptionEn: 'Comprehensive initiatives for traffic management and organization',
					href: '/traffic-engineering/management'
				},
				{
					name: 'تحليل مسار الكسح المتقدم',
					nameEn: 'Advanced Swept Path Analysis',
					description: 'تحليل دقيق لمسارات المركبات والمناورات',
					descriptionEn: 'Precise analysis of vehicle paths and maneuvers',
					href: '/traffic-engineering/swept-path'
				}
			]
		},
		{
			category: 'هندسة الطرق السريعة',
			categoryEn: 'Highway Engineering',
			color: 'from-emerald-500 to-blue-600',
			description: 'تصميم وهندسة الطرق السريعة المتقدمة والبنية التحتية المستدامة',
			descriptionEn: 'Advanced highway design and engineering with sustainable infrastructure',
			href: '/highway-engineering',
			image: serviceImages['highway-engineering'],
			services: [
				{
					name: 'تصميم مواقف السيارات المتقدم',
					nameEn: 'Advanced Parking Design',
					description: 'تصميم مواقف سيارات ذكية ومستدامة',
					descriptionEn: 'Smart and sustainable parking facility design',
					href: '/highway-engineering/parking-design'
				},
				{
					name: 'خطط إدارة المرور الذكية',
					nameEn: 'Smart Traffic Management Plans',
					description: 'خطط متطورة لإدارة المرور باستخدام التقنيات الذكية',
					descriptionEn: 'Advanced traffic management plans using smart technologies',
					href: '/highway-engineering/traffic-plans'
				},
				{
					name: 'تصميم الطرق والتقاطعات',
					nameEn: 'Road and Junction Design',
					description: 'تصميم هندسي متقدم للطرق والتقاطعات المعقدة',
					descriptionEn: 'Advanced engineering design for roads and complex junctions',
					href: '/highway-engineering/road-design'
				},
				{
					name: 'النقل المستدام والأخضر',
					nameEn: 'Sustainable and Green Transport',
					description: 'حلول النقل الصديقة للبيئة والمستدامة',
					descriptionEn: 'Environmentally friendly and sustainable transport solutions',
					href: '/highway-engineering/sustainable-transport'
				}
			]
		}
	];
	
	const stats = [
		{
			value: '500+',
			label: 'مشروع مكتمل',
			labelEn: 'Completed Projects',
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '25+',
			label: 'سنة خبرة',
			labelEn: 'Years Experience',
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '100+',
			label: 'عميل راضٍ',
			labelEn: 'Satisfied Clients',
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '20+',
			label: 'مدينة مخدومة',
			labelEn: 'Cities Served',
			color: 'from-amber-500 to-blue-600'
		}
	];
	
	const testimonials = [
		{
			quote: 'خدمة ممتازة ومهنية جداً قدمتها الشركة لدعم مشروعنا. تحليل دقيق مع حلول عملية وتقرير تقني شامل تم إنجازه في وقت قياسي.',
			quoteEn: 'Excellent and very professional service provided to support our project. Precise analysis with practical solutions and comprehensive technical report completed in record time.',
			author: 'م. أحمد الغامدي',
			authorEn: 'Eng. Ahmed Al-Ghamdi',
			position: 'مدير المشاريع، هيئة تطوير الرياض',
			positionEn: 'Project Manager, Riyadh Development Authority',
			rating: 5
		},
		{
			quote: 'فريق متخصص ومتفاني قدم لنا حلولاً ابتكارية لتحديات النقل المعقدة. النتائج تجاوزت توقعاتنا والالتزام بالمواعيد كان استثنائياً.',
			quoteEn: 'Specialized and dedicated team provided innovative solutions for complex transport challenges. Results exceeded our expectations and adherence to deadlines was exceptional.',
			author: 'د. سارة المطيري',
			authorEn: 'Dr. Sarah Al-Mutairi',
			position: 'مديرة التخطيط، وزارة النقل',
			positionEn: 'Planning Director, Ministry of Transport',
			rating: 5
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
	<title>{($locale || 'en') === 'ar' ? 'خدماتنا - حلول هندسة النقل الشاملة' : 'Our Services - Comprehensive Transport Engineering Solutions'} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'اكتشف مجموعة خدماتنا الشاملة في هندسة النقل والطرق مع حلول متقدمة ومبتكرة' : 'Discover our comprehensive range of transport and highway engineering services with advanced and innovative solutions'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-purple-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Service Network SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="serviceGrid" width="80" height="80" patternUnits="userSpaceOnUse">
					<circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;2.5;1" dur="3s" repeatCount="indefinite"/>
					</circle>
					<path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="serviceWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.5"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.7"/>
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:0.5"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#serviceGrid)" />
			
			<!-- Service Network Lines -->
			{#each Array(12) as _, i}
				<g class="service-hub-{i}" transform="translate({100 + i * 100},{150 + Math.sin(i * 2) * 200})">
					<circle r="20" fill="url(#serviceWave)" opacity="0.6">
						<animate attributeName="r" values="20;30;20" dur="{4 + i * 0.3}s" repeatCount="indefinite"/>
						<animate attributeName="opacity" values="0.6;0.9;0.6" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
					</circle>
					
					<!-- Service Icons -->
					<text x="0" y="8" text-anchor="middle" font-size="16" opacity="0.8">
						{i % 4 === 0 ? '🛣️' : i % 4 === 1 ? '🚦' : i % 4 === 2 ? '🗺️' : '⚙️'}
					</text>
					
					<!-- Connection Lines -->
					{#if i < 11}
						<line x1="20" y1="0" x2="80" y2="{Math.sin((i + 1) * 2) * 200 - Math.sin(i * 2) * 200}" 
							  stroke="url(#serviceWave)" stroke-width="2" opacity="0.4"
							  class="service-connection" style="animation-delay: {i * 0.3}s;"/>
					{/if}
				</g>
			{/each}
		</svg>
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-500 animate-float-particle"
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
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-100/80 to-blue-100/80 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-xl text-purple-700 dark:text-purple-300 rounded-full border border-purple-200/50 dark:border-purple-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<div class="w-3 h-3 bg-purple-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-lg">⚙️</span>
				{($locale || 'en') === 'ar' ? 'خدمات هندسة النقل المتخصصة والمتقدمة' : 'Specialized & Advanced Transport Engineering Services'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'والمتطورة تقنياً' : '& Technically Advanced'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'نقدم مجموعة شاملة من الخدمات المتخصصة في هندسة النقل والطرق باستخدام أحدث التقنيات والمعايير الدولية'
						: 'We offer a comprehensive range of specialized transport and highway engineering services using the latest technologies and international standards'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'من التخطيط الاستراتيجي إلى التنفيذ التقني، نساعدك في تحقيق رؤيتك لمشاريع النقل المستدامة والمبتكرة'
						: 'From strategic planning to technical implementation, we help you achieve your vision for sustainable and innovative transport projects'
					}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<!-- Advanced Pattern Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 30px 30px;"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class={`relative w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300 overflow-hidden`}>
						<!-- Animated Background -->
						<div class={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
						<!-- Pulse Ring -->
						<div class="absolute inset-0 rounded-3xl border-2 border-white/20 animate-ping"></div>
						<!-- Center Dot -->
						<div class="relative z-10 w-4 h-4 bg-white rounded-full shadow-lg"></div>
						<!-- Corner Accent -->
						<div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
					</div>
					<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
						{stat.value}
					</div>
					<div class="text-purple-100 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Main Services Overview -->
<section id="main-services" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'مجالات خدماتنا الرئيسية' : 'Our Main Service Areas'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'ثلاث مجالات رئيسية من الخدمات المتخصصة لتغطية جميع جوانب هندسة النقل بأحدث المعايير التقنية'
					: 'Three main service areas covering all aspects of transport engineering with the latest technical standards'
				}
			</p>
		</div>

		<div class="space-y-24">
			{#each allServices as serviceArea, areaIndex}
				<div class={`${isVisible('main-services') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {areaIndex * 0.3}s;">
					<div class="grid lg:grid-cols-2 gap-12 items-center">
						
						<!-- Service Area Image -->
						<div class={`relative rounded-3xl overflow-hidden shadow-2xl ${areaIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
							<img 
								src={serviceArea.image} 
								alt={($locale || 'en') === 'ar' ? serviceArea.category : serviceArea.categoryEn}
								class="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
								loading="lazy"
								on:error={(e) => {
									e.target.style.display = 'none';
									e.target.nextElementSibling.style.display = 'flex';
								}}
							/>
							<!-- Fallback -->
							<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-emerald-200 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
								<div class="text-center">
									<div class={`w-24 h-24 bg-gradient-to-br ${serviceArea.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
										<div class="w-8 h-8 bg-white rounded-full"></div>
									</div>
									<div class="text-2xl font-black text-slate-700 dark:text-slate-300">
										{($locale || 'en') === 'ar' ? serviceArea.category : serviceArea.categoryEn}
									</div>
								</div>
							</div>
							<!-- Image Overlay -->
							<div class={`absolute inset-0 bg-gradient-to-br ${serviceArea.color} opacity-20`}></div>
							
							<!-- Category Badge -->
							<div class="absolute top-6 left-6">
								<div class={`px-6 py-3 bg-gradient-to-r ${serviceArea.color} text-white rounded-2xl font-bold shadow-xl backdrop-blur-sm`}>
									<div class="flex items-center gap-3">
										<div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
										{($locale || 'en') === 'ar' ? serviceArea.category : serviceArea.categoryEn}
									</div>
								</div>
							</div>
						</div>
						
						<!-- Service Area Content -->
						<div class={`${areaIndex % 2 === 1 ? 'lg:order-1' : ''}`}>
							<div class="mb-6">
								<h3 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
									<span class={`bg-gradient-to-r ${serviceArea.color} bg-clip-text text-transparent`}>
										{($locale || 'en') === 'ar' ? serviceArea.category : serviceArea.categoryEn}
									</span>
								</h3>
								<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
									{($locale || 'en') === 'ar' ? serviceArea.description : serviceArea.descriptionEn}
								</p>
							</div>
							
							<!-- Services Grid -->
							<div class="grid md:grid-cols-2 gap-4 mb-8">
								{#each serviceArea.services as service, serviceIndex}
									<div class="group bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50" in:fly={{ x: -20, delay: serviceIndex * 100 }}>
										<h4 class="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
											{($locale || 'en') === 'ar' ? service.name : service.nameEn}
										</h4>
										<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
											{($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
										</p>
									</div>
								{/each}
							</div>
							
							<!-- CTA Button -->
							<div>
								<a 
									href={serviceArea.href} 
									class={`group inline-flex items-center px-8 py-4 bg-gradient-to-r ${serviceArea.color} text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
								>
									{($locale || 'en') === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
									<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Additional Services -->
<section id="additional-services" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات إضافية متخصصة' : 'Additional Specialized Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'خدمات داعمة واستشارية متخصصة لضمان نجاح مشاريعكم بأعلى معايير الجودة'
					: 'Supporting and specialized consulting services to ensure your project success with the highest quality standards'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each services as service, index}
				<div class={`group bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden ${isVisible('additional-services') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<!-- Service Image -->
					<div class="h-48 overflow-hidden relative">
						<img 
							src={service.image} 
							alt={($locale || 'en') === 'ar' ? service.title : service.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900/30 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<div class="w-6 h-6 bg-white rounded-full"></div>
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-emerald-600/20"></div>
						
						<!-- Service Stats -->
						<div class="absolute bottom-3 right-3 flex items-center gap-2">
							{#each Object.entries(service.stats) as [key, value]}
								<div class="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-white text-xs font-bold">
									{value}
								</div>
							{/each}
						</div>
					</div>
					
					<div class="p-8">
						<div class={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
							<div class="w-6 h-6 bg-white rounded-full animate-pulse"></div>
						</div>
						
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? service.title : service.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
							{($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
						</p>
						
						<div class="space-y-3 mb-6">
							{#each (($locale || 'en') === 'ar' ? service.features : service.featuresEn) as feature, i}
								<div class="flex items-center text-sm text-slate-600 dark:text-slate-300" in:fly={{ x: -20, delay: i * 100 }}>
									<CheckCircle class="w-4 h-4 text-purple-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
									{feature}
								</div>
							{/each}
						</div>
						
						<a 
							href={service.href} 
							class="group inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
						>
							{($locale || 'en') === 'ar' ? 'اعرف أكثر' : 'Learn More'}
							<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Testimonials Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' ? 'شهادات عملائنا تعكس التزامنا بالجودة والتميز' : 'Client testimonials reflect our commitment to quality and excellence'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each testimonials as testimonial, index}
				<div class={`bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<!-- Rating Stars -->
					<div class="flex items-center mb-6">
						{#each Array(testimonial.rating) as _, i}
							<div class="w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-1 rtl:ml-1 rtl:mr-0"></div>
						{/each}
					</div>
					
					<!-- Quote -->
					<blockquote class="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						"{($locale || 'en') === 'ar' ? testimonial.quote : testimonial.quoteEn}"
					</blockquote>
					
					<!-- Author -->
					<div class="flex items-center">
						<div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
							<div class="w-4 h-4 bg-white rounded-full"></div>
						</div>
						<div>
							<div class="font-bold text-slate-900 dark:text-white">
								{($locale || 'en') === 'ar' ? testimonial.author : testimonial.authorEn}
							</div>
							<div class="text-sm text-slate-500 dark:text-slate-400">
								{($locale || 'en') === 'ar' ? testimonial.position : testimonial.positionEn}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<!-- Advanced Pattern Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
		</div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
			<div class="text-8xl mb-8 animate-bounce-gentle">💡</div>
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-6">
				{($locale || 'en') === 'ar' ? 'هل تحتاج خدمة مخصصة؟' : 'Need a Custom Service?'}
			</h2>
			<p class="text-xl text-purple-100 mb-8 leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'فريقنا من الخبراء المتخصصين جاهز لتطوير حلول مخصصة ومبتكرة تلبي احتياجاتكم الفريدة بأحدث التقنيات'
					: 'Our team of specialized experts is ready to develop custom and innovative solutions that meet your unique requirements with the latest technologies'
				}
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a 
					href="/contact" 
					class="group inline-flex items-center justify-center px-12 py-5 bg-white text-purple-600 font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl hover:bg-purple-50"
				>
					<span class="flex items-center gap-3">
						{($locale || 'en') === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
						<ArrowRight class="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
					</span>
				</a>
				<a 
					href="/about" 
					class="inline-flex items-center justify-center px-12 py-5 border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
				>
					{($locale || 'en') === 'ar' ? 'تعرف على قدراتنا' : 'Learn About Our Capabilities'}
				</a>
			</div>
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

	@keyframes bounce-gentle {
		0%, 100% { 
			transform: translateY(0px); 
		}
		50% { 
			transform: translateY(-10px); 
		}
	}

	@keyframes service-connection {
		0% { stroke-dasharray: 0 100; }
		100% { stroke-dasharray: 100 0; }
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
	.animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
	.service-connection { animation: service-connection 2s ease-out; }

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