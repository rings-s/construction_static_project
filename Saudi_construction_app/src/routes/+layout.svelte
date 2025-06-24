<!-- src/routes/+layout.svelte -->
<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';
	
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeProvider from '$lib/components/ThemeProvider.svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
  
	let { children } = $props();
	let ready = $state(false);
	let loadingProgress = $state(0);
  
	onMount(async () => {
	  if (browser) {
		// Simulate loading progress
		const interval = setInterval(() => {
		  loadingProgress += Math.random() * 15;
		  if (loadingProgress > 90) {
			clearInterval(interval);
		  }
		}, 200);

		const savedLocale = localStorage.getItem('locale') || 'ar'; // Default to Arabic for KSA
		locale.set(savedLocale);
		
		const html = document.documentElement;
		html.lang = savedLocale;
		html.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
		
		// Set CSS variables for colors (Saudi-themed)
		document.documentElement.style.setProperty('--color-primary-600', '5 150 105'); // Emerald
		document.documentElement.style.setProperty('--color-primary-500', '16 185 129');
		document.documentElement.style.setProperty('--color-secondary-600', '71 85 105'); // Slate
		
		// Enhanced font loading
		if (savedLocale === 'ar') {
		  document.body.style.fontFamily = 'Cairo, Almarai, Tajawal, system-ui, sans-serif';
		} else {
		  document.body.style.fontFamily = 'Poppins, DM Sans, system-ui, sans-serif';
		}
	  }
	  
	  await waitLocale();
	  loadingProgress = 100;
	  
	  // Small delay for smooth transition
	  setTimeout(() => {
		ready = true;
	  }, 500);
	});

	// Create floating elements
	let floatingElements = Array.from({ length: 20 }, (_, i) => ({
	  id: i,
	  left: Math.random() * 100,
	  delay: Math.random() * 8,
	  duration: 6 + Math.random() * 4
	}));
  </script>
  
  <svelte:head>
	<title>{APP_CONFIG.name} - {($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
	<meta name="keywords" content="تخطيط النقل، هندسة المرور، الطرق السريعة، استشارات النقل، المملكة العربية السعودية" />
	<meta property="og:title" content="{APP_CONFIG.name}" />
	<meta property="og:description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
	<meta property="og:image" content="/og-image.jpg" />
	<meta property="og:type" content="website" />
  </svelte:head>
  
  <ThemeProvider>
	{#if ready}
	  <div class="min-h-screen flex flex-col">
		<Header />
		<main class="flex-1">
		  {@render children()}
		</main>
		<Footer />
	  </div>
	{:else}
	  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
		
		<!-- Floating Background Elements -->
		<div class="floating-elements">
		  {#each floatingElements as element}
			<div 
			  class="floating-element"
			  style="left: {element.left}%; animation-delay: {element.delay}s; animation-duration: {element.duration}s;"
			></div>
		  {/each}
		</div>

		<!-- Main Loading Content -->
		<div class="text-center relative z-10">
		  
		  <!-- Logo with Advanced Animation -->
		  <div class="relative mb-8">
			<div class="w-20 h-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition-all duration-1000 hover:scale-110 hover:rotate-12">
			  
			  <!-- Construction/Building SVG Icon -->
			  <svg class="w-10 h-10 text-white animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.83L18.17 12H17v6H7v-6H5.83L12 5.83z"/>
				<path d="M9 13h2v4H9zm4 0h2v4h-2z"/>
			  </svg>
			  
			  <!-- Orbiting Elements -->
			  <div class="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
			  <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
			</div>

			<!-- Advanced Loading Ring Animation -->
			<div class="loading-ring mx-auto">
			  <div></div>
			  <div></div>
			  <div></div>
			  <div></div>
			</div>
		  </div>

		  <!-- Loading Text with Animation -->
		  <div class="space-y-4">
			<h2 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
			  {($locale || 'en') === 'ar' ? 'جاري التحميل...' : 'Loading...'}
			</h2>
			
			<!-- Progress Bar -->
			<div class="w-64 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
			  <div 
				class="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ease-out rounded-full"
				style="width: {loadingProgress}%"
			  ></div>
			</div>
			
			<!-- Loading Percentage -->
			<p class="text-slate-600 dark:text-slate-400 font-medium">
			  {Math.round(loadingProgress)}%
			</p>
			
			<!-- Loading Messages -->
			<p class="text-sm text-slate-500 dark:text-slate-500 mt-4 animate-pulse">
			  {($locale || 'en') === 'ar' 
				? 'تحضير التطبيق... يرجى الانتظار' 
				: 'Preparing application... Please wait'}
			</p>
		  </div>

		  <!-- Loading Dots Animation -->
		  <div class="flex justify-center space-x-1 mt-6 rtl:space-x-reverse">
			<div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
			<div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
			<div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
		  </div>
		</div>
	  </div>
	{/if}
  </ThemeProvider>