<!-- src/routes/services/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import { ArrowRight, CheckCircle, BarChart3, MessageSquare, Building2, Users, Target, Zap } from 'lucide-svelte';
    import { APP_CONFIG } from '$lib/config/app.js';
  
    let mounted = $state(false);
  
    onMount(() => {
      mounted = true;
    });
  
    const services = [
      {
        icon: BarChart3,
        title: 'تقييم الصناعة',
        titleEn: 'Industry Assessment',
        description: 'تحليل وتقييم شامل للقطاعات الصناعية ومتطلبات النقل',
        descriptionEn: 'Comprehensive analysis and assessment of industrial sectors and transport requirements',
        href: '/services/industry-assessment',
        features: ['تحليل السوق', 'معايير الأداء', 'الدعم الاستراتيجي', 'رسم خرائط أصحاب المصلحة']
      },
      {
        icon: MessageSquare,
        title: 'الاستشارة العامة والاجتماعات',
        titleEn: 'Public Consultation & Meeting',
        description: 'خدمات الاستشارة المجتمعية والعامة لضمان مشاركة فعالة',
        descriptionEn: 'Community and public consultation services ensuring effective stakeholder participation',
        href: '/services/public-consultation',
        features: ['إشراك أصحاب المصلحة', 'التواصل متعدد القنوات', 'خدمات التيسير', 'تحليل الملاحظات']
      }
    ];
  
    const allServices = [
      {
        category: 'تخطيط النقل',
        categoryEn: 'Transport Planning',
        icon: Building2,
        color: 'from-blue-500 to-blue-600',
        description: 'خدمات تخطيط النقل الاستراتيجية',
        descriptionEn: 'Strategic transport planning services',
        href: '/transport-planning',
        items: [
          'الوصول للموقع',
          'دراسات جدوى النقل', 
          'التخطيط الرئيسي',
          'الردود التقنية',
          'تقييم بيان النقل',
          'تطوير خطة السفر'
        ]
      },
      {
        category: 'هندسة المرور',
        categoryEn: 'Traffic Engineering',
        icon: Target,
        color: 'from-red-500 to-red-600',
        description: 'حلول هندسة مرور متقدمة',
        descriptionEn: 'Advanced traffic engineering solutions',
        href: '/traffic-engineering',
        items: [
          'نمذجة المرور',
          'تقييم المرور',
          'تقييم تأثير المرور',
          'أنظمة النقل الذكية',
          'هندسة السلامة المرورية',
          'مبادرة إدارة المرور',
          'تحليل مسار الكسح'
        ]
      },
      {
        category: 'هندسة الطرق السريعة',
        categoryEn: 'Highway Engineering',
        icon: Zap,
        color: 'from-emerald-500 to-emerald-600',
        description: 'تصميم وهندسة الطرق السريعة',
        descriptionEn: 'Highway design and engineering',
        href: '/highway-engineering',
        items: [
          'تصميم مواقف السيارات',
          'خطط إدارة المرور',
          'تصميم الطرق والتقاطعات',
          'النقل المستدام'
        ]
      }
    ];
  
    const stats = [
      { value: '500+', label: 'مشروع منجز', labelEn: 'Projects Completed' },
      { value: '20+', label: 'سنة خبرة', labelEn: 'Years Experience' },
      { value: '50+', label: 'عميل راضٍ', labelEn: 'Satisfied Clients' },
      { value: '15+', label: 'مدينة', labelEn: 'Cities Served' }
    ];
  </script>
  
  <svelte:head>
    <title>{($locale || 'en') === 'ar' ? 'خدماتنا - حلول هندسة النقل الشاملة' : 'Our Services - Comprehensive Transport Engineering Solutions'} - {APP_CONFIG.name}</title>
    <meta name="description" content="{($locale || 'en') === 'ar' ? 'اكتشف مجموعة خدماتنا الشاملة في هندسة النقل والطرق' : 'Discover our comprehensive range of transport and highway engineering services'}" />
  </svelte:head>
  
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900">
    
    <!-- Services Background -->
    <div class="absolute inset-0 opacity-20">
      <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#581c87;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        
        <!-- Service Network -->
        {#each Array(12) as _, i}
          <g class="service-hub-{i}" transform="translate({100 + i * 100},{150 + Math.sin(i * 2) * 200})">
            <circle r="20" fill="url(#servicesGradient)" opacity="0.6">
              <animate attributeName="r" values="20;30;20" dur="{4 + i * 0.3}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Service Icons -->
            <text x="0" y="8" text-anchor="middle" font-size="16" opacity="0.8">
              {i % 4 === 0 ? '🛣️' : i % 4 === 1 ? '🚦' : i % 4 === 2 ? '🗺️' : '⚙️'}
            </text>
            
            <!-- Connection Lines -->
            {#if i < 11}
              <line x1="20" y1="0" x2="80" y2="{Math.sin((i + 1) * 2) * 200 - Math.sin(i * 2) * 200}" 
                    stroke="url(#servicesGradient)" stroke-width="2" opacity="0.4"
                    class="service-connection" style="animation-delay: {i * 0.3}s;"/>
            {/if}
          </g>
        {/each}
      </svg>
    </div>
  
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        
        <!-- Badge -->
        <div class={`inline-flex items-center px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium mb-8 transition-all duration-1000 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <Users class="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span class="mr-2 rtl:ml-2 rtl:mr-0">⚙️</span>
          {($locale || 'en') === 'ar' ? 'خدمات هندسة النقل المتخصصة' : 'Specialized Transport Engineering Services'}
        </div>
        
        <!-- Title -->
        <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            <span class="block bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent">
              {($locale || 'en') === 'ar' ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </span>
          </h1>
        </div>
        
        <!-- Description -->
        <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <p class="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
            {($locale || 'en') === 'ar' 
              ? 'نقدم مجموعة شاملة من الخدمات المتخصصة في هندسة النقل والطرق لتلبية جميع احتياجات مشاريعكم'
              : 'We offer a comprehensive range of specialized transport and highway engineering services to meet all your project needs'
            }
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- All Services Overview -->
  <section class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {($locale || 'en') === 'ar' ? 'مجالات خدماتنا الرئيسية' : 'Our Main Service Areas'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'ثلاث مجالات رئيسية من الخدمات المتخصصة لتغطية جميع جوانب هندسة النقل'
            : 'Three main service areas covering all aspects of transport engineering specialization'
          }
        </p>
      </div>
  
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        {#each allServices as serviceArea, index}
          <div class={`bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
            <div class="p-8">
              <div class={`w-20 h-20 bg-gradient-to-br ${serviceArea.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <svelte:component this={serviceArea.icon} class="w-10 h-10 text-white" />
              </div>
              
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                {($locale || 'en') === 'ar' ? serviceArea.category : serviceArea.categoryEn}
              </h3>
              
              <p class="text-slate-600 dark:text-slate-300 mb-6 text-center leading-relaxed">
                {($locale || 'en') === 'ar' ? serviceArea.description : serviceArea.descriptionEn}
              </p>
              
              <ul class="space-y-3 mb-8">
                {#each serviceArea.items as item}
                  <li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle class="w-4 h-4 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                    {item}
                  </li>
                {/each}
              </ul>
              
              <div class="text-center">
                <a 
                  href={serviceArea.href} 
                  class="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors group"
                >
                  {($locale || 'en') === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
                  <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Additional Services -->
  <section class="py-24 bg-slate-50 dark:bg-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {($locale || 'en') === 'ar' ? 'خدمات إضافية متخصصة' : 'Additional Specialized Services'}
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {($locale || 'en') === 'ar'
            ? 'خدمات داعمة واستشارية متخصصة لضمان نجاح مشاريعكم'
            : 'Supporting and specialized consulting services to ensure your project success'
          }
        </p>
      </div>
  
      <div class="grid md:grid-cols-2 gap-8">
        {#each services as service, index}
          <div class={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
            <div class="p-8">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center mb-6">
                <svelte:component this={service.icon} class="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {($locale || 'en') === 'ar' ? service.title : service.titleEn}
              </h3>
              
              <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
              </p>
              
              <ul class="space-y-2 mb-6">
                {#each service.features as feature}
                  <li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle class="w-4 h-4 text-purple-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                    {feature}
                  </li>
                {/each}
              </ul>
              
              <a 
                href={service.href} 
                class="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
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
  <section class="py-24 bg-gradient-to-r from-purple-600 to-slate-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          {($locale || 'en') === 'ar' ? 'إنجازاتنا في الأرقام' : 'Our Achievements in Numbers'}
        </h2>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each stats as stat, index}
          <div class="text-center animate-scale-in" style="animation-delay: {index * 0.2}s;">
            <div class="text-4xl lg:text-5xl font-black text-white mb-2">
              {stat.value}
            </div>
            <div class="text-purple-100 font-medium">
              {($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
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
        {($locale || 'en') === 'ar' ? 'هل تحتاج خدمة مخصصة؟' : 'Need a Custom Service?'}
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-300 mb-8">
        {($locale || 'en') === 'ar'
          ? 'فريقنا من الخبراء جاهز لتطوير حلول مخصصة تلبي احتياجاتكم الفريدة'
          : 'Our expert team is ready to develop custom solutions that meet your unique requirements'
        }
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/contact" 
          class="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors group shadow-lg hover:shadow-xl"
        >
          {($locale || 'en') === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </a>
        <a 
          href="/about" 
          class="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {($locale || 'en') === 'ar' ? 'تعرف على قدراتنا' : 'Learn About Our Capabilities'}
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
    
    @keyframes serviceConnection {
      0% { stroke-dasharray: 0 100; }
      100% { stroke-dasharray: 100 0; }
    }
    
    /* Animation Classes */
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .animate-slide-in-up { animation: slideInUp 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
    .service-connection { animation: serviceConnection 2s ease-out; }
  </style>