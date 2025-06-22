<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';

	const features = [
		{
			title: "Green Infrastructure",
			titleAr: "البنية التحتية الخضراء",
			description: "Integration of sustainable materials, green corridors, and biodiversity enhancement in transport projects.",
			descriptionAr: "دمج المواد المستدامة والممرات الخضراء وتعزيز التنوع البيولوجي في مشاريع النقل",
			image: '/images/features/green-infrastructure.jpg'
		},
		{
			title: "Electric Vehicle Infrastructure",
			titleAr: "بنية تحتية للمركبات الكهربائية",
			description: "Design and planning of EV charging networks and supporting electrical infrastructure.",
			descriptionAr: "تصميم وتخطيط شبكات شحن السيارات الكهربائية والبنية التحتية الكهربائية الداعمة",
			image: '/images/features/electric-vehicle.jpg'
		},
		{
			title: "Active Transport",
			titleAr: "النقل النشط",
			description: "Comprehensive cycling and walking infrastructure promoting sustainable mobility choices.",
			descriptionAr: "بنية تحتية شاملة للدراجات والمشي تعزز خيارات التنقل المستدام",
			image: '/images/features/active-transport.jpg'
		},
		{
			title: "Stormwater Management",
			titleAr: "إدارة مياه الأمطار",
			description: "Sustainable drainage systems and water management integrated into transport infrastructure.",
			descriptionAr: "أنظمة صرف مستدامة وإدارة المياه مدمجة في البنية التحتية للنقل",
			image: '/images/features/stormwater-management.jpg'
		},
		{
			title: "Circular Economy",
			titleAr: "الاقتصاد الدائري",
			description: "Material reuse strategies and sustainable construction practices reducing environmental impact.",
			descriptionAr: "استراتيجيات إعادة استخدام المواد وممارسات البناء المستدامة التي تقلل التأثير البيئي",
			image: '/images/features/circular-economy.jpg'
		},
		{
			title: "Carbon Reduction",
			titleAr: "تقليل الكربون",
			description: "Strategies to minimize carbon footprint through design optimization and material selection.",
			descriptionAr: "استراتيجيات لتقليل البصمة الكربونية من خلال تحسين التصميم واختيار المواد",
			image: '/images/features/carbon-reduction.jpg'
		}
	];

	const benefits = [
		"Reduced environmental impact and carbon footprint",
		"Enhanced biodiversity and ecosystem services",
		"Improved air and water quality",
		"Long-term cost savings through sustainable practices",
		"Compliance with environmental regulations",
		"Enhanced community health and wellbeing"
	];

	const benefitsAr = [
		"تقليل التأثير البيئي والبصمة الكربونية",
		"تعزيز التنوع البيولوجي وخدمات النظام البيئي",
		"تحسين جودة الهواء والماء",
		"توفير التكاليف طويلة المدى من خلال الممارسات المستدامة",
		"الامتثال للوائح البيئية",
		"تعزيز صحة المجتمع ورفاهيته"
	];

	const process = [
		{ 
			title: "Environmental Assessment", 
			titleAr: "التقييم البيئي",
			description: "Comprehensive environmental impact assessment and baseline studies",
			descriptionAr: "تقييم شامل للتأثير البيئي ودراسات خط الأساس"
		},
		{ 
			title: "Sustainable Design", 
			titleAr: "التصميم المستدام",
			description: "Integration of green principles into infrastructure design",
			descriptionAr: "دمج المبادئ الخضراء في تصميم البنية التحتية"
		},
		{ 
			title: "Stakeholder Engagement", 
			titleAr: "إشراك أصحاب المصلحة",
			description: "Community consultation and environmental authority coordination",
			descriptionAr: "استشارة المجتمع وتنسيق السلطة البيئية"
		},
		{ 
			title: "Monitoring & Evaluation", 
			titleAr: "المراقبة والتقييم",
			description: "Post-implementation environmental monitoring and performance evaluation",
			descriptionAr: "المراقبة البيئية بعد التنفيذ وتقييم الأداء"
		}
	];

	const caseStudies = [
		{
			title: "Green Corridor Development",
			titleAr: "تطوير ممر أخضر",
			description: "50km sustainable transport corridor with integrated cycling paths, EV charging, and biodiversity enhancement.",
			descriptionAr: "ممر نقل مستدام بطول 50 كم مع مسارات دراجات مدمجة وشحن السيارات الكهربائية وتعزيز التنوع البيولوجي",
			location: "Regional Network",
			locationAr: "الشبكة الإقليمية",
			duration: "36 months",
			durationAr: "36 شهراً",
			team: "15 specialists",
			teamAr: "15 أخصائي",
			image: '/images/projects/green-corridor.jpg'
		},
		{
			title: "Urban Sustainable Mobility",
			titleAr: "التنقل المستدام الحضري",
			description: "Comprehensive sustainable transport strategy for city center including BRT and cycling infrastructure.",
			descriptionAr: "استراتيجية نقل مستدام شاملة لوسط المدينة تشمل النقل السريع بالحافلات وبنية تحتية للدراجات",
			location: "Urban Center",
			locationAr: "المركز الحضري",
			duration: "24 months",
			durationAr: "24 شهراً",
			team: "10 specialists",
			teamAr: "10 أخصائيين",
			image: '/images/projects/sustainable-mobility.jpg'
		},
		{
			title: "Eco-Industrial Access Road",
			titleAr: "طريق وصول صناعي بيئي",
			description: "Sustainable access road design for industrial park with focus on freight efficiency and environmental protection.",
			descriptionAr: "تصميم طريق وصول مستدام للمنطقة الصناعية مع التركيز على كفاءة الشحن والحماية البيئية",
			location: "Industrial Zone",
			locationAr: "المنطقة الصناعية",
			duration: "18 months",
			durationAr: "18 شهراً",
			team: "8 specialists",
			teamAr: "8 أخصائيين",
			image: '/images/projects/eco-industrial.jpg'
		}
	];

	const stats = [
		{ value: "75+", label: "Sustainable Projects", labelAr: "مشاريع مستدامة" },
		{ value: "40%", label: "Carbon Reduction Achieved", labelAr: "تقليل الكربون المحقق" },
		{ value: "25+", label: "EV Networks Designed", labelAr: "شبكات سيارات كهربائية مصممة" },
		{ value: "500km", label: "Cycling Infrastructure", labelAr: "بنية تحتية للدراجات" }
	];
</script>

<ServicePageLayout
	title="Sustainable Transport"
	titleAr="النقل المستدام"
	subtitle="Environmentally conscious transportation solutions for a greener future"
	subtitleAr="حلول نقل واعية بيئياً لمستقبل أكثر خضرة"
	description="Leading sustainable transport design services that integrate environmental protection, renewable energy, and green infrastructure into modern transportation systems."
	descriptionAr="خدمات تصميم النقل المستدام الرائدة التي تدمج الحماية البيئية والطاقة المتجددة والبنية التحتية الخضراء في أنظمة النقل الحديثة"
	heroImage="/images/services/sustainable-transport.jpg"
	{features}
	{benefits}
	{benefitsAr}
	{process}
	{caseStudies}
	{stats}
/>