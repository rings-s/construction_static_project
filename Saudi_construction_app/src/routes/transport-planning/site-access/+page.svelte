<!-- src/routes/transport-planning/site-access/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		MapPin, 
		Eye, 
		Shield, 
		FileCheck, 
		Route, 
		Compass,
		CheckCircle,
		TrendingUp,
		Award,
		Users,
		Navigation,
		Zap,
		Target,
		Settings,
		BarChart3,
		Search,
		ShieldCheck,
		CheckSquare,
		Truck,
		Building,
		Hospital,
		Home,
		Factory,
		Clock
	} from 'lucide-svelte';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { getProjectImage, getServiceImage } from '$lib/config/images.js';

	// Image paths for easy addition later
	const imagePaths = {
		caseStudies: {
			torrington: '/images/case-studies/torrington-dwelling.jpg',
			colchester: '/images/case-studies/colchester-commercial.jpg',
			australia: '/images/case-studies/australia-hospital.jpg'
		},
		benefits: {
			excellence: '/images/services/site-access-excellence.jpg'
		},
		features: {
			siteDesign: '/images/features/site-access-design.jpg',
			visibility: '/images/features/visibility-analysis.jpg',
			sweptPath: '/images/features/swept-path-analysis.jpg',
			safety: '/images/features/safety-assessment.jpg',
			dueDiligence: '/images/features/due-diligence.jpg',
			capacity: '/images/features/capacity-analysis.jpg'
		}
	};

	// State for image loading
	let imageErrors = $state({});

	// Function to handle image errors
	function handleImageError(key) {
		imageErrors[key] = true;
		imageErrors = { ...imageErrors };
	}

	// Page content structured for consistency
	const pageContent = {
		title: ($locale || 'en') === 'ar' ? 'الوصول للموقع والعناية الواجبة' : 'Site Access & Due Diligence',
		subtitle: ($locale || 'en') === 'ar' 
			? 'تحديد الجوانب المحتملة للطرق السريعة والنقل مع رؤية مشروعك' 
			: 'Identifying Potential Highway & Transport Aspects with Your Project Vision',
		description: ($locale || 'en') === 'ar'
			? 'نساعدك في تطوير حلول الوصول للموقع التي تلبي معايير الطرق السريعة وتضمن السلامة والامتثال للمتطلبات التنظيمية'
			: 'We help you develop site access solutions that meet highway standards and ensure safety and regulatory compliance',
		icon: '🛣️',

		stats: [
			{
				value: '200+',
				label: 'مشروع وصول للموقع',
				labelEn: 'Site Access Projects',
			},
			{
				value: '95%',
				label: 'معدل الموافقة',
				labelEn: 'Approval Rate',
			},
			{
				value: '15+',
				label: 'سنة خبرة',
				labelEn: 'Years Experience',
			},
			{
				value: '100%',
				label: 'امتثال للمعايير',
				labelEn: 'Standards Compliance',
			}
		],

		features: [
			{
				icon: Navigation,
				title: 'تصميم الوصول للموقع',
				titleEn: 'Site Access Design',
				description: 'تصميمات مفصلة للوصول للموقع تشمل المحاذاة الأفقية والعمودية ومناطق الرؤية',
				descriptionEn: 'Detailed site access designs including horizontal and vertical alignment with visibility splays',
				imagePath: imagePaths.features.siteDesign
			},
			{
				icon: Search,
				title: 'تحليل الرؤية',
				titleEn: 'Visibility Analysis',
				description: 'تقييم شامل لمناطق الرؤية وزوايا الرؤية لضمان السلامة المرورية',
				descriptionEn: 'Comprehensive assessment of visibility splays and sight lines for traffic safety',
				imagePath: imagePaths.features.visibility
			},
			{
				icon: Truck,
				title: 'تحليل المسار المتحرك',
				titleEn: 'Swept Path Analysis',
				description: 'محاكاة حركة المركبات المختلفة لضمان إمكانية الوصول الآمن والفعال',
				descriptionEn: 'Vehicle movement simulation for various vehicle types ensuring safe and efficient access',
				imagePath: imagePaths.features.sweptPath
			},
			{
				icon: ShieldCheck,
				title: 'تقييم السلامة',
				titleEn: 'Safety Assessment',
				description: 'تقييم شامل للمخاطر المرورية وتطوير تدابير الحماية المناسبة',
				descriptionEn: 'Comprehensive traffic risk assessment and appropriate safety measure development',
				imagePath: imagePaths.features.safety
			},
			{
				icon: CheckSquare,
				title: 'العناية الواجبة',
				titleEn: 'Due Diligence',
				description: 'فحص شامل للامتثال للمعايير والمتطلبات التنظيمية للطرق السريعة',
				descriptionEn: 'Thorough examination of highway standards and regulatory requirements compliance',
				imagePath: imagePaths.features.dueDiligence
			},
			{
				icon: BarChart3,
				title: 'تحليل السعة',
				titleEn: 'Capacity Analysis',
				description: 'تحليل قدرة الطريق على استيعاب الحركة المرورية الإضافية من التطوير',
				descriptionEn: 'Analysis of road capacity to accommodate additional traffic from development',
				imagePath: imagePaths.features.capacity
			}
		],

		benefits: [
			($locale || 'en') === 'ar' ? 'ضمان الامتثال لمعايير الطرق السريعة الحالية' : 'Ensure compliance with current highway standards',
			($locale || 'en') === 'ar' ? 'تقليل مخاطر رفض التطبيقات التخطيطية' : 'Reduce risk of planning application rejection',
			($locale || 'en') === 'ar' ? 'تحسين السلامة المرورية للموقع والمنطقة المحيطة' : 'Improve traffic safety for site and surrounding area',
			($locale || 'en') === 'ar' ? 'تسريع عملية الموافقة من السلطات المحلية' : 'Accelerate approval process from local authorities',
			($locale || 'en') === 'ar' ? 'توفير حلول فعالة من حيث التكلفة للوصول للموقع' : 'Provide cost-effective site access solutions',
			($locale || 'en') === 'ar' ? 'دعم شامل من المرحلة الأولية حتى التنفيذ' : 'Comprehensive support from initial stage to implementation'
		],

		process: [
			{
				title: 'التقييم الأولي',
				titleEn: 'Initial Assessment',
				description: 'فحص الموقع وتحديد متطلبات الوصول والتحديات المحتملة',
				descriptionEn: 'Site examination and identification of access requirements and potential challenges'
			},
			{
				title: 'تحليل المعايير',
				titleEn: 'Standards Analysis',
				description: 'مراجعة معايير الطرق السريعة المطبقة والمتطلبات التنظيمية',
				descriptionEn: 'Review of applicable highway standards and regulatory requirements'
			},
			{
				title: 'تطوير التصميم',
				titleEn: 'Design Development',
				description: 'إعداد تصميمات مفصلة تشمل جميع الجوانب التقنية المطلوبة',
				descriptionEn: 'Preparation of detailed designs including all required technical aspects'
			},
			{
				title: 'التقديم والدعم',
				titleEn: 'Submission & Support',
				description: 'تقديم الوثائق للسلطات المختصة وتقديم الدعم خلال عملية المراجعة',
				descriptionEn: 'Document submission to authorities and support throughout review process'
			}
		],

		caseStudies: [
			{
				title: 'مسكن جديد في توريتون، إسكس',
				titleEn: 'New Dwelling Torrington, Essex',
				description: 'تطوير وصول للموقع لمسكن جديد من طابقين باستخدام حق الطريق الزراعي مع تصميمات تقنية مفصلة',
				descriptionEn: 'Site access development for new two-storey dwelling using agricultural Right of Way with detailed technical designs',
				location: 'توريتون، إسكس، المملكة المتحدة',
				locationEn: 'Torrington, Essex, UK',
				duration: '6 أشهر',
				durationEn: '6 months',
				team: '3 متخصصين',
				teamEn: '3 specialists',
				imagePath: imagePaths.caseStudies.torrington,
				icon: Home,
				key: 'torrington'
			},
			{
				title: 'مجمع تجاري في كولتشستر',
				titleEn: 'Commercial Complex Colchester',
				description: 'تصميم وصول متعدد النقاط لمجمع تجاري كبير مع تحليل شامل للحركة المرورية',
				descriptionEn: 'Multi-point access design for large commercial complex with comprehensive traffic analysis',
				location: 'كولتشستر، إسكس، المملكة المتحدة',
				locationEn: 'Colchester, Essex, UK',
				duration: '8 أشهر',
				durationEn: '8 months',
				team: '5 متخصصين',
				teamEn: '5 specialists',
				imagePath: imagePaths.caseStudies.colchester,
				icon: Building,
				key: 'colchester'
			},
			{
				title: 'مستشفى جامعي في أستراليا',
				titleEn: 'University Hospital Australia',
				description: 'حلول وصول معقدة لمستشفى جامعي تشمل وصول الطوارئ والخدمات اللوجستية',
				descriptionEn: 'Complex access solutions for university hospital including emergency and logistics access',
				location: 'سيدني، أستراليا',
				locationEn: 'Sydney, Australia',
				duration: '12 شهراً',
				durationEn: '12 months',
				team: '8 متخصصين',
				teamEn: '8 specialists',
				imagePath: imagePaths.caseStudies.australia,
				icon: Hospital,
				key: 'australia'
			}
		]
	};
