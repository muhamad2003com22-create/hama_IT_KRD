/* =============================================
   MAIN.JS — Portfolio Logic & Animations
   ============================================= */

// ── Language Data ─────────────────────────────
const translations = {
  ku: {
    dir: 'rtl',
    lang: 'ku',
    heroName: 'HamaIT',
    // Nav
    navAbout: 'خۆم',
    navSocial: 'سۆشیاڵ',
    navProjects: 'پرۆژەکان',
    // Hero
    heroGreeting: 'سڵاو، من',
    heroTitle1: 'دەڤەلۆپەری هوشی دەستکرد',
    heroTitle2: 'دروستکەری وێبسایت',
    heroTitle3: 'دروستکەری ئەپلیکەیشن',
    heroTitle4: 'پسپۆڕی تەکنەلۆژیا',
    heroDesc: 'دەڤەلۆپەرێکم کە تایبەتی هوشی دەستکرد (AI)، دروستکردنی وێبسایت و ئەپلیکەیشن. هەمیشە لەگەڵ تەکنەلۆژیای نوێ کار دەکەم بۆ دروستکردنی شتی باش.',
    ctaProjects: 'ببینە پرۆژەکانم ←',
    ctaSocial: 'پەیوەندیم پێوە بکە',
    scrollHint: 'دووری بگرە',
    // About
    aboutTag: 'دەربارەی من',
    aboutTitle: 'کێم؟',
    statProjectsLabel: 'پرۆژە',
    statLangsLabel: 'زمان',
    statPassionLabel: 'شەوق و داهێنان',
    skillsLabel: 'ئەوەی دەزانم',
    aboutBio: 'لە جیهانی کۆد و زیرەکی دەستکرددا، بەدوای داهێنانەوەم بۆ کوردستان. خەونم ئەوەیە تەکنەلۆژیایەک دروست بکەم کە ئیمپاکتی ڕاستەقینەی هەبێت و ژیانی خەڵکمان ئاسانتر بکات. هەمیشە لە ڕێگەی فێربوونی بەردەوام و گەڕان بەدوای داهێنانە نوێیەکاندا، هەوڵ دەدەم ئەم خەونە بکەمە ڕاستی.',
    // Social
    socialTag: 'سۆشیاڵ میدیا',
    socialTitle: 'پەیوەندیم پێوە بکە',
    socialSubtitle: 'لەهەموو پلاتفۆرمێکەوە دەتوانی پەیوەندیم پێوە بکەی',
    // Projects
    projectsTag: 'پرۆژەکانم',
    projectsTitle: 'ئەوەی دروستم کردووە',
    projectsSubtitle: 'وێبسایت و ئەپلیکەیشنەکانم',
    filterAll: 'هەموو',
    filterWebsite: 'وێبسایت',
    filterApp: 'ئەپ',
    filterAI: 'هوشی دەستکرد',
    visitSite: 'سەردانی کە',
    copyLink: 'کۆپی کە',
    linkCopied: '✓ کۆپیکرا!',
    noProjects: 'هیچ پرۆژەیەک زیادنەکراوە',
    noProjectsHint: 'لە پانێلی ئەدمین پرۆژەکانت زیاد بکە',
    // Stats
    statsProjects: 'پرۆژەی تەواوکراو',
    statsLangs: 'زمانی پشتگیریکراو',
    statsSocial: 'پلاتفۆرمی سۆشیاڵ',
    statsPassion: '% شەوق و داهێنان',
    // Footer
    footerDesc: 'دروستکردنی داهاتووی دیجیتاڵی کوردستان',
    footerCopyText: '© 2026 HamaIT — هەموو مافەکان پارێزراون',
    footerCopySmall: 'دروستکراوە بە خوێن و کۆد ❤️'
  },

  ar: {
    dir: 'rtl',
    lang: 'ar',
    heroName: 'HamaIT',
    navAbout: 'عني',
    navSocial: 'تواصل',
    navProjects: 'مشاريعي',
    heroGreeting: 'مرحباً، أنا',
    heroTitle1: 'مطوّر الذكاء الاصطناعي',
    heroTitle2: 'مطوّر مواقع ويب',
    heroTitle3: 'مطوّر تطبيقات',
    heroTitle4: 'خبير تقني',
    heroDesc: 'مطوّر متخصص في الذكاء الاصطناعي وتطوير المواقع والتطبيقات. أعمل دائماً مع أحدث التقنيات لإنشاء حلول مبتكرة وذات تأثير.',
    ctaProjects: 'مشاريعي ←',
    ctaSocial: 'تواصل معي',
    scrollHint: 'اسحب للأسفل',
    aboutTag: 'عني',
    aboutTitle: 'من أنا؟',
    statProjectsLabel: 'مشروع',
    statLangsLabel: 'لغة',
    statPassionLabel: 'شغف',
    skillsLabel: 'مهاراتي',
    aboutBio: 'في عالم البرمجة والذكاء الاصطناعي، أبحث عن الابتكار من أجل كوردستان. حلمي هو بناء تكنولوجيا ذات تأثير حقيقي وتجعل حياة شعبنا أسهل. من خلال التعلم المستمر واستكشاف الابتكارات الجديدة، أسعى دائماً لتحويل هذا الحلم إلى حقيقة.',
    socialTag: 'التواصل الاجتماعي',
    socialTitle: 'تواصل معي',
    socialSubtitle: 'يمكنك التواصل معي على أي منصة',
    projectsTag: 'مشاريعي',
    projectsTitle: 'ما صنعته',
    projectsSubtitle: 'مواقعي وتطبيقاتي',
    filterAll: 'الكل',
    filterWebsite: 'مواقع',
    filterApp: 'تطبيقات',
    filterAI: 'ذكاء اصطناعي',
    visitSite: 'زيارة',
    copyLink: 'نسخ الرابط',
    linkCopied: '✓ تم النسخ!',
    noProjects: 'لا توجد مشاريع بعد',
    noProjectsHint: 'أضف مشاريعك من لوحة التحكم',
    statsProjects: 'مشروع منجز',
    statsLangs: 'لغة مدعومة',
    statsSocial: 'منصة اجتماعية',
    statsPassion: '% شغف وإبداع',
    footerDesc: 'بناء مستقبل كوردستان الرقمي',
    footerCopyText: '© 2026 HamaIT — جميع الحقوق محفوظة',
    footerCopySmall: 'صُنع بكل شغف وبرمجة ❤️'
  },

  en: {
    dir: 'ltr',
    lang: 'en',
    heroName: 'HamaIT',
    navAbout: 'About',
    navSocial: 'Social',
    navProjects: 'Projects',
    heroGreeting: "Hi, I'm",
    heroTitle1: 'AI Developer',
    heroTitle2: 'Web Developer',
    heroTitle3: 'App Developer',
    heroTitle4: 'Tech Specialist',
    heroDesc: 'A passionate developer specializing in Artificial Intelligence, web development, and mobile applications. Always working with cutting-edge tech to build impactful solutions.',
    ctaProjects: 'View My Projects →',
    ctaSocial: 'Connect With Me',
    scrollHint: 'Scroll Down',
    aboutTag: 'About Me',
    aboutTitle: 'Who Am I?',
    statProjectsLabel: 'Projects',
    statLangsLabel: 'Languages',
    statPassionLabel: 'Passion',
    skillsLabel: 'My Skills',
    aboutBio: "In the world of coding and artificial intelligence, I search for innovation for Kurdistan. My dream is to build technology that has real impact and makes our people's lives easier. Through constant learning and exploring new innovations, I always strive to turn this dream into reality.",
    socialTag: 'Social Media',
    socialTitle: 'Connect With Me',
    socialSubtitle: 'Find me on any platform you prefer',
    projectsTag: 'My Projects',
    projectsTitle: "What I've Built",
    projectsSubtitle: 'My websites and applications',
    filterAll: 'All',
    filterWebsite: 'Websites',
    filterApp: 'Apps',
    filterAI: 'AI Projects',
    visitSite: 'Visit Site',
    copyLink: 'Copy Link',
    linkCopied: '✓ Copied!',
    noProjects: 'No projects added yet',
    noProjectsHint: 'Add your projects from the admin panel',
    statsProjects: 'Projects Completed',
    statsLangs: 'Languages Supported',
    statsSocial: 'Social Platforms',
    statsPassion: '% Passion & Drive',
    footerDesc: 'Building Kurdistan\'s Digital Future',
    footerCopyText: '© 2026 HamaIT — All Rights Reserved',
    footerCopySmall: 'Made with passion and code ❤️'
  },

  fa: {
    dir: 'rtl',
    lang: 'fa',
    heroName: 'Hamait',
    navAbout: 'درباره من',
    navSocial: 'شبکه‌های اجتماعی',
    navProjects: 'پروژه‌ها',
    heroGreeting: 'سلام، من',
    heroTitle1: 'توسعه‌دهنده هوش مصنوعی',
    heroTitle2: 'توسعه‌دهنده وب',
    heroTitle3: 'توسعه‌دهنده اپلیکیشن',
    heroTitle4: 'متخصص فناوری',
    heroDesc: 'توسعه‌دهنده‌ای متخصص در هوش مصنوعی، توسعه وب و اپلیکیشن موبایل. همیشه با آخرین فناوری‌ها کار می‌کنم تا راه‌حل‌های تأثیرگذار بسازم.',
    ctaProjects: 'پروژه‌هایم را ببینید ←',
    ctaSocial: 'با من در ارتباط باشید',
    scrollHint: 'پایین اسکرول کن',
    aboutTag: 'درباره من',
    aboutTitle: 'من کی هستم؟',
    statProjectsLabel: 'پروژه',
    statLangsLabel: 'زبان',
    statPassionLabel: 'اشتیاق',
    skillsLabel: 'مهارت‌های من',
    aboutBio: 'در دنیای برنامه‌نویسی و هوش مصنوعی، به دنبال نوآوری برای کردستان هستم. رویای من ساخت فناوری است که تاثیر واقعی داشته باشد و زندگی مردم ما را آسان‌تر کند. با یادگیری مداوم و کاوش در نوآوری‌های جدید، همیشه تلاش می‌کنم این رویا را به واقعیت تبدیل کنم.',
    socialTag: 'شبکه‌های اجتماعی',
    socialTitle: 'با من در ارتباط باشید',
    socialSubtitle: 'در هر پلتفرمی که ترجیح می‌دهید می‌توانید با من ارتباط برقرار کنید',
    projectsTag: 'پروژه‌های من',
    projectsTitle: 'آنچه ساخته‌ام',
    projectsSubtitle: 'وب‌سایت‌ها و اپلیکیشن‌های من',
    filterAll: 'همه',
    filterWebsite: 'وب‌سایت',
    filterApp: 'اپلیکیشن',
    filterAI: 'هوش مصنوعی',
    visitSite: 'بازدید از سایت',
    copyLink: 'کپی لینک',
    linkCopied: '✓ کپی شد!',
    noProjects: 'هنوز پروژه‌ای اضافه نشده',
    noProjectsHint: 'پروژه‌هایتان را از پنل ادمین اضافه کنید',
    statsProjects: 'پروژه تکمیل‌شده',
    statsLangs: 'زبان پشتیبانی‌شده',
    statsSocial: 'پلتفرم اجتماعی',
    statsPassion: '% اشتیاق و خلاقیت',
    footerDesc: 'ساخت آینده دیجیتال کردستان',
    footerCopyText: '© 2026 HamaIT — تمامی حقوق محفوظ است',
    footerCopySmall: 'ساخته شده با عشق و کد ❤️'
  }
};

