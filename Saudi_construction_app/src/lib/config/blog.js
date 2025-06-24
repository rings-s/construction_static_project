// src/lib/config/blog.js

// Blog Images Configuration
export const BLOG_IMAGES = {
	// Featured articles
	'highway-safety-2024': '/images/blog/highway-safety-innovations.jpg',
	'smart-traffic-systems': '/images/blog/smart-traffic-management.jpg',
	'sustainable-transport': '/images/blog/sustainable-transport-solutions.jpg',
	'urban-planning-trends': '/images/blog/urban-planning-2024.jpg',
	'traffic-flow-optimization': '/images/blog/traffic-flow-analysis.jpg',
	'autonomous-vehicles': '/images/blog/autonomous-vehicle-infrastructure.jpg',
	'green-infrastructure': '/images/blog/green-transport-infrastructure.jpg',
	'digital-twins': '/images/blog/digital-twins-transport.jpg',
	'accessibility-design': '/images/blog/accessible-transport-design.jpg',
	'climate-resilience': '/images/blog/climate-resilient-transport.jpg',
	'data-analytics': '/images/blog/transport-data-analytics.jpg',
	'multimodal-integration': '/images/blog/multimodal-transport-hubs.jpg',
	
	// Default images
	default: '/images/blog/default-transport-engineering.jpg',
	featured: '/images/blog/featured-articles-banner.jpg'
};

// Blog Categories Configuration
export const BLOG_CATEGORIES = [
	{
		slug: 'all',
		name: 'جميع المقالات',
		nameEn: 'All Articles',
		count: 24
	},
	{
		slug: 'highway-engineering',
		name: 'هندسة الطرق السريعة',
		nameEn: 'Highway Engineering',
		count: 8
	},
	{
		slug: 'traffic-engineering',
		name: 'هندسة المرور',
		nameEn: 'Traffic Engineering',
		count: 9
	},
	{
		slug: 'transport-planning',
		name: 'تخطيط النقل',
		nameEn: 'Transport Planning',
		count: 7
	}
];

