<!-- src/lib/components/Hero.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, Play, Star, Quote, Sparkles } from 'lucide-svelte';
	import { APP_CONFIG, COMPANY_STATS, TESTIMONIALS } from '$lib/config/app.js';
  
	let mounted = $state(false);
	let heroSection = $state(null);
	let currentTestimonial = $state(0);
	let currentFeature = $state(0);
	let mousePosition = $state({ x: 0, y: 0 });
	let isIntersecting = $state(false);
  
	// Enhanced features with more dynamic content
	const features = [
	  {
		icon: '🛣️',
		title: 'هندسة الطرق السريعة المتقدمة',
		titleEn: 'Advanced Highway Engineering',
		description: 'تصميم طرق ذكية ومستدامة باستخدام أحدث التقنيات',
		descriptionEn: 'Smart and sustainable road design using cutting-edge technology',
		color: 'from-emerald-500 to-teal-600'
	  },
	  {
		icon: '🚦',
		title: 'أنظمة المرور الذكية',
		titleEn: 'Intelligent Traffic Systems',
		description: 'حلول مرورية متطورة لتحسين تدفق المركبات',
		descriptionEn: 'Advanced traffic solutions for optimized vehicle flow',
		color: 'from-blue-500 to-indigo-600'
	  },
	  {
		icon: '🗺️',
		title: 'التخطيط الحضري المستدام',
		titleEn: 'Sustainable Urban Planning',
		description: 'تخطيط مدن المستقبل بمعايير بيئية متقدمة',
		descriptionEn: 'Future city planning with advanced environmental standards',
		color: 'from-purple-500 to-pink-600'
	  }
	];

	let observer;
  
	onMount(() => {
	  mounted = true;
	  
	  // Intersection Observer for scroll-triggered animations
	  if (heroSection) {
		observer = new IntersectionObserver(
		  (entries) => {
			entries.forEach((entry) => {
			  isIntersecting = entry.isIntersecting;
			});
		  },
		  { threshold: 0.1 }
		);
		observer.observe(heroSection);
	  }
	  
	  // Mouse tracking for parallax effects
	  const handleMouseMove = (e) => {
		mousePosition = {
		  x: (e.clientX / window.innerWidth) * 100,
		  y: (e.clientY / window.innerHeight) * 100
		};
	  };
	  
	  window.addEventListener('mousemove', handleMouseMove);
	  
	  // Rotate through features with dynamic timing
	  const featureInterval = setInterval(() => {
		currentFeature = (currentFeature + 1) % features.length;
	  }, 4000);
  
	  // Rotate through testimonials
	  const testimonialInterval = setInterval(() => {
		currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
	  }, 6000);
  
	  return () => {
		if (observer) observer.disconnect();
		window.removeEventListener('mousemove', handleMouseMove);
		clearInterval(featureInterval);
		clearInterval(testimonialInterval);
	  };
	});
  </script>
  
  <section 
	bind:this={heroSection} 
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;"
  >
	
	<!-- Enhanced Dynamic Background -->
	<div class="absolute inset-0 opacity-30 dark:opacity-20">
	  <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.4">
			  <animate attributeName="stop-opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
			</stop>
			<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.3">
			  <animate attributeName="stop-opacity" values="0.1;0.5;0.1" dur="6s" repeatCount="indefinite"/>
			</stop>
			<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.4">
			  <animate attributeName="stop-opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite"/>
			</stop>
		  </linearGradient>
		  
		  <pattern id="modernGrid" width="60" height="60" patternUnits="userSpaceOnUse">
			<circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.1">
			  <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
			</circle>
			<path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.05"/>
		  </pattern>
		</defs>
		
		<!-- Animated grid background -->
		<rect width="100%" height="100%" fill="url(#modernGrid)" />
		
		<!-- Floating geometric shapes -->
		{#each Array(12) as _, i}
		  <g class="floating-element" style="animation-delay: {i * 0.5}s;">
			<circle 
			  cx="{100 + i * 100}" 
			  cy="{150 + (i % 3) * 200}" 
			  r="{20 + (i % 4) * 10}" 
			  fill="url(#dynamicGradient)" 
			  opacity="0.6"
			>
			  <animateTransform 
				attributeName="transform" 
				type="translate" 
				values="0,0; {10 + i * 2},{-20 + i * 3}; 0,0" 
				dur="{8 + i * 0.5}s" 
				repeatCount="indefinite"
			  />
			  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="{6 + i * 0.3}s" repeatCount="indefinite"/>
			</circle>
		  </g>
		{/each}
		
		<!-- Dynamic construction elements -->
		<g class="construction-elements">
		  <!-- Advanced crane with realistic movement -->
		  <g transform="translate(200,100)">
			<rect x="-3" y="0" width="6" height="250" fill="#f59e0b" opacity="0.7">
			  <animateTransform attributeName="transform" type="rotate" values="0;8;-8;0" dur="12s" repeatCount="indefinite"/>
			</rect>
			<rect x="-80" y="25" width="160" height="4" fill="#f59e0b" opacity="0.7">
			  <animateTransform attributeName="transform" type="rotate" values="0;15;-15;0" dur="10s" repeatCount="indefinite"/>
			</rect>
			<circle cx="0" cy="15" r="12" fill="#dc2626" opacity="0.8">
			  <animate attributeName="r" values="10;16;10" dur="6s" repeatCount="indefinite"/>
			</circle>
		  </g>
		  
		  <!-- Moving vehicles with realistic physics -->
		  <g class="vehicle-convoy">
			{#each Array(3) as _, i}
			  <g>
				<rect x="-20" y="-10" width="40" height="20" rx="6" fill="#059669" opacity="0.8">
				  <animateMotion dur="{18 + i * 2}s" repeatCount="indefinite">
					<path d="M-50,{320 + i * 40} Q600,{300 + i * 40} 1250,{320 + i * 40}"/>
				  </animateMotion>
				</rect>
				<circle cx="-10" cy="8" r="5" fill="#1f2937" opacity="0.9">
				  <animateMotion dur="{18 + i * 2}s" repeatCount="indefinite">
					<path d="M-50,{320 + i * 40} Q600,{300 + i * 40} 1250,{320 + i * 40}"/>
				  </animateMotion>
				</circle>
				<circle cx="10" cy="8" r="5" fill="#1f2937" opacity="0.9">
				  <animateMotion dur="{18 + i * 2}s" repeatCount="indefinite">
					<path d="M-50,{320 + i * 40} Q600,{300 + i * 40} 1250,{320 + i * 40}"/>
				  </animateMotion>
				</circle>
			  </g>
			{/each}
		  </g>
		</g>
	  </svg>
	</div>

	<!-- Floating particles with mouse interaction -->
	<div class="absolute inset-0 pointer-events-none">
	  {#each Array(20) as _, i}
		<div 
		  class="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float-particle"
		  style="
			left: {10 + (i * 4.5)}%;
			top: {20 + (i * 3)}%;
			animation-delay: {i * 0.2}s;
			transform: translate(calc(var(--mouse-x) * 0.{i + 1}px), calc(var(--mouse-y) * 0.{i + 1}px));
		  "
		></div>
	  {/each}
	</div>
  
	<!-- Main Content Container -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="grid lg:grid-cols-2 gap-20 items-center">
		
		<!-- Left Column - Enhanced Content -->
		<div class="text-left space-y-10">
		  
		  <!-- Animated Badge with Sparkle Effect -->
		  <div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-700 text-sm font-bold transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-xl`}>
			<div class="relative mr-3 rtl:ml-3 rtl:mr-0">
			  <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
			  <Sparkles class="absolute -top-1 -right-1 w-3 h-3 text-emerald-400 animate-spin-slow" />
			</div>
			<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🏗️</span>
			<span class="font-semibold">{($locale || 'en') === 'ar' ? APP_CONFIG.location : APP_CONFIG.locationEn}</span>
		  </div>
  
		  <!-- Enhanced Main Title with Gradient Animation -->
		  <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
			<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
			  <span class="block bg-gradient-to-r from-emerald-600 via-slate-700 to-emerald-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
				{APP_CONFIG.name}
			  </span>
			  <span class="block text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-6 animate-fade-in-delayed">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </span>
			</h1>
		  </div>
  
		  <!-- Enhanced Description with Typewriter Effect -->
		  <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
			<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
			  {($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
			</p>
			<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
			  {($locale || 'en') === 'ar' 
				? 'خبرة تمتد لأكثر من 20 عاماً في تقديم حلول هندسية مبتكرة ومستدامة'
				: 'Over 20 years of experience delivering innovative and sustainable engineering solutions'
			  }
			</p>
		  </div>
  
		  <!-- Enhanced CTA Buttons with Hover Effects -->
		  <div class={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-600 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
			<a 
			  href="/services" 
			  class="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
			>
			  <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
			  <span class="relative mr-3 rtl:ml-3 rtl:mr-0 text-xl group-hover:scale-110 transition-transform duration-300">🚀</span>
			  <span class="relative">{($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}</span>
			  <ArrowRight class="relative ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			
			<a 
			  href="/about" 
			  class="group inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-lg font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg"
			>
			  <Play class="mr-3 rtl:ml-3 rtl:mr-0 w-6 h-6 transition-transform group-hover:scale-110 duration-300" />
			  <span>{($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn About Us'}</span>
			</a>
		  </div>
  
		  <!-- Enhanced Stats with Counter Animation -->
		  <div class={`grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-700 transition-all duration-1000 delay-800 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
			{#each COMPANY_STATS.slice(0, 2) as stat, index}
			  <div class="text-center sm:text-left group" style="animation-delay: {index * 0.2}s;">
				<div class="flex items-center justify-center sm:justify-start mb-3">
				  <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
					<span class="text-2xl group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
				  </div>
				</div>
				<div class="text-4xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 animate-count-up">
				  {stat.number}
				</div>
				<div class="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">
				  {($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
				</div>
			  </div>
			{/each}
		  </div>
		</div>
  
		<!-- Right Column - Interactive Visual Elements -->
		<div class="relative">
		  
		  <!-- Main Feature Card with Advanced Animation -->
		  <div class={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 transform transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up-float' : 'opacity-0'} hover:shadow-3xl hover:scale-105`}>
			
			<!-- Gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-slate-50/50 dark:from-emerald-900/20 dark:to-slate-800/20 rounded-3xl"></div>
			
			<div class="relative z-10">
			  <!-- Header with enhanced design -->
			  <div class="flex items-center justify-between mb-8">
				<div>
				  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
					{($locale || 'en') === 'ar' ? 'خبراتنا المتخصصة' : 'Our Specialized Expertise'}
				  </h3>
				  <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">
					{($locale || 'en') === 'ar' ? 'حلول متطورة لمشاريع المستقبل' : 'Advanced solutions for future projects'}
				  </p>
				</div>
				<div class={`w-20 h-20 bg-gradient-to-br ${features[currentFeature].color} rounded-3xl flex items-center justify-center animate-pulse-glow shadow-lg`}>
				  <span class="text-4xl">{features[currentFeature].icon}</span>
				</div>
			  </div>
	
			  <!-- Rotating Features with enhanced transitions -->
			  <div class="space-y-6 mb-8">
				{#each features as feature, index}
				  <div class={`transition-all duration-700 ease-out ${index === currentFeature ? 'opacity-100 scale-100 translate-x-0' : 'opacity-40 scale-95 translate-x-4'}`}>
					<div class={`p-4 rounded-2xl ${index === currentFeature ? 'bg-white/60 dark:bg-slate-700/60 shadow-lg' : ''} transition-all duration-500`}>
					  <div class="flex items-start space-x-4 rtl:space-x-reverse">
						<div class={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce-subtle shadow-md`}>
						  <span class="text-2xl">{feature.icon}</span>
						</div>
						<div class="flex-1">
						  <h4 class="font-bold text-slate-900 dark:text-white mb-2 text-lg">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						  </h4>
						  <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						  </p>
						</div>
					  </div>
					</div>
				  </div>
				{/each}
			  </div>
	
			  <!-- Enhanced Progress Indicators -->
			  <div class="flex space-x-2 rtl:space-x-reverse">
				{#each features as _, index}
				  <div class={`h-2 flex-1 rounded-full transition-all duration-500 ${
					index === currentFeature 
					  ? `bg-gradient-to-r ${features[index].color} animate-pulse shadow-md` 
					  : 'bg-slate-200 dark:bg-slate-700'
				  }`}></div>
				{/each}
			  </div>
			</div>
		  </div>
  
		  <!-- Enhanced Floating Testimonial Card -->
		  <div class={`absolute -top-8 -right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 max-w-xs transform transition-all duration-1000 delay-700 ${mounted ? 'animate-float-gentle' : 'opacity-0'} hover:shadow-2xl hover:scale-105`}>
			
			<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl"></div>
			
			<div class="relative z-10">
			  <!-- Testimonial Header -->
			  <div class="flex items-center mb-4">
				<div class="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 shadow-lg">
				  <span class="text-3xl">{TESTIMONIALS[currentTestimonial].avatar}</span>
				</div>
				<div>
				  <div class="flex mb-1">
					{#each Array(TESTIMONIALS[currentTestimonial].rating) as _, starIndex}
					  <Star class="w-4 h-4 text-yellow-500 fill-current animate-twinkle" style="animation-delay: {starIndex * 0.1}s;" />
					{/each}
				  </div>
				  <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">
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
			  
			  <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
				- {TESTIMONIALS[currentTestimonial].author}
			  </div>
			</div>
		  </div>
  
		  <!-- Enhanced Achievement Card -->
		  <div class={`absolute -bottom-8 -left-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transform transition-all duration-1000 delay-900 ${mounted ? 'animate-float-gentle' : 'opacity-0'} hover:shadow-2xl hover:scale-105`} style="animation-delay: 1.5s;">
			
			<div class="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl"></div>
			
			<div class="relative z-10 flex items-center space-x-4 rtl:space-x-reverse">
			  <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center shadow-lg">
				<span class="text-3xl animate-bounce-gentle">🏆</span>
			  </div>
			  <div>
				<div class="text-3xl font-black text-slate-900 dark:text-white animate-count-up">500+</div>
				<div class="text-xs text-slate-600 dark:text-slate-300 font-semibold">
				  {($locale || 'en') === 'ar' ? 'مشروع ناجح' : 'Successful Projects'}
				</div>
			  </div>
			</div>
		  </div>
  
		  <!-- Enhanced Background Accent -->
		  <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl transform rotate-3 -z-10 opacity-50 animate-pulse-subtle"></div>
		</div>
	  </div>
	</div>
  
	<!-- Enhanced Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
	  <div class="w-8 h-12 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center animate-pulse-border relative">
		<div class="w-1 h-4 bg-emerald-500 rounded-full mt-2 animate-scroll-indicator"></div>
		<div class="absolute -bottom-6 text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
		  {($locale || 'en') === 'ar' ? 'مرر للأسفل' : 'Scroll Down'}
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

	@keyframes slide-up-float {
	  0% {
		opacity: 0;
		transform: translateY(40px) scale(0.95);
	  }
	  100% {
		opacity: 1;
		transform: translateY(0) scale(1);
	  }
	}

	@keyframes float-gentle {
	  0%, 100% { 
		transform: translateY(0px) rotate(0deg) scale(1); 
	  }
	  25% { 
		transform: translateY(-8px) rotate(1deg) scale(1.02); 
	  }
	  75% { 
		transform: translateY(-4px) rotate(-1deg) scale(0.98); 
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

	@keyframes bounce-gentle {
	  0%, 100% { 
		transform: translateY(0px) scale(1); 
	  }
	  50% { 
		transform: translateY(-8px) scale(1.05); 
	  }
	}

	@keyframes bounce-subtle {
	  0%, 100% { 
		transform: scale(1) rotate(0deg); 
	  }
	  50% { 
		transform: scale(1.05) rotate(2deg); 
	  }
	}

	@keyframes pulse-glow {
	  0%, 100% { 
		box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2);
		transform: scale(1);
	  }
	  50% { 
		box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
		transform: scale(1.05);
	  }
	}

	@keyframes gradient-x {
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
		transform: scale(1.1); 
	  }
	}

	@keyframes spin-slow {
	  from { 
		transform: rotate(0deg); 
	  }
	  to { 
		transform: rotate(360deg); 
	  }
	}

	@keyframes count-up {
	  from { 
		opacity: 0; 
		transform: translateY(20px) scale(0.9); 
	  }
	  to { 
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

	@keyframes pulse-border {
	  0%, 100% { 
		border-color: rgba(148, 163, 184, 0.5); 
	  }
	  50% { 
		border-color: rgba(16, 185, 129, 0.8); 
	  }
	}

	@keyframes scroll-indicator {
	  0% { 
		transform: translateY(0px); 
		opacity: 1; 
	  }
	  50% { 
		transform: translateY(8px); 
		opacity: 0.5; 
	  }
	  100% { 
		transform: translateY(0px); 
		opacity: 1; 
	  }
	}

	@keyframes pulse-subtle {
	  0%, 100% { 
		opacity: 0.5; 
	  }
	  50% { 
		opacity: 0.7; 
	  }
	}

	/* Animation Classes */
	.animate-slide-up-bounce {
	  animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.animate-slide-up-float {
	  animation: slide-up-float 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.animate-float-gentle {
	  animation: float-gentle 6s ease-in-out infinite;
	}

	.animate-float-particle {
	  animation: float-particle 4s ease-in-out infinite;
	}

	.animate-bounce-gentle {
	  animation: bounce-gentle 3s ease-in-out infinite;
	}

	.animate-bounce-subtle {
	  animation: bounce-subtle 3s ease-in-out infinite;
	}

	.animate-pulse-glow {
	  animation: pulse-glow 3s ease-in-out infinite;
	}

	.animate-gradient-x {
	  animation: gradient-x 8s ease infinite;
	}

	.animate-twinkle {
	  animation: twinkle 2s ease-in-out infinite;
	}

	.animate-spin-slow {
	  animation: spin-slow 8s linear infinite;
	}

	.animate-count-up {
	  animation: count-up 1s ease-out;
	}

	.animate-fade-in-delayed {
	  animation: fade-in-delayed 2s ease-out;
	}

	.animate-pulse-border {
	  animation: pulse-border 3s ease-in-out infinite;
	}

	.animate-scroll-indicator {
	  animation: scroll-indicator 2s ease-in-out infinite;
	}

	.animate-pulse-subtle {
	  animation: pulse-subtle 4s ease-in-out infinite;
	}

	/* Utility Classes */
	.bg-300\% {
	  background-size: 300% 300%;
	}

	.shadow-3xl {
	  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}

	/* GPU Acceleration */
	.floating-element,
	.vehicle-convoy,
	.construction-elements {
	  will-change: transform;
	}

	/* RTL Support */
	[dir="rtl"] .group-hover\:translate-x-1 {
	  transform: translateX(-0.25rem);
	}

	/* Dark mode enhancements */
	.dark .backdrop-blur-xl {
	  backdrop-filter: blur(24px) saturate(180%);
	}

	/* Performance optimizations */
	.transform {
	  will-change: transform;
	}

	.transition-all {
	  will-change: auto;
	}

	/* Reduced motion support */
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