// ── State ─────────────────────────────────────
let currentLang = localStorage.getItem('portfolio_lang') || 'ku';
let typingIndex = 0;
let typingTimeout;
let statsAnimated = false;
let currentFilter = 'all';

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Pre-set Facebook, WhatsApp, Telegram, Instagram, TikTok & Snapchat links if not already set
  try {
    const links = JSON.parse(localStorage.getItem('portfolio_social') || '{}');
    let changed = false;
    if (!links.facebook || !links.facebook.url) {
      links.facebook = {
        url: 'https://www.facebook.com/ha.ma.441259',
        handle: 'ha.ma.441259'
      };
      changed = true;
    }
    if (!links.whatsapp || !links.whatsapp.url) {
      links.whatsapp = {
        url: 'https://wa.me/964770529726',
        handle: '+964 770 529 726'
      };
      changed = true;
    }
    if (!links.telegram || !links.telegram.url) {
      links.telegram = {
        url: 'https://t.me/Hamaa_99',
        handle: '@Hamaa_99'
      };
      changed = true;
    }
    if (!links.instagram || !links.instagram.url) {
      links.instagram = {
        url: 'https://www.instagram.com/hamaa_360/?hl=en',
        handle: '@hamaa_360'
      };
      changed = true;
    }
    if (!links.tiktok || !links.tiktok.url) {
      links.tiktok = {
        url: 'https://www.tiktok.com/@hamay_shwana',
        handle: '@hamay_shwana'
      };
      changed = true;
    }
    if (!links.snapchat || !links.snapchat.url) {
      links.snapchat = {
        url: 'https://snapchat.com/add/hamaa_360',
        handle: '@hamaa_360'
      };
      changed = true;
    }
    if (changed) {
      localStorage.setItem('portfolio_social', JSON.stringify(links));
    }
  } catch (e) {
    console.error(e);
  }

  // One-time migration to clear old localStorage cache and force default projects
  if (localStorage.getItem('portfolio_projects_version_3') !== 'true') {
    localStorage.removeItem('portfolio_projects');
    localStorage.setItem('portfolio_projects_version_3', 'true');
  }

  applyLanguage(currentLang);
  initParticles();
  initNavScroll();
  initHamburger();
  initLangSwitcher();
  initScrollReveal();
  initStatsObserver();
  initFilterButtons();
  loadSocialLinks();
  startTyping();
});

