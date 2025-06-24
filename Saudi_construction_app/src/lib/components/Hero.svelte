<!-- src/lib/components/Hero.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, Play, Zap, Shield, Award, Users } from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';
  
	let mounted = false;
	let heroRef;
	let isIntersecting = false;
	let mousePosition = { x: 0, y: 0 };
	let currentFeature = 0;
	let particles = [];
	let scrollY = 0;
	let innerHeight = 0;
  
	// Advanced features showcase
	const features = [
		{
			icon: Zap,
			title: 'التقنيات المتطورة',
			titleEn: 'Advanced Technology',
			value: '99.9%',
			metric: 'دقة التصميم',
			metricEn: 'Design Accuracy'
		},
		{
			icon: Shield,
			title: 'معايير الأمان',
			titleEn: 'Safety Standards',
			value: '100%',
			metric: 'امتثال السلامة',
			metricEn: 'Safety Compliance'
		},
		{
			icon: Award,
			title: 'جودة مضمونة',
			titleEn: 'Quality Assured',
			value: '500+',
			metric: 'مشروع مكتمل',
			metricEn: 'Projects Completed'
		},
		{
			icon: Users,
			title: 'فريق محترف',
			titleEn: 'Expert Team',
			value: '50+',
			metric: 'مهندس خبير',
			metricEn: 'Expert Engineers'
		}
	];

	onMount(() => {
		mounted = true;
		
		// Generate fewer particles for cleaner look
		particles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 2 + 1,
			speed: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.3 + 0.1
		}));
		
		// Mouse tracking for parallax effects
		const handleMouseMove = (e) => {
			mousePosition = {
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			};
		};
		
		// Scroll tracking for AOS effects
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
		
		innerHeight = window.innerHeight;
		
		// Feature rotation
		const featureInterval = setInterval(() => {
			currentFeature = (currentFeature + 1) % features.length;
		}, 3000);
		
		// Intersection observer for AOS
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isIntersecting = entry.isIntersecting;
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
		);
		
		if (heroRef) {
			observer.observe(heroRef);
		}
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			clearInterval(featureInterval);
			if (observer) observer.disconnect();
		};
	});

	// AOS Animation delays and effects
	$: heroProgress = Math.min(1, Math.max(0, (innerHeight - scrollY) / innerHeight));
	$: parallaxOffset = scrollY * 0.5;
</script>

<section 
	bind:this={heroRef}
	class="relative min-h-screen overflow-hidden"
	style="--mouse-x: {mousePosition.x}%; --mouse-y: {mousePosition.y}%; --scroll-progress: {heroProgress}; --parallax-offset: {parallaxOffset}px;"
	aria-label={($locale || 'en') === 'ar' ? 'القسم الرئيسي' : 'Main hero section'}
