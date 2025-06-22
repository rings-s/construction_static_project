<script>
	import ServicePageLayout from '$lib/components/ServicePageLayout.svelte';
	import { locale } from 'svelte-i18n';

	const features = [
		{
			title: "Highway Design",
			titleAr: "تصميم الطرق السريعة",
			description: "Comprehensive highway design services including geometric design, pavement design, and drainage systems.",
			descriptionAr: "خدمات شاملة لتصميم الطرق السريعة تشمل التصميم الهندسي وتصميم الرصف وأنظمة الصرف",
			image: '/images/services/highway-engineering.jpg'
		},
		{
			title: "Car Park Design",
			titleAr: "تصميم مواقف السيارات",
			description: "Efficient and sustainable parking solutions with optimal space utilization and smart technology integration.",
			descriptionAr: "حلول مواقف سيارات فعالة ومستدامة مع الاستفادة المثلى من المساحة ودمج التقنيات الذكية",
			image: '/images/services/car-park-design.jpg'
		},
		{
			title: "Traffic Management Plans",
			titleAr: "خطط إدارة المرور",
			description: "Comprehensive traffic management strategies for construction zones and special events.",
			descriptionAr: "استراتيجيات شاملة لإدارة المرور في مناطق البناء والفعاليات الخاصة",
			image: '/images/services/traffic-management-plans.jpg'
		},
		{
			title: "Junction Design",
			titleAr: "تصميم التقاطعات",
			description: "Advanced intersection and junction design for optimal traffic flow and safety.",
			descriptionAr: "تصميم متقدم للتقاطعات والوصلات لتحقيق التدفق المروري الأمثل والسلامة",
			image: '/images/services/highway-junction.jpg'
		},
		{
			title: "Sustainable Transport",
			titleAr: "النقل المستدام",
			description: "Environmentally conscious transportation solutions promoting green infrastructure.",
			descriptionAr: "حلول نقل صديقة للبيئة تعزز البنية التحتية الخضراء",
			image: '/images/services/sustainable-transport.jpg'
		}
	];

	const benefits = [
		"Improved traffic flow and capacity",
		"Enhanced safety for all road users",
		"Reduced environmental impact",
		"Cost-effective design solutions",
		"Compliance with international standards",
		"Future-ready infrastructure planning"
	];

	const benefitsAr = [
		"تحسين تدفق المرور والطاقة الاستيعابية",
		"تعزيز السلامة لجميع مستخدمي الطرق",
		"تقليل التأثير البيئي",
		"حلول تصميم فعالة من حيث التكلفة",
		"الامتثال للمعايير الدولية",
		"تخطيط بنية تحتية جاهزة للمستقبل"
	];

	const process = [
		{ 
			title: "Site Analysis", 
			titleAr: "تحليل الموقع",
			description: "Comprehensive assessment of existing conditions and constraints",
			descriptionAr: "تقييم شامل للظروف والقيود الحالية"
		},
		{ 
			title: "Design Development", 
			titleAr: "تطوير التصميم",
			description: "Creation of detailed engineering designs and specifications",
			descriptionAr: "إنشاء تصاميم هندسية ومواصفات مفصلة"
		},
		{ 
			title: "Stakeholder Consultation", 
			titleAr: "استشارة أصحاب المصلحة",
			description: "Engagement with clients and regulatory authorities",
			descriptionAr: "التعامل مع العملاء والسلطات التنظيمية"
		},
		{ 
			title: "Implementation Support", 
			titleAr: "دعم التنفيذ",
			description: "Construction oversight and project management",
			descriptionAr: "الإشراف على البناء وإدارة المشاريع"
		}
	];

	const caseStudies = [
		{
			title: "Major Highway Expansion",
			titleAr: "توسعة طريق سريع رئيسي",
			description: "Complete redesign and expansion of a 15km highway section with new interchanges.",
			descriptionAr: "إعادة تصميم وتوسيع كاملة لقسم طريق سريع بطول 15 كم مع تقاطعات جديدة",
			location: "National Highway",
			locationAr: "الطريق الوطني",
			duration: "24 months",
			durationAr: "24 شهراً",
			team: "15 specialists",
			teamAr: "15 أخصائي",
			image: '/images/projects/highway-interchange.jpg'
		},
		{
			title: "Urban Arterial Upgrade",
			titleAr: "ترقية شريان حضري",
			description: "Modernization of urban arterial road with improved intersections and cycling infrastructure.",
			descriptionAr: "تحديث طريق شرياني حضري مع تحسين التقاطعات وبنية تحتية للدراجات",
			location: "City Center",
			locationAr: "وسط المدينة",
			duration: "18 months",
			durationAr: "18 شهراً",
			team: "12 specialists",
			teamAr: "12 أخصائي",
			image: '/images/projects/urban-intersection.jpg'
		},
		{
			title: "Smart Highway Corridor",
			titleAr: "ممر طريق سريع ذكي",
			description: "Implementation of intelligent transportation systems along a major corridor.",
			descriptionAr: "تنفيذ أنظمة النقل الذكية على طول ممر رئيسي",
			location: "Metropolitan Area",
			locationAr: "المنطقة الحضرية",
			duration: "30 months",
			durationAr: "30 شهراً",
			team: "20 specialists",
			teamAr: "20 أخصائي",
			image: '/images/projects/smart-traffic-system.jpg'
		}
	];

	const stats = [
		{ value: "200+", label: "Highway Projects", labelAr: "مشاريع طرق سريعة" },
		{ value: "1,000+", label: "Kilometers Designed", labelAr: "كيلومتر مصمم" },
		{ value: "99%", label: "Safety Compliance", labelAr: "الامتثال للسلامة" },
		{ value: "20+", label: "Years Experience", labelAr: "سنة من الخبرة" }
	];
