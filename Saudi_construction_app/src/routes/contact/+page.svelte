<!-- src/routes/contact/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2, Users, Award } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
	
	let formData = {
	  name: '',
	  email: '',
	  phone: '',
	  subject: '',
	  message: ''
	};
	
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let errors = $state({});
  
	function validateForm() {
	  errors = {};
	  
	  if (!formData.name.trim()) {
		errors.name = ($locale || 'en') === 'ar' ? 'الاسم مطلوب' : 'Name is required';
	  }
	  
	  if (!formData.email.trim()) {
		errors.email = ($locale || 'en') === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
	  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		errors.email = ($locale || 'en') === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
	  }
	  
	  if (!formData.subject.trim()) {
		errors.subject = ($locale || 'en') === 'ar' ? 'الموضوع مطلوب' : 'Subject is required';
	  }
	  
	  if (!formData.message.trim()) {
		errors.message = ($locale || 'en') === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
	  }
	  
	  return Object.keys(errors).length === 0;
	}
  
	async function handleSubmit(event) {
	  event.preventDefault();
	  
	  if (!validateForm()) {
		return;
	  }
	  
	  isSubmitting = true;
	  
	  try {
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		formData = { name: '', email: '', phone: '', subject: '', message: '' };
		isSubmitted = true;
		
		setTimeout(() => {
		  isSubmitted = false;
		}, 5000);
		
	  } catch (error) {
		console.error('Form submission error:', error);
	  } finally {
		isSubmitting = false;
	  }
	}
  
	const contactInfo = [
	  {
		icon: MapPin,
		title: ($locale || 'en') === 'ar' ? 'مكتبنا' : 'Our Office',
		content: ($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn,
		href: 'https://maps.google.com',
		color: 'text-emerald-600'
	  },
	  {
		icon: Phone,
		title: ($locale || 'en') === 'ar' ? 'الهاتف' : 'Phone',
		content: APP_CONFIG.contact.phone,
		href: `tel:${APP_CONFIG.contact.phone}`,
		color: 'text-blue-600'
	  },
	  {
		icon: Mail,
		title: ($locale || 'en') === 'ar' ? 'البريد الإلكتروني' : 'Email',
		content: APP_CONFIG.contact.email,
		href: `mailto:${APP_CONFIG.contact.email}`,
		color: 'text-purple-600'
	  },
	  {
		icon: Clock,
		title: ($locale || 'en') === 'ar' ? 'ساعات العمل' : 'Office Hours',
		content: ($locale || 'en') === 'ar' ? APP_CONFIG.contact.hours : APP_CONFIG.contact.hoursEn,
		href: null,
		color: 'text-orange-600'
	  }
	];
  
	const whyContactUs = [
	  {
		icon: Building2,
		title: ($locale || 'en') === 'ar' ? 'خبرة 20 عامًا' : '20 Years Experience',
		description: ($locale || 'en') === 'ar' ? 'خبرة واسعة في مشاريع النقل والطرق' : 'Extensive experience in transport and highway projects'
	  },
	  {
		icon: Users,
		title: ($locale || 'en') === 'ar' ? 'فريق متخصص' : 'Expert Team',
		description: ($locale || 'en') === 'ar' ? 'مهندسون ومخططون معتمدون' : 'Certified engineers and planners'
	  },
	  {
		icon: Award,
		title: ($locale || 'en') === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed',
		description: ($locale || 'en') === 'ar' ? 'التزام بأعلى معايير الجودة' : 'Commitment to highest quality standards'
	  }
	];
  </script>
  
  <svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'اتصل بنا' : 'Contact Us'} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'تواصل مع فريق الخبراء لدينا للحصول على استشارات النقل والطرق' : 'Get in touch with our expert team for transport and highway engineering consultations'}" />
  </svelte:head>
  
  <!-- Hero Section with Construction Animation -->
  <section class="relative pt-32 pb-16 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900 overflow-hidden">
	
	<!-- Construction Background Animation -->
	<div class="absolute inset-0 opacity-20">
	  <svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
			<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
		  </linearGradient>
		</defs>
		
		<!-- Communication Towers -->
		<g class="communication-tower-1" transform="translate(200,100)">
		  <rect x="-3" y="0" width="6" height="180" fill="#059669" opacity="0.6"/>
		  <rect x="-40" y="30" width="80" height="2" fill="#059669" opacity="0.6">
			<animate attributeName="width" values="80;100;80" dur="4s" repeatCount="indefinite"/>
		  </rect>
		  <rect x="-30" y="60" width="60" height="2" fill="#059669" opacity="0.6">
			<animate attributeName="width" values="60;80;60" dur="3s" repeatCount="indefinite"/>
		  </rect>
		  <!-- Signal Waves -->
		  <circle cx="0" cy="40" r="15" fill="none" stroke="#059669" stroke-width="2" opacity="0.4">
			<animate attributeName="r" values="15;30;15" dur="2s" repeatCount="indefinite"/>
			<animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
		  </circle>
		</g>
		
		<g class="communication-tower-2" transform="translate(800,80)">
		  <rect x="-3" y="0" width="6" height="200" fill="#f59e0b" opacity="0.6"/>
		  <rect x="-35" y="40" width="70" height="2" fill="#f59e0b" opacity="0.6">
			<animate attributeName="width" values="70;90;70" dur="3.5s" repeatCount="indefinite"/>
		  </rect>
		  <!-- Signal Waves -->
		  <circle cx="0" cy="50" r="20" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.4">
			<animate attributeName="r" values="20;40;20" dur="2.5s" repeatCount="indefinite"/>
			<animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
		  </circle>
		</g>
		
		<!-- Connection Lines -->
		<path d="M200,140 Q500,100 800,130" stroke="url(#contactGradient)" stroke-width="3" fill="none" opacity="0.6" class="connection-line"/>
		
		<!-- Floating Communication Icons -->
		{#each Array(8) as _, i}
		  <g class="floating-comm-{i}" transform="translate({150 + i * 120},{200 + Math.sin(i) * 50})">
			<circle r="8" fill="#059669" opacity="0.5">
			  <animate attributeName="cy" values="0;-20;0" dur="{3 + i * 0.5}s" repeatCount="indefinite"/>
			  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
			</circle>
		  </g>
		{/each}
	  </svg>
	</div>
  
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center">
		
		<!-- Animated Badge -->
		<div class="inline-flex items-center px-6 py-3 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 animate-fade-in">
		  <Phone class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 animate-pulse" />
		  <span class="mr-2 rtl:ml-2 rtl:mr-0">📞</span>
		  {($locale || 'en') === 'ar' ? 'نحن هنا لمساعدتك' : 'We\'re Here to Help'}
		</div>
		
		<!-- Main Title -->
		<h1 class="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight animate-slide-in-up">
		  <span class="block bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
			{($locale || 'en') === 'ar' ? 'اتصل بنا' : 'Contact Us'}
		  </span>
		</h1>
		
		<p class="text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto animate-slide-in-up" style="animation-delay: 0.2s;">
		  {($locale || 'en') === 'ar' 
			? 'تواصل مع فريقنا من الخبراء للحصول على استشارات النقل والطرق السريعة المتخصصة'
			: 'Get in touch with our expert team for specialized transport and highway engineering consultations'
		  }
		</p>
	  </div>
	</div>
  </section>
  
  <!-- Contact Form & Info Section -->
  <section class="py-24 bg-white dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="grid lg:grid-cols-2 gap-16">
		
		<!-- Contact Form -->
		<div class="animate-slide-in-left">
		  <div class="bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
			
			<!-- Background Pattern -->
			<div class="absolute top-0 right-0 opacity-5">
			  <svg width="200" height="200" viewBox="0 0 200 200">
				<pattern id="formPattern" width="20" height="20" patternUnits="userSpaceOnUse">
				  <circle cx="10" cy="10" r="2" fill="currentColor"/>
				</pattern>
				<rect width="200" height="200" fill="url(#formPattern)"/>
			  </svg>
			</div>
			
			<div class="relative z-10">
			  <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
				{($locale || 'en') === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
			  </h2>
			  
			  {#if isSubmitted}
				<div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-6 mb-8 animate-slide-in-up">
				  <div class="flex items-center">
					<div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
					  <CheckCircle class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
					</div>
					<div>
					  <div class="text-emerald-800 dark:text-emerald-300 font-semibold mb-1">
						{($locale || 'en') === 'ar' ? 'شكرًا لك!' : 'Thank you!'}
					  </div>
					  <div class="text-emerald-700 dark:text-emerald-400 text-sm">
						{($locale || 'en') === 'ar' 
						  ? 'تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.'
						  : 'Your message has been sent successfully. We\'ll get back to you soon.'
						}
					  </div>
					</div>
				  </div>
				</div>
			  {/if}
  
			  <form onsubmit={handleSubmit} class="space-y-6">
				
				<!-- Name Field -->
				<div class="animate-fade-in-up" style="animation-delay: 0.1s;">
				  <label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
					{($locale || 'en') === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
				  </label>
				  <input
					type="text"
					id="name"
					bind:value={formData.name}
					class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
					  errors.name 
						? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
						: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
					} text-slate-900 dark:text-white placeholder-slate-500`}
					placeholder={($locale || 'en') === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
				  />
				  {#if errors.name}
					<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.name}</p>
				  {/if}
				</div>
  
				<!-- Email Field -->
				<div class="animate-fade-in-up" style="animation-delay: 0.2s;">
				  <label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
					{($locale || 'en') === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
				  </label>
				  <input
					type="email"
					id="email"
					bind:value={formData.email}
					class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
					  errors.email 
						? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
						: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
					} text-slate-900 dark:text-white placeholder-slate-500`}
					placeholder={($locale || 'en') === 'ar' ? 'your.email@example.com' : 'your.email@example.com'}
				  />
				  {#if errors.email}
					<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.email}</p>
				  {/if}
				</div>
  
				<!-- Phone Field -->
				<div class="animate-fade-in-up" style="animation-delay: 0.3s;">
				  <label for="phone" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
					{($locale || 'en') === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
				  </label>
				  <input
					type="tel"
					id="phone"
					bind:value={formData.phone}
					class="w-full px-4 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
					placeholder={($locale || 'en') === 'ar' ? '+966 5X XXX XXXX' : '+966 5X XXX XXXX'}
				  />
				</div>
  
				<!-- Subject Field -->
				<div class="animate-fade-in-up" style="animation-delay: 0.4s;">
				  <label for="subject" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
					{($locale || 'en') === 'ar' ? 'الموضوع' : 'Subject'} *
				  </label>
				  <input
					type="text"
					id="subject"
					bind:value={formData.subject}
					class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
					  errors.subject 
						? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
						: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
					} text-slate-900 dark:text-white placeholder-slate-500`}
					placeholder={($locale || 'en') === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
				  />
				  {#if errors.subject}
					<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.subject}</p>
				  {/if}
				</div>
  
				<!-- Message Field -->
				<div class="animate-fade-in-up" style="animation-delay: 0.5s;">
				  <label for="message" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
					{($locale || 'en') === 'ar' ? 'الرسالة' : 'Message'} *
				  </label>
				  <textarea
					id="message"
					rows="6"
					bind:value={formData.message}
					class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none ${
					  errors.message 
						? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
						: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
					} text-slate-900 dark:text-white placeholder-slate-500`}
					placeholder={($locale || 'en') === 'ar' 
					  ? 'أخبرنا عن متطلبات مشروعك...'
					  : 'Tell us about your project requirements...'
					}
				  ></textarea>
				  {#if errors.message}
					<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.message}</p>
				  {/if}
				</div>
  
				<!-- Submit Button -->
				<div class="animate-fade-in-up" style="animation-delay: 0.6s;">
				  <button
					type="submit"
					disabled={isSubmitting}
					class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-emerald-400 disabled:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
				  >
					{#if isSubmitting}
					  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3 rtl:ml-3 rtl:mr-0"></div>
					  {($locale || 'en') === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
					{:else}
					  <Send class="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
					  {($locale || 'en') === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
					{/if}
				  </button>
				</div>
			  </form>
			</div>
		  </div>
		</div>
  
		<!-- Contact Information -->
		<div class="animate-slide-in-right">
		  
		  <!-- Introduction -->
		  <div class="mb-12">
			<h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
			  {($locale || 'en') === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project Today'}
			</h2>
			<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
			  {($locale || 'en') === 'ar'
				? 'فريقنا من الخبراء جاهز لمساعدتك في إنشاء حلول نقل مبتكرة ومستدامة مصممة خصيصاً لاحتياجاتك.'
				: 'Our expert team is ready to help you create innovative, sustainable transport solutions tailored to your specific needs.'
			  }
			</p>
		  </div>
  
		  <!-- Why Contact Us -->
		  <div class="mb-12">
			<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">
			  {($locale || 'en') === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
			</h3>
			<div class="space-y-4">
			  {#each whyContactUs as item, index}
				<div class="flex items-start p-4 bg-slate-50 dark:bg-slate-800 rounded-xl animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
				  <div class={`w-12 h-12 ${item.icon === Building2 ? 'bg-emerald-100 dark:bg-emerald-900/30' : item.icon === Users ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'} rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0`}>
					<svelte:component this={item.icon} class={`w-6 h-6 ${item.icon === Building2 ? 'text-emerald-600 dark:text-emerald-400' : item.icon === Users ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`} />
				  </div>
				  <div>
					<h4 class="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h4>
					<p class="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
				  </div>
				</div>
			  {/each}
			</div>
		  </div>
  
		  <!-- Contact Info Cards -->
		  <div class="space-y-6">
			{#each contactInfo as info, index}
			  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style="animation-delay: {index * 0.1}s;">
				<div class="flex items-start">
				  <div class="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0">
					<svelte:component this={info.icon} class={`w-7 h-7 ${info.color}`} />
				  </div>
				  <div class="flex-1">
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
					  {info.title}
					</h3>
					{#if info.href}
					  <a href={info.href} class="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed">
						{info.content}
					  </a>
					{:else}
					  <div class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{info.content}
					  </div>
					{/if}
				  </div>
				</div>
			  </div>
			{/each}
		  </div>
  
		  <!-- Interactive Map Placeholder -->
		  <div class="mt-8 bg-slate-100 dark:bg-slate-700 rounded-2xl h-64 flex items-center justify-center animate-fade-in-up" style="animation-delay: 0.5s;">
			<div class="text-center">
			  <MapPin class="w-16 h-16 text-slate-400 mx-auto mb-4 animate-bounce-gentle" />
			  <div class="text-slate-600 dark:text-slate-400 font-medium">
				{($locale || 'en') === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}
			  </div>
			  <div class="text-sm text-slate-500 dark:text-slate-500 mt-2">
				{($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </section>
  
  <style>
	/* Enhanced Animation Keyframes */
	@keyframes fadeIn {
	  from { opacity: 0; }
	  to { opacity: 1; }
	}
	
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
	
	@keyframes shake {
	  0%, 100% { transform: translateX(0); }
	  25% { transform: translateX(-5px); }
	  75% { transform: translateX(5px); }
	}
	
	@keyframes bounceGentle {
	  0%, 100% { transform: translateY(0px); }
	  50% { transform: translateY(-10px); }
	}
	
	@keyframes connectionLine {
	  0% { stroke-dasharray: 0 1000; }
	  100% { stroke-dasharray: 1000 0; }
	}
	
	/* Animation Classes */
	.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
	.animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
	.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
	.animate-shake { animation: shake 0.5s ease-in-out; }
	.animate-bounce-gentle { animation: bounceGentle 2s ease-in-out infinite; }
	.connection-line { animation: connectionLine 3s ease-out; }
  </style>