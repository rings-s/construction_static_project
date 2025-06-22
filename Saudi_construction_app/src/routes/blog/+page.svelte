<!-- src/routes/blog/+page.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { Calendar, Clock, ArrowRight, Search } from 'lucide-svelte';
	
	// Mock blog posts data
	const blogPosts = [
		{
			id: 1,
			title: "The Future of Smart Highway Infrastructure",
			excerpt: "Exploring how intelligent transport systems are revolutionizing highway design and traffic management across the globe.",
			author: "Dr. James Wilson",
			date: "2025-06-15",
			readTime: "5 min read",
			category: "Highway Engineering",
			image: "/images/blog/smart-highways.jpg",
			tags: ["ITS", "Smart Infrastructure", "Innovation"]
		},
		{
			id: 2,
			title: "Sustainable Transport Planning in Urban Areas",
			excerpt: "Best practices for implementing eco-friendly transport solutions that reduce carbon footprint while improving mobility.",
			author: "Sarah Chen",
			date: "2025-06-10",
			readTime: "7 min read",
			category: "Transport Planning",
			image: "/images/blog/sustainable-transport.jpg",
			tags: ["Sustainability", "Urban Planning", "Green Transport"]
		},
		{
			id: 3,
			title: "Traffic Safety Engineering: Latest Trends and Technologies",
			excerpt: "How modern safety engineering techniques are reducing accidents and improving road safety for all users.",
			author: "Michael Rodriguez",
			date: "2025-06-05",
			readTime: "6 min read",
			category: "Traffic Engineering",
			image: "/images/blog/traffic-safety.jpg",
			tags: ["Safety", "Traffic Engineering", "Technology"]
		},
		{
			id: 4,
			title: "Optimizing Junction Design for Maximum Efficiency",
			excerpt: "Advanced strategies for designing highway junctions that handle high traffic volumes while maintaining safety standards.",
			author: "Dr. Emma Thompson",
			date: "2025-05-28",
			readTime: "8 min read",
			category: "Highway Engineering",
			image: "/images/blog/junction-design.jpg",
			tags: ["Junction Design", "Traffic Flow", "Engineering"]
		},
		{
			id: 5,
			title: "The Role of AI in Modern Traffic Management",
			excerpt: "Examining how artificial intelligence is transforming traffic control systems and improving urban mobility.",
			author: "Dr. James Wilson",
			date: "2025-05-20",
			readTime: "6 min read",
			category: "Traffic Engineering",
			image: "/images/blog/ai-traffic.jpg",
			tags: ["AI", "Traffic Management", "Innovation"]
		},
		{
			id: 6,
			title: "Green Infrastructure in Highway Design",
			excerpt: "Integrating environmental considerations into highway projects to create sustainable transportation corridors.",
			author: "Sarah Chen",
			date: "2025-05-15",
			readTime: "5 min read",
			category: "Highway Engineering",
			image: "/images/blog/green-infrastructure.jpg",
			tags: ["Green Infrastructure", "Sustainability", "Highway Design"]
		}
	];

	const categories = ["All", "Highway Engineering", "Traffic Engineering", "Transport Planning"];
	let selectedCategory = "All";
	let searchQuery = "";
	
	$: filteredPosts = blogPosts.filter(post => {
		const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
							 post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
							 post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>Blog - Transport Engineering Insights & Expertise</title>
	<meta name="description" content="Stay updated with the latest insights, trends, and innovations in transport engineering, highway design, and traffic management from our expert team." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 bg-gradient-to-r from-emerald-900 to-primary-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
				Engineering Insights & Expertise
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto">
				Stay informed with the latest trends, innovations, and best practices in transport engineering from our team of experts.
			</p>
		</div>
	</div>
</section>

<!-- Search & Filter -->
<section class="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
			<!-- Search -->
			<div class="relative flex-1 max-w-md">
				<Search class="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
				<input
					type="text"
					placeholder="Search articles..."
					bind:value={searchQuery}
					class="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
				/>
			</div>
			
			<!-- Categories -->
			<div class="flex flex-wrap gap-2">
				{#each categories as category}
					<button
						on:click={() => selectedCategory = category}
						class={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
							selectedCategory === category
								? 'bg-primary-600 text-white'
								: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
						}`}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Blog Posts Grid -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if filteredPosts.length === 0}
			<div class="text-center py-12">
				<div class="text-slate-400 mb-4">
					<Search class="w-16 h-16 mx-auto mb-4" />
				</div>
				<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">No articles found</h3>
				<p class="text-slate-600 dark:text-slate-300">Try adjusting your search or filter criteria.</p>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredPosts as post}
					<article class="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
						<!-- Image -->
						<div class="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700">
							<div class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
								<span class="text-4xl">📝</span>
							</div>
						</div>
						
						<!-- Content -->
						<div class="p-6">
							<!-- Category -->
							<div class="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full mb-3">
								{post.category}
							</div>
							
							<!-- Title -->
							<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
								{post.title}
							</h2>
							
							<!-- Excerpt -->
							<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
								{post.excerpt}
							</p>
							
							<!-- Meta -->
							<div class="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
								<Calendar class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
								<span>{formatDate(post.date)}</span>
								<span class="mx-2">•</span>
								<Clock class="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
								<span>{post.readTime}</span>
							</div>
							
							<!-- Tags -->
							<div class="flex flex-wrap gap-1 mb-4">
								{#each post.tags.slice(0, 3) as tag}
									<span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
										{tag}
									</span>
								{/each}
							</div>
							
							<!-- Read More -->
							<a 
								href="/blog/{post.id}" 
								class="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
							>
								Read More
								<ArrowRight class="ml-1 rtl:mr-1 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
		
		<!-- Load More Button (if needed) -->
		{#if filteredPosts.length >= 6}
			<div class="text-center mt-12">
				<button class="btn-primary">
					Load More Articles
				</button>
			</div>
		{/if}
	</div>
</section>

<!-- Newsletter Signup -->
<section class="py-24 bg-gradient-to-r from-primary-600 to-emerald-600">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
			Stay Updated with Our Insights
		</h2>
		<p class="text-xl text-primary-100 mb-8">
			Get the latest transport engineering insights delivered directly to your inbox.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
			<input
				type="email"
				placeholder="Enter your email"
				class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
			/>
			<button class="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
				Subscribe
			</button>
		</div>
	</div>
</section>

<style>
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