</script>

<ServicePageLayout
	title="Highway Engineering"
	titleAr="هندسة الطرق السريعة"
	subtitle="Comprehensive highway engineering solutions for modern transportation infrastructure"
	subtitleAr="حلول شاملة لهندسة الطرق السريعة للبنية التحتية للنقل الحديثة"
	description="Expert highway engineering services including design, planning, and implementation of road infrastructure projects that prioritize safety, efficiency, and sustainability."
	descriptionAr="خدمات هندسة طرق سريعة متخصصة تشمل التصميم والتخطيط والتنفيذ لمشاريع البنية التحتية للطرق التي تعطي الأولوية للسلامة والكفاءة والاستدامة"
	heroImage="/images/services/highway-engineering.jpg"
	{features}
	{benefits}
	{benefitsAr}
	{process}
	{caseStudies}
	{stats}
>
	<!-- Additional content section -->
	<section class="py-24 bg-slate-50 dark:bg-slate-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
					{($locale || 'en') === 'ar' ? 'خدمات هندسة الطرق السريعة' : 'Highway Engineering Services'}
				</h2>
				<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
					{($locale || 'en') === 'ar' ? 'مجموعة شاملة من الخدمات المتخصصة' : 'Complete range of specialized services'}
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				<a href="/highway-engineering/car-park-design" class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="w-full h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden">
						<img 
							src="/images/services/car-park-design.jpg" 
							alt={($locale || 'en') === 'ar' ? 'تصميم مواقف السيارات' : 'Car Park Design'}
							class="w-full h-full object-cover rounded-xl"
							loading="lazy"
						/>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
						{($locale || 'en') === 'ar' ? 'تصميم مواقف السيارات' : 'Car Park Design'}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">
						{($locale || 'en') === 'ar' ? 'حلول مواقف سيارات مبتكرة وفعالة' : 'Innovative and efficient parking solutions'}
					</p>
				</a>

				<a href="/highway-engineering/traffic-management-plans" class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="w-full h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden">
						<img 
							src="/images/services/traffic-management-plans.jpg" 
							alt={($locale || 'en') === 'ar' ? 'خطط إدارة المرور' : 'Traffic Management Plans'}
							class="w-full h-full object-cover rounded-xl"
							loading="lazy"
						/>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
						{($locale || 'en') === 'ar' ? 'خطط إدارة المرور' : 'Traffic Management Plans'}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">
						{($locale || 'en') === 'ar' ? 'استراتيجيات إدارة مرور شاملة' : 'Comprehensive traffic management strategies'}
					</p>
				</a>

				<a href="/highway-engineering/highway-junction-design" class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="w-full h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden">
						<img 
							src="/images/services/highway-junction.jpg" 
							alt={($locale || 'en') === 'ar' ? 'تصميم التقاطعات' : 'Junction Design'}
							class="w-full h-full object-cover rounded-xl"
							loading="lazy"
						/>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
						{($locale || 'en') === 'ar' ? 'تصميم التقاطعات' : 'Junction Design'}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">
						{($locale || 'en') === 'ar' ? 'تصميم تقاطعات متقدمة للسلامة والكفاءة' : 'Advanced intersection design for safety and efficiency'}
					</p>
				</a>

				<a href="/highway-engineering/sustainable-transport" class="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="w-full h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden">
						<img 
							src="/images/services/sustainable-transport.jpg" 
							alt={($locale || 'en') === 'ar' ? 'النقل المستدام' : 'Sustainable Transport'}
							class="w-full h-full object-cover rounded-xl"
							loading="lazy"
						/>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
						{($locale || 'en') === 'ar' ? 'النقل المستدام' : 'Sustainable Transport'}
					</h3>
					<p class="text-slate-600 dark:text-slate-300 text-sm">
						{($locale || 'en') === 'ar' ? 'حلول نقل صديقة للبيئة' : 'Environmentally friendly transport solutions'}
					</p>
				</a>
			</div>
		</div>
	</section>
</ServicePageLayout>