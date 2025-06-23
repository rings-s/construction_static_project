<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Users, Award, Globe, Zap } from 'lucide-svelte';
	
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import TestimonialSection from '$lib/components/TestimonialSection.svelte';
	import { APP_CONFIG, COMPANY_STATS } from '$lib/config/app.js';

	let mounted = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
  
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 30 }, (_, i) => ({
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
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	const services = [
		{
			title: 'تخطيط النقل',
			titleEn: 'Transport Planning',
			description: 'خدمات تخطيط النقل الاستراتيجية للحلول المستدامة والفعالة للتنقل',
			descriptionEn: 'Strategic transport planning services for sustainable and efficient mobility solutions',
			href: '/transport-planning',
			icon: '🗺️',
			features: ['دراسات الجدوى', 'التخطيط الرئيسي', 'الوصول للموقع', 'خطط السفر']
		},
		{
			title: 'هندسة المرور',
			titleEn: 'Traffic Engineering',
			description: 'حلول هندسة مرور متقدمة للتحديات المعقدة في النقل',
			descriptionEn: 'Advanced traffic engineering solutions for complex transportation challenges',
			href: '/traffic-engineering',
			icon: '🚦',
			features: ['نمذجة المرور', 'تقييم التأثير', 'حلول ITS', 'هندسة السلامة']
		},
		{
			title: 'هندسة الطرق السريعة',
			titleEn: 'Highway Engineering',
			description: 'خدمات شاملة لتصميم وهندسة الطرق السريعة لتطوير البنية التحتية الحديثة',
			descriptionEn: 'Comprehensive highway design and engineering services for modern infrastructure development',
			href: '/highway-engineering', 
			icon: '🛣️',
			features: ['تصميم مواقف السيارات', 'إدارة المرور', 'تصميم التقاطعات', 'الحلول المستدامة']
		}
	];
  
	// Use COMPANY_STATS from config
	const stats = COMPANY_STATS.map(stat => ({
		value: stat.number,
		label: ($locale || 'en') === 'ar' ? stat.label : stat.labelEn
	}));
  
	const features = [
		{
			icon: Users,
			title: ($locale || 'en') === 'ar' ? 'فريق خبراء' : 'Expert Team',
			description: ($locale || 'en') === 'ar' ? 'مهندسون ومخططون مؤهلون تأهيلاً عالياً مع خبرة واسعة في الصناعة' : 'Highly qualified engineers and planners with extensive industry experience'
		},
		{
			icon: Award,
			title: ($locale || 'en') === 'ar' ? 'حائز على جوائز' : 'Award Winning',
			description: ($locale || 'en') === 'ar' ? 'معترف به للتميز في هندسة النقل والحلول المبتكرة' : 'Recognized for excellence in transport engineering and innovative solutions'
		},
		{
			icon: Globe,
			title: ($locale || 'en') === 'ar' ? 'انتشار عالمي' : 'Global Reach',
			description: ($locale || 'en') === 'ar' ? 'مشاريع دولية عبر أسواق وبيئات تنظيمية متنوعة' : 'International projects across diverse markets and regulatory environments'
		},
		{
			icon: Zap,
			title: ($locale || 'en') === 'ar' ? 'الابتكار أولاً' : 'Innovation First',
			description: ($locale || 'en') === 'ar' ? 'تكنولوجيا وأساليب متطورة لنتائج مشاريع متفوقة' : 'Cutting-edge technology and methodologies for superior project outcomes'
		}
	];
</script>
  
<svelte:head>
	<title>{($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn} - {($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
</svelte:head>
  
<!-- Hero Section -->
<Hero />
  
<!-- Enhanced Services Overview -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;">
	
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each particles.slice(0, 15) as particle}
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
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدماتنا الأساسية' : 'Our Core Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'حلول هندسة النقل الشاملة المصممة لمواجهة تحديات تطوير البنية التحتية الحديثة'
					: 'Comprehensive transport engineering solutions designed to meet the challenges of modern infrastructure development'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</section>
  

<!-- Enhanced Features Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;">
	
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each particles.slice(15) as particle}
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
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'نجمع بين الخبرة التقنية والأساليب المبتكرة لتقديم نتائج استثنائية لكل مشروع'
					: 'We combine technical expertise with innovative approaches to deliver exceptional results for every project'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature, index}
				<div class={`text-center group transition-all duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 shadow-xl">
						<svelte:component this={feature.icon} class="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
					</div>
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
						{feature.title}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
  

<!-- Enhanced CTA Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروعك؟' : 'Ready to Start Your Project?'}
		</h2>
		<p class="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
			{($locale || 'en') === 'ar' 
				? 'دع فريقنا من الخبراء يساعدك في إنشاء حلول نقل مبتكرة تحقق النجاح'
				: 'Let our expert team help you create innovative transport solutions that drive success'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-white text-emerald-600 font-black rounded-2xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ اليوم' : 'Get Started Today'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/services" 
				class="inline-flex items-center justify-center px-12 py-5 border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
			</a>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
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

	.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse {
		will-change: transform;
		transform: translateZ(0);
	}
</style>