// ── Language System ───────────────────────────
function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  const html = document.documentElement;

  html.setAttribute('lang', lang);
  html.setAttribute('dir', t.dir);

  // Set active lang button
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Nav
  setText('nav-about', t.navAbout);
  setText('nav-social', t.navSocial);
  setText('nav-projects', t.navProjects);

  // Hero
  setText('hero-greeting', t.heroGreeting);
  setText('hero-name', t.heroName);
  setText('hero-desc', t.heroDesc);
  setText('cta-projects', t.ctaProjects);
  setText('cta-social', t.ctaSocial);
  setText('scroll-hint', t.scrollHint);

  // About
  setText('about-tag', t.aboutTag);
  setText('about-title', t.aboutTitle);
  setText('stat-projects-label', t.statProjectsLabel);
  setText('stat-langs-label', t.statLangsLabel);
  setText('stat-passion-label', t.statPassionLabel);
  setText('skills-label', t.skillsLabel);

  // Bio from localStorage or default
  const savedBio = getSavedBio(lang);
  setText('about-bio', savedBio || t.aboutBio);

  // Social
  setText('social-tag', t.socialTag);
  setText('social-title', t.socialTitle);
  setText('social-subtitle', t.socialSubtitle);

  // Projects
  setText('projects-tag', t.projectsTag);
  setText('projects-title', t.projectsTitle);
  setText('projects-subtitle', t.projectsSubtitle);
  setText('filter-all', t.filterAll);
  setText('filter-website', t.filterWebsite);
  setText('filter-app', t.filterApp);
  setText('filter-ai', t.filterAI);

  // Stats
  setText('stats-label-projects', t.statsProjects);
  setText('stats-label-langs', t.statsLangs);
  setText('stats-label-social', t.statsSocial);
  setText('stats-label-passion', t.statsPassion);

  // Footer
  setText('footer-desc', t.footerDesc);
  setText('footer-copy-text', t.footerCopyText);
  setText('footer-copy-small', t.footerCopySmall);

  // Restart typing
  stopTyping();
  startTyping();

  // Re-render projects to update language
  renderProjects();

  // Save preference
  localStorage.setItem('portfolio_lang', lang);

  // Update page title/meta
  document.title = lang === 'en'
    ? 'Hamait — AI Developer'
    : lang === 'ar'
    ? 'Hamait — مطور الذكاء الاصطناعي'
    : lang === 'fa'
    ? 'Hamait — توسعه‌دهنده هوش مصنوعی'
    : 'Hamait — دەڤەلۆپەری هوشی دەستکرد';
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function getSavedBio(lang) {
  try {
    const bios = JSON.parse(localStorage.getItem('portfolio_bios') || '{}');
    return bios[lang] || '';
  } catch { return ''; }
}

