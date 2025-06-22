<!-- src/routes/transport-planning/travel-plan-development/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Users, Leaf, BarChart3, Target, Bus, Bike, Car, TrendingDown } from 'lucide-svelte';
  
	const features = [
		{
			icon: Users,
			title: "مسوحات السفر الشاملة",
			titleEn: "Comprehensive Travel Surveys",
			description: "إجراء مسوحات مفصلة لأنماط السفر والتنقل للموظفين والزوار لفهم الاحتياجات الحالية",
			descriptionEn: "Conducting detailed travel pattern surveys for employees and visitors to understand current mobility needs"
		},
		{
			icon: Leaf,
			title: "خطط النقل المستدامة",
			titleEn: "Sustainable Transport Plans",
			description: "تطوير استراتيجيات نقل مستدامة تقلل من الاعتماد على المركبات الخاصة وتعزز البدائل الخضراء",
			descriptionEn: "Developing sustainable transport strategies that reduce private vehicle dependency and promote green alternatives"
		},
		{
			icon: BarChart3,
			title: "تحليل البيانات المتقدم",
			titleEn: "Advanced Data Analysis",
			description: "استخدام تقنيات التحليل المتقدمة لفهم أنماط التنقل وتحديد الفرص للتحسين",
			descriptionEn: "Using advanced analytical techniques to understand mobility patterns and identify improvement opportunities"
		},
		{
			icon: Target,
			title: "وضع الأهداف القابلة للقياس",
			titleEn: "Measurable Goal Setting",
			description: "تحديد أهداف واقعية وقابلة للقياس لتقليل السفر بالمركبات الفردية وزيادة استخدام البدائل",
			descriptionEn: "Setting realistic and measurable goals for reducing single-occupancy vehicle trips and increasing alternative mode use"
		},
		{
			icon: Bus,
			title: "تطوير خدمات النقل العام",
			titleEn: "Public Transport Development",
			description: "تصميم وتحسين خدمات النقل العام والمكوكية لخدمة المواقع والمرافق بكفاءة",
			descriptionEn: "Designing and improving public transport and shuttle services to efficiently serve sites and facilities"
		},
		{
			icon: Bike,
			title: "تعزيز النقل النشط",
			titleEn: "Active Transport Promotion",
			description: "تطوير برامج وبنية تحتية لتشجيع المشي وركوب الدراجات كوسائل نقل يومية",
			descriptionEn: "Developing programs and infrastructure to encourage walking and cycling as daily transport modes"
		},
		{
			icon: Car,
			title: "برامج مشاركة المركبات",
			titleEn: "Vehicle Sharing Programs",
			description: "تصميم وتنفيذ برامج مشاركة المركبات والرحلات المشتركة لتقليل عدد المركبات",
			descriptionEn: "Designing and implementing car sharing and ridesharing programs to reduce vehicle numbers"
		},
		{
			icon: TrendingDown,
			title: "إدارة الطلب على السفر",
			titleEn: "Travel Demand Management",
			description: "تطوير استراتيجيات إدارة الطلب لتوزيع أوقات السفر وتقليل الذروة المرورية",
			descriptionEn: "Developing demand management strategies to distribute travel times and reduce traffic peaks"
		}
	];
  
	const benefits = [
		{
			text: "تقليل الازدحام المروري والتلوث البيئي",
			textEn: "Reducing traffic congestion and environmental pollution"
		},
		{
			text: "خفض تكاليف التنقل للموظفين والمؤسسات",
			textEn: "Lowering transportation costs for employees and organizations"
		},
		{
			text: "تحسين صحة ورفاهية الموظفين",
			textEn: "Improving employee health and wellbeing"
		},
		{
			text: "تعزيز صورة المؤسسة كمؤسسة مسؤولة بيئياً",
			textEn: "Enhancing organization's image as environmentally responsible"
		},
		{
			text: "تقليل الحاجة لمواقف السيارات وتكاليفها",
			textEn: "Reducing parking space requirements and associated costs"
		},
		{
			text: "زيادة إنتاجية الموظفين وتقليل التوتر",
			textEn: "Increasing employee productivity and reducing stress"
		},
		{
			text: "الامتثال للمتطلبات البيئية والتنظيمية",
			textEn: "Compliance with environmental and regulatory requirements"
		},
		{
			text: "تحسين إمكانية الوصول للجميع",
			textEn: "Improving accessibility for all users"
		}
	];
  
	const process = [
		{
			title: "التحليل والتقييم الأولي",
			titleEn: "Initial Analysis and Assessment",
			description: "دراسة الوضع الحالي للتنقل وإجراء مسوحات شاملة لأنماط السفر والاحتياجات",
			descriptionEn: "Studying current mobility situation and conducting comprehensive surveys of travel patterns and needs"
		},
		{
			title: "تطوير الاستراتيجيات",
			titleEn: "Strategy Development",
			description: "تصميم استراتيجيات مخصصة للموقع مع تحديد البدائل المناسبة والأهداف الواقعية",
			descriptionEn: "Designing site-specific strategies with identification of suitable alternatives and realistic targets"
		},
		{
			title: "وضع خطة التنفيذ",
			titleEn: "Implementation Planning",
			description: "إعداد خطة تنفيذ مفصلة مع الجداول الزمنية والموارد المطلوبة والمسؤوليات",
			descriptionEn: "Preparing detailed implementation plan with timelines, required resources, and responsibilities"
		},
		{
			title: "المراقبة والتقييم",
			titleEn: "Monitoring and Evaluation",
			description: "وضع نظام مراقبة مستمر لقياس الأداء وتقييم النتائج وإجراء التحسينات اللازمة",
			descriptionEn: "Establishing continuous monitoring system to measure performance, evaluate results, and make necessary improvements"
		}
	];
  
	const caseStudies = [
		{
			title: "خطة السفر للمجمع الطبي",
			titleEn: "Medical Complex Travel Plan",
			description: "تطوير خطة سفر شاملة لمجمع طبي يضم 5000 موظف مع تقليل 40% من رحلات المركبات الفردية",
			descriptionEn: "Comprehensive travel plan for medical complex with 5000 employees achieving 40% reduction in single-occupancy vehicle trips",
			location: "المدينة الطبية الكبرى",
			locationEn: "Major Medical City",
			duration: "8 أشهر",
			durationEn: "8 months",
			team: "7 متخصصين",
			teamEn: "7 specialists"
		},
		{
			title: "خطة التنقل للجامعة",
			titleEn: "University Mobility Plan",
			description: "خطة تنقل متكاملة لجامعة تضم 25,000 طالب وموظف مع نظام حافلات ذكي ومسارات دراجات",
			descriptionEn: "Integrated mobility plan for university with 25,000 students and staff featuring smart bus system and cycling paths",
			location: "الحرم الجامعي الرئيسي",
			locationEn: "Main University Campus",
			duration: "12 شهراً",
			durationEn: "12 months",
			team: "9 متخصصين",
			teamEn: "9 specialists"
		},
		{
			title: "خطة سفر المنطقة الصناعية",
			titleEn: "Industrial Zone Travel Plan",
			description: "تطوير خطة سفر للمنطقة الصناعية تخدم 15 شركة مع 8000 موظف ونظام نقل مشترك",
			descriptionEn: "Travel plan for industrial zone serving 15 companies with 8000 employees and shared transport system",
			location: "المنطقة الصناعية الشرقية",
			locationEn: "Eastern Industrial Zone",
			duration: "10 أشهر",
			durationEn: "10 months",
			team: "8 متخصصين",
			teamEn: "8 specialists"
		}
	];
  
	const stats = [
		{
			value: "60+",
			label: "خطة سفر مطورة",
			labelEn: "Travel Plans Developed"
		},
		{
			value: "35%",
			label: "متوسط تقليل المركبات الفردية",
			labelEn: "Average Single-Vehicle Reduction"
		},
		{
			value: "150K+",
			label: "مستفيد من الخطط",
			labelEn: "Plan Beneficiaries"
		},
		{
			value: "92%",
			label: "معدل تحقيق الأهداف",
			labelEn: "Target Achievement Rate"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'تطوير خطط السفر' : 'Travel Plan Development'}
	subtitle={($locale || 'en') === 'ar' ? 'تصميم استراتيجيات تنقل مستدامة وذكية للمؤسسات والمرافق' : 'Designing sustainable and smart mobility strategies for organizations and facilities'}
	description={($locale || 'en') === 'ar' ? 'خدمات تطوير خطط السفر المتخصصة لتصميم وتنفيذ استراتيجيات التنقل المستدامة التي تقلل من الاعتماد على المركبات الخاصة وتعزز استخدام وسائل النقل البديلة والصديقة للبيئة' : 'Specialized travel plan development services for designing and implementing sustainable mobility strategies that reduce private vehicle dependency and promote alternative eco-friendly transport modes'}
	icon="🚌"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>