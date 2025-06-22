// src/lib/config/app.js
// src/lib/config/app.js
export const APP_CONFIG = {
    name: "Ayen Consulting KSA",
    tagline: "استشاريو تخطيط النقل",
    taglineEn: "Transport Planning Consultants", 
    description: "استشاريو تخطيط النقل للقطاعين الخاص والعام",
    descriptionEn: "Transport Planning Consultants For Private & Public Sectors",
    location: "المملكة العربية السعودية",
    locationEn: "Kingdom of Saudi Arabia",
    
    // Contact Information (Updated for KSA)
    contact: {
      phone: "+966 11 234 5678",
      mobile: "+966 50 123 4567", 
      email: "info@ayenconsulting-ksa.com",
      address: "مركز الملك عبدالله المالي، الرياض، المملكة العربية السعودية",
      addressEn: "King Abdullah Financial District, Riyadh, Kingdom of Saudi Arabia",
      hours: "الأحد - الخميس: 8:00 ص - 5:00 م",
      hoursEn: "Sunday - Thursday: 8:00 AM - 5:00 PM"
    },
    
    // Company Details
    company: {
      registration: "CR-1234567890",
      established: "2004",
      experience: "20+"
    },
  
    // Social Media
    social: {
      linkedin: "https://linkedin.com/company/ayen-consulting-ksa",
      twitter: "https://twitter.com/ayenconsultingksa", 
      instagram: "https://instagram.com/ayenconsultingksa"
    }
};
  
  // Translated Company Stats
export const COMPANY_STATS = [
  {
    number: "20+",
    label: "سنة من الخبرة",
    labelEn: "Years of Experience",
    icon: "📅",
    description: "عقدان من التميز في هندسة النقل",
    descriptionEn: "Two decades of transport engineering excellence"
  },
  {
    number: "500+", 
    label: "مشروع مكتمل",
    labelEn: "Completed Projects",
    icon: "✅",
    description: "مشاريع ناجحة في جميع أنحاء المملكة",
    descriptionEn: "Successful projects across the Kingdom"
  },
  {
    number: "50+",
    label: "عميل راضٍ", 
    labelEn: "Satisfied Clients",
    icon: "😊",
    description: "عملاء يثقون في خدماتنا المتميزة",
    descriptionEn: "Clients who trust our exceptional services"
  },
  {
    number: "15+",
    label: "مدن في المملكة",
    labelEn: "Cities in KSA", 
    icon: "🏙️",
    description: "انتشار واسع في المدن السعودية",
    descriptionEn: "Wide coverage across Saudi cities"
  }];
  
  // Translated Testimonials
export const TESTIMONIALS = [
  {
    content: "خدمة ممتازة ومهنية جداً قدمتها Ayen Consulting لدعم اعتراضنا على الخطة المحلية. جمع بيانات فعال مع تحليل قوي وعرض واضح في تقرير تقني شامل؛ كل ذلك تم إنجازه في إطار زمني ضيق جداً.",
    contentEn: "Excellent and very professional service provided by Ayen Consulting to support our Local Plan objection. Efficient data collection with robust analysis and clear presentation in a comprehensive technical report; all completed within a very tight timescale.",
    author: "Andrew Guttridge", 
    company: "Bildeston Parish Council, Suffolk, UK",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    content: "تقدم نادي كرة القدم الشعبي الخاص بنا بطلب لبناء نادي لتحسين المرافق. المشروع له اعتراضات معقدة حول مواقف السيارات وإدارة المرور. كنادي لم تكن لدينا خبرة أو معرفة بهذا الأمر واحتجنا إلى استشاري للعمل معه. تواصلت مع Kevin ومن البداية شعرت أنه فهم احتياجاتنا.",
    contentEn: "Our Grassroots football club have made an application to build a clubhouse to improve facilities. The project has some complicated objections around car parking and traffic management. As a club we had no experience or knowledge with regards to this and needed a consultant to work with. I approached Kevin and from the outset it felt like he understood our needs.",
    author: "Andy Stopps",
    company: "Wingerworth Junior Sports Association, North East Derbyshire, UK", 
    rating: 5,
    avatar: "⚽"
  },
  {
    content: "خدمة رائعة ورسوم هندسية احترافية رائعة.",
    contentEn: "Great service and fantastic professional drawings.",
    author: "James Barker",
    company: "Colchester, Essex, UK",
    rating: 5,
    avatar: "🎨"
  }
];

  // Navigation structure with sub-menus
