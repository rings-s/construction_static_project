<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { locale } from 'svelte-i18n';
  import { Calendar, Clock, User, Eye, Heart, Tag, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-svelte';
  import { getBlogPostBySlug, getRelatedPosts, BLOG_IMAGES } from '$lib/config/blog.js';
  import { APP_CONFIG } from '$lib/config/app.js';

  let { data } = $props();
  let mounted = $state(false);
  let readingProgress = $state(0);
  let liked = $state(false);
  
  let post = $derived(data.post);
  let relatedPosts = $derived(data.relatedPosts);

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
    
    return () => window.removeEventListener('scroll', updateReadingProgress);
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
    class="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-300"
    style="width: {readingProgress}%"
  ></div>
</div>

<!-- Hero Section -->
<section class="relative pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
  
  <!-- Article Background Animation -->
  <div class="absolute inset-0 opacity-20">
    <svg class="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
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
  </div>

  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Breadcrumb -->
    <nav class={`mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <div class="flex items-center text-slate-300 text-sm">
        <a href="/blog" class="hover:text-white transition-colors">
          {($locale || 'en') === 'ar' ? 'المدونة' : 'Blog'}
        </a>
        <ArrowRight class="w-4 h-4 mx-2 rtl:rotate-180" />
        <span class="text-emerald-400">
          {($locale || 'en') === 'ar' ? post.category : post.categoryEn}
        </span>
      </div>
    </nav>
    
    <!-- Article Header -->
    <div class="text-center">
      
      <!-- Category Badge -->
      <div class={`inline-flex items-center px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6 transition-all duration-1000 delay-200 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <BookOpen class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
        {($locale || 'en') === 'ar' ? post.category : post.categoryEn}
      </div>
      
      <!-- Title -->
      <h1 class={`text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
        {($locale || 'en') === 'ar' ? post.title : post.titleEn}
      </h1>
      
      <!-- Meta Information -->
      <div class={`flex flex-wrap items-center justify-center gap-6 text-slate-300 mb-8 transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div class="flex items-center">
          <User class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
          <span>{($locale || 'en') === 'ar' ? post.author : post.authorEn}</span>
        </div>
        <div class="flex items-center">
          <Calendar class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
          <span>{formatDate(post.date)}</span>
        </div>
        <div class="flex items-center">
          <Clock class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
          <span>{($locale || 'en') === 'ar' ? post.readTime : post.readTimeEn}</span>
        </div>
        <div class="flex items-center">
          <Eye class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-emerald-400" />
          <span>{post.views}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Article Content -->
<article class="py-16 bg-white dark:bg-slate-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Featured Image -->
    <div class={`mb-12 transition-all duration-1000 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div class="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
        <div class="w-full h-[500px] bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center">
          <div class="text-center transform hover:scale-105 transition-transform duration-500">
            <div class="text-[20rem] leading-none mb-4 filter drop-shadow-2xl">
              {getCategoryIcon(post.categoryEn)}
            </div>
            <div class="text-emerald-600 dark:text-emerald-400 font-bold text-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg">
              {($locale || 'en') === 'ar' ? post.title : post.titleEn}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Article Actions -->
    <div class={`flex items-center justify-between mb-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl transition-all duration-1000 delay-200 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div class="flex items-center gap-4">
        <button
          onclick={handleLike}
          class={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            liked 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/30'
          }`}
        >
          <Heart class={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 ${liked ? 'fill-current' : ''}`} />
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        
        <button
          onclick={handleShare}
          class="flex items-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Share2 class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
          {($locale || 'en') === 'ar' ? 'مشاركة' : 'Share'}
        </button>
      </div>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        {#each (($locale || 'en') === 'ar' ? post.tags : post.tagsEn).slice(0, 3) as tag}
          <span class="inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-lg">
            <Tag class="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {tag}
          </span>
        {/each}
      </div>
    </div>
    
    <!-- Article Content -->
    <div class={`prose prose-lg dark:prose-invert max-w-none transition-all duration-1000 delay-400 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      {@html ($locale || 'en') === 'ar' ? post.content : post.contentEn}
    </div>
    
    <!-- Author Bio -->
    <div class={`mt-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl transition-all duration-1000 delay-600 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div class="flex items-start gap-6">
        <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
          <User class="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
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

<!-- Related Posts -->
{#if relatedPosts.length > 0}
<section class="py-24 bg-slate-50 dark:bg-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {($locale || 'en') === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
      </h2>
      <p class="text-slate-600 dark:text-slate-300">
        {($locale || 'en') === 'ar' ? 'تابع القراءة حول هذا الموضوع' : 'Continue reading on this topic'}
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each relatedPosts as relatedPost, index}
        <article class={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
          
          <!-- Image -->
          <div class="h-56 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
            <div class="text-center group-hover:scale-105 transition-transform duration-300">
              <div class="text-[6rem] leading-none mb-2 filter drop-shadow-lg">
                {getCategoryIcon(relatedPost.categoryEn)}
              </div>
              <div class="text-xs text-slate-600 dark:text-slate-400 font-medium bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                {($locale || 'en') === 'ar' ? relatedPost.category : relatedPost.categoryEn}
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
              <Calendar class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {formatDate(relatedPost.date)}
            </div>
            
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {($locale || 'en') === 'ar' ? relatedPost.title : relatedPost.titleEn}
            </h3>
            
            <p class="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
              {($locale || 'en') === 'ar' ? relatedPost.excerpt : relatedPost.excerptEn}
            </p>
            
            <a 
              href="/blog/{relatedPost.slug}" 
              class="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
            >
              {($locale || 'en') === 'ar' ? 'اقرأ المقال' : 'Read Article'}
              <ArrowRight class="ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- Navigation -->
<section class="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <a 
        href="/blog" 
        class="inline-flex items-center px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <ArrowLeft class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
        {($locale || 'en') === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
      </a>
      
      <button
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
      >
        {($locale || 'en') === 'ar' ? 'العودة للأعلى' : 'Back to Top'}
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
  
  @keyframes readingPath {
    0% { stroke-dasharray: 0 1000; }
    100% { stroke-dasharray: 1000 0; }
  }
  
  /* Animation Classes */
  .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
  .animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
  .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
  .reading-path { animation: readingPath 3s ease-out; }
  
  /* Utility Classes */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Enhanced Prose Styles for Better Dark Mode */
  .prose {
    @apply text-slate-900 dark:text-slate-100;
  }
  
  .prose h3 {
    @apply text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4;
  }
  
  .prose p {
    @apply text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg;
  }
  
  .prose strong {
    @apply text-slate-900 dark:text-white font-semibold;
  }
  
  .prose a {
    @apply text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors;
  }
  
  .prose blockquote {
    @apply border-l-4 border-emerald-500 pl-4 italic text-slate-600 dark:text-slate-400;
  }
  
  .prose ul, .prose ol {
    @apply text-slate-700 dark:text-slate-300;
  }
  
  .prose li {
    @apply mb-2;
  }
  
  .prose code {
    @apply bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-sm;
  }
</style>