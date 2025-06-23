<!-- src/lib/components/StatsSection.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-svelte';
	
	let currentIndex = $state(0);
	let autoplay = $state(true);
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);
	let mounted = $state(false);

	// Saudi Arabian testimonials
	const saudiTestimonials = [
		{
			content: "خدمة ممتازة ومهنية جداً قدمتها الشركة لدعم مشروع الطرق الجديد. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً.",
			contentEn: "Excellent and very professional service provided by the company to support the new highway project. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale.",
			author: "أحمد الغامدي", 
			company: "مجلس منطقة الرياض، المملكة العربية السعودية",
			rating: 5,
			avatar: "👨‍💼"
		},
		{
			content: "تقدم نادي كرة القدم الخاص بنا بطلب لبناء مرافق رياضية جديدة. المشروع له تحديات معقدة حول مواقف السيارات وإدارة المرور. كنادي لم تكن لدينا خبرة أو معرفة بهذا الأمر واحتجنا إلى استشاري للعمل معه.",
			contentEn: "Our football club submitted an application to build new sports facilities. The project has some complicated challenges around car parking and traffic management. As a club we had no experience or knowledge with regards to this and needed a consultant to work with.",
			author: "محمد السعيد",
			company: "نادي الشباب الرياضي، جدة، المملكة العربية السعودية", 
			rating: 5,
			avatar: "⚽"
		},
		{
			content: "خدمة رائعة ورسوم هندسية احترافية ممتازة للمشروع الحضري الجديد.",
			contentEn: "Great service and fantastic professional drawings for the new urban development project.",
			author: "سارة القحطاني",
			company: "شركة التطوير العمراني، الدمام، المملكة العربية السعودية",
			rating: 5,
			avatar: "🏗️"
		},
		{
			content: "تخطيط ممتاز للنقل وحلول مبتكرة لمشروع توسعة الطرق في المنطقة الشرقية. فريق محترف جداً والنتائج فاقت التوقعات.",
			contentEn: "Excellent transport planning and innovative solutions for the road expansion project in the Eastern Province. Very professional team and results exceeded expectations.",
			author: "خالد العتيبي",
			company: "هيئة تطوير المنطقة الشرقية، الخبر، المملكة العربية السعودية",
			rating: 5,
			avatar: "🛣️"
		},
		{
			content: "استشارة ممتازة في تخطيط وتصميم شبكة النقل للمدينة الاقتصادية الجديدة. خبرة تقنية عالية والتزام بالمواعيد المحددة.",
			contentEn: "Excellent consultation in planning and designing the transport network for the new economic city. High technical expertise and commitment to specified deadlines.",
			author: "نورا الشمري",
			company: "الهيئة العامة للطرق، الرياض، المملكة العربية السعودية",
			rating: 5,
			avatar: "👩‍💼"
		}
	];
	
	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 30 }, (_, i) => ({
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
		currentIndex = (currentIndex + 1) % saudiTestimonials.length;
	}
	
	function prevTestimonial() {
		currentIndex = currentIndex === 0 ? saudiTestimonials.length - 1 : currentIndex - 1;
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
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-orange-500/15 rounded-full blur-3xl animate-float-reverse"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Geometric Grid -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="testimonialGrid" width="100" height="100" patternUnits="userSpaceOnUse">
					<circle cx="50" cy="50" r="1.5" fill="currentColor" opacity="0.3">
						<animate attributeName="r" values="1;2.5;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.05"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#testimonialGrid)" />
		</svg>
		
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

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-10">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
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
			<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 text-center relative overflow-hidden transition-all duration-700 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
				
				<!-- Decorative Quote Background -->
				<div class="absolute top-6 left-6 opacity-10">
					<Quote class="w-20 h-20 text-emerald-600 animate-pulse-gentle" />
				</div>
				
				<!-- Enhanced Background Gradient -->
				<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-blue-50/30 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl"></div>
				
				<!-- Avatar -->
				<div class="relative z-10 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle shadow-xl">
					<span class="text-4xl">{saudiTestimonials[currentIndex].avatar}</span>
				</div>
				
				<!-- Content -->
				<div class="relative z-10">
					<!-- Stars -->
					<div class="flex justify-center mb-6">
						{#each Array(saudiTestimonials[currentIndex].rating) as _, starIndex}
							<Star class="w-6 h-6 text-yellow-500 fill-current animate-twinkle" style="animation-delay: {starIndex * 0.1}s;" />
						{/each}
					</div>
					
					<!-- Quote -->
					<blockquote class="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium italic">
						"{($locale || 'en') === 'ar' ? saudiTestimonials[currentIndex].content : saudiTestimonials[currentIndex].contentEn}"
					</blockquote>
					
					<!-- Author -->
					<div class="border-t border-slate-200 dark:border-slate-700 pt-6">
						<div class="font-black text-slate-900 dark:text-white text-xl mb-1">
							{saudiTestimonials[currentIndex].author}
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-bold">
							{saudiTestimonials[currentIndex].company}
						</div>
					</div>
				</div>
			</div>

			<!-- Enhanced Navigation Buttons -->
			<button 
				onclick={prevTestimonial}
				class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-full p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Previous testimonial"
			>
				<ChevronLeft class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>
			
			<button 
				onclick={nextTestimonial}
				class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-full p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
				onmouseenter={() => autoplay = false}
				onmouseleave={() => autoplay = true}
				aria-label="Next testimonial"
			>
				<ChevronRight class="w-6 h-6 text-slate-600 dark:text-slate-300" />
			</button>

			<!-- Enhanced Dots Indicator with Fixed Spacing -->
			<div class="flex justify-center mt-12 space-x-4 rtl:space-x-reverse rtl:space-x-4">
				{#each saudiTestimonials as _, index}
					<button
						onclick={() => goToTestimonial(index)}
						class={`w-4 h-4 rounded-full transition-all duration-300 ${
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
	
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
	.animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
	.animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }

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
		.absolute.left-0,
		.absolute.right-0 {
			display: none;
		}
	}
</style>