>
	<!-- Minimal Background Elements -->
	<div class="absolute inset-0">
		<!-- Subtle floating particles only -->
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
						animation-duration: {particle.speed * 6}s;
						transform: translate(calc(var(--mouse-x) * 0.{Math.floor(particle.id % 5) + 1}px), calc(var(--mouse-y) * 0.{Math.floor(particle.id % 5) + 1}px)) translateY(calc(var(--parallax-offset) * -0.{Math.floor(particle.id % 3) + 1}));
					"
				></div>
			{/each}
		</div>
	</div>

	<!-- Main Container -->
	<div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-24 pb-16 lg:pt-40 lg:pb-28">
		<div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[80vh]">
			
			<!-- Enhanced SVG Illustration (Larger Height - 6 columns) -->
			<div class="lg:col-span-6 relative order-2 lg:order-1">
				<div class="relative max-w-[900px] mx-auto h-[85vh] min-h-[700px] aos-animate"
					 data-aos="fade-right" data-aos-delay="500" data-aos-duration="1200" data-aos-easing="ease-out-cubic">
					
					<!-- Enhanced Construction Scene SVG with Increased Height -->
					<svg 
						viewBox="0 0 1000 900" 
						class="w-full h-full object-contain drop-shadow-2xl scale-110 lg:scale-125"
						aria-hidden="true"
						role="img"
						style="filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 0 20px rgba(16,185,129,0.1));"
					>
						<defs>
							<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
								<fegaussianblur stdDeviation="4" result="coloredBlur"/>
								<femerge> 
									<femergenode in="coloredBlur"/>
									<femergenode in="SourceGraphic"/>
								</femerge>
							</filter>
							<filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
								<fegaussianblur stdDeviation="6" result="coloredBlur"/>
								<femerge> 
									<femergenode in="coloredBlur"/>
									<femergenode in="SourceGraphic"/>
								</femerge>
							</filter>
							<linearGradient id="smartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" style="stop-color:#10b981;stop-opacity:0.8"/>
								<stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
							</linearGradient>
						</defs>

						<!-- Enhanced Modern City Skyline with Glow Effects -->
						<g class="skyline" stroke="#374151" stroke-width="2.5" fill="none">
							<!-- Smart Skyscraper 1 with Construction Indicators -->
							<rect x="60" y="180" width="100" height="250" rx="8" filter="url(#glow)">
								<animate attributeName="height" values="250;265;250" dur="12s" repeatCount="indefinite" />
							</rect>
							<!-- Construction Windows -->
							<rect x="75" y="200" width="15" height="15" fill="#10b981" opacity="0.8" filter="url(#strongGlow)">
								<animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
							</rect>
							<rect x="100" y="230" width="15" height="15" fill="#3b82f6" opacity="0.9" filter="url(#strongGlow)">
								<animate attributeName="opacity" values="0.9;0.4;0.9" dur="4s" repeatCount="indefinite" />
							</rect>
							<rect x="125" y="250" width="15" height="15" fill="#f59e0b" opacity="0.7" filter="url(#strongGlow)">
								<animate attributeName="opacity" values="0.7;0.2;0.7" dur="5s" repeatCount="indefinite" />
							</rect>
							
							<!-- Green Building with Sustainability Indicator -->
							<rect x="175" y="150" width="110" height="290" rx="8" filter="url(#glow)">
								<animate attributeName="height" values="290;305;290" dur="15s" repeatCount="indefinite" />
							</rect>
							<circle cx="230" cy="230" r="25" fill="none" stroke="#10b981" stroke-width="3" filter="url(#strongGlow)">
								<animate attributeName="r" values="25;30;25" dur="6s" repeatCount="indefinite" />
							</circle>
							<text x="230" y="238" text-anchor="middle" font-size="12" font-weight="bold" fill="#10b981">ECO</text>
							
							<!-- Modern Glass Building -->
							<rect x="300" y="170" width="90" height="270" rx="8" stroke-dasharray="15,8" filter="url(#glow)">
								<animate attributeName="height" values="270;285;270" dur="10s" repeatCount="indefinite" />
								<animate attributeName="stroke-dashoffset" values="0;23;0" dur="8s" repeatCount="indefinite" />
							</rect>
							
							<!-- High-Tech Glass Tower -->
							<rect x="405" y="130" width="125" height="310" rx="12" stroke-dasharray="18,10" filter="url(#glow)">
								<animate attributeName="stroke-dashoffset" values="0;28;0" dur="8s" repeatCount="indefinite" />
							</rect>
							
							<!-- Under Construction Building -->
							<rect x="545" y="220" width="150" height="220" rx="8" stroke-dasharray="25,15" filter="url(#glow)">
								<animate attributeName="height" values="220;240;220" dur="8s" repeatCount="indefinite" />
								<animate attributeName="stroke-dashoffset" values="0;40;0" dur="6s" repeatCount="indefinite" />
							</rect>
						</g>

						<!-- Enhanced Construction Machinery with Advanced Animations -->
						<g class="machinery">
							<!-- Advanced Tower Crane with Realistic Movement -->
							<g class="tower-crane" filter="url(#glow)">
								<!-- Reinforced Crane Base -->
								<rect x="720" y="410" width="55" height="45" fill="none" stroke="#374151" stroke-width="4" rx="5"/>
								<rect x="735" y="420" width="25" height="25" fill="none" stroke="#10b981" stroke-width="2" opacity="0.6"/>
								
								<!-- Enhanced Crane Mast with Segments -->
								<rect x="740" y="100" width="14" height="310" fill="none" stroke="#374151" stroke-width="5" rx="2">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 747 255;4 747 255;-4 747 255;0 747 255" 
										dur="25s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Extended Crane Jib with Counter-weight -->
								<rect x="520" y="96" width="380" height="10" fill="none" stroke="#374151" stroke-width="5" rx="2">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 747 101;5 747 101;-5 747 101;0 747 101" 
										dur="25s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Counter Jib with Weight -->
								<rect x="756" y="96" width="120" height="10" fill="none" stroke="#374151" stroke-width="5" rx="2">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 747 101;5 747 101;-5 747 101;0 747 101" 
										dur="25s" 
										repeatCount="indefinite"
									/>
								</rect>
								<rect x="860" y="88" width="20" height="25" fill="none" stroke="#6b7280" stroke-width="3" rx="3">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 747 101;5 747 101;-5 747 101;0 747 101" 
										dur="25s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Construction Hook with Load -->
								<circle cx="580" cy="125" r="6" fill="none" stroke="#ef4444" stroke-width="4" filter="url(#strongGlow)">
									<animateTransform 
										attributeName="transform" 
										type="translate" 
										values="0,0;0,60;0,0" 
										dur="18s" 
										repeatCount="indefinite"
									/>
								</circle>
								
								<!-- Material Load -->
								<rect x="570" y="140" width="20" height="15" fill="none" stroke="#8b5a2b" stroke-width="2" rx="2">
									<animateTransform 
										attributeName="transform" 
										type="translate" 
										values="0,0;0,60;0,0" 
										dur="18s" 
										repeatCount="indefinite"
									/>
								</rect>
								
								<!-- Enhanced Crane Cables -->
								<line x1="580" y1="106" x2="580" y2="155" stroke="#374151" stroke-width="2">
									<animate attributeName="y2" values="155;215;155" dur="18s" repeatCount="indefinite" />
								</line>
							</g>

							<!-- Advanced Mobile Crane -->
							<g class="mobile-crane" filter="url(#glow)">
								<rect x="810" y="410" width="110" height="45" rx="8" fill="none" stroke="#374151" stroke-width="4"/>
								<circle cx="835" cy="465" r="18" fill="none" stroke="#374151" stroke-width="4"/>
								<circle cx="895" cy="465" r="18" fill="none" stroke="#374151" stroke-width="4"/>
								<!-- Hydraulic Outriggers -->
								<line x1="815" y1="455" x2="800" y2="475" stroke="#374151" stroke-width="3"/>
								<line x1="915" y1="455" x2="930" y2="475" stroke="#374151" stroke-width="3"/>
								<rect x="855" y="350" width="10" height="60" fill="none" stroke="#374151" stroke-width="4" rx="2">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 860 410;20 860 410;-20 860 410;0 860 410" 
										dur="22s" 
										repeatCount="indefinite"
									/>
								</rect>
							</g>

							<!-- Enhanced Excavator with Hydraulic Action -->
							<g class="excavator" filter="url(#glow)">
								<rect x="125" y="425" width="85" height="38" rx="15" fill="none" stroke="#374151" stroke-width="4"/>
								<circle cx="155" cy="475" r="16" fill="none" stroke="#374151" stroke-width="4"/>
								<circle cx="185" cy="475" r="16" fill="none" stroke="#374151" stroke-width="4"/>
								
								<!-- Enhanced Excavator Arm -->
								<line x1="170" y1="425" x2="230" y2="390" stroke="#374151" stroke-width="5">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 170 425;25 170 425;0 170 425" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</line>
								<line x1="230" y1="390" x2="265" y2="415" stroke="#374151" stroke-width="5">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 230 390;-40 230 390;0 230 390" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</line>
								
								<!-- Advanced Bucket -->
								<path d="M265,415 L285,425 L275,445 L255,435 Z" fill="none" stroke="#374151" stroke-width="4">
									<animateTransform 
										attributeName="transform" 
										type="rotate" 
										values="0 270 430;60 270 430;0 270 430" 
										dur="20s" 
										repeatCount="indefinite"
									/>
								</path>
							</g>
						</g>

						<!-- Enhanced Construction Workers with Professional Gear -->
						<g class="workers">
							<!-- Worker 1 with Engineering Tablet -->
							<g class="worker-1" filter="url(#glow)">
								<circle cx="440" cy="430" r="12" fill="none" stroke="#374151" stroke-width="4"/>
								<rect x="430" y="440" width="16" height="25" fill="none" stroke="#374151" stroke-width="4"/>
								<rect x="420" y="450" width="35" height="20" fill="none" stroke="#3b82f6" stroke-width="2" rx="4" filter="url(#strongGlow)"/>
								<circle cx="440" cy="420" r="18" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.7" filter="url(#strongGlow)"/>
								<text x="440" y="462" text-anchor="middle" font-size="8" font-weight="bold" fill="#3b82f6">PLAN</text>
							</g>
							
							<!-- Worker 2 with Surveying Equipment -->
							<g class="worker-2" filter="url(#glow)">
								<circle cx="350" cy="437" r="12" fill="none" stroke="#374151" stroke-width="4"/>
								<rect x="340" y="447" width="16" height="25" fill="none" stroke="#374151" stroke-width="4"/>
								<line x1="340" y1="425" x2="385" y2="400" stroke="#374151" stroke-width="4"/>
								<rect x="385" y="395" width="15" height="15" fill="none" stroke="#10b981" stroke-width="2" filter="url(#strongGlow)"/>
								<circle cx="350" cy="427" r="18" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.7" filter="url(#strongGlow)"/>
							</g>
							
							<!-- Worker 3 with Safety Vest -->
							<g class="worker-3" filter="url(#glow)">
								<circle cx="565" cy="437" r="12" fill="none" stroke="#374151" stroke-width="4"/>
								<rect x="555" y="447" width="16" height="25" fill="none" stroke="#f59e0b" stroke-width="4"/>
								<circle cx="565" cy="427" r="18" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.7" filter="url(#strongGlow)"/>
								<circle cx="570" cy="452" r="3" fill="#10b981" opacity="0.8" filter="url(#strongGlow)">
									<animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
								</circle>
							</g>
						</g>

						<!-- Construction Technology Overlay -->
						<g class="digital-overlay">
							<!-- Enhanced Drone Survey -->
							<g class="drone" filter="url(#glow)">
								<rect x="250" y="60" width="30" height="8" rx="4" fill="none" stroke="#374151" stroke-width="2"/>
								<circle cx="258" cy="56" r="5" fill="none" stroke="#374151" stroke-width="2"/>
								<circle cx="272" cy="56" r="5" fill="none" stroke="#374151" stroke-width="2"/>
								<circle cx="258" cy="72" r="5" fill="none" stroke="#374151" stroke-width="2"/>
								<circle cx="272" cy="72" r="5" fill="none" stroke="#374151" stroke-width="2"/>
								<circle cx="265" cy="64" r="8" fill="none" stroke="#10b981" stroke-width="2" filter="url(#strongGlow)">
									<animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
								</circle>
								
								<animateTransform 
									attributeName="transform" 
									type="translate" 
									values="0,0;150,30;300,0;150,-30;0,0" 
									dur="30s" 
									repeatCount="indefinite"
								/>
							</g>
							
							<!-- Enhanced Project Display -->
							<g class="project-display" filter="url(#glow)">
								<rect x="475" y="490" width="90" height="60" rx="8" fill="none" stroke="#374151" stroke-width="4"/>
								<rect x="485" y="500" width="70" height="45" fill="url(#smartGradient)" opacity="0.3" rx="4">
									<animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
								</rect>
								
								<!-- Enhanced 3D Building Model -->
								<g opacity="0.9">
									<rect x="495" y="508" width="22" height="30" fill="none" stroke="#10b981" stroke-width="2" filter="url(#strongGlow)">
										<animate attributeName="height" values="30;38;30" dur="7s" repeatCount="indefinite" />
									</rect>
									<rect x="520" y="503" width="22" height="38" fill="none" stroke="#3b82f6" stroke-width="2" filter="url(#strongGlow)">
										<animate attributeName="height" values="38;46;38" dur="9s" repeatCount="indefinite" />
									</rect>
									<rect x="545" y="513" width="22" height="25" fill="none" stroke="#f59e0b" stroke-width="2" filter="url(#strongGlow)">
										<animate attributeName="height" values="25;33;25" dur="8s" repeatCount="indefinite" />
									</rect>
								</g>
								<text x="520" y="575" text-anchor="middle" font-size="10" font-weight="bold" fill="#3b82f6">PROJECT</text>
							</g>
							
							<!-- Enhanced Progress Displays -->
							<g class="progress-displays">
								<circle cx="650" cy="150" r="35" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="220" filter="url(#strongGlow)">
									<animate attributeName="stroke-dasharray" values="0,220;190,30;220,0" dur="10s" repeatCount="indefinite" />
								</circle>
								<text x="650" y="158" text-anchor="middle" font-size="16" font-weight="bold" fill="#10b981">89%</text>
								<text x="650" y="175" text-anchor="middle" font-size="8" font-weight="bold" fill="#10b981">COMPLETE</text>
								
								<circle cx="775" cy="180" r="28" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="176" filter="url(#strongGlow)">
									<animate attributeName="stroke-dasharray" values="0,176;125,51;176,0" dur="12s" repeatCount="indefinite" />
								</circle>
								<text x="775" y="187" text-anchor="middle" font-size="14" font-weight="bold" fill="#f59e0b">71%</text>
								<text x="775" y="200" text-anchor="middle" font-size="7" font-weight="bold" fill="#f59e0b">EFFICIENCY</text>
							</g>
						</g>

						<!-- Enhanced Environmental Elements -->
						<g class="environment">
							<!-- Enhanced Ground Level -->
							<line x1="0" y1="465" x2="1000" y2="465" stroke="#6b7280" stroke-width="2" opacity="0.4"/>
							
							<!-- Trees with Environmental Sensors -->
							<g class="trees">
								<circle cx="38" cy="450" r="22" fill="none" stroke="#22c55e" stroke-width="4" opacity="0.8"/>
								<line x1="38" y1="450" x2="38" y2="480" stroke="#8b5a2b" stroke-width="5"/>
								
								<circle cx="940" cy="455" r="18" fill="none" stroke="#22c55e" stroke-width="4" opacity="0.8"/>
								<line x1="940" y1="455" x2="940" y2="480" stroke="#8b5a2b" stroke-width="4"/>
							</g>
							
							<!-- Enhanced Clouds -->
							<g class="clouds" opacity="0.5">
								<ellipse cx="190" cy="38" rx="38" ry="18" fill="none" stroke="#9ca3af" stroke-width="2">
									<animateTransform attributeName="transform" type="translate" values="0,0;80,0;0,0" dur="40s" repeatCount="indefinite" />
								</ellipse>
								<ellipse cx="625" cy="25" rx="45" ry="22" fill="none" stroke="#9ca3af" stroke-width="2">
									<animateTransform attributeName="transform" type="translate" values="0,0;-70,0;0,0" dur="45s" repeatCount="indefinite" />
								</ellipse>
							</g>
						</g>

						<!-- Enhanced Safety and Quality Indicators -->
						<g class="safety-indicators">
							<!-- Enhanced Safety Zone -->
							<rect x="100" y="385" width="280" height="120" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="15,8" opacity="0.7" filter="url(#glow)">
								<animate attributeName="stroke-dashoffset" values="0;23;0" dur="5s" repeatCount="indefinite" />
							</rect>
							<text x="240" y="408" text-anchor="middle" font-size="14" font-weight="bold" fill="#f59e0b">SAFETY ZONE</text>
							<text x="240" y="425" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">AUTHORIZED PERSONNEL ONLY</text>
							
							<!-- Enhanced Quality Control -->
							<circle cx="500" cy="385" r="30" fill="none" stroke="#3b82f6" stroke-width="4" stroke-dasharray="8,8" filter="url(#strongGlow)">
								<animate attributeName="stroke-dashoffset" values="0;16;0" dur="4s" repeatCount="indefinite" />
							</circle>
							<text x="500" y="392" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">QC</text>
							<text x="500" y="405" text-anchor="middle" font-size="8" font-weight="bold" fill="#3b82f6">CHECKPOINT</text>
						</g>
					</svg>

					<!-- Enhanced Construction Management Cards -->
					<div class="absolute top-1/4 -right-4 lg:-right-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-sm aos-animate"
						 data-aos="fade-left" data-aos-delay="1000" data-aos-duration="800">
						<div class="flex items-center space-x-4 rtl:space-x-reverse">
							<div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-xl flex items-center justify-center shadow-lg">
								<span class="text-3xl animate-pulse-gentle">🌿</span>
							</div>
							<div>
								<div class="text-lg font-bold text-slate-900 dark:text-white">
									{($locale || 'en') === 'ar' ? 'البناء المستدام' : 'Sustainable Construction'}
								</div>
								<div class="text-sm text-slate-600 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? 'تقنيات صديقة للبيئة' : 'Eco-Friendly Technologies'}
								</div>
								<div class="flex items-center mt-2 space-x-2 rtl:space-x-reverse">
									<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
									<span class="text-xs text-green-600 dark:text-green-400 font-semibold">ACTIVE</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Enhanced Engineering Technology Badge -->
					<div class="absolute -bottom-4 lg:-bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 aos-animate"
						 data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="800">
						<div class="flex items-center space-x-4 rtl:space-x-reverse">
							<div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl flex items-center justify-center shadow-lg">
								<span class="text-3xl animate-spin-slow">🔧</span>
							</div>
							<div>
								<div class="text-lg font-bold text-slate-900 dark:text-white">
									{($locale || 'en') === 'ar' ? 'الهندسة المتقدمة' : 'Advanced Engineering'}
								</div>
								<div class="text-sm text-slate-600 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? 'حلول هندسية متطورة' : 'Engineering Solutions'}
								</div>
								<div class="flex items-center mt-2 space-x-2 rtl:space-x-reverse">
									<div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
									<span class="text-xs text-blue-600 dark:text-blue-400 font-semibold">IN PROGRESS</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Enhanced Content Block (6 columns) -->
			<div class="lg:col-span-6 space-y-10 order-1 lg:order-2">
				
				<!-- Enhanced Badge with AOS -->
				<div class="aos-animate" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-easing="ease-out-cubic">
					<div class="inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 backdrop-blur-xl text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/50 dark:border-emerald-700/50 text-sm font-bold transition-all duration-1000 shadow-lg hover:shadow-2xl hover:scale-105">
						<div class="relative mr-3 rtl:ml-3 rtl:mr-0">
							<div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse-glow"></div>
							<div class="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
						</div>
						<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg animate-bounce-gentle">🏗️</span>
						<span class="font-semibold">{($locale || 'en') === 'ar' ? APP_CONFIG.location : APP_CONFIG.locationEn}</span>
						<div class="ml-3 rtl:mr-3 rtl:ml-0 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full animate-pulse">
							{($locale || 'en') === 'ar' ? 'جديد' : 'NEW'}
						</div>
					</div>
				</div>

				<!-- Enhanced Main Title with AOS -->
				<div class="aos-animate" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800" data-aos-easing="ease-out-cubic">
					<h1 class="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-8">
						<span class="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
							{($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}
						</span>
						{#if ($locale || 'en') === 'ar'}
							<span class="block text-xl lg:text-2xl xl:text-3xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
								{APP_CONFIG.tagline}
							</span>
						{:else}
							<span class="block text-xl lg:text-2xl xl:text-3xl font-black text-slate-700 dark:text-slate-300 mt-6 animate-fade-in-delayed">
								{APP_CONFIG.taglineEn}
							</span>
						{/if}
					</h1>
				</div>

				<!-- Enhanced Description with AOS -->
				<div class="aos-animate" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-out-cubic">
					<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
						{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}
					</p>
					<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
						{($locale || 'en') === 'ar' 
							? 'خبرة تمتد لأكثر من 20 عاماً في تقديم حلول هندسية مبتكرة ومستدامة باستخدام أحدث التقنيات والمعايير العالمية'
							: 'Over 20 years of experience delivering innovative and sustainable engineering solutions using cutting-edge technology and international standards'
						}
					</p>
				</div>

				<!-- Enhanced CTA Section with Smaller Buttons -->
				<div class="space-y-8 aos-animate" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800" data-aos-easing="ease-out-cubic">
					<div class="flex flex-col sm:flex-row gap-4">
						<a 
							href="/services" 
							class="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 text-white text-base font-bold rounded-xl transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-lg hover:shadow-xl w-full sm:w-auto overflow-hidden"
							aria-label={($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore our services'}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
							<span class="relative mr-2 rtl:ml-2 rtl:mr-0 text-lg group-hover:scale-110 transition-transform duration-300">🚀</span>
							<span class="relative">{($locale || 'en') === 'ar' ? 'استكشف خدماتنا' : 'Explore Services'}</span>
							<ArrowRight class="relative ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
						</a>
						
						<a 
							href="/about" 
							class="group inline-flex items-center justify-center px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-base font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg w-full sm:w-auto"
							aria-label={($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn about us'}
						>
							<Play class="mr-2 rtl:ml-2 rtl:mr-0 w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
							<span>{($locale || 'en') === 'ar' ? 'تعرف علينا' : 'Learn More'}</span>
						</a>
					</div>

					<!-- Enhanced Trust Indicators with AOS -->
					<div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
						{#each features as feature, index}
							<div class="text-center group hover:scale-110 transition-all duration-500 aos-animate" 
								 data-aos="fade-up" 
								 data-aos-delay={500 + (index * 150)} 
								 data-aos-duration="600"
								 style="animation-delay: {index * 0.2}s;">
								<div class="flex items-center justify-center mb-3">
									<div class={`w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${index === currentFeature ? 'animate-pulse-glow' : ''}`}>
										<svelte:component this={feature.icon} class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
									</div>
								</div>
								<div class={`text-3xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 ${index === currentFeature ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
									{feature.value}
								</div>
								<div class="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">
									{($locale || 'en') === 'ar' ? feature.metric : feature.metricEn}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* All existing animation keyframes remain the same */
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

	@keyframes fade-in-right-advanced {
		0% {
			opacity: 0;
			transform: translateX(40px) scale(0.95) rotateY(10deg);
		}
		100% {
			opacity: 1;
			transform: translateX(0) scale(1) rotateY(0deg);
		}
	}

	@keyframes float-reverse-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		25% { 
			transform: translateY(8px) rotate(-2deg) scale(1.02); 
		}
		75% { 
			transform: translateY(-4px) rotate(1deg) scale(0.98); 
		}
	}

	@keyframes float-gentle-advanced {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg) scale(1); 
		}
		50% { 
			transform: translateY(-10px) rotate(1deg) scale(1.03); 
		}
	}

	@keyframes float-slow {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-30px) scale(1.05); 
		}
	}

	@keyframes float-reverse {
		0%, 100% { 
			transform: translateY(0px) scale(1) rotate(0deg); 
		}
		50% { 
			transform: translateY(25px) scale(0.95) rotate(2deg); 
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

	@keyframes pulse-glow {
		0%, 100% { 
			box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2);
			transform: scale(1);
		}
		50% { 
			box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
			transform: scale(1.05);
		}
	}

	@keyframes bounce-gentle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
		}
		50% { 
			transform: translateY(-8px) scale(1.05); 
		}
	}

	@keyframes pulse-subtle {
		0%, 100% { 
			opacity: 0.6; 
			transform: scale(1);
		}
		50% { 
			opacity: 0.9; 
			transform: scale(1.03);
		}
	}

	@keyframes pulse-gentle {
		0%, 100% { 
			transform: scale(1); 
		}
		50% { 
			transform: scale(1.15); 
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

	@keyframes float-particle {
		0%, 100% { 
			transform: translateY(0px) scale(1); 
			opacity: 0.3;
		}
		50% { 
			transform: translateY(-15px) scale(1.1); 
			opacity: 0.6;
		}
	}

	@keyframes spin-slow {
		from { 
			transform: rotate(0deg); 
		}
		to { 
			transform: rotate(360deg); 
		}
	}

	/* Enhanced AOS Animation Classes */
	.aos-animate[data-aos="fade-up"] {
		transform: translateY(0);
		opacity: 1;
		transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.aos-animate[data-aos="fade-right"] {
		transform: translateX(0);
		opacity: 1;
		transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.aos-animate[data-aos="fade-left"] {
		transform: translateX(0);
		opacity: 1;
		transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.aos-animate[data-aos="zoom-in"] {
		transform: scale(1);
		opacity: 1;
		transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Base states for AOS animations */
	[data-aos="fade-up"] {
		transform: translateY(40px);
		opacity: 0;
	}

	[data-aos="fade-right"] {
		transform: translateX(-40px);
		opacity: 0;
	}

	[data-aos="fade-left"] {
		transform: translateX(40px);
		opacity: 0;
	}

	[data-aos="zoom-in"] {
		transform: scale(0.9);
		opacity: 0;
	}

	/* Standard Animation Classes */
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-right-advanced { animation: fade-in-right-advanced 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-float-reverse-advanced { animation: float-reverse-advanced 6s ease-in-out infinite; }
	.animate-float-gentle-advanced { animation: float-gentle-advanced 8s ease-in-out infinite; }
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-gradient-flow { animation: gradient-flow 8s ease infinite; }
	.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
	.animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }
	.animate-float-particle { animation: float-particle 6s ease-in-out infinite; }
	.animate-spin-slow { animation: spin-slow 8s linear infinite; }

	/* Utility Classes */
	.bg-300\% { background-size: 300% 300%; }

	/* Enhanced Responsive Typography */
	@media (max-width: 640px) {
		h1 {
			font-size: 2.5rem !important;
			line-height: 1.1;
		}
		
		h1 span:last-child {
			font-size: 1.25rem !important;
		}
		
		p {
			font-size: 1rem !important;
		}

		.grid.lg\\:grid-cols-12 {
			grid-template-columns: 1fr;
		}

		.order-2.lg\\:order-1 {
			order: 2;
		}

		.order-1.lg\\:order-2 {
			order: 1;
		}

		/* Mobile SVG adjustments */
		.h-\[85vh\] {
			height: 60vh;
		}
		
		.min-h-\[700px\] {
			min-height: 500px;
		}
	}

	/* RTL Support */
	[dir="rtl"] .group-hover\:translate-x-1 {
		transform: translateX(-0.25rem);
	}

	/* Enhanced Dark Mode */
	.dark .backdrop-blur-xl {
		backdrop-filter: blur(24px) saturate(180%) brightness(1.1);
	}

	/* Reduced Motion Support */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		[data-aos] {
			transition: none !important;
			animation: none !important;
		}
	}

	/* Enhanced Performance */
	.animate-float-reverse-advanced,
	.animate-float-gentle-advanced,
	.animate-gradient-flow,
	.animate-pulse-glow {
		will-change: transform;
		transform: translateZ(0);
	}

	/* Enhanced Focus Styles */
	.focus\:ring-4:focus {
		box-shadow: 0 0 0 4px var(--tw-ring-color);
	}

	/* Enhanced SVG Scaling */
	@media (min-width: 1024px) {
		.scale-110 {
			transform: scale(1.1);
		}
		
		.lg\\:scale-125 {
			transform: scale(1.25);
		}
	}
</style>