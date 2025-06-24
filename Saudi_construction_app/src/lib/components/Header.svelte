<!-- src/lib/components/Header.svelte -->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	
	import { 
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
		Home,
		Building2,
		Wrench,
		Users,
		FileText,
		MessageCircle,
		Shield,
		Zap,
		Target,
		Award,
		TrendingUp,
		Clock,
		CheckCircle,
		Star
	} from 'lucide-svelte';
	
	import { APP_CONFIG, NAVIGATION } from '$lib/config/app.js';
	
	let sideNavOpen = $state(false);
	let scrolled = $state(false);
	let scrollDirection = $state('up');
	let currentTheme = $state('light');
	let activeDropdown = $state(null);
	let activeMobileMenus = $state(new Set());
	let headerElement = $state(null);
	let dropdownTimeout = $state(null);
	let lastScrollY = $state(0);
	let sideNavMounted = $state(false);
  
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
			
			document.body.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
			setTimeout(() => {
				document.body.style.transition = '';
			}, 400);
		}
	}
  
	function toggleSideNav() {
		sideNavOpen = !sideNavOpen;
		if (browser) {
			if (sideNavOpen) {
				document.body.style.overflow = 'hidden';
				setTimeout(() => {
					sideNavMounted = true;
				}, 50);
			} else {
				document.body.style.overflow = '';
				sideNavMounted = false;
				setTimeout(() => {
					activeMobileMenus = new Set();
					activeDropdown = null;
				}, 600);
			}
		}
	}
  
	function closeSideNav() {
		sideNavOpen = false;
		sideNavMounted = false;
		activeMobileMenus = new Set();
		activeDropdown = null;
		if (browser) {
			document.body.style.overflow = '';
		}
	}
  
	function handleDropdownToggle(index) {
		if (activeMobileMenus.has(index)) {
			const newActiveMobileMenus = new Set(activeMobileMenus);
			newActiveMobileMenus.delete(index);
			activeMobileMenus = newActiveMobileMenus;
		} else {
			const newActiveMobileMenus = new Set(activeMobileMenus);
			newActiveMobileMenus.add(index);
			activeMobileMenus = newActiveMobileMenus;
		}
	}
  
	function isActiveRoute(href) {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
  
	function getIconComponent(iconString) {
		switch(iconString) {
			case '🏠': return Home;
			case '🏢': return Building2;
			case '🛠️': return Wrench;
			case '👥': return Users;
			case '📄': return FileText;
			case '💬': return MessageCircle;
			case '🛡️': return Shield;
			case '⚡': return Zap;
			case '🎯': return Target;
			case '🏆': return Award;
			case '📈': return TrendingUp;
			case '🕐': return Clock;
			case '✅': return CheckCircle;
			case '⭐': return Star;
			default: return Home;
		}
	}
  
	// Close side nav when clicking outside
	function handleClickOutside(event) {
		if (headerElement && !headerElement.contains(event.target) && sideNavOpen) {
			const sideNavElement = document.querySelector('.side-nav-panel');
			if (sideNavElement && !sideNavElement.contains(event.target)) {
				closeSideNav();
			}
		}
	}
  
	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<!-- High Contrast Top Information Bar -->
<div class="bg-slate-900 dark:bg-slate-950 text-white py-3 hidden lg:block border-b border-slate-800 dark:border-slate-700 transition-all duration-300">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center text-sm">
			<div class="flex items-center space-x-8 rtl:space-x-reverse">
				<div class="flex items-center group hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200 cursor-pointer">
					<MapPin class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 dark:text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
					<span class="text-slate-300 dark:text-slate-200 group-hover:text-white dark:group-hover:text-white transition-colors">
						{($locale || 'en') === 'ar' ? APP_CONFIG.contact.address : APP_CONFIG.contact.addressEn}
					</span>
				</div>
				<a href="tel:{APP_CONFIG.contact.phone}" class="flex items-center group hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200">
					<Phone class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 dark:text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
					<span class="text-slate-300 dark:text-slate-200 group-hover:text-white dark:group-hover:text-white transition-colors">{APP_CONFIG.contact.phone}</span>
				</a>
				<a href="mailto:{APP_CONFIG.contact.email}" class="flex items-center group hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200">
					<Mail class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 dark:text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
					<span class="text-slate-300 dark:text-slate-200 group-hover:text-white dark:group-hover:text-white transition-colors">{APP_CONFIG.contact.email}</span>
				</a>
			</div>
			
			<div class="flex items-center space-x-2 rtl:space-x-reverse">
				<!-- High Contrast Theme Toggle -->
				<button 
					onclick={toggleTheme} 
					class="group relative p-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105"
					aria-label="Toggle theme"
				>
					<div class="relative w-4 h-4 overflow-hidden">
						<Sun class={`absolute inset-0 text-yellow-400 dark:text-yellow-300 transition-all duration-500 transform ${
							currentTheme === 'dark' ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
						}`} />
						<Moon class={`absolute inset-0 text-slate-300 dark:text-slate-200 transition-all duration-500 transform ${
							currentTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
						}`} />
					</div>
				</button>
				
				<!-- High Contrast Language Toggle -->
				<button 
					onclick={toggleLocale} 
					class="group flex items-center p-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105"
					aria-label="Toggle language"
				>
					<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 dark:text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
					<span class="text-xs font-semibold min-w-[24px] text-center transition-all duration-300 group-hover:text-emerald-400 dark:group-hover:text-emerald-300 text-slate-200 dark:text-slate-100">
						{($locale || 'en') === 'en' ? 'عر' : 'EN'}
					</span>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- High Contrast Main Header -->
<header 
	bind:this={headerElement}
	class={`sticky top-0 z-50 transition-all duration-500 ease-out border-b backdrop-blur-xl ${
		scrolled 
			? scrollDirection === 'down' && !sideNavOpen
				? 'transform -translate-y-full shadow-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900' 
				: 'shadow-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900'
			: 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900'
	}`}
>
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-20">
			
			<!-- High Contrast Logo -->
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
						<div class="text-xs text-slate-600 dark:text-slate-300 -mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
						</div>
					</div>
				</a>
			</div>

			<!-- High Contrast Premium Hamburger Button -->
			<button
				onclick={toggleSideNav}
				class="premium-hamburger relative p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-emerald-50 hover:to-emerald-100 dark:hover:from-emerald-900/30 dark:hover:to-emerald-800/30 border border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500 shadow-lg hover:shadow-xl dark:shadow-slate-900/20 transition-all duration-400 ease-out group"
				class:active={sideNavOpen}
				aria-label="Toggle navigation menu"
				aria-expanded={sideNavOpen}
			>
				<!-- High Contrast SVG Hamburger -->
				<svg 
					class="w-6 h-6 transition-all duration-600 ease-out group-hover:scale-110"
					viewBox="0 0 24 24" 
					fill="none" 
					xmlns="http://www.w3.org/2000/svg"
				>
					<!-- Top Line -->
					<path 
						class={`hamburger-line top-line transition-all duration-600 ease-out ${
							sideNavOpen ? 'rotate-45 translate-y-[7px]' : ''
						}`}
						d="M3 6h18" 
						stroke="currentColor" 
						stroke-width="2.5" 
						stroke-linecap="round"
					/>
					<!-- Middle Line -->
					<path 
						class={`hamburger-line middle-line transition-all duration-400 ease-out ${
							sideNavOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
						}`}
						d="M3 12h18" 
						stroke="currentColor" 
						stroke-width="2.5" 
						stroke-linecap="round"
					/>
					<!-- Bottom Line -->
					<path 
						class={`hamburger-line bottom-line transition-all duration-600 ease-out ${
							sideNavOpen ? '-rotate-45 -translate-y-[7px]' : ''
						}`}
						d="M3 18h18" 
						stroke="currentColor" 
						stroke-width="2.5" 
						stroke-linecap="round"
					/>
				</svg>
				
				<!-- High Contrast Ripple Effect -->
				<div class={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 dark:from-emerald-400/30 dark:to-emerald-500/30 transition-all duration-500 ease-out ${
					sideNavOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
				}`}></div>
				
				<!-- High Contrast Status Indicator -->
				<div class={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-400 ease-out ${
					sideNavOpen ? 'bg-emerald-500 dark:bg-emerald-400 scale-100' : 'bg-slate-400 dark:bg-slate-500 scale-0'
				}`}></div>
			</button>
		</div>
	</nav>
</header>

<!-- High Contrast Premium Side Navigation Panel -->
{#if sideNavOpen}
	<div class="fixed inset-0 z-[60] premium-nav-overlay">
		<!-- High Contrast Backdrop -->
		<div 
			class={`fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-lg transition-all duration-600 ease-out ${
				sideNavMounted ? 'opacity-100' : 'opacity-0'
			}`}
			onclick={closeSideNav}
			role="button"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					closeSideNav();
				}
			}}
			aria-label="Close navigation menu"
		></div>
		
		<!-- High Contrast Side Navigation Panel -->
		<div class={`premium-side-nav fixed top-0 ${($locale || 'en') === 'ar' ? 'left-0' : 'right-0'} w-full max-w-md h-full bg-white dark:bg-slate-900 backdrop-blur-xl shadow-2xl dark:shadow-black/40 transform transition-all duration-600 ease-out ${
			sideNavMounted ? 'translate-x-0 scale-100' : (($locale || 'en') === 'ar' ? '-translate-x-full scale-95' : 'translate-x-full scale-95')
		} border-l border-slate-200 dark:border-slate-700`}>
			
			<!-- High Contrast Nav Header -->
			<div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 via-slate-50 to-emerald-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
				<div class="flex items-center space-x-3 rtl:space-x-reverse">
					<div class="w-10 h-10 bg-gradient-to-br from-emerald-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
						<span class="text-white font-bold text-lg">🛣️</span>
					</div>
					<div>
						<div class="text-lg font-bold text-slate-900 dark:text-white">{APP_CONFIG.name}</div>
						<div class="text-xs text-slate-600 dark:text-slate-300 -mt-1">
							{($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}
						</div>
					</div>
				</div>
				<button 
					onclick={closeSideNav} 
					class="premium-close-btn p-3 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-out group"
					aria-label="Close navigation"
				>
					<X class="w-6 h-6 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300 ease-out" />
				</button>
			</div>
			
			<!-- High Contrast Navigation Content -->
			<div class="flex-1 overflow-y-auto premium-scrollbar bg-white dark:bg-slate-900" style="height: calc(100vh - 280px);">
				<div class="p-6 space-y-3">
					{#each NAVIGATION as item, index}
						<div class="nav-item space-y-2" style={`animation-delay: ${index * 100}ms`}>
							<!-- High Contrast Navigation Item -->
							<div class="flex items-center rounded-2xl overflow-hidden group/item shadow-sm hover:shadow-md dark:shadow-slate-800/20 transition-all duration-300 ease-out">
								<!-- Main Route Link -->
								<a
									href={item.href}
									onclick={closeSideNav}
									class={`flex-1 flex items-center px-5 py-4 text-base font-semibold transition-all duration-400 ease-out group/link relative overflow-hidden ${
										isActiveRoute(item.href)
											? 'text-emerald-700 dark:text-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/60 dark:to-emerald-900/40 shadow-inner'
											: 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800/60 dark:hover:to-slate-700/40'
									}`}
								>
									<!-- High Contrast Icon -->
									<div class="icon-container mr-4 rtl:ml-4 rtl:mr-0 relative">
										<div class={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 ease-out ${
											isActiveRoute(item.href)
												? 'bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-lg'
												: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover/link:bg-emerald-100 dark:group-hover/link:bg-emerald-900/40 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400'
										}`}>
											<!-- Fix: Replace svelte:component with conditional rendering -->
											{#if item.icon === '🏠'}
												<Home class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else if item.icon === '🏢'}
												<Building2 class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else if item.icon === '🛠️'}
												<Wrench class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else if item.icon === '👥'}
												<Users class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else if item.icon === '📄'}
												<FileText class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else if item.icon === '💬'}
												<MessageCircle class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{:else}
												<Home class="w-5 h-5 transition-all duration-300 ease-out group-hover/link:scale-110" />
											{/if}
										</div>
										<!-- High Contrast Glow Effect -->
										<div class={`absolute inset-0 rounded-xl bg-emerald-500/20 dark:bg-emerald-400/20 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ease-out blur-sm ${
											isActiveRoute(item.href) ? 'opacity-60' : ''
										}`}></div>
									</div>
									
									<div class="flex-1 relative z-10">
										<span class="block font-semibold">{($locale || 'en') === 'ar' ? item.title : item.titleEn}</span>
										{#if item.description}
											<span class="block text-xs text-slate-500 dark:text-slate-400 mt-1 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
												{item.description}
											</span>
										{/if}
									</div>
									
									{#if isActiveRoute(item.href)}
										<div class="flex items-center space-x-2 rtl:space-x-reverse">
											<div class="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
											<CheckCircle class="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
										</div>
									{/if}
									
									<!-- High Contrast Hover Gradient -->
									<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-600/5 to-transparent dark:from-emerald-400/10 dark:via-emerald-500/10 opacity-0 group-hover/link:opacity-100 transition-all duration-400 ease-out rounded-2xl"></div>
								</a>
								
								<!-- High Contrast Submenu Toggle -->
								{#if item.submenu}
									<button
										onclick={() => handleDropdownToggle(index)}
										class={`px-4 py-4 transition-all duration-400 ease-out hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-2xl ${
											activeMobileMenus.has(index)
												? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40'
												: 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
										}`}
										aria-label="Toggle submenu"
									>
										<ChevronRight class={`w-5 h-5 transition-all duration-500 ease-out ${
											activeMobileMenus.has(index) ? 'rotate-90 text-emerald-600 dark:text-emerald-400 scale-110' : 'group-hover/item:rotate-90'
										}`} />
									</button>
								{/if}
							</div>
							
							<!-- High Contrast Submenu -->
							{#if item.submenu}
								<div class={`overflow-hidden transition-all duration-700 ease-out ${
									activeMobileMenus.has(index) 
										? 'max-h-[600px] opacity-100 translate-y-0' 
										: 'max-h-0 opacity-0 -translate-y-4'
								}`}>
									<div class="ml-6 rtl:mr-6 rtl:ml-0 mt-3 space-y-2 bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-inner backdrop-blur-sm">
										{#each item.submenu as subitem, subIndex}
											<a
												href={subitem.href}
												onclick={closeSideNav}
												class="submenu-item flex items-center px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700/60 rounded-xl transition-all duration-300 ease-out group/sub relative overflow-hidden"
												style={`animation-delay: ${(index * 100) + (subIndex * 50)}ms`}
											>
												<!-- High Contrast Submenu Icon -->
												<div class="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/sub:bg-emerald-100 dark:group-hover/sub:bg-emerald-900/50 transition-all duration-300">
													<div class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 group-hover/sub:bg-emerald-500 dark:group-hover/sub:bg-emerald-400 transition-colors duration-300"></div>
												</div>
												
												<span class="flex-1 relative z-10 font-medium">{($locale || 'en') === 'ar' ? subitem.title : subitem.titleEn}</span>
												
												<ArrowRight class="w-4 h-4 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 rtl:group-hover/sub:-translate-x-1 transition-all duration-300 ease-out text-emerald-500 dark:text-emerald-400" />
												
												<!-- High Contrast Submenu Hover Effect -->
												<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent dark:from-emerald-400/10 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 ease-out rounded-xl"></div>
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- High Contrast Premium Footer -->
			<div class="border-t border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 backdrop-blur-sm">
				<div class="grid grid-cols-2 gap-4 mb-6">
					<button 
						onclick={toggleTheme}
						class="premium-control-btn flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-300 ease-out border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md group backdrop-blur-sm"
					>
						{#if currentTheme === 'dark'}
							<Sun class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out text-amber-500" />
							<span>{($locale || 'en') === 'ar' ? 'نهاري' : 'Light'}</span>
						{:else}
							<Moon class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500 ease-out text-slate-600 dark:text-slate-300" />
							<span>{($locale || 'en') === 'ar' ? 'ليلي' : 'Dark'}</span>
						{/if}
					</button>
					
					<button 
						onclick={toggleLocale}
						class="premium-control-btn flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-300 ease-out border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md group backdrop-blur-sm"
					>
						<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out text-emerald-500 dark:text-emerald-400" />
						<span>{($locale || 'en') === 'en' ? 'عربية' : 'English'}</span>
					</button>
				</div>
				
				<!-- High Contrast Contact Info -->
				<div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm backdrop-blur-sm">
					<div class="space-y-3">
						<a href="tel:{APP_CONFIG.contact.phone}" class="premium-contact-link flex items-center text-sm text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 ease-out p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 group">
							<div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all duration-300">
								<Phone class="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
							</div>
							<span class="font-medium">{APP_CONFIG.contact.phone}</span>
						</a>
						<a href="mailto:{APP_CONFIG.contact.email}" class="premium-contact-link flex items-center text-sm text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 ease-out p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 group">
							<div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all duration-300">
								<Mail class="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
							</div>
							<span class="font-medium">{APP_CONFIG.contact.email}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* High Contrast Premium Hamburger Animations */
	.premium-hamburger {
		position: relative;
		overflow: hidden;
	}

	.premium-hamburger:before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		z-index: 0;
	}

	.premium-hamburger:hover:before {
		width: 120px;
		height: 120px;
	}

	.premium-hamburger.active:before {
		width: 140px;
		height: 140px;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
	}

	.hamburger-line {
		transform-origin: center;
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
	}

	.premium-hamburger .hamburger-line {
		stroke: rgb(71, 85, 105); /* slate-600 */
	}

	.dark .premium-hamburger .hamburger-line {
		stroke: rgb(226, 232, 240); /* slate-200 */
	}

	.premium-hamburger:hover .hamburger-line {
		stroke: rgb(16, 185, 129); /* emerald-500 */
	}

	.premium-hamburger.active .hamburger-line {
		stroke: rgb(16, 185, 129); /* emerald-500 */
	}

	.dark .premium-hamburger.active .hamburger-line {
		stroke: rgb(52, 211, 153); /* emerald-400 */
	}

	/* High Contrast Side Navigation */
	.premium-nav-overlay {
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	.premium-side-nav {
		contain: layout style paint;
		will-change: transform, opacity;
		background: rgb(255, 255, 255); /* Solid white in light mode */
	}

	.dark .premium-side-nav {
		background: rgb(15, 23, 42); /* Solid slate-900 in dark mode */
	}

	/* High Contrast Premium Scrollbar */
	.premium-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: rgba(16, 185, 129, 0.4) rgba(148, 163, 184, 0.2);
		scroll-behavior: smooth;
	}

	.dark .premium-scrollbar {
		scrollbar-color: rgba(52, 211, 153, 0.4) rgba(71, 85, 105, 0.3);
	}

	.premium-scrollbar::-webkit-scrollbar {
		width: 8px;
	}

	.premium-scrollbar::-webkit-scrollbar-track {
		background: rgba(148, 163, 184, 0.2);
		border-radius: 10px;
	}

	.dark .premium-scrollbar::-webkit-scrollbar-track {
		background: rgba(71, 85, 105, 0.3);
	}

	.premium-scrollbar::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.7));
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	.dark .premium-scrollbar::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, rgba(52, 211, 153, 0.5), rgba(52, 211, 153, 0.7));
	}

	.premium-scrollbar::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(16, 185, 129, 0.9));
	}

	.dark .premium-scrollbar::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(135deg, rgba(52, 211, 153, 0.7), rgba(52, 211, 153, 0.9));
	}

	/* High Contrast Navigation Item Animations */
	@keyframes slideInFade {
		0% {
			opacity: 0;
			transform: translateX(-20px) translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateX(0) translateY(0);
		}
	}

	@keyframes slideInFadeRTL {
		0% {
			opacity: 0;
			transform: translateX(20px) translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateX(0) translateY(0);
		}
	}

	.nav-item {
		animation: slideInFade 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
		opacity: 0;
	}

	[dir="rtl"] .nav-item {
		animation: slideInFadeRTL 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
	}

	.submenu-item {
		animation: slideInFade 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
		opacity: 0;
	}

	[dir="rtl"] .submenu-item {
		animation: slideInFadeRTL 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
	}

	/* High Contrast Icon Animations */
	.icon-container {
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.dark .icon-container {
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.icon-container:hover {
		filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));
	}

	.dark .icon-container:hover {
		filter: drop-shadow(0 4px 8px rgba(52, 211, 153, 0.4));
	}

	/* High Contrast Control Buttons */
	.premium-control-btn {
		position: relative;
		overflow: hidden;
	}

	.premium-control-btn:before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		z-index: 0;
	}

	.premium-control-btn:hover:before {
		width: 100px;
		height: 100px;
	}

	/* High Contrast Contact Links */
	.premium-contact-link {
		position: relative;
		overflow: hidden;
	}

	.premium-contact-link:before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent, rgba(16, 185, 129, 0.05), transparent);
		opacity: 0;
		transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.dark .premium-contact-link:before {
		background: linear-gradient(135deg, transparent, rgba(52, 211, 153, 0.1), transparent);
	}

	.premium-contact-link:hover:before {
		opacity: 1;
	}

	/* High Contrast Focus States */
	button:focus-visible,
	a:focus-visible {
		outline: 2px solid rgba(16, 185, 129, 0.8);
		outline-offset: 2px;
		border-radius: 0.75rem;
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
	}

	.dark button:focus-visible,
	.dark a:focus-visible {
		outline: 2px solid rgba(52, 211, 153, 0.8);
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.2);
	}

	/* Prevent Scroll Bounce */
	.premium-scrollbar {
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: contain;
	}

	/* Reduced Motion Support */
	@media (prefers-reduced-motion: reduce) {
		.nav-item,
		.submenu-item,
		.premium-hamburger,
		.premium-side-nav,
		.premium-control-btn,
		.premium-contact-link {
			animation: none !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* High Contrast Mobile Responsiveness */
	@media (max-width: 768px) {
		.premium-side-nav {
			max-width: 90vw;
		}
	}

	@media (max-width: 640px) {
		.premium-side-nav {
			max-width: 95vw;
		}
		
		.premium-hamburger {
			padding: 0.75rem;
		}
	}

	/* High Contrast Premium Hover Effects */
	.premium-hamburger:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
	}

	.dark .premium-hamburger:hover {
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
	}

	.premium-hamburger.active {
		transform: scale(0.96);
		box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
	}

	.dark .premium-hamburger.active {
		box-shadow: 0 6px 20px rgba(52, 211, 153, 0.3);
	}

	/* High Contrast Transitions */
	* {
		transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
</style>