export const NAVIGATION = [
        {
          title: "الرئيسية",
          titleEn: "Home", 
          href: "/",
          icon: "🏠"
        },
        {
          title: "من نحن",
          titleEn: "About",
          href: "/about", 
          icon: "👥"
        },
        {
          title: "تخطيط النقل",
          titleEn: "Transport Planning",
          href: "/transport-planning",
          icon: "🗺️",
          submenu: [
            {
              title: "الوصول للموقع", 
              titleEn: "Site Access",
              href: "/transport-planning/site-access",
              description: "تصميم نقاط الوصول المثلى للمواقع الجديدة"
            },
            {
              title: "دراسات الجدوى للنقل",
              titleEn: "Transport Feasibility Studies", 
              href: "/transport-planning/transport-feasibility-studies",
              description: "دراسات شاملة لجدوى مشاريع النقل"
            },
            {
              title: "التخطيط الرئيسي وتصميم النقل",
              titleEn: "Master Planning & Transport Design",
              href: "/transport-planning/master-planning", 
              description: "تخطيط شامل لأنظمة النقل المتكاملة"
            },
            {
              title: "الردود التقنية",
              titleEn: "Technical Rebuttals",
              href: "/transport-planning/technical-rebuttals",
              description: "ردود تقنية متخصصة لاعتراضات المشاريع"
            },
            {
              title: "تقييم بيان النقل", 
              titleEn: "Transport Statement Assessment",
              href: "/transport-planning/transport-statement-assessment",
              description: "تقييم وثائق النقل للمشاريع الجديدة"
            },
            {
              title: "تطوير خطة السفر",
              titleEn: "Travel Plan Development",
              href: "/transport-planning/travel-plan-development", 
              description: "خطط سفر مستدامة وفعالة"
            }
          ]
        },
        {
          title: "هندسة المرور",
          titleEn: "Traffic Engineering", 
          href: "/traffic-engineering",
          icon: "🚦",
          submenu: [
            {
              title: "نمذجة المرور",
              titleEn: "Traffic Modeling",
              href: "/traffic-engineering/traffic-modeling",
              description: "نمذجة متقدمة لأنماط المرور وتحليل التدفق"
            },
            {
              title: "تقييم المرور", 
              titleEn: "Traffic Assessment",
              href: "/traffic-engineering/traffic-assessment",
              description: "تقييم شامل لظروف المرور الحالية"
            },
            {
              title: "تقييم تأثير المرور",
              titleEn: "Traffic Impact Assessment", 
              href: "/traffic-engineering/traffic-impact-assessment",
              description: "تحليل تأثير المشاريع الجديدة على المرور"
            },
            {
              title: "أنظمة النقل الذكية",
              titleEn: "ITS (Intelligent Transport Systems)",
              href: "/traffic-engineering/its",
              description: "حلول النقل الذكي والتكنولوجيا المتقدمة"
            },
            {
              title: "هندسة السلامة المرورية",
              titleEn: "Road Safety Engineering", 
              href: "/traffic-engineering/road-safety-engineering",
              description: "تصميم وتحسين السلامة المرورية"
            },
            {
              title: "مبادرة إدارة المرور",
              titleEn: "Traffic Management Initiative",
              href: "/traffic-engineering/traffic-management-initiative", 
              description: "مبادرات شاملة لإدارة المرور"
            },
            {
              title: "تحليل مسار الكسح",
              titleEn: "Swept Path Analysis",
              href: "/traffic-engineering/swept-path-analysis",
              description: "تحليل مسارات المركبات الكبيرة"
            }
          ]
        },
        {
          title: "هندسة الطرق السريعة", 
          titleEn: "Highway Engineering",
          href: "/highway-engineering",
          icon: "🛣️",
          submenu: [
            {
              title: "تصميم مواقف السيارات",
              titleEn: "Car Park Design",
              href: "/highway-engineering/car-park-design",
              description: "تصميم مواقف سيارات فعالة ومستدامة"
            },
            {
              title: "خطط إدارة المرور",
              titleEn: "Traffic Management Plans", 
              href: "/highway-engineering/traffic-management-plans",
              description: "خطط شاملة لإدارة المرور أثناء الإنشاء"
            },
            {
              title: "تصميم الطرق والتقاطعات",
              titleEn: "Highway & Junction Design",
              href: "/highway-engineering/highway-junction-design", 
              description: "تصميم متقدم للطرق والتقاطعات"
            },
            {
              title: "النقل المستدام",
              titleEn: "Sustainable Transport",
              href: "/highway-engineering/sustainable-transport",
              description: "حلول نقل صديقة للبيئة ومستدامة"
            }
          ]
        },
        {
          title: "خدمات إضافية",
          titleEn: "Additional Services",
          href: "/services", 
          icon: "⚙️",
          submenu: [
            {
              title: "تقييم الصناعة",
              titleEn: "Industry Assessment",
              href: "/services/industry-assessment",
              description: "تقييم وتحليل القطاعات الصناعية"
            },
            {
              title: "الاستشارة العامة والاجتماعات", 
              titleEn: "Public Consultation & Meeting",
              href: "/services/public-consultation",
              description: "خدمات الاستشارة المجتمعية والعامة"
            }
          ]
        },
        {
          title: "المدونة",
          titleEn: "Blog",
          href: "/blog",
          icon: "📝"
        },
        {
          title: "اتصل بنا",
          titleEn: "Contact",
          href: "/contact", 
          icon: "📞"
        }
  ];
      