// Language switcher
function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });
}

// ── Typing Effect ─────────────────────────────
function startTyping() {
  const t = translations[currentLang];
  const titles = [t.heroTitle1, t.heroTitle2, t.heroTitle3, t.heroTitle4];
  const el = document.getElementById('typing-text');
  if (!el) return;

  let titleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = titles[titleIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) { deleting = false; titleIdx = (titleIdx + 1) % titles.length; typingTimeout = setTimeout(type, 500); return; }
      typingTimeout = setTimeout(type, 40);
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) { deleting = true; typingTimeout = setTimeout(type, 2000); return; }
      typingTimeout = setTimeout(type, 80);
    }
  }

  if (el) type();
}

function stopTyping() {
  clearTimeout(typingTimeout);
  const el = document.getElementById('typing-text');
  if (el) el.textContent = '';
}

// ── Navbar Scroll ─────────────────────────────
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Hamburger Menu ────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
  // Close on nav link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

// ── Scroll Reveal ─────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ── Stats Counter ─────────────────────────────
function initStatsObserver() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounters();
    }
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

function animateCounters() {
  const projects = getProjects().length;
  const targets = {
    'count-projects': projects > 0 ? projects : 10,
    'count-langs': 4,
    'count-social': 6,
    'count-passion': 100
  };

  for (const [id, target] of Object.entries(targets)) {
    const el = document.getElementById(id);
    if (!el) continue;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const suffix = id === 'count-passion' ? '%' : '+';

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      el.textContent = start + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Update sidebar stat
  const statEl = document.getElementById('stat-projects');
  if (statEl) {
    const count = getProjects().length;
    statEl.textContent = count + '+';
  }
}

// ── Filter Buttons ────────────────────────────
function initFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProjects();
    });
  });
}

