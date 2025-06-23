<!-- src/lib/components/Footer.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Instagram, ArrowUp, Heart, Globe } from 'lucide-svelte';
	import { APP_CONFIG, NAVIGATION } from '$lib/config/app.js';
	import { onMount } from 'svelte';
  
	const quickLinks = NAVIGATION.filter(item => !item.submenu).slice(0, 5);
	const serviceLinks = NAVIGATION.find(item => item.href === '/transport-planning')?.submenu?.slice(0, 5) || [];
  
	const socialLinks = [
	  { icon: Linkedin, href: APP_CONFIG.social.linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
	  { icon: Twitter, href: APP_CONFIG.social.twitter, label: 'Twitter', color: 'hover:text-sky-500' },
	  { icon: Instagram, href: APP_CONFIG.social.instagram, label: 'Instagram', color: 'hover:text-pink-600' }
	];

	let showScrollTop = $state(false);

	onMount(() => {
	  const handleScroll = () => {
		showScrollTop = window.scrollY > 300;
	  };
	  
	  window.addEventListener('scroll', handleScroll, { passive: true });
	  return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
	  window.scrollTo({ top: 0, behavior: 'smooth' });
	}
  </script>
  
  <footer class="relative bg-slate-900 text-white overflow-hidden">
	
	<!-- Animated Background -->
	<div class="absolute inset-0 opacity-10">
	  <svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
			<stop offset="50%" style="stop-color:#0891b2;stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:#7c3aed;stop-opacity:0.3" />
		  </linearGradient>
		</defs>
		
		<!-- Animated waves -->
		<path d="M0,200 Q300,150 600,200 T1200,200 L1200,600 L0,600 Z" fill="url(#footerGradient)" opacity="0.6">
		  <animate attributeName="d" 
			values="M0,200 Q300,150 600,200 T1200,200 L1200,600 L0,600 Z;
					M0,180 Q300,220 600,180 T1200,180 L1200,600 L0,600 Z;
					M0,200 Q300,150 600,200 T1200,200 L1200,600 L0,600 Z" 
			dur="15s" repeatCount="indefinite"/>
		</path>
		
		<!-- Floating geometric shapes -->
		{#each Array(8) as _, i}
		  <circle 
			cx="{150 + i * 150}" 
			cy="{100 + (i % 3) * 80}" 
			r="{10 + (i % 3) * 5}" 
			fill="currentColor" 
			opacity="0.3"
		  >
			<animate attributeName="cy" 
			  values="{100 + (i % 3) * 80};{80 + (i % 3) * 80};{100 + (i % 3) * 80}" 
			  dur="{8 + i}s" repeatCount="indefinite"/>
			<animate attributeName="opacity" values="0.1;0.4;0.1" dur="{6 + i * 0.5}s" repeatCount="indefinite"/>
		  </circle>
		{/each}
	  </svg>
	</div>

	<!-- Scroll to Top Button -->
	{#if showScrollTop}
	  <button 
		onclick={scrollToTop}
		class="fixed bottom-8 right-8 z-50 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
		aria-label="Scroll to top"
	  >
		<ArrowUp class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
	  </button>
	{/if}
  
	<!-- Main Footer Content -->
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
	  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
		
		<!-- Enhanced Company Info -->
		<div class="lg:col-span-1 space-y-8">
		  <div class="flex items-center group">
			<div class="relative">
			  <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 via-emerald-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
				<span class="text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">🛣️</span>
			  </div>
			  <div class="absolute -inset-1 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
			</div>
			<div class="ml-4 rtl:mr-4 rtl:ml-0">
			  <div class="text-2xl font-bold group-hover:text-emerald-400 transition-colors duration-300">{APP_CONFIG.name}</div>
			  <div class="text-sm text-slate-400 -mt-1">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </div>
			</div>
		  </div>
		  
		  <p class="text-slate-300 leading-relaxed text-lg">
			{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
		  </p>
		  
		  <!-- Enhanced Social Links -->
		  <div class="flex space-x-4 rtl:space-x-reverse">
			{#each socialLinks as social}
			  <a 
				href={social.href} 
				class={`group w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
				aria-label={social.label}
				target="_blank"
				rel="noopener noreferrer"
			  >
				<svelte:component this={social.icon} class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
			  </a>
			{/each}
		  </div>

		  <!-- Newsletter Signup -->
		  <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
			<h4 class="text-lg font-semibold mb-3 text-emerald-400">
			  {($locale || 'en') === 'ar' ? 'اشترك في نشرتنا' : 'Subscribe to Newsletter'}
			</h4>
			<div class="flex flex-col sm:flex-row gap-3">
			  <input 
				type="email" 
				placeholder={($locale || 'en') === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
				class="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
			  />
			  <button class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
				{($locale || 'en') === 'ar' ? 'اشترك' : 'Subscribe'}
			  </button>
			</div>
		  </div>
		</div>
  
		<!-- Enhanced Quick Links -->
		<div class="space-y-6">
		  <h3 class="text-xl font-bold text-emerald-400 mb-8 relative">
			{($locale || 'en') === 'ar' ? 'روابط سريعة' : 'Quick Links'}
			<div class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
		  </h3>
		  <ul class="space-y-4">
			{#each quickLinks as link}
			  <li>
				<a 
				  href={link.href} 
				  class="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-2 rtl:hover:-translate-x-2 py-2"
				>
				  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
				  <span class="group-hover:text-emerald-400 transition-colors duration-300">
					{($locale || 'en') === 'ar' ? link.title : link.titleEn}
				  </span>
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
  
		<!-- Enhanced Services -->
		<div class="space-y-6">
		  <h3 class="text-xl font-bold text-emerald-400 mb-8 relative">
			{($locale || 'en') === 'ar' ? 'خدماتنا' : 'Our Services'}
			<div class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
		  </h3>
		  <ul class="space-y-4">
			{#each serviceLinks as link}
			  <li>
				<a 
				  href={link.href} 
				  class="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-2 rtl:hover:-translate-x-2 py-2"
				>
				  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
				  <span class="group-hover:text-emerald-400 transition-colors duration-300">
					{($locale || 'en') === 'ar' ? link.title : link.titleEn}
				  </span>
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
  
		<!-- Enhanced Contact Info -->
		<div class="space-y-6">
		  <h3 class="text-xl font-bold text-emerald-400 mb-8 relative">
			{($locale || 'en') === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
			<div class="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
		  </h3>
		  <div class="space-y-6">
			<div class="group flex items-start hover:bg-slate-800/50 p-4 rounded-xl transition-all duration-300">
			  <MapPin class="w-6 h-6 text-emerald-400 mr-4 rtl:ml-4 rtl:mr-0 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
			  <div class="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
				{($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}
			  </div>
			</div>
			
			<a href="tel:{APP_CONFIG.contact.phone}" class="group flex items-center hover:bg-slate-800/50 p-4 rounded-xl transition-all duration-300">
			  <Phone class="w-6 h-6 text-emerald-400 mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
			  <span class="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium">
				{APP_CONFIG.contact.phone}
			  </span>
			</a>
			
			<a href="mailto:{APP_CONFIG.contact.email}" class="group flex items-center hover:bg-slate-800/50 p-4 rounded-xl transition-all duration-300">
			  <Mail class="w-6 h-6 text-emerald-400 mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
			  <span class="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium">
				{APP_CONFIG.contact.email}
			  </span>
			</a>
			
			<div class="group flex items-center hover:bg-slate-800/50 p-4 rounded-xl transition-all duration-300">
			  <Clock class="w-6 h-6 text-emerald-400 mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
			  <div class="text-slate-300 text-sm group-hover:text-white transition-colors duration-300">
				{($locale || 'en') === 'ar' ? APP_CONFIG.contact.hours : APP_CONFIG.contact.hoursEn}
			  </div>
			</div>

			<!-- Location Map Link -->
			<a href="#" class="group flex items-center justify-center w-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/30 hover:border-emerald-600/50 p-4 rounded-xl transition-all duration-300 hover:scale-105">
			  <Globe class="w-5 h-5 text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0" />
			  <span class="text-emerald-400 font-semibold">
				{($locale || 'en') === 'ar' ? 'عرض على الخريطة' : 'View on Map'}
			  </span>
			</a>
		  </div>
		</div>
	  </div>
	</div>
  
	<!-- Enhanced Bottom Bar -->
	<div class="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
	  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
		  
		  <div class="text-slate-400 text-sm text-center lg:text-left">
			© 2025 {APP_CONFIG.name}. 
			{($locale || 'en') === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
		  </div>
		  
		  <!-- Enhanced Developer Credit -->
		  <div class="flex items-center text-slate-400 text-sm text-center group">
			<Heart class="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0 animate-pulse" />
			<span class="mr-1 rtl:ml-1 rtl:mr-0">
			  {($locale || 'en') === 'ar' ? 'تطوير بكل حب بواسطة' : 'Crafted with love by'}
			</span>
			<span class="text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors duration-300">
			  Ahmed Bashir Ali
			</span>
		  </div>
		  
		  <div class="flex flex-wrap justify-center lg:justify-end space-x-6 rtl:space-x-reverse">
			<a href="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4">
			  {($locale || 'en') === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
			</a>
			<a href="/terms" class="text-slate-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4">
			  {($locale || 'en') === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
			</a>
			<a href="/sitemap" class="text-slate-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4">
			  {($locale || 'en') === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
			</a>
		  </div>
		</div>

		<!-- Additional Bottom Info -->
		<div class="mt-8 pt-6 border-t border-slate-800 text-center">
		  <p class="text-slate-500 text-xs leading-relaxed max-w-4xl mx-auto">
			{($locale || 'en') === 'ar' 
			  ? 'نحن ملتزمون بتقديم أفضل الحلول الهندسية المبتكرة والمستدامة في مجال الطرق والنقل. فريقنا من الخبراء جاهز لتحويل رؤيتكم إلى واقع.'
			  : 'We are committed to delivering the finest innovative and sustainable engineering solutions in roads and transportation. Our team of experts is ready to transform your vision into reality.'
			}
		  </p>
		</div>
	  </div>
	</div>
  </footer>

  <style>
	/* Enhanced animations for footer */
	@keyframes float-up {
	  0% {
		opacity: 0;
		transform: translateY(30px);
	  }
	  100% {
		opacity: 1;
		transform: translateY(0);
	  }
	}

	@keyframes pulse-glow {
	  0%, 100% {
		box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
	  }
	  50% {
		box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
	  }
	}

	/* Scroll animations */
	footer {
	  animation: float-up 0.8s ease-out;
	}

	/* Enhanced hover effects */
	.group:hover .w-2 {
	  animation: pulse-glow 1s ease-in-out infinite;
	}

	/* Smooth transitions for all elements */
	* {
	  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
	  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* RTL adjustments */
	[dir="rtl"] .hover\:translate-x-2:hover {
	  transform: translateX(-0.5rem);
	}

	/* Accessibility improvements */
	a:focus-visible,
	button:focus-visible {
	  outline: 2px solid theme('colors.emerald.500');
	  outline-offset: 2px;
	  border-radius: 0.375rem;
	}

	/* Performance optimizations */
	.backdrop-blur-sm {
	  backdrop-filter: blur(4px);
	  -webkit-backdrop-filter: blur(4px);
	}
  </style>