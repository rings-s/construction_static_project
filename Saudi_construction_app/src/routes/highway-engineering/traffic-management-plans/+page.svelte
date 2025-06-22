<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';

	const features = [
		{
			title: "Construction Zone Management",
			titleAr: "إدارة مناطق البناء",
			description: "Specialized traffic management for construction and maintenance work zones ensuring safety and minimal disruption.",
			descriptionAr: "إدارة مرور متخصصة لمناطق عمل البناء والصيانة مع ضمان السلامة والحد الأدنى من الاضطراب",
			image: '/images/features/construction-management.jpg'
		},
		{
			title: "Detailed Planning",
			titleAr: "التخطيط المفصل",
			description: "Comprehensive planning documents including traffic control devices, signage, and phasing strategies.",
			descriptionAr: "وثائق تخطيط شاملة تشمل أجهزة التحكم في المرور واللافتات واستراتيجيات التدرج",
			image: '/images/features/planning-documentation.jpg'
		},
		{
			title: "Traffic Flow Optimization",
			titleAr: "تحسين تدفق المرور",
			description: "Strategies to maintain optimal traffic flow while accommodating temporary restrictions and diversions.",
			descriptionAr: "استراتيجيات للحفاظ على التدفق المروري الأمثل مع استيعاب القيود المؤقتة والتحويلات",
			image: '/images/features/flow-optimization.jpg'
		},
		{
			title: "Safety Protocols",
			titleAr: "بروتوكولات السلامة",
			description: "Rigorous safety measures protecting both workers and road users throughout project duration.",
			descriptionAr: "تدابير السلامة الصارمة لحماية العمال ومستخدمي الطرق طوال مدة المشروع",
			image: '/images/features/safety-protocols.jpg'
		},
		{
			title: "Impact Assessment",
			titleAr: "تقييم التأثير",
			description: "Detailed analysis of traffic impacts and mitigation strategies for minimal disruption.",
			descriptionAr: "تحليل مفصل لتأثيرات المرور واستراتيجيات التخفيف للحد الأدنى من الاضطراب",
			image: '/images/features/impact-assessment.jpg'
		},
		{
			title: "Signal Coordination",
			titleAr: "تنسيق الإشارات",
			description: "Temporary signal timing adjustments and coordination for optimal traffic management.",
			descriptionAr: "تعديلات توقيت الإشارات المؤقتة والتنسيق لإدارة المرور المثلى",
			image: '/images/features/signal-coordination.jpg'
		}
	];

	const benefits = [
		"Minimize traffic disruption during construction",
		"Enhance safety for workers and road users",
		"Reduce project delays and costs",
		"Maintain emergency vehicle access",
		"Comply with regulatory requirements",
		"Improve public acceptance of projects"
	];

	const benefitsAr = [
		"تقليل اضطراب المرور أثناء البناء",
		"تعزيز السلامة للعمال ومستخدمي الطرق",
		"تقليل تأخيرات المشروع والتكاليف",
		"الحفاظ على وصول المركبات الطارئة",
		"الامتثال للمتطلبات التنظيمية",
		"تحسين القبول العام للمشاريع"
	];

	const process = [
		{ 
			title: "Site Investigation", 
			titleAr: "التحقيق في الموقع",
			description: "Comprehensive assessment of existing traffic conditions and constraints",
			descriptionAr: "تقييم شامل لظروف المرور الحالية والقيود"
		},
		{ 
			title: "Plan Development", 
			titleAr: "تطوير الخطة",
			description: "Creation of detailed traffic management strategies and phasing plans",
			descriptionAr: "إنشاء استراتيجيات إدارة مرور مفصلة وخطط التدرج"
		},
		{ 
			title: "Stakeholder Review", 
			titleAr: "مراجعة أصحاب المصلحة",
			description: "Consultation with authorities and stakeholders for plan approval",
			descriptionAr: "التشاور مع السلطات وأصحاب المصلحة للموافقة على الخطة"
		},
		{ 
			title: "Implementation Support", 
			titleAr: "دعم التنفيذ",
			description: "On-site monitoring and plan adjustments as needed",
			descriptionAr: "المراقبة في الموقع وتعديلات الخطة حسب الحاجة"
		}
	];

	const caseStudies = [
		{
			title: "Major Bridge Reconstruction",
			titleAr: "إعادة بناء جسر رئيسي",
			description: "Complex traffic management plan for a major bridge replacement affecting 50,000 daily vehicles.",
			descriptionAr: "خطة إدارة مرور معقدة لاستبدال جسر رئيسي يؤثر على 50,000 مركبة يومياً",
			location: "Urban Center",
			locationAr: "المركز الحضري",
			duration: "18 months",
			durationAr: "18 شهراً",
			team: "6 specialists",
			teamAr: "6 أخصائيين",
			image: '/images/projects/bridge-reconstruction.jpg'
		},
		{
			title: "Highway Widening Project",
			titleAr: "مشروع توسيع طريق سريع",
			description: "Traffic management for 20km highway expansion with multiple construction phases.",
			descriptionAr: "إدارة المرور لتوسيع طريق سريع بطول 20 كم مع مراحل بناء متعددة",
			location: "National Highway",
			locationAr: "الطريق الوطني",
			duration: "24 months",
			durationAr: "24 شهراً",
			team: "8 specialists",
			teamAr: "8 أخصائيين",
			image: '/images/projects/highway-widening.jpg'
		},
		{
			title: "Underground Utility Installation",
			titleAr: "تركيب المرافق تحت الأرض",
			description: "Traffic control plan for extensive underground infrastructure work in busy commercial district.",
			descriptionAr: "خطة التحكم في المرور لأعمال البنية التحتية الواسعة تحت الأرض في منطقة تجارية مزدحمة",
			location: "Business District",
			locationAr: "المنطقة التجارية",
			duration: "15 months",
			durationAr: "15 شهراً",
			team: "5 specialists",
			teamAr: "5 أخصائيين",
			image: '/images/projects/utility-installation.jpg'
		}
	];

	const stats = [
		{ value: "300+", label: "Management Plans Created", labelAr: "خطط إدارة تم إنشاؤها" },
		{ value: "95%", label: "On-Time Completion", labelAr: "الإنجاز في الوقت المحدد" },
		{ value: "Zero", label: "Major Safety Incidents", labelAr: "حوادث السلامة الرئيسية" },
		{ value: "12+", label: "Years Experience", labelAr: "سنة من الخبرة" }
	];
</script>

<ServicePageLayout
	title="Traffic Management Plans"
	titleAr="خطط إدارة المرور"
	subtitle="Comprehensive traffic control strategies for construction and maintenance projects"
	subtitleAr="استراتيجيات شاملة للتحكم في المرور لمشاريع البناء والصيانة"
	description="Expert development of traffic management plans that ensure safety, minimize disruption, and maintain traffic flow during construction and maintenance activities."
	descriptionAr="تطوير متخصص لخطط إدارة المرور التي تضمن السلامة وتقلل الاضطراب وتحافظ على تدفق المرور أثناء أنشطة البناء والصيانة"
	heroImage="/images/services/traffic-management-plans.jpg"
	{features}
	{benefits}
	{benefitsAr}
	{process}
	{caseStudies}
	{stats}
/>