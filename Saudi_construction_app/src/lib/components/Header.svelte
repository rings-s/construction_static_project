<!-- src/lib/components/Header.svelte -->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	
	import { 
	  Menu, 
	  X, 
	  ChevronDown, 
	  Sun, 
	  Moon, 
	  Globe, 
	  MapPin, 
	  Phone, 
	  Mail,
	  ArrowRight
	} from 'lucide-svelte';
	
	import { APP_CONFIG, NAVIGATION } from '$lib/config/app.js';
	
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let currentTheme = $state('light');
	let activeDropdown = $state(null);
	let headerElement = $state(null);
	let dropdownTimeout = $state(null);
  
	onMount(() => {
	  const handleScroll = () => {
		scrolled = window.scrollY > 20;
	  };
	  
	  window.addEventListener('scroll', handleScroll);
	  
	  if (browser) {
		const savedTheme = localStorage.getItem('theme') || 'light';
		currentTheme = savedTheme;
	  }
	  
	  return () => {
		window.removeEventListener('scroll', handleScroll);
	  };
	});
  
	function toggleTheme() {
	  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	  currentTheme = newTheme;
	  
	  if (browser) {
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	  }
	}
  
	function toggleLocale() {
	  if (browser) {
		const currentLocale = $locale || 'en';
		const newLocale = currentLocale === 'en' ? 'ar' : 'en';
		locale.set(newLocale);
		localStorage.setItem('locale', newLocale);
		
		const html = document.documentElement;
		html.lang = newLocale;
		html.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
	  }
	}
  
	function toggleMobileMenu() {
	  mobileMenuOpen = !mobileMenuOpen;
	  if (browser) {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
	  }
	}
  
	function closeMobileMenu() {
	  mobileMenuOpen = false;
	  if (browser) {
		document.body.style.overflow = '';
	  }
	}
  
	function handleDropdownEnter(index) {
	  if (dropdownTimeout) {
		clearTimeout(dropdownTimeout);
	  }
	  activeDropdown = index;
	}
  
	function handleDropdownLeave() {
	  dropdownTimeout = setTimeout(() => {
		activeDropdown = null;
	  }, 150);
	}
  
	function isActiveRoute(href) {
	  return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
  </script>
  
  <!-- Top Information Bar -->
  <div class="bg-slate-900 text-white py-2 hidden lg:block border-b border-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex justify-between items-center text-sm">
		<div class="flex items-center space-x-6 rtl:space-x-reverse">
		  <div class="flex items-center group">
			<MapPin class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
			<span>{($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}</span>
		  </div>
		  <div class="flex items-center group">
			<Phone class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
			<a href="tel:{APP_CONFIG.contact.phone}">{APP_CONFIG.contact.phone}</a>
		  </div>
		  <div class="flex items-center group">
			<Mail class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
			<a href="mailto:{APP_CONFIG.contact.email}">{APP_CONFIG.contact.email}</a>
		  </div>
		</div>
		
		<div class="flex items-center space-x-4 rtl:space-x-reverse">
		  <button onclick={toggleTheme} class="p-2 rounded-lg hover:bg-slate-800 transition-colors">
			{#if currentTheme === 'dark'}
			  <Sun class="w-4 h-4 text-yellow-400" />
			{:else}
			  <Moon class="w-4 h-4 text-slate-300" />
			{/if}
		  </button>
		  
		  <button onclick={toggleLocale} class="p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center">
			<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
			<span class="text-xs font-medium">
			  {($locale || 'en') === 'en' ? 'العربية' : 'EN'}
			</span>
		  </button>
		</div>
	  </div>
	</div>
  </div>
  
  <!-- Main Header -->
  <header 
	bind:this={headerElement}
	class={`sticky top-0 z-50 transition-all duration-300 border-b ${
	  scrolled 
		? 'bg-white/95 backdrop-blur-xl shadow-lg border-slate-200' 
		: 'bg-white border-slate-100'
	}`}
  >
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex justify-between items-center h-16">
		
		<!-- Logo -->
		<div class="flex-shrink-0 group">
		  <a href="/" class="flex items-center transition-transform duration-300 group-hover:scale-105">
			<div class="w-10 h-10 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
			  <span class="text-white font-bold text-lg">🛣️</span>
			</div>
			<div class="ml-3 rtl:mr-3 rtl:ml-0">
			  <div class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
				{APP_CONFIG.name}
			  </div>
			  <div class="text-xs text-slate-600 -mt-1">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </div>
			</div>
		  </a>
		</div>
  
		<!-- Desktop Navigation - Reduced Size -->
		<div class="hidden lg:flex lg:items-center lg:space-x-1 rtl:space-x-reverse">
		  {#each NAVIGATION as item, index}
			<div 
			  class="relative group"
			  onmouseenter={() => item.submenu && handleDropdownEnter(index)}
			  onmouseleave={() => item.submenu && handleDropdownLeave()}
			>
			  <a
				href={item.href}
				class={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
				  isActiveRoute(item.href)
					? 'text-emerald-700 bg-emerald-50'
					: 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
				}`}
			  >
				<span class="text-base mr-2 rtl:ml-2 rtl:mr-0">{item.icon}</span>
				{($locale || 'en') === 'ar' ? item.title : item.titleEn}
				{#if item.submenu}
				  <ChevronDown 
					class={`ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 transition-all duration-300 ${
					  activeDropdown === index ? 'rotate-180 text-emerald-600' : 'group-hover:rotate-180'
					}`} 
				  />
				{/if}
			  </a>
			  
			  {#if item.submenu}
				<div class={`absolute top-full left-0 w-80 bg-white shadow-2xl border border-slate-200 rounded-xl transition-all duration-300 transform origin-top ${
				  activeDropdown === index 
					? 'opacity-100 visible scale-100 translate-y-2' 
					: 'opacity-0 invisible scale-95 translate-y-0'
				}`}>
				  <div class="p-4">
					<div class="space-y-2">
					  {#each item.submenu as subitem}
						<a
						  href={subitem.href}
						  class="flex items-start p-3 text-sm text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all duration-200 group"
						  onclick={() => activeDropdown = null}
						>
						  <div class="flex-1">
							<div class="font-medium group-hover:text-emerald-600 transition-colors mb-1">
							  {($locale || 'en') === 'ar' ? subitem.title : subitem.titleEn}
							</div>
							{#if subitem.description}
							  <div class="text-xs text-slate-500 leading-relaxed">
								{subitem.description}
							  </div>
							{/if}
						  </div>
						  <ArrowRight class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-200 text-slate-400" />
						</a>
					  {/each}
					</div>
				  </div>
				</div>
			  {/if}
			</div>
		  {/each}
		</div>
  
		<!-- Mobile menu button -->
		<div class="lg:hidden">
		  <button
			onclick={toggleMobileMenu}
			class="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
		  >
			<div class="relative w-6 h-6">
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
				mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
			  }`}></span>
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 translate-y-2.5 ${
				mobileMenuOpen ? 'opacity-0' : 'opacity-100'
			  }`}></span>
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
				mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
			  }`}></span>
			</div>
		  </button>
		</div>
	  </div>
  
	  <!-- Mobile Navigation -->
	  {#if mobileMenuOpen}
		<div class="fixed inset-0 z-50 lg:hidden">
		  <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onclick={closeMobileMenu}></div>
		  
		  <div class="fixed top-0 right-0 rtl:left-0 rtl:right-auto w-full max-w-sm h-full bg-white shadow-2xl">
			<div class="flex items-center justify-between p-6 border-b border-slate-200">
			  <div class="flex items-center">
				<div class="w-8 h-8 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-lg flex items-center justify-center">
				  <span class="text-white font-bold">🛣️</span>
				</div>
				<div class="ml-3 rtl:mr-3 rtl:ml-0">
				  <div class="text-lg font-bold text-slate-900">{APP_CONFIG.name}</div>
				</div>
			  </div>
			  <button onclick={closeMobileMenu} class="p-2 rounded-lg text-slate-500 hover:text-slate-700">
				<X class="w-6 h-6" />
			  </button>
			</div>
			
			<div class="flex-1 overflow-y-auto py-6">
			  <div class="px-6 space-y-2">
				{#each NAVIGATION as item}
				  <div class="space-y-2">
					<a
					  href={item.href}
					  onclick={closeMobileMenu}
					  class={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
						isActiveRoute(item.href)
						  ? 'text-emerald-700 bg-emerald-50'
						  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
					  }`}
					>
					  <span class="text-lg mr-3 rtl:ml-3 rtl:mr-0">{item.icon}</span>
					  {($locale || 'en') === 'ar' ? item.title : item.titleEn}
					</a>
					
					{#if item.submenu}
					  <div class="ml-8 rtl:mr-8 rtl:ml-0 space-y-1">
						{#each item.submenu as subitem}
						  <a
							href={subitem.href}
							onclick={closeMobileMenu}
							class="flex items-center px-4 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
						  >
							{($locale || 'en') === 'ar' ? subitem.title : subitem.titleEn}
						  </a>
						{/each}
					  </div>
					{/if}
				  </div>
				{/each}
			  </div>
			</div>
		  </div>
		</div>
	  {/if}
	</nav>
  </header>