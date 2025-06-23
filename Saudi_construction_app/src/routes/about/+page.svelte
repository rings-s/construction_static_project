<!-- src/routes/about/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { CheckCircle, Users, Target, Award, Globe, Calendar, Star, Quote, TrendingUp, Zap, Building2 } from 'lucide-svelte';
	import { APP_CONFIG, TESTIMONIALS } from '$lib/config/app.js';
  
	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let currentTestimonial = $state(0);
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
  
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 40 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.4 + 0.2
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			mousePosition = {
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			};
		};
		
		window.addEventListener('mousemove', handleMouseMove);
	  
		// Intersection Observer for scroll animations
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
	
		document.querySelectorAll('[data-animate]').forEach(el => {
			observer.observe(el);
		});
	
		// Rotate testimonials
		const testimonialInterval = setInterval(() => {
			currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
		}, 4000);
	
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			observer.disconnect();
			clearInterval(testimonialInterval);
		};
	});
  
	const values = [
		{
			icon: Target,
			title: ($locale || 'en') === 'ar' ? 'الابتكار في كل مشروع' : 'Innovation in Every Project',
			color: 'from-emerald-500 to-emerald-600',
			description: ($locale || 'en') === 'ar' ? 'نطبق أحدث التقنيات والأساليب المبتكرة' : 'Applying latest technologies and innovative methods'
		},
		{
			icon: Award,
			title: ($locale || 'en') === 'ar' ? 'التميز التقني والنزاهة المهنية' : 'Technical Excellence & Professional Integrity',
			color: 'from-slate-500 to-slate-600',
			description: ($locale || 'en') === 'ar' ? 'معايير عالية من الجودة والأخلاق المهنية' : 'High standards of quality and professional ethics'
		},
		{
			icon: Users,
			title: ($locale || 'en') === 'ar' ? 'النهج التعاوني مع العملاء' : 'Collaborative Approach with Clients',
			color: 'from-blue-500 to-blue-600',
			description: ($locale || 'en') === 'ar' ? 'شراكة حقيقية مع عملائنا لتحقيق النجاح' : 'True partnership with our clients for success'
		},
		{
			icon: Globe,
			title: ($locale || 'en') === 'ar' ? 'الالتزام بالمسؤولية البيئية' : 'Environmental Responsibility',
			color: 'from-green-500 to-green-600',
			description: ($locale || 'en') === 'ar' ? 'حلول مستدامة تحترم البيئة' : 'Sustainable solutions that respect the environment'
		}
	];
  
	const aboutStats = [
		{
			icon: Calendar,
			value: "20+",
			label: ($locale || 'en') === 'ar' ? 'سنة من الخبرة' : 'Years Experience',
			color: "text-emerald-600"
		},
		{
			icon: CheckCircle,
			value: "500+",
			label: ($locale || 'en') === 'ar' ? 'مشروع مكتمل' : 'Projects Completed',
			color: "text-emerald-600"
		},
		{
			icon: Globe,
			value: ($locale || 'en') === 'ar' ? 'انتشار عالمي' : 'Global Reach',
			label: ($locale || 'en') === 'ar' ? 'حضور دولي' : 'International Presence',
			color: "text-emerald-600"
		},
		{
			icon: TrendingUp,
			value: "98%",
			label: ($locale || 'en') === 'ar' ? 'رضا العملاء' : 'Client Satisfaction',
			color: "text-emerald-600"
		}
	];

		// In your component script section, add:
	const saudiTestimonials = [
		{
			content: "خدمة ممتازة ومهنية جداً قدمتها شركتنا لدعم مشروع الطرق الجديد. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً.",
			contentEn: "Excellent and very professional service provided by our company to support the new highway project. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale.",
			author: "أحمد الغامدي", 
			company: "مجلس منطقة الرياض، المملكة العربية السعودية",
			rating: 5,
			avatar: "👨‍💼"
		},
		{
			content: "تقدم نادي كرة القدم الخاص بنا بطلب لبناء مرافق رياضية جديدة. المشروع له تحديات معقدة حول مواقف السيارات وإدارة المرور. كنادي لم تكن لدينا خبرة أو معرفة بهذا الأمر واحتجنا إلى استشاري للعمل معه.",
			contentEn: "Our football club submitted an application to build new sports facilities. The project has some complicated challenges around car parking and traffic management. As a club we had no experience or knowledge with regards to this and needed a consultant to work with.",
			author: "محمد السعيد",
			company: "نادي الشباب الرياضي، جدة، المملكة العربية السعودية", 
			rating: 5,
			avatar: "⚽"
		},
		{
			content: "خدمة رائعة ورسوم هندسية احترافية ممتازة للمشروع الحضري الجديد.",
			contentEn: "Great service and fantastic professional drawings for the new urban development project.",
			author: "سارة القحطاني",
			company: "شركة التطوير العمراني، الدمام، المملكة العربية السعودية",
			rating: 5,
			avatar: "🏗️"
		}
	];

	// Update the testimonial rotation to use Saudi testimonials
	const testimonialInterval = setInterval(() => {
		currentTestimonial = (currentTestimonial + 1) % saudiTestimonials.length;
	}, 4000);
  
	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
