<!-- src/routes/transport-planning/technical-rebuttals/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { 
		ArrowRight, 
		CheckCircle, 
		MapPin, 
		Clock, 
		Users, 
		Shield,
		FileCheck,
		Search,
		AlertTriangle,
		Award,
		Zap,
		Target,
		Activity,
		BookOpen,
		Scale,
		FileText,
		MessageSquare,
		TrendingUp,
		Database,
		CheckSquare,
		Building,
		Factory,
		Home,
		Hospital,
		Globe,
		BarChart3
	} from 'lucide-svelte';
	import { APP_CONFIG } from '$lib/config/app.js';

	let mounted = $state(false);
	let visibleSections = $state(new Set());
	let mousePosition = $state({ x: 0, y: 0 });
	let particles = $state([]);

	onMount(() => {
		mounted = true;
		
		// Generate particles for background animation
		particles = Array.from({ length: 45 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
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
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			observer.disconnect();
		};
	});

	const features = [
		{
			icon: Shield,
			title: 'المراجعة التقنية المتخصصة',
			titleEn: 'Expert Technical Review',
			description: 'مراجعة شاملة للتعليقات والملاحظات التقنية من قبل خبراء متخصصين في مجال هندسة النقل مع تحليل عميق للقضايا المطروحة',
			descriptionEn: 'Comprehensive review of technical comments and observations by specialized transport engineering experts with deep analysis of raised issues',
			color: 'from-blue-500 to-emerald-600',
			image: '/images/features/technical-review.jpg'
		},
		{
			icon: FileCheck,
			title: 'إعداد الردود المدعومة بالأدلة',
			titleEn: 'Evidence-Based Response Preparation',
			description: 'إعداد ردود تقنية مفصلة ومدعومة بالأدلة العلمية والمعايير الهندسية المعتمدة مع تحليل قوي ودقيق للبيانات',
			descriptionEn: 'Preparation of detailed technical responses supported by scientific evidence and approved engineering standards with robust and accurate data analysis',
			color: 'from-emerald-500 to-blue-600',
			image: '/images/features/evidence-response.jpg'
		},
		{
			icon: Search,
			title: 'التحقق من الامتثال للمعايير',
			titleEn: 'Standards Compliance Verification',
			description: 'التأكد من مطابقة التصاميم والحلول المقترحة للمعايير والمواصفات المحلية والدولية مع توثيق شامل للامتثال',
			descriptionEn: 'Ensuring proposed designs and solutions comply with local and international standards and specifications with comprehensive compliance documentation',
			color: 'from-purple-500 to-emerald-600',
			image: '/images/features/compliance-verification.jpg'
		},
		{
			icon: Database,
			title: 'تحليل البيانات القوية',
			titleEn: 'Robust Data Analysis',
			description: 'جمع وتحليل البيانات الدقيقة لدعم الردود التقنية بما في ذلك تحليل مواقف الشوارع والدراسات المرورية المتخصصة',
			descriptionEn: 'Collection and analysis of accurate data to support technical responses including on-street parking analysis and specialized traffic studies',
			color: 'from-amber-500 to-blue-600',
			image: '/images/features/data-analysis.jpg'
		},
		{
			icon: MessageSquare,
			title: 'تنسيق مراجعة الأقران',
			titleEn: 'Peer Review Coordination',
			description: 'تنسيق عمليات مراجعة الأقران والتعامل مع التعليقات من الخبراء والمراجعين المستقلين مع ضمان جودة المخرجات',
			descriptionEn: 'Coordinating peer review processes and addressing comments from experts and independent reviewers while ensuring output quality',
			color: 'from-teal-500 to-purple-600',
			image: '/images/features/peer-review.jpg'
		},
		{
			icon: Award,
			title: 'الخبرة العالمية المتقدمة',
			titleEn: 'Advanced Global Expertise',
			description: 'الاستفادة من خبرة واسعة في التعامل مع أعقد التحديات التقنية والتنظيمية مع سيناريوهات من مشاريع عالمية ناجحة',
			descriptionEn: 'Leveraging extensive experience in handling the most complex technical and regulatory challenges with scenarios from successful global projects',
			color: 'from-indigo-500 to-emerald-600',
			image: '/images/features/global-expertise.jpg'
		}
	];

	const challenges = [
		{
			title: 'التحديات الشائعة في المشاريع',
			titleEn: 'Common Project Challenges',
			description: 'المواقف التي تتطلب ردود تقنية متخصصة',
			descriptionEn: 'Situations requiring specialized technical responses',
			items: [
				'عدم دعم سلطة الطرق السريعة للمشروع',
				'نقص الأدلة الجوهرية أو التحليل القوي',
				'المشاريع في مواقع حساسة ومعقدة',
				'الحاجة لطمأنة السلطات بالبيانات الصحيحة'
			],
			itemsEn: [
				'Lack of highway authority support for project',
				'Insufficient substantive evidence or robust analysis',
				'Projects in sensitive and complex locations',
				'Need to reassure authorities with correct data'
			],
			icon: AlertTriangle,
			color: 'from-amber-500 to-red-500'
		},
		{
			title: 'الحلول المتخصصة',
			titleEn: 'Specialized Solutions',
			description: 'كيف نواجه هذه التحديات بفعالية',
			descriptionEn: 'How we effectively address these challenges',
			items: [
				'تقديم معلومات قوية ومبررات مدعومة',
				'تحليل مواقف الشوارع والدراسات المرورية',
				'استخدام سيناريوهات من مشاريع عالمية ناجحة',
				'بيانات دقيقة وقوية لدعم القرارات'
			],
			itemsEn: [
				'Providing robust information and supported justifications',
				'On-street parking analysis and traffic studies',
				'Using scenarios from successful global projects',
				'Accurate and strong data to support decisions'
			],
			icon: CheckSquare,
			color: 'from-emerald-500 to-blue-500'
		}
	];

	const benefits = [
		{
			title: 'الحفاظ على المصداقية المهنية',
			titleEn: 'Maintaining Professional Credibility',
			description: 'نحافظ على مصداقيتك المهنية والتقنية من خلال تقديم ردود مدروسة ومدعومة بالأدلة العلمية والخبرة العملية الواسعة',
			descriptionEn: 'We maintain your professional and technical credibility through well-considered responses supported by scientific evidence and extensive practical experience',
			image: '/images/benefits/professional-credibility.jpg',
			icon: Award,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			title: 'تقليل المخاطر وضمان الامتثال',
			titleEn: 'Risk Reduction & Compliance Assurance',
			description: 'نقلل المخاطر القانونية والتقنية ونضمن الامتثال للمتطلبات التنظيمية مع تجنب التأخير في الموافقات والحصول على دعم السلطات',
			descriptionEn: 'We reduce legal and technical risks and ensure regulatory compliance while avoiding approval delays and gaining authority support',
			image: '/images/benefits/risk-reduction.jpg',
			icon: Shield,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			title: 'دعم متخصص للمشاريع المعقدة',
			titleEn: 'Specialized Support for Complex Projects',
			description: 'نوفر دعماً متخصصاً للمشاريع المعقدة والحساسة مع توفير الوقت والجهد للفرق الداخلية وتعزيز الثقة مع الجهات التنظيمية',
			descriptionEn: 'We provide specialized support for complex and sensitive projects while saving time and effort for internal teams and building confidence with regulatory authorities',
			image: '/images/benefits/specialized-support.jpg',
			icon: Target,
			color: 'from-purple-500 to-emerald-600'
		}
	];

	const serviceTypes = [
		{
			title: 'ردود على تعليقات سلطة الطرق',
			titleEn: 'Highway Authority Comment Responses',
			description: 'ردود متخصصة على تعليقات ومخاوف سلطات الطرق السريعة',
			descriptionEn: 'Specialized responses to highway authority comments and concerns',
			icon: Building,
			scope: [
				'تحليل التعليقات التقنية المفصلة',
				'إعداد ردود مدعومة بالمعايير',
				'تقديم حلول بديلة مبتكرة',
				'التفاوض مع السلطات المختصة'
			],
			scopeEn: [
				'Detailed technical comment analysis',
				'Standards-supported response preparation',
				'Innovative alternative solutions',
				'Negotiations with relevant authorities'
			]
		},
		{
			title: 'ردود مراجعة الأقران',
			titleEn: 'Peer Review Responses',
			description: 'التعامل مع تعليقات المراجعين المستقلين والخبراء',
			descriptionEn: 'Addressing independent reviewer and expert comments',
			icon: Users,
			scope: [
				'مراجعة تعليقات الخبراء المستقلين',
				'تقييم صحة الملاحظات المطروحة',
				'إعداد ردود تقنية مفصلة',
				'توثيق الاستجابة للمراجعات'
			],
			scopeEn: [
				'Independent expert comment review',
				'Assessment of raised observation validity',
				'Detailed technical response preparation',
				'Review response documentation'
			]
		},
		{
			title: 'ردود الاعتراضات التخطيطية',
			titleEn: 'Planning Objection Responses',
			description: 'دعم الردود على الاعتراضات في العملية التخطيطية',
			descriptionEn: 'Supporting responses to objections in the planning process',
			icon: FileText,
			scope: [
				'تحليل أسباب الاعتراضات',
				'إعداد ردود قانونية وتقنية',
				'جمع أدلة داعمة إضافية',
				'تقديم استراتيجيات بديلة'
			],
			scopeEn: [
				'Objection reason analysis',
				'Legal and technical response preparation',
				'Additional supporting evidence collection',
				'Alternative strategy presentation'
			]
		}
	];

	const caseStudies = [
		{
			title: 'رد على اعتراضات الخطة المحلية - مجلس المنطقة',
			titleEn: 'Local Plan Objection Response - Regional Council',
			description: 'إعداد رد شامل على اعتراضات الخطة المحلية مع جمع بيانات فعال وتحليل قوي وعرض واضح في تقرير تقني شامل تم إنجازه في إطار زمني ضيق',
			descriptionEn: 'Comprehensive Local Plan objection response with efficient data collection, robust analysis, and clear presentation in comprehensive technical report completed within tight timescale',
			location: 'الرياض، المملكة العربية السعودية',
			locationEn: 'Riyadh, Saudi Arabia',
			duration: '6 أسابيع',
			durationEn: '6 weeks',
			team: '8 متخصصين',
			teamEn: '8 specialists',
			image: '/images/case-studies/local-plan-objection.jpg',
			icon: FileText,
			challenges: [
				'إطار زمني ضيق جداً',
				'تعقيد القضايا المطروحة',
				'الحاجة لأدلة قوية ومقنعة',
				'تنسيق مع جهات متعددة'
			],
			challengesEn: [
				'Very tight timeframe',
				'Complexity of raised issues',
				'Need for strong convincing evidence',
				'Coordination with multiple parties'
			],
			outcomes: [
				'رد تقني شامل ومقبول',
				'جمع بيانات فعال ومنظم',
				'تحليل قوي للقضايا المطروحة',
				'عرض واضح ومقنع للحلول'
			],
			outcomesEn: [
				'Comprehensive acceptable technical response',
				'Efficient organized data collection',
				'Robust analysis of raised issues',
				'Clear convincing solution presentation'
			],
			stats: { objections: '25', timeline: '6 weeks', acceptance: '100%' }
		},
		{
			title: 'رد على مراجعة تصميم تقاطع رئيسي',
			titleEn: 'Major Junction Design Review Response',
			description: 'إعداد رد شامل على 35 تعليقاً تقنياً من الجهة المنظمة حول تصميم تقاطع رئيسي في منطقة حساسة مع حلول مبتكرة ومدعومة',
			descriptionEn: 'Comprehensive response to 35 technical comments from regulatory authority on major junction design in sensitive area with innovative supported solutions',
			location: 'جدة، المملكة العربية السعودية',
			locationEn: 'Jeddah, Saudi Arabia',
			duration: '8 أسابيع',
			durationEn: '8 weeks',
			team: '10 متخصصين',
			teamEn: '10 specialists',
			image: '/images/case-studies/junction-design-review.jpg',
			icon: Activity,
			challenges: [
				'35 تعليقاً تقنياً معقداً',
				'موقع حساس ومعقد',
				'متطلبات سلامة صارمة',
				'تكامل مع البنية الموجودة'
			],
			challengesEn: [
				'35 complex technical comments',
				'Sensitive complex location',
				'Strict safety requirements',
				'Integration with existing infrastructure'
			],
			outcomes: [
				'ردود تقنية شاملة لجميع النقاط',
				'حلول مبتكرة للتحديات المعقدة',
				'موافقة السلطات على التصميم',
				'تحسين كبير في مستوى السلامة'
			],
			outcomesEn: [
				'Comprehensive technical responses to all points',
				'Innovative solutions for complex challenges',
				'Authority approval of design',
				'Significant safety level improvement'
			],
			stats: { comments: '35', complexity: 'High', approval: 'Granted' }
		},
		{
			title: 'رد على تقييم الأثر المروري - مشروع تطوير',
			titleEn: 'Traffic Impact Assessment Response - Development Project',
			description: 'معالجة تعليقات مراجعة الأقران على دراسة تأثير مروري لتطوير مختلط كبير مع تقديم تحليل معزز وحلول متقدمة للقضايا المطروحة',
			descriptionEn: 'Addressing peer review comments on traffic impact study for major mixed development with enhanced analysis and advanced solutions for raised issues',
			location: 'الدمام، المملكة العربية السعودية',
			locationEn: 'Dammam, Saudi Arabia',
			duration: '10 أسابيع',
			durationEn: '10 weeks',
			team: '12 متخصص',
			teamEn: '12 specialists',
			image: '/images/case-studies/traffic-impact-response.jpg',
			icon: BarChart3,
			challenges: [
				'تعليقات مراجعة أقران متعددة',
				'تطوير مختلط معقد',
				'تحليل تأثير شامل مطلوب',
				'متطلبات بيئية واجتماعية'
			],
			challengesEn: [
				'Multiple peer review comments',
				'Complex mixed development',
				'Comprehensive impact analysis required',
				'Environmental and social requirements'
			],
			outcomes: [
				'تحليل معزز للتأثير المروري',
				'حلول متقدمة لإدارة المرور',
				'استراتيجيات تخفيف فعالة',
				'قبول كامل من المراجعين'
			],
			outcomesEn: [
				'Enhanced traffic impact analysis',
				'Advanced traffic management solutions',
				'Effective mitigation strategies',
				'Full acceptance from reviewers'
			],
			stats: { reviewers: '5', issues: '28', resolution: '100%' }
		}
	];

	const process = [
		{
			step: '01',
			title: 'تحليل التعليقات والقضايا',
			titleEn: 'Comment & Issue Analysis',
			description: 'مراجعة وتحليل شامل لجميع التعليقات والملاحظات التقنية الواردة مع تصنيفها حسب الأولوية والتعقيد',
			descriptionEn: 'Comprehensive review and analysis of all received technical comments and observations with priority and complexity classification',
			icon: Search,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			step: '02',
			title: 'إعداد الاستراتيجية والبحث',
			titleEn: 'Strategy Preparation & Research',
			description: 'تطوير استراتيجية الرد المناسبة مع جمع الأدلة والبيانات الداعمة وتحديد النقاط الرئيسية للمعالجة',
			descriptionEn: 'Developing appropriate response strategy with supporting evidence and data collection and key point identification for addressing',
			icon: Database,
			color: 'from-emerald-500 to-purple-600'
		},
		{
			step: '03',
			title: 'كتابة الردود التقنية',
			titleEn: 'Technical Response Writing',
			description: 'إعداد الردود التقنية المفصلة مع الإشارة للمعايير والمراجع المناسبة وتقديم الحلول المبتكرة',
			descriptionEn: 'Preparing detailed technical responses with reference to appropriate standards and references and providing innovative solutions',
			icon: FileCheck,
			color: 'from-purple-500 to-amber-600'
		},
		{
			step: '04',
			title: 'المراجعة والتسليم والمتابعة',
			titleEn: 'Review, Submission & Follow-up',
			description: 'مراجعة نهائية للردود وتسليمها ضمن المواعيد المحددة مع المتابعة والرد على أي استفسارات إضافية',
			descriptionEn: 'Final review of responses and submission within specified deadlines with follow-up and additional query responses',
			icon: CheckSquare,
			color: 'from-amber-500 to-emerald-600'
		}
	];

	const stats = [
		{
			value: '300+',
			label: 'رد تقني مكتمل',
			labelEn: 'Technical Responses Completed',
			icon: FileCheck,
			color: 'from-blue-500 to-emerald-600'
		},
		{
			value: '97%',
			label: 'معدل القبول',
			labelEn: 'Acceptance Rate',
			icon: CheckCircle,
			color: 'from-emerald-500 to-blue-600'
		},
		{
			value: '48',
			label: 'ساعة متوسط الاستجابة',
			labelEn: 'Hours Average Response Time',
			icon: Clock,
			color: 'from-purple-500 to-emerald-600'
		},
		{
			value: '100%',
			label: 'التسليم في الوقت المحدد',
			labelEn: 'On-Time Delivery',
			icon: Award,
			color: 'from-amber-500 to-blue-600'
		}
	];

	function isVisible(sectionId) {
		return visibleSections.has(sectionId);
	}

	function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
		if (!mounted || !mouseX || !mouseY) return '';
		return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
	}
