<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
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
		ArrowRight,
		Building2,
		Car,
		Route,
		BarChart3,
		Target,
		Users,
		MessageSquare,
		BookOpen,
		Headphones
	} from 'lucide-svelte';
	
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let currentTheme = $state('light');
	let activeDropdown = $state(null);
	let headerElement = $state(null);
	let dropdownTimeout = $state(null);

	// Enhanced navigation structure with icons and descriptions
	const navigation = [
		{ 
			name: 'nav.home', 
			href: '/',
			icon: Building2
		},
		{ 
			name: 'nav.about', 
			href: '/about',
			icon: Users
		},
		{
			name: 'nav.highway_engineering',
			href: '/highway-engineering',
			icon: Route,
			description: 'Complete infrastructure solutions for modern highways',
			submenu: [
				{ 
					name: 'nav.car_park_design', 
					href: '/highway-engineering/car-park-design',
					icon: Car,
					description: 'Optimized parking solutions with smart technology integration'
				},
				{ 
					name: 'nav.traffic_management_plans', 
					href: '/highway-engineering/traffic-management-plans',
					icon: BarChart3,
					description: 'Strategic traffic flow management and safety protocols'
				},
				{ 
					name: 'nav.highway_junction_design', 
					href: '/highway-engineering/highway-junction-design',
					icon: Route,
					description: 'Advanced junction engineering for optimal traffic flow'
				},
				{ 
					name: 'nav.sustainable_transport', 
					href: '/highway-engineering/sustainable-transport',
					icon: Building2,
					description: 'Eco-friendly transport solutions for sustainable development'
				}
			]
		},
		{
			name: 'nav.traffic_engineering',
			href: '/traffic-engineering',
			icon: BarChart3,
			description: 'Smart traffic solutions and intelligent systems',
			submenu: [
				{ 
					name: 'nav.traffic_modeling', 
					href: '/traffic-engineering/traffic-modeling',
					icon: BarChart3,
					description: 'Advanced modeling and simulation for traffic optimization'
				},
				{ 
					name: 'nav.traffic_assessment', 
					href: '/traffic-engineering/traffic-assessment',
					icon: Target,
					description: 'Comprehensive traffic analysis and performance evaluation'
				},
				{ 
					name: 'nav.traffic_impact_assessment', 
					href: '/traffic-engineering/traffic-impact-assessment',
					icon: BarChart3,
					description: 'Development impact evaluation and mitigation strategies'
				},
				{ 
					name: 'nav.its', 
					href: '/traffic-engineering/its',
					icon: BarChart3,
					description: 'Intelligent transport systems and smart infrastructure'
				},
				{ 
					name: 'nav.road_safety_engineering', 
					href: '/traffic-engineering/road-safety-engineering',
					icon: Target,
					description: 'Safety-first engineering approaches and solutions'
				},
				{ 
					name: 'nav.traffic_management_initiative', 
					href: '/traffic-engineering/traffic-management-initiative',
					icon: BarChart3,
					description: 'Proactive traffic management and congestion solutions'
				},
				{ 
					name: 'nav.swept_path_analysis', 
					href: '/traffic-engineering/swept-path-analysis',
					icon: Route,
					description: 'Precise vehicle path analysis and turning movements'
				}
			]
		},
		{
			name: 'nav.transport_planning',
			href: '/transport-planning',
			icon: Building2,
			description: 'Strategic mobility planning and development',
			submenu: [
				{ 
					name: 'nav.site_access', 
					href: '/transport-planning/site-access',
					icon: Route,
					description: 'Optimal site connectivity and access design'
				},
				{ 
					name: 'nav.transport_feasibility_studies', 
					href: '/transport-planning/transport-feasibility-studies',
					icon: BarChart3,
					description: 'Comprehensive feasibility analysis and planning support'
				},
				{ 
					name: 'nav.master_planning', 
					href: '/transport-planning/master-planning',
					icon: Building2,
					description: 'Integrated transport design and master planning'
				},
				{ 
					name: 'nav.technical_rebuttals', 
					href: '/transport-planning/technical-rebuttals',
					icon: BarChart3,
					description: 'Expert technical responses and planning support'
				},
				{ 
					name: 'nav.transport_statement_assessment', 
					href: '/transport-planning/transport-statement-assessment',
					icon: Target,
					description: 'Planning compliance assessment and documentation'
				},
				{ 
					name: 'nav.travel_plan_development', 
					href: '/transport-planning/travel-plan-development',
					icon: Route,
					description: 'Sustainable travel strategies and implementation'
				}
			]
		},
		{
			name: 'nav.services',
			href: '/services',
			icon: Headphones,
			description: 'Additional consulting and support services',
			submenu: [
				{ 
					name: 'nav.industry_assessment', 
					href: '/services/industry-assessment',
					icon: BarChart3,
					description: 'Industry analysis and strategic insights'
				},
				{ 
					name: 'nav.public_consultation', 
					href: '/services/public-consultation',
					icon: MessageSquare,
					description: 'Community engagement and stakeholder consultation'
				}
			]
		},
		{ 
			name: 'nav.blog', 
			href: '/blog',
			icon: BookOpen
		},
		{ 
			name: 'nav.contact', 
			href: '/contact',
			icon: Mail
		}
	];

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		
		const handleClickOutside = (event) => {
			if (headerElement && !headerElement.contains(event.target)) {
				activeDropdown = null;
			}
		};
		
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				activeDropdown = null;
				mobileMenuOpen = false;
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
		
		// Get initial theme
		if (browser) {
			const savedTheme = localStorage.getItem('theme') || 'light';
			currentTheme = savedTheme;
		}
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
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
			
			// Update HTML attributes
			const html = document.documentElement;
			html.lang = newLocale;
			html.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
		}
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		// Prevent body scroll when mobile menu is open
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