</script>

<svelte:head>
	<title>{pageContent.title} - Transport Planning Services</title>
	<meta name="description" content={pageContent.description} />
	<meta property="og:title" content="{pageContent.title} - Transport Planning Services" />
	<meta property="og:description" content={pageContent.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Enhanced ServicePageLayout with custom case studies -->
<ServicePageLayout
	title={pageContent.title}
	subtitle={pageContent.subtitle}
	description={pageContent.description}
	icon={pageContent.icon}
	features={pageContent.features}
	benefits={pageContent.benefits}
	process={pageContent.process}
	caseStudies={[]} 
	stats={pageContent.stats}
/>

<!-- Custom Enhanced Case Studies Section with Images -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/5 to-amber-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على مشاريعنا الناجحة وخبراتنا المتنوعة'
					: 'Examples of our successful projects and diverse expertise'
				}
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each pageContent.caseStudies as study, index}
				<article class="group bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 animate-fade-in-up-bounce" style="animation-delay: {index * 0.15}s;">
					
					<!-- Enhanced Header with Real Image -->
					<div class="relative h-48 overflow-hidden">
						{#if !imageErrors[study.key]}
							<img 
								src={study.imagePath} 
								alt={($locale || 'en') === 'ar' ? study.title : study.titleEn}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								loading="lazy"
								on:error={() => handleImageError(study.key)}
							/>
						{/if}
						
						<!-- Fallback with enhanced styling -->
						{#if imageErrors[study.key] || !study.imagePath}
							<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-amber-50 to-emerald-200 dark:from-emerald-900/30 dark:via-amber-900/20 dark:to-emerald-800/30 flex items-center justify-center">
								<!-- Background Pattern -->
								<div class="absolute inset-0 opacity-20">
									<svg width="100%" height="100%" viewBox="0 0 100 100">
										<pattern id="case-pattern-{index}" width="15" height="15" patternUnits="userSpaceOnUse">
											<circle cx="7.5" cy="7.5" r="1" fill="currentColor" opacity="0.3"/>
										</pattern>
										<rect width="100%" height="100%" fill="url(#case-pattern-{index})" />
									</svg>
								</div>
								
								<div class="text-center relative z-10">
									<div class="relative mb-3">
										<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500 shadow-xl">
											<svelte:component this={study.icon} class="w-8 h-8 text-white" />
										</div>
									</div>
									<div class="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
										{($locale || 'en') === 'ar' ? 'دراسة حالة' : 'Case Study'}
									</div>
								</div>
							</div>
						{/if}
						
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-amber-600/20 to-emerald-600/20 group-hover:from-emerald-600/30 group-hover:via-amber-600/30 group-hover:to-emerald-600/30 transition-all duration-500"></div>
						
						<!-- Case Study Badge -->
						<div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">
							{($locale || 'en') === 'ar' ? 'دراسة حالة' : 'Case Study'}
						</div>
					</div>
					
					<!-- Enhanced Content -->
					<div class="p-6 relative">
						<!-- Background Gradient -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 group-hover:from-emerald-500/10 group-hover:to-amber-500/10 transition-all duration-500"></div>
						
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight relative z-10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? study.title : study.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed relative z-10">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<!-- Enhanced Meta Information -->
						<div class="space-y-3 text-sm relative z-10">
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<MapPin class="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.location : study.locationEn}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<Clock class="w-3 h-3 text-amber-600 dark:text-amber-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.duration : study.durationEn}</span>
							</div>
							<div class="flex items-center text-slate-500 dark:text-slate-400 group/item">
								<div class="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 group-hover/item:scale-110 transition-transform duration-300">
									<Users class="w-3 h-3 text-blue-600 dark:text-blue-400" />
								</div>
								<span>{($locale || 'en') === 'ar' ? study.team : study.teamEn}</span>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section with Image -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-amber-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			
			<!-- Content Side -->
			<div>
				<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">
					{($locale || 'en') === 'ar' ? 'فوائد خدماتنا' : 'Benefits of Our Services'}
				</h2>
				<p class="text-lg text-slate-600 dark:text-slate-300 mb-8">
					{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدماتنا المتخصصة أن تضيف قيمة لمشروعك' : 'Discover how our specialized services can add value to your project'}
				</p>
				
				<div class="space-y-4">
					{#each pageContent.benefits as benefit, index}
						<div class="flex items-start gap-4 animate-fade-in-left-bounce" style="animation-delay: {index * 100}ms;">
							<div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full flex items-center justify-center mt-1 shadow-lg">
								<CheckCircle class="w-5 h-5 text-white" />
							</div>
							<p class="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
								{benefit}
							</p>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Enhanced Visual Side with Real Image -->
			<div class="relative animate-fade-in-right-bounce" style="animation-delay: 400ms;">
				<div class="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
					{#if !imageErrors.excellence}
						<img 
							src={imagePaths.benefits.excellence} 
							alt="Excellence in Service"
							class="w-full h-full object-cover"
							loading="lazy"
							on:error={() => handleImageError('excellence')}
						/>
					{/if}
					
					<!-- Fallback with enhanced styling -->
					{#if imageErrors.excellence}
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-amber-50 to-emerald-200 dark:from-emerald-900/30 dark:via-amber-900/20 dark:to-emerald-800/30 flex items-center justify-center">
							<!-- Background Pattern -->
							<div class="absolute inset-0 opacity-10">
								<svg width="100%" height="100%" viewBox="0 0 100 100">
									<pattern id="service-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
										<circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
									</pattern>
									<rect width="100%" height="100%" fill="url(#service-pattern)" />
								</svg>
							</div>
							
							<div class="text-center relative z-10">
								<div class="relative mb-6">
									<div class="text-8xl">🛣️</div>
									<!-- Enhanced Glow Effect -->
									<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
								</div>
								<div class="text-emerald-600 dark:text-emerald-400 font-black text-xl">
									{($locale || 'en') === 'ar' ? 'خدمة متميزة' : 'Excellence in Service'}
								</div>
							</div>
						</div>
					{/if}
					
					<!-- Image Overlay -->
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-amber-600/20 to-emerald-600/20"></div>
					
					<!-- Excellence Badge -->
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
							<div class="text-emerald-600 font-black text-xl">
								{($locale || 'en') === 'ar' ? 'خدمة متميزة' : 'Excellence in Service'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Why Choose Us Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'لماذا تختار خدماتنا للوصول للموقع؟' : 'Why Choose Our Site Access Services?'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم حلولاً شاملة ومبتكرة لضمان نجاح مشروعك في الحصول على الموافقات المطلوبة'
					: 'We provide comprehensive and innovative solutions to ensure your project success in obtaining required approvals'
				}
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<!-- Content Side -->
			<div>
				<div class="space-y-8">
					<div class="flex items-start gap-6">
						<div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
							<Award class="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3">
								{($locale || 'en') === 'ar' ? 'خبرة متخصصة' : 'Expert Expertise'}
							</h3>
							<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
								{($locale || 'en') === 'ar'
									? 'فريقنا من المهندسين المتخصصين لديه خبرة واسعة في تصميم الوصول للمواقع في المملكة المتحدة وأستراليا ودولياً'
									: 'Our team of specialist engineers has extensive experience in site access design across the UK, Australia, and internationally'
								}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-6">
						<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
							<ShieldCheck class="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3">
								{($locale || 'en') === 'ar' ? 'امتثال كامل للمعايير' : 'Full Standards Compliance'}
							</h3>
							<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
								{($locale || 'en') === 'ar'
									? 'نضمن أن جميع تصميماتنا تلبي أحدث معايير الطرق السريعة والمتطلبات التنظيمية المحلية'
									: 'We ensure all our designs meet the latest highway standards and local regulatory requirements'
								}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-6">
						<div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
							<Zap class="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3">
								{($locale || 'en') === 'ar' ? 'حلول مبتكرة' : 'Innovative Solutions'}
							</h3>
							<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
								{($locale || 'en') === 'ar'
									? 'نستخدم أحدث التقنيات والأساليب لتطوير حلول إبداعية للتحديات المعقدة في الوصول للمواقع'
									: 'We use the latest technologies and methods to develop creative solutions for complex site access challenges'
								}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Enhanced Visual Side -->
			<div class="relative">
				<div class="aspect-square bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
					<!-- Background Pattern -->
					<div class="absolute inset-0 opacity-10">
						<svg width="100%" height="100%" viewBox="0 0 100 100">
							<pattern id="access-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
								<path d="M 0 20 L 20 0 M 0 0 L 20 20" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
							</pattern>
							<rect width="100%" height="100%" fill="url(#access-pattern)" />
						</svg>
					</div>
					
					<div class="text-center relative z-10">
						<div class="relative mb-6">
							<div class="text-8xl">🛣️</div>
							<!-- Enhanced Glow Effect -->
							<div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
						</div>
						<div class="text-emerald-600 dark:text-emerald-400 font-black text-xl">
							{($locale || 'en') === 'ar' ? 'تصميم متقدم للوصول' : 'Advanced Access Design'}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Client Testimonial Section -->
<section class="py-24 bg-emerald-600 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
			<div class="text-6xl mb-8">💬</div>
			<blockquote class="text-xl lg:text-2xl text-white mb-8 leading-relaxed font-medium">
				{($locale || 'en') === 'ar'
					? '"خدمة ممتازة ومهنية جداً قدمتها آين كونسلتنغ لدعم اعتراضنا على الخطة المحلية. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً."'
					: '"Excellent and very professional service provided by Ayen Consulting to support our Local Plan objection. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">Andrew Guttridge</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'مجلس أبرشية بيلدستون، سافولك، المملكة المتحدة' : 'Bildeston Parish Council, Suffolk, UK'}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fadeInUpBounce {
		0% { opacity: 0; transform: translateY(30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateY(-5px) scale(1.02); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes fadeInLeftBounce {
		0% { opacity: 0; transform: translateX(-30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateX(5px) scale(1.02); }
		100% { opacity: 1; transform: translateX(0) scale(1); }
	}

	@keyframes fadeInRightBounce {
		0% { opacity: 0; transform: translateX(30px) scale(0.9); }
		60% { opacity: 0.8; transform: translateX(-5px) scale(1.02); }
		100% { opacity: 1; transform: translateX(0) scale(1); }
	}

	@keyframes floatSlow {
		0%, 100% { transform: translateY(0px) scale(1); }
		50% { transform: translateY(-30px) scale(1.05); }
	}

	@keyframes floatReverse {
		0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
		50% { transform: translateY(25px) scale(0.95) rotate(180deg); }
	}

	@keyframes pulseSubtle {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.02); }
	}

	@keyframes lightRay {
		0%, 100% { opacity: 0.2; transform: scaleY(1); }
		50% { opacity: 0.5; transform: scaleY(1.2); }
	}

	@keyframes lightRayReverse {
		0%, 100% { opacity: 0.3; transform: scaleY(1) rotate(-12deg); }
		50% { opacity: 0.6; transform: scaleY(1.3) rotate(-12deg); }
	}

	.animate-fade-in-up-bounce { animation: fadeInUpBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-left-bounce { animation: fadeInLeftBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-right-bounce { animation: fadeInRightBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-float-slow { animation: floatSlow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: floatReverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulseSubtle 4s ease-in-out infinite; }
	.animate-light-ray { animation: lightRay 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: lightRayReverse 10s ease-in-out infinite; }
</style>