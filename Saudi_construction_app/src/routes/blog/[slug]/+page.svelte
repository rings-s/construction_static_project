<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { ArrowLeft, ArrowRight, Share2 } from 'lucide-svelte';
	import { getBlogPostBySlug, getRelatedPosts, BLOG_IMAGES } from '$lib/config/blog.js';
	import { APP_CONFIG } from '$lib/config/app.js';
	import { fly, fade, scale } from 'svelte/transition';

	let { data } = $props();
	let mounted = $state(false);
	let readingProgress = $state(0);
	let liked = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
	let post = $derived(data.post);
	let relatedPosts = $derived(data.relatedPosts);

	// Enhanced image fallbacks
	const categoryImages = {
		'Highway Engineering': '/images/blog/highway-engineering.jpg',
		'Traffic Engineering': '/images/blog/traffic-engineering.jpg',
		'Transport Planning': '/images/blog/transport-planning.jpg',
		'default': '/images/blog/default-engineering.jpg'
	};

	function getCategoryIcon(categoryEn) {
		switch(categoryEn) {
			case 'Highway Engineering': return '🛣️';
			case 'Traffic Engineering': return '🚦';
			case 'Transport Planning': return '🗺️';
			default: return '📝';
		}
	}

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 40 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.5 + 0.2
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
		
		// Reading progress tracker
		const updateReadingProgress = () => {
			const article = document.querySelector('article');
			if (article) {
				const articleTop = article.offsetTop;
				const articleHeight = article.offsetHeight;
				const windowHeight = window.innerHeight;
				const scrollTop = window.scrollY;
				
				const articleBottom = articleTop + articleHeight - windowHeight;
				const progress = Math.min(Math.max((scrollTop - articleTop) / (articleBottom - articleTop), 0), 1) * 100;
				readingProgress = progress;
			}
		};
		
		window.addEventListener('scroll', updateReadingProgress);
		updateReadingProgress();
		
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
			window.removeEventListener('scroll', updateReadingProgress);
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			observer.disconnect();
		};
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return ($locale || 'en') === 'ar' 
			? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
			: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	function handleLike() {
		liked = !liked;
		// Here you would typically send to API
	}

	function handleShare() {
		if (navigator.share) {
			navigator.share({
				title: ($locale || 'en') === 'ar' ? post.title : post.titleEn,
				text: ($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn,
				url: window.location.href
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			// Show toast notification
		}
	}
	
	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}
	
	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.05}px, ${mouseY * multiplier * 0.05}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? post.title : post.titleEn} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}" />
	<meta property="og:title" content="{($locale || 'en') === 'ar' ? post.title : post.titleEn}" />
	<meta property="og:description" content="{($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}" />
	<meta property="og:image" content="{BLOG_IMAGES[post.image]}" />
	<meta property="og:type" content="article" />
</svelte:head>

<!-- Reading Progress Bar -->
<div class="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
	<div 
		class="h-full bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-300 relative overflow-hidden"
		style="width: {readingProgress}%"
	>
		<div class="absolute inset-0 bg-white/20 animate-pulse"></div>
	</div>
</div>

