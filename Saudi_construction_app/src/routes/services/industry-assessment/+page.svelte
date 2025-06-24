<!-- src/routes/services/industry-assessment/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, BarChart3, TrendingUp, Target, Users, Zap, Building2, Play, Star } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
	import { fly, fade, scale } from 'svelte/transition';
	
	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
	const serviceData = {
		title: 'تقييم الصناعة',
		titleEn: 'Industry Assessment',
		subtitle: 'تحليل وتقييم شامل للقطاعات الصناعية ومتطلبات النقل',
		subtitleEn: 'Comprehensive analysis and assessment of industrial sectors and transport requirements',
		description: 'خدمات تقييم الصناعة المتخصصة التي توفر تحليلاً شاملاً لأسواق النقل والاتجاهات والفرص لدعم التخطيط الاستراتيجي وتطوير الأعمال',
		descriptionEn: 'Professional industry assessment services providing comprehensive analysis of transport markets, trends, and opportunities to support strategic planning and business development',
		heroImage: '/images/services/industry-analysis-consulting.jpg',
		color: 'from-blue-500 to-emerald-600'
	};

	const features = [
		{
			icon: BarChart3,
			title: 'تحليل السوق المتقدم',
			titleEn: 'Advanced Market Analysis',
			description: 'تحليل شامل لاتجاهات صناعة النقل وديناميات السوق والمشهد التنافسي',
			descriptionEn: 'Comprehensive analysis of transport industry trends, market dynamics, and competitive landscape'
		},
		{
			icon: TrendingUp,
			title: 'معايير الأداء الدولية',
			titleEn: 'Performance Benchmarking',
			description: 'مقارنة مفصلة بالمعايير الصناعية وأفضل الممارسات لتحسين الأداء',
			descriptionEn: 'Detailed benchmarking against industry standards and best practices for performance optimization'
		},
		{
			icon: Target,
			title: 'الدعم الاستراتيجي المتخصص',
			titleEn: 'Strategic Planning Support',
			description: 'رؤى قائمة على الأدلة لدعم التخطيط الاستراتيجي وقرارات تطوير الأعمال',
			descriptionEn: 'Evidence-based insights to support strategic planning and business development decisions'
		},
		{
			icon: Users,
			title: 'رسم خرائط أصحاب المصلحة',
			titleEn: 'Stakeholder Mapping',
			description: 'تحليل شامل لأصحاب المصلحة وتطوير استراتيجية المشاركة',
			descriptionEn: 'Comprehensive stakeholder analysis and engagement strategy development'
		},
		{
			icon: Zap,
			title: 'تقييم التكنولوجيا',
			titleEn: 'Technology Assessment',
			description: 'تقييم التقنيات الناشئة وتأثيرها المحتمل على عمليات الصناعة',
			descriptionEn: 'Evaluation of emerging technologies and their potential impact on industry operations'
		},
		{
			icon: Building2,
			title: 'التحليل التنظيمي',
			titleEn: 'Regulatory Analysis',
			description: 'تقييم البيئة التنظيمية ومتطلبات الامتثال عبر الولايات القضائية',
			descriptionEn: 'Assessment of regulatory environment and compliance requirements across jurisdictions'
		}
	];

	const benefits = [
		{ text: 'فهم موقع السوق والفرص', textEn: 'Understand market position and opportunities' },
		{ text: 'تحديد اتجاهات الصناعة والاضطرابات', textEn: 'Identify industry trends and disruptions' },
		{ text: 'معايير الأداء مقابل الأقران', textEn: 'Benchmark performance against peers' },
		{ text: 'دعم اتخاذ القرارات الاستراتيجية', textEn: 'Support strategic decision making' },
		{ text: 'تقليل مخاطر الاستثمار', textEn: 'Minimize investment risks' },
		{ text: 'تحسين الكفاءة التشغيلية', textEn: 'Optimize operational efficiency' }
	];

	const process = [
		{
			title: 'رسم خريطة الصناعة',
			titleEn: 'Industry Mapping',
			description: 'رسم خريطة شاملة للمشهد الصناعي واللاعبين الرئيسيين',
			descriptionEn: 'Comprehensive mapping of industry landscape and key players'
		},
		{
			title: 'تحليل البيانات',
			titleEn: 'Data Analysis',
			description: 'تحليل مفصل لبيانات السوق والاتجاهات ومقاييس الأداء',
			descriptionEn: 'Detailed analysis of market data, trends, and performance metrics'
		},
		{
			title: 'تقييم الفجوات',
			titleEn: 'Gap Assessment',
			description: 'تحديد الفجوات والفرص والتحديات المحتملة',
			descriptionEn: 'Identification of gaps, opportunities, and potential challenges'
		},
		{
			title: 'التوصيات الاستراتيجية',
			titleEn: 'Strategic Recommendations',
			description: 'تطوير استراتيجيات وتوصيات قابلة للتنفيذ',
			descriptionEn: 'Development of actionable strategies and recommendations'
		}
	];

	const caseStudies = [
		{
			title: 'تقييم سلطة النقل الإقليمية',
			titleEn: 'Regional Transit Authority Assessment',
			description: 'تقييم شامل للصناعة لسلطة النقل الإقليمية بما في ذلك توصيات تحسين الخدمة',
			descriptionEn: 'Comprehensive industry assessment for regional transit authority including service optimization recommendations',
			location: 'المنطقة الحضرية',
			locationEn: 'Metropolitan Region',
			duration: '8 أشهر',
			durationEn: '8 months',
			team: '10 متخصصين',
			teamEn: '10 specialists',
			result: '25% تحسن في الكفاءة',
			resultEn: '25% efficiency improvement'
		},
		{
			title: 'تحليل صناعة الشحن',
			titleEn: 'Freight Industry Analysis',
			description: 'تحليل السوق لصناعة الشحن الإقليمية بما في ذلك اعتماد التكنولوجيا وفرص الكفاءة',
			descriptionEn: 'Market analysis of regional freight industry including technology adoption and efficiency opportunities',
			location: 'الممر الصناعي',
			locationEn: 'Industrial Corridor',
			duration: '6 أشهر',
			durationEn: '6 months',
			team: '8 متخصصين',
			teamEn: '8 specialists',
			result: '30% خفض التكاليف',
			resultEn: '30% cost reduction'
		},
		{
			title: 'نظام التنقل الذكي',
			titleEn: 'Smart Mobility Ecosystem',
			description: 'تقييم نظام التنقل الذكي الناشئ وفرص التكامل للوكالات العامة',
			descriptionEn: 'Assessment of emerging smart mobility ecosystem and integration opportunities for public agencies',
			location: 'مبادرة المدينة الذكية',
			locationEn: 'Smart City Initiative',
			duration: '10 أشهر',
			durationEn: '10 months',
			team: '12 متخصصاً',
			teamEn: '12 specialists',
			result: '40% تحسن في الخدمة',
			resultEn: '40% service improvement'
		}
	];

	const stats = [
		{ value: '50+', label: 'تقييم مكتمل', labelEn: 'Assessments Completed' },
		{ value: '95%', label: 'رضا العملاء', labelEn: 'Client Satisfaction' },
		{ value: '25+', label: 'صناعة محللة', labelEn: 'Industries Analyzed' },
		{ value: '100%', label: 'رؤى قابلة للتنفيذ', labelEn: 'Actionable Insights' }
	];

	const testimonials = [
		{
			quote: 'تحليل صناعي شامل ومعمق ساعدنا في اتخاذ قرارات استراتيجية مدروسة. النتائج تجاوزت توقعاتنا بشكل كبير.',
			quoteEn: 'Comprehensive and in-depth industry analysis that helped us make informed strategic decisions. Results exceeded our expectations significantly.',
			author: 'د. محمد العتيبي',
			authorEn: 'Dr. Mohammed Al-Otaibi',
			position: 'المدير التنفيذي، شركة النقل المتقدم',
			positionEn: 'CEO, Advanced Transport Company',
			rating: 5
		},
		{
			quote: 'فريق متخصص قدم رؤى قيمة ساعدت في تطوير استراتيجيتنا طويلة المدى. التقرير كان مفصلاً وعملياً جداً.',
			quoteEn: 'Specialized team provided valuable insights that helped develop our long-term strategy. The report was very detailed and practical.',
			author: 'أ. سارة الشهراني',
			authorEn: 'Ms. Sarah Al-Shahrani',
			position: 'مديرة التطوير الاستراتيجي',
			positionEn: 'Strategic Development Manager',
			rating: 5
		}
	];

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 40 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
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
	
	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
	
	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? serviceData.title : serviceData.titleEn} - {APP_CONFIG.name}</title>
	<meta name="description" content={($locale || 'en') === 'ar' ? serviceData.description : serviceData.descriptionEn} />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Industry Assessment SVG Pattern -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="industryGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="industryWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#industryGrid)" />
			
			<!-- Industry Chart Elements -->
			{#each Array(8) as _, i}
				<g class="chart-element-{i}" transform="translate({150 + i * 130},{200 + Math.sin(i * 0.5) * 100})">
					<rect width="80" height="{100 + i * 20}" fill="url(#industryWave)" opacity="0.7" rx="8">
						<animate attributeName="height" values="{100 + i * 20};{120 + i * 25};{100 + i * 20}" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
					</rect>
					<text x="40" y="-10" text-anchor="middle" font-size="12" opacity="0.6">
						{i % 2 === 0 ? '📊' : '📈'}
					</text>
				</g>
			{/each}
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
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 8 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			
			<!-- Hero Content -->
			<div>
				<!-- Enhanced Badge -->
				<div class={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100/80 to-emerald-100/80 dark:from-blue-900/30 dark:to-emerald-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-6 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-xl hover:scale-105`}>
					<div class="w-3 h-3 bg-blue-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
					<span class="mr-3 rtl:ml-3 rtl:mr-0 text-lg">🏭</span>
					{($locale || 'en') === 'ar' ? 'خدمة متخصصة' : 'Specialized Service'}
				</div>
				
				<!-- Enhanced Title -->
				<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<h1 class="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6">
						<span class={`block bg-gradient-to-r ${serviceData.color} bg-clip-text text-transparent animate-gradient-flow bg-300%`}>
							{($locale || 'en') === 'ar' ? serviceData.title : serviceData.titleEn}
						</span>
					</h1>
				</div>
				
				<!-- Enhanced Description -->
				<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
						{($locale || 'en') === 'ar' ? serviceData.subtitle : serviceData.subtitleEn}
					</p>
					<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
						{($locale || 'en') === 'ar' ? serviceData.description : serviceData.descriptionEn}
					</p>
				</div>

				<!-- CTA Buttons -->
				<div class={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
					<a 
						href="/contact" 
						class={`group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${serviceData.color} text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
					>
						{($locale || 'en') === 'ar' ? 'احصل على استشارة' : 'Get Consultation'}
						<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
					</a>
					<a 
						href="#features" 
						class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
					>
						{($locale || 'en') === 'ar' ? 'اعرف المزيد' : 'Learn More'}
					</a>
				</div>
			</div>
			
			<!-- Hero Image -->
			<div class={`relative transition-all duration-1000 delay-300 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`}>
				<div class="relative rounded-3xl overflow-hidden shadow-2xl">
					<img 
						src={serviceData.heroImage} 
						alt={($locale || 'en') === 'ar' ? serviceData.title : serviceData.titleEn}
						class="w-full h-[500px] object-cover"
						loading="lazy"
						on:error={(e) => {
							e.target.style.display = 'none';
							e.target.nextElementSibling.style.display = 'flex';
						}}
					/>
					<!-- Fallback -->
					<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
						<div class="text-center">
							<div class={`w-24 h-24 bg-gradient-to-br ${serviceData.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
								<div class="text-4xl">🏭</div>
							</div>
							<div class="text-2xl font-black text-slate-700 dark:text-slate-300">
								{($locale || 'en') === 'ar' ? serviceData.title : serviceData.titleEn}
							</div>
						</div>
					</div>
					<!-- Image Overlay -->
					<div class={`absolute inset-0 bg-gradient-to-br ${serviceData.color} opacity-20`}></div>
				</div>
				
				<!-- Floating Stats -->
				<div class="absolute -bottom-6 -right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
					<div class="grid grid-cols-2 gap-4 text-center">
						<div>
							<div class="text-2xl font-black text-slate-900 dark:text-white">50+</div>
							<div class="text-xs text-slate-500 font-medium">
								{($locale || 'en') === 'ar' ? 'تقييم' : 'Assessments'}
							</div>
						</div>
						<div>
							<div class="text-2xl font-black text-slate-900 dark:text-white">95%</div>
							<div class="text-xs text-slate-500 font-medium">
								{($locale || 'en') === 'ar' ? 'رضا' : 'Satisfaction'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class={`py-16 bg-gradient-to-r ${serviceData.color} relative overflow-hidden`}>
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 30px 30px;"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class="relative w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300 overflow-hidden">
						<div class="absolute inset-0 bg-gradient-to-br from-white/10 to-white/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
						<div class="absolute inset-0 rounded-3xl border-2 border-white/20 animate-ping"></div>
						<div class="relative z-10 w-4 h-4 bg-white rounded-full shadow-lg"></div>
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

<!-- Enhanced Features Section -->
<section id="features" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خصائص الخدمة' : 'Service Features'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'مجموعة شاملة من الخصائص المتقدمة لتقديم أفضل تحليل صناعي'
					: 'Comprehensive set of advanced features to deliver the best industry analysis'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class={`group bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class={`w-16 h-16 bg-gradient-to-br ${serviceData.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
						<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
					</div>
					
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
						{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
					</h3>
					
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Process Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'عملية العمل' : 'Work Process'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'منهجية منظمة ومُحسّنة لضمان تقديم أفضل النتائج'
					: 'Organized and optimized methodology to ensure the best results delivery'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class={`relative ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<!-- Step Number -->
					<div class={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${serviceData.color} rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl z-10`}>
						{index + 1}
					</div>
					
					<div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 h-full">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 mt-4">
							{($locale || 'en') === 'ar' ? step.title : step.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? step.description : step.descriptionEn}
						</p>
					</div>
					
					<!-- Connection Line -->
					{#if index < process.length - 1}
						<div class="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-emerald-300 dark:from-blue-600 dark:to-emerald-600"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Case Studies Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' ? 'أمثلة من مشاريعنا الناجحة وتأثيرها الإيجابي' : 'Examples of our successful projects and their positive impact'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each caseStudies as study, index}
				<div class={`group bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<!-- Study Header -->
					<div class={`h-4 bg-gradient-to-r ${serviceData.color}`}></div>
					
					<div class="p-8">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? study.title : study.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<!-- Study Details -->
						<div class="space-y-3 text-sm">
							<div class="flex justify-between">
								<span class="text-slate-500 font-medium">
									{($locale || 'en') === 'ar' ? 'الموقع:' : 'Location:'}
								</span>
								<span class="text-slate-700 dark:text-slate-300 font-semibold">
									{($locale || 'en') === 'ar' ? study.location : study.locationEn}
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 font-medium">
									{($locale || 'en') === 'ar' ? 'المدة:' : 'Duration:'}
								</span>
								<span class="text-slate-700 dark:text-slate-300 font-semibold">
									{($locale || 'en') === 'ar' ? study.duration : study.durationEn}
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-500 font-medium">
									{($locale || 'en') === 'ar' ? 'الفريق:' : 'Team:'}
								</span>
								<span class="text-slate-700 dark:text-slate-300 font-semibold">
									{($locale || 'en') === 'ar' ? study.team : study.teamEn}
								</span>
							</div>
							<div class="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
								<span class="text-slate-500 font-medium">
									{($locale || 'en') === 'ar' ? 'النتيجة:' : 'Result:'}
								</span>
								<span class={`text-emerald-600 dark:text-emerald-400 font-bold`}>
									{($locale || 'en') === 'ar' ? study.result : study.resultEn}
								</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'الفوائد الرئيسية' : 'Key Benefits'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'الفوائد التي ستحصل عليها من خدمة تقييم الصناعة المتخصصة'
					: 'Benefits you will gain from our specialized industry assessment service'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each benefits as benefit, index}
				<div class={`flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;" in:fly={{ x: -20, delay: index * 100 }}>
					<CheckCircle class={`w-6 h-6 text-emerald-500 mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0`} />
					<span class="text-slate-700 dark:text-slate-300 font-medium">
						{($locale || 'en') === 'ar' ? benefit.text : benefit.textEn}
					</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Testimonials Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'شهادات العملاء' : 'Client Testimonials'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' ? 'ما يقوله عملاؤنا عن خدماتنا المتميزة' : 'What our clients say about our excellent services'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each testimonials as testimonial, index}
				<div class={`bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<!-- Rating Stars -->
					<div class="flex items-center mb-6">
						{#each Array(testimonial.rating) as _, i}
							<Star class="w-5 h-5 text-amber-400 fill-current" />
						{/each}
					</div>
					
					<!-- Quote -->
					<blockquote class="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
						"{($locale || 'en') === 'ar' ? testimonial.quote : testimonial.quoteEn}"
					</blockquote>
					
					<!-- Author -->
					<div class="flex items-center">
						<div class={`w-12 h-12 bg-gradient-to-br ${serviceData.color} rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0`}>
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
<section class={`py-24 bg-gradient-to-r ${serviceData.color} relative overflow-hidden`}>
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
		</div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
			<div class="text-8xl mb-8 animate-bounce-gentle">🏭</div>
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-6">
				{($locale || 'en') === 'ar' ? 'هل تحتاج تقييماً صناعياً متخصصاً؟' : 'Need Specialized Industry Assessment?'}
			</h2>
			<p class="text-xl text-blue-100 mb-8 leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'فريقنا من الخبراء المتخصصين جاهز لتقديم تحليل صناعي شامل ومعمق يساعدك في اتخاذ قرارات استراتيجية مدروسة'
					: 'Our team of specialized experts is ready to provide comprehensive and in-depth industry analysis to help you make informed strategic decisions'
				}
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a 
					href="/contact" 
					class="group inline-flex items-center justify-center px-12 py-5 bg-white text-blue-600 font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl hover:bg-blue-50"
				>
					<span class="flex items-center gap-3">
						{($locale || 'en') === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
						<ArrowRight class="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
					</span>
				</a>
				<a 
					href="/services" 
					class="inline-flex items-center justify-center px-12 py-5 border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
				>
					{($locale || 'en') === 'ar' ? 'استكشف خدماتنا الأخرى' : 'Explore Our Other Services'}
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Import all animations from main services page */
	@keyframes slide-up-bounce {
		0% { opacity: 0; transform: translateY(60px) scale(0.95); }
		60% { opacity: 0.8; transform: translateY(-10px) scale(1.02); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes fade-in-up-advanced {
		0% { opacity: 0; transform: translateY(30px) scale(0.9); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes scale-in-advanced {
		0% { opacity: 0; transform: scale(0.7); }
		100% { opacity: 1; transform: scale(1); }
	}

	@keyframes gradient-flow {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) scale(1); }
		50% { transform: translateY(-30px) scale(1.1); }
	}

	@keyframes float-reverse {
		0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
		50% { transform: translateY(25px) scale(0.9) rotate(180deg); }
	}

	@keyframes pulse-subtle {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.05); }
	}

	@keyframes float-particle {
		0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
		50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
	}

	@keyframes light-ray {
		0%, 100% { opacity: 0.2; transform: scaleY(1); }
		50% { opacity: 0.6; transform: scaleY(1.2); }
	}

	@keyframes light-ray-reverse {
		0%, 100% { opacity: 0.3; transform: scaleY(1) rotate(-12deg); }
		50% { opacity: 0.7; transform: scaleY(1.3) rotate(-12deg); }
	}

	@keyframes count-up-advanced {
		0% { opacity: 0; transform: translateY(20px) scale(0.8); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes bounce-gentle {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
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
	.animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }

	.bg-300\% { background-size: 300% 300%; }
	.shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }

	/* GPU Acceleration */
	.animate-float-slow, .animate-float-reverse, .animate-pulse-subtle, .animate-gradient-flow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Dark mode enhancements */
	.dark .backdrop-blur-xl {
		backdrop-filter: blur(24px) saturate(180%);
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		*, *::before, *::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		h1 { font-size: 2.25rem !important; line-height: 1.1; }
	}
</style>