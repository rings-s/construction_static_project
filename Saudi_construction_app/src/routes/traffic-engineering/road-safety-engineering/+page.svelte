<!-- src/routes/transport-planning/road-safety-engineering/+page.svelte -->
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
		Construction
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
			icon: FileSearch,
			title: 'تحليل بيانات الحوادث السابقة',
			titleEn: 'Past Collision Data Analysis',
			description: 'تحليل شامل لبيانات الحوادث المرورية السابقة واستخراج أنماط وأسباب الحوادث لتطوير حلول فعالة',
			descriptionEn: 'Comprehensive interrogation of past collision data to extract patterns and causes for developing effective solutions',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/collision-analysis.jpg'
		},
		{
			icon: Eye,
			title: 'التحقيقات الميدانية',
			titleEn: 'On-Site Safety Investigations',
			description: 'تحقيقات ميدانية شاملة لتحليل سلوك السائقين والبيئة المحيطة بالطريق لتحديد مشاكل السلامة المحتملة',
			descriptionEn: 'Comprehensive on-site investigations analyzing driver behavior and surrounding highway environment to identify potential safety issues',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/site-investigation.jpg'
		},
		{
			icon: Users,
			title: 'تحليل سلوك السائقين',
			titleEn: 'Driver Behavior Analysis',
			description: 'دراسة وتحليل أنماط سلوك السائقين وتأثيرها على سلامة الطريق لتطوير تدابير وقائية مناسبة',
			descriptionEn: 'Studying and analyzing driver behavior patterns and their impact on road safety to develop appropriate preventive measures',
			color: 'from-blue-500 to-purple-600',
			image: '/images/features/driver-behavior.jpg'
		},
		{
			icon: Construction,
			title: 'تصميمات السلامة المرورية',
			titleEn: 'Road Safety Design Solutions',
			description: 'تطوير تصميمات مبتكرة للطرق تركز على تقليل أو القضاء على مشاكل السلامة المرورية',
			descriptionEn: 'Developing innovative road designs focused on reducing or eliminating road safety issues',
			color: 'from-amber-500 to-emerald-600',
			image: '/images/features/safety-design.jpg'
		},
		{
			icon: Shield,
			title: 'مراجعة تدقيق السلامة المرورية',
			titleEn: 'Road Safety Audit Review',
			description: 'مراجعة التصميمات المقترحة من قبل مدققين محترفين للسلامة المرورية والتعاون لحل أي مخاوف',
			descriptionEn: 'Review of proposed designs by professional Road Safety Auditors (RSA) with collaboration to resolve any concerns',
			color: 'from-green-500 to-blue-600',
			image: '/images/features/safety-audit.jpg'
		},
		{
			icon: Calculator,
			title: 'تحليل الكلفة والعائد',
			titleEn: 'Cost-Benefit Analysis',
			description: 'تقديم خيارات تصميم قصيرة وطويلة المدى مع تقديرات التكلفة ونسب الفائدة إلى التكلفة',
			descriptionEn: 'Providing short/long-term design options with cost estimates and benefit cost ratios',
			color: 'from-indigo-500 to-purple-600',
			image: '/images/features/cost-benefit.jpg'
		}
	];

	const benefits = [
		{
			title: 'تقليل الحوادث المرورية',
			titleEn: 'Road Casualty Reduction',
			description: 'نؤمن بأن تقليل الحوادث المرورية يكمن في التصميم الصحيح للطرق وتطبيق معايير السلامة المتقدمة',
			descriptionEn: 'We believe road casualty reduction is in the road design through proper engineering and advanced safety standards',
			image: '/images/benefits/casualty-reduction.jpg'
		},
		{
			title: 'تحليل شامل وقائم على البيانات',
			titleEn: 'Comprehensive Data-Driven Analysis',
			description: 'خبرتنا في السلامة المرورية وتحليل بيانات الحوادث توفر لعملائنا تصميمات فعالة لتقليل مشاكل السلامة',
			descriptionEn: 'Our road safety expertise and collision data analysis provide clients with effective designs to reduce safety issues',
			image: '/images/benefits/data-analysis.jpg'
		},
		{
			title: 'حلول مصممة خصيصاً',
			titleEn: 'Tailored Safety Solutions',
			description: 'تطوير حلول سلامة مخصصة لكل موقع بناءً على التحليل المفصل للظروف المحلية والمخاطر المحددة',
			descriptionEn: 'Developing customized safety solutions for each location based on detailed analysis of local conditions and specific risks',
			image: '/images/benefits/tailored-solutions.jpg'
		}
	];

	const stats = [
		{ 
			value: '300+', 
			label: 'مشروع سلامة مروري مكتمل', 
			labelEn: 'Completed Road Safety Projects', 
			icon: Shield,
			color: 'from-emerald-500 to-blue-600'
		},
		{ 
			value: '75%', 
			label: 'تقليل في الحوادث', 
			labelEn: 'Accident Reduction Rate', 
			icon: TrendingUp,
			color: 'from-blue-500 to-purple-600'
		},
		{ 
			value: '12+', 
			label: 'سنة خبرة في السلامة المرورية', 
			labelEn: 'Years Road Safety Experience', 
			icon: Award,
			color: 'from-purple-500 to-emerald-600'
		},
		{ 
			value: '100%', 
			label: 'رضا العملاء', 
			labelEn: 'Client Satisfaction', 
			icon: CheckCircle,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const contactInfo = {
		ukPhone: '+44 1206 414 930',
		auPhone: '+61 493 846 727',
		mobile: '+44 7960 221 333',
		address: '1 Station Court, Station Approach, Wickford, Essex, SS11 7AT, UK',
		company: 'Ayen Consulting Ltd'
	};

	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}

	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'هندسة السلامة المرورية' : 'Road Safety Engineering'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات هندسة السلامة المرورية المتخصصة - نؤمن أن تقليل الحوادث المرورية يكمن في التصميم الصحيح للطرق' : 'Specialized Road Safety Engineering services - We believe road casualty reduction is in the road design'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Geometric Grid -->
		<svg class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" viewBox="0 0 1200 800">
			<defs>
				<pattern id="safetyGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
				</pattern>
				<linearGradient id="safetyWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.4"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.4"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#safetyGrid)" />
			
			<!-- Animated Safety Lines -->
			<path d="M0,200 Q300,100 600,200 T1200,200" stroke="url(#safetyWave)" stroke-width="4" fill="none" opacity="0.6" class="safety-line-1"/>
			<path d="M0,400 Q400,300 800,400 T1200,400" stroke="url(#safetyWave)" stroke-width="3" fill="none" opacity="0.5" class="safety-line-2"/>
			<path d="M0,600 Q200,500 400,600 T1200,600" stroke="url(#safetyWave)" stroke-width="2" fill="none" opacity="0.4" class="safety-line-3"/>
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
			<div class="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Shield class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🛡️</span>
				{($locale || 'en') === 'ar' ? 'هندسة السلامة المرورية' : 'Road Safety Engineering'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'هندسة السلامة' : 'Road Safety'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'المرورية' : 'Engineering'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'نؤمن أن تقليل الحوادث المرورية يكمن في التصميم الصحيح للطرق'
						: 'We believe road casualty reduction is in the road design'
					}
				</p>
				
				<!-- Contact Info -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center text-lg font-bold">
					<div class="flex items-center gap-2">
						<span class="text-2xl">🇬🇧</span>
						<a href={`tel:${contactInfo.ukPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
							{contactInfo.ukPhone}
						</a>
					</div>
					<div class="text-slate-400">OR</div>
					<div class="flex items-center gap-2">
						<span class="text-2xl">🇦🇺</span>
						<a href={`tel:${contactInfo.auPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
							{contactInfo.auPhone}
						</a>
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
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles.slice(0, 25) as particle}
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
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات هندسة السلامة المرورية' : 'Road Safety Engineering Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'حلول متخصصة لتحليل وتحسين سلامة الطرق من خلال التصميم الهندسي المتقدم'
					: 'Specialized solutions for analyzing and improving road safety through advanced engineering design'
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
					<div class={`relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300 ${stat.color ? 'bg-gradient-to-br ' + stat.color : ''}`}>
						<svelte:component this={stat.icon} class="relative z-10 w-10 h-10 text-white drop-shadow-lg" />
						<div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
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
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدمات هندسة السلامة المرورية أن تحسن من أمان مشروعك' : 'Discover how Road Safety Engineering services can enhance your project safety'}
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
							<div class="text-center">
								<div class="text-6xl mb-4">🛡️</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-bold">
									{($locale || 'en') === 'ar' ? 'فائدة سلامة' : 'Safety Benefit'}
								</div>
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

<!-- Enhanced CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل تحتاج حلول هندسة السلامة المرورية؟' : 'Need Road Safety Engineering Solutions?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'خبراؤنا في هندسة السلامة المرورية جاهزون لمساعدتك في تطوير تصميمات آمنة وفعالة لمشروعك'
				: 'Our road safety engineering experts are ready to help you develop safe and effective designs for your project'
			}
		</p>
		
		<!-- Contact Options -->
		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="bg-slate-50 dark:bg-slate-800 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
				<div class="text-2xl mb-3">🇬🇧</div>
				<div class="font-bold text-slate-700 dark:text-slate-300 mb-2">UK Office</div>
				<a href={`tel:${contactInfo.ukPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-bold">
					{contactInfo.ukPhone}
				</a>
			</div>
			<div class="bg-slate-50 dark:bg-slate-800 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
				<div class="text-2xl mb-3">🇦🇺</div>
				<div class="font-bold text-slate-700 dark:text-slate-300 mb-2">AU Office</div>
				<a href={`tel:${contactInfo.auPhone}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-bold">
					{contactInfo.auPhone}
				</a>
			</div>
			<div class="bg-slate-50 dark:bg-slate-800 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
				<div class="text-2xl mb-3">📱</div>
				<div class="font-bold text-slate-700 dark:text-slate-300 mb-2">Mobile</div>
				<a href={`tel:${contactInfo.mobile}`} class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-bold">
					{contactInfo.mobile}
				</a>
			</div>
		</div>
		
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'احصل على استشارة' : 'Get Consultation'}
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

	@keyframes light-ray-slow {
		0%, 100% { 
			opacity: 0.1; 
			transform: scaleY(1) rotate(6deg);
		}
		50% { 
			opacity: 0.4; 
			transform: scaleY(1.1) rotate(6deg);
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

	@keyframes safety-line-flow {
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
	.animate-light-ray-slow { animation: light-ray-slow 12s ease-in-out infinite; }
	.animate-count-up-advanced { animation: count-up-advanced 1s ease-out; }
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }
	
	/* Safety Animation */
	.safety-line-1 {
		stroke-dasharray: 20 10;
		animation: safety-line-flow 4s linear infinite;
	}
	
	.safety-line-2 {
		stroke-dasharray: 15 8;
		animation: safety-line-flow 5s linear infinite reverse;
	}
	
	.safety-line-3 {
		stroke-dasharray: 10 5;
		animation: safety-line-flow 6s linear infinite;
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