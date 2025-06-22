<!-- src/lib/components/Footer.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Instagram } from 'lucide-svelte';
	import { APP_CONFIG, NAVIGATION } from '$lib/config/app.js';
  
	const quickLinks = NAVIGATION.filter(item => !item.submenu).slice(0, 5);
	const serviceLinks = NAVIGATION.find(item => item.href === '/transport-planning')?.submenu?.slice(0, 5) || [];
  
	const socialLinks = [
	  { icon: Linkedin, href: APP_CONFIG.social.linkedin, label: 'LinkedIn' },
	  { icon: Twitter, href: APP_CONFIG.social.twitter, label: 'Twitter' },
	  { icon: Instagram, href: APP_CONFIG.social.instagram, label: 'Instagram' }
	];
  </script>
  
  <footer class="bg-slate-900 text-white">
	<!-- Main Footer -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
	  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
		
		<!-- Company Info -->
		<div class="lg:col-span-1">
		  <div class="flex items-center mb-6">
			<div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-xl flex items-center justify-center">
			  <span class="text-white font-bold text-xl">🛣️</span>
			</div>
			<div class="ml-3 rtl:mr-3 rtl:ml-0">
			  <div class="text-xl font-bold">{APP_CONFIG.name}</div>
			  <div class="text-xs text-slate-400 -mt-1">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </div>
			</div>
		  </div>
		  
		  <p class="text-slate-300 mb-6 leading-relaxed">
			{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
		  </p>
		  
		  <div class="flex space-x-4 rtl:space-x-reverse">
			{#each socialLinks as social}
			  <a 
				href={social.href} 
				class="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
				aria-label={social.label}
			  >
				<svelte:component this={social.icon} class="w-5 h-5" />
			  </a>
			{/each}
		  </div>
		</div>
  
		<!-- Quick Links -->
		<div>
		  <h3 class="text-lg font-semibold mb-6">
			{($locale || 'en') === 'ar' ? 'روابط سريعة' : 'Quick Links'}
		  </h3>
		  <ul class="space-y-3">
			{#each quickLinks as link}
			  <li>
				<a 
				  href={link.href} 
				  class="text-slate-300 hover:text-white transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
				>
				  {($locale || 'en') === 'ar' ? link.title : link.titleEn}
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
  
		<!-- Services -->
		<div>
		  <h3 class="text-lg font-semibold mb-6">
			{($locale || 'en') === 'ar' ? 'خدماتنا' : 'Our Services'}
		  </h3>
		  <ul class="space-y-3">
			{#each serviceLinks as link}
			  <li>
				<a 
				  href={link.href} 
				  class="text-slate-300 hover:text-white transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
				>
				  {($locale || 'en') === 'ar' ? link.title : link.titleEn}
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
  
		<!-- Contact Info -->
		<div>
		  <h3 class="text-lg font-semibold mb-6">
			{($locale || 'en') === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
		  </h3>
		  <div class="space-y-4">
			<div class="flex items-start">
			  <MapPin class="w-5 h-5 text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 mt-1 flex-shrink-0" />
			  <div class="text-slate-300 text-sm">
				{($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}
			  </div>
			</div>
			
			<div class="flex items-center">
			  <Phone class="w-5 h-5 text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
			  <a href="tel:{APP_CONFIG.contact.phone}" class="text-slate-300 hover:text-white transition-colors text-sm">
				{APP_CONFIG.contact.phone}
			  </a>
			</div>
			
			<div class="flex items-center">
			  <Mail class="w-5 h-5 text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
			  <a href="mailto:{APP_CONFIG.contact.email}" class="text-slate-300 hover:text-white transition-colors text-sm">
				{APP_CONFIG.contact.email}
			  </a>
			</div>
			
			<div class="flex items-center">
			  <Clock class="w-5 h-5 text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
			  <div class="text-slate-300 text-sm">
				{($locale || 'en') === 'ar' ? APP_CONFIG.contact.hours : APP_CONFIG.contact.hoursEn}
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  
	<!-- Bottom Bar with Developer Credit -->
	<div class="border-t border-slate-800">
	  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
		<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
		  
		  <div class="text-slate-400 text-sm text-center md:text-left">
			© 2025 {APP_CONFIG.name}. 
			{($locale || 'en') === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
		  </div>
		  
		  <!-- Developer Credit -->
		  <div class="text-slate-400 text-sm text-center">
			<span class="text-emerald-400">Developed by Ahmed Bashir Ali</span>
		  </div>
		  
		  <div class="flex space-x-6 rtl:space-x-reverse">
			<a href="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors">
			  {($locale || 'en') === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
			</a>
			<a href="/terms" class="text-slate-400 hover:text-white text-sm transition-colors">
			  {($locale || 'en') === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
			</a>
		  </div>
		</div>
	  </div>
	</div>
  </footer>