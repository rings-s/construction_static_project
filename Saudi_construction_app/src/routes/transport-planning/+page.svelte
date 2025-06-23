<!-- src/routes/transport-planning/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import { 
    ArrowRight, 
    CheckCircle, 
    MapPin, 
    Clock, 
    Users, 
    Target, 
    BarChart3, 
    Route, 
    Building2, 
    Zap,
    FileText,
    TrendingUp,
    Shield,
    CheckSquare,
    PlaneTakeoff,
    Compass,
    Activity,
    Award
  } from 'lucide-svelte';
  import { APP_CONFIG } from '$lib/config/app.js';
  import { getProjectImage } from '$lib/config/images.js';

  let mounted = $state(false);
  let visibleSections = $state(new Set());
  let mousePosition = $state({ x: 0, y: 0 });
  let particles = $state([]);
  let heroRef = $state(null);
  let statsRef = $state(null);

  onMount(() => {
      mounted = true;
      
      // Generate particles for background animation
      particles = Array.from({ length: 40 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
      }));
      
      // Mouse tracking for parallax effects - only after mount
      const handleMouseMove = (e) => {
          if (mounted) {
              mousePosition = {
                  x: (e.clientX / window.innerWidth) * 100,
                  y: (e.clientY / window.innerHeight) * 100
              };
          }
      };
      
      // Only add listeners after mount
      if (typeof window !== 'undefined') {
          window.addEventListener('mousemove', handleMouseMove);
      }
    
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
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

          // Safely query elements
          const animateElements = document.querySelectorAll('[data-animate]');
          if (animateElements.length > 0) {
              animateElements.forEach(el => {
                  if (el) observer.observe(el);
              });
          }

          return () => {
              if (typeof window !== 'undefined') {
                  window.removeEventListener('mousemove', handleMouseMove);
              }
              observer.disconnect();
          };
      }, 100);
  });

  const services = [
      {
          icon: Compass,
          title: 'الوصول للموقع',
          titleEn: 'Site Access',
          description: 'تصميم نقاط الوصول المثلى للمواقع الجديدة مع ضمان السلامة والكفاءة',
          descriptionEn: 'Optimal site access point design ensuring safety and efficiency for new developments',
          href: '/transport-planning/site-access',
          features: ['تحليل الرؤية', 'تقييم السلامة', 'تحليل السعة', 'التكامل متعدد الوسائط'],
          color: 'from-blue-500 to-blue-600',
          iconColor: 'text-blue-600'
      },
      {
          icon: TrendingUp,
          title: 'دراسات جدوى النقل',
          titleEn: 'Transport Feasibility Studies',
          description: 'دراسات شاملة لجدوى مشاريع النقل مع التحليل المالي والتقني',
          descriptionEn: 'Comprehensive transport project feasibility with financial and technical analysis',
          href: '/transport-planning/transport-feasibility-studies',
          features: ['تحليل السوق', 'النمذجة المالية', 'تخطيط التنفيذ', 'تقييم المخاطر'],
          color: 'from-emerald-500 to-emerald-600',
          iconColor: 'text-emerald-600'
      },
      {
          icon: Building2,
          title: 'التخطيط الرئيسي وتصميم النقل',
          titleEn: 'Master Planning & Transport Design',
          description: 'تخطيط شامل لأنظمة النقل المتكاملة والمستدامة',
          descriptionEn: 'Comprehensive planning for integrated and sustainable transport systems',
          href: '/transport-planning/master-planning',
          features: ['التصميم المتكامل', 'التخطيط المستدام', 'إشراك المجتمع', 'التطوير المرحلي'],
          color: 'from-purple-500 to-purple-600',
          iconColor: 'text-purple-600'
      },
      {
          icon: Shield,
          title: 'الردود التقنية',
          titleEn: 'Technical Rebuttals',
          description: 'ردود تقنية متخصصة لاعتراضات المشاريع والتحديات التنظيمية',
          descriptionEn: 'Expert technical responses to project objections and regulatory challenges',
          href: '/transport-planning/technical-rebuttals',
          features: ['التحليل القانوني', 'الأدلة التقنية', 'الحلول البديلة', 'الدعم الاستراتيجي'],
          color: 'from-amber-500 to-amber-600',
          iconColor: 'text-amber-600'
      },
      {
          icon: FileText,
          title: 'تقييم بيان النقل',
          titleEn: 'Transport Statement Assessment',
          description: 'تقييم وثائق النقل للمشاريع الجديدة وضمان الامتثال',
          descriptionEn: 'Assessment of transport documents for new projects ensuring compliance',
          href: '/transport-planning/transport-statement-assessment',
          features: ['مراجعة الامتثال', 'تحليل الأثر', 'التوثيق', 'دعم التطبيق'],
          color: 'from-teal-500 to-teal-600',
          iconColor: 'text-teal-600'
      },
      {
          icon: PlaneTakeoff,
          title: 'تطوير خطة السفر',
          titleEn: 'Travel Plan Development',
          description: 'خطط سفر مستدامة وفعالة لتقليل التأثير المروري',
          descriptionEn: 'Sustainable and effective travel plans to reduce traffic impact',
          href: '/transport-planning/travel-plan-development',
          features: ['استراتيجيات مستدامة', 'تعديل السلوك', 'المراقبة والتقييم', 'إشراك الموظفين'],
          color: 'from-indigo-500 to-indigo-600',
          iconColor: 'text-indigo-600'
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
          teamEn: '20 specialists',
          imageKey: 'urban-planning'
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
          teamEn: '15 specialists',
          imageKey: 'metro-system'
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
          teamEn: '8 specialists',
          imageKey: 'downtown-commercial'
      }
  ];

  const stats = [
      { 
          value: '150+', 
          label: 'خطة نقل', 
          labelEn: 'Transport Plans', 
          icon: Route,
          color: 'from-blue-500 to-blue-600',
          iconColor: 'text-blue-600'
      },
      { 
          value: '75+', 
          label: 'دراسة جدوى', 
          labelEn: 'Feasibility Studies', 
          icon: BarChart3,
          color: 'from-emerald-500 to-emerald-600',
          iconColor: 'text-emerald-600'
      },
      { 
          value: '200+', 
          label: 'تقييم موقع', 
          labelEn: 'Site Assessments', 
          icon: MapPin,
          color: 'from-purple-500 to-purple-600',
          iconColor: 'text-purple-600'
      },
      { 
          value: '95%', 
          label: 'معدل النجاح', 
          labelEn: 'Success Rate', 
          icon: Award,
          color: 'from-amber-500 to-amber-600',
          iconColor: 'text-amber-600'
      }
  ];

  function isVisible(sectionId) {
      return visibleSections.has(sectionId);
  }

  // Safe style calculation
  function getParallaxStyle(mouseX, mouseY, multiplier = 1) {
      if (!mounted || !mouseX || !mouseY) return '';
      return `transform: translate(${mouseX * multiplier * 0.1}px, ${mouseY * multiplier * 0.1}px);`;
  }
