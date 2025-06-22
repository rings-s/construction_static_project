<!-- src/routes/traffic-engineering/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import { ArrowRight, CheckCircle, MapPin, Clock, Users, BarChart3, Target, Zap, Shield, Cpu, Settings, TrendingUp } from 'lucide-svelte';
    import { APP_CONFIG } from '$lib/config/app.js';
  
    let mounted = $state(false);
    let visibleSections = $state(new Set());
  
    onMount(() => {
      mounted = true;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              visibleSections.add(entry.target.id);
              visibleSections = new Set(visibleSections);
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
  
      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
      });
  
      return () => observer.disconnect();
    });
  
    const services = [
      {
        icon: BarChart3,
        title: 'نمذجة المرور',
        titleEn: 'Traffic Modeling',
        description: 'نمذجة متقدمة لأنماط المرور وتحليل التدفق باستخدام أحدث التقنيات',
        descriptionEn: 'Advanced traffic pattern modeling and flow analysis using latest technologies',
        href: '/traffic-engineering/traffic-modeling',
        features: ['المحاكاة المجهرية', 'التحليلات المدعومة بالذكاء الاصطناعي', 'تخطيط السيناريو', 'التحليلات التنبؤية']
      },
      {
        icon: Target,
        title: 'تقييم المرور',
        titleEn: 'Traffic Assessment',
        description: 'تقييم شامل لظروف المرور الحالية وتحليل الأداء',
        descriptionEn: 'Comprehensive assessment of current traffic conditions and performance analysis',
        href: '/traffic-engineering/traffic-assessment',
        features: ['مراجعة شاملة', 'تحليل الأداء', 'تحديد المشاكل', 'حلول محسنة']
      },
      {
        icon: Settings,
        title: 'تقييم تأثير المرور',
        titleEn: 'Traffic Impact Assessment',
        description: 'تحليل تأثير المشاريع الجديدة على المرور وتطوير تدابير التخفيف',
        descriptionEn: 'Analysis of new development traffic impacts and mitigation measure development',
        href: '/traffic-engineering/traffic-impact-assessment',
        features: ['تحليل تأثير التطوير', 'توليد الرحلات', 'تقييم الشبكة', 'تدابير التخفيف']
      },
      {
        icon: Cpu,
        title: 'أنظمة النقل الذكية',
        titleEn: 'ITS (Intelligent Transport Systems)',
        description: 'حلول النقل الذكي والتكنولوجيا المتقدمة لإدارة المرور',
        descriptionEn: 'Smart transport solutions and advanced technology for traffic management',
        href: '/traffic-engineering/its',
        features: ['التحكم التكيفي', 'البنية التحتية المتصلة', 'المراقبة الذكية', 'التحسين المدعوم بالذكاء الاصطناعي']
      },
      {
        icon: Shield,
        title: 'هندسة السلامة المرورية',
        titleEn: 'Road Safety Engineering',
        description: 'تصميم وتحسين السلامة المرورية لحماية جميع مستخدمي الطريق',
        descriptionEn: 'Road safety design and improvement to protect all road users',
        href: '/traffic-engineering/road-safety-engineering',
        features: ['أنظمة الإنذار المبكر', 'تصميم الطرق الآمنة', 'تحليل الحوادث', 'برامج السلامة']
      },
      {
        icon: TrendingUp,
        title: 'مبادرة إدارة المرور',
        titleEn: 'Traffic Management Initiative',
        description: 'مبادرات شاملة لإدارة المرور وتحسين الكفاءة التشغيلية',
        descriptionEn: 'Comprehensive traffic management initiatives to improve operational efficiency',
        href: '/traffic-engineering/traffic-management-initiative',
        features: ['استراتيجيات شاملة', 'تحسين التشغيل', 'إدارة الطلب', 'تطبيقات ذكية']
      },
      {
        icon: Zap,
        title: 'تحليل مسار الكسح',
        titleEn: 'Swept Path Analysis',
        description: 'تحليل دقيق لمسارات المركبات الكبيرة وحركات الدوران',
        descriptionEn: 'Precise analysis of large vehicle paths and turning movements',
        href: '/traffic-engineering/swept-path-analysis',
        features: ['تحليل مسار دقيق', 'تصميم التقاطعات', 'مركبات متخصصة', 'محاكاة ثلاثية الأبعاد']
      }
    ];
  
    const projects = [
      {
        title: 'نظام إدارة المرور الذكي لمدينة الرياض',
        titleEn: 'Riyadh Smart Traffic Management System',
        description: 'تطوير نظام إدارة مرور ذكي يغطي 200+ تقاطع مع التحكم التكيفي',
        descriptionEn: 'Smart traffic management system covering 200+ intersections with adaptive control',
        location: 'الرياض، المملكة العربية السعودية',
        locationEn: 'Riyadh, Saudi Arabia',
        duration: '30 شهراً',
        durationEn: '30 months',
        team: '25 متخصص',
        teamEn: '25 specialists'
      },
      {
        title: 'تحليل السلامة المرورية للطرق السريعة',
        titleEn: 'Highway Safety Analysis Project',
        description: 'تحليل شامل للسلامة على شبكة الطرق السريعة وتطوير حلول متقدمة',
        descriptionEn: 'Comprehensive safety analysis of highway network and advanced solution development',
        location: 'المنطقة الشرقية، المملكة العربية السعودية',
        locationEn: 'Eastern Province, Saudi Arabia',
        duration: '18 شهراً',
        durationEn: '18 months',
        team: '15 متخصص',
        teamEn: '15 specialists'
      },
      {
        title: 'نمذجة المرور للمراكز التجارية الكبرى',
        titleEn: 'Major Shopping Centers Traffic Modeling',
        description: 'نمذجة مرور متقدمة لـ 8 مراكز تجارية كبرى لتحسين التدفق',
        descriptionEn: 'Advanced traffic modeling for 8 major shopping centers to improve flow',
        location: 'جدة، المملكة العربية السعودية',
        locationEn: 'Jeddah, Saudi Arabia',
        duration: '12 شهراً',
        durationEn: '12 months',
        team: '10 متخصصين',
        teamEn: '10 specialists'
      }
    ];
  
    const stats = [
      { value: '300+', label: 'تحليل مروري', labelEn: 'Traffic Analyses' },
      { value: '150+', label: 'نموذج محاكاة', labelEn: 'Simulation Models' },
      { value: '40%', label: 'تحسين التدفق', labelEn: 'Flow Improvement' },
      { value: '60%', label: 'تحسين السلامة', labelEn: 'Safety Improvement' }
    ];
  
    function isVisible(sectionId) {
      return visibleSections.has(sectionId);
    }
  </script>
  
  <svelte:head>
    <title>{($locale || 'en') === 'ar' ? 'هندسة المرور - حلول المرور الذكية' : 'Traffic Engineering - Smart Traffic Solutions'} - {APP_CONFIG.name}</title>
    <meta name="description" content="{($locale || 'en') === 'ar' ? 'حلول هندسة مرور متقدمة للتحديات المعقدة في النقل' : 'Advanced traffic engineering solutions for complex transportation challenges'}" />
  </svelte:head>
  
  <!-- Hero Section with Traffic Animation -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-slate-800 to-red-900">
    
    <!-- Traffic Engineering Background -->
    <div class="absolute inset-0 opacity-20">
      <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#991b1b;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        
        <!-- Traffic Signal Animation -->
        {#each Array(8) as _, i}
          <g class="traffic-signal-{i}" transform="translate({150 + i * 130},{200})">
            <rect x="-10" y="0" width="20" height="80" rx="10" fill="#374151" opacity="0.8"/>
            <!-- Red Light -->
            <circle cx="0" cy="15" r="6" fill="#dc2626" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="{3 + i * 0.5}s" repeatCount="indefinite"/>
            </circle>
            <!-- Yellow Light -->
            <circle cx="0" cy="40" r="6" fill="#f59e0b" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="{3 + i * 0.5}s" repeatCount="indefinite" begin="{1 + i * 0.5}s"/>
            </circle>
            <!-- Green Light -->
            <circle cx="0" cy="65" r="6" fill="#059669" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="{3 + i * 0.5}s" repeatCount="indefinite" begin="{2 + i * 0.5}s"/>
            </circle>
          </g>
        {/each}
        
        <!-- Traffic Flow Lines -->
        <g class="traffic-flow">
          <path d="M0,350 L1200,350" stroke="url(#trafficGradient)" stroke-width="6" fill="none" opacity="0.6" class="traffic-line-1"/>
          <path d="M0,450 L1200,450" stroke="url(#trafficGradient)" stroke-width="4" fill="none" opacity="0.5" class="traffic-line-2"/>
          <path d="M0,550 L1200,550" stroke="url(#trafficGradient)" stroke-width="3" fill="none" opacity="0.4" class="traffic-line-3"/>
        </g>
        
        <!-- Moving Vehicles -->
        {#each Array(6) as _, i}
          <g class="vehicle-{i}">
            <rect x="-15" y="-5" width="30" height="10" rx="2" fill="#dc2626" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" 
                              values="0,{350 + i * 50}; 1200,{350 + i * 50}; 0,{350 + i * 50}" 
                              dur="{8 + i * 2}s" repeatCount="indefinite"/>
            </rect>
          </g>
        {/each}
      </svg>
    </div>
  
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        
        <!-- Badge -->
        <div class={`inline-flex items-center px-6 py-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 text-red-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <BarChart3 class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span class="mr-2 rtl:ml-2 rtl:mr-0">🚦</span>
          {($locale || 'en') === 'ar' ? 'هندسة المرور المتقدمة' : 'Advanced Traffic Engineering'}
        </div>
        
        <!-- Title -->
        <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            <span class="block bg-gradient-to-r from-red-400 via-white to-red-400 bg-clip-text text-transparent">
              {($locale || 'en') === 'ar' ? 'هندسة المرور' : 'Traffic Engineering'}
            </span>
          </h1>
        </div>
        
        <!-- Description -->
        <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
            {($locale || 'en') === 'ar' 
              ? 'نقدم حلول هندسة مرور متقدمة تستخدم أحدث التقنيات والذكاء الاصطناعي لتحسين تدفق المرور وضمان السلامة'
              : 'We provide advanced traffic engineering solutions using cutting-edge technology and AI to optimize traffic flow and ensure safety'
            }
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Services Grid -->
  <section id="services" data-animate class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {($locale || 'en') === 'ar' ? 'خدمات هندسة المرور' : 'Traffic Engineering Services'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'حلول متطورة لتحديات المرور المعقدة باستخدام أحدث التقنيات والأساليب المبتكرة'
            : 'Advanced solutions for complex traffic challenges using latest technologies and innovative approaches'
          }
        </p>
      </div>
  
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each services as service, index}
          <div class={`group bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${isVisible('services') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
            <div class="p-8">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svelte:component this={service.icon} class="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {($locale || 'en') === 'ar' ? service.title : service.titleEn}
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
              </p>
              
              <ul class="space-y-2 mb-6">
                {#each service.features as feature}
                  <li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle class="w-4 h-4 text-red-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                    {feature}
                  </li>
                {/each}
              </ul>
              
              <a 
                href={service.href} 
                class="inline-flex items-center text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors group"
              >
                {($locale || 'en') === 'ar' ? 'اعرف أكثر' : 'Learn More'}
                <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Stats Section -->
  <section class="py-24 bg-gradient-to-r from-red-600 to-slate-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each stats as stat, index}
          <div class="text-center animate-scale-in" style="animation-delay: {index * 0.2}s;">
            <div class="text-4xl lg:text-5xl font-black text-white mb-2">
              {stat.value}
            </div>
            <div class="text-red-100 font-medium">
              {($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Featured Projects -->
  <section id="projects" data-animate class="py-24 bg-slate-50 dark:bg-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {($locale || 'en') === 'ar' ? 'مشاريع مميزة في هندسة المرور' : 'Featured Traffic Engineering Projects'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'عرض خبرتنا من خلال تنفيذ مشاريع هندسة المرور المتطورة والناجحة'
            : 'Showcasing our expertise through advanced and successful traffic engineering implementations'
          }
        </p>
      </div>
  
      <div class="grid lg:grid-cols-3 gap-8">
        {#each projects as project, index}
          <div class={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${isVisible('projects') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
            <div class="h-48 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center">
              <span class="text-6xl">🚦</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {($locale || 'en') === 'ar' ? project.title : project.titleEn}
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {($locale || 'en') === 'ar' ? project.description : project.descriptionEn}
              </p>
              
              <div class="grid grid-cols-3 gap-4 text-center border-t border-slate-200 dark:border-slate-700 pt-4">
                <div>
                  <MapPin class="w-4 h-4 text-red-600 dark:text-red-400 mx-auto mb-1" />
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    {($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
                  </div>
                  <div class="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {($locale || 'en') === 'ar' ? project.location : project.locationEn}
                  </div>
                </div>
                <div>
                  <Clock class="w-4 h-4 text-red-600 dark:text-red-400 mx-auto mb-1" />
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    {($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
                  </div>
                  <div class="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {($locale || 'en') === 'ar' ? project.duration : project.durationEn}
                  </div>
                </div>
                <div>
                  <Users class="w-4 h-4 text-red-600 dark:text-red-400 mx-auto mb-1" />
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    {($locale || 'en') === 'ar' ? 'الفريق' : 'Team'}
                  </div>
                  <div class="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {($locale || 'en') === 'ar' ? project.team : project.teamEn}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {($locale || 'en') === 'ar' ? 'هل تحتاج حلول هندسة مرور متقدمة؟' : 'Need Advanced Traffic Engineering Solutions?'}
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
        {($locale || 'en') === 'ar'
          ? 'خبراء هندسة المرور لدينا جاهزون لحل التحديات المعقدة وتحسين أنظمة النقل'
          : 'Our traffic engineering experts are ready to solve complex challenges and improve transport systems'
        }
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/contact" 
          class="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
        >
          {($locale || 'en') === 'ar' ? 'احصل على استشارة' : 'Get Consultation'}
          <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </a>
        <a 
          href="/about" 
          class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {($locale || 'en') === 'ar' ? 'تعرف على خبرتنا' : 'Learn About Our Expertise'}
        </a>
      </div>
    </div>
  </section>
  
  <style>
    /* Animation Keyframes */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes trafficFlow {
      0% { stroke-dasharray: 0 1000; }
      100% { stroke-dasharray: 1000 0; }
    }
    
    /* Animation Classes */
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
    
    /* Traffic Animation */
    .traffic-line-1 {
      stroke-dasharray: 30 15;
      animation: trafficFlow 3s linear infinite;
    }
    
    .traffic-line-2 {
      stroke-dasharray: 20 10;
      animation: trafficFlow 4s linear infinite reverse;
    }
    
    .traffic-line-3 {
      stroke-dasharray: 15 8;
      animation: trafficFlow 5s linear infinite;
    }
  </style>