// Blog Posts Data
export const BLOG_POSTS = [
	{
		id: 1,
		slug: 'highway-safety-innovations-2024',
		title: 'ابتكارات السلامة المرورية على الطرق السريعة في عام 2024',
		titleEn: 'Highway Safety Innovations in 2024: Revolutionary Technologies',
		excerpt: 'استكشاف أحدث التقنيات والابتكارات في مجال السلامة المرورية على الطرق السريعة، بما في ذلك الأنظمة الذكية والتحليلات التنبؤية.',
		excerptEn: 'Exploring the latest technologies and innovations in highway safety, including smart systems and predictive analytics that are transforming road safety.',
		content: `
			<p>تشهد صناعة النقل والطرق السريعة تطوراً هائلاً في مجال السلامة المرورية، حيث تتسارع وتيرة الابتكار لتقديم حلول متقدمة تهدف إلى تقليل الحوادث وإنقاذ الأرواح.</p>
			
			<h2>التقنيات الذكية الجديدة</h2>
			<p>تتضمن الابتكارات الجديدة أنظمة الاستشعار المتقدمة التي يمكنها رصد الظروف المرورية في الوقت الفعلي وتحليل البيانات لتوقع المخاطر المحتملة.</p>
			
			<h3>الأنظمة التنبؤية</h3>
			<p>استخدام الذكاء الاصطناعي وتعلم الآلة لتحليل أنماط الحوادث والتنبؤ بالمناطق عالية الخطورة قبل وقوع الحوادث.</p>
			
			<blockquote>
				"الاستثمار في تقنيات السلامة المرورية ليس فقط استثماراً في البنية التحتية، بل استثمار في حياة الأشخاص ومستقبل النقل المستدام."
			</blockquote>
			
			<h2>التطبيقات العملية</h2>
			<p>من خلال تطبيق هذه التقنيات، يمكن تحقيق انخفاض كبير في معدلات الحوادث وتحسين كفاءة النقل بشكل عام.</p>
		`,
		contentEn: `
			<p>The transportation and highway industry is experiencing tremendous development in traffic safety, with accelerating innovation to provide advanced solutions aimed at reducing accidents and saving lives.</p>
			
			<h2>New Smart Technologies</h2>
			<p>New innovations include advanced sensor systems that can monitor traffic conditions in real-time and analyze data to predict potential risks.</p>
			
			<h3>Predictive Systems</h3>
			<p>Using artificial intelligence and machine learning to analyze accident patterns and predict high-risk areas before accidents occur.</p>
			
			<blockquote>
				"Investment in traffic safety technologies is not just an investment in infrastructure, but an investment in people's lives and the future of sustainable transportation."
			</blockquote>
			
			<h2>Practical Applications</h2>
			<p>Through the application of these technologies, a significant reduction in accident rates and improved transportation efficiency can be achieved.</p>
		`,
		category: 'هندسة الطرق السريعة',
		categoryEn: 'Highway Engineering',
		tags: ['السلامة المرورية', 'التقنيات الذكية', 'الذكاء الاصطناعي', 'الطرق السريعة'],
		tagsEn: ['Traffic Safety', 'Smart Technology', 'Artificial Intelligence', 'Highways'],
		author: 'د. أحمد الشهراني',
		authorEn: 'Dr. Ahmed Al-Shahrani',
		authorBio: 'خبير في هندسة الطرق السريعة والسلامة المرورية مع أكثر من 15 عاماً من الخبرة في المملكة العربية السعودية والمملكة المتحدة.',
		authorBioEn: 'Expert in highway engineering and traffic safety with over 15 years of experience in Saudi Arabia and the United Kingdom.',
		date: '2024-01-15',
		readTime: '8 دقائق',
		readTimeEn: '8 min read',
		views: 2450,
		likes: 89,
		featured: true,
		image: 'highway-safety-2024'
	},
	{
		id: 2,
		slug: 'smart-traffic-management-systems',
		title: 'أنظمة إدارة المرور الذكية: مستقبل النقل الحضري',
		titleEn: 'Smart Traffic Management Systems: The Future of Urban Transportation',
		excerpt: 'كيف تغير أنظمة إدارة المرور الذكية من طريقة تنقلنا في المدن، وما هي التقنيات المستخدمة لتحسين تدفق المرور.',
		excerptEn: 'How smart traffic management systems are changing the way we move in cities, and what technologies are used to improve traffic flow.',
		content: `
			<p>تمثل أنظمة إدارة المرور الذكية ثورة حقيقية في عالم النقل الحضري، حيث تستخدم التقنيات المتقدمة لتحسين كفاءة الحركة المرورية.</p>
			
			<h2>المكونات الأساسية</h2>
			<p>تشمل هذه الأنظمة كاميرات المراقبة الذكية، وأجهزة الاستشعار، وأنظمة التحكم في الإشارات المرورية التكيفية.</p>
			
			<h3>الفوائد المتحققة</h3>
			<ul>
				<li>تقليل أوقات الانتظار بنسبة تصل إلى 40%</li>
				<li>خفض استهلاك الوقود والانبعاثات</li>
				<li>تحسين السلامة المرورية</li>
				<li>تحسين تجربة المستخدم</li>
			</ul>
		`,
		contentEn: `
			<p>Smart traffic management systems represent a real revolution in urban transportation, using advanced technologies to improve traffic flow efficiency.</p>
			
			<h2>Key Components</h2>
			<p>These systems include smart surveillance cameras, sensors, and adaptive traffic signal control systems.</p>
			
			<h3>Achieved Benefits</h3>
			<ul>
				<li>Reduce waiting times by up to 40%</li>
				<li>Reduce fuel consumption and emissions</li>
				<li>Improve traffic safety</li>
				<li>Enhance user experience</li>
			</ul>
		`,
		category: 'هندسة المرور',
		categoryEn: 'Traffic Engineering',
		tags: ['إدارة المرور', 'المدن الذكية', 'التقنيات الحديثة', 'الكفاءة'],
		tagsEn: ['Traffic Management', 'Smart Cities', 'Modern Technology', 'Efficiency'],
		author: 'م. فاطمة العتيبي',
		authorEn: 'Eng. Fatima Al-Otaibi',
		authorBio: 'مهندسة مرور متخصصة في أنظمة النقل الذكية مع خبرة 10 سنوات في تطوير الحلول المبتكرة.',
		authorBioEn: 'Traffic engineer specializing in intelligent transportation systems with 10 years of experience in developing innovative solutions.',
		date: '2024-01-10',
		readTime: '6 دقائق',
		readTimeEn: '6 min read',
		views: 1890,
		likes: 67,
		featured: true,
		image: 'smart-traffic-systems'
	},
	{
		id: 3,
		slug: 'sustainable-transport-solutions',
		title: 'حلول النقل المستدام: نحو مستقبل أخضر',
		titleEn: 'Sustainable Transport Solutions: Towards a Green Future',
		excerpt: 'استكشاف الحلول المبتكرة للنقل المستدام وتأثيرها على البيئة والمجتمع في المملكة العربية السعودية.',
		excerptEn: 'Exploring innovative sustainable transport solutions and their impact on the environment and society in Saudi Arabia.',
		content: `
			<p>مع تزايد الوعي البيئي والحاجة لتقليل الانبعاثات الكربونية، تبرز أهمية تطوير حلول النقل المستدام كأولوية قصوى.</p>
			
			<h2>الحلول المبتكرة</h2>
			<p>تشمل الحلول المستدامة وسائل النقل العام الكهربائية، والدراجات المشتركة، وتطوير البنية التحتية للمشاة.</p>
			
			<h3>التحديات والفرص</h3>
			<p>رغم التحديات التقنية والمالية، تتيح رؤية المملكة 2030 فرصاً استثنائية لتطوير قطاع النقل المستدام.</p>
		`,
		contentEn: `
			<p>With increasing environmental awareness and the need to reduce carbon emissions, developing sustainable transport solutions emerges as a top priority.</p>
			
			<h2>Innovative Solutions</h2>
			<p>Sustainable solutions include electric public transport, shared bicycles, and developing pedestrian infrastructure.</p>
			
			<h3>Challenges and Opportunities</h3>
			<p>Despite technical and financial challenges, Saudi Vision 2030 provides exceptional opportunities for developing the sustainable transport sector.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['النقل المستدام', 'البيئة', 'رؤية 2030', 'الطاقة المتجددة'],
		tagsEn: ['Sustainable Transport', 'Environment', 'Vision 2030', 'Renewable Energy'],
		author: 'د. محمد القحطاني',
		authorEn: 'Dr. Mohammed Al-Qahtani',
		authorBio: 'خبير في تخطيط النقل المستدام والتنمية الحضرية مع خبرة واسعة في المشاريع الخضراء.',
		authorBioEn: 'Expert in sustainable transport planning and urban development with extensive experience in green projects.',
		date: '2024-01-05',
		readTime: '10 دقائق',
		readTimeEn: '10 min read',
		views: 3120,
		likes: 124,
		featured: true,
		image: 'sustainable-transport'
	},
	{
		id: 4,
		slug: 'urban-planning-trends-2024',
		title: 'اتجاهات التخطيط الحضري في عام 2024',
		titleEn: 'Urban Planning Trends in 2024',
		excerpt: 'نظرة على أحدث اتجاهات التخطيط الحضري وتأثيرها على تطوير المدن الذكية والمستدامة.',
		excerptEn: 'A look at the latest urban planning trends and their impact on smart and sustainable city development.',
		content: `
			<p>يشهد مجال التخطيط الحضري تطورات مثيرة في عام 2024، مع التركيز المتزايد على المدن الذكية والمستدامة.</p>
			
			<h2>المدن الذكية</h2>
			<p>تستخدم المدن الذكية التقنيات الرقمية لتحسين جودة الحياة وكفاءة الخدمات الحضرية.</p>
			
			<h3>التخطيط المتكامل</h3>
			<p>يركز التخطيط الحديث على التكامل بين وسائل النقل المختلفة والاستخدام المختلط للأراضي.</p>
		`,
		contentEn: `
			<p>Urban planning is experiencing exciting developments in 2024, with increasing focus on smart and sustainable cities.</p>
			
			<h2>Smart Cities</h2>
			<p>Smart cities use digital technologies to improve quality of life and efficiency of urban services.</p>
			
			<h3>Integrated Planning</h3>
			<p>Modern planning focuses on integration between different modes of transport and mixed land use.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['التخطيط الحضري', 'المدن الذكية', 'التنمية المستدامة', 'التقنيات الرقمية'],
		tagsEn: ['Urban Planning', 'Smart Cities', 'Sustainable Development', 'Digital Technology'],
		author: 'م. نورا الفيصل',
		authorEn: 'Eng. Nora Al-Faisal',
		authorBio: 'مخططة حضرية متخصصة في تطوير المدن الذكية والمستدامة.',
		authorBioEn: 'Urban planner specializing in smart and sustainable city development.',
		date: '2023-12-28',
		readTime: '7 دقائق',
		readTimeEn: '7 min read',
		views: 1654,
		likes: 78,
		featured: false,
		image: 'urban-planning-trends'
	},
	{
		id: 5,
		slug: 'traffic-flow-optimization-techniques',
		title: 'تقنيات تحسين تدفق المرور في المناطق الحضرية',
		titleEn: 'Traffic Flow Optimization Techniques in Urban Areas',
		excerpt: 'استراتيجيات متقدمة لتحسين تدفق المرور في المدن باستخدام النمذجة الرياضية والتحليل الذكي.',
		excerptEn: 'Advanced strategies for improving traffic flow in cities using mathematical modeling and intelligent analysis.',
		content: `
			<p>تحسين تدفق المرور في المناطق الحضرية يتطلب فهماً عميقاً لأنماط الحركة المرورية واستخدام التقنيات المتقدمة.</p>
			
			<h2>النمذجة الرياضية</h2>
			<p>استخدام النماذج الرياضية المعقدة لمحاكاة الحركة المرورية والتنبؤ بالاختناقات.</p>
			
			<h3>التحليل الذكي</h3>
			<p>تطبيق خوارزميات الذكاء الاصطناعي لتحليل البيانات المرورية وتطوير حلول مخصصة.</p>
		`,
		contentEn: `
			<p>Improving traffic flow in urban areas requires deep understanding of traffic patterns and use of advanced technologies.</p>
			
			<h2>Mathematical Modeling</h2>
			<p>Using complex mathematical models to simulate traffic movement and predict congestion.</p>
			
			<h3>Intelligent Analysis</h3>
			<p>Applying artificial intelligence algorithms to analyze traffic data and develop customized solutions.</p>
		`,
		category: 'هندسة المرور',
		categoryEn: 'Traffic Engineering',
		tags: ['تدفق المرور', 'النمذجة الرياضية', 'الذكاء الاصطناعي', 'التحليل'],
		tagsEn: ['Traffic Flow', 'Mathematical Modeling', 'Artificial Intelligence', 'Analysis'],
		author: 'د. خالد البراك',
		authorEn: 'Dr. Khalid Al-Barrak',
		authorBio: 'خبير في هندسة المرور والنمذجة الرياضية للأنظمة المرورية.',
		authorBioEn: 'Expert in traffic engineering and mathematical modeling of traffic systems.',
		date: '2023-12-20',
		readTime: '9 دقائق',
		readTimeEn: '9 min read',
		views: 2180,
		likes: 95,
		featured: false,
		image: 'traffic-flow-optimization'
	},
	{
		id: 6,
		slug: 'autonomous-vehicles-infrastructure',
		title: 'البنية التحتية للمركبات ذاتية القيادة',
		titleEn: 'Infrastructure for Autonomous Vehicles',
		excerpt: 'كيف تستعد البنية التحتية للطرق لاستقبال المركبات ذاتية القيادة والتحديات المصاحبة.',
		excerptEn: 'How road infrastructure is preparing for autonomous vehicles and the associated challenges.',
		content: `
			<p>المركبات ذاتية القيادة تتطلب بنية تحتية متطورة تدعم التواصل والملاحة الذكية.</p>
			
			<h2>متطلبات البنية التحتية</h2>
			<p>تشمل أنظمة الاتصالات اللاسلكية، وأجهزة الاستشعار المتقدمة، والإشارات الرقمية.</p>
			
			<h3>التحديات التقنية</h3>
			<p>من أبرز التحديات ضمان الأمان السيبراني وتطوير معايير موحدة للتشغيل البيني.</p>
		`,
		contentEn: `
			<p>Autonomous vehicles require advanced infrastructure that supports smart communication and navigation.</p>
			
			<h2>Infrastructure Requirements</h2>
			<p>Including wireless communication systems, advanced sensors, and digital signals.</p>
			
			<h3>Technical Challenges</h3>
			<p>Key challenges include ensuring cybersecurity and developing unified standards for interoperability.</p>
		`,
		category: 'هندسة الطرق السريعة',
		categoryEn: 'Highway Engineering',
		tags: ['المركبات ذاتية القيادة', 'البنية التحتية', 'التقنيات المتقدمة', 'الأمان'],
		tagsEn: ['Autonomous Vehicles', 'Infrastructure', 'Advanced Technology', 'Safety'],
		author: 'م. سارة الدوسري',
		authorEn: 'Eng. Sarah Al-Dosari',
		authorBio: 'مهندسة متخصصة في تقنيات النقل المتقدمة والمركبات الذكية.',
		authorBioEn: 'Engineer specializing in advanced transportation technologies and smart vehicles.',
		date: '2023-12-15',
		readTime: '11 دقائق',
		readTimeEn: '11 min read',
		views: 2890,
		likes: 112,
		featured: false,
		image: 'autonomous-vehicles'
	},
	{
		id: 7,
		slug: 'green-transport-infrastructure',
		title: 'البنية التحتية الخضراء للنقل',
		titleEn: 'Green Transport Infrastructure',
		excerpt: 'تطوير البنية التحتية الصديقة للبيئة وتأثيرها على تقليل البصمة الكربونية للنقل.',
		excerptEn: 'Developing environmentally friendly infrastructure and its impact on reducing transport carbon footprint.',
		content: `
			<p>البنية التحتية الخضراء للنقل تمثل الحل الأمثل لتحقيق التوازن بين احتياجات النقل والمحافظة على البيئة.</p>
			
			<h2>العناصر الأساسية</h2>
			<p>تشمل محطات الشحن الكهربائية، والطرق الشمسية، والمساحات الخضراء المدمجة.</p>
			
			<h3>الفوائد البيئية</h3>
			<p>تقليل الانبعاثات الكربونية وتحسين جودة الهواء في المناطق الحضرية.</p>
		`,
		contentEn: `
			<p>Green transport infrastructure represents the optimal solution for balancing transport needs with environmental conservation.</p>
			
			<h2>Key Elements</h2>
			<p>Including electric charging stations, solar roads, and integrated green spaces.</p>
			
			<h3>Environmental Benefits</h3>
			<p>Reducing carbon emissions and improving air quality in urban areas.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['البنية التحتية الخضراء', 'النقل المستدام', 'البيئة', 'الطاقة المتجددة'],
		tagsEn: ['Green Infrastructure', 'Sustainable Transport', 'Environment', 'Renewable Energy'],
		author: 'د. عبدالرحمن الشمري',
		authorEn: 'Dr. Abdulrahman Al-Shamri',
		authorBio: 'خبير في البنية التحتية المستدامة والتطوير الأخضر.',
		authorBioEn: 'Expert in sustainable infrastructure and green development.',
		date: '2023-12-10',
		readTime: '8 دقائق',
		readTimeEn: '8 min read',
		views: 1970,
		likes: 85,
		featured: false,
		image: 'green-infrastructure'
	},
	{
		id: 8,
		slug: 'digital-twins-transport-planning',
		title: 'التوائم الرقمية في تخطيط النقل',
		titleEn: 'Digital Twins in Transport Planning',
		excerpt: 'استخدام تقنية التوائم الرقمية لمحاكاة وتحسين أنظمة النقل قبل التنفيذ الفعلي.',
		excerptEn: 'Using digital twin technology to simulate and optimize transport systems before actual implementation.',
		content: `
			<p>التوائم الرقمية تمثل نقلة نوعية في مجال تخطيط النقل، حيث تتيح محاكاة دقيقة للأنظمة المعقدة.</p>
			
			<h2>كيف تعمل التقنية</h2>
			<p>إنشاء نسخة رقمية دقيقة من البنية التحتية للنقل مع تحديث مستمر للبيانات الفعلية.</p>
			
			<h3>التطبيقات العملية</h3>
			<p>تحسين التصميم، وتوقع المشاكل، واختبار الحلول قبل التنفيذ الفعلي.</p>
		`,
		contentEn: `
			<p>Digital twins represent a qualitative leap in transport planning, enabling accurate simulation of complex systems.</p>
			
			<h2>How the Technology Works</h2>
			<p>Creating an accurate digital copy of transport infrastructure with continuous updates of real data.</p>
			
			<h3>Practical Applications</h3>
			<p>Design improvement, problem prediction, and solution testing before actual implementation.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['التوائم الرقمية', 'المحاكاة', 'التقنيات الرقمية', 'التخطيط الذكي'],
		tagsEn: ['Digital Twins', 'Simulation', 'Digital Technology', 'Smart Planning'],
		author: 'م. ريم الغامدي',
		authorEn: 'Eng. Reem Al-Ghamdi',
		authorBio: 'مهندسة متخصصة في التقنيات الرقمية وتطبيقاتها في النقل.',
		authorBioEn: 'Engineer specializing in digital technologies and their applications in transportation.',
		date: '2023-11-30',
		readTime: '10 دقائق',
		readTimeEn: '10 min read',
		views: 2340,
		likes: 98,
		featured: false,
		image: 'digital-twins'
	},
	{
		id: 9,
		slug: 'accessible-transport-design',
		title: 'تصميم النقل الشامل والمتاح للجميع',
		titleEn: 'Inclusive and Accessible Transport Design',
		excerpt: 'أهمية تصميم أنظمة النقل التي تخدم جميع فئات المجتمع بما في ذلك ذوي الإعاقة وكبار السن.',
		excerptEn: 'The importance of designing transport systems that serve all segments of society including people with disabilities and elderly.',
		content: `
			<p>تصميم النقل الشامل يضمن حق الجميع في الوصول والتنقل بكرامة وسهولة.</p>
			
			<h2>المبادئ الأساسية</h2>
			<p>التصميم الشامل يراعي احتياجات جميع المستخدمين منذ البداية وليس كإضافة لاحقة.</p>
			
			<h3>الحلول التقنية</h3>
			<p>استخدام التقنيات المساعدة والتطبيقات الذكية لتحسين تجربة النقل للجميع.</p>
		`,
		contentEn: `
			<p>Inclusive transport design ensures everyone's right to access and move with dignity and ease.</p>
			
			<h2>Basic Principles</h2>
			<p>Universal design considers the needs of all users from the beginning, not as a later addition.</p>
			
			<h3>Technical Solutions</h3>
			<p>Using assistive technologies and smart applications to improve transport experience for everyone.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['التصميم الشامل', 'إمكانية الوصول', 'ذوي الإعاقة', 'العدالة الاجتماعية'],
		tagsEn: ['Universal Design', 'Accessibility', 'Disability', 'Social Justice'],
		author: 'د. هند الزهراني',
		authorEn: 'Dr. Hind Al-Zahrani',
		authorBio: 'خبيرة في التصميم الشامل وإمكانية الوصول في أنظمة النقل.',
		authorBioEn: 'Expert in universal design and accessibility in transport systems.',
		date: '2023-11-25',
		readTime: '7 دقائق',
		readTimeEn: '7 min read',
		views: 1456,
		likes: 63,
		featured: false,
		image: 'accessibility-design'
	},
	{
		id: 10,
		slug: 'climate-resilient-transport',
		title: 'النقل المقاوم للتغير المناخي',
		titleEn: 'Climate-Resilient Transport Systems',
		excerpt: 'تطوير أنظمة النقل التي يمكنها مواجهة تحديات التغير المناخي والظروف الجوية القاسية.',
		excerptEn: 'Developing transport systems that can face climate change challenges and extreme weather conditions.',
		content: `
			<p>مع تزايد تأثيرات التغير المناخي، تصبح الحاجة لأنظمة نقل مقاومة للمناخ أكثر إلحاحاً.</p>
			
			<h2>التحديات المناخية</h2>
			<p>ارتفاع درجات الحرارة، والفيضانات، والعواصف الرملية تؤثر على البنية التحتية للنقل.</p>
			
			<h3>استراتيجيات التكيف</h3>
			<p>تطوير مواد بناء مقاومة للحرارة وأنظمة تصريف متطورة للمياه.</p>
		`,
		contentEn: `
			<p>With increasing impacts of climate change, the need for climate-resilient transport systems becomes more urgent.</p>
			
			<h2>Climate Challenges</h2>
			<p>Rising temperatures, floods, and sandstorms affect transport infrastructure.</p>
			
			<h3>Adaptation Strategies</h3>
			<p>Developing heat-resistant building materials and advanced water drainage systems.</p>
		`,
		category: 'هندسة الطرق السريعة',
		categoryEn: 'Highway Engineering',
		tags: ['التغير المناخي', 'المقاومة المناخية', 'التكيف', 'الاستدامة'],
		tagsEn: ['Climate Change', 'Climate Resilience', 'Adaptation', 'Sustainability'],
		author: 'م. طارق المالكي',
		authorEn: 'Eng. Tariq Al-Malki',
		authorBio: 'مهندس متخصص في تصميم البنية التحتية المقاومة للظروف المناخية القاسية.',
		authorBioEn: 'Engineer specializing in designing infrastructure resistant to extreme weather conditions.',
		date: '2023-11-20',
		readTime: '9 دقائق',
		readTimeEn: '9 min read',
		views: 1789,
		likes: 74,
		featured: false,
		image: 'climate-resilience'
	},
	{
		id: 11,
		slug: 'transport-data-analytics',
		title: 'تحليل البيانات في قطاع النقل',
		titleEn: 'Data Analytics in Transportation Sector',
		excerpt: 'كيفية استخدام تحليل البيانات الضخمة لتحسين كفاءة أنظمة النقل واتخاذ قرارات مدروسة.',
		excerptEn: 'How to use big data analytics to improve transport system efficiency and make informed decisions.',
		content: `
			<p>تحليل البيانات يفتح آفاقاً جديدة لفهم أنماط النقل وتحسين الخدمات.</p>
			
			<h2>مصادر البيانات</h2>
			<p>تشمل أجهزة الاستشعار، وتطبيقات الهواتف الذكية، وكاميرات المراقبة، وبيانات المرور.</p>
			
			<h3>التطبيقات العملية</h3>
			<p>تحسين الجداول الزمنية، وتوقع الطلب، وتحليل الأداء التشغيلي.</p>
		`,
		contentEn: `
			<p>Data analytics opens new horizons for understanding transport patterns and improving services.</p>
			
			<h2>Data Sources</h2>
			<p>Including sensors, smartphone apps, surveillance cameras, and traffic data.</p>
			
			<h3>Practical Applications</h3>
			<p>Schedule optimization, demand forecasting, and operational performance analysis.</p>
		`,
		category: 'هندسة المرور',
		categoryEn: 'Traffic Engineering',
		tags: ['تحليل البيانات', 'البيانات الضخمة', 'الذكاء الاصطناعي', 'التحسين'],
		tagsEn: ['Data Analytics', 'Big Data', 'Artificial Intelligence', 'Optimization'],
		author: 'د. لؤي السبيعي',
		authorEn: 'Dr. Luay Al-Subaii',
		authorBio: 'خبير في تحليل البيانات وتطبيقاتها في مجال النقل والمرور.',
		authorBioEn: 'Expert in data analytics and its applications in transportation and traffic.',
		date: '2023-11-15',
		readTime: '8 دقائق',
		readTimeEn: '8 min read',
		views: 2156,
		likes: 87,
		featured: false,
		image: 'data-analytics'
	},
	{
		id: 12,
		slug: 'multimodal-transport-hubs',
		title: 'محاور النقل متعددة الوسائط',
		titleEn: 'Multimodal Transport Hubs',
		excerpt: 'تصميم وتطوير محاور النقل التي تربط بين وسائل النقل المختلفة لتحسين تجربة المسافرين.',
		excerptEn: 'Designing and developing transport hubs that connect different modes of transport to improve passenger experience.',
		content: `
			<p>محاور النقل متعددة الوسائط تمثل مستقبل النقل الحضري المتكامل والفعال.</p>
			
			<h2>مبادئ التصميم</h2>
			<p>التكامل السلس بين وسائل النقل المختلفة مع تحسين تجربة المستخدم والكفاءة التشغيلية.</p>
			
			<h3>الفوائد المحققة</h3>
			<p>تقليل أوقات التنقل وتحسين الاتصال بين المناطق المختلفة في المدينة.</p>
		`,
		contentEn: `
			<p>Multimodal transport hubs represent the future of integrated and efficient urban transport.</p>
			
			<h2>Design Principles</h2>
			<p>Seamless integration between different transport modes while improving user experience and operational efficiency.</p>
			
			<h3>Achieved Benefits</h3>
			<p>Reducing travel times and improving connectivity between different areas of the city.</p>
		`,
		category: 'تخطيط النقل',
		categoryEn: 'Transport Planning',
		tags: ['النقل متعدد الوسائط', 'محاور النقل', 'التكامل', 'تجربة المستخدم'],
		tagsEn: ['Multimodal Transport', 'Transport Hubs', 'Integration', 'User Experience'],
		author: 'م. منى العريفي',
		authorEn: 'Eng. Mona Al-Arifi',
		authorBio: 'مهندسة تخطيط نقل متخصصة في تصميم محاور النقل المتكاملة.',
		authorBioEn: 'Transport planning engineer specializing in integrated transport hub design.',
		date: '2023-11-10',
		readTime: '12 دقائق',
		readTimeEn: '12 min read',
		views: 1876,
		likes: 91,
		featured: false,
		image: 'multimodal-integration'
	}
];

// Helper Functions
export function getFeaturedPosts() {
	return BLOG_POSTS.filter(post => post.featured);
}

export function getBlogPostBySlug(slug) {
	return BLOG_POSTS.find(post => post.slug === slug);
}

export function getRelatedPosts(currentPostId, category, limit = 3) {
	return BLOG_POSTS
		.filter(post => 
			post.id !== currentPostId && 
			post.categoryEn === category
		)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, limit);
}

export function getPostsByCategory(category) {
	if (category === 'all') {
		return BLOG_POSTS;
	}
	return BLOG_POSTS.filter(post => 
		post.categoryEn.toLowerCase().replace(' ', '-') === category
	);
}

export function searchPosts(query) {
	const lowercaseQuery = query.toLowerCase();
	return BLOG_POSTS.filter(post => 
		post.title.toLowerCase().includes(lowercaseQuery) ||
		post.titleEn.toLowerCase().includes(lowercaseQuery) ||
		post.excerpt.toLowerCase().includes(lowercaseQuery) ||
		post.excerptEn.toLowerCase().includes(lowercaseQuery) ||
		post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
		post.tagsEn.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
		post.author.toLowerCase().includes(lowercaseQuery) ||
		post.authorEn.toLowerCase().includes(lowercaseQuery)
	);
}

export function getPopularPosts(limit = 5) {
	return BLOG_POSTS
		.sort((a, b) => b.views - a.views)
		.slice(0, limit);
}

export function getRecentPosts(limit = 5) {
	return BLOG_POSTS
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, limit);
}

export function getMostLikedPosts(limit = 5) {
	return BLOG_POSTS
		.sort((a, b) => b.likes - a.likes)
		.slice(0, limit);
}

// Export additional utilities
export const BLOG_CONFIG = {
	postsPerPage: 9,
	excerptLength: 150,
	defaultImage: BLOG_IMAGES.default,
	featuredImage: BLOG_IMAGES.featured
};