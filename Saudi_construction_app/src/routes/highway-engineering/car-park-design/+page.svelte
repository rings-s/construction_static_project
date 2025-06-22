<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';

	const features = [
		{
			title: "Optimal Space Utilization",
			titleAr: "الاستفادة المثلى من المساحة",
			description: "Advanced layout design maximizing parking capacity while ensuring smooth traffic flow and accessibility compliance.",
			descriptionAr: "تصميم تخطيط متقدم لزيادة سعة المواقف إلى أقصى حد مع ضمان التدفق المروري السلس والامتثال لمتطلبات الوصول",
			image: '/images/features/space-optimization.jpg'
		},
		{
			title: "Smart Parking Solutions",
			titleAr: "حلول مواقف ذكية",
			description: "Integration of modern technologies including EV charging stations, smart payment systems, and real-time availability monitoring.",
			descriptionAr: "دمج التقنيات الحديثة بما في ذلك محطات شحن السيارات الكهربائية وأنظمة الدفع الذكية ومراقبة التوفر في الوقت الفعلي",
			image: '/images/features/smart-parking.jpg'
		},
		{
			title: "Safety & Security",
			titleAr: "السلامة والأمان",
			description: "Comprehensive safety measures including proper lighting, surveillance systems, and emergency access routes.",
			descriptionAr: "تدابير السلامة الشاملة بما في ذلك الإضاءة المناسبة وأنظمة المراقبة وطرق الوصول للطوارئ",
			image: '/images/features/safety-security.jpg'
		},
		{
			title: "Sustainable Design",
			titleAr: "التصميم المستدام",
			description: "Environmentally conscious solutions incorporating green infrastructure, stormwater management, and energy-efficient lighting.",
			descriptionAr: "حلول واعية بيئياً تتضمن البنية التحتية الخضراء وإدارة مياه الأمطار والإضاءة الموفرة للطاقة",
			image: '/images/features/sustainable-design.jpg'
		},
		{
			title: "Accessibility Compliance",
			titleAr: "الامتثال لمتطلبات الوصول",
			description: "Full compliance with ADA requirements and local accessibility standards for inclusive design.",
			descriptionAr: "الامتثال الكامل لمتطلبات قانون الأمريكيين ذوي الإعاقة والمعايير المحلية لإمكانية الوصول للتصميم الشامل",
			image: '/images/features/accessibility.jpg'
		},
		{
			title: "Traffic Flow Analysis",
			titleAr: "تحليل تدفق المرور",
			description: "Detailed traffic flow studies to optimize entry, exit, and internal circulation patterns.",
			descriptionAr: "دراسات مفصلة لتدفق المرور لتحسين أنماط الدخول والخروج والدوران الداخلي",
			image: '/images/features/traffic-flow.jpg'
		}
	];

	const benefits = [
		"Maximize parking capacity within space constraints",
		"Reduce construction and operational costs",
		"Improve user experience and satisfaction",
		"Ensure regulatory compliance and safety standards",
		"Future-proof design for emerging technologies",
		"Minimize environmental impact through sustainable practices"
	];

	const benefitsAr = [
		"زيادة سعة المواقف إلى أقصى حد ضمن قيود المساحة",
		"تقليل تكاليف البناء والتشغيل",
		"تحسين تجربة المستخدم والرضا",
		"ضمان الامتثال التنظيمي ومعايير السلامة",
		"تصميم مقاوم للمستقبل للتقنيات الناشئة",
		"تقليل التأثير البيئي من خلال الممارسات المستدامة"
	];

	const process = [
		{ 
			title: "Site Assessment", 
			titleAr: "تقييم الموقع",
			description: "Comprehensive analysis of site conditions, constraints, and opportunities",
			descriptionAr: "تحليل شامل لظروف الموقع والقيود والفرص"
		},
		{ 
			title: "Demand Analysis", 
			titleAr: "تحليل الطلب",
			description: "Detailed parking demand study and capacity planning",
			descriptionAr: "دراسة مفصلة لطلب المواقف وتخطيط السعة"
		},
		{ 
			title: "Design Development", 
			titleAr: "تطوير التصميم",
			description: "Creation of optimal layout and infrastructure design",
			descriptionAr: "إنشاء تخطيط مثالي وتصميم البنية التحتية"
		},
		{ 
			title: "Implementation", 
			titleAr: "التنفيذ",
			description: "Construction oversight and quality assurance",
			descriptionAr: "الإشراف على البناء وضمان الجودة"
		}
	];

	const caseStudies = [
		{
			title: "Downtown Commercial Complex",
			titleAr: "مجمع تجاري وسط المدينة",
			description: "Multi-level parking facility serving a major shopping center with 800 spaces and integrated retail.",
			descriptionAr: "منشأة مواقف متعددة المستويات تخدم مركز تسوق رئيسي بـ 800 موقف ومحلات تجارية متكاملة",
			location: "City Center",
			locationAr: "وسط المدينة",
			duration: "12 months",
			durationAr: "12 شهراً",
			team: "8 specialists",
			teamAr: "8 أخصائيين",
			image: '/images/projects/downtown-commercial.jpg'
		},
		{
			title: "Hospital Parking Expansion",
			titleAr: "توسعة مواقف المستشفى",
			description: "Expansion project adding 500 spaces with specialized access for emergency vehicles and patients.",
			descriptionAr: "مشروع توسعة يضيف 500 موقف مع وصول متخصص للمركبات الطارئة والمرضى",
			location: "Medical District",
			locationAr: "المنطقة الطبية",
			duration: "8 months",
			durationAr: "8 أشهر",
			team: "6 specialists",
			teamAr: "6 أخصائيين",
			image: '/images/projects/hospital-parking.jpg'
		},
		{
			title: "University Campus Parking",
			titleAr: "مواقف الحرم الجامعي",
			description: "Sustainable parking solution for 1,200 vehicles with electric vehicle charging infrastructure.",
			descriptionAr: "حل مواقف مستدام لـ 1200 مركبة مع بنية تحتية لشحن السيارات الكهربائية",
			location: "University Campus",
			locationAr: "الحرم الجامعي",
			duration: "10 months",
			durationAr: "10 أشهر",
			team: "10 specialists",
			teamAr: "10 أخصائيين",
			image: '/images/projects/university-campus.jpg'
		}
	];

	const stats = [
		{ value: "150+", label: "Car Parks Designed", labelAr: "مواقف سيارات مصممة" },
		{ value: "50,000+", label: "Parking Spaces Created", labelAr: "مساحات مواقف تم إنشاؤها" },
		{ value: "98%", label: "Client Satisfaction", labelAr: "رضا العملاء" },
		{ value: "15+", label: "Years Experience", labelAr: "سنة من الخبرة" }
	];
</script>

<ServicePageLayout
	title="Car Park Design"
	titleAr="تصميم مواقف السيارات"
	subtitle="Efficient and sustainable car park solutions with optimal space utilization"
	subtitleAr="حلول مواقف سيارات فعالة ومستدامة مع الاستفادة المثلى من المساحة"
	description="Professional car park design services that maximize capacity, enhance user experience, and ensure safety while incorporating sustainable and smart technology solutions."
	descriptionAr="خدمات تصميم مواقف سيارات متخصصة تزيد السعة إلى أقصى حد وتعزز تجربة المستخدم وتضمن السلامة مع دمج الحلول التقنية المستدامة والذكية"
	heroImage="/images/services/car-park-design.jpg"
	{features}
	{benefits}
	{benefitsAr}
	{process}
	{caseStudies}
	{stats}
/>