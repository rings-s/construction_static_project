<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';
	
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeProvider from '$lib/components/ThemeProvider.svelte';

	let { children } = $props();
	let ready = $state(false);

	onMount(async () => {
		if (browser) {
			// Initialize locale from localStorage
			const savedLocale = localStorage.getItem('locale') || 'en';
			locale.set(savedLocale);
			
			// Set HTML attributes for RTL support
			const html = document.documentElement;
			html.lang = savedLocale;
			html.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
		}
		
		await waitLocale();
		ready = true;
	});
</script>

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
		<div class="min-h-screen flex items-center justify-center">
			<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
		</div>
	{/if}
</ThemeProvider>