</script>

<svelte:head>
	<title>{($locale || 'en') === 'ar' ? 'الردود التقنية' : 'Technical Rebuttals'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? 'تقديم معلومات قوية ومبررات للتصميم في مسائل تخطيط النقل' : 'Providing robust information and justification for the design in transport planning matters'}" />
</svelte:head>

<!-- Enhanced Hero Section with Increased Height -->
<section class="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
	
	<!-- Advanced Animated Background -->
	<div class="absolute inset-0">
		<!-- Gradient Orbs -->
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
		
		<!-- Technical Documentation SVG -->
		<svg class="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1200 800">
			<defs>
				<pattern id="rebuttalGrid" width="50" height="50" patternUnits="userSpaceOnUse">
					<circle cx="25" cy="25" r="1.5" fill="currentColor" opacity="0.4">
						<animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
					</circle>
					<path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
				</pattern>
				<linearGradient id="rebuttalWave" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6"/>
					<stop offset="50%" style="stop-color:#10b981;stop-opacity:0.8"/>
					<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.6"/>
				</linearGradient>
			</defs>
			
			<rect width="100%" height="100%" fill="url(#rebuttalGrid)" />
			
			<!-- Document Flow Lines -->
			<g class="document-flow" opacity="0.6">
				<path d="M100,200 L300,200 L300,350 L500,350 L500,500 L700,500" 
					  stroke="url(#rebuttalWave)" stroke-width="3" fill="none" class="rebuttal-flow-1"/>
				<path d="M200,150 L400,150 L400,300 L600,300 L600,450 L800,450" 
					  stroke="url(#rebuttalWave)" stroke-width="2" fill="none" class="rebuttal-flow-2"/>
				
				<!-- Document Nodes -->
				<circle cx="300" cy="200" r="6" fill="#3b82f6" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite"/>
				</circle>
				<circle cx="500" cy="350" r="6" fill="#10b981" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite"/>
				</circle>
				<circle cx="700" cy="500" r="6" fill="#f59e0b" opacity="0.8">
					<animate attributeName="r" values="4;8;4" dur="5s" repeatCount="indefinite"/>
				</circle>
			</g>
			
			<!-- Floating Evidence Icons -->
			<g class="evidence-icons" opacity="0.4">
				<rect x="150" y="300" width="8" height="10" rx="1" fill="#3b82f6">
					<animate attributeName="y" values="300;280;300" dur="6s" repeatCount="indefinite"/>
				</rect>
				<rect x="450" y="250" width="8" height="10" rx="1" fill="#10b981">
					<animate attributeName="y" values="250;230;250" dur="7s" repeatCount="indefinite"/>
				</rect>
				<rect x="750" y="350" width="8" height="10" rx="1" fill="#f59e0b">
					<animate attributeName="y" values="350;330;350" dur="8s" repeatCount="indefinite"/>
				</rect>
			</g>
		</svg>
		
		<!-- Floating Particles -->
		{#if mounted}
			<div class="absolute inset-0 pointer-events-none">
				{#each particles as particle}
					<div 
						class="absolute rounded-full bg-gradient-to-r from-blue-400 to-emerald-500 animate-float-particle"
						style="
							left: {particle.x}%;
							top: {particle.y}%;
							width: {particle.size}px;
							height: {particle.size}px;
							opacity: {particle.opacity};
							animation-duration: {particle.speed * 4}s;
							{getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Dynamic Light Rays -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
			<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center">
			
			<!-- Enhanced Badge -->
			<div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-100/80 to-emerald-100/80 dark:from-blue-900/30 dark:to-emerald-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
				<Shield class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
				<span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">📋</span>
				{($locale || 'en') === 'ar' ? 'تقديم معلومات قوية ومبررات للتصميم' : 'Providing Robust Information and Justification for the Design'}
			</div>
			
			<!-- Enhanced Title with Better Spacing -->
			<div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} mb-12`}>
				<h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
					<span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
						{($locale || 'en') === 'ar' ? 'الردود التقنية' : 'Technical Rebuttals'}
					</span>
				</h1>
				<div class="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 dark:text-slate-300 animate-fade-in-delayed">
					{($locale || 'en') === 'ar' ? 'لتخطيط النقل' : 'for Transport Planning'}
				</div>
			</div>
			
			<!-- Enhanced Description with Better Spacing -->
			<div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} space-y-6`}>
				<p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'قد يكون من الصعب بدء مشروع غير مدعوم من سلطة الطرق السريعة دون أدلة جوهرية أو تحليل قوي لتعزيز التصميم'
						: 'It can be challenging to initiate a scheme that is not supported by the highway authority without substantive evidence or robust analysis to reinforce the design'
					}
				</p>
				<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' 
						? 'نعتقد أنه من الممارسات الجيدة تقديم معلومات قوية عند تقديم الوثائق، ولكن إذا كان المشروع في موقف حساس ومعقد، فإن ضمان وجود البيانات الصحيحة لطمأنة قرار سلطات الطرق السريعة أمر أساسي'
						: 'We believe it is good practice to provide robust information when providing documentation, however, should the project be sited in a sensitive, complex situation, then ensuring you have the correct data to reassure the highway authorities decision is key'
					}
				</p>
				<p class="text-lg text-emerald-600 dark:text-emerald-400 leading-relaxed max-w-3xl mx-auto font-semibold">
					{($locale || 'en') === 'ar' 
						? 'نقدم مبررات ومنطق لمسائل تخطيط النقل معززة بسيناريوهات من مشاريع عالمية سابقة وبيانات دقيقة وقوية'
						: 'We provide justification and reasoning for transport planning matters reinforced with scenarios experienced on past worldwide projects and strong accurate data'
					}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Challenge & Solution Section -->