// ── Social Links ──────────────────────────────
function loadSocialLinks() {
  try {
    const links = JSON.parse(localStorage.getItem('portfolio_social') || '{}');
    const socials = ['instagram', 'telegram', 'whatsapp', 'facebook', 'tiktok', 'snapchat'];
    socials.forEach(platform => {
      const url = links[platform]?.url || '#';
      const handle = links[platform]?.handle || '@username';

      // Main card
      const linkEl = document.getElementById('link-' + platform);
      if (linkEl) linkEl.href = url;
      const handleEl = document.getElementById('handle-' + platform);
      if (handleEl) handleEl.textContent = handle;

      // Footer
      const footerEl = document.getElementById('footer-' + platform);
      if (footerEl) footerEl.href = url;
    });
  } catch(e) { console.error(e); }
}

// ── Projects ──────────────────────────────────
// Paste your projects JSON here to show them to all visitors:
const defaultProjects = [
  {
    id: "bahast-app",
    icon: "🕌",
    category: "website",
    url: "https://nooryislam.vercel.app/",
    imageUrl: "assets/bahast.png",
    tags: "Kurdish, Islamic, Quran, Hadith",
    title: {
      ku: "بەهەشت لەبیر مەکەن 🌟",
      en: "Remember Heaven 🌟",
      ar: "لا تنسى الجنة 🌟",
      fa: "بهشت را فراموش نکنید 🌟"
    },
    desc: {
      ku: "پلاتفۆرمێکی ئاینی دەوڵەمەند کە قورئان، فەرموودە، خەوننامە، و ژیانی پێغەمبەران لەخۆدەگرێت.",
      en: "A rich religious platform that includes the Quran, Hadith, dream interpretation, and the lives of the prophets.",
      ar: "منصة دينية غنية تحتوي على القرآن الكريم، الأحاديث النبوية، تفسير الأحلام، وسير الأنبياء.",
      fa: "یک پلتفرم مذهبی غنی شامل قرآن، احادیث، تعبیر خواب و زندگی پیامبران."
    }
  }
];

