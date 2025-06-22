
<!-- src/routes/traffic-engineering/swept-path-analysis/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Truck, RotateCcw, Compass, Shield, Target, CheckCircle, AlertTriangle, Layers } from 'lucide-svelte';
  
	const features = [
		{
			icon: Truck,
			title: "تحليل مسارات المركبات الثقيلة",
			titleEn: "Heavy Vehicle Path Analysis",
			description: "تحليل مفصل لمسارات حركة الشاحنات والحافلات والمركبات الثقيلة في التقاطعات والمنعطفات",
			descriptionEn: "Detailed analysis of truck, bus, and heavy vehicle movement paths through intersections and turns"
		},
		{
			icon: RotateCcw,
			title: "تحليل حركات الدوران",
			titleEn: "Turning Movement Analysis",
			description: "فحص شامل لجميع حركات الدوران اليمينية واليسارية والانعطاف للخلف في المواقع المختلفة",
			descriptionEn: "Comprehensive examination of all right, left, and U-turn movements at various locations"
		},
		{
			icon: Compass,
			title: "تصميم الدوارات المرورية",
			titleEn: "Roundabout Design Analysis",
			description: "تحليل متخصص لقدرة الدوارات على استيعاب المركبات المختلفة مع تحسين الهندسة الداخلية",
			descriptionEn: "Specialized analysis of roundabout capacity for different vehicles with internal geometry optimization"
		},
		{
			icon: Shield,
			title: "تحليل مركبات الطوارئ",
			titleEn: "Emergency Vehicle Analysis",
			description: "ضمان قدرة مركبات الإطفاء والإسعاف والطوارئ على الوصول والمناورة بأمان وكفاءة",
			descriptionEn: "Ensuring fire trucks, ambulances, and emergency vehicles can access and maneuver safely and efficiently"
		},
		{
			icon: Target,
			title: "تحليل مناطق التحميل والتفريغ",
			titleEn: "Loading and Unloading Area Analysis",
			description: "تصميم وتحليل مناطق التحميل لضمان مناورة المركبات التجارية دون تعارض مع المرور",
			descriptionEn: "Design and analysis of loading areas ensuring commercial vehicle maneuvering without traffic conflicts"
		},
		{
			icon: CheckCircle,
			title: "فحص الامتثال للمعايير",
			titleEn: "Design Standards Compliance Check",
			description: "التحقق من مطابقة التصاميم للمعايير المحلية والدولية لحركة المركبات الكبيرة",
			descriptionEn: "Verification of design compliance with local and international standards for large vehicle movement"
		},
		{
			icon: AlertTriangle,
			title: "تحليل نقاط التعارض",
			titleEn: "Conflict Point Analysis",
			description: "تحديد وحل نقاط التعارض المحتملة بين مسارات المركبات المختلفة في نفس المنطقة",
			descriptionEn: "Identification and resolution of potential conflict points between different vehicle paths in same area"
		},
		{
			icon: Layers,
			title: "النمذجة ثلاثية الأبعاد",
			titleEn: "3D Path Modeling",
			description: "استخدام تقنيات النمذجة المتقدمة لتصور مسارات المركبات في بيئة ثلاثية الأبعاد",
			descriptionEn: "Using advanced modeling techniques to visualize vehicle paths in three-dimensional environment"
		}
	];
  
	const benefits = [
		{
			text: "ضمان السلامة المرورية لجميع أنواع المركبات",
			textEn: "Ensuring traffic safety for all vehicle types"
		},
		{
			text: "تحسين كفاءة تدفق المرور والتشغيل",
			textEn: "Improving traffic flow efficiency and operations"
		},
		{
			text: "تقليل مخاطر الحوادث والتصادمات",
			textEn: "Reducing accident and collision risks"
		},
		{
			text: "الامتثال للمعايير والمتطلبات التنظيمية",
			textEn: "Compliance with standards and regulatory requirements"
		},
		{
			text: "تحسين إمكانية الوصول للمركبات الكبيرة",
			textEn: "Improving accessibility for large vehicles"
		},
		{
			text: "تقليل الحاجة لتعديلات مكلفة بعد الإنشاء",
			textEn: "Reducing need for costly post-construction modifications"
		},
		{
			text: "دعم اتخاذ القرارات بأدلة بصرية واضحة",
			textEn: "Supporting decision-making with clear visual evidence"
		},
		{
			text: "تحسين تصميم البنية التحتية المرورية",
			textEn: "Enhancing traffic infrastructure design quality"
		}
	];
  
	const process = [
		{
			title: "جمع متطلبات المركبات",
			titleEn: "Vehicle Requirements Collection",
			description: "تحديد أنواع المركبات المستهدفة وخصائصها الهندسية ومتطلبات الحركة الخاصة بها",
			descriptionEn: "Identifying target vehicle types, their geometric characteristics, and specific movement requirements"
		},
		{
			title: "إعداد النموذج الرقمي",
			titleEn: "Digital Model Preparation",
			description: "بناء نموذج رقمي دقيق للموقع مع جميع العناصر الهندسية والقيود المكانية",
			descriptionEn: "Building accurate digital site model with all geometric elements and spatial constraints"
		},
		{
			title: "تشغيل تحليل المسارات",
			titleEn: "Path Analysis Execution",
			description: "تشغيل محاكاة مسارات المركبات المختلفة وتحليل التعارضات والمشاكل المحتملة",
			descriptionEn: "Running vehicle path simulations and analyzing conflicts and potential issues"
		},
		{
			title: "التحسين وإعداد التقارير",
			titleEn: "Optimization and Reporting",
			description: "تحسين التصميم بناءً على النتائج وإعداد تقارير تفصيلية مع التوصيات والرسوم",
			descriptionEn: "Design optimization based on results and preparation of detailed reports with recommendations and drawings"
		}
	];
  
	const caseStudies = [
		{
			title: "تحليل مسارات التقاطع الرئيسي",
			titleEn: "Major Intersection Path Analysis",
			description: "تحليل شامل لتقاطع رئيسي معقد لضمان مرور المركبات الثقيلة والحافلات بأمان",
			descriptionEn: "Comprehensive analysis of complex major intersection ensuring safe passage of heavy vehicles and buses",
			location: "تقاطع الشارع التجاري",
			locationEn: "Commercial Street Intersection",
			duration: "6 أسابيع",
			durationEn: "6 weeks",
			team: "4 متخصصين",
			teamEn: "4 specialists"
		},
		{
			title: "تصميم دوار للمركبات الثقيلة",
			titleEn: "Heavy Vehicle Roundabout Design",
			description: "تطوير تصميم دوار مُحسَّن لاستيعاب الشاحنات الكبيرة مع الحفاظ على كفاءة المرور",
			descriptionEn: "Development of optimized roundabout design accommodating large trucks while maintaining traffic efficiency",
			location: "المنطقة الصناعية",
			locationEn: "Industrial Zone",
			duration: "8 أسابيع",
			durationEn: "8 weeks",
			team: "5 متخصصين",
			teamEn: "5 specialists"
		},
		{
			title: "تحليل مسارات مركبات الطوارئ",
			titleEn: "Emergency Vehicle Path Analysis",
			description: "تحليل مسارات وصول مركبات الإطفاء والإسعاف لمجمع تجاري كبير ومنطقة سكنية",
			descriptionEn: "Analysis of fire truck and ambulance access paths for large commercial complex and residential area",
			location: "المجمع المختلط",
			locationEn: "Mixed-Use Development",
			duration: "4 أسابيع",
			durationEn: "4 weeks",
			team: "3 متخصصين",
			teamEn: "3 specialists"
		}
	];
  
	const stats = [
		{
			value: "250+",
			label: "تحليل مسار مكتمل",
			labelEn: "Path Analyses Completed"
		},
		{
			value: "95%",
			label: "معدل قبول التصاميم",
			labelEn: "Design Acceptance Rate"
		},
		{
			value: "15",
			label: "نوع مركبة منمذجة",
			labelEn: "Vehicle Types Modeled"
		},
		{
			value: "100%",
			label: "دقة النمذجة",
			labelEn: "Modeling Accuracy"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'تحليل المسارات المكتسحة' : 'Swept Path Analysis'}
	subtitle={($locale || 'en') === 'ar' ? 'تحليل متخصص لمسارات حركة المركبات الكبيرة والثقيلة' : 'Specialized analysis of large and heavy vehicle movement paths'}
	description={($locale || 'en') === 'ar' ? 'خدمات تحليل المسارات المكتسحة المتخصصة لضمان قدرة المركبات الكبيرة والثقيلة على المناورة بأمان في التقاطعات والدوارات ومناطق التحميل مع تحسين التصميم لتلبية معايير السلامة والكفاءة' : 'Specialized swept path analysis services ensuring large and heavy vehicles can maneuver safely through intersections, roundabouts, and loading areas while optimizing design to meet safety and efficiency standards'}
	icon="🛻"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>