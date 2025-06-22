<!-- src/routes/transport-planning/transport-statement-assessment/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { FileText, BarChart3, MapPin, CheckCircle, Users, Car, Shield, Clock } from 'lucide-svelte';
  
	const features = [
		{
			icon: FileText,
			title: "إعداد البيانات التفصيلية",
			titleEn: "Detailed Statement Preparation",
			description: "إعداد بيانات نقل شاملة ومفصلة تلبي متطلبات السلطات التخطيطية والتنظيمية",
			descriptionEn: "Comprehensive and detailed transport statement preparation meeting planning and regulatory authority requirements"
		},
		{
			icon: BarChart3,
			title: "تحليل توليد المرور",
			titleEn: "Traffic Generation Analysis",
			description: "تحليل دقيق لكمية المرور المتوقعة من التطوير المقترح باستخدام أحدث المعايير والطرق",
			descriptionEn: "Accurate analysis of expected traffic generation from proposed development using latest standards and methodologies"
		},
		{
			icon: MapPin,
			title: "تقييم ترتيبات الوصول",
			titleEn: "Access Arrangement Assessment",
			description: "تقييم شامل لترتيبات الوصول والدخول مع ضمان السلامة والكفاءة التشغيلية",
			descriptionEn: "Comprehensive assessment of access and entry arrangements ensuring safety and operational efficiency"
		},
		{
			icon: CheckCircle,
			title: "تقييم الامتثال للسياسات",
			titleEn: "Policy Compliance Assessment",
			description: "فحص الامتثال لسياسات النقل المحلية والوطنية والمعايير التخطيطية المعتمدة",
			descriptionEn: "Examination of compliance with local and national transport policies and approved planning standards"
		},
		{
			icon: Users,
			title: "تحليل إمكانية الوصول",
			titleEn: "Accessibility Analysis",
			description: "تقييم إمكانية الوصول بوسائل النقل المختلفة بما في ذلك النقل العام والمشي وركوب الدراجات",
			descriptionEn: "Assessment of accessibility by different transport modes including public transport, walking, and cycling"
		},
		{
			icon: Car,
			title: "تحليل الاحتياجات للمواقف",
			titleEn: "Parking Requirements Analysis",
			description: "تحديد وتبرير متطلبات مواقف السيارات وفقاً للمعايير المحلية واحتياجات التطوير",
			descriptionEn: "Determination and justification of parking requirements according to local standards and development needs"
		},
		{
			icon: Shield,
			title: "تقييم السلامة المرورية",
			titleEn: "Traffic Safety Assessment",
			description: "تحليل تأثيرات التطوير على السلامة المرورية مع اقتراح التدابير التخفيفية المناسبة",
			descriptionEn: "Analysis of development impacts on traffic safety with appropriate mitigation measures proposals"
		},
		{
			icon: Clock,
			title: "إدارة المراحل التطويرية",
			titleEn: "Development Phasing Management",
			description: "تحليل التأثيرات المرورية لمختلف مراحل التطوير مع خطط إدارة الإنشاء",
			descriptionEn: "Analysis of traffic impacts for different development phases with construction management plans"
		}
	];
  
	const benefits = [
		{
			text: "تسريع عملية الحصول على التراخيص التخطيطية",
			textEn: "Accelerating planning permission approval process"
		},
		{
			text: "ضمان الامتثال للمتطلبات التنظيمية والقانونية",
			textEn: "Ensuring compliance with regulatory and legal requirements"
		},
		{
			text: "تقليل مخاطر رفض الطلبات التخطيطية",
			textEn: "Reducing risks of planning application rejections"
		},
		{
			text: "توفير أساس قوي للتفاوض مع السلطات",
			textEn: "Providing strong foundation for negotiations with authorities"
		},
		{
			text: "تحسين جودة وقابلية التطوير للاستدامة",
			textEn: "Improving development quality and sustainability viability"
		},
		{
			text: "تحديد وحل المشاكل المرورية المحتملة مبكراً",
			textEn: "Early identification and resolution of potential traffic issues"
		},
		{
			text: "دعم قرارات التطوير بأدلة علمية موثقة",
			textEn: "Supporting development decisions with documented scientific evidence"
		},
		{
			text: "تحسين العلاقة مع أصحاب المصلحة المحليين",
			textEn: "Improving relationships with local stakeholders"
		}
	];
  
	const process = [
		{
			title: "جمع المعلومات والمسوحات",
			titleEn: "Data Collection and Surveys",
			description: "جمع البيانات الأساسية وإجراء المسوحات المرورية والموقعية اللازمة",
			descriptionEn: "Collecting baseline data and conducting necessary traffic and site surveys"
		},
		{
			title: "التحليل والتقييم",
			titleEn: "Analysis and Assessment",
			description: "تحليل البيانات وتقييم التأثيرات المرورية المتوقعة من التطوير المقترح",
			descriptionEn: "Analyzing data and assessing expected traffic impacts from proposed development"
		},
		{
			title: "إعداد البيان",
			titleEn: "Statement Preparation",
			description: "كتابة البيان التفصيلي مع جميع التحليلات والتوصيات والرسوم التوضيحية",
			descriptionEn: "Writing detailed statement with all analyses, recommendations, and illustrative drawings"
		},
		{
			title: "المراجعة والتقديم",
			titleEn: "Review and Submission",
			description: "مراجعة نهائية للبيان وتقديمه للسلطات مع المتابعة والرد على الاستفسارات",
			descriptionEn: "Final review of statement and submission to authorities with follow-up and query responses"
		}
	];
  
	const caseStudies = [
		{
			title: "بيان نقل للمجمع التجاري",
			titleEn: "Commercial Complex Transport Statement",
			description: "إعداد بيان نقل شامل لمجمع تجاري بمساحة 50,000 م² مع تحليل توليد 2000 رحلة يومية",
			descriptionEn: "Comprehensive transport statement for 50,000 m² commercial complex analyzing 2000 daily trip generation",
			location: "المنطقة التجارية المركزية",
			locationEn: "Central Business District",
			duration: "3 أشهر",
			durationEn: "3 months",
			team: "6 متخصصين",
			teamEn: "6 specialists"
		},
		{
			title: "تقييم نقل للمجتمع السكني",
			titleEn: "Residential Community Transport Assessment",
			description: "بيان نقل لمجتمع سكني من 1200 وحدة مع تحليل شامل للوصول ومتطلبات المواقف",
			descriptionEn: "Transport statement for 1200-unit residential community with comprehensive access and parking analysis",
			location: "الضاحية الجديدة",
			locationEn: "New Suburban Area",
			duration: "4 أشهر",
			durationEn: "4 months",
			team: "5 متخصصين",
			teamEn: "5 specialists"
		},
		{
			title: "بيان نقل للمرافق التعليمية",
			titleEn: "Educational Facility Transport Statement",
			description: "تقييم نقل متكامل لحرم جامعي جديد يستوعب 15,000 طالب مع خطة إدارة المرور",
			descriptionEn: "Integrated transport assessment for new university campus accommodating 15,000 students with traffic management plan",
			location: "الحرم الجامعي الجديد",
			locationEn: "New University Campus",
			duration: "6 أشهر",
			durationEn: "6 months",
			team: "8 متخصصين",
			teamEn: "8 specialists"
		}
	];
  
	const stats = [
		{
			value: "180+",
			label: "بيان نقل مكتمل",
			labelEn: "Transport Statements Completed"
		},
		{
			value: "96%",
			label: "معدل الموافقة",
			labelEn: "Approval Success Rate"
		},
		{
			value: "30",
			label: "يوم متوسط التسليم",
			labelEn: "Days Average Delivery"
		},
		{
			value: "100%",
			label: "الامتثال للمعايير",
			labelEn: "Standards Compliance"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'تقييم بيانات النقل' : 'Transport Statement Assessment'}
	subtitle={($locale || 'en') === 'ar' ? 'إعداد بيانات نقل شاملة للطلبات التخطيطية والتطويرية' : 'Comprehensive transport statement preparation for planning and development applications'}
	description={($locale || 'en') === 'ar' ? 'خدمات تقييم وإعداد بيانات النقل المتخصصة للمشاريع التطويرية لضمان الامتثال للمتطلبات التخطيطية وتسريع عملية الحصول على التراخيص مع تحليل شامل للتأثيرات المرورية' : 'Specialized transport statement assessment and preparation services for development projects ensuring planning requirement compliance and accelerating licensing processes with comprehensive traffic impact analysis'}
	icon="📄"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>