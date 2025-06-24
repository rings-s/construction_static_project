<!-- src/routes/contact/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2, Users, Award, ArrowRight, Star, Globe } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
	import { fly, fade, scale } from 'svelte/transition';
	
	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
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

	// Company location in Riyadh
	const companyLocation = {
		lat: 24.7136,
		lng: 46.6753,
		address: 'الرياض، المملكة العربية السعودية',
		addressEn: 'Riyadh, Saudi Arabia',
		fullAddress: 'طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية',
		fullAddressEn: 'King Fahd Road, Al Olaya District, Riyadh 12211, Saudi Arabia'
	};

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
			title: ($locale || 'en') === 'ar' ? 'مكتبنا الرئيسي' : 'Head Office',
			content: ($locale || 'en') === 'ar' ? companyLocation.fullAddress : companyLocation.fullAddressEn,
			href: `https://maps.google.com/?q=${companyLocation.lat},${companyLocation.lng}`,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			icon: Phone,
			title: ($locale || 'en') === 'ar' ? 'اتصل بنا' : 'Call Us',
			content: '+966 11 123 4567',
			href: 'tel:+966111234567',
			color: 'from-blue-500 to-purple-600'
		},
		{
			icon: Mail,
			title: ($locale || 'en') === 'ar' ? 'راسلنا' : 'Email Us',
			content: 'info@transportengineering.sa',
			href: 'mailto:info@transportengineering.sa',
			color: 'from-purple-500 to-emerald-600'
		},
		{
			icon: Clock,
			title: ($locale || 'en') === 'ar' ? 'ساعات العمل' : 'Working Hours',
			content: ($locale || 'en') === 'ar' ? 'الأحد - الخميس: 8:00 ص - 6:00 م' : 'Sunday - Thursday: 8:00 AM - 6:00 PM',
			href: null,
			color: 'from-amber-500 to-blue-600'
		}
	];

	const whyContactUs = [
		{
			icon: Building2,
			title: ($locale || 'en') === 'ar' ? 'خبرة 25+ عامًا' : '25+ Years Experience',
			description: ($locale || 'en') === 'ar' ? 'خبرة واسعة في مشاريع النقل والطرق السريعة في المملكة' : 'Extensive experience in transport and highway projects across the Kingdom',
			color: 'from-emerald-500 to-blue-600'
		},
		{
			icon: Users,
			title: ($locale || 'en') === 'ar' ? 'فريق متخصص' : 'Expert Team',
			description: ($locale || 'en') === 'ar' ? 'مهندسون ومخططون معتمدون من أفضل الجامعات' : 'Certified engineers and planners from top universities',
			color: 'from-blue-500 to-purple-600'
		},
		{
			icon: Award,
			title: ($locale || 'en') === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed',
			description: ($locale || 'en') === 'ar' ? 'التزام بأعلى معايير الجودة والمعايير الدولية' : 'Commitment to highest quality standards and international best practices',
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const stats = [
		{ value: '500+', label: 'مشروع مكتمل', labelEn: 'Projects Completed' },
		{ value: '100+', label: 'عميل راضٍ', labelEn: 'Happy Clients' },
		{ value: '25+', label: 'سنة خبرة', labelEn: 'Years Experience' },
		{ value: '15+', label: 'مدينة مخدومة', labelEn: 'Cities Served' }
	];

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
	
	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
	
	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'اتصل بنا - حلول هندسة النقل المتخصصة' : 'Contact Us - Specialized Transport Engineering Solutions'} - Transport Engineering KSA</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'تواصل مع فريق الخبراء لدينا للحصول على استشارات النقل والطرق المتخصصة في المملكة العربية السعودية' : 'Get in touch with our expert team for specialized transport and highway engineering consultations in Saudi Arabia'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Contact Network SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="contactGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="contactWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#contactGrid)" />
			
			<!-- Communication Network -->
			<g class="contact-center" transform="translate(600,400)">
				<circle r="40" fill="url(#contactWave)" opacity="0.8">
					<animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite"/>
				</circle>
				<text x="0" y="8" text-anchor="middle" font-size="24" opacity="0.9">🏢</text>
				
				<!-- Connection Lines to Contact Points -->
				{#each Array(6) as _, i}
					<g transform="rotate({i * 60})">
						<line x1="50" y1="0" x2="150" y2="0" stroke="url(#contactWave)" stroke-width="2" opacity="0.5">
							<animate attributeName="opacity" values="0.3;0.8;0.3" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
						</line>
						<circle cx="160" cy="0" r="15" fill="url(#contactWave)" opacity="0.7">
							<animate attributeName="r" values="15;20;15" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
						</circle>
						<text x="160" y="6" text-anchor="middle" font-size="14" opacity="0.8">
							{i % 4 === 0 ? '📧' : i % 4 === 1 ? '📞' : i % 4 === 2 ? '🗺️' : '💬'}
						</text>
					</g>
				{/each}
			</g>
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
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<div class="w-3 h-3 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-lg">📞</span>
				{($locale || 'en') === 'ar' ? 'نحن هنا لمساعدتك على مدار الساعة' : 'We\'re Here to Help You 24/7'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6">
						{($locale || 'en') === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project Today'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'تواصل مع فريقنا من الخبراء المتخصصين في هندسة النقل والطرق للحصول على استشارات مهنية وحلول مبتكرة'
						: 'Connect with our team of specialized transport and highway engineering experts for professional consultations and innovative solutions'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'من التخطيط الأولي إلى التنفيذ النهائي، نحن شريكك المثالي لتحقيق رؤية 2030 في مجال النقل المستدام'
						: 'From initial planning to final implementation, we are your ideal partner to achieve Vision 2030 in sustainable transportation'
					}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 relative overflow-hidden">
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

<!-- Enhanced Contact Form & Info Section -->
<section id="contact-section" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16">
			
			<!-- Enhanced Contact Form -->
			<div class={`${isVisible('contact-section') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`}>
				<div class="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden">
					
					<!-- Advanced Background Pattern -->
					<div class="absolute inset-0 opacity-5">
						<svg class="w-full h-full" viewBox="0 0 400 400">
							<defs>
								<pattern id="formPattern" width="40" height="40" patternUnits="userSpaceOnUse">
									<circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3">
										<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
									</circle>
								</pattern>
							</defs>
							<rect width="400" height="400" fill="url(#formPattern)"/>
						</svg>
					</div>
					
					<div class="relative z-10">
						<div class="text-center mb-8">
							<div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
								<Send class="w-8 h-8 text-white" />
							</div>
							<h2 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-4">
								{($locale || 'en') === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
							</h2>
							<p class="text-slate-600 dark:text-slate-300">
								{($locale || 'en') === 'ar' ? 'نحن نتطلع للتعاون معك' : 'We look forward to collaborating with you'}
							</p>
						</div>
						
						{#if isSubmitted}
							<div class="bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-6 mb-8 animate-slide-up-bounce backdrop-blur-sm">
								<div class="flex items-center">
									<div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
										<CheckCircle class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
									</div>
									<div>
										<div class="text-emerald-800 dark:text-emerald-300 font-bold mb-1">
											{($locale || 'en') === 'ar' ? 'شكرًا لتواصلك معنا!' : 'Thank you for contacting us!'}
										</div>
										<div class="text-emerald-700 dark:text-emerald-400 text-sm">
											{($locale || 'en') === 'ar' 
												? 'تم إرسال رسالتك بنجاح. سنتواصل معك خلال 24 ساعة.'
												: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.'
											}
										</div>
									</div>
								</div>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-6">
							
							<!-- Name & Email Row -->
							<div class="grid md:grid-cols-2 gap-6">
								<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.1s;">
									<label for="name" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
										{($locale || 'en') === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
									</label>
									<input
										type="text"
										id="name"
										bind:value={formData.name}
										class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
											errors.name 
												? 'border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/20' 
												: 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50'
										} text-slate-900 dark:text-white placeholder-slate-500 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700`}
										placeholder={($locale || 'en') === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
									/>
									{#if errors.name}
										<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.name}</p>
									{/if}
								</div>

								<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.2s;">
									<label for="email" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
										{($locale || 'en') === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
									</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
											errors.email 
												? 'border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/20' 
												: 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50'
										} text-slate-900 dark:text-white placeholder-slate-500 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700`}
										placeholder="your.email@example.com"
									/>
									{#if errors.email}
										<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.email}</p>
									{/if}
								</div>
							</div>

							<!-- Phone & Subject Row -->
							<div class="grid md:grid-cols-2 gap-6">
								<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.3s;">
									<label for="phone" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
										{($locale || 'en') === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
									</label>
									<input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										class="w-full px-4 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700"
										placeholder="+966 5X XXX XXXX"
									/>
								</div>

								<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.4s;">
									<label for="subject" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
										{($locale || 'en') === 'ar' ? 'الموضوع' : 'Subject'} *
									</label>
									<input
										type="text"
										id="subject"
										bind:value={formData.subject}
										class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 ${
											errors.subject 
												? 'border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/20' 
												: 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50'
										} text-slate-900 dark:text-white placeholder-slate-500 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700`}
										placeholder={($locale || 'en') === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
									/>
									{#if errors.subject}
										<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.subject}</p>
									{/if}
								</div>
							</div>

							<!-- Message Field -->
							<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.5s;">
								<label for="message" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
									{($locale || 'en') === 'ar' ? 'تفاصيل المشروع' : 'Project Details'} *
								</label>
								<textarea
									id="message"
									rows="6"
									bind:value={formData.message}
									class={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none ${
										errors.message 
											? 'border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/20' 
											: 'border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50'
									} text-slate-900 dark:text-white placeholder-slate-500 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700`}
									placeholder={($locale || 'en') === 'ar' 
										? 'أخبرنا عن متطلبات مشروعك، النطاق الزمني، والأهداف المرجوة...'
										: 'Tell us about your project requirements, timeline, and desired outcomes...'
									}
								></textarea>
								{#if errors.message}
									<p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.message}</p>
								{/if}
							</div>

							<!-- Submit Button -->
							<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.6s;">
								<button
									type="submit"
									disabled={isSubmitting}
									class="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:from-emerald-400 disabled:to-blue-500 text-white font-black py-5 px-6 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-emerald-500/20 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
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

			<!-- Enhanced Contact Information -->
			<div class={`${isVisible('contact-section') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.2s;">
				
				<!-- Introduction -->
				<div class="mb-12">
					<div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
						<Building2 class="w-8 h-8 text-white" />
					</div>
					<h2 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-6">
						{($locale || 'en') === 'ar' ? 'مكتبنا في الرياض' : 'Our Riyadh Office'}
					</h2>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
						{($locale || 'en') === 'ar'
							? 'نحن في قلب الرياض، عاصمة المملكة العربية السعودية، جاهزون لخدمتكم وتقديم أفضل الحلول الهندسية في مجال النقل والطرق.'
							: 'Located in the heart of Riyadh, the capital of Saudi Arabia, we are ready to serve you with the best engineering solutions in transport and highways.'
						}
					</p>
				</div>

				<!-- Why Choose Us -->
				<div class="mb-12">
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-6">
						{($locale || 'en') === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
					</h3>
					<div class="space-y-4">
						{#each whyContactUs as item, index}
							<div class={`flex items-start p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
								<div class={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 shadow-lg`}>
									<svelte:component this={item.icon} class="w-7 h-7 text-white" />
								</div>
								<div>
									<h4 class="font-black text-slate-900 dark:text-white mb-2">{item.title}</h4>
									<p class="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Contact Info Cards -->
				<div class="space-y-6">
					{#each contactInfo as info, index}
						<div class={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1 + 0.3}s;">
							<div class="flex items-start">
								<div class={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0 shadow-lg`}>
									<svelte:component this={info.icon} class="w-7 h-7 text-white" />
								</div>
								<div class="flex-1">
									<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3">
										{info.title}
									</h3>
									{#if info.href}
										<a href={info.href} target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-relaxed font-medium hover:underline block">
											{info.content}
										</a>
									{:else}
										<div class="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
											{info.content}
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Map Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'موقعنا في الرياض' : 'Our Location in Riyadh'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'زوروا مكتبنا في قلب العاصمة الرياض للحصول على استشارة شخصية'
					: 'Visit our office in the heart of the capital Riyadh for personalized consultation'
				}
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12 items-center">
			
			<!-- Interactive Map -->
			<div class={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`}>
				<!-- Embedded Google Map for Riyadh -->
				<div class="relative h-96 lg:h-[500px]">
					<iframe 
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9463896022495!2d46.67257087601385!3d24.713635977995736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1703758924685!5m2!1sen!2s"
						width="100%"
						height="100%"
						style="border:0; border-radius: 1.5rem;"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title={($locale || 'en') === 'ar' ? 'موقع مكتبنا في الرياض' : 'Our Office Location in Riyadh'}
					></iframe>
					
					<!-- Map Overlay -->
					<div class="absolute top-4 left-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
						<div class="flex items-center">
							<div class="w-3 h-3 bg-red-500 rounded-full mr-2 rtl:ml-2 rtl:mr-0 animate-pulse"></div>
							<span class="text-sm font-bold text-slate-900 dark:text-white">
								{($locale || 'en') === 'ar' ? 'مكتبنا الرئيسي' : 'Head Office'}
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Location Details -->
			<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: 0.2s;">
				<div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
					<div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
						<Globe class="w-8 h-8 text-white" />
					</div>
					
					<h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6">
						{($locale || 'en') === 'ar' ? 'تفاصيل الموقع' : 'Location Details'}
					</h3>

					<div class="space-y-6">
						<!-- Address -->
						<div class="flex items-start">
							<MapPin class="w-6 h-6 text-emerald-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
							<div>
								<h4 class="font-bold text-slate-900 dark:text-white mb-1">
									{($locale || 'en') === 'ar' ? 'العنوان الكامل' : 'Full Address'}
								</h4>
								<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
									{($locale || 'en') === 'ar' ? companyLocation.fullAddress : companyLocation.fullAddressEn}
								</p>
							</div>
						</div>

						<!-- Coordinates -->
						<div class="flex items-start">
							<div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0">
								<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
							</div>
							<div>
								<h4 class="font-bold text-slate-900 dark:text-white mb-1">
									{($locale || 'en') === 'ar' ? 'الإحداثيات' : 'Coordinates'}
								</h4>
								<p class="text-slate-600 dark:text-slate-300">
									{companyLocation.lat}, {companyLocation.lng}
								</p>
							</div>
						</div>

						<!-- Directions -->
						<div class="pt-4 border-t border-slate-200 dark:border-slate-700">
							<a 
								href={`https://www.google.com/maps/dir/?api=1&destination=${companyLocation.lat},${companyLocation.lng}`}
								target="_blank"
								rel="noopener noreferrer"
								class="group inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
							>
								<MapPin class="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
								{($locale || 'en') === 'ar' ? 'احصل على الاتجاهات' : 'Get Directions'}
								<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
		</div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
			<div class="text-8xl mb-8 animate-bounce-gentle">🚀</div>
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-6">
				{($locale || 'en') === 'ar' ? 'هل أنت جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
			</h2>
			<p class="text-xl text-emerald-100 mb-8 leading-relaxed">
				{($locale || 'en') === 'ar'
					? 'انضم إلى أكثر من 500 عميل راضٍ وكن جزءاً من رؤية 2030 في تطوير النقل المستدام بالمملكة العربية السعودية'
					: 'Join over 500 satisfied clients and be part of Vision 2030 in developing sustainable transportation in Saudi Arabia'
				}
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a 
					href="tel:+966111234567"
					class="group inline-flex items-center justify-center px-12 py-5 bg-white text-emerald-600 font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl hover:bg-emerald-50"
				>
					<span class="flex items-center gap-3">
						<Phone class="w-5 h-5" />
						{($locale || 'en') === 'ar' ? 'اتصل بنا الآن' : 'Call Us Now'}
					</span>
				</a>
				<a 
					href="/services" 
					class="inline-flex items-center justify-center px-12 py-5 border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
				>
					{($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes - Same as services pages */
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

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-5px); }
		75% { transform: translateX(5px); }
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
	.animate-shake { animation: shake 0.5s ease-in-out; }

	/* Utility Classes */
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
		.grid { grid-template-columns: 1fr; }
	}

	/* Form enhancements */
	input:focus, textarea:focus {
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
	}

	/* Map responsive */
	iframe {
		min-height: 300px;
	}
</style>