<!-- Enhanced Hero Section -->
<section class="relative pt-32 pb-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 overflow-hidden">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.3)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.2)}></div>
		
		<!-- Article Reading Animation SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 1200 600">
			<defs>
				<linearGradient id="articleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
					<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
				</linearGradient>
			</defs>
			
			<!-- Document Pages Animation -->
			{#each Array(8) as _, i}
				<g class="document-{i}" transform="translate({150 + i * 120},{100 + i * 20})">
					<rect width="80" height="100" rx="8" fill="url(#articleGradient)" opacity="0.4">
						<animate attributeName="opacity" values="0.4;0.7;0.4" dur="{3 + i * 0.3}s" repeatCount="indefinite"/>
					</rect>
					<!-- Text Lines -->
					<rect x="10" y="20" width="60" height="2" fill="currentColor" opacity="0.6"/>
					<rect x="10" y="30" width="50" height="2" fill="currentColor" opacity="0.6"/>
					<rect x="10" y="40" width="65" height="2" fill="currentColor" opacity="0.6"/>
				</g>
			{/each}
			
			<!-- Reading Path -->
			<path d="M100,300 Q400,200 800,300 T1200,300" stroke="url(#articleGradient)" 
				  stroke-width="4" fill="none" opacity="0.6" class="reading-path"/>
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
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 5 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<!-- Enhanced Breadcrumb -->
		<nav class={`mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
			<div class="flex items-center text-slate-600 dark:text-slate-300 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
				<a href="/blog" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
					{($locale || 'en') === 'ar' ? 'المدونة' : 'Blog'}
				</a>
				<ArrowRight class="w-4 h-4 mx-3 rtl:rotate-180 text-slate-400" />
				<span class="text-emerald-600 dark:text-emerald-400 font-bold">
					{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
				</span>
			</div>
		</nav>
		
		<!-- Enhanced Article Header -->
		<div class="text-center">
			
			<!-- Category Badge -->
			<div class={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold mb-6 transition-all duration-1000 delay-200 ${mounted ? 'animate-fade-in' : 'opacity-0'} shadow-lg hover:shadow-xl hover:scale-105`}>
				<div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0 animate-pulse"></div>
				{($locale || 'en') === 'ar' ? post.category : post.categoryEn}
			</div>
			
			<!-- Enhanced Title -->
			<h1 class={`text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
				<span class="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
					{($locale || 'en') === 'ar' ? post.title : post.titleEn}
				</span>
			</h1>
			
			<!-- Enhanced Meta Information -->
			<div class={`flex flex-wrap items-center justify-center gap-8 text-slate-600 dark:text-slate-300 mb-8 transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
				<div class="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
					<div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
						<div class="w-2 h-2 bg-white rounded-full"></div>
					</div>
					<span class="font-medium">{($locale || 'en') === 'ar' ? post.author : post.authorEn}</span>
				</div>
				<div class="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
					<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
						<div class="w-2 h-2 bg-white rounded-full"></div>
					</div>
					<span class="font-medium">{formatDate(post.date)}</span>
				</div>
				<div class="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
					<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
						<div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
					</div>
					<span class="font-medium">{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}</span>
				</div>
				<div class="flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
					<div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
						<div class="w-2 h-2 bg-white rounded-full"></div>
					</div>
					<span class="font-medium">{post.views}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Article Content -->
<article class="py-16 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background Elements -->
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<!-- Enhanced Featured Image -->
		<div class={`mb-12 transition-all duration-1000 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
			<div class="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-2xl relative group">
				<img 
					src={categoryImages[post.categoryEn] || categoryImages.default} 
					alt={($locale || 'en') === 'ar' ? post.title : post.titleEn}
					class="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
					loading="lazy"
					onerror={(e) => {
						e.target.style.display = 'none';
						e.target.nextElementSibling.style.display = 'flex';
					}}
				/>
				<!-- Fallback -->
				<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-200 dark:from-emerald-900/30 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
					<div class="text-center transform hover:scale-105 transition-transform duration-500">
						<div class="text-[20rem] leading-none mb-4 filter drop-shadow-2xl">
							{getCategoryIcon(post.categoryEn)}
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-bold text-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg">
							{($locale || 'en') === 'ar' ? post.title : post.titleEn}
						</div>
					</div>
				</div>
				<!-- Image Overlay -->
				<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20 group-hover:from-emerald-600/10 group-hover:via-blue-600/10 group-hover:to-purple-600/10 transition-all duration-700"></div>
			</div>
		</div>
		
		<!-- Enhanced Article Actions -->
		<div class={`flex items-center justify-between mb-12 p-8 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-1000 delay-200 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
			<div class="flex items-center gap-6">
				<button
					onclick={handleLike}
					class={`group flex items-center px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
						liked 
							? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
							: 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 shadow-lg hover:shadow-xl'
					}`}
				>
					<div class={`w-5 h-5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 ${liked ? 'bg-white animate-pulse' : 'bg-red-400'}`}></div>
					<span>{post.likes + (liked ? 1 : 0)}</span>
				</button>
				
				<button
					onclick={handleShare}
					class="group flex items-center px-6 py-3 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
				>
					<Share2 class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
					{($locale || 'en') === 'ar' ? 'مشاركة' : 'Share'}
				</button>
			</div>
			
			<!-- Enhanced Tags -->
			<div class="flex flex-wrap gap-2">
				{#each (($locale || 'en') === 'ar' ? post.tags : post.tagsEn).slice(0, 3) as tag}
					<span class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-xl font-bold border border-emerald-200/50 dark:border-emerald-700/50">
						#{tag}
					</span>
				{/each}
			</div>
		</div>
		
		<!-- Enhanced Article Content -->
		<div class={`prose prose-lg dark:prose-invert max-w-none transition-all duration-1000 delay-400 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
			{@html ($locale || 'en') === 'ar' ? post.content : post.contentEn}
		</div>
		
		<!-- Enhanced Author Bio -->
		<div class={`mt-16 p-8 bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800 dark:to-emerald-900/20 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
			<div class="flex items-start gap-6">
				<div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl">
					<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
						<div class="w-3 h-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full"></div>
					</div>
				</div>
				<div>
					<h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">
						{($locale || 'en') === 'ar' ? post.author : post.authorEn}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
						{($locale || 'en') === 'ar' ? post.authorBio : post.authorBioEn}
					</p>
				</div>
			</div>
		</div>
	</div>
</article>

<!-- Enhanced Related Posts -->
{#if relatedPosts.length > 0}
<section id="related-posts" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
				{($locale || 'en') === 'ar' ? 'تابع القراءة حول هذا الموضوع' : 'Continue reading on this topic'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each relatedPosts as relatedPost, index}
				<article class={`group bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('related-posts') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;" in:fly={{ y: 50, delay: index * 200 }}>
					
					<!-- Enhanced Image -->
					<div class="h-56 overflow-hidden relative">
						<img 
							src={categoryImages[relatedPost.categoryEn] || categoryImages.default} 
							alt={($locale || 'en') === 'ar' ? relatedPost.title : relatedPost.titleEn}
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
								<div class="text-[6rem] leading-none mb-2 filter drop-shadow-lg">
									{getCategoryIcon(relatedPost.categoryEn)}
								</div>
								<div class="text-xs text-slate-600 dark:text-slate-400 font-medium bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg">
									{($locale || 'en') === 'ar' ? relatedPost.category : relatedPost.categoryEn}
								</div>
							</div>
						</div>
						
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-purple-600/20 group-hover:from-emerald-600/30 group-hover:via-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
						
						<!-- Category Badge -->
						<div class="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-600/90 to-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-lg">
							{($locale || 'en') === 'ar' ? relatedPost.category : relatedPost.categoryEn}
						</div>
					</div>
					
					<!-- Enhanced Content -->
					<div class="p-6">
						<div class="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
							{formatDate(relatedPost.date)}
						</div>
						
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3 leading-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
							{($locale || 'en') === 'ar' ? relatedPost.title : relatedPost.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
							{($locale || 'en') === 'ar' ? relatedPost.excerpt : relatedPost.excerptEn}
						</p>
						
						<a 
							href="/blog/{relatedPost.slug}" 
							class="group inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
						>
							{($locale || 'en') === 'ar' ? 'اقرأ المقال' : 'Read Article'}
							<ArrowRight class="ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Enhanced Navigation -->
<section class="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<a 
				href="/blog" 
				class="group inline-flex items-center px-8 py-4 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
			>
				<ArrowLeft class="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-300" />
				{($locale || 'en') === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
			</a>
			
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
			>
				<span class="flex items-center gap-2">
					{($locale || 'en') === 'ar' ? 'العودة للأعلى' : 'Back to Top'}
					<div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
				</span>
			</button>
		</div>
	</div>
</section>

<style>
	/* Enhanced Animation Keyframes */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	
	@keyframes slideInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
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
			transform: translateY(-15px) scale(1.1); 
			opacity: 0.7;
		}
	}
	
	@keyframes readingPath {
		0% { stroke-dasharray: 0 1000; }
		100% { stroke-dasharray: 1000 0; }
	}
	
	/* Animation Classes */
	.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.6s ease-out forwards; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.reading-path { animation: readingPath 3s ease-out; }
	
	/* Utility Classes */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	/* Enhanced Prose Styles */
	.prose {
		@apply text-slate-900 dark:text-slate-100;
	}
	
	.prose h2 {
		@apply text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent;
	}

	.prose h3 {
		@apply text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4;
	}
	
	.prose p {
		@apply text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg;
	}
	
	.prose strong {
		@apply text-slate-900 dark:text-white font-bold;
	}
	
	.prose a {
		@apply text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-semibold;
	}
	
	.prose blockquote {
		@apply border-l-4 border-emerald-500 pl-6 italic text-slate-600 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-r-lg py-4 my-8;
	}
	
	.prose ul, .prose ol {
		@apply text-slate-700 dark:text-slate-300 space-y-2;
	}
	
	.prose li {
		@apply leading-relaxed;
	}
	
	.prose code {
		@apply bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-sm font-medium;
	}

	.prose img {
		@apply rounded-2xl shadow-xl my-8;
	}

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle {
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
			font-size: 2rem !important;
			line-height: 1.1;
		}
		
		.prose h2 {
			font-size: 1.75rem !important;
		}
		
		.prose h3 {
			font-size: 1.5rem !important;
		}
	}
</style>