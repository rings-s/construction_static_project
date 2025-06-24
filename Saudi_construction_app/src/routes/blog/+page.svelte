<!-- src/routes/blog/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, Search } from 'lucide-svelte';
	import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_IMAGES, getFeaturedPosts } from '$lib/config/blog.js';
	import { APP_CONFIG } from '$lib/config/app.js';
	import { fly, fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	
	let mounted = $state(false);
	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let currentFeatured = $state(0);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
	// Image fallbacks
	const categoryImages = {
		'Highway Engineering': '/images/blog/highway-engineering.jpg',
		'Traffic Engineering': '/images/blog/traffic-engineering.jpg',
		'Transport Planning': '/images/blog/transport-planning.jpg',
		'default': '/images/blog/default-engineering.jpg'
	};
	
	const blogImages = {
		featured: '/images/blog/featured-articles.jpg',
		insights: '/images/blog/engineering-insights.jpg',
		trends: '/images/blog/industry-trends.jpg',
		innovation: '/images/blog/transport-innovation.jpg'
	};
	
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 50 }, (_, i) => ({
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
		
		// Rotate featured posts
		const featuredInterval = setInterval(() => {
			const featured = getFeaturedPosts();
			currentFeatured = (currentFeatured + 1) % featured.length;
		}, 6000);
		
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
			clearInterval(featuredInterval);
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			observer.disconnect();
		};
	});
	
	// Convert reactive statements to derived
	let filteredPosts = $derived(BLOG_POSTS.filter(post => {
		const matchesCategory = selectedCategory === 'all' || post.categoryEn.toLowerCase().replace(' ', '-') === selectedCategory;
		const matchesSearch = searchQuery === '' || 
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
			post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
			post.excerptEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
			post.tagsEn.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	}));
	
	let featuredPosts = $derived(getFeaturedPosts());
	
	function formatDate(dateString) {
		const date = new Date(dateString);
		return ($locale || 'en') === 'ar' 
			? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
			: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
	
	function getImageUrl(imageName) {
		return BLOG_IMAGES[imageName] || blogImages.default;
	}

	function getCategoryIcon(categoryEn) {
		switch(categoryEn) {
			case 'Highway Engineering': return '🛣️';
			case 'Traffic Engineering': return '🚦';
			case 'Transport Planning': return '🗺️';
			default: return '📝';
		}
	}
	
	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
	
	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
	
	const stats = [
		{
			value: '150+',
			label: 'مقال منشور',
			labelEn: 'Published Articles',
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '50K+',
			label: 'قارئ شهرياً',
			labelEn: 'Monthly Readers',
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '95%',
			label: 'معدل الرضا',
			labelEn: 'Satisfaction Rate',
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '25+',
			label: 'خبير مساهم',
			labelEn: 'Expert Contributors',
			color: 'from-amber-500 to-blue-600'
		}
	];
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'المدونة - رؤى وخبرات هندسة النقل' : 'Blog - Transport Engineering Insights & Expertise'} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'ابقَ مطلعاً على أحدث الرؤى والاتجاهات والابتكارات في هندسة النقل' : 'Stay updated with the latest insights, trends, and innovations in transport engineering'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Knowledge Network SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="blogGrid" width="80" height="80" patternUnits="userSpaceOnUse">
					<circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;2.5;1" dur="3s" repeatCount="indefinite"/>
					</circle>
					<path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="blogWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.5"/>
					<stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.7"/>
					<stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.5"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#blogGrid)" />
			
			<!-- Knowledge Flow Lines -->
			<path d="M100,300 Q300,200 500,300 Q700,400 900,300" stroke="url(#blogWave)" stroke-width="6" fill="none" opacity="0.6" class="knowledge-line-1"/>
			<path d="M200,150 Q400,100 600,150 Q800,200 1000,150" stroke="url(#blogWave)" stroke-width="4" fill="none" opacity="0.5" class="knowledge-line-2"/>
			<path d="M150,500 Q350,450 550,500 Q750,550 950,500" stroke="url(#blogWave)" stroke-width="3" fill="none" opacity="0.4" class="knowledge-line-3"/>
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
				<div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
				<span class="mr-3 rtl:ml-3 rtl:mr-0 text-lg">📚</span>
				{($locale || 'en') === 'ar' ? 'مكتبة المعرفة الهندسية المتطورة' : 'Advanced Engineering Knowledge Hub'}
			</div>
			
			<!-- Enhanced Title -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
					<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'رؤى وخبرات هندسية' : 'Engineering Insights'}
					</span>
					<span class="block text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
						{($locale || 'en') === 'ar' ? 'متقدمة ومتخصصة' : '& Advanced Expertise'}
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
					{($locale || 'en') === 'ar' 
						? 'ابقَ مطلعاً على أحدث الاتجاهات والابتكارات وأفضل الممارسات في هندسة النقل من فريق خبرائنا المتخصصين'
						: 'Stay informed with the latest trends, innovations, and best practices in transport engineering from our team of specialized experts'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'مقالات معمقة، دراسات حالة تطبيقية، وتحليلات تقنية متقدمة لمساعدتك في مواكبة التطورات السريعة في القطاع'
						: 'In-depth articles, practical case studies, and advanced technical analysis to help you keep pace with rapid industry developments'
					}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<!-- Advanced Pattern Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 30px 30px;"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class={`relative w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300 overflow-hidden`}>
						<!-- Animated Background -->
						<div class={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
						<!-- Pulse Ring -->
						<div class="absolute inset-0 rounded-3xl border-2 border-white/20 animate-ping"></div>
						<!-- Center Dot -->
						<div class="relative z-10 w-3 h-3 bg-white rounded-full shadow-lg"></div>
						<!-- Corner Accent -->
						<div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
					</div>
					<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
						{stat.value}
					</div>
					<div class="text-blue-100 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Posts Carousel -->
{#if featuredPosts.length > 0}
<section id="featured" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'المقالات المميزة' : 'Featured Articles'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'أحدث وأهم المقالات في مجال هندسة النقل والطرق' : 'Latest and most important articles in transport and highway engineering'}
			</p>
		</div>

		<div class="relative">
			{#each featuredPosts as post, index}
				<div class={`transition-all duration-700 ${index === currentFeatured ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'}`} in:scale={{ duration: 500 }} out:fade={{ duration: 300 }}>
					<div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500">
						<div class="grid lg:grid-cols-2 gap-0">
							
							<!-- Enhanced Image -->
							<div class="relative h-80 lg:h-auto overflow-hidden">
								<img 
									src={categoryImages[post.categoryEn] || categoryImages.default} 
									alt={($locale || 'en') === 'ar' ? post.title : post.titleEn}
									class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									loading="lazy"
									onerror={(e) => {
										e.target.style.display = 'none';
										e.target.nextElementSibling.style.display = 'flex';
									}}
								/>
								<!-- Fallback -->
								<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-200 dark:from-emerald-900/30 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
									<div class="text-center transform group-hover:scale-110 transition-transform duration-500">
										<div class="text-[12rem] leading-none mb-4 filter drop-shadow-lg">
											{getCategoryIcon(post.categoryEn)}
										</div>
										<div class="text-emerald-600 dark:text-emerald-400 font-bold text-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-xl">
											{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
										</div>
									</div>
								</div>
								
								<!-- Featured Badge -->
								<div class="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
									<div class="flex items-center gap-2">
										<div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
										{($locale || 'en') === 'ar' ? 'مميز' : 'Featured'}
									</div>
								</div>
								
								<!-- Image Overlay -->
								<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20"></div>
							</div>
							
							<!-- Enhanced Content -->
							<div class="p-8 lg:p-12 flex flex-col justify-center">
								
								<!-- Category & Meta -->
								<div class="flex items-center gap-4 mb-4">
									<span class="px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
										{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
									</span>
									<div class="text-slate-500 dark:text-slate-400 text-sm font-medium">
										{formatDate(post.date)}
									</div>
								</div>
								
								<!-- Title -->
								<h3 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
									{($locale || 'en') === 'ar' ? post.title : post.titleEn}
								</h3>
								
								<!-- Excerpt -->
								<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
									{($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}
								</p>
								
								<!-- Meta & CTA -->
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
										<div class="font-medium">
											{($locale || 'en') === 'ar' ? post.author : post.authorEn}
										</div>
										<div class="font-medium">
											{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}
										</div>
									</div>
									
									<a 
										href="/blog/{post.slug}" 
										class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
									>
										{($locale || 'en') === 'ar' ? 'اقرأ المقال' : 'Read Article'}
										<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
			
			<!-- Enhanced Indicators -->
			<div class="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
				{#each featuredPosts as _, index}
					<button
						onclick={() => currentFeatured = index}
						class={`relative overflow-hidden rounded-full transition-all duration-300 ${
							index === currentFeatured 
								? 'w-8 h-3 bg-gradient-to-r from-emerald-600 to-blue-600' 
								: 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
						}`}
					>
						{#if index === currentFeatured}
							<div class="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Search & Filter Section -->
<section class="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col lg:flex-row gap-8 items-center justify-between">
			
			<!-- Enhanced Search -->
			<div class="relative flex-1 max-w-md">
				<Search class="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
				<input
					type="text"
					placeholder={($locale || 'en') === 'ar' ? 'ابحث في المقالات والرؤى...' : 'Search articles and insights...'}
					bind:value={searchQuery}
					class="w-full pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl"
				/>
				<div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
			</div>
			
			<!-- Enhanced Categories -->
			<div class="flex flex-wrap gap-3">
				{#each BLOG_CATEGORIES as category, index}
					<button
						onclick={() => selectedCategory = category.slug}
						class={`group relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
							selectedCategory === category.slug
								? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-xl'
								: 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-sm'
						}`}
						in:fly={{ x: 20, delay: index * 100 }}
					>
						<span class="relative z-10 flex items-center gap-2">
							{($locale || 'en') === 'ar' ? category.name : category.nameEn}
							<span class="opacity-75 bg-white/20 px-2 py-1 rounded-lg text-xs font-black">
								{category.count}
							</span>
						</span>
						{#if selectedCategory === category.slug}
							<div class="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Blog Posts Grid -->
<section id="blog-posts" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		
		{#if filteredPosts.length === 0}
			<div class="text-center py-20">
				<div class="text-8xl mb-8">🔍</div>
				<h3 class="text-3xl font-black text-slate-900 dark:text-white mb-6">
					{($locale || 'en') === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found'}
				</h3>
				<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
					{($locale || 'en') === 'ar' 
						? 'جرب تعديل معايير البحث أو الفلترة الخاصة بك'
						: 'Try adjusting your search or filter criteria'
					}
				</p>
				<button
					onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}
					class="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
				>
					<span class="flex items-center gap-2">
						{($locale || 'en') === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
					</span>
				</button>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredPosts as post, index (post.id)}
					<article 
						class={`group relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('blog-posts') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} 
						style="animation-delay: {index * 0.1}s;"
						in:fly={{ y: 50, delay: index * 100 }}
						animate:flip={{ duration: 500 }}
					>
						
						<!-- Enhanced Image -->
						<div class="relative h-64 overflow-hidden">
							<img 
								src={categoryImages[post.categoryEn] || categoryImages.default} 
								alt={($locale || 'en') === 'ar' ? post.title : post.titleEn}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								loading="lazy"
								onerror={(e) => {
									e.target.style.display = 'none';
									e.target.nextElementSibling.style.display = 'flex';
								}}
							/>
							<!-- Fallback -->
							<div class="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center" style="display: none;">
								<div class="text-center">
									<div class="text-[8rem] leading-none mb-2 filter drop-shadow-lg">
										{getCategoryIcon(post.categoryEn)}
									</div>
									<div class="text-xs text-slate-600 dark:text-slate-400 font-medium bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg">
										{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
									</div>
								</div>
							</div>
							
							<!-- Image Overlay -->
							<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20 group-hover:from-emerald-600/30 group-hover:via-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
							
							<!-- Category Badge -->
							<div class="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-600/90 to-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-lg">
								{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
							</div>
							
							<!-- Stats -->
							<div class="absolute bottom-3 right-3 flex items-center gap-2">
								<div class="flex items-center px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-white text-xs font-bold">
									<div class="w-2 h-2 bg-white rounded-full mr-1 rtl:ml-1 rtl:mr-0"></div>
									{post.views}
								</div>
								<div class="flex items-center px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-white text-xs font-bold">
									<div class="w-2 h-2 bg-red-400 rounded-full mr-1 rtl:ml-1 rtl:mr-0 animate-pulse"></div>
									{post.likes}
								</div>
							</div>
						</div>
						
						<!-- Enhanced Content -->
						<div class="p-6 relative">
							
							<!-- Meta -->
							<div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
								<div class="font-medium">
									{formatDate(post.date)}
								</div>
								<div class="font-medium">
									{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}
								</div>
							</div>
							
							<!-- Title -->
							<h2 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
								{($locale || 'en') === 'ar' ? post.title : post.titleEn}
							</h2>
							
							<!-- Excerpt -->
							<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
								{($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}
							</p>
							
							<!-- Author -->
							<div class="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
								{($locale || 'en') === 'ar' ? 'بقلم' : 'By'} {($locale || 'en') === 'ar' ? post.author : post.authorEn}
							</div>
							
							<!-- Tags -->
							<div class="flex flex-wrap gap-1 mb-4">
								{#each (($locale || 'en') === 'ar' ? post.tags : post.tagsEn).slice(0, 3) as tag}
									<span class="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg font-medium">
										#{tag}
									</span>
								{/each}
							</div>
							
							<!-- Read More -->
							<a 
								href="/blog/{post.slug}" 
								class="group inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
							>
								{($locale || 'en') === 'ar' ? 'اقرأ المزيد' : 'Read More'}
								<ArrowRight class="ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
							</a>
							
							<!-- Bottom Accent -->
							<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
						</div>
					</article>
				{/each}
			</div>
			
			<!-- Enhanced Load More Button -->
			{#if filteredPosts.length >= 6}
				<div class="text-center mt-16">
					<button class="group px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl">
						<span class="flex items-center gap-3">
							{($locale || 'en') === 'ar' ? 'تحميل المزيد من المقالات' : 'Load More Articles'}
							<ArrowRight class="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
						</span>
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>

<!-- Enhanced Newsletter Signup -->
<section class="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		<!-- Advanced Pattern Background -->
		<div class="absolute inset-0 opacity-20">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
		</div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
			<div class="text-8xl mb-8 animate-bounce-gentle">📧</div>
			<h2 class="text-3xl lg:text-4xl font-black text-white mb-6">
				{($locale || 'en') === 'ar' ? 'ابقَ مطلعاً على أحدث رؤانا' : 'Stay Updated with Our Latest Insights'}
			</h2>
			<p class="text-xl text-blue-100 mb-8 leading-relaxed">
				{($locale || 'en') === 'ar' 
					? 'احصل على أحدث رؤى هندسة النقل والتحليلات التقنية المتقدمة مباشرة في صندوق الوارد الخاص بك'
					: 'Get the latest transport engineering insights and advanced technical analysis delivered directly to your inbox'
				}
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
				<input
					type="email"
					placeholder={($locale || 'en') === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
					class="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/20 focus:outline-none text-slate-900 placeholder-slate-500 backdrop-blur-sm bg-white/90 shadow-lg"
				/>
				<button class="group bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
					<span class="flex items-center gap-2">
						{($locale || 'en') === 'ar' ? 'اشترك' : 'Subscribe'}
						<ArrowRight class="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
					</span>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes */
	@keyframes slide-up-bounce {
		0% {
			opacity: 0;
			transform: translateY(60px) scale(0.95);
		}
		60% {
			opacity: 0.8;
			transform: translateY(-10px) scale(1.02);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fade-in-up-advanced {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes scale-in-advanced {
		0% {
			opacity: 0;
			transform: scale(0.7);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes gradient-flow {
		0%, 100% { 
			background-position: 0% 50%; 
		}
		50% { 
			background-position: 100% 50%; 
		}
	}

	@keyframes float-slow {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-30px) scale(1.1); 
		}
	}

	@keyframes float-reverse {
		0%, 100% { 
			transform: translateY(0px) scale(1) rotate(0deg); 
		}
		50% { 
			transform: translateY(25px) scale(0.9) rotate(180deg); 
		}
	}

	@keyframes pulse-subtle {
		0%, 100% { 
			opacity: 0.5; 
			transform: scale(1);
		}
		50% { 
			opacity: 0.8; 
			transform: scale(1.05);
		}
	}

	@keyframes float-particle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
			opacity: 0.4;
		}
		50% { 
			transform: translateY(-20px) scale(1.2); 
			opacity: 0.8;
		}
	}

	@keyframes light-ray {
		0%, 100% { 
			opacity: 0.2; 
			transform: scaleY(1);
		}
		50% { 
			opacity: 0.6; 
			transform: scaleY(1.2);
		}
	}

	@keyframes light-ray-reverse {
		0%, 100% { 
			opacity: 0.3; 
			transform: scaleY(1) rotate(-12deg);
		}
		50% { 
			opacity: 0.7; 
			transform: scaleY(1.3) rotate(-12deg);
		}
	}

	@keyframes count-up-advanced {
		0% { 
			opacity: 0; 
			transform: translateY(20px) scale(0.8); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0) scale(1); 
		}
	}

	@keyframes fade-in-delayed {
		0%, 30% { 
			opacity: 0; 
			transform: translateY(20px); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}

	@keyframes bounce-gentle {
		0%, 100% { 
			transform: translateY(0px); 
		}
		50% { 
			transform: translateY(-10px); 
		}
	}

	@keyframes knowledge-line-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -120; }
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
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }
	.animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
	
	/* Knowledge Line Animation */
	.knowledge-line-1 {
		stroke-dasharray: 25 15;
		animation: knowledge-line-flow 6s linear infinite;
	}
	
	.knowledge-line-2 {
		stroke-dasharray: 20 10;
		animation: knowledge-line-flow 7s linear infinite reverse;
	}
	
	.knowledge-line-3 {
		stroke-dasharray: 15 8;
		animation: knowledge-line-flow 8s linear infinite;
	}

	/* Utility Classes */
	.bg-300\% {
		background-size: 300% 300%;
	}

	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle,
	.animate-gradient-flow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Dark mode enhancements */
	.dark .backdrop-blur-xl {
		backdrop-filter: blur(24px) saturate(180%);
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.25rem !important;
			line-height: 1.1;
		}
	}
</style>