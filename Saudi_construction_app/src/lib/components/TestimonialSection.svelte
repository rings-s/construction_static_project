<script>
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight, Quote } from 'lucide-svelte';
	
	const testimonials = [
		{
			name: "Sarah Johnson",
			title: "Project Director",
			company: "Urban Development Corp",
			content: "Their expertise in traffic engineering transformed our city center project. The team delivered innovative solutions that exceeded our expectations while staying within budget and timeline.",
			rating: 5
		},
		{
			name: "Michael Chen",
			title: "Infrastructure Manager", 
			company: "Metro Transit Authority",
			content: "Outstanding transport planning services. Their comprehensive feasibility study provided the insights we needed to make informed decisions about our expansion project.",
			rating: 5
		},
		{
			name: "Emma Rodriguez",
			title: "City Planning Coordinator",
			company: "Riverside Municipality",
			content: "The highway engineering solutions provided were exceptional. Their attention to detail and commitment to sustainable design principles made this project a huge success.",
			rating: 5
		}
	];
	
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
		currentIndex = (currentIndex + 1) % testimonials.length;
	}
	
	function prevTestimonial() {
		currentIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
	}
	
	function goToTestimonial(index) {
		currentIndex = index;
	}
</script>

<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				What Our Clients Say
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				Trusted by leading organizations for delivering exceptional transport engineering solutions.
			</p>
		</div>

		<div class="relative max-w-4xl mx-auto">
			<!-- Main Testimonial -->
			<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 lg:p-12 text-center relative overflow-hidden">
				<!-- Quote Icon -->
				<div class="absolute top-6 left-6 opacity-10">
					<Quote class="w-16 h-16 text-primary-600" />
				</div>
				
				<!-- Content -->
				<div class="relative z-10">
					<!-- Stars -->
					<div class="flex justify-center mb-6">
						{#each Array(testimonials[currentIndex].rating) as _}
							<svg class="w-5 h-5 text-golden-500 fill-current" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
					
					<!-- Quote -->
					<blockquote class="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium">
						"{testimonials[currentIndex].content}"
					</blockquote>
					
					<!-- Author -->
					<div>
						<div class="font-bold text-slate-900 dark:text-white text-lg">
							{testimonials[currentIndex].name}
						</div>
						<div class="text-primary-600 dark:text-primary-400 font-medium">
							{testimonials[currentIndex].title}
						</div>
						<div class="text-slate-600 dark:text-slate-400">
							{testimonials[currentIndex].company}
						</div>
					</div>
				</div>
			</div>

			<!-- Navigation Buttons -->
			<button 
				onclick={prevTestimonial}
				class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Previous testimonial"
			>
				<ChevronLeft class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>
			
			<button 
				onclick={nextTestimonial}
				class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-800 shadow-lg rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Next testimonial"
			>
				<ChevronRight class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>

			<!-- Dots Indicator -->
			<div class="flex justify-center mt-8 space-x-2">
				{#each testimonials as _, index}
					<button
						onclick={() => goToTestimonial(index)}
						class={`w-3 h-3 rounded-full transition-colors ${
							index === currentIndex 
								? 'bg-primary-600' 
								: 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
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