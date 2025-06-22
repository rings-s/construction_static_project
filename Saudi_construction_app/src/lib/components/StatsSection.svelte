<!-- src/lib/components/TestimonialSection.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-svelte';
	import { TESTIMONIALS } from '$lib/config/app.js';
	
	let currentIndex = $state(0);
	let autoplay = $state(true);
	
	onMount(() => {
	  const interval = setInterval(() => {
		if (autoplay) {
		  nextTestimonial();
		}
	  }, 5000);
	  
	  return () => clearInterval(interval);
	});
	
	function nextTestimonial() {
	  currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
	}
	
	function prevTestimonial() {
	  currentIndex = currentIndex === 0 ? TESTIMONIALS.length - 1 : currentIndex - 1;
	}
	
	function goToTestimonial(index) {
	  currentIndex = index;
	}
  </script>
  
  <section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
		  {($locale || 'en') === 'ar' 
			? 'تعليقات حقيقية من عملاء راضين يثقون في خبرتنا وخدماتنا المتميزة'
			: 'Real feedback from satisfied clients who trust our expertise and exceptional services'
		  }
		</p>
	  </div>
  
	  <div class="relative max-w-4xl mx-auto">
		<!-- Main Testimonial -->
		<div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-12 text-center relative overflow-hidden">
		  
		  <!-- Decorative Quote Background -->
		  <div class="absolute top-6 left-6 opacity-10">
			<Quote class="w-20 h-20 text-emerald-600" />
		  </div>
		  
		  <!-- Avatar -->
		  <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
			<span class="text-4xl">{TESTIMONIALS[currentIndex].avatar}</span>
		  </div>
		  
		  <!-- Content -->
		  <div class="relative z-10">
			<!-- Stars -->
			<div class="flex justify-center mb-6">
			  {#each Array(TESTIMONIALS[currentIndex].rating) as _, starIndex}
				<Star class="w-6 h-6 text-yellow-500 fill-current animate-pulse" style="animation-delay: {starIndex * 0.1}s;" />
			  {/each}
			</div>
			
			<!-- Quote -->
			<blockquote class="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium italic">
			  "{($locale || 'en') === 'ar' ? TESTIMONIALS[currentIndex].content : TESTIMONIALS[currentIndex].contentEn}"
			</blockquote>
			
			<!-- Author -->
			<div class="border-t border-slate-200 dark:border-slate-700 pt-6">
			  <div class="font-bold text-slate-900 dark:text-white text-xl mb-1">
				{TESTIMONIALS[currentIndex].author}
			  </div>
			  <div class="text-emerald-600 dark:text-emerald-400 font-medium">
				{TESTIMONIALS[currentIndex].company}
			  </div>
			</div>
		  </div>
		</div>
  
		<!-- Navigation Buttons -->
		<button 
		  onclick={prevTestimonial}
		  class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-800 shadow-xl rounded-full p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
		  onmouseenter={() => autoplay = false}
		  onmouseleave={() => autoplay = true}
		  aria-label="Previous testimonial"
		>
		  <ChevronLeft class="w-6 h-6 text-slate-600 dark:text-slate-300" />
		</button>
		
		<button 
		  onclick={nextTestimonial}
		  class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-800 shadow-xl rounded-full p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
		  onmouseenter={() => autoplay = false}
		  onmouseleave={() => autoplay = true}
		  aria-label="Next testimonial"
		>
		  <ChevronRight class="w-6 h-6 text-slate-600 dark:text-slate-300" />
		</button>
  
		<!-- Dots Indicator -->
		<div class="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
		  {#each TESTIMONIALS as _, index}
			<button
			  onclick={() => goToTestimonial(index)}
			  class={`w-4 h-4 rounded-full transition-all duration-300 ${
				index === currentIndex 
				  ? 'bg-emerald-600 scale-125' 
				  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 hover:scale-110'
			  }`}
			  onmouseenter={() => autoplay = false}
			  onmouseleave={() => autoplay = true}
			  aria-label="Go to testimonial {index + 1}"
			></button>
		  {/each}
		</div>
	  </div>
	</div>
  </section>
  
  <style>
	@keyframes bounceSubtle {
	  0%, 100% { transform: scale(1); }
	  50% { transform: scale(1.05); }
	}
	
	.animate-bounce-subtle {
	  animation: bounceSubtle 3s ease-in-out infinite;
	}
  </style>