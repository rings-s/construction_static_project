<!-- src/routes/transport-planning/technical-rebuttals/+page.svelte -->
<script>
	import { locale } from 'svelte-i18n';
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { Shield, FileCheck, Search, Users, Clock, CheckCircle, AlertTriangle, Award } from 'lucide-svelte';
  
	const features = [
		{
			icon: Shield,
			title: "المراجعة التقنية المتخصصة",
			titleEn: "Expert Technical Review",
			description: "مراجعة شاملة للتعليقات والملاحظات التقنية من قبل خبراء متخصصين في مجال هندسة النقل",
			descriptionEn: "Comprehensive review of technical comments and observations by specialized transport engineering experts"
		},
		{
			icon: FileCheck,
			title: "إعداد الردود الشاملة",
			titleEn: "Comprehensive Response Preparation",
			description: "إعداد ردود تقنية مفصلة ومدعومة بالأدلة العلمية والمعايير الهندسية المعتمدة",
			descriptionEn: "Preparation of detailed technical responses supported by scientific evidence and approved engineering standards"
		},
		{
			icon: Search,
			title: "التحقق من الامتثال للمعايير",
			titleEn: "Standards Compliance Verification",
			description: "التأكد من مطابقة التصاميم والحلول المقترحة للمعايير والمواصفات المحلية والدولية",
			descriptionEn: "Ensuring proposed designs and solutions comply with local and international standards and specifications"
		},
		{
			icon: Users,
			title: "تنسيق مراجعة الأقران",
			titleEn: "Peer Review Coordination",
			description: "تنسيق عمليات مراجعة الأقران والتعامل مع التعليقات من الخبراء والمراجعين المستقلين",
			descriptionEn: "Coordinating peer review processes and addressing comments from experts and independent reviewers"
		},
		{
			icon: Clock,
			title: "الاستجابة السريعة",
			titleEn: "Rapid Response",
			description: "تقديم ردود سريعة ودقيقة ضمن المواعيد المحددة لضمان عدم تأخير المشاريع",
			descriptionEn: "Providing fast and accurate responses within specified deadlines to ensure projects are not delayed"
		},
		{
			icon: CheckCircle,
			title: "ضمان الجودة",
			titleEn: "Quality Assurance",
			description: "تطبيق إجراءات صارمة لضمان الجودة في جميع الردود والوثائق التقنية المقدمة",
			descriptionEn: "Implementing strict quality assurance procedures for all responses and technical documents submitted"
		},
		{
			icon: AlertTriangle,
			title: "تقييم المخاطر",
			titleEn: "Risk Assessment",
			description: "تحديد وتقييم المخاطر المحتملة المرتبطة بالتعليقات التقنية ووضع استراتيجيات التخفيف",
			descriptionEn: "Identifying and assessing potential risks associated with technical comments and developing mitigation strategies"
		},
		{
			icon: Award,
			title: "الخبرة المتقدمة",
			titleEn: "Advanced Expertise",
			description: "الاستفادة من خبرة واسعة في التعامل مع أعقد التحديات التقنية والتنظيمية",
			descriptionEn: "Leveraging extensive experience in handling the most complex technical and regulatory challenges"
		}
	];
  
	const benefits = [
		{
			text: "الحفاظ على المصداقية المهنية والتقنية",
			textEn: "Maintaining professional and technical credibility"
		},
		{
			text: "ضمان الامتثال للمتطلبات التنظيمية",
			textEn: "Ensuring compliance with regulatory requirements"
		},
		{
			text: "تقليل المخاطر القانونية والتقنية",
			textEn: "Reducing legal and technical risks"
		},
		{
			text: "تحسين جودة التصاميم والحلول",
			textEn: "Improving quality of designs and solutions"
		},
		{
			text: "توفير الوقت والجهد للفرق الداخلية",
			textEn: "Saving time and effort for internal teams"
		},
		{
			text: "تجنب التأخير في الموافقات",
			textEn: "Avoiding delays in approvals"
		},
		{
			text: "تعزيز الثقة مع الجهات التنظيمية",
			textEn: "Building confidence with regulatory authorities"
		},
		{
			text: "الحصول على دعم خبراء متخصصين",
			textEn: "Accessing specialized expert support"
		}
	];
  
	const process = [
		{
			title: "تحليل التعليقات",
			titleEn: "Comment Analysis",
			description: "مراجعة وتحليل شامل لجميع التعليقات والملاحظات التقنية الواردة",
			descriptionEn: "Comprehensive review and analysis of all received technical comments and observations"
		},
		{
			title: "إعداد الاستراتيجية",
			titleEn: "Strategy Preparation",
			description: "تطوير استراتيجية الرد المناسبة مع تحديد النقاط الرئيسية للمعالجة",
			descriptionEn: "Developing appropriate response strategy with identification of key points for addressing"
		},
		{
			title: "كتابة الردود التقنية",
			titleEn: "Technical Response Writing",
			description: "إعداد الردود التقنية المفصلة مع الإشارة للمعايير والمراجع المناسبة",
			descriptionEn: "Preparing detailed technical responses with reference to appropriate standards and references"
		},
		{
			title: "المراجعة والتسليم",
			titleEn: "Review and Submission",
			description: "مراجعة نهائية للردود وتسليمها ضمن المواعيد المحددة مع المتابعة",
			descriptionEn: "Final review of responses and submission within specified deadlines with follow-up"
		}
	];
  
	const caseStudies = [
		{
			title: "رد على مراجعة تصميم الطريق السريع",
			titleEn: "Highway Design Review Response",
			description: "إعداد رد شامل على 45 تعليقاً تقنياً من الجهة المنظمة حول تصميم طريق سريع بطول 25 كم",
			descriptionEn: "Comprehensive response to 45 technical comments from regulatory authority on 25km highway design",
			location: "مشروع الطريق الساحلي",
			locationEn: "Coastal Highway Project",
			duration: "6 أسابيع",
			durationEn: "6 weeks",
			team: "8 متخصصين",
			teamEn: "8 specialists"
		},
		{
			title: "الرد على دراسة تأثير المرور",
			titleEn: "Traffic Impact Study Response",
			description: "معالجة تعليقات مراجعة الأقران على دراسة تأثير مروري لتطوير تجاري كبير",
			descriptionEn: "Addressing peer review comments on traffic impact study for major commercial development",
			location: "المركز التجاري الكبير",
			locationEn: "Major Shopping Center",
			duration: "4 أسابيع",
			durationEn: "4 weeks",
			team: "5 متخصصين",
			teamEn: "5 specialists"
		},
		{
			title: "رد على المراجعة البيئية",
			titleEn: "Environmental Review Response",
			description: "إعداد ردود تقنية على تقييم الأثر البيئي لمشروع نفق حضري تحت النهر",
			descriptionEn: "Technical responses to environmental impact assessment for urban tunnel project under river",
			location: "نفق النهر الحضري",
			locationEn: "Urban River Tunnel",
			duration: "8 أسابيع",
			durationEn: "8 weeks",
			team: "10 متخصصين",
			teamEn: "10 specialists"
		}
	];
  
	const stats = [
		{
			value: "200+",
			label: "رد تقني مكتمل",
			labelEn: "Technical Responses Completed"
		},
		{
			value: "95%",
			label: "معدل القبول",
			labelEn: "Acceptance Rate"
		},
		{
			value: "72",
			label: "ساعة متوسط الاستجابة",
			labelEn: "Hours Average Response Time"
		},
		{
			value: "100%",
			label: "التسليم في الوقت المحدد",
			labelEn: "On-Time Delivery"
		}
	];
</script>

<ServicePageLayout
	title={($locale || 'en') === 'ar' ? 'الردود التقنية' : 'Technical Rebuttals'}
	subtitle={($locale || 'en') === 'ar' ? 'ردود تقنية متخصصة ومدعومة بالأدلة العلمية' : 'Specialized technical responses supported by scientific evidence'}
	description={($locale || 'en') === 'ar' ? 'خدمات الردود التقنية المتخصصة للتعامل مع التعليقات والملاحظات التقنية من الجهات التنظيمية والمراجعين مع ضمان الامتثال للمعايير والحفاظ على جودة المشاريع' : 'Specialized technical rebuttal services for addressing technical comments and observations from regulatory authorities and reviewers while ensuring standards compliance and maintaining project quality'}
	icon="📋"
	{features}
	{benefits}
	{process}
	{caseStudies}
	{stats}
/>