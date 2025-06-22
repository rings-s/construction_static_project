<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';

	const features = [
		{
			title: "Intersection Design",
			titleAr: "تصميم التقاطعات",
			description: "Advanced geometric design of intersections optimizing capacity, safety, and operational efficiency.",
			descriptionAr: "تصميم هندسي متقدم للتقاطعات يحسن السعة والسلامة والكفاءة التشغيلية",
			image: '/images/features/intersection-design.jpg'
		},
		{
			title: "Interchange Design",
			titleAr: "تصميم التبادلات",
			description: "Complex interchange design including diamond, cloverleaf, and directional configurations.",
			descriptionAr: "تصميم تبادلات معقدة تشمل تكوينات الماس وورقة البرسيم والاتجاهية",
			image: '/images/features/interchange-design.jpg'
		},
		{
			title: "Signal Optimization",
			titleAr: "تحسين الإشارات",
			description: "Traffic signal design and timing optimization for maximum intersection efficiency.",
			descriptionAr: "تصميم إشارات المرور وتحسين التوقيت لتحقيق أقصى كفاءة للتقاطع",
			image: '/images/features/signal-optimization.jpg'
		},
		{
			title: "Pedestrian Integration",
			titleAr: "دمج المشاة",
			description: "Safe pedestrian and cyclist facilities integrated into junction design.",
			descriptionAr: "مرافق آمنة للمشاة وراكبي الدراجات مدمجة في تصميم التقاطع",
			image: '/images/features/pedestrian-integration.jpg'
		},
		{
			title: "Geometric Analysis",
			titleAr: "التحليل الهندسي",
			description: "Detailed geometric analysis ensuring appropriate sight distances and turning radii.",
			descriptionAr: "تحليل هندسي مفصل يضمن مسافات رؤية مناسبة وأنصاف أقطار انعطاف",
			image: '/images/features/geometric-analysis.jpg'
		},
		{
			title: "Capacity Analysis",
			titleAr: "تحليل السعة",
			description: "Comprehensive traffic capacity analysis and level of service assessments.",
			descriptionAr: "تحليل شامل لسعة المرور وتقييمات مستوى الخدمة",
			image: '/images/features/capacity-analysis.jpg'
		}
	];

	const benefits = [
		"Improved traffic flow and reduced congestion",
		"Enhanced safety for all road users",
		"Optimized land use and development potential",
		"Reduced vehicle emissions through better flow",
		"Cost-effective design solutions",
		"Future-ready scalable designs"
	];

	const benefitsAr = [
		"تحسين تدفق المرور وتقليل الازدحام",
		"تعزيز السلامة لجميع مستخدمي الطرق",
		"استخدام الأراضي الأمثل وإمكانية التطوير",
		"تقليل انبعاثات المركبات من خلال تحسين التدفق",
		"حلول تصميم فعالة من حيث التكلفة",
		"تصاميم قابلة للتوسع جاهزة للمستقبل"
	];

	const process = [
		{ 
			title: "Traffic Analysis", 
			titleAr: "تحليل المرور",
			description: "Comprehensive traffic volume and pattern analysis",
			descriptionAr: "تحليل شامل لحجم المرور والأنماط"
		},
		{ 
			title: "Geometric Design", 
			titleAr: "التصميم الهندسي",
			description: "Detailed geometric design and 3D modeling",
			descriptionAr: "تصميم هندسي مفصل ونمذجة ثلاثية الأبعاد"
		},
		{ 
			title: "Safety Assessment", 
			titleAr: "تقييم السلامة",
			description: "Road safety audit and conflict point analysis",
			descriptionAr: "تدقيق السلامة المرورية وتحليل نقاط التضارب"
		},
		{ 
			title: "Final Documentation", 
			titleAr: "التوثيق النهائي",
			description: "Complete engineering drawings and specifications",
			descriptionAr: "رسومات هندسية ومواصفات كاملة"
		}
	];

	const caseStudies = [
		{
			title: "Major Freeway Interchange",
			titleAr: "تبادل طريق سريع رئيسي",
			description: "Design of a new four-level directional interchange handling 120,000 vehicles per day.",
			descriptionAr: "تصميم تبادل اتجاهي جديد من أربعة مستويات يتعامل مع 120,000 مركبة يومياً",
			location: "Metropolitan Area",
			locationAr: "المنطقة الحضرية",
			duration: "30 months",
			durationAr: "30 شهراً",
			team: "12 specialists",
			teamAr: "12 أخصائي",
			image: '/images/projects/freeway-interchange.jpg'
		},
		{
			title: "Urban Intersection Upgrade",
			titleAr: "ترقية تقاطع حضري",
			description: "Complete redesign of complex 6-way intersection with enhanced pedestrian facilities.",
			descriptionAr: "إعادة تصميم كاملة لتقاطع معقد بستة اتجاهات مع مرافق محسنة للمشاة",
			location: "City Center",
			locationAr: "وسط المدينة",
			duration: "18 months",
			durationAr: "18 شهراً",
			team: "8 specialists",
			teamAr: "8 أخصائيين",
			image: '/images/projects/urban-intersection.jpg'
		},
		{
			title: "Roundabout Conversion",
			titleAr: "تحويل إلى دوار",
			description: "Conversion of traditional intersection to modern roundabout improving safety and capacity.",
			descriptionAr: "تحويل تقاطع تقليدي إلى دوار حديث يحسن السلامة والسعة",
			location: "Suburban Area",
			locationAr: "المنطقة الضاحية",
			duration: "12 months",
			durationAr: "12 شهراً",
			team: "6 specialists",
			teamAr: "6 أخصائيين",
			image: '/images/projects/roundabout-conversion.jpg'
		}
	];

	const stats = [
		{ value: "100+", label: "Junctions Designed", labelAr: "تقاطعات مصممة" },
		{ value: "40%", label: "Average Capacity Improvement", labelAr: "متوسط تحسين السعة" },
		{ value: "60%", label: "Accident Reduction", labelAr: "تقليل الحوادث" },
		{ value: "18+", label: "Years Experience", labelAr: "سنة من الخبرة" }
	];
</script>

<ServicePageLayout
	title="Highway & Junction Design"
	titleAr="تصميم الطرق السريعة والتقاطعات"
	subtitle="Advanced intersection and interchange design for optimal traffic flow"
	subtitleAr="تصميم متقدم للتقاطعات والتبادلات لتحقيق التدفق المروري الأمثل"
	description="Specialized highway and junction design services creating safe, efficient, and sustainable transportation infrastructure for all types of traffic movements."
	descriptionAr="خدمات متخصصة لتصميم الطرق السريعة والتقاطعات لإنشاء بنية تحتية نقل آمنة وفعالة ومستدامة لجميع أنواع حركات المرور"
	heroImage="/images/services/highway-junction.jpg"
	{features}
	{benefits}
	{benefitsAr}
	{process}
	{caseStudies}
	{stats}
/>