<section class="py-24 bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/5 to-red-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16">
			{#each challenges as challenge, index}
				<div class={`${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					<div class="flex items-center gap-4 mb-6">
						<div class={`w-16 h-16 bg-gradient-to-br ${challenge.color} rounded-2xl flex items-center justify-center shadow-xl`}>
							<svelte:component this={challenge.icon} class="w-8 h-8 text-white" />
						</div>
						<h2 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? challenge.title : challenge.titleEn}
						</h2>
					</div>
					
					<p class="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? challenge.description : challenge.descriptionEn}
					</p>
					
					<div class="space-y-4">
						{#each (($locale || 'en') === 'ar' ? challenge.items : challenge.itemsEn) as item}
							<div class="flex items-start gap-4">
								<div class={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${challenge.color} rounded-full flex items-center justify-center mt-1`}>
									<svelte:component this={challenge.icon} class="w-5 h-5 text-white" />
								</div>
								<p class="text-slate-700 dark:text-slate-300 leading-relaxed">
									{item}
								</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Features Section -->
<section id="features" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	
	<!-- Advanced Background -->
	<div class="absolute inset-0">
		<div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'خدمات الردود التقنية المتخصصة' : 'Specialized Technical Rebuttal Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'نقدم ردوداً تقنية شاملة مدعومة بالخبرة العالمية والبيانات الدقيقة لضمان نجاح مشاريعك'
					: 'We provide comprehensive technical responses supported by global expertise and accurate data to ensure your project success'
				}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div class={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden ${isVisible('features') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
					
					<!-- Background Gradient -->
					<div class={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
					
					<!-- Feature Image -->
					<div class="h-48 overflow-hidden rounded-t-3xl relative">
						<img 
							src={feature.image} 
							alt={($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={feature.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-amber-600/20 group-hover:from-blue-600/30 group-hover:via-emerald-600/30 group-hover:to-amber-600/30 transition-all duration-500"></div>
					</div>
					
					<div class="relative z-10 p-8">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? feature.title : feature.titleEn}
						</h3>
						
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? feature.description : feature.descriptionEn}
						</p>
					</div>
					
					<!-- Bottom Accent -->
					<div class={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Service Types Section -->
<section class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'أنواع الردود التقنية' : 'Types of Technical Rebuttals'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نغطي جميع أنواع الردود التقنية المطلوبة في مشاريع النقل' : 'We cover all types of technical rebuttals required in transport projects'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each serviceTypes as service, index}
				<div class={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<div class="flex items-center gap-4 mb-6">
						<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
							<svelte:component this={service.icon} class="w-8 h-8 text-white" />
						</div>
						<h3 class="text-xl font-black text-slate-900 dark:text-white">
							{($locale || 'en') === 'ar' ? service.title : service.titleEn}
						</h3>
					</div>
					
					<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						{($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
					</p>
					
					<ul class="space-y-3">
						{#each (($locale || 'en') === 'ar' ? service.scope : service.scopeEn) as item}
							<li class="flex items-start gap-3">
								<CheckCircle class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
								<span class="text-slate-600 dark:text-slate-300">{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Process Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'منهجية إعداد الردود التقنية' : 'Technical Response Preparation Methodology'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'نتبع منهجية منظمة ومجربة لضمان جودة وفعالية ردودنا التقنية' : 'We follow an organized proven methodology to ensure quality and effectiveness of our technical responses'}
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each process as step, index}
				<div class={`relative ${mounted ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.15}s;">
					
					<!-- Step Number -->
					<div class="text-center mb-6">
						<div class={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl shadow-xl text-white font-black text-2xl mb-4`}>
							{step.step}
						</div>
						<div class={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto shadow-lg`}>
							<svelte:component this={step.icon} class="w-6 h-6 text-white" />
						</div>
					</div>
					
					<div class="text-center">
						<h3 class="text-lg font-black text-slate-900 dark:text-white mb-3">
							{($locale || 'en') === 'ar' ? step.title : step.titleEn}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
							{($locale || 'en') === 'ar' ? step.description : step.descriptionEn}
						</p>
					</div>
					
					<!-- Connecting Line (except last item) -->
					{#if index < process.length - 1}
						<div class="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-500 opacity-30 transform translate-x-4"></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="py-24 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 relative overflow-hidden">
	<!-- Advanced Background Effects -->
	<div class="absolute inset-0">
		<div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
		<div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
			{#each stats as stat, index}
				<div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					<div class={`relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:scale-110 transition-transform duration-300`}>
						<svelte:component this={stat.icon} class="relative z-10 w-10 h-10 text-white drop-shadow-lg" />
						<div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
						<div class={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
					</div>
					<div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
						{stat.value}
					</div>
					<div class="text-blue-100 font-bold">
						{($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Benefits Section -->
<section id="benefits" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-emerald-500/10 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'فوائد خدمات الردود التقنية' : 'Benefits of Technical Rebuttal Services'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar' ? 'اكتشف كيف يمكن لخدماتنا في الردود التقنية أن تعزز من نجاح مشروعك' : 'Discover how our technical rebuttal services can enhance your project success'}
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each benefits as benefit, index}
				<div class={`group bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('benefits') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
					
					<!-- Benefit Image -->
					<div class="h-48 overflow-hidden relative">
						<img 
							src={benefit.image} 
							alt={($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 dark:from-emerald-900/30 dark:via-blue-900/20 dark:to-emerald-800/30 flex items-center justify-center" style="display: none;">
							<div class={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-xl`}>
								<svelte:component this={benefit.icon} class="w-8 h-8 text-white" />
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-blue-600/20"></div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
							{($locale || 'en') === 'ar' ? benefit.title : benefit.titleEn}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 leading-relaxed">
							{($locale || 'en') === 'ar' ? benefit.description : benefit.descriptionEn}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enhanced Case Studies Section -->
<section id="case-studies" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
				{($locale || 'en') === 'ar' ? 'دراسات حالة ناجحة للردود التقنية' : 'Successful Technical Rebuttal Case Studies'}
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				{($locale || 'en') === 'ar'
					? 'أمثلة على ردودنا التقنية الناجحة التي ساعدت في تحقيق أهداف المشاريع'
					: 'Examples of our successful technical rebuttals that helped achieve project objectives'
				}
			</p>
		</div>

		<div class="space-y-16">
			{#each caseStudies as study, index}
				<div class={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''} ${isVisible('case-studies') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.3}s;">
					
					<!-- Case Study Image -->
					<div class={`relative rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
						<img 
							src={study.image} 
							alt={($locale || 'en') === 'ar' ? study.title : study.titleEn}
							class="w-full h-80 lg:h-96 object-cover"
							loading="lazy"
							on:error={(e) => {
								e.target.style.display = 'none';
								e.target.nextElementSibling.style.display = 'flex';
							}}
						/>
						<!-- Fallback -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-blue-200 dark:from-blue-900/30 dark:via-emerald-900/20 dark:to-blue-800/30 flex items-center justify-center" style="display: none;">
							<div class="text-center">
								<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
									<svelte:component this={study.icon} class="w-10 h-10 text-white" />
								</div>
								<div class="text-blue-600 dark:text-blue-400 font-bold text-xl">
									{($locale || 'en') === 'ar' ? 'دراسة حالة متميزة' : 'Featured Case Study'}
								</div>
							</div>
						</div>
						<!-- Image Overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-purple-600/20"></div>
						
						<!-- Project Stats Overlay -->
						<div class="absolute bottom-4 left-4 right-4">
							<div class="bg-white/90 backdrop-blur-sm rounded-xl p-4">
								<div class="flex justify-between text-sm">
									{#each Object.entries(study.stats) as [key, value]}
										<div class="text-center">
											<div class="font-black text-blue-600">{value}</div>
											<div class="text-slate-600 capitalize">{key}</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
					
					<!-- Case Study Content -->
					<div class={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
								<svelte:component this={study.icon} class="w-6 h-6 text-white" />
							</div>
							<h3 class="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
								{($locale || 'en') === 'ar' ? study.title : study.titleEn}
							</h3>
						</div>
						
						<p class="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
							{($locale || 'en') === 'ar' ? study.description : study.descriptionEn}
						</p>
						
						<!-- Project Details -->
						<div class="grid grid-cols-3 gap-4 mb-8">
							<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
								<MapPin class="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.location : study.locationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
								<Clock class="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.duration : study.durationEn}
								</div>
							</div>
							<div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
								<Users class="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
								<div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
									{($locale || 'en') === 'ar' ? 'الفريق' : 'Team'}
								</div>
								<div class="text-xs font-black text-slate-700 dark:text-slate-300">
									{($locale || 'en') === 'ar' ? study.team : study.teamEn}
								</div>
							</div>
						</div>
						
						<!-- Challenges and Outcomes -->
						<div class="grid md:grid-cols-2 gap-6">
							<div>
								<h4 class="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
									<AlertTriangle class="w-5 h-5 text-amber-500" />
									{($locale || 'en') === 'ar' ? 'التحديات' : 'Challenges'}
								</h4>
								<ul class="space-y-2">
									{#each (($locale || 'en') === 'ar' ? study.challenges : study.challengesEn) as challenge}
										<li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
											<div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
											{challenge}
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<h4 class="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
									<CheckCircle class="w-5 h-5 text-emerald-500" />
									{($locale || 'en') === 'ar' ? 'النتائج' : 'Outcomes'}
								</h4>
								<ul class="space-y-2">
									{#each (($locale || 'en') === 'ar' ? study.outcomes : study.outcomesEn) as outcome}
										<li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
											<CheckCircle class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
											{outcome}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Client Testimonial Section -->
<section class="py-24 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
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
					? '"خدمة ممتازة ومهنية جداً قدمتها شركتنا لدعم اعتراضنا على الخطة المحلية. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً."'
					: '"Excellent and very professional service provided by our company to support our Local Plan objection. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale."'
				}
			</blockquote>
			<div class="text-emerald-100">
				<div class="font-bold text-lg">أحمد الغامدي</div>
				<div class="text-emerald-200">
					{($locale || 'en') === 'ar' ? 'مجلس منطقة الرياض، المملكة العربية السعودية' : 'Riyadh Regional Council, Saudi Arabia'}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
			{($locale || 'en') === 'ar' ? 'هل تحتاج إلى رد تقني متخصص؟' : 'Need a Specialized Technical Rebuttal?'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
			{($locale || 'en') === 'ar'
				? 'دعنا نساعدك في إعداد ردود تقنية قوية ومدعومة بالأدلة لضمان نجاح مشروعك وحصولك على الموافقات المطلوبة'
				: 'Let us help you prepare strong evidence-supported technical rebuttals to ensure your project success and obtain required approvals'
			}
		</p>
		<div class="flex flex-col sm:flex-row gap-6 justify-center">
			<a 
				href="/contact" 
				class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'ابدأ رد تقني' : 'Start Technical Rebuttal'}
				<ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
			</a>
			<a 
				href="/transport-planning" 
				class="inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				{($locale || 'en') === 'ar' ? 'استكشف خدمات أخرى' : 'Explore Other Services'}
			</a>
		</div>
	</div>
</section>

<style>
	/* Same enhanced animations and styles as previous pages */
	
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

	@keyframes scale-in-advanced {
		0% {
			opacity: 0;
			transform: scale(0.7);
		}
		100% {
			opacity: 1;
			transform: scale(1);
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

	@keyframes count-up-advanced {
		0% { 
			opacity: 0; 
			transform: translateY(20px) scale(0.8); 
		}
		100% { 
			opacity: 1; 
			transform: translateY(0) scale(1); 
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

	/* Technical rebuttal specific animations */
	.rebuttal-flow-1 {
		stroke-dasharray: 15 10;
		animation: rebuttal-flow 6s linear infinite;
	}
	
	.rebuttal-flow-2 {
		stroke-dasharray: 10 8;
		animation: rebuttal-flow 8s linear infinite reverse;
	}
	
	@keyframes rebuttal-flow {
		0% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -100; }
	}
	
	/* Animation Classes */
	.animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
	.animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.6s ease-out forwards; }
	.animate-scale-in-advanced { animation: scale-in-advanced 0.6s ease-out forwards; }
	.animate-gradient-flow { 
		background-size: 200% 200%;
		animation: gradient-flow 6s ease infinite;
	}
	.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
	.animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
	.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
	.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
	.animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
	.animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }
	.animate-count-up-advanced { animation: count-up-advanced 1s ease-out; }
	.animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out; }

	/* Utility Classes */
	.bg-300\% {
		background-size: 300% 300%;
	}

	.shadow-3xl {
		box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
	}

	/* GPU Acceleration */
	.animate-float-slow,
	.animate-float-reverse,
	.animate-pulse-subtle,
	.animate-gradient-flow {
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
			font-size: 2.25rem !important;
			line-height: 1.1;
		}
	}
</style>