</script>

<svelte:head>
  <title>{($locale || 'en') === 'ar' ? 'تخطيط النقل - حلول التنقل المستدامة' : 'Transport Planning - Sustainable Mobility Solutions'} - {($locale || 'en') === 'ar' ? APP_CONFIG.name : APP_CONFIG.nameEn}</title>
  <meta name="description" content="{($locale || 'en') === 'ar' ? 'خدمات تخطيط النقل الاستراتيجية للحلول المستدامة والفعالة للتنقل' : 'Strategic transport planning services for sustainable and efficient mobility solutions'}" />
</svelte:head>

<!-- Enhanced Hero Section -->
<section bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
  
  <!-- Advanced Animated Background -->
  <div class="absolute inset-0">
      <!-- Gradient Orbs -->
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={getParallaxStyle(mousePosition.x, mousePosition.y, 0.5)}></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse" style={getParallaxStyle(mousePosition.x, mousePosition.y, -0.3)}></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      
      <!-- Geometric Grid -->
      <svg class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" viewBox="0 0 1200 800">
          <defs>
              <pattern id="transportGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3">
                      <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
              </pattern>
              <linearGradient id="transportWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.4"/>
                  <stop offset="50%" style="stop-color:#10b981;stop-opacity:0.6"/>
                  <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.4"/>
              </linearGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#transportGrid)" />
          
          <!-- Animated Network Lines -->
          <path d="M0,200 Q300,100 600,200 T1200,200" stroke="url(#transportWaveGradient)" stroke-width="4" fill="none" opacity="0.6" class="planning-line-1"/>
          <path d="M0,400 Q400,300 800,400 T1200,400" stroke="url(#transportWaveGradient)" stroke-width="3" fill="none" opacity="0.5" class="planning-line-2"/>
          <path d="M0,600 Q200,500 400,600 T1200,600" stroke="url(#transportWaveGradient)" stroke-width="2" fill="none" opacity="0.4" class="planning-line-3"/>
      </svg>
      
      <!-- Floating Particles -->
      {#if mounted}
          <div class="absolute inset-0 pointer-events-none">
              {#each particles as particle}
                  <div 
                      class="absolute rounded-full bg-gradient-to-r from-blue-400 to-emerald-500 animate-float-particle"
                      style="
                          left: {particle.x}%;
                          top: {particle.y}%;
                          width: {particle.size}px;
                          height: {particle.size}px;
                          opacity: {particle.opacity};
                          animation-duration: {particle.speed * 4}s;
                          {getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
                      "
                  ></div>
              {/each}
          </div>
      {/if}

      <!-- Dynamic Light Rays -->
      <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
          <div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-emerald-400 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
          <div class="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-purple-400 via-transparent to-transparent transform rotate-6 animate-light-ray-slow"></div>
      </div>

      <!-- Planning Nodes -->
      {#each Array(15) as _, i}
          <div class="absolute w-4 h-4 bg-blue-500/60 rounded-full animate-pulse-node" 
               style="left: {80 + i * 80}px; top: {200 + Math.sin(i) * 200}px; animation-delay: {i * 0.2}s;"></div>
      {/each}
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
          
          <!-- Enhanced Badge -->
          <div class={`inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-100/80 to-emerald-100/80 dark:from-blue-900/30 dark:to-emerald-900/30 backdrop-blur-xl text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 text-sm font-bold mb-8 transition-all duration-1000 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'} shadow-lg hover:shadow-2xl hover:scale-105`}>
              <Route class="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0" />
              <span class="mr-2 rtl:ml-2 rtl:mr-0 text-lg">🗺️</span>
              {($locale || 'en') === 'ar' ? 'التخطيط الاستراتيجي للنقل' : 'Strategic Transport Planning'}
          </div>
          
          <!-- Enhanced Title -->
          <div class={`transition-all duration-1000 delay-200 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
              <h1 class="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
                  <span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-300%">
                      {($locale || 'en') === 'ar' ? 'تخطيط النقل' : 'Transport Planning'}
                  </span>
              </h1>
          </div>
          
          <!-- Enhanced Description -->
          <div class={`transition-all duration-1000 delay-400 ${mounted ? 'animate-slide-up-bounce' : 'opacity-0'}`}>
              <p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                  {($locale || 'en') === 'ar' 
                      ? 'نقدم خدمات تخطيط النقل الاستراتيجية لإنشاء حلول تنقل مستدامة وفعالة تلبي احتياجات المجتمعات الحديثة'
                      : 'We provide strategic transport planning services to create sustainable and efficient mobility solutions that meet the needs of modern communities'
                  }
              </p>
          </div>
      </div>
  </div>
</section>

<!-- Enhanced Services Grid -->
<section id="services" data-animate class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
  
  <!-- Advanced Background -->
  <div class="absolute inset-0">
      <!-- Gradient Orbs -->
      <div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-teal-500/10 rounded-full blur-3xl animate-float-reverse"></div>
      
      <!-- Floating Particles -->
      {#if mounted}
          <div class="absolute inset-0 pointer-events-none">
              {#each particles.slice(0, 20) as particle}
                  <div 
                      class="absolute rounded-full bg-gradient-to-r from-blue-400 to-emerald-500 animate-float-particle"
                      style="
                          left: {particle.x}%;
                          top: {particle.y}%;
                          width: {particle.size}px;
                          height: {particle.size}px;
                          opacity: {particle.opacity};
                          animation-duration: {particle.speed * 4}s;
                          {getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
                      "
                  ></div>
              {/each}
          </div>
      {/if}
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
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
              <div class={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('services') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.1}s;">
                  
                  <!-- Background Gradient -->
                  <div class={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div class="relative z-10 p-8">
                      <!-- Enhanced Icon Container -->
                      <div class={`relative w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 shadow-xl group-hover:rotate-12`}>
                          <!-- Icon Glow Effect -->
                          <div class={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                          <!-- Icon -->
                          <svelte:component this={service.icon} class="relative z-10 w-10 h-10 text-white drop-shadow-lg" />
                          <!-- Sparkle Effect -->
                          <div class="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                      </div>
                      
                      <h3 class="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {($locale || 'en') === 'ar' ? service.title : service.titleEn}
                      </h3>
                      
                      <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                          {($locale || 'en') === 'ar' ? service.description : service.descriptionEn}
                      </p>
                      
                      <ul class="space-y-3 mb-8">
                          {#each service.features as feature}
                              <li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                  <CheckCircle class="w-4 h-4 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                                  {feature}
                              </li>
                          {/each}
                      </ul>
                      
                      <a 
                          href={service.href} 
                          class="group/link inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                          {($locale || 'en') === 'ar' ? 'اعرف أكثر' : 'Learn More'}
                          <ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform duration-300" />
                      </a>
                  </div>
                  
                  <!-- Bottom Accent -->
                  <div class={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
          {/each}
      </div>
  </div>
</section>

<!-- Enhanced Stats Section -->
<section bind:this={statsRef} class="py-24 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 relative overflow-hidden">
  <!-- Advanced Background Effects -->
  <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform rotate-12 animate-light-ray"></div>
      <div class="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -rotate-12 animate-light-ray-reverse"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {#each stats as stat, index}
              <div class={`text-center ${mounted ? 'animate-scale-in-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
                  <!-- Enhanced Stat Icon Container -->
                  <div class="relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow-stats shadow-2xl group hover:scale-110 transition-transform duration-300">
                      <!-- Icon Glow Effect -->
                      <div class={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      <!-- Icon -->
                      <svelte:component this={stat.icon} class={`relative z-10 w-10 h-10 text-white drop-shadow-lg ${stat.iconColor}`} />
                      <!-- Sparkle Effect -->
                      <div class="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                      <div class="absolute bottom-2 left-2 w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
                  </div>
                  <div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-count-up-advanced">
                      {stat.value}
                  </div>
                  <div class="text-blue-100 font-bold">
                      {($locale || 'en') === 'ar' ? stat.label : stat.labelEn}
                  </div>
              </div>
          {/each}
      </div>
  </div>
</section>

<!-- Enhanced Featured Projects -->
<section id="projects" data-animate class="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
  
  <!-- Advanced Background -->
  <div class="absolute inset-0">
      <!-- Gradient Orbs -->
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-emerald-500/15 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full blur-3xl animate-float-reverse"></div>
      
      <!-- Floating Particles -->
      {#if mounted}
          <div class="absolute inset-0 pointer-events-none">
              {#each particles.slice(20) as particle}
                  <div 
                      class="absolute rounded-full bg-gradient-to-r from-blue-400 to-emerald-500 animate-float-particle"
                      style="
                          left: {particle.x}%;
                          top: {particle.y}%;
                          width: {particle.size}px;
                          height: {particle.size}px;
                          opacity: {particle.opacity};
                          animation-duration: {particle.speed * 4}s;
                          {getParallaxStyle(mousePosition.x, mousePosition.y, particle.id % 10 + 1)}
                      "
                  ></div>
              {/each}
          </div>
      {/if}
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
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
              <div class={`group bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${isVisible('projects') ? 'animate-fade-in-up-advanced' : 'opacity-0'}`} style="animation-delay: {index * 0.2}s;">
                  
                  <!-- Project Image -->
                  <div class="h-48 overflow-hidden relative">
                      <img 
                          src={getProjectImage(project.imageKey)} 
                          alt={($locale || 'en') === 'ar' ? project.title : project.titleEn}
                          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                      />
                      <!-- Image Overlay -->
                      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:via-emerald-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
                      <!-- Corner Accent -->
                      <div class="absolute top-4 right-4 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div class="p-6">
                      <h3 class="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {($locale || 'en') === 'ar' ? project.title : project.titleEn}
                      </h3>
                      <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                          {($locale || 'en') === 'ar' ? project.description : project.descriptionEn}
                      </p>
                      
                      <div class="grid grid-cols-3 gap-4 text-center border-t border-slate-200 dark:border-slate-700 pt-6">
                          <div class="group/item">
                              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover/item:scale-110 transition-transform duration-300">
                                  <MapPin class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
                                  {($locale || 'en') === 'ar' ? 'الموقع' : 'Location'}
                              </div>
                              <div class="text-xs font-black text-slate-700 dark:text-slate-300">
                                  {($locale || 'en') === 'ar' ? project.location : project.locationEn}
                              </div>
                          </div>
                          <div class="group/item">
                              <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover/item:scale-110 transition-transform duration-300">
                                  <Clock class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
                                  {($locale || 'en') === 'ar' ? 'المدة' : 'Duration'}
                              </div>
                              <div class="text-xs font-black text-slate-700 dark:text-slate-300">
                                  {($locale || 'en') === 'ar' ? project.duration : project.durationEn}
                              </div>
                          </div>
                          <div class="group/item">
                              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover/item:scale-110 transition-transform duration-300">
                                  <Users class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div class="text-xs text-slate-500 dark:text-slate-400 font-bold">
                                  {($locale || 'en') === 'ar' ? 'الفريق' : 'Team'}
                              </div>
                              <div class="text-xs font-black text-slate-700 dark:text-slate-300">
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

<!-- Enhanced CTA Section -->
<section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
  <!-- Advanced Background -->
  <div class="absolute inset-0">
      <div class="absolute top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
  </div>

  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
          {($locale || 'en') === 'ar' ? 'هل أنت مستعد لبدء مشروع تخطيط النقل؟' : 'Ready to Start Your Transport Planning Project?'}
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          {($locale || 'en') === 'ar'
              ? 'خبراء تخطيط النقل لدينا جاهزون لمساعدتك في إنشاء حلول تنقل مبتكرة ومستدامة'
              : 'Our transport planning experts are ready to help you create innovative, sustainable mobility solutions'
          }
      </p>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
              href="/contact" 
              class="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
          >
              {($locale || 'en') === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
              <ArrowRight class="ml-3 rtl:mr-3 rtl:ml-0 w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
          </a>
          <a 
              href="/about" 
              class="inline-flex items-center justify-center px-12 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
              {($locale || 'en') === 'ar' ? 'تعرف على فريقنا' : 'Learn About Our Team'}
          </a>
      </div>
  </div>
</section>

<style>
  /* Enhanced Animation Keyframes */
  @keyframes slide-up-bounce {
      0% {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
      }
      60% {
          opacity: 0.8;
          transform: translateY(-10px) scale(1.02);
      }
      100% {
          opacity: 1;
          transform: translateY(0) scale(1);
      }
  }

  @keyframes fade-in-up-advanced {
      0% {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
      }
      100% {
          opacity: 1;
          transform: translateY(0) scale(1);
      }
  }

  @keyframes scale-in-advanced {
      0% {
          opacity: 0;
          transform: scale(0.7);
      }
      100% {
          opacity: 1;
          transform: scale(1);
      }
  }

  @keyframes gradient-flow {
      0%, 100% { 
          background-position: 0% 50%; 
      }
      50% { 
          background-position: 100% 50%; 
      }
  }

  @keyframes float-slow {
      0%, 100% { 
          transform: translateY(0px) scale(1); 
      }
      50% { 
          transform: translateY(-30px) scale(1.1); 
      }
  }

  @keyframes float-reverse {
      0%, 100% { 
          transform: translateY(0px) scale(1) rotate(0deg); 
      }
      50% { 
          transform: translateY(25px) scale(0.9) rotate(180deg); 
      }
  }

  @keyframes pulse-subtle {
      0%, 100% { 
          opacity: 0.5; 
          transform: scale(1);
      }
      50% { 
          opacity: 0.8; 
          transform: scale(1.05);
      }
  }

  @keyframes float-particle {
      0%, 100% { 
          transform: translateY(0px) scale(1); 
          opacity: 0.4;
      }
      50% { 
          transform: translateY(-20px) scale(1.2); 
          opacity: 0.8;
      }
  }

  @keyframes light-ray {
      0%, 100% { 
          opacity: 0.2; 
          transform: scaleY(1);
      }
      50% { 
          opacity: 0.6; 
          transform: scaleY(1.2);
      }
  }

  @keyframes light-ray-reverse {
      0%, 100% { 
          opacity: 0.3; 
          transform: scaleY(1) rotate(-12deg);
      }
      50% { 
          opacity: 0.7; 
          transform: scaleY(1.3) rotate(-12deg);
      }
  }

  @keyframes light-ray-slow {
      0%, 100% { 
          opacity: 0.1; 
          transform: scaleY(1) rotate(6deg);
      }
      50% { 
          opacity: 0.4; 
          transform: scaleY(1.1) rotate(6deg);
      }
  }

  @keyframes pulse-node {
      0%, 100% { 
          transform: scale(1); 
          opacity: 0.6;
      }
      50% { 
          transform: scale(1.5); 
          opacity: 1;
      }
  }

  @keyframes pulse-glow-stats {
      0%, 100% { 
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          transform: scale(1);
      }
      50% { 
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          transform: scale(1.05);
      }
  }

  @keyframes count-up-advanced {
      0% { 
          opacity: 0; 
          transform: translateY(20px) scale(0.8); 
      }
      100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
      }
  }

  @keyframes planning-line-flow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -100; }
  }
  
  /* Animation Classes */
  .animate-slide-up-bounce { animation: slide-up-bounce 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-fade-in-up-advanced { animation: fade-in-up-advanced 0.6s ease-out forwards; }
  .animate-scale-in-advanced { animation: scale-in-advanced 0.6s ease-out forwards; }
  .animate-gradient-flow { 
      background-size: 200% 200%;
      animation: gradient-flow 6s ease infinite;
  }
  .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
  .animate-float-reverse { animation: float-reverse 20s ease-in-out infinite; }
  .animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
  .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
  .animate-light-ray { animation: light-ray 8s ease-in-out infinite; }
  .animate-light-ray-reverse { animation: light-ray-reverse 10s ease-in-out infinite; }
  .animate-light-ray-slow { animation: light-ray-slow 12s ease-in-out infinite; }
  .animate-pulse-node { animation: pulse-node 3s ease-in-out infinite; }
  .animate-pulse-glow-stats { animation: pulse-glow-stats 2s ease-in-out infinite; }
  .animate-count-up-advanced { animation: count-up-advanced 1s ease-out; }
  
  /* Planning Animation */
  .planning-line-1 {
      stroke-dasharray: 20 10;
      animation: planning-line-flow 4s linear infinite;
  }
  
  .planning-line-2 {
      stroke-dasharray: 15 8;
      animation: planning-line-flow 5s linear infinite reverse;
  }
  
  .planning-line-3 {
      stroke-dasharray: 10 5;
      animation: planning-line-flow 6s linear infinite;
  }

  /* Utility Classes */
  .bg-300\% {
      background-size: 300% 300%;
  }

  .shadow-3xl {
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }

  /* GPU Acceleration */
  .animate-float-slow,
  .animate-float-reverse,
  .animate-pulse-subtle,
  .animate-gradient-flow {
      will-change: transform;
      transform: translateZ(0);
  }

  /* Dark mode enhancements */
  .dark .backdrop-blur-xl {
      backdrop-filter: blur(24px) saturate(180%);
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
      }
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
      h1 {
          font-size: 2.25rem !important;
          line-height: 1.1;
      }
  }
</style>