</script>
  
<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'من نحن' : 'About Us'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
</svelte:head>
  
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-float-reverse"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Geometric Grid -->
		<svg class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" viewBox="0 0 1200 800">
			<defs>
				<pattern id="aboutGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
				</pattern>
				<linearGradient id="aboutWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.4"/>
					<stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.6"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.4"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#aboutGrid)" />
			
			<!-- Animated Waves -->
			<path d="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z" fill="url(#aboutWaveGradient)" opacity="0.1">
				<animate attributeName="d" values="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z;M0,420 Q300,370 600,420 T1200,420 L1200,0 L0,0 Z;M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z" dur="8s" repeatCount="indefinite"/>
			</path>
		</svg>
		
		<!-- Floating Particles -->
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
						transform: translate(calc(var(--mouse-x) * 0.{Math.floor(particle.id % 10) + 1}px), calc(var(--mouse-y) * 0.{Math.floor(particle.id % 10) + 1}px));
					"
				></div>
			{/each}
		</div>

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
			<div class="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-amber-400 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Calendar class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🏗️</span>
				{($locale || 'en') === 'ar' ? 'عقدان من التميز' : 'Two Decades of Excellence'}
			</div>
	
			<!-- Enhanced Main Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}
					</span>
					<span class="block text-3xl md:text-4xl font-black text-slate-700 dark:text-slate-300 mt-4 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
					</span>
				</h1>
			</div>
	
			<!-- Enhanced Description -->
			<div class={`max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p>
					{($locale || 'en') === 'ar' 
						? 'تتمتع شركتنا بسجل مثبت لمدة 20 عاماً في تقديم خدمات الطرق والنقل والتخطيط والتصميم للعملاء في القطاعين الخاص والعام، محلياً ودولياً.'
						: 'Our company has a proven 20-year record in providing highway, transport, planning and design services to clients in the private and public sectors, nationally and internationally.'
					}
				</p>
			</div>
		</div>
	</div>
</section>
  
<!-- Company Introduction with Enhanced Animations -->
<section id="intro" data-animate class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			
			<div class={`space-y-8 ${isVisible('intro') ? 'animate-slide-in-left-advanced' : 'opacity-0'}`}>
				<div>
					<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
						{($locale || 'en') === 'ar' ? 'عقدان من التميز الهندسي' : 'Two Decades of Engineering Excellence'}
					</h2>
					<div class="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						<p>
							{($locale || 'en') === 'ar'
								? 'لقد وفرت خبرتنا ومعرفتنا راحة البال لعملائنا في تحقيق أهدافهم بجودة عالية من البداية إلى الانتهاء.'
								: 'Our experience and knowledge have provided peace of mind to our clients in achieving their objectives with a quality output from start to completion.'
							}
						</p>
						<p>
							{($locale || 'en') === 'ar'
								? 'نهدف إلى تقديم وثائق تقنية وتصميمية متخصصة في الصناعة لمساعدة ودعم مشاريع عملائنا.'
								: 'We aim to provide expert industry technical and design documents to assist and support our clients\' projects.'
							}
						</p>
						<p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
							{($locale || 'en') === 'ar'
								? 'نعمل معك لضمان تحقيق هدف مشروعك ورؤيتك.'
								: 'We work with you to ensure your project objective and vision come to fruition.'
							}
						</p>
					</div>
				</div>
				
				<!-- Enhanced Key Highlights -->
				<div class="grid grid-cols-2 gap-6">
					<div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl p-6 text-center animate-float-gentle shadow-xl border border-emerald-200/50 dark:border-emerald-700/50">
						<div class="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2 animate-count-up">20+</div>
						<div class="text-slate-600 dark:text-slate-300 font-bold">
							{($locale || 'en') === 'ar' ? 'سنة خبرة' : 'Years Experience'}
						</div>
					</div>
					<div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 rounded-3xl p-6 text-center animate-float-gentle shadow-xl border border-slate-200/50 dark:border-slate-700/50" style="animation-delay: 0.5s;">
						<div class="text-4xl font-black text-slate-600 dark:text-slate-400 mb-2 animate-count-up">500+</div>
						<div class="text-slate-600 dark:text-slate-300 font-bold">
							{($locale || 'en') === 'ar' ? 'مشروع ناجح' : 'Projects Delivered'}
						</div>
					</div>
				</div>
			</div>
			
			<!-- Enhanced Interactive Visual Element -->
			<div class={`relative ${isVisible('intro') ? 'animate-slide-in-right-advanced' : 'opacity-0'}`}>
				<div class="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative shadow-2xl">
					
					<!-- Enhanced Construction Progress Animation -->
					<svg viewBox="0 0 400 400" class="w-full h-full p-8">
						<defs>
							<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:#10b981"/>
								<stop offset="50%" style="stop-color:#06b6d4"/>
								<stop offset="100%" style="stop-color:#8b5cf6"/>
							</linearGradient>
						</defs>
						
						<!-- Enhanced Building Construction Timeline -->
						{#each Array(6) as _, i}
							<rect x="{50 + i * 50}" y="{300 - (i * 40)}" width="30" height="{100 + (i * 40)}" 
								fill="url(#progressGradient)" opacity="0.8" rx="4"
								class="construction-timeline-advanced" style="animation-delay: {i * 0.2}s;">
							</rect>
						{/each}
						
						<!-- Enhanced Progress Indicators -->
						<circle cx="200" cy="200" r="80" fill="none" stroke="url(#progressGradient)" 
							stroke-width="8" stroke-dasharray="502" stroke-dashoffset="502"
							class="progress-circle-advanced">
						</circle>
						
						<!-- Enhanced Center Achievement -->
						<circle cx="200" cy="200" r="40" fill="url(#progressGradient)" opacity="0.9"
							class="achievement-center-advanced">
						</circle>
						<text x="200" y="210" text-anchor="middle" fill="white" font-size="24" font-weight="bold">20+</text>
					</svg>
				</div>
				
				<!-- Enhanced Floating Achievement Cards -->
				<div class="absolute -top-6 -right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 animate-float-advanced">
					<div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">98%</div>
					<div class="text-slate-600 dark:text-slate-300 text-sm font-bold">
						{($locale || 'en') === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}
					</div>
				</div>
				
				<div class="absolute -bottom-6 -left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 animate-float-reverse-advanced" style="animation-delay: 1s;">
					<div class="text-2xl font-black text-slate-600 dark:text-slate-400 mb-1">
						{($locale || 'en') === 'ar' ? 'عالمي' : 'Global'}
					</div>
					<div class="text-slate-600 dark:text-slate-300 text-sm font-bold">
						{($locale || 'en') === 'ar' ? 'انتشار دولي' : 'International Reach'}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
  
<!-- Enhanced Mission & Vision Section -->
<section id="mission" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'مهمتنا ورؤيتنا' : 'Our Mission & Vision'}
			</h2>
		</div>
	
		<div class="grid lg:grid-cols-2 gap-16">
			<div class={`${isVisible('mission') ? 'animate-slide-in-left-advanced' : 'opacity-0'}`}>
				<div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 h-full relative overflow-hidden">
					
					<!-- Enhanced Construction Icon Animation -->
					<div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow-advanced shadow-xl">
						<Target class="w-10 h-10 text-white" />
					</div>
					
					<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4">
						{($locale || 'en') === 'ar' ? 'مهمتنا' : 'Our Mission'}
					</h3>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar'
							? 'تقديم حلول هندسة النقل والطرق السريعة المتطورة التي تعزز الاتصال، وتعزز الاستدامة، وتحسن نوعية الحياة للمجتمعات في جميع أنحاء العالم.'
							: 'To deliver cutting-edge transport and highway engineering solutions that enhance connectivity, promote sustainability, and improve quality of life for communities worldwide.'
						}
					</p>
					
					<!-- Enhanced Background Construction Element -->
					<div class="absolute bottom-0 right-0 opacity-10 animate-float-gentle">
						<svg width="120" height="120" viewBox="0 0 120 120">
							<rect x="20" y="40" width="80" height="60" fill="currentColor" rx="4"/>
							<rect x="30" y="20" width="60" height="20" fill="currentColor" rx="2"/>
						</svg>
					</div>
				</div>
			</div>
			
			<div class={`${isVisible('mission') ? 'animate-slide-in-right-advanced' : 'opacity-0'}`}>
				<div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 h-full relative overflow-hidden">
					
					<div class="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow-advanced shadow-xl" style="animation-delay: 0.5s;">
						<Zap class="w-10 h-10 text-white" />
					</div>
					
					<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4">
						{($locale || 'en') === 'ar' ? 'رؤيتنا' : 'Our Vision'}
					</h3>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar'
							? 'أن نكون الشركة الاستشارية الرائدة في هندسة النقل، معترف بها للابتكار والتميز التقني والالتزام بالتنمية المستدامة.'
							: 'To be the leading consultancy in transport engineering, recognized for innovation, technical excellence, and commitment to sustainable development.'
						}
					</p>
					
					<!-- Enhanced Background Construction Element -->
					<div class="absolute bottom-0 right-0 opacity-10 animate-float-reverse">
						<svg width="120" height="120" viewBox="0 0 120 120">
							<circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" stroke-width="8"/>
							<path d="M30,60 L60,30 L90,60" fill="none" stroke="currentColor" stroke-width="4"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
  
<!-- Enhanced Core Values Section -->
<section id="values" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each Array(20) as _, i}
				<div 
					class="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float-particle"
					style="
						left: {10 + (i * 4.5)}%;
						top: {20 + (i * 3)}%;
						animation-delay: {i * 0.3}s;
						opacity: 0.3;
					"
				></div>
			{/each}
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'المبادئ الأساسية التي توجه نهجنا في كل مشروع وعلاقة عميل'
					: 'The fundamental principles that guide our approach to every project and client relationship'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
			{#each values as value, index}
				<div class={`group relative ${isVisible('values') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<!-- Main Card -->
					<div class="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-105">
						
						<!-- Background Gradient -->
						<div class={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
						
						<!-- Enhanced Icon Container -->
						<div class="relative mb-8">
							<div class={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}>
								
								<!-- Icon Background Effect -->
								<div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
								
								<!-- Custom Icons Based on Value -->
								{#if index === 0}
									<!-- Innovation Icon -->
									<svg class="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								{:else if index === 1}
									<!-- Excellence Icon -->
									<svg class="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
									</svg>
								{:else if index === 2}
									<!-- Collaboration Icon -->
									<svg class="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
								{:else}
									<!-- Environmental Icon -->
									<svg class="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
									</svg>
								{/if}
								
								<!-- Animated Ring -->
								<div class="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-all duration-500 group-hover:scale-110"></div>
							</div>
							
							<!-- Floating Indicator -->
							<div class={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce`}>
								<div class="w-2 h-2 bg-white rounded-full"></div>
							</div>
						</div>
						
						<!-- Content -->
						<div class="text-center relative z-10">
							<h3 class="text-lg font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
								{value.title}
							</h3>
							<p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
								{value.description}
							</p>
						</div>
						
						<!-- Bottom Accent -->
						<div class={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
					</div>
					
					<!-- Floating Background Elements -->
					<div class={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 transform rotate-3 scale-105`}></div>
				</div>
			{/each}
		</div>

		<!-- Enhanced Bottom Section -->
		<div class="mt-20 text-center">
			<div class="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl p-8 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl">
				<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4">
					{($locale || 'en') === 'ar' ? 'التزامنا بالتميز' : 'Our Commitment to Excellence'}
				</h3>
				<p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
					{($locale || 'en') === 'ar'
						? 'نحن نؤمن بأن القيم الأساسية القوية هي أساس كل مشروع ناجح وعلاقة عميل دائمة'
						: 'We believe that strong core values are the foundation of every successful project and lasting client relationship'
					}
				</p>
			</div>
		</div>
	</div>
</section>
  
<!-- Enhanced Client Testimonials Section -->
<!-- Enhanced Client Testimonials Section -->
<section id="testimonials" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each Array(15) as _, i}
				<div 
					class="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float-particle"
					style="
						left: {15 + (i * 5)}%;
						top: {25 + (i * 2.5)}%;
						animation-delay: {i * 0.4}s;
						opacity: 0.4;
					"
				></div>
			{/each}
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'تعليقات حقيقية من عملاء راضين يثقون في خبرتنا' 
					: 'Real feedback from satisfied clients who trust our expertise'
				}
			</p>
		</div>

		<!-- Enhanced Featured Testimonial -->
		<div class="max-w-4xl mx-auto mb-12">
			<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden ${isVisible('testimonials') ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				
				<!-- Enhanced Decorative Quote -->
				<div class="absolute -top-4 left-8">
					<div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-xl">
						<Quote class="w-4 h-4 text-white" />
					</div>
				</div>
				
				<!-- Enhanced Avatar -->
				<div class="flex items-center mb-6">
					<div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 animate-bounce-subtle shadow-lg">
						<span class="text-2xl">{saudiTestimonials[currentTestimonial].avatar}</span>
					</div>
					
					<div>
						<div class="flex mb-2">
							{#each Array(saudiTestimonials[currentTestimonial].rating) as _, starIndex}
								<Star class="w-5 h-5 text-yellow-500 fill-current animate-twinkle" style="animation-delay: {starIndex * 0.1}s;" />
							{/each}
						</div>
						<div class="font-black text-slate-900 dark:text-white">
							{saudiTestimonials[currentTestimonial].author}
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
							{saudiTestimonials[currentTestimonial].company}
						</div>
					</div>
				</div>
				
				<!-- Enhanced Testimonial Content -->
				<blockquote class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic">
					"{($locale || 'en') === 'ar' ? saudiTestimonials[currentTestimonial].content : saudiTestimonials[currentTestimonial].contentEn}"
				</blockquote>
			</div>
		</div>

		<!-- Enhanced All Testimonials Grid -->
		<div class="grid lg:grid-cols-3 gap-8">
			{#each saudiTestimonials as testimonial, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 ${isVisible('testimonials') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 shadow-lg">
							<span class="text-xl">{testimonial.avatar}</span>
						</div>
						<div>
							<div class="flex mb-1">
								{#each Array(testimonial.rating) as _}
									<Star class="w-4 h-4 text-yellow-500 fill-current" />
								{/each}
							</div>
							<div class="text-xs text-slate-600 dark:text-slate-400 font-bold">
								{($locale || 'en') === 'ar' ? 'عميل راضٍ' : 'Satisfied Client'}
							</div>
						</div>
					</div>
					
					<blockquote class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
						"{($locale || 'en') === 'ar' 
							? testimonial.content.substring(0, 120) + '...' 
							: testimonial.contentEn.substring(0, 120) + '...'
						}"
					</blockquote>
					
					<div class="border-t border-slate-200 dark:border-slate-700 pt-4">
						<div class="font-black text-slate-900 dark:text-white text-sm">
							{testimonial.author}
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
							{testimonial.company}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
<!-- Enhanced Experience Stats Section -->
<section id="stats" data-animate class="py-24 bg-gradient-to-r from-emerald-600 via-slate-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-4">
				{($locale || 'en') === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
			</h2>
		</div>
	
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each aboutStats as stat, index}
				<div class={`text-center ${isVisible('stats') ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow-stats shadow-2xl">
						<svelte:component this={stat.icon} class={`w-10 h-10 ${stat.color}`} />
					</div>
					<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
						{stat.value}
					</div>
					<div class="text-white/80 font-bold">
						{stat.label}
					</div>
				</div>
			{/each}
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

	@keyframes slide-in-left-advanced {
		0% {
			opacity: 0;
			transform: translateX(-60px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}
	
	@keyframes slide-in-right-advanced {
		0% {
			opacity: 0;
			transform: translateX(60px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateX(0) scale(1);
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
	
	@keyframes float-gentle {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg); 
		}
		50% { 
			transform: translateY(-8px) rotate(2deg); 
		}
	}

	@keyframes float-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(-12px) rotate(2deg) scale(1.05); 
		}
		75% { 
			transform: translateY(-6px) rotate(-1deg) scale(0.95); 
		}
	}

	@keyframes float-reverse-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(8px) rotate(-2deg) scale(1.02); 
		}
		75% { 
			transform: translateY(-4px) rotate(1deg) scale(0.98); 
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

	@keyframes bounce-subtle {
		0%, 100% { 
			transform: scale(1); 
		}
		50% { 
			transform: scale(1.1); 
		}
	}
	
	@keyframes pulse-glow-advanced {
		0%, 100% { 
			box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2);
			transform: scale(1);
		}
		50% { 
			box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
			transform: scale(1.05);
		}
	}

	@keyframes pulse-glow-stats {
		0%, 100% { 
			box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
			transform: scale(1);
		}
		50% { 
			box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
			transform: scale(1.05);
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
	
	@keyframes gradient-flow {
		0%, 100% { 
			background-position: 0% 50%; 
		}
		50% { 
			background-position: 100% 50%; 
		}
	}

	@keyframes twinkle {
		0%, 100% { 
			opacity: 1; 
			transform: scale(1); 
		}
		50% { 
			opacity: 0.7; 
			transform: scale(1.2); 
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
  
	/* Construction-specific animations */
	@keyframes construction-timeline-advanced {
		0% { 
			height: 0; 
			opacity: 0; 
			transform: translateY(20px) scale(0.8); 
		}
		100% { 
			height: 100%; 
			opacity: 0.8; 
			transform: translateY(0) scale(1); 
		}
	}
	
	@keyframes progress-circle-advanced {
		0% { 
			stroke-dashoffset: 502; 
			transform: rotate(-90deg);
		}
		100% { 
			stroke-dashoffset: 0; 
			transform: rotate(-90deg);
		}
	}
	
	@keyframes achievement-center-advanced {
		0% { 
			r: 0; 
			opacity: 0; 
			transform: scale(0);
		}
		50% { 
			r: 50; 
			opacity: 0.5; 
			transform: scale(1.2);
		}
		100% { 
			r: 40; 
			opacity: 0.9; 
			transform: scale(1);
		}
	}
	
	/* Animation Classes */
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-slide-in-left-advanced { animation: slide-in-left-advanced 0.8s ease-out forwards; }
	.animate-slide-in-right-advanced { animation: slide-in-right-advanced 0.8s ease-out forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.6s ease-out forwards; }
	.animate-scale-in-advanced { animation: scale-in-advanced 0.6s ease-out forwards; }
	.animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
	.animate-float-advanced { animation: float-advanced 6s ease-in-out infinite; }
	.animate-float-reverse-advanced { animation: float-reverse-advanced 8s ease-in-out infinite; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
	.animate-pulse-glow-advanced { animation: pulse-glow-advanced 2s ease-in-out infinite; }
	.animate-pulse-glow-stats { animation: pulse-glow-stats 2s ease-in-out infinite; }
	.animate-count-up-advanced { animation: count-up-advanced 1s ease-out; }
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }
	.animate-gradient-flow { 
		background-size: 200% 200%;
		animation: gradient-flow 6s ease infinite;
	}
	.animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }
	.animate-light-ray-slow { animation: light-ray-slow 12s ease-in-out infinite; }
	
	/* Construction Animations */
	.construction-timeline-advanced { animation: construction-timeline-advanced 1s ease-out forwards; }
	.progress-circle-advanced { 
		animation: progress-circle-advanced 3s ease-out forwards;
		transform-origin: center;
	}
	.achievement-center-advanced { animation: achievement-center-advanced 2s ease-out forwards; }

	/* Utility Classes */
	.bg-300\% {
		background-size: 300% 300%;
	}

	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}

	/* GPU Acceleration */
	.animate-float-advanced,
	.animate-float-reverse-advanced,
	.animate-gradient-flow,
	.animate-pulse-glow-advanced {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.25rem !important;
			line-height: 1.1;
		}
		
		h1 span:last-child {
			font-size: 1.125rem !important;
		}
		
		p {
			font-size: 1rem !important;
		}
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
</style>