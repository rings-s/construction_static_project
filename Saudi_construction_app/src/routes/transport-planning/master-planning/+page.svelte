<!-- src/routes/transport-planning/master-planning/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Map, Layers, Users, TrendingUp, Globe, Settings, Building, Zap } from 'lucide-svelte';
  
	const features = [
		{
			icon: Map,
			title: "التخطيط الاستراتيجي طويل المدى",
			titleEn: "Long-term Strategic Planning",
			description: "تطوير رؤية شاملة للنقل تمتد لعقود مع التكامل مع خطط التنمية الحضرية والإقليمية",
			descriptionEn: "Developing comprehensive transport vision spanning decades with integration to urban and regional development plans"
		},
		{
			icon: Layers,
			title: "تحليل الشبكة المتكاملة",
			titleEn: "Integrated Network Analysis",
			description: "تحليل وتحسين شبكات النقل المختلفة لضمان التكامل والكفاءة بين جميع وسائل النقل",
			descriptionEn: "Analysis and optimization of various transport networks ensuring integration and efficiency across all transport modes"
		},
		{
			icon: Users,
			title: "تخطيط متعدد الوسائط",
			titleEn: "Multi-Modal Planning",
			description: "تصميم أنظمة نقل متكاملة تشمل النقل العام والخاص والمشي وركوب الدراجات",
			descriptionEn: "Designing integrated transport systems including public and private transport, walking, and cycling"
		},
		{
			icon: TrendingUp,
			title: "نمذجة النمو المستقبلي",
			titleEn: "Future Growth Modeling",
			description: "توقع أنماط النمو السكاني والاقتصادي وتأثيرها على احتياجات النقل المستقبلية",
			descriptionEn: "Forecasting population and economic growth patterns and their impact on future transport needs"
		},
		{
			icon: Globe,
			title: "التخطيط المستدام",
			titleEn: "Sustainable Planning",
			description: "دمج مبادئ الاستدامة البيئية والاجتماعية والاقتصادية في جميع جوانب التخطيط",
			descriptionEn: "Integrating environmental, social, and economic sustainability principles in all planning aspects"
		},
		{
			icon: Settings,
			title: "تطوير السياسات",
			titleEn: "Policy Development",
			description: "إعداد السياسات والأنظمة اللازمة لتنفيذ الخطط الرئيسية بفعالية",
			descriptionEn: "Developing policies and regulations necessary for effective master plan implementation"
		},
		{
			icon: Building,
			title: "التكامل مع استخدامات الأراضي",
			titleEn: "Land Use Integration",
			description: "ربط تخطيط النقل مع تخطيط استخدامات الأراضي لضمان التنمية المتوازنة",
			descriptionEn: "Linking transport planning with land use planning to ensure balanced development"
		},
		{
			icon: Zap,
			title: "تحديد الأولويات",
			titleEn: "Priority Identification",
			description: "ترتيب المشاريع حسب الأولوية مع وضع جداول زمنية واقعية للتنفيذ",
			descriptionEn: "Prioritizing projects with realistic implementation timelines and phasing strategies"
		}
	];
  
	const benefits = [
		{
			text: "رؤية شاملة ومتكاملة لمستقبل النقل",
			textEn: "Comprehensive and integrated vision for transport future"
		},
		{
			text: "تحسين الكفاءة والفعالية لشبكة النقل",
			textEn: "Enhanced efficiency and effectiveness of transport network"
		},
		{
			text: "تنسيق أفضل بين مختلف أصحاب المصلحة",
			textEn: "Better coordination between different stakeholders"
		},
		{
			text: "استخدام أمثل للموارد المالية المتاحة",
			textEn: "Optimal utilization of available financial resources"
		},
		{
			text: "تقليل التأثير البيئي وتعزيز الاستدامة",
			textEn: "Reduced environmental impact and enhanced sustainability"
		},
		{
			text: "دعم النمو الاقتصادي والتنمية الحضرية",
			textEn: "Support for economic growth and urban development"
		},
		{
			text: "تحسين جودة الحياة للمواطنين",
			textEn: "Improved quality of life for citizens"
		},
		{
			text: "إطار عمل واضح لاتخاذ القرارات المستقبلية",
			textEn: "Clear framework for future decision-making"
		}
	];
  
	const process = [
		{
			title: "تحليل الوضع الحالي",
			titleEn: "Current Situation Analysis",
			description: "دراسة شاملة للوضع الحالي للنقل والبنية التحتية والتحديات القائمة",
			descriptionEn: "Comprehensive study of current transport situation, infrastructure, and existing challenges"
		},
		{
			title: "تطوير السيناريوهات",
			titleEn: "Scenario Development",
			description: "إعداد سيناريوهات مختلفة للنمو والتطوير مع تحليل تأثيراتها على النقل",
			descriptionEn: "Developing different growth and development scenarios with analysis of their transport impacts"
		},
		{
			title: "تصميم الخطة الرئيسية",
			titleEn: "Master Plan Design",
			description: "تطوير الخطة الرئيسية المتكاملة مع تحديد المشاريع والأولويات",
			descriptionEn: "Developing integrated master plan with project identification and prioritization"
		},
		{
			title: "استراتيجية التنفيذ",
			titleEn: "Implementation Strategy",
			description: "وضع استراتيجية التنفيذ مع الجداول الزمنية ومتطلبات التمويل",
			descriptionEn: "Developing implementation strategy with timelines and funding requirements"
		}
	];
  
	const caseStudies = [
		{
			title: "الخطة الرئيسية للنقل الحضري",
			titleEn: "Urban Transport Master Plan",
			description: "خطة رئيسية شاملة لمدينة يبلغ عدد سكانها 2 مليون نسمة تغطي 30 سنة مستقبلية",
			descriptionEn: "Comprehensive master plan for 2-million population city covering 30-year future horizon",
			location: "المدينة الكبرى",
			locationEn: "Major City",
			duration: "24 شهراً",
			durationEn: "24 months",
			team: "15 متخصصاً",
			teamEn: "15 specialists"
		},
		{
			title: "خطة النقل الإقليمية",
			titleEn: "Regional Transport Plan",
			description: "خطة نقل إقليمية تربط 5 مدن رئيسية مع شبكة نقل متكاملة متعددة الوسائط",
			descriptionEn: "Regional transport plan connecting 5 major cities with integrated multi-modal transport network",
			location: "المنطقة الوسطى",
			locationEn: "Central Region",
			duration: "30 شهراً",
			durationEn: "30 months",
			team: "20 متخصصاً",
			teamEn: "20 specialists"
		},
		{
			title: "خطة النقل المستدام",
			titleEn: "Sustainable Transport Plan",
			description: "خطة رئيسية تركز على النقل المستدام والأخضر مع تقليل الانبعاثات بنسبة 50%",
			descriptionEn: "Master plan focusing on sustainable and green transport with 50% emission reduction target",
			location: "المدينة الخضراء",
			locationEn: "Green City",
			duration: "18 شهراً",
			durationEn: "18 months",
			team: "12 متخصصاً",
			teamEn: "12 specialists"
		}
	];
  
	const stats = [
		{
			value: "45+",
			label: "خطة رئيسية مكتملة",
			labelEn: "Completed Master Plans"
		},
		{
			value: "15M+",
			label: "سكان مخدومون",
			labelEn: "Population Served"
		},
		{
			value: "50",
			label: "سنة خبرة جماعية",
			labelEn: "Years Collective Experience"
		},
		{
			value: "98%",
			label: "رضا العملاء",
			labelEn: "Client Satisfaction"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'التخطيط الرئيسي' : 'Master Planning'}
	subtitle={($locale || 'en') === 'ar' ? 'تطوير رؤية شاملة ومتكاملة لمستقبل النقل' : 'Developing comprehensive and integrated vision for transport future'}
	description={($locale || 'en') === 'ar' ? 'خدمات التخطيط الرئيسي المتخصصة لتطوير استراتيجيات نقل شاملة وطويلة المدى تدمج جميع وسائل النقل مع التنمية الحضرية والإقليمية لضمان مستقبل مستدام وفعال' : 'Specialized master planning services developing comprehensive long-term transport strategies integrating all transport modes with urban and regional development for a sustainable and efficient future'}
	icon="🗺️"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>