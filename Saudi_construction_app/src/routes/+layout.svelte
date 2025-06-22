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
  
	onMount(async () => {
	  if (browser) {
		const savedLocale = localStorage.getItem('locale') || 'ar'; // Default to Arabic for KSA
		locale.set(savedLocale);
		
		const html = document.documentElement;
		html.lang = savedLocale;
		html.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
		
		// Set CSS variables for colors (Saudi-themed)
		document.documentElement.style.setProperty('--color-primary-600', '5 150 105'); // Emerald
		document.documentElement.style.setProperty('--color-primary-500', '16 185 129');
		document.documentElement.style.setProperty('--color-secondary-600', '71 85 105'); // Slate
	  }
	  
	  await waitLocale();
	  ready = true;
	});
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
	  <div class="min-h-screen flex items-center justify-center bg-slate-50">
		<div class="text-center">
		  <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
			<span class="text-white font-bold text-2xl">🛣️</span>
		  </div>
		  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
		  <p class="text-slate-600 mt-4">جاري التحميل...</p>
		</div>
	  </div>
	{/if}
  </ThemeProvider>