function getProjects() {
  try {
    const local = localStorage.getItem('portfolio_projects');
    if (local && JSON.parse(local).length > 0) {
      return JSON.parse(local);
    }
  } catch {}
  return defaultProjects;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const t = translations[currentLang];
  const projects = getProjects();
  const filtered = currentFilter === 'all'
    ? projects
    : projects.filter(p => p.category === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <div class="empty-icon">🚀</div>
        <p>${t.noProjects}</p>
        <p style="font-size:0.82rem;margin-top:8px;opacity:0.6">${t.noProjectsHint}</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const title = p.title?.[currentLang] || p.title?.en || p.title?.ku || 'Project';
    const desc  = p.desc?.[currentLang]  || p.desc?.en  || p.desc?.ku  || '';
    const tags  = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    const hasImage = !!p.imageUrl;
    return `
      <div class="project-card reveal visible" data-id="${p.id}">
        ${hasImage ? `<div class="project-card-image-wrap"><img src="${p.imageUrl}" alt="${escHtml(title)}" class="project-card-image" /></div>` : ''}
        <div class="project-header">
          <div class="project-icon">${p.icon || '🌐'}</div>
          <div class="project-info">
            <div class="project-title">${escHtml(title)}</div>
            <div class="project-category">${escHtml(p.category || '')}</div>
          </div>
        </div>
        ${desc ? `<p class="project-desc">${escHtml(desc)}</p>` : ''}
        ${tags.length ? `<div class="project-tags">${tags.map(tag => `<span class="project-tag">${escHtml(tag)}</span>`).join('')}</div>` : ''}
        <div class="project-footer">
          <a href="${escHtml(p.url || '#')}" target="_blank" rel="noopener" class="project-link">
            ${t.visitSite} <span>↗</span>
          </a>
          <button class="copy-btn" onclick="copyLink('${escHtml(p.url || '')}', this)">${t.copyLink}</button>
        </div>
      </div>`;
  }).join('');
}

function copyLink(url, btn) {
  if (!url || url === '#') return;
  navigator.clipboard.writeText(url).then(() => {
    const t = translations[currentLang];
    const original = btn.textContent;
    btn.textContent = t.linkCopied;
    btn.style.color = 'var(--green)';
    btn.style.borderColor = 'var(--green)';
    showToast(t.linkCopied, '🔗');
    setTimeout(() => {
      btn.textContent = original;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
}

// ── Toast ─────────────────────────────────────
function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast) return;
  toastMsg.textContent = msg;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Particle Canvas ───────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = {x:-1000, y:-1000};

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});

  const PARTICLE_COUNT = window.innerWidth < 768 
    ? Math.min(30, Math.floor(window.innerWidth / 20))
    : Math.min(70, Math.floor(window.innerWidth / 20));
  const CONNECT_DIST   = 140;
  const COLORS = ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(0,255,136,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r  = Math.random() * 2 + 1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() {
      // Mouse repel
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const distSq = dx*dx + dy*dy;
      if (distSq < 10000) { // 100px squared
        const dist = Math.sqrt(distSq);
        this.vx += (dx / (dist || 1)) * 0.4;
        this.vy += (dy / (dist || 1)) * 0.4;
      }
      // Speed limit
      const spdSq = this.vx*this.vx + this.vy*this.vy;
      if (spdSq > 4) { // 2px squared speed limit
        const spd = Math.sqrt(spdSq);
        this.vx = (this.vx/(spd || 1))*2; 
        this.vy = (this.vy/(spd || 1))*2; 
      }

      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0||this.x > W||this.y < 0||this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections - Optimized squared distance bypass
    const limitSq = CONNECT_DIST * CONNECT_DIST;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx*dx + dy*dy;
        if (distSq < limitSq) {
          const d = Math.sqrt(distSq);
          const alpha = (1 - d/CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ── Utils ─────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
  });
});
