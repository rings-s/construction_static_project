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
	  ChevronRight,
	  Sun, 
	  Moon, 
	  Globe, 
	  MapPin, 
	  Phone, 
	  Mail,
	  ArrowRight,
	  Search,
	  Bell
	} from 'lucide-svelte';
	
	import { APP_CONFIG, NAVIGATION } from '$lib/config/app.js';
	
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let scrollDirection = $state('up');
	let currentTheme = $state('light');
	let activeDropdown = $state(null);
	let activeMobileMenus = $state(new Set());
	let headerElement = $state(null);
	let dropdownTimeout = $state(null);
	let lastScrollY = $state(0);
	let searchOpen = $state(false);
  
	onMount(() => {
	  const handleScroll = () => {
		const currentScrollY = window.scrollY;
		scrolled = currentScrollY > 20;
		scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
		lastScrollY = currentScrollY;
	  };
	  
	  window.addEventListener('scroll', handleScroll, { passive: true });
	  
	  if (browser) {
		const savedTheme = localStorage.getItem('theme') || 'light';
		currentTheme = savedTheme;
		document.documentElement.classList.toggle('dark', savedTheme === 'dark');
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
		
		// Add smooth transition for RTL change
		document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
		setTimeout(() => {
		  document.body.style.transition = '';
		}, 300);
	  }
	}
  
	function toggleMobileMenu() {
	  mobileMenuOpen = !mobileMenuOpen;
	  if (browser) {
		if (mobileMenuOpen) {
		  document.body.style.overflow = 'hidden';
		  document.body.style.position = 'fixed';
		  document.body.style.width = '100%';
		  document.body.style.top = `-${window.scrollY}px`;
		} else {
		  const scrollY = document.body.style.top;
		  document.body.style.overflow = '';
		  document.body.style.position = '';
		  document.body.style.width = '';
		  document.body.style.top = '';
		  if (scrollY) {
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		  }
		  // Reset active menus when closing
		  activeMobileMenus = new Set();
		}
	  }
	}
  
	function closeMobileMenu() {
	  mobileMenuOpen = false;
	  activeMobileMenus = new Set();
	  if (browser) {
		const scrollY = document.body.style.top;
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.width = '';
		document.body.style.top = '';
		if (scrollY) {
		  window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
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

	function toggleMobileSubmenu(index) {
	  const newActiveMobileMenus = new Set(activeMobileMenus);
	  if (newActiveMobileMenus.has(index)) {
		newActiveMobileMenus.delete(index);
	  } else {
		newActiveMobileMenus.add(index);
	  }
	  activeMobileMenus = newActiveMobileMenus;
	}
  
	function isActiveRoute(href) {
	  return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}

	function toggleSearch() {
	  searchOpen = !searchOpen;
	}
  
	// Close dropdowns when clicking outside
	function handleClickOutside(event) {
	  if (headerElement && !headerElement.contains(event.target)) {
		activeDropdown = null;
		searchOpen = false;
	  }
	}
  
	onMount(() => {
	  if (browser) {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	  }
	});
  </script>
  
  <!-- Top Information Bar with Enhanced Design -->
  <div class="bg-slate-900 text-white py-3 hidden lg:block border-b border-slate-800 transition-all duration-300">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex justify-between items-center text-sm">
		<div class="flex items-center space-x-8 rtl:space-x-reverse">
		  <div class="flex items-center group hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
			<MapPin class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
			<span class="text-slate-300 group-hover:text-white transition-colors">
			  {($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}
			</span>
		  </div>
		  <a href="tel:{APP_CONFIG.contact.phone}" class="flex items-center group hover:text-emerald-400 transition-colors duration-200">
			<Phone class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
			<span class="text-slate-300 group-hover:text-white transition-colors">{APP_CONFIG.contact.phone}</span>
		  </a>
		  <a href="mailto:{APP_CONFIG.contact.email}" class="flex items-center group hover:text-emerald-400 transition-colors duration-200">
			<Mail class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
			<span class="text-slate-300 group-hover:text-white transition-colors">{APP_CONFIG.contact.email}</span>
		  </a>
		</div>
		
		<div class="flex items-center space-x-2 rtl:space-x-reverse">
		  <!-- Enhanced Theme Toggle -->
		  <button 
			onclick={toggleTheme} 
			class="group relative p-2.5 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
			aria-label="Toggle theme"
		  >
			<div class="relative w-4 h-4 overflow-hidden">
			  <Sun class={`absolute inset-0 text-yellow-400 transition-all duration-500 transform ${
				currentTheme === 'dark' ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
			  }`} />
			  <Moon class={`absolute inset-0 text-slate-300 transition-all duration-500 transform ${
				currentTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
			  }`} />
			</div>
		  </button>
		  
		  <!-- Enhanced Language Toggle -->
		  <button 
			onclick={toggleLocale} 
			class="group flex items-center p-2.5 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
			aria-label="Toggle language"
		  >
			<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
			<span class="text-xs font-semibold min-w-[24px] text-center transition-all duration-300 group-hover:text-emerald-400">
			  {($locale || 'en') === 'en' ? 'عر' : 'EN'}
			</span>
		  </button>

		  <!-- Search Toggle -->
		  <button 
			onclick={toggleSearch}
			class="group p-2.5 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
			aria-label="Toggle search"
		  >
			<Search class="w-4 h-4 text-slate-300 group-hover:text-emerald-400 transition-colors duration-200" />
		  </button>

		  <!-- Notifications -->
		  <button class="group relative p-2.5 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105">
			<Bell class="w-4 h-4 text-slate-300 group-hover:text-emerald-400 transition-colors duration-200" />
			<div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
		  </button>
		</div>
	  </div>
	</div>
  </div>

  <!-- Search Overlay -->
  {#if searchOpen}
	<div class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-all duration-300" onclick={() => searchOpen = false}>
	  <div class="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4">
		<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 transform animate-search-appear">
		  <div class="flex items-center space-x-4 rtl:space-x-reverse">
			<Search class="w-6 h-6 text-slate-400 flex-shrink-0" />
			<input 
			  type="text" 
			  placeholder={($locale || 'en') === 'ar' ? 'ابحث...' : 'Search...'}
			  class="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-lg focus:outline-none"
			  autofocus
			/>
			<button onclick={() => searchOpen = false} class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
			  <X class="w-5 h-5 text-slate-400" />
			</button>
		  </div>
		</div>
	  </div>
	</div>
  {/if}
  
  <!-- Main Header with Smart Hiding and Background Color -->
  <header 
	bind:this={headerElement}
	class={`sticky top-0 z-50 transition-all duration-500 ease-out border-b backdrop-blur-xl bg-white dark:bg-slate-900 ${
	  scrolled 
		? scrollDirection === 'down' && !mobileMenuOpen
		  ? 'transform -translate-y-full shadow-xl border-slate-200 dark:border-slate-700' 
		  : 'shadow-xl border-slate-200 dark:border-slate-700'
		: 'border-slate-100 dark:border-slate-800'
	}`}
  >
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex justify-between items-center h-20">
		
		<!-- Enhanced Logo with Animation -->
		<div class="flex-shrink-0 group">
		  <a href="/" class="flex items-center transition-all duration-300 group-hover:scale-105">
			<div class="relative">
			  <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 via-emerald-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
				<span class="text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">🛣️</span>
			  </div>
			  <div class="absolute -inset-1 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
			</div>
			<div class="ml-4 rtl:mr-4 rtl:ml-0">
			  <div class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
				{APP_CONFIG.name}
			  </div>
			  <div class="text-xs text-slate-600 dark:text-slate-400 -mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </div>
			</div>
		  </a>
		</div>
  
		<!-- Enhanced Desktop Navigation -->
		<div class="hidden lg:flex lg:items-center lg:space-x-1 rtl:space-x-reverse">
		  {#each NAVIGATION as item, index}
			<div 
			  class="relative group"
			  onmouseenter={() => item.submenu && handleDropdownEnter(index)}
			  onmouseleave={() => item.submenu && handleDropdownLeave()}
			>
			  <a
				href={item.href}
				class={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden ${
				  isActiveRoute(item.href)
					? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm'
					: 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
				}`}
			  >
				<!-- Active indicator -->
				{#if isActiveRoute(item.href)}
				  <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl"></div>
				{/if}
				
				<span class="text-lg mr-3 rtl:ml-3 rtl:mr-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
				<span class="relative z-10">{($locale || 'en') === 'ar' ? item.title : item.titleEn}</span>
				{#if item.submenu}
				  <ChevronDown 
					class={`ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 transition-all duration-300 ${
					  activeDropdown === index ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : 'group-hover:rotate-180'
					}`} 
				  />
				{/if}
			  </a>
			  
			  <!-- Enhanced Mega Menu -->
			  {#if item.submenu}
				<div class={`absolute top-full ${($locale || 'en') === 'ar' ? 'right-0' : 'left-0'} w-96 bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 rounded-2xl transition-all duration-300 transform origin-top ${
				  activeDropdown === index 
					? 'opacity-100 visible scale-100 translate-y-2' 
					: 'opacity-0 invisible scale-95 translate-y-0'
				} overflow-hidden`}>
				  <div class="p-6">
					<div class="grid gap-1">
					  {#each item.submenu as subitem}
						<a
						  href={subitem.href}
						  class="flex items-start p-4 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-200 group relative overflow-hidden"
						  onclick={() => activeDropdown = null}
						>
						  <div class="flex-1">
							<div class="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
							  {($locale || 'en') === 'ar' ? subitem.title : subitem.titleEn}
							</div>
							{#if subitem.description}
							  <div class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
								{subitem.description}
							  </div>
							{/if}
						  </div>
						  <ArrowRight class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-200 text-slate-400 mt-1" />
						  
						  <!-- Hover effect -->
						  <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
						</a>
					  {/each}
					</div>
				  </div>
				</div>
			  {/if}
			</div>
		  {/each}
		</div>
  
		<!-- Enhanced Mobile Menu Button -->
		<div class="lg:hidden">
		  <button
			onclick={toggleMobileMenu}
			class="relative inline-flex items-center justify-center p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
			aria-label="Toggle mobile menu"
		  >
			<div class="relative w-6 h-6">
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${
				mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
			  }`}></span>
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out translate-y-2.5 ${
				mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
			  }`}></span>
			  <span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${
				mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
			  }`}></span>
			</div>
		  </button>
		</div>
	  </div>
	</nav>
  </header>

  <!-- Enhanced Mobile Navigation -->
  {#if mobileMenuOpen}
	<div class="fixed inset-0 z-[60] lg:hidden">
	  <!-- Enhanced Backdrop with blur -->
	  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300" onclick={closeMobileMenu}></div>
	  
	  <!-- Enhanced Mobile menu panel with proper background and scrolling -->
	  <div class={`fixed top-0 ${($locale || 'en') === 'ar' ? 'left-0' : 'right-0'} w-full max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl transform transition-all duration-300 ease-out ${
		mobileMenuOpen ? 'translate-x-0' : (($locale || 'en') === 'ar' ? '-translate-x-full' : 'translate-x-full')
	  } border-l border-slate-200 dark:border-slate-700`}>
		
		<!-- Enhanced Mobile header with solid background -->
		<div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800/20">
		  <div class="flex items-center">
			<div class="w-10 h-10 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
			  <span class="text-white font-bold text-lg">🛣️</span>
			</div>
			<div class="ml-3 rtl:mr-3 rtl:ml-0">
			  <div class="text-lg font-bold text-slate-900 dark:text-white">{APP_CONFIG.name}</div>
			  <div class="text-xs text-slate-600 dark:text-slate-400 -mt-1">
				{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
			  </div>
			</div>
		  </div>
		  <button 
			onclick={closeMobileMenu} 
			class="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
		  >
			<X class="w-6 h-6" />
		  </button>
		</div>
		
		<!-- Enhanced Mobile navigation content with proper scrolling and background -->
		<div class="flex-1 overflow-y-auto bg-white dark:bg-slate-900" style="max-height: calc(100vh - 88px - 140px);">
		  <div class="p-6 space-y-2">
			{#each NAVIGATION as item, index}
			  <div class="space-y-1">
				<!-- Main menu item as toggleable button -->
				<div class="flex items-center rounded-xl overflow-hidden">
				  <!-- Main route link -->
				  <a
					href={item.href}
					onclick={closeMobileMenu}
					class={`flex-1 flex items-center px-4 py-4 text-base font-semibold transition-all duration-200 group ${
					  isActiveRoute(item.href)
						? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
						: 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
					}`}
				  >
					<span class="text-xl mr-4 rtl:ml-4 rtl:mr-0 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
					<span class="flex-1">{($locale || 'en') === 'ar' ? item.title : item.titleEn}</span>
					{#if isActiveRoute(item.href)}
					  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse ml-2 rtl:mr-2 rtl:ml-0"></div>
					{/if}
				  </a>
				  
				  <!-- Submenu toggle button (only if submenu exists) -->
				  {#if item.submenu}
					<button
					  onclick={() => toggleMobileSubmenu(index)}
					  class={`px-4 py-4 transition-all duration-200 ${
						activeMobileMenus.has(index)
						  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
						  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
					  }`}
					  aria-label="Toggle submenu"
					>
					  <ChevronRight class={`w-5 h-5 transition-transform duration-300 ${
						activeMobileMenus.has(index) ? 'rotate-90' : ''
					  }`} />
					</button>
				  {/if}
				</div>
				
				<!-- Enhanced Submenu with proper animation and background -->
				{#if item.submenu}
				  <div class={`overflow-hidden transition-all duration-300 ease-out ${
					activeMobileMenus.has(index) 
					  ? 'max-h-[500px] opacity-100' 
					  : 'max-h-0 opacity-0'
				  }`}>
					<div class="ml-8 rtl:mr-8 rtl:ml-0 mt-2 space-y-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl p-2">
					  {#each item.submenu as subitem}
						<a
						  href={subitem.href}
						  onclick={closeMobileMenu}
						  class="flex items-center px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
						>
						  <span class="flex-1">{($locale || 'en') === 'ar' ? subitem.title : subitem.titleEn}</span>
						  <ArrowRight class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-200" />
						</a>
					  {/each}
					</div>
				  </div>
				{/if}
			  </div>
			{/each}
		  </div>
		</div>

		<!-- Enhanced Mobile footer actions with solid background -->
		<div class="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
		  <div class="grid grid-cols-2 gap-4 mb-4">
			<button 
			  onclick={toggleTheme}
			  class="flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
			>
			  {#if currentTheme === 'dark'}
				<Sun class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
				<span>{($locale || 'en') === 'ar' ? 'نهاري' : 'Light'}</span>
			  {:else}
				<Moon class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
				<span>{($locale || 'en') === 'ar' ? 'ليلي' : 'Dark'}</span>
			  {/if}
			</button>
			
			<button 
			  onclick={toggleLocale}
			  class="flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
			>
			  <Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
			  <span>{($locale || 'en') === 'en' ? 'عربية' : 'English'}</span>
			</button>
		  </div>
		  
		  <!-- Contact info in mobile with background -->
		  <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
			<div class="space-y-3">
			  <a href="tel:{APP_CONFIG.contact.phone}" class="flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
				<Phone class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span>{APP_CONFIG.contact.phone}</span>
			  </a>
			  <a href="mailto:{APP_CONFIG.contact.email}" class="flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
				<Mail class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span>{APP_CONFIG.contact.email}</span>
			  </a>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  {/if}

  <style>
	@keyframes search-appear {
	  from {
		opacity: 0;
		transform: scale(0.95) translateY(-10px);
	  }
	  to {
		opacity: 1;
		transform: scale(1) translateY(0);
	  }
	}

	.animate-search-appear {
	  animation: search-appear 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Enhanced mobile menu scrolling with proper height calculation */
	.mobile-nav-content {
	  scrollbar-width: thin;
	  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
	}

	.mobile-nav-content::-webkit-scrollbar {
	  width: 4px;
	}

	.mobile-nav-content::-webkit-scrollbar-track {
	  background: transparent;
	}

	.mobile-nav-content::-webkit-scrollbar-thumb {
	  background-color: rgba(148, 163, 184, 0.3);
	  border-radius: 2px;
	}

	.mobile-nav-content::-webkit-scrollbar-thumb:hover {
	  background-color: rgba(148, 163, 184, 0.5);
	}

	/* Enhanced focus styles for accessibility */
	button:focus-visible,
	a:focus-visible {
	  outline: 2px solid theme('colors.emerald.500');
	  outline-offset: 2px;
	}

	/* RTL specific animations */
	[dir="rtl"] .group-hover\:translate-x-1 {
	  transform: translateX(-0.25rem);
	}

	/* Background color fixes */
	.backdrop-blur-xl {
	  backdrop-filter: blur(24px);
	  -webkit-backdrop-filter: blur(24px);
	}

	.backdrop-blur-sm {
	  backdrop-filter: blur(4px);
	  -webkit-backdrop-filter: blur(4px);
	}

	/* Smooth submenu animation with proper max-height */
	.max-h-0 {
	  max-height: 0;
	}

	.max-h-\[500px\] {
	  max-height: 500px;
	}

	/* Enhanced mobile panel styling with solid backgrounds */
	.mobile-menu-panel {
	  background-color: rgb(255 255 255);
	}

	.dark .mobile-menu-panel {
	  background-color: rgb(15 23 42);
	}

	/* Performance optimizations */
	.mobile-menu-panel {
	  contain: layout style paint;
	  will-change: transform;
	}

	/* Prevent bounce scroll on iOS */
	.mobile-nav-content {
	  -webkit-overflow-scrolling: touch;
	  overscroll-behavior: contain;
	}

	/* Accessibility improvements */
	@media (prefers-reduced-motion: reduce) {
	  .transition-all,
	  .transition-transform,
	  .transition-colors {
		transition-duration: 0.01ms !important;
	  }
	  
	  .animate-pulse {
		animation: none !important;
	  }
	}

	/* Enhanced responsive design */
	@media (max-width: 768px) {
	  .mobile-nav-content {
		max-height: calc(100vh - 228px);
	  }
	}

	@media (max-width: 640px) {
	  .mobile-nav-content {
		max-height: calc(100vh - 228px);
	  }
	}
  </style>