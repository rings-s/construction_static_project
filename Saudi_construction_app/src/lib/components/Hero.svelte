<!-- src/lib/components/Hero.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, Play, Star, Quote } from 'lucide-svelte';
	import { APP_CONFIG, COMPANY_STATS, TESTIMONIALS } from '$lib/config/app.js';
  
	let mounted = $state(false);
	let heroSection = $state(null);
	let currentTestimonial = $state(0);
	let currentFeature = $state(0);
  
	// Enhanced features for rotation
	const features = [
	  {
		icon: '🛣️',
		title: 'هندسة الطرق السريعة',
		titleEn: 'Highway Engineering',
		description: 'تصميم وهندسة طرق سريعة متطورة',
		descriptionEn: 'Advanced highway design and engineering'
	  },
	  {
		icon: '🚦',
		title: 'هندسة المرور',
		titleEn: 'Traffic Engineering',
		description: 'إدارة وتحسين أنظمة المرور الذكية',
		descriptionEn: 'Intelligent traffic management and optimization'
	  },
	  {
		icon: '🗺️',
		title: 'تخطيط النقل',
		titleEn: 'Transport Planning',
		description: 'تخطيط استراتيجي للتنقل المستدام',
		descriptionEn: 'Strategic planning for sustainable mobility'
	  }
	];
  
	onMount(() => {
	  mounted = true;
	  
	  // Rotate through features
	  const featureInterval = setInterval(() => {
		currentFeature = (currentFeature + 1) % features.length;
	  }, 3000);
  
	  // Rotate through testimonials
	  const testimonialInterval = setInterval(() => {
		currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
	  }, 5000);
  
	  return () => {
		clearInterval(featureInterval);
		clearInterval(testimonialInterval);
	  };
	});
  </script>
  
  <section bind:this={heroSection} class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Animated Construction Background SVG -->
	<div class="absolute inset-0 opacity-20">
	  <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="constructionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
			<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
		  </linearGradient>
		  
		  <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
			<path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
		  </pattern>
		</defs>
		
		<!-- Grid Background -->
		<rect width="100%" height="100%" fill="url(#gridPattern)" />
		
		<!-- Animated Highway Roads -->
		<path class="highway-line-1" d="M0,300 Q300,200 600,300 T1200,300" 
			  stroke="url(#constructionGradient)" stroke-width="6" fill="none" opacity="0.7"/>
		<path class="highway-line-2" d="M0,400 Q400,350 800,400 T1200,400" 
			  stroke="url(#constructionGradient)" stroke-width="4" fill="none" opacity="0.5"/>
		<path class="highway-line-3" d="M0,500 Q200,450 400,500 T1200,500" 
			  stroke="url(#constructionGradient)" stroke-width="3" fill="none" opacity="0.4"/>
		
		<!-- Animated Construction Elements -->
		<!-- Crane 1 -->
		<g class="construction-crane-1" transform="translate(200,150)">
		  <rect x="-2" y="0" width="4" height="200" fill="#f59e0b" opacity="0.6">
			<animateTransform attributeName="transform" type="rotate" values="0;5;-5;0" dur="8s" repeatCount="indefinite"/>
		  </rect>
		  <rect x="-50" y="20" width="100" height="3" fill="#f59e0b" opacity="0.6">
			<animateTransform attributeName="transform" type="rotate" values="0;10;-10;0" dur="6s" repeatCount="indefinite"/>
		  </rect>
		  <circle cx="0" cy="10" r="8" fill="#dc2626" opacity="0.7">
			<animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite"/>
		  </circle>
		</g>
		
		<!-- Crane 2 -->
		<g class="construction-crane-2" transform="translate(800,100)">
		  <rect x="-2" y="0" width="4" height="250" fill="#059669" opacity="0.6">
			<animateTransform attributeName="transform" type="rotate" values="0;-3;3;0" dur="10s" repeatCount="indefinite"/>
		  </rect>
		  <rect x="-60" y="30" width="120" height="3" fill="#059669" opacity="0.6">
			<animateTransform attributeName="transform" type="rotate" values="0;-8;8;0" dur="7s" repeatCount="indefinite"/>
		  </rect>
		  <circle cx="0" cy="15" r="10" fill="#dc2626" opacity="0.7">
			<animate attributeName="r" values="10;14;10" dur="5s" repeatCount="indefinite"/>
		  </circle>
		</g>
		
		<!-- Moving Construction Vehicles -->
		<g class="construction-vehicle-1">
		  <rect x="-15" y="-8" width="30" height="16" rx="4" fill="#f59e0b" opacity="0.7">
			<animateMotion dur="15s" repeatCount="indefinite">
			  <path d="M0,350 L1200,350"/>
			</animateMotion>
		  </rect>
		  <circle cx="-8" cy="6" r="4" fill="#1f2937" opacity="0.8">
			<animateMotion dur="15s" repeatCount="indefinite">
			  <path d="M0,350 L1200,350"/>
			</animateMotion>
		  </circle>
		  <circle cx="8" cy="6" r="4" fill="#1f2937" opacity="0.8">
			<animateMotion dur="15s" repeatCount="indefinite">
			  <path d="M0,350 L1200,350"/>
			</animateMotion>
		  </circle>
		</g>
		
		<!-- Building Structures -->
		{#each Array(8) as _, i}
		  <rect x="{100 + i * 140}" y="{600 - (i * 40)}" width="60" height="{100 + (i * 40)}" 
				fill="url(#constructionGradient)" opacity="0.3" rx="4">
			<animate attributeName="height" values="{100 + (i * 40)};{120 + (i * 40)};{100 + (i * 40)}" 
					 dur="{4 + i * 0.5}s" repeatCount="indefinite"/>
		  </rect>
		{/each}
		
		<!-- Floating Particles -->
		{#each Array(20) as _, i}
		  <circle class="floating-particle-{i}" r="{2 + Math.random() * 3}" fill="#059669" opacity="0.4">
			<animate attributeName="cx" values="0;1200;0" dur="{12 + i * 0.8}s" repeatCount="indefinite"/>
			<animate attributeName="cy" values="{100 + i * 25};{150 + i * 25};{100 + i * 25}" 
					 dur="{8 + i * 0.4}s" repeatCount="indefinite"/>
			<animate attributeName="opacity" values="0.2;0.6;0.2" dur="{5 + i * 0.3}s" repeatCount="indefinite"/>
		  </circle>
		{/each}
	  </svg>
	</div>
  
	<!-- Main Content Container -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="grid lg:grid-cols-2 gap-16 items-center">
		
		<!-- Left Column - Main Content -->
		<div class="text-left space-y-8">
		  
		  <!-- Animated Badge -->
		  <div class={`inline-flex items-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-700 text-sm font-semibold transition-all duration-1000 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
			<div class="w-3 h-3 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
			<span class="mr-2 rtl:ml-2 rtl:mr-0">🏗️</span>
			{($locale || 'en') === 'ar' ? APP_CONFIG.location : APP_CONFIG.locationEn}
		  </div>
  
		  <!-- Extra Bold Main Title with Animation -->
		  <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
			<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
			  <span class="block bg-gradient-to-r from-emerald-600 via-slate-700 to-emerald-600 bg-clip-text text-transparent animate-gradient">
				{APP_CONFIG.name}
			  </span>
			  <span class="block text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-4 animate-fade-in-delayed">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </span>
			</h1>
		  </div>
  
		  <!-- Animated Description -->
		  <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
			<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
			  {($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
			</p>
			<p class="text-lg text-slate-500 dark:text-slate-400">
			  خبرة تمتد لأكثر من 20 عاماً في تقديم خدمات الطرق والنقل والتخطيط والتصميم
			</p>
		  </div>
  
		  <!-- Animated CTA Buttons -->
		  <div class={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-600 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
			<a 
			  href="/services" 
			  class="group inline-flex items-center justify-center px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse-shadow"
			>
			  <span class="mr-3 rtl:ml-3 rtl:mr-0 text-xl">🚀</span>
			  {($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}
			  <ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			
			<a 
			  href="/about" 
			  class="group inline-flex items-center justify-center px-10 py-5 border-3 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-lg font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-emerald-400"
			>
			  <Play class="mr-3 rtl:ml-3 rtl:mr-0 w-6 h-6 transition-transform group-hover:scale-110" />
			  {($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn About Us'}
			</a>
		  </div>
  
		  <!-- Animated Quick Stats -->
		  <div class={`grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700 transition-all duration-1000 delay-800 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
			{#each COMPANY_STATS.slice(0, 2) as stat, index}
			  <div class="text-center sm:text-left group animate-stats-float" style="animation-delay: {index * 0.2}s;">
				<div class="flex items-center justify-center sm:justify-start mb-2">
				  <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
					<span class="text-xl">{stat.icon}</span>
				  </div>
				</div>
				<div class="text-3xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors animate-count-up">
				  {stat.number}
				</div>
				<div class="text-sm text-slate-600 dark:text-slate-400 font-medium">
				  {($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
				</div>
			  </div>
			{/each}
		  </div>
		</div>
  
		<!-- Right Column - Interactive Visual Elements -->
		<div class="relative">
		  
		  <!-- Main Feature Card with Rotation -->
		  <div class={`bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 transform transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
			
			<!-- Header -->
			<div class="flex items-center justify-between mb-8">
			  <div>
				<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
				  {($locale || 'en') === 'ar' ? 'خبراتنا' : 'Our Expertise'}
				</h3>
				<p class="text-sm text-slate-600 dark:text-slate-400">
				  {($locale || 'en') === 'ar' ? '20+ سنة من التميز' : '20+ Years of Excellence'}
				</p>
			  </div>
			  <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
				<span class="text-3xl">{features[currentFeature].icon}</span>
			  </div>
			</div>
  
			<!-- Rotating Features -->
			<div class="space-y-6 mb-8">
			  {#each features as feature, index}
				<div class={`transition-all duration-700 ${index === currentFeature ? 'opacity-100 scale-100 translate-x-0' : 'opacity-30 scale-95 translate-x-4'}`}>
				  <div class="flex items-start space-x-4 rtl:space-x-reverse">
					<div class="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 animate-bounce-subtle">
					  <span class="text-xl">{feature.icon}</span>
					</div>
					<div>
					  <h4 class="font-bold text-slate-900 dark:text-white mb-1">
						{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
					  </h4>
					  <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
					  </p>
					</div>
				  </div>
				</div>
			  {/each}
			</div>
  
			<!-- Progress Indicators -->
			<div class="flex space-x-2 rtl:space-x-reverse">
			  {#each features as _, index}
				<div class={`h-2 flex-1 rounded-full transition-all duration-500 ${
				  index === currentFeature ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'
				}`}></div>
			  {/each}
			</div>
		  </div>
  
		  <!-- Floating Testimonial Card -->
		  <div class={`absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 max-w-xs transform transition-all duration-1000 delay-700 ${mounted ? 'animate-float' : 'opacity-0'}`}>
			
			<!-- Testimonial Header -->
			<div class="flex items-center mb-4">
			  <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
				<span class="text-2xl">{TESTIMONIALS[currentTestimonial].avatar}</span>
			  </div>
			  <div>
				<div class="flex mb-1">
				  {#each Array(TESTIMONIALS[currentTestimonial].rating) as _}
					<Star class="w-4 h-4 text-yellow-500 fill-current" />
				  {/each}
				</div>
				<div class="text-xs text-slate-600 dark:text-slate-400">
				  {($locale || 'en') === 'ar' ? 'عميل راضٍ' : 'Satisfied Client'}
				</div>
			  </div>
			</div>
			
			<!-- Testimonial Content -->
			<blockquote class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 italic">
			  "{($locale || 'en') === 'ar' 
				? TESTIMONIALS[currentTestimonial].content.substring(0, 80) + '...' 
				: TESTIMONIALS[currentTestimonial].contentEn.substring(0, 80) + '...'
			  }"
			</blockquote>
			
			<div class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
			  - {TESTIMONIALS[currentTestimonial].author}
			</div>
		  </div>
  
		  <!-- Floating Achievement Card -->
		  <div class={`absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 transform transition-all duration-1000 delay-900 ${mounted ? 'animate-float' : 'opacity-0'}`} style="animation-delay: 1.5s;">
			<div class="flex items-center space-x-3 rtl:space-x-reverse">
			  <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
				<span class="text-2xl">🏆</span>
			  </div>
			  <div>
				<div class="text-2xl font-black text-slate-900 dark:text-white animate-count-up">500+</div>
				<div class="text-xs text-slate-600 dark:text-slate-300 font-medium">
				  {($locale || 'en') === 'ar' ? 'مشروع ناجح' : 'Successful Projects'}
				</div>
			  </div>
			</div>
		  </div>
  
		  <!-- Background Accent -->
		  <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl transform rotate-3 -z-10 opacity-50 animate-pulse-subtle"></div>
		</div>
	  </div>
	</div>
  
	<!-- Animated Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
	  <div class="w-8 h-12 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center animate-pulse-border">
		<div class="w-1 h-4 bg-emerald-500 rounded-full mt-2 animate-scroll-indicator"></div>
	  </div>
	</div>
  </section>
  
  <style>
	/* Advanced Animation Keyframes */
	@keyframes slideInLeft {
	  from {
		opacity: 0;
		transform: translateX(-50px);
	  }
	  to {
		opacity: 1;
		transform: translateX(0);
	  }
	}
	
	@keyframes slideInRight {
	  from {
		opacity: 0;
		transform: translateX(50px);
	  }
	  to {
		opacity: 1;
		transform: translateX(0);
	  }
	}
	
	@keyframes float {
	  0%, 100% { transform: translateY(0px) rotate(0deg); }
	  25% { transform: translateY(-5px) rotate(1deg); }
	  75% { transform: translateY(-3px) rotate(-1deg); }
	}
	
	@keyframes statsFloat {
	  0%, 100% { transform: translateY(0px); }
	  50% { transform: translateY(-8px); }
	}
	
	@keyframes bounceGentle {
	  0%, 100% { transform: translateY(0px); }
	  50% { transform: translateY(-15px); }
	}
	
	@keyframes bounceSubtle {
	  0%, 100% { transform: scale(1); }
	  50% { transform: scale(1.05); }
	}
	
	@keyframes pulseGlow {
	  0%, 100% { 
		box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
		transform: scale(1);
	  }
	  50% { 
		box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
		transform: scale(1.05);
	  }
	}
	
	@keyframes pulseShadow {
	  0%, 100% { box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2); }
	  50% { box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4); }
	}
	
	@keyframes pulseSubtle {
	  0%, 100% { opacity: 0.5; }
	  50% { opacity: 0.7; }
	}
	
	@keyframes gradient {
	  0%, 100% { background-position: 0% 50%; }
	  50% { background-position: 100% 50%; }
	}
	
	@keyframes scrollIndicator {
	  0% { transform: translateY(0px); opacity: 1; }
	  50% { transform: translateY(8px); opacity: 0.5; }
	  100% { transform: translateY(0px); opacity: 1; }
	}
	
	@keyframes countUp {
	  from { opacity: 0; transform: translateY(20px); }
	  to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes fadeInDelayed {
	  0%, 20% { opacity: 0; transform: translateY(10px); }
	  100% { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes pulseBorder {
	  0%, 100% { border-color: rgba(148, 163, 184, 0.5); }
	  50% { border-color: rgba(16, 185, 129, 0.8); }
	}
  
	/* Highway Animation */
	.highway-line-1 {
	  stroke-dasharray: 30 15;
	  animation: lineFlow 6s linear infinite;
	}
	
	.highway-line-2 {
	  stroke-dasharray: 20 10;
	  animation: lineFlow 8s linear infinite reverse;
	}
	
	.highway-line-3 {
	  stroke-dasharray: 15 8;
	  animation: lineFlow 10s linear infinite;
	}
	
	@keyframes lineFlow {
	  to { stroke-dashoffset: -200; }
	}
	
	/* Animation Classes */
	.animate-slide-in-left {
	  animation: slideInLeft 0.8s ease-out forwards;
	}
	
	.animate-slide-in-right {
	  animation: slideInRight 0.8s ease-out forwards;
	}
	
	.animate-float {
	  animation: float 4s ease-in-out infinite;
	}
	
	.animate-stats-float {
	  animation: statsFloat 3s ease-in-out infinite;
	}
	
	.animate-bounce-gentle {
	  animation: bounceGentle 2s ease-in-out infinite;
	}
	
	.animate-bounce-subtle {
	  animation: bounceSubtle 2s ease-in-out infinite;
	}
	
	.animate-pulse-glow {
	  animation: pulseGlow 2s ease-in-out infinite;
	}
	
	.animate-pulse-shadow {
	  animation: pulseShadow 3s ease-in-out infinite;
	}
	
	.animate-pulse-subtle {
	  animation: pulseSubtle 4s ease-in-out infinite;
	}
	
	.animate-gradient {
	  background-size: 200% 200%;
	  animation: gradient 4s ease infinite;
	}
	
	.animate-scroll-indicator {
	  animation: scrollIndicator 2s ease-in-out infinite;
	}
	
	.animate-count-up {
	  animation: countUp 1s ease-out;
	}
	
	.animate-fade-in-delayed {
	  animation: fadeInDelayed 2s ease-out;
	}
	
	.animate-pulse-border {
	  animation: pulseBorder 2s ease-in-out infinite;
	}
  </style>