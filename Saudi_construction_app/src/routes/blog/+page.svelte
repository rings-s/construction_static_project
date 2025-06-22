<!-- src/routes/blog/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { Calendar, Clock, ArrowRight, Search, Eye, Heart, User, Tag } from 'lucide-svelte';
	import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_IMAGES, getFeaturedPosts } from '$lib/config/blog.js';
	import { APP_CONFIG } from '$lib/config/app.js';
  
	let mounted = $state(false);
	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let currentFeatured = $state(0);
	
	onMount(() => {
	  mounted = true;
	  
	  // Rotate featured posts
	  const featuredInterval = setInterval(() => {
		const featured = getFeaturedPosts();
		currentFeatured = (currentFeatured + 1) % featured.length;
	  }, 5000);
	  
	  return () => clearInterval(featuredInterval);
	});
	
	$: filteredPosts = BLOG_POSTS.filter(post => {
	  const matchesCategory = selectedCategory === 'all' || post.categoryEn.toLowerCase().replace(' ', '-') === selectedCategory;
	  const matchesSearch = searchQuery === '' || 
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
		post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
		post.excerptEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
		post.tagsEn.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
	  return matchesCategory && matchesSearch;
	});
  
	$: featuredPosts = getFeaturedPosts();
  
	function formatDate(dateString) {
	  const date = new Date(dateString);
	  return ($locale || 'en') === 'ar' 
		? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
		: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
  
	function getImageUrl(imageName) {
	  return BLOG_IMAGES[imageName] || '/images/blog/default.png';
	}
  </script>
  
  <svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'المدونة - رؤى وخبرات هندسة النقل' : 'Blog - Transport Engineering Insights & Expertise'} - {APP_CONFIG.name}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'ابقَ مطلعاً على أحدث الرؤى والاتجاهات والابتكارات في هندسة النقل' : 'Stay updated with the latest insights, trends, and innovations in transport engineering'}" />
  </svelte:head>
  
  <!-- Hero Section with Construction Animation -->
  <section class="relative pt-32 pb-16 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900 overflow-hidden">
	
	<!-- Construction Blog Background -->
	<div class="absolute inset-0 opacity-20">
	  <svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
		<defs>
		  <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#059669;stop-opacity:0.3" />
			<stop offset="50%" style="stop-color:#0d7377;stop-opacity:0.2" />
			<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3" />
		  </linearGradient>
		</defs>
		
		<!-- Knowledge Network Animation -->
		{#each Array(12) as _, i}
		  <g class="knowledge-node-{i}" transform="translate({100 + i * 100},{150 + Math.sin(i) * 100})">
			<circle r="15" fill="url(#blogGradient)" opacity="0.6">
			  <animate attributeName="r" values="15;25;15" dur="{3 + i * 0.5}s" repeatCount="indefinite"/>
			  <animate attributeName="opacity" values="0.6;0.9;0.6" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
			</circle>
			<!-- Connection Lines -->
			{#if i < 11}
			  <line x1="15" y1="0" x2="85" y2="{Math.sin(i + 1) * 100 - Math.sin(i) * 100}" 
					stroke="url(#blogGradient)" stroke-width="2" opacity="0.4"
					class="connection-animate" style="animation-delay: {i * 0.2}s;"/>
			{/if}
		  </g>
		{/each}
		
		<!-- Floating Blog Icons -->
		{#each ['📝', '🏗️', '🚧', '📊', '🛣️', '💡'] as icon, i}
		  <g class="blog-icon-{i}">
			<text x="{200 + i * 150}" y="{200 + Math.sin(i * 2) * 50}" 
				  font-size="24" text-anchor="middle" opacity="0.7">
			  {icon}
			  <animateTransform attributeName="transform" type="translate" 
							  values="0,0; 0,-20; 0,0" dur="{4 + i * 0.5}s" repeatCount="indefinite"/>
			</text>
		  </g>
		{/each}
	  </svg>
	</div>
  
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center">
		
		<!-- Animated Badge -->
		<div class={`inline-flex items-center px-6 py-3 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
		  <span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">📚</span>
		  {($locale || 'en') === 'ar' ? 'مكتبة المعرفة الهندسية' : 'Engineering Knowledge Hub'}
		</div>
		
		<!-- Main Title -->
		<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  <h1 class="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
			<span class="block bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
			  {($locale || 'en') === 'ar' ? 'رؤى وخبرات هندسية' : 'Engineering Insights & Expertise'}
			</span>
		  </h1>
		</div>
		
		<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
		  <p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
			{($locale || 'en') === 'ar' 
			  ? 'ابقَ مطلعاً على أحدث الاتجاهات والابتكارات وأفضل الممارسات في هندسة النقل من فريق خبرائنا'
			  : 'Stay informed with the latest trends, innovations, and best practices in transport engineering from our team of experts'
			}
		  </p>
		</div>
	  </div>
	</div>
  </section>
  
  <!-- Featured Posts Carousel -->
  {#if featuredPosts.length > 0}
  <section class="py-16 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-12">
		<h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'المقالات المميزة' : 'Featured Articles'}
		</h2>
	  </div>
  
	  <div class="relative">
		{#each featuredPosts as post, index}
		  <div class={`transition-all duration-700 ${index === currentFeatured ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'}`}>
			<div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
			  <div class="grid lg:grid-cols-2 gap-0">
				
				<!-- Image -->
				<div class="relative h-64 lg:h-auto">
				  <div class="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center">
					<div class="text-center">
					  <div class="text-6xl mb-4">🏗️</div>
					  <div class="text-emerald-600 dark:text-emerald-400 font-medium">
						{post.category}
					  </div>
					</div>
				  </div>
				  <!-- Featured Badge -->
				  <div class="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
					{($locale || 'en') === 'ar' ? 'مميز' : 'Featured'}
				  </div>
				</div>
				
				<!-- Content -->
				<div class="p-8 lg:p-12 flex flex-col justify-center">
				  
				  <!-- Category & Meta -->
				  <div class="flex items-center gap-4 mb-4">
					<span class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-full">
					  {($locale || 'en') === 'ar' ? post.category : post.categoryEn}
					</span>
					<div class="flex items-center text-slate-500 dark:text-slate-400 text-sm">
					  <Calendar class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
					  {formatDate(post.date)}
					</div>
				  </div>
				  
				  <!-- Title -->
				  <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
					{($locale || 'en') === 'ar' ? post.title : post.titleEn}
				  </h3>
				  
				  <!-- Excerpt -->
				  <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
					{($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}
				  </p>
				  
				  <!-- Meta & CTA -->
				  <div class="flex items-center justify-between">
					<div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
					  <div class="flex items-center">
						<User class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
						{($locale || 'en') === 'ar' ? post.author : post.authorEn}
					  </div>
					  <div class="flex items-center">
						<Clock class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
						{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}
					  </div>
					</div>
					
					<a 
					  href="/blog/{post.slug}" 
					  class="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors group"
					>
					  {($locale || 'en') === 'ar' ? 'اقرأ المقال' : 'Read Article'}
					  <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		{/each}
		
		<!-- Indicators -->
		<div class="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
		  {#each featuredPosts as _, index}
			<button
			  onclick={() => currentFeatured = index}
			  class={`w-3 h-3 rounded-full transition-all duration-300 ${
				index === currentFeatured 
				  ? 'bg-emerald-600 scale-125' 
				  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
			  }`}
			></button>
		  {/each}
		</div>
	  </div>
	</div>
  </section>
  {/if}
  
  <!-- Search & Filter Section -->
  <section class="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
		
		<!-- Search -->
		<div class="relative flex-1 max-w-md">
		  <Search class="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
		  <input
			type="text"
			placeholder={($locale || 'en') === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
			bind:value={searchQuery}
			class="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
		  />
		</div>
		
		<!-- Categories -->
		<div class="flex flex-wrap gap-2">
		  {#each BLOG_CATEGORIES as category}
			<button
			  onclick={() => selectedCategory = category.slug}
			  class={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
				selectedCategory === category.slug
				  ? 'bg-emerald-600 text-white shadow-lg'
				  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
			  }`}
			>
			  {($locale || 'en') === 'ar' ? category.name : category.nameEn}
			  <span class="ml-1 rtl:mr-1 rtl:ml-0 opacity-75">({category.count})</span>
			</button>
		  {/each}
		</div>
	  </div>
	</div>
  </section>
  
  <!-- Blog Posts Grid -->
  <section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  
	  {#if filteredPosts.length === 0}
		<div class="text-center py-12">
		  <div class="text-6xl mb-6">🔍</div>
		  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found'}
		  </h3>
		  <p class="text-slate-600 dark:text-slate-300 mb-8">
			{($locale || 'en') === 'ar' 
			  ? 'جرب تعديل معايير البحث أو الفلترة الخاصة بك'
			  : 'Try adjusting your search or filter criteria'
			}
		  </p>
		  <button
			onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}
			class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
		  >
			{($locale || 'en') === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
		  </button>
		</div>
	  {:else}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		  {#each filteredPosts as post, index}
			<article class={`group bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
			  
			  <!-- Image -->
			  <div class="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
				<div class="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
				  <div class="text-center">
					<div class="text-4xl mb-2">
					  {post.categoryEn === 'Highway Engineering' ? '🛣️' : 
					   post.categoryEn === 'Traffic Engineering' ? '🚦' : 
					   post.categoryEn === 'Transport Planning' ? '🗺️' : '📝'}
					</div>
					<div class="text-xs text-slate-600 dark:text-slate-400 font-medium">
					  {($locale || 'en') === 'ar' ? post.category : post.categoryEn}
					</div>
				  </div>
				</div>
				
				<!-- Category Badge -->
				<div class="absolute top-3 left-3 px-2 py-1 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
				  {($locale || 'en') === 'ar' ? post.category : post.categoryEn}
				</div>
				
				<!-- Stats -->
				<div class="absolute bottom-3 right-3 flex items-center gap-2">
				  <div class="flex items-center px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg text-white text-xs">
					<Eye class="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
					{post.views}
				  </div>
				  <div class="flex items-center px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg text-white text-xs">
					<Heart class="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
					{post.likes}
				  </div>
				</div>
			  </div>
			  
			  <!-- Content -->
			  <div class="p-6">
				
				<!-- Meta -->
				<div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
				  <div class="flex items-center">
					<Calendar class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
					{formatDate(post.date)}
				  </div>
				  <div class="flex items-center">
					<Clock class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
					{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}
				  </div>
				</div>
				
				<!-- Title -->
				<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
				  {($locale || 'en') === 'ar' ? post.title : post.titleEn}
				</h2>
				
				<!-- Excerpt -->
				<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
				  {($locale || 'en') === 'ar' ? post.excerpt : post.excerptEn}
				</p>
				
				<!-- Author -->
				<div class="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
				  <User class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
				  <span>{($locale || 'en') === 'ar' ? post.author : post.authorEn}</span>
				</div>
				
				<!-- Tags -->
				<div class="flex flex-wrap gap-1 mb-4">
				  {#each (($locale || 'en') === 'ar' ? post.tags : post.tagsEn).slice(0, 3) as tag}
					<span class="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg">
					  <Tag class="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
					  {tag}
					</span>
				  {/each}
				</div>
				
				<!-- Read More -->
				<a 
				  href="/blog/{post.slug}" 
				  class="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
				>
				  {($locale || 'en') === 'ar' ? 'اقرأ المزيد' : 'Read More'}
				  <ArrowRight class="ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
				</a>
			  </div>
			</article>
		  {/each}
		</div>
		
		<!-- Load More Button -->
		{#if filteredPosts.length >= 6}
		  <div class="text-center mt-12">
			<button class="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl">
			  {($locale || 'en') === 'ar' ? 'تحميل المزيد من المقالات' : 'Load More Articles'}
			</button>
		  </div>
		{/if}
	  {/if}
	</div>
  </section>
  
  <!-- Newsletter Signup -->
  <section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
	  <div class="mb-8">
		<div class="text-6xl mb-6">📧</div>
		<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'ابقَ مطلعاً على أحدث رؤانا' : 'Stay Updated with Our Latest Insights'}
		</h2>
		<p class="text-xl text-emerald-100">
		  {($locale || 'en') === 'ar' 
			? 'احصل على أحدث رؤى هندسة النقل مباشرة في صندوق الوارد الخاص بك'
			: 'Get the latest transport engineering insights delivered directly to your inbox'
		  }
		</p>
	  </div>
	  
	  <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
		<input
		  type="email"
		  placeholder={($locale || 'en') === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
		  class="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-white/20 focus:outline-none text-slate-900"
		/>
		<button class="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
		  {($locale || 'en') === 'ar' ? 'اشترك' : 'Subscribe'}
		</button>
	  </div>
	</div>
  </section>
  
  <style>
	/* Animation Keyframes */
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
	
	@keyframes connectionAnimate {
	  0% { stroke-dasharray: 0 100; }
	  100% { stroke-dasharray: 100 0; }
	}
	
	/* Animation Classes */
	.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
	.animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
	.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
	.connection-animate { animation: connectionAnimate 2s ease-out; }
	
	/* Utility Classes */
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
  </style>