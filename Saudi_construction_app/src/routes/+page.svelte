<!-- src/routes/+page.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Users, Award, Globe, Zap } from 'lucide-svelte';
	
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import TestimonialSection from '$lib/components/TestimonialSection.svelte';
	import { APP_CONFIG, COMPANY_STATS } from '$lib/config/app.js';
  
	const services = [
	  {
		title: 'تخطيط النقل',
		titleEn: 'Transport Planning',
		description: 'خدمات تخطيط النقل الاستراتيجية للحلول المستدامة والفعالة للتنقل',
		descriptionEn: 'Strategic transport planning services for sustainable and efficient mobility solutions',
		href: '/transport-planning',
		icon: '🗺️',
		features: ['دراسات الجدوى', 'التخطيط الرئيسي', 'الوصول للموقع', 'خطط السفر']
	  },
	  {
		title: 'هندسة المرور',
		titleEn: 'Traffic Engineering',
		description: 'حلول هندسة مرور متقدمة للتحديات المعقدة في النقل',
		descriptionEn: 'Advanced traffic engineering solutions for complex transportation challenges',
		href: '/traffic-engineering',
		icon: '🚦',
		features: ['نمذجة المرور', 'تقييم التأثير', 'حلول ITS', 'هندسة السلامة']
	  },
	  {
		title: 'هندسة الطرق السريعة',
		titleEn: 'Highway Engineering',
		description: 'خدمات شاملة لتصميم وهندسة الطرق السريعة لتطوير البنية التحتية الحديثة',
		descriptionEn: 'Comprehensive highway design and engineering services for modern infrastructure development',
		href: '/highway-engineering', 
		icon: '🛣️',
		features: ['تصميم مواقف السيارات', 'إدارة المرور', 'تصميم التقاطعات', 'الحلول المستدامة']
	  }
	];
  
	// Use COMPANY_STATS from config
	const stats = COMPANY_STATS.map(stat => ({
	  value: stat.number,
	  label: ($locale || 'en') === 'ar' ? stat.label : stat.labelEn
	}));
  
	const features = [
	  {
		icon: Users,
		title: ($locale || 'en') === 'ar' ? 'فريق خبراء' : 'Expert Team',
		description: ($locale || 'en') === 'ar' ? 'مهندسون ومخططون مؤهلون تأهيلاً عالياً مع خبرة واسعة في الصناعة' : 'Highly qualified engineers and planners with extensive industry experience'
	  },
	  {
		icon: Award,
		title: ($locale || 'en') === 'ar' ? 'حائز على جوائز' : 'Award Winning',
		description: ($locale || 'en') === 'ar' ? 'معترف به للتميز في هندسة النقل والحلول المبتكرة' : 'Recognized for excellence in transport engineering and innovative solutions'
	  },
	  {
		icon: Globe,
		title: ($locale || 'en') === 'ar' ? 'انتشار عالمي' : 'Global Reach',
		description: ($locale || 'en') === 'ar' ? 'مشاريع دولية عبر أسواق وبيئات تنظيمية متنوعة' : 'International projects across diverse markets and regulatory environments'
	  },
	  {
		icon: Zap,
		title: ($locale || 'en') === 'ar' ? 'الابتكار أولاً' : 'Innovation First',
		description: ($locale || 'en') === 'ar' ? 'تكنولوجيا وأساليب متطورة لنتائج مشاريع متفوقة' : 'Cutting-edge technology and methodologies for superior project outcomes'
	  }
	];
  </script>
  
  <svelte:head>
	<title>{APP_CONFIG.name} - {($locale || 'en') === 'ar' ? APP_CONFIG.tagline : APP_CONFIG.taglineEn}</title>
	<meta name="description" content="{($locale || 'en') === 'ar' ? APP_CONFIG.description : APP_CONFIG.descriptionEn}" />
  </svelte:head>
  
  <!-- Hero Section -->
  <Hero />
  
  <!-- Services Overview -->
  <section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'خدماتنا الأساسية' : 'Our Core Services'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
		  {($locale || 'en') === 'ar' 
			? 'حلول هندسة النقل الشاملة المصممة لمواجهة تحديات تطوير البنية التحتية الحديثة'
			: 'Comprehensive transport engineering solutions designed to meet the challenges of modern infrastructure development'
		  }
		</p>
	  </div>
  
	  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each services as service}
		  <ServiceCard {service} />
		{/each}
	  </div>
	</div>
  </section>
  
  <!-- Stats Section -->
  <StatsSection {stats} />
  
  <!-- Features Section -->
  <section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	  <div class="text-center mb-16">
		<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
		  {($locale || 'en') === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
		</h2>
		<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
		  {($locale || 'en') === 'ar' 
			? 'نجمع بين الخبرة التقنية والأساليب المبتكرة لتقديم نتائج استثنائية لكل مشروع'
			: 'We combine technical expertise with innovative approaches to deliver exceptional results for every project'
		  }
		</p>
	  </div>
  
	  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
		{#each features as feature}
		  <div class="text-center group">
			<div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
			  <svelte:component this={feature.icon} class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
			</div>
			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
			  {feature.title}
			</h3>
			<p class="text-slate-600 dark:text-slate-300">
			  {feature.description}
			</p>
		  </div>
		{/each}
	  </div>
	</div>
  </section>
  
  <!-- Testimonials -->
  <TestimonialSection />
  
  <!-- CTA Section -->
  <section class="py-24 bg-gradient-to-r from-emerald-600 to-slate-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
	  <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
		{($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروعك؟' : 'Ready to Start Your Project?'}
	  </h2>
	  <p class="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
		{($locale || 'en') === 'ar' 
		  ? 'دع فريقنا من الخبراء يساعدك في إنشاء حلول نقل مبتكرة تحقق النجاح'
		  : 'Let our expert team help you create innovative transport solutions that drive success'
		}
	  </p>
	  <div class="flex flex-col sm:flex-row gap-4 justify-center">
		<a 
		  href="/contact" 
		  class="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors group"
		>
		  {($locale || 'en') === 'ar' ? 'ابدأ اليوم' : 'Get Started Today'}
		  <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
		</a>
		<a 
		  href="/services" 
		  class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors"
		>
		  {($locale || 'en') === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
		</a>
	  </div>
	</div>
  </section>