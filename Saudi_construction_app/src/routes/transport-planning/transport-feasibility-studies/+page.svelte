<!-- src/routes/transport-planning/transport-feasibility-studies/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { BarChart3, Calculator, Leaf, TrendingUp, Users, FileText, Target, DollarSign } from 'lucide-svelte';
  
	const features = [
		{
			icon: BarChart3,
			title: "التحليل الاقتصادي الشامل",
			titleEn: "Comprehensive Economic Analysis",
			description: "تقييم مفصل للجدوى الاقتصادية والمالية للمشاريع المرورية مع تحليل التكلفة والعائد",
			descriptionEn: "Detailed assessment of economic and financial viability of transport projects with cost-benefit analysis"
		},
		{
			icon: Calculator,
			title: "نمذجة الطلب المروري",
			titleEn: "Traffic Demand Modeling",
			description: "توقع وتحليل أنماط الحركة المستقبلية باستخدام أحدث تقنيات النمذجة المرورية",
			descriptionEn: "Forecasting and analyzing future traffic patterns using advanced traffic modeling techniques"
		},
		{
			icon: Leaf,
			title: "تقييم الأثر البيئي",
			titleEn: "Environmental Impact Assessment",
			description: "دراسة شاملة للتأثيرات البيئية والاجتماعية مع اقتراح تدابير التخفيف المناسبة",
			descriptionEn: "Comprehensive study of environmental and social impacts with appropriate mitigation measures"
		},
		{
			icon: TrendingUp,
			title: "تحليل المخاطر والحساسية",
			titleEn: "Risk and Sensitivity Analysis",
			description: "تحديد وتقييم المخاطر المحتملة مع تحليل الحساسية للمتغيرات الرئيسية",
			descriptionEn: "Identification and assessment of potential risks with sensitivity analysis of key variables"
		},
		{
			icon: Users,
			title: "مشاركة أصحاب المصلحة",
			titleEn: "Stakeholder Engagement",
			description: "تنسيق فعال مع جميع الأطراف المعنية لضمان قبول المجتمع ودعم المشروع",
			descriptionEn: "Effective coordination with all stakeholders to ensure community acceptance and project support"
		},
		{
			icon: FileText,
			title: "تحليل البدائل",
			titleEn: "Alternative Analysis",
			description: "مقارنة شاملة للبدائل المختلفة مع تقييم التكاليف والفوائد لكل خيار",
			descriptionEn: "Comprehensive comparison of different alternatives with cost-benefit evaluation for each option"
		},
		{
			icon: Target,
			title: "دراسة الجدوى التقنية",
			titleEn: "Technical Feasibility Study",
			description: "تقييم الجوانب التقنية والهندسية لضمان إمكانية التنفيذ والاستدامة",
			descriptionEn: "Assessment of technical and engineering aspects to ensure implementation feasibility and sustainability"
		},
		{
			icon: DollarSign,
			title: "تحليل مصادر التمويل",
			titleEn: "Funding Source Analysis",
			description: "تحديد وتقييم خيارات التمويل المختلفة مع هيكلة مالية مثلى للمشروع",
			descriptionEn: "Identification and evaluation of different funding options with optimal financial structuring"
		}
	];
  
	const benefits = [
		{
			text: "اتخاذ قرارات مدروسة ومبنية على أسس علمية",
			textEn: "Making informed decisions based on scientific foundations"
		},
		{
			text: "تقليل المخاطر وضمان استدامة المشروع",
			textEn: "Risk reduction and ensuring project sustainability"
		},
		{
			text: "تحسين الكفاءة في استخدام الموارد المالية",
			textEn: "Improved efficiency in financial resource utilization"
		},
		{
			text: "ضمان الامتثال للمعايير البيئية والتنظيمية",
			textEn: "Ensuring compliance with environmental and regulatory standards"
		},
		{
			text: "تعزيز قبول المجتمع ودعم أصحاب المصلحة",
			textEn: "Enhanced community acceptance and stakeholder support"
		},
		{
			text: "تحديد أفضل البدائل التقنية والاقتصادية",
			textEn: "Identification of optimal technical and economic alternatives"
		},
		{
			text: "توفير أساس قوي لطلبات التمويل",
			textEn: "Providing strong foundation for funding applications"
		},
		{
			text: "تحسين التخطيط طويل المدى للشبكة",
			textEn: "Enhanced long-term network planning"
		}
	];
  
	const process = [
		{
			title: "الدراسة الأولية",
			titleEn: "Preliminary Study",
			description: "تحديد نطاق المشروع وجمع البيانات الأساسية وتحليل الوضع الحالي",
			descriptionEn: "Define project scope, collect baseline data, and analyze current situation"
		},
		{
			title: "تحليل الطلب والعرض",
			titleEn: "Demand and Supply Analysis",
			description: "تحليل الطلب الحالي والمستقبلي مع تقييم القدرة الاستيعابية للبنية التحتية",
			descriptionEn: "Analyze current and future demand with infrastructure capacity assessment"
		},
		{
			title: "تطوير البدائل",
			titleEn: "Alternative Development",
			description: "تطوير وتصميم البدائل المختلفة مع التحليل التقني والاقتصادي لكل بديل",
			descriptionEn: "Develop and design different alternatives with technical and economic analysis"
		},
		{
			title: "التقييم والتوصيات",
			titleEn: "Evaluation and Recommendations",
			description: "مقارنة البدائل واختيار الأفضل مع وضع التوصيات وخطة التنفيذ",
			descriptionEn: "Compare alternatives, select the best option, and provide recommendations with implementation plan"
		}
	];
  
	const caseStudies = [
		{
			title: "دراسة جدوى نظام النقل السريع",
			titleEn: "Rapid Transit System Feasibility",
			description: "دراسة جدوى شاملة لنظام نقل سريع يخدم 500,000 راكب يومياً مع تحليل اقتصادي متعمق",
			descriptionEn: "Comprehensive feasibility study for rapid transit system serving 500,000 daily passengers with in-depth economic analysis",
			location: "المنطقة الحضرية الكبرى",
			locationEn: "Greater Metropolitan Area",
			duration: "18 شهراً",
			durationEn: "18 months",
			team: "12 متخصصاً",
			teamEn: "12 specialists"
		},
		{
			title: "جدوى طريق الربط الإقليمي",
			titleEn: "Regional Connector Highway Feasibility",
			description: "دراسة جدوى طريق سريع بطول 80 كم يربط بين مدينتين رئيسيتين مع تقييم الأثر الاقتصادي",
			descriptionEn: "Feasibility study for 80km highway connecting two major cities with economic impact assessment",
			location: "الطريق الإقليمي الشرقي",
			locationEn: "Eastern Regional Corridor",
			duration: "15 شهراً",
			durationEn: "15 months",
			team: "10 متخصصين",
			teamEn: "10 specialists"
		},
		{
			title: "جدوى مركز النقل المتعدد الوسائط",
			titleEn: "Multimodal Transport Hub Feasibility",
			description: "دراسة جدوى مركز نقل متكامل يجمع بين الحافلات والقطارات ومواقف السيارات",
			descriptionEn: "Feasibility study for integrated transport hub combining buses, trains, and parking facilities",
			location: "وسط المدينة",
			locationEn: "City Center",
			duration: "12 شهراً",
			durationEn: "12 months",
			team: "8 متخصصين",
			teamEn: "8 specialists"
		}
	];
  
	const stats = [
		{
			value: "85+",
			label: "دراسة جدوى مكتملة",
			labelEn: "Completed Feasibility Studies"
		},
		{
			value: "95%",
			label: "دقة التوقعات",
			labelEn: "Forecast Accuracy"
		},
		{
			value: "$2.5B",
			label: "قيمة المشاريع المدروسة",
			labelEn: "Value of Projects Studied"
		},
		{
			value: "100%",
			label: "معدل الموافقة",
			labelEn: "Approval Rate"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'دراسات الجدوى النقلية' : 'Transport Feasibility Studies'}
	subtitle={($locale || 'en') === 'ar' ? 'تقييم شامل للجدوى الاقتصادية والتقنية لمشاريع النقل' : 'Comprehensive assessment of economic and technical viability for transport projects'}
	description={($locale || 'en') === 'ar' ? 'خدمات دراسات الجدوى المتخصصة لمشاريع النقل لضمان اتخاذ قرارات مدروسة ومبنية على أسس علمية قوية مع تحليل شامل للجوانب الاقتصادية والتقنية والبيئية' : 'Specialized transport feasibility study services ensuring informed decision-making based on strong scientific foundations with comprehensive analysis of economic, technical, and environmental aspects'}
	icon="📊"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>