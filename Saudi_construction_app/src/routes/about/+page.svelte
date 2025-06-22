<!-- src/routes/about/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { CheckCircle, Users, Target, Award, Globe, Calendar, Star, Quote, TrendingUp, Zap, Building2 } from 'lucide-svelte';
	import { APP_CONFIG, TESTIMONIALS } from '$lib/config/app.js';
  
	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let currentTestimonial = $state(0);
  
	onMount(() => {
	  mounted = true;
	  
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
  
	function isVisible(sectionId) {
	  return visibleSections.has(sectionId);
	}
  </script>
  
  <svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'من نحن' : 'About Us'} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
  </svelte:head>
  
  <!-- Hero Section with Construction Animation -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900">
	
	<!-- Animated Construction Background -->
	<div class="absolute inset-0 opacity-20">
	  <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
			<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
		  </linearGradient>
		</defs>
		
		<!-- Building Timeline Animation -->
		{#each Array(6) as _, i}
		  <rect x="{150 + i * 180}" y="{400 - (i * 30)}" width="80" height="{200 + (i * 30)}" 
				fill="url(#aboutGradient)" opacity="0.4" rx="8"
				class="building-grow" style="animation-delay: {i * 0.5}s;">
		  </rect>
		{/each}
		
		<!-- Animated Progress Lines -->
		<path d="M0,600 Q300,550 600,600 T1200,600" 
			  stroke="url(#aboutGradient)" stroke-width="6" fill="none" opacity="0.6"
			  class="progress-line"/>
		
		<!-- Timeline Markers -->
		{#each Array(5) as _, i}
		  <circle cx="{200 + i * 200}" cy="600" r="8" fill="#059669" opacity="0.7"
				  class="timeline-marker" style="animation-delay: {i * 0.3}s;">
		  </circle>
		{/each}
	  </svg>
	</div>
  
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center">
		
		<!-- Animated Badge -->
		<div class={`inline-flex items-center px-6 py-3 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  <Calendar class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
		  <span class="mr-2 rtl:ml-2 rtl:mr-0">🏗️</span>
		  {($locale || 'en') === 'ar' ? 'عقدان من التميز' : 'Two Decades of Excellence'}
		</div>
  
		<!-- Main Title with Animation -->
		<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
			<span class="block bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent animate-gradient">
			  {APP_CONFIG.name}
			</span>
			<span class="block text-3xl md:text-4xl font-bold text-emerald-400 mt-4 animate-fade-in-delayed">
			  {($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			</span>
		  </h1>
		</div>
  
		<!-- Description with Animation -->
		<div class={`max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  <p>
			{($locale || 'en') === 'ar' 
			  ? 'تتمتع Ayen Consulting بسجل مثبت لمدة 20 عاماً في تقديم خدمات الطرق والنقل والتخطيط والتصميم للعملاء في القطاعين الخاص والعام، محلياً ودولياً.'
			  : 'Ayen Consulting has a proven 20-year record in providing highway, transport, planning and design services to clients in the private and public sectors, nationally and internationally.'
			}
		  </p>
		</div>
	  </div>
	</div>
  </section>
  
  <!-- Company Introduction with Animations -->
  <section id="intro" data-animate class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="grid lg:grid-cols-2 gap-16 items-center">
		
		<div class={`space-y-8 ${isVisible('intro') ? 'animate-slide-in-left' : 'opacity-0'}`}>
		  <div>
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
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
				  ? 'تهدف Ayen Consulting إلى تقديم وثائق تقنية وتصميمية متخصصة في الصناعة لمساعدة ودعم مشاريع عملائنا.'
				  : 'Ayen Consulting aims to provide expert industry technical and design documents to assist and support our clients\' projects.'
				}
			  </p>
			  <p class="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
				{($locale || 'en') === 'ar'
				  ? 'تعمل Ayen Consulting معك لضمان تحقيق هدف مشروعك ورؤيتك.'
				  : 'Ayen Consulting works with you to ensure your project objective and vision come to fruition.'
				}
			  </p>
			</div>
		  </div>
		  
		  <!-- Key Highlights with Animation -->
		  <div class="grid grid-cols-2 gap-6">
			<div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 text-center animate-float">
			  <div class="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2 animate-count-up">20+</div>
			  <div class="text-slate-600 dark:text-slate-300 font-medium">
				{($locale || 'en') === 'ar' ? 'سنة خبرة' : 'Years Experience'}
			  </div>
			</div>
			<div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 rounded-2xl p-6 text-center animate-float" style="animation-delay: 0.5s;">
			  <div class="text-4xl font-black text-slate-600 dark:text-slate-400 mb-2 animate-count-up">500+</div>
			  <div class="text-slate-600 dark:text-slate-300 font-medium">
				{($locale || 'en') === 'ar' ? 'مشروع ناجح' : 'Projects Delivered'}
			  </div>
			</div>
		  </div>
		</div>
		
		<!-- Interactive Visual Element -->
		<div class={`relative ${isVisible('intro') ? 'animate-slide-in-right' : 'opacity-0'}`}>
		  <div class="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative">
			
			<!-- Construction Progress Animation -->
			<svg viewBox="0 0 400 400" class="w-full h-full p-8">
			  <defs>
				<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
				  <stop offset="0%" style="stop-color:#059669"/>
				  <stop offset="50%" style="stop-color:#0d7377"/>
				  <stop offset="100%" style="stop-color:#f59e0b"/>
				</linearGradient>
			  </defs>
			  
			  <!-- Building Construction Timeline -->
			  {#each Array(6) as _, i}
				<rect x="{50 + i * 50}" y="{300 - (i * 40)}" width="30" height="{100 + (i * 40)}" 
					  fill="url(#progressGradient)" opacity="0.8" rx="4"
					  class="construction-timeline" style="animation-delay: {i * 0.2}s;">
				</rect>
			  {/each}
			  
			  <!-- Progress Indicators -->
			  <circle cx="200" cy="200" r="80" fill="none" stroke="url(#progressGradient)" 
					  stroke-width="8" stroke-dasharray="502" stroke-dashoffset="502"
					  class="progress-circle">
			  </circle>
			  
			  <!-- Center Achievement -->
			  <circle cx="200" cy="200" r="40" fill="url(#progressGradient)" opacity="0.9"
					  class="achievement-center">
			  </circle>
			  <text x="200" y="210" text-anchor="middle" fill="white" font-size="24" font-weight="bold">20+</text>
			</svg>
		  </div>
		  
		  <!-- Floating Achievement Cards -->
		  <div class="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-float">
			<div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">98%</div>
			<div class="text-slate-600 dark:text-slate-300 text-sm font-medium">
			  {($locale || 'en') === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}
			</div>
		  </div>
		  
		  <div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-float" style="animation-delay: 1s;">
			<div class="text-2xl font-black text-slate-600 dark:text-slate-400 mb-1">
			  {($locale || 'en') === 'ar' ? 'عالمي' : 'Global'}
			</div>
			<div class="text-slate-600 dark:text-slate-300 text-sm font-medium">
			  {($locale || 'en') === 'ar' ? 'انتشار دولي' : 'International Reach'}
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </section>
  
  <!-- Mission & Vision with Construction Theme -->
  <section id="mission" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'مهمتنا ورؤيتنا' : 'Our Mission & Vision'}
		</h2>
	  </div>
  
	  <div class="grid lg:grid-cols-2 gap-16">
		<div class={`${isVisible('mission') ? 'animate-slide-in-left' : 'opacity-0'}`}>
		  <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 h-full relative overflow-hidden">
			
			<!-- Construction Icon Animation -->
			<div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
			  <Target class="w-10 h-10 text-white" />
			</div>
			
			<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
			  {($locale || 'en') === 'ar' ? 'مهمتنا' : 'Our Mission'}
			</h3>
			<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
			  {($locale || 'en') === 'ar'
				? 'تقديم حلول هندسة النقل والطرق السريعة المتطورة التي تعزز الاتصال، وتعزز الاستدامة، وتحسن نوعية الحياة للمجتمعات في جميع أنحاء العالم.'
				: 'To deliver cutting-edge transport and highway engineering solutions that enhance connectivity, promote sustainability, and improve quality of life for communities worldwide.'
			  }
			</p>
			
			<!-- Background Construction Element -->
			<div class="absolute bottom-0 right-0 opacity-10">
			  <svg width="120" height="120" viewBox="0 0 120 120">
				<rect x="20" y="40" width="80" height="60" fill="currentColor" rx="4"/>
				<rect x="30" y="20" width="60" height="20" fill="currentColor" rx="2"/>
			  </svg>
			</div>
		  </div>
		</div>
		
		<div class={`${isVisible('mission') ? 'animate-slide-in-right' : 'opacity-0'}`}>
		  <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 h-full relative overflow-hidden">
			
			<div class="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow" style="animation-delay: 0.5s;">
			  <Zap class="w-10 h-10 text-white" />
			</div>
			
			<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
			  {($locale || 'en') === 'ar' ? 'رؤيتنا' : 'Our Vision'}
			</h3>
			<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
			  {($locale || 'en') === 'ar'
				? 'أن نكون الشركة الاستشارية الرائدة في هندسة النقل، معترف بها للابتكار والتميز التقني والالتزام بالتنمية المستدامة.'
				: 'To be the leading consultancy in transport engineering, recognized for innovation, technical excellence, and commitment to sustainable development.'
			  }
			</p>
			
			<!-- Background Construction Element -->
			<div class="absolute bottom-0 right-0 opacity-10">
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
  
  <!-- Core Values with Construction Animation -->
  <section id="values" data-animate class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
		  {($locale || 'en') === 'ar'
			? 'المبادئ الأساسية التي توجه نهجنا في كل مشروع وعلاقة عميل'
			: 'The fundamental principles that guide our approach to every project and client relationship'
		  }
		</p>
	  </div>
  
	  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
		{#each values as value, index}
		  <div class={`text-center group ${isVisible('values') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
			<div class="relative mb-6">
			  <div class={`w-24 h-24 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
				<svelte:component this={value.icon} class="w-12 h-12 text-white" />
			  </div>
			  <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl group-hover:from-white/30 transition-colors duration-300"></div>
			</div>
			<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
			  {value.title}
			</h3>
			<p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
			  {value.description}
			</p>
		  </div>
		{/each}
	  </div>
	</div>
  </section>
  
  <!-- Client Testimonials with Enhanced Animation -->
  <section id="testimonials" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
		  {($locale || 'en') === 'ar' 
			? 'تعليقات حقيقية من عملاء راضين يثقون في خبرتنا' 
			: 'Real feedback from satisfied clients who trust our expertise'
		  }
		</p>
	  </div>
  
	  <!-- Featured Testimonial with Animation -->
	  <div class="max-w-4xl mx-auto mb-12">
		<div class={`bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden ${isVisible('testimonials') ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  
		  <!-- Decorative Quote -->
		  <div class="absolute -top-4 left-8">
			<div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
			  <Quote class="w-4 h-4 text-white" />
			</div>
		  </div>
		  
		  <!-- Avatar -->
		  <div class="flex items-center mb-6">
			<div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 animate-bounce-subtle">
			  <span class="text-2xl">{TESTIMONIALS[currentTestimonial].avatar}</span>
			</div>
			
			<div>
			  <div class="flex mb-2">
				{#each Array(TESTIMONIALS[currentTestimonial].rating) as _, starIndex}
				  <Star class="w-5 h-5 text-yellow-500 fill-current animate-pulse" style="animation-delay: {starIndex * 0.1}s;" />
				{/each}
			  </div>
			  <div class="font-bold text-slate-900 dark:text-white">
				{TESTIMONIALS[currentTestimonial].author}
			  </div>
			  <div class="text-emerald-600 dark:text-emerald-400 text-sm">
				{TESTIMONIALS[currentTestimonial].company}
			  </div>
			</div>
		  </div>
		  
		  <!-- Testimonial Content -->
		  <blockquote class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic">
			"{($locale || 'en') === 'ar' ? TESTIMONIALS[currentTestimonial].content : TESTIMONIALS[currentTestimonial].contentEn}"
		  </blockquote>
		</div>
	  </div>
  
	  <!-- All Testimonials Grid -->
	  <div class="grid lg:grid-cols-3 gap-8">
		{#each TESTIMONIALS as testimonial, index}
		  <div class={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 ${isVisible('testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
			
			<div class="flex items-center mb-4">
			  <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
				<span class="text-xl">{testimonial.avatar}</span>
			  </div>
			  <div>
				<div class="flex mb-1">
				  {#each Array(testimonial.rating) as _}
					<Star class="w-4 h-4 text-yellow-500 fill-current" />
				  {/each}
				</div>
				<div class="text-xs text-slate-600 dark:text-slate-400">
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
			  <div class="font-bold text-slate-900 dark:text-white text-sm">
				{testimonial.author}
			  </div>
			  <div class="text-emerald-600 dark:text-emerald-400 text-xs">
				{testimonial.company}
			  </div>
			</div>
		  </div>
		{/each}
	  </div>
	</div>
  </section>
  
  <!-- Experience Stats with Construction Animation -->
  <section id="stats" data-animate class="py-24 bg-gradient-to-r from-emerald-600 via-slate-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
		</h2>
	  </div>
  
	  <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
		{#each aboutStats as stat, index}
		  <div class={`text-center ${isVisible('stats') ? 'animate-scale-in' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
			<div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
			  <svelte:component this={stat.icon} class={`w-10 h-10 ${stat.color}`} />
			</div>
			<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up">
			  {stat.value}
			</div>
			<div class="text-white/80 font-medium">
			  {stat.label}
			</div>
		  </div>
		{/each}
	  </div>
	</div>
  </section>
  
  <style>
	/* Enhanced Animation Keyframes */
	@keyframes slideInUp {
	  from { opacity: 0; transform: translateY(30px); }
	  to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes slideInLeft {
	  from { opacity: 0; transform: translateX(-50px); }
	  to { opacity: 1; transform: translateX(0); }
	}
	
	@keyframes slideInRight {
	  from { opacity: 0; transform: translateX(50px); }
	  to { opacity: 1; transform: translateX(0); }
	}
	
	@keyframes fadeInUp {
	  from { opacity: 0; transform: translateY(20px); }
	  to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes scaleIn {
	  from { opacity: 0; transform: scale(0.8); }
	  to { opacity: 1; transform: scale(1); }
	}
	
	@keyframes float {
	  0%, 100% { transform: translateY(0px); }
	  50% { transform: translateY(-10px); }
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
	
	@keyframes countUp {
	  from { opacity: 0; transform: translateY(20px); }
	  to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes fadeInDelayed {
	  0%, 20% { opacity: 0; transform: translateY(10px); }
	  100% { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes gradient {
	  0%, 100% { background-position: 0% 50%; }
	  50% { background-position: 100% 50%; }
	}
  
	/* Construction-specific animations */
	@keyframes buildingGrow {
	  from { height: 0; opacity: 0; }
	  to { height: 100%; opacity: 1; }
	}
	
	@keyframes progressLine {
	  0% { stroke-dasharray: 0 1000; }
	  100% { stroke-dasharray: 1000 0; }
	}
	
	@keyframes timelineMarker {
	  0% { r: 0; opacity: 0; }
	  50% { r: 12; opacity: 0.8; }
	  100% { r: 8; opacity: 0.7; }
	}
	
	@keyframes constructionTimeline {
	  from { height: 0; opacity: 0; transform: translateY(20px); }
	  to { height: 100%; opacity: 0.8; transform: translateY(0); }
	}
	
	@keyframes progressCircle {
	  from { stroke-dashoffset: 502; }
	  to { stroke-dashoffset: 0; }
	}
	
	@keyframes achievementCenter {
	  0% { r: 0; opacity: 0; }
	  50% { r: 50; opacity: 0.5; }
	  100% { r: 40; opacity: 0.9; }
	}
	
	/* Animation Classes */
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
	.animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
	.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
	.animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
	.animate-float { animation: float 3s ease-in-out infinite; }
	.animate-bounce-subtle { animation: bounceSubtle 3s ease-in-out infinite; }
	.animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
	.animate-count-up { animation: countUp 1s ease-out; }
	.animate-fade-in-delayed { animation: fadeInDelayed 2s ease-out; }
	.animate-gradient { 
	  background-size: 200% 200%;
	  animation: gradient 4s ease infinite;
	}
	
	/* Construction Animations */
	.building-grow { animation: buildingGrow 2s ease-out forwards; }
	.progress-line { animation: progressLine 3s ease-out; }
	.timeline-marker { animation: timelineMarker 1s ease-out forwards; }
	.construction-timeline { animation: constructionTimeline 1s ease-out forwards; }
	.progress-circle { animation: progressCircle 3s ease-out forwards; }
	.achievement-center { animation: achievementCenter 2s ease-out forwards; }
  </style>