<svelte:window onresize={closeMobileMenu} />

<!-- Top Information Bar -->
<div class="bg-slate-900 text-white py-3 hidden lg:block border-b border-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center text-sm">
			<div class="flex items-center space-x-8 rtl:space-x-reverse">
				<div class="flex items-center group transition-colors duration-200">
					<MapPin class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
					<span class="group-hover:text-slate-200 transition-colors">123 Engineering Boulevard, Tech City</span>
				</div>
				<div class="flex items-center group transition-colors duration-200">
					<Phone class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary-400 group-hover:text-primary-300 transition-colors" />
					<a href="tel:+15551234567" class="group-hover:text-slate-200 transition-colors">+1 (555) 123-4567</a>
				</div>
				<div class="flex items-center group transition-colors duration-200">
					<Mail class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-golden-400 group-hover:text-golden-300 transition-colors" />
					<a href="mailto:info@transportconsulting.com" class="group-hover:text-slate-200 transition-colors">info@transportconsulting.com</a>
				</div>
			</div>
			<div class="flex items-center space-x-6 rtl:space-x-reverse">
				<!-- Theme Toggle -->
				<button
					onclick={toggleTheme}
					class="p-2 rounded-lg hover:bg-slate-800 transition-all duration-200 group"
					aria-label={$_('theme.toggle')}
				>
					<div class="relative w-4 h-4">
						{#if currentTheme === 'dark'}
							<Sun class="w-4 h-4 text-golden-400 group-hover:text-golden-300 group-hover:scale-110 transition-all duration-200" />
						{:else}
							<Moon class="w-4 h-4 text-slate-300 group-hover:text-slate-200 group-hover:scale-110 transition-all duration-200" />
						{/if}
					</div>
				</button>
				
				<!-- Language Toggle -->
				<button
					onclick={toggleLocale}
					class="p-2 rounded-lg hover:bg-slate-800 transition-all duration-200 flex items-center group"
					aria-label={$_('language.toggle')}
				>
					<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all duration-200" />
					<span class="text-xs font-medium text-slate-300 group-hover:text-slate-200 transition-colors">
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
		<div class="flex justify-between items-center h-16 lg:h-20">
			<!-- Logo -->
			<div class="flex-shrink-0 group">
				<a href="/" class="flex items-center transition-transform duration-300 group-hover:scale-105">
					<div class="relative">
						<div class="w-12 h-12 bg-gradient-to-br from-primary-600 via-emerald-600 to-golden-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
							<span class="text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">TC</span>
						</div>
						<div class="absolute -inset-1 bg-gradient-to-br from-primary-600 via-emerald-600 to-golden-500 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300"></div>
					</div>
					<div class="ml-4 rtl:mr-4 rtl:ml-0">
						<div class="text-xl lg:text-2xl font-bold text-slate-900 font-display group-hover:text-primary-600 transition-colors duration-300">
							name
						</div>
						<div class="text-xs text-slate-600 -mt-1 group-hover:text-emerald-600 transition-colors duration-300">
							{$_('hero.subtitle_short') || 'Engineering Excellence'}
						</div>
					</div>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden lg:flex lg:items-center lg:space-x-2 rtl:space-x-reverse">
				{#each navigation as item, index}
					<div 
						class="relative group"
						onmouseenter={() => item.submenu && handleDropdownEnter(index)}
						onmouseleave={() => item.submenu && handleDropdownLeave()}
					>
						<a
							href={item.href}
							class={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
								isActiveRoute(item.href)
									? 'text-primary-700 bg-primary-50 shadow-sm'
									: 'text-slate-700 hover:text-primary-600 hover:bg-slate-50'
							}`}
						>
							<svelte:component 
								this={item.icon} 
								class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 transition-transform duration-200 group-hover:scale-110" 
							/>
							{$_(item.name)}
							{#if item.submenu}
								<ChevronDown 
									class={`ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 transition-all duration-300 ${
										activeDropdown === index ? 'rotate-180 text-primary-600' : 'group-hover:rotate-180'
									}`} 
								/>
							{/if}
						</a>
						
						{#if item.submenu}
							<div class={`absolute top-full left-0 w-96 bg-white shadow-2xl border border-slate-200 rounded-2xl transition-all duration-300 transform origin-top ${
								activeDropdown === index 
									? 'opacity-100 visible scale-100 translate-y-2' 
									: 'opacity-0 invisible scale-95 translate-y-0'
							}`}>
								<div class="p-6">
									<div class="mb-6 pb-4 border-b border-slate-100">
										<h3 class="text-lg font-bold text-slate-900 mb-2">
											{$_(item.name)}
										</h3>
										<p class="text-sm text-slate-600 leading-relaxed">
											{item.description}
										</p>
									</div>
									<div class="space-y-2">
										{#each item.submenu as subitem}
											<a
												href={subitem.href}
												class="flex items-start p-3 text-sm text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
												onclick={() => activeDropdown = null}
											>
												<div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover:bg-primary-100 transition-colors">
													<svelte:component 
														this={subitem.icon} 
														class="w-4 h-4 text-slate-500 group-hover:text-primary-600 transition-colors" 
													/>
												</div>
												<div class="flex-1">
													<div class="font-semibold group-hover:text-primary-600 transition-colors mb-1">
														{$_(subitem.name)}
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
					class="inline-flex items-center justify-center p-3 rounded-xl text-slate-700 hover:text-primary-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-200"
					aria-expanded={mobileMenuOpen}
					aria-label={$_('nav.toggle_menu') || 'Toggle navigation menu'}
				>
					<div class="relative w-6 h-6">
						<!-- Animated hamburger to X -->
						<span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
							mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
						}`}></span>
						<span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out translate-y-2.5 ${
							mobileMenuOpen ? 'opacity-0' : 'opacity-100'
						}`}></span>
						<span class={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
							mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
						}`}></span>
					</div>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Overlay -->
		{#if mobileMenuOpen}
			<div class="fixed inset-0 z-50 lg:hidden">
				<!-- Backdrop -->
				<div 
					class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
					onclick={closeMobileMenu}
				></div>
				
				<!-- Mobile Menu Panel -->
				<div class="fixed top-0 right-0 rtl:left-0 rtl:right-auto w-full max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out">
					<!-- Mobile Header -->
					<div class="flex items-center justify-between p-6 border-b border-slate-200">
						<div class="flex items-center">
							<div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-emerald-600 rounded-lg flex items-center justify-center">
								<span class="text-white font-bold text-lg">TC</span>
							</div>
							<div class="ml-3 rtl:mr-3 rtl:ml-0">
								<div class="text-lg font-bold text-slate-900">Transport Consulting</div>
								<div class="text-xs text-slate-600 -mt-1">Engineering Excellence</div>
							</div>
						</div>
						<button
							onclick={closeMobileMenu}
							class="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
							aria-label={$_('nav.close_menu') || 'Close menu'}
						>
							<X class="w-6 h-6" />
						</button>
					</div>
					
					<!-- Mobile Navigation -->
					<div class="flex-1 overflow-y-auto py-6">
						<div class="px-6 space-y-2">
							{#each navigation as item}
								<div class="space-y-2">
									<a
										href={item.href}
										onclick={closeMobileMenu}
										class={`flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
											isActiveRoute(item.href)
												? 'text-primary-700 bg-primary-50'
												: 'text-slate-700 hover:text-primary-600 hover:bg-slate-50'
										}`}
									>
										<svelte:component 
											this={item.icon} 
											class="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" 
										/>
										{$_(item.name)}
									</a>
									{#if item.submenu}
										<div class="ml-8 rtl:mr-8 rtl:ml-0 space-y-1">
											{#each item.submenu as subitem}
												<a
													href={subitem.href}
													onclick={closeMobileMenu}
													class="flex items-center px-4 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
												>
													<svelte:component 
														this={subitem.icon} 
														class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" 
													/>
													{$_(subitem.name)}
												</a>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Mobile Footer -->
					<div class="border-t border-slate-200 p-6">
						<div class="grid grid-cols-2 gap-4">
							<button
								onclick={toggleTheme}
								class="flex items-center justify-center px-4 py-3 text-sm text-slate-700 hover:text-primary-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
							>
								{#if currentTheme === 'dark'}
									<Sun class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
									{$_('theme.light')}
								{:else}
									<Moon class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
									{$_('theme.dark')}
								{/if}
							</button>
							
							<button
								onclick={toggleLocale}
								class="flex items-center justify-center px-4 py-3 text-sm text-slate-700 hover:text-primary-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
							>
								<Globe class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
								{($locale || 'en') === 'en' ? $_('language.ar') : $_('language.en')}
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	/* Smooth transitions and animations */
	@media (prefers-reduced-motion: no-preference) {
		* {
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>