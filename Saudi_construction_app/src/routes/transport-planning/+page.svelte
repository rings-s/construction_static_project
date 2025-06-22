<!-- src/routes/transport-planning/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import { ArrowRight, CheckCircle, MapPin, Clock, Users, Target, BarChart3, Route, Building2, Zap } from 'lucide-svelte';
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
        icon: Route,
        title: 'الوصول للموقع',
        titleEn: 'Site Access',
        description: 'تصميم نقاط الوصول المثلى للمواقع الجديدة مع ضمان السلامة والكفاءة',
        descriptionEn: 'Optimal site access point design ensuring safety and efficiency for new developments',
        href: '/transport-planning/site-access',
        features: ['تحليل الرؤية', 'تقييم السلامة', 'تحليل السعة', 'التكامل متعدد الوسائط']
      },
      {
        icon: BarChart3,
        title: 'دراسات جدوى النقل',
        titleEn: 'Transport Feasibility Studies',
        description: 'دراسات شاملة لجدوى مشاريع النقل مع التحليل المالي والتقني',
        descriptionEn: 'Comprehensive transport project feasibility with financial and technical analysis',
        href: '/transport-planning/transport-feasibility-studies',
        features: ['تحليل السوق', 'النمذجة المالية', 'تخطيط التنفيذ', 'تقييم المخاطر']
      },
      {
        icon: Building2,
        title: 'التخطيط الرئيسي وتصميم النقل',
        titleEn: 'Master Planning & Transport Design',
        description: 'تخطيط شامل لأنظمة النقل المتكاملة والمستدامة',
        descriptionEn: 'Comprehensive planning for integrated and sustainable transport systems',
        href: '/transport-planning/master-planning',
        features: ['التصميم المتكامل', 'التخطيط المستدام', 'إشراك المجتمع', 'التطوير المرحلي']
      },
      {
        icon: Target,
        title: 'الردود التقنية',
        titleEn: 'Technical Rebuttals',
        description: 'ردود تقنية متخصصة لاعتراضات المشاريع والتحديات التنظيمية',
        descriptionEn: 'Expert technical responses to project objections and regulatory challenges',
        href: '/transport-planning/technical-rebuttals',
        features: ['التحليل القانوني', 'الأدلة التقنية', 'الحلول البديلة', 'الدعم الاستراتيجي']
      },
      {
        icon: CheckCircle,
        title: 'تقييم بيان النقل',
        titleEn: 'Transport Statement Assessment',
        description: 'تقييم وثائق النقل للمشاريع الجديدة وضمان الامتثال',
        descriptionEn: 'Assessment of transport documents for new projects ensuring compliance',
        href: '/transport-planning/transport-statement-assessment',
        features: ['مراجعة الامتثال', 'تحليل الأثر', 'التوثيق', 'دعم التطبيق']
      },
      {
        icon: Users,
        title: 'تطوير خطة السفر',
        titleEn: 'Travel Plan Development',
        description: 'خطط سفر مستدامة وفعالة لتقليل التأثير المروري',
        descriptionEn: 'Sustainable and effective travel plans to reduce traffic impact',
        href: '/transport-planning/travel-plan-development',
        features: ['استراتيجيات مستدامة', 'تعديل السلوك', 'المراقبة والتقييم', 'إشراك الموظفين']
      }
    ];
  
    const projects = [
      {
        title: 'خطة النقل الرئيسية لمدينة الرياض الجديدة',
        titleEn: 'New Riyadh City Master Transport Plan',
        description: 'تطوير خطة نقل شاملة لمدينة جديدة تخدم 500,000 نسمة',
        descriptionEn: 'Comprehensive transport plan development for new city serving 500,000 residents',
        location: 'الرياض، المملكة العربية السعودية',
        locationEn: 'Riyadh, Saudi Arabia',
        duration: '24 شهراً',
        durationEn: '24 months',
        team: '20 متخصص',
        teamEn: '20 specialists'
      },
      {
        title: 'دراسة جدوى قطار المدينة المنورة',
        titleEn: 'Madinah Metro Feasibility Study',
        description: 'دراسة شاملة لجدوى نظام قطار حضري لربط المواقع المقدسة',
        descriptionEn: 'Comprehensive feasibility study for urban rail system connecting holy sites',
        location: 'المدينة المنورة، المملكة العربية السعودية',
        locationEn: 'Madinah, Saudi Arabia',
        duration: '18 شهراً',
        durationEn: '18 months',
        team: '15 متخصص',
        teamEn: '15 specialists'
      },
      {
        title: 'تطوير خطط السفر للمجمعات التجارية',
        titleEn: 'Commercial Complex Travel Plans',
        description: 'خطط سفر مستدامة لـ 12 مجمع تجاري في المدن الرئيسية',
        descriptionEn: 'Sustainable travel plans for 12 commercial complexes in major cities',
        location: 'مدن متعددة، المملكة العربية السعودية',
        locationEn: 'Multiple cities, Saudi Arabia',
        duration: '12 شهراً',
        durationEn: '12 months',
        team: '8 متخصصين',
        teamEn: '8 specialists'
      }
    ];
  
    const stats = [
      { value: '150+', label: 'خطة نقل', labelEn: 'Transport Plans' },
      { value: '75+', label: 'دراسة جدوى', labelEn: 'Feasibility Studies' },
      { value: '200+', label: 'تقييم موقع', labelEn: 'Site Assessments' },
      { value: '95%', label: 'معدل النجاح', labelEn: 'Success Rate' }
    ];
  
    function isVisible(sectionId) {
      return visibleSections.has(sectionId);
    }
  </script>
  
  <svelte:head>
    <title>{($locale || 'en') === 'ar' ? 'تخطيط النقل - حلول التنقل المستدامة' : 'Transport Planning - Sustainable Mobility Solutions'} - {APP_CONFIG.name}</title>
    <meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تخطيط النقل الاستراتيجية للحلول المستدامة والفعالة للتنقل' : 'Strategic transport planning services for sustainable and efficient mobility solutions'}" />
  </svelte:head>
  
  <!-- Hero Section with Construction Animation -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900">
    
    <!-- Transport Planning Background -->
    <div class="absolute inset-0 opacity-20">
      <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="planningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#1e40af;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        
        <!-- Network Planning Lines -->
        <g class="planning-network">
          <path d="M0,200 Q300,100 600,200 T1200,200" stroke="url(#planningGradient)" stroke-width="4" fill="none" opacity="0.6" class="planning-line-1"/>
          <path d="M0,400 Q400,300 800,400 T1200,400" stroke="url(#planningGradient)" stroke-width="3" fill="none" opacity="0.5" class="planning-line-2"/>
          <path d="M0,600 Q200,500 400,600 T1200,600" stroke="url(#planningGradient)" stroke-width="2" fill="none" opacity="0.4" class="planning-line-3"/>
        </g>
        
        <!-- Planning Nodes -->
        {#each Array(15) as _, i}
          <g class="planning-node-{i}" transform="translate({80 + i * 80},{200 + Math.sin(i) * 200})">
            <circle r="8" fill="url(#planningGradient)" opacity="0.7">
              <animate attributeName="r" values="8;12;8" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
            </circle>
          </g>
        {/each}
        
        <!-- Route Planning Animation -->
        <g class="route-animation">
          <circle r="5" fill="#3b82f6" opacity="0.8">
            <animateMotion dur="8s" repeatCount="indefinite">
              <path d="M0,200 Q300,100 600,200 T1200,200"/>
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        
        <!-- Badge -->
        <div class={`inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <Route class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span class="mr-2 rtl:ml-2 rtl:mr-0">🗺️</span>
          {($locale || 'en') === 'ar' ? 'التخطيط الاستراتيجي للنقل' : 'Strategic Transport Planning'}
        </div>
        
        <!-- Title -->
        <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            <span class="block bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              {($locale || 'en') === 'ar' ? 'تخطيط النقل' : 'Transport Planning'}
            </span>
          </h1>
        </div>
        
        <!-- Description -->
        <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
            {($locale || 'en') === 'ar' 
              ? 'نقدم خدمات تخطيط النقل الاستراتيجية لإنشاء حلول تنقل مستدامة وفعالة تلبي احتياجات المجتمعات الحديثة'
              : 'We provide strategic transport planning services to create sustainable and efficient mobility solutions that meet the needs of modern communities'
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
          {($locale || 'en') === 'ar' ? 'خدمات تخطيط النقل' : 'Transport Planning Services'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'حلول شاملة مصممة لتلبية متطلبات التنقل المتطورة والمستدامة'
            : 'Comprehensive solutions designed to meet evolving and sustainable mobility requirements'
          }
        </p>
      </div>
  
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each services as service, index}
          <div class={`group bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${isVisible('services') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
            <div class="p-8">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svelte:component this={service.icon} class="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {($locale || 'en') === 'ar' ? service.title : service.titleEn}
              </h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
              </p>
              
              <ul class="space-y-2 mb-6">
                {#each service.features as feature}
                  <li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle class="w-4 h-4 text-blue-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                    {feature}
                  </li>
                {/each}
              </ul>
              
              <a 
                href={service.href} 
                class="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
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
  <section class="py-24 bg-gradient-to-r from-blue-600 to-slate-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each stats as stat, index}
          <div class="text-center animate-scale-in" style="animation-delay: {index * 0.2}s;">
            <div class="text-4xl lg:text-5xl font-black text-white mb-2">
              {stat.value}
            </div>
            <div class="text-blue-100 font-medium">
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
          {($locale || 'en') === 'ar' ? 'مشاريع مميزة في تخطيط النقل' : 'Featured Transport Planning Projects'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'عرض خبرتنا من خلال تنفيذ مشاريع تخطيط النقل الناجحة'
            : 'Showcasing our expertise through successful transport planning implementations'
          }
        </p>
      </div>
  
      <div class="grid lg:grid-cols-3 gap-8">
        {#each projects as project, index}
          <div class={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${isVisible('projects') ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
            <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
              <span class="text-6xl">🗺️</span>
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
                  <MapPin class="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    {($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
                  </div>
                  <div class="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {($locale || 'en') === 'ar' ? project.location : project.locationEn}
                  </div>
                </div>
                <div>
                  <Clock class="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    {($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
                  </div>
                  <div class="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {($locale || 'en') === 'ar' ? project.duration : project.durationEn}
                  </div>
                </div>
                <div>
                  <Users class="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
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
        {($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروع تخطيط النقل؟' : 'Ready to Start Your Transport Planning Project?'}
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
        {($locale || 'en') === 'ar'
          ? 'خبراء تخطيط النقل لدينا جاهزون لمساعدتك في إنشاء حلول تنقل مبتكرة ومستدامة'
          : 'Our transport planning experts are ready to help you create innovative, sustainable mobility solutions'
        }
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/contact" 
          class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
        >
          {($locale || 'en') === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
          <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </a>
        <a 
          href="/about" 
          class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {($locale || 'en') === 'ar' ? 'تعرف على فريقنا' : 'Learn About Our Team'}
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
    
    @keyframes planningLineFlow {
      to { stroke-dashoffset: -100; }
    }
    
    /* Animation Classes */
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
    
    /* Planning Animation */
    .planning-line-1 {
      stroke-dasharray: 20 10;
      animation: planningLineFlow 4s linear infinite;
    }
    
    .planning-line-2 {
      stroke-dasharray: 15 8;
      animation: planningLineFlow 5s linear infinite reverse;
    }
    
    .planning-line-3 {
      stroke-dasharray: 10 5;
      animation: planningLineFlow 6s linear infinite;
    }
  </style>