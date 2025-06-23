<!-- src/lib/components/TestimonialSection.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-svelte';
	
	// Saudi Arabian testimonials
	const testimonials = [
		{
			author: "أحمد الغامدي",
			title: "مدير المشاريع",
			company: "مجلس منطقة الرياض",
			content: "خبرتهم في هندسة المرور غيرت مشروع وسط المدينة لدينا. قدم الفريق حلولاً مبتكرة فاقت توقعاتنا مع الالتزام بالميزانية والجدول الزمني.",
			contentEn: "Their expertise in traffic engineering transformed our city center project. The team delivered innovative solutions that exceeded our expectations while staying within budget and timeline.",
			rating: 5,
			avatar: "👨‍💼"
		},
		{
			author: "سارة القحطاني", 
			title: "مدير البنية التحتية",
			company: "هيئة النقل العام، الرياض",
			contentEn: "Outstanding transport planning services. Their comprehensive feasibility study provided the insights we needed to make informed decisions about our expansion project.",
			content: "خدمات تخطيط نقل متميزة. دراسة الجدوى الشاملة التي قدموها وفرت الرؤى التي احتجناها لاتخاذ قرارات مدروسة حول مشروع التوسعة.",
			rating: 5,
			avatar: "👩‍💼"
		},
		{
			author: "محمد السعيد",
			title: "منسق التخطيط الحضري",
			company: "بلدية جدة",
			content: "كانت حلول هندسة الطرق السريعة المقدمة استثنائية. اهتمامهم بالتفاصيل والالتزام بمبادئ التصميم المستدام جعل هذا المشروع نجاحاً كبيراً.",
			contentEn: "The highway engineering solutions provided were exceptional. Their attention to detail and commitment to sustainable design principles made this project a huge success.",
			rating: 5,
			avatar: "🏗️"
		}
	];
	
	let currentIndex = $state(0);
	let autoplay = $state(true);
	let mounted = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 25 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.4 + 0.2
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			mousePosition = {
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			};
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		
		const interval = setInterval(() => {
			if (autoplay) {
				nextTestimonial();
			}
		}, 5000);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(interval);
		};
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

<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%;">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-reverse"></div>
		
		<!-- Floating Particles -->
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
						transform: translate(calc(var(--mouse-x) * 0.{Math.floor(particle.id % 10) + 1}px), calc(var(--mouse-y) * 0.{Math.floor(particle.id % 10) + 1}px));
					"
				></div>
			{/each}
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' 
					? 'معتمدون من قبل المؤسسات الرائدة لتقديم حلول هندسة النقل الاستثنائية'
					: 'Trusted by leading organizations for delivering exceptional transport engineering solutions'
				}
			</p>
		</div>

		<div class="relative max-w-4xl mx-auto">
			<!-- Main Testimonial -->
			<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 text-center relative overflow-hidden transition-all duration-700 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				
				<!-- Quote Icon -->
				<div class="absolute top-6 left-6 opacity-10">
					<Quote class="w-16 h-16 text-emerald-600 animate-pulse-gentle" />
				</div>
				
				<!-- Enhanced Background Gradient -->
				<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl"></div>
				
				<!-- Avatar -->
				<div class="relative z-10 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle shadow-xl">
					<span class="text-4xl">{testimonials[currentIndex].avatar}</span>
				</div>
				
				<!-- Content -->
				<div class="relative z-10">
					<!-- Stars -->
					<div class="flex justify-center mb-6">
						{#each Array(testimonials[currentIndex].rating) as _, starIndex}
							<Star class="w-5 h-5 text-yellow-500 fill-current animate-twinkle" style="animation-delay: {starIndex * 0.1}s;" />
						{/each}
					</div>
					
					<!-- Quote -->
					<blockquote class="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium italic">
						"{($locale || 'en') === 'ar' ? testimonials[currentIndex].content : testimonials[currentIndex].contentEn}"
					</blockquote>
					
					<!-- Author -->
					<div class="border-t border-slate-200 dark:border-slate-700 pt-6">
						<div class="font-black text-slate-900 dark:text-white text-lg mb-1">
							{testimonials[currentIndex].author}
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-bold">
							{testimonials[currentIndex].title}
						</div>
						<div class="text-slate-600 dark:text-slate-400 font-medium">
							{testimonials[currentIndex].company}
						</div>
					</div>
				</div>
			</div>

			<!-- Enhanced Navigation Buttons -->
			<button 
				onclick={prevTestimonial}
				class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Previous testimonial"
			>
				<ChevronLeft class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>
			
			<button 
				onclick={nextTestimonial}
				class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Next testimonial"
			>
				<ChevronRight class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>

			<!-- Enhanced Dots Indicator -->
			<div class="flex justify-center mt-8 space-x-2">
				{#each testimonials as _, index}
					<button
						onclick={() => goToTestimonial(index)}
						class={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentIndex 
								? 'bg-emerald-600 scale-125 shadow-lg' 
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

	@keyframes bounce-subtle {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}

	@keyframes twinkle {
		0%, 100% { 
			opacity: 1; 
			transform: scale(1); 
		}
		50% { 
			opacity: 0.7; 
			transform: scale(1.2); 
		}
	}

	@keyframes pulse-gentle {
		0%, 100% { 
			transform: scale(1); 
		}
		50% { 
			transform: scale(1.1); 
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
	
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
	.animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
	.animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse {
		will-change: transform;
		transform: translateZ(0);
	}
</style>