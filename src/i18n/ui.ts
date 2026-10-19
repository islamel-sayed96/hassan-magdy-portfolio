import type { Track } from '../data/work';

export type Lang = 'en' | 'ar';
export const langs: Lang[] = ['en', 'ar'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds a site URL for a page key ('' = home) in a language. */
export function path(lang: Lang, page = '') {
  const p = page ? `${page}/` : '';
  return lang === 'en' ? `${base}/${p}` : `${base}/ar/${p}`;
}
export const asset = (file: string) => `${base}/${file}`;

type Strings = {
  dir: 'ltr' | 'rtl';
  nav: { work: string; about: string; contact: string };
  menu: string; close: string;
  langSwitch: string; themeDark: string; themeLight: string;
  skip: string;
  roles: string[];
  from: string; now: string; localTime: string;
  verbs: [string, string, string];
  heroLede: string;
  ctaHire: string; ctaWork: string;
  monitor: string; reelPlay: string; reelSoon: string;
  tracks: Record<Track, string>;
  trackShort: Record<Track, string>;
  workTitle: string; workLede: string; seeAllWork: string; soon: string; all: string;
  servicesTitle: string; servicesLede: string;
  services: Record<Track, { text: string; items: string[] }>;
  processTitle: string; processLede: string;
  process: { title: string; text: string }[];
  formatsTitle: string; formatsLede: string;
  formats: { ratio: string; label: string }[];
  routeTitle: string; routeLede: string;
  toolsTitle: string;
  clientsTitle: string;
  contactTitle: [string, string]; contactLede: string; contactSoon: string;
  email: string; whatsapp: string; instagram: string; copy: string; copied: string;
  cv: string; portfolioPdf: string;
  workPageLede: string;
  aboutKicker: string; bio: string[];
  historyTitle: string; history: { years: string; role: string; place: string }[];
  languagesTitle: string; languages: string; basedTitle: string; hometownTitle: string;
  portraitNote: string;
  watch: string; view: string; openDrive: string; prev: string; next: string;
  footerLine: string;
  notFoundTitle: string; notFoundText: string; backHome: string;
  meta: Record<'home' | 'work' | 'about', { title: string; description: string }>;
};

export const ui: Record<Lang, Strings> = {
  en: {
    dir: 'ltr',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    menu: 'Menu', close: 'Close',
    langSwitch: 'العربية', themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme',
    skip: 'Skip to content',
    roles: ['Video editor', 'Motion designer', 'Graphic designer'],
    from: 'From', now: 'Based in', localTime: 'Dubai time',
    verbs: ['Cut.', 'Move.', 'Design.'],
    heroLede: 'Video editor, motion designer and graphic designer from Alexandria, now working in Dubai. I take raw footage and loose ideas and turn them into edits with rhythm, motion with purpose and visuals people stop scrolling for.',
    ctaHire: 'Start a project', ctaWork: 'See the work',
    monitor: 'Program', reelPlay: 'Play showreel', reelSoon: 'Showreel coming soon',
    tracks: { edit: 'Video editing', motion: 'Motion graphics', design: 'Graphic design' },
    trackShort: { edit: 'Edit', motion: 'Motion', design: 'Design' },
    workTitle: 'Selected work', workLede: 'Edits, animation and design from recent projects.', seeAllWork: 'See all work', soon: 'Soon', all: 'All',
    servicesTitle: 'Three tracks, one timeline', servicesLede: 'Most projects need more than one of these. Hassan does all three, so the edit, the motion and the design come out as one piece.',
    services: {
      edit: { text: 'Story, pace and sound, from the rough cut to the final export.', items: ['Brand films, ads and event recaps', 'Reels, TikTok and YouTube', 'Colour grading and sound clean-up'] },
      motion: { text: 'Animation that explains, sells or simply looks good.', items: ['Logo animation and intros', 'Kinetic typography and titles', 'Explainers and animated infographics'] },
      design: { text: 'Visuals that hold together across every post and screen.', items: ['Social media design', 'Campaign key visuals', 'Thumbnails, posters and brand assets'] },
    },
    processTitle: 'How a project runs', processLede: 'Scroll to move the playhead.',
    process: [
      { title: 'Brief', text: 'What it is for, who will watch it and where it will run.' },
      { title: 'Rough cut', text: 'Structure first: the story, the order and the pace.' },
      { title: 'Motion & graphics', text: 'Titles, animation and design added on top of the cut.' },
      { title: 'Colour & sound', text: 'Grade, mix and polish until it feels finished.' },
      { title: 'Delivery', text: 'Exported in every size and format the platforms need.' },
    ],
    formatsTitle: 'Every format', formatsLede: 'One project, cut and designed for every screen it runs on.',
    formats: [
      { ratio: '16:9', label: 'YouTube · TV · Web' },
      { ratio: '9:16', label: 'Reels · TikTok · Stories' },
      { ratio: '1:1', label: 'Feed posts' },
      { ratio: '4:5', label: 'Portrait posts' },
    ],
    routeTitle: 'From the Med to the Gulf', routeLede: 'Raised on the Mediterranean, working by the Gulf, for clients in both places and beyond.',
    toolsTitle: 'Tools',
    clientsTitle: 'Worked with',
    contactTitle: ["Let's cut", 'something together.'], contactLede: 'Send Hassan your idea, footage or brief, and he will get back to you with a plan and a timeline.', contactSoon: 'Contact details coming soon.',
    email: 'Email', whatsapp: 'WhatsApp', instagram: 'Instagram', copy: 'Copy', copied: 'Copied',
    cv: 'Download CV', portfolioPdf: 'Portfolio PDF',
    workPageLede: 'Video editing, motion graphics and graphic design. Filter by track, then open any project.',
    aboutKicker: 'Behind the timeline',
    bio: [
      "I'm Hassan Magdy, a video editor, motion designer and graphic designer. I grew up in Alexandria, Egypt, and now work from Dubai.",
      'I like projects where the edit, the animation and the design all have to work together. I start with the story, keep the pace tight, and make sure every frame looks like it belongs to the same brand.',
    ],
    historyTitle: 'Experience', history: [],
    languagesTitle: 'Languages', languages: 'Arabic · English', basedTitle: 'Based in', hometownTitle: 'From',
    portraitNote: 'Portrait coming soon',
    watch: 'Play', view: 'View', openDrive: 'Open on Google Drive ↗', prev: 'Previous', next: 'Next',
    footerLine: 'Editing · Motion · Design',
    notFoundTitle: 'Clip offline', notFoundText: "This page isn't on the timeline. The rest of the project is.", backHome: 'Back to home',
    meta: {
      home: { title: 'Hassan Magdy · Video Editor & Motion Designer in Dubai', description: 'Hassan Magdy is a video editor, motion designer and graphic designer from Alexandria, based in Dubai. Brand films, Reels, animation and social design.' },
      work: { title: 'Work · Hassan Magdy', description: 'Video editing, motion graphics and graphic design projects by Hassan Magdy, an editor and motion designer based in Dubai.' },
      about: { title: 'About · Hassan Magdy', description: 'About Hassan Magdy: video editor, motion designer and graphic designer from Alexandria, Egypt, working in Dubai, UAE.' },
    },
  },
  ar: {
    dir: 'rtl',
    nav: { work: 'الأعمال', about: 'عنّي', contact: 'تواصل' },
    menu: 'القائمة', close: 'إغلاق',
    langSwitch: 'English', themeDark: 'الوضع الداكن', themeLight: 'الوضع الفاتح',
    skip: 'تخطَّ إلى المحتوى',
    roles: ['مونتير', 'موشن جرافيك', 'جرافيك ديزاينر'],
    from: 'من', now: 'مقيم في', localTime: 'توقيت دبي',
    verbs: ['قص.', 'حركة.', 'تصميم.'],
    heroLede: 'مونتير وموشن جرافيك ديزاينر وجرافيك ديزاينر من إسكندرية، وشغال دلوقتي في دبي. باخد الفوتيج الخام والفكرة لسه في أولها، وأطلّعها مونتاج ليه إيقاع وموشن ليه معنى وتصميم يوقّف أي حد بيعمل سكرول.',
    ctaHire: 'ابدأ مشروعك', ctaWork: 'شوف الأعمال',
    monitor: 'Program', reelPlay: 'شغّل الشوريل', reelSoon: 'الشوريل قريباً',
    tracks: { edit: 'مونتاج فيديو', motion: 'موشن جرافيك', design: 'جرافيك ديزاين' },
    trackShort: { edit: 'مونتاج', motion: 'موشن', design: 'ديزاين' },
    workTitle: 'أعمال مختارة', workLede: 'مونتاج وأنيميشن وتصميم من مشاريع قريبة.', seeAllWork: 'كل الأعمال', soon: 'قريباً', all: 'الكل',
    servicesTitle: 'تلات تراكات، تايملاين واحد', servicesLede: 'أغلب المشاريع محتاجة أكتر من حاجة فيهم. حسن بيعمل التلاتة، فالمونتاج والموشن والتصميم بيطلعوا قطعة واحدة.',
    services: {
      edit: { text: 'الحكاية والإيقاع والصوت، من أول رَف كَت لحد آخر إكسبورت.', items: ['فيديوهات براندات وإعلانات وإيفنتات', 'ريلز وتيك توك ويوتيوب', 'تلوين وتنضيف صوت'] },
      motion: { text: 'أنيميشن بيشرح أو بيبيع أو ببساطة شكله حلو.', items: ['تحريك لوجوهات وإنترو', 'كاينتك تايبوجرافي وتايتلز', 'إكسبلينر وإنفوجرافيك متحرك'] },
      design: { text: 'تصميم متماسك في كل بوست وكل شاشة.', items: ['تصميم سوشيال ميديا', 'كي فيجوال للحملات', 'ثامبنيلز وبوسترات وهوية براند'] },
    },
    processTitle: 'المشروع بيمشي إزاي', processLede: 'اعمل سكرول عشان البلاي هيد يتحرك.',
    process: [
      { title: 'البريف', text: 'الفيديو ده لمين، وهيتعرض فين، وعايزين منه إيه.' },
      { title: 'رَف كَت', text: 'الهيكل الأول: الحكاية والترتيب والإيقاع.' },
      { title: 'موشن وجرافيك', text: 'التايتلز والأنيميشن والتصميم فوق المونتاج.' },
      { title: 'تلوين وصوت', text: 'جريدنج وميكس وتشطيب لحد ما يبقى جاهز.' },
      { title: 'التسليم', text: 'إكسبورت بكل المقاسات والفورمات اللي المنصات محتاجاها.' },
    ],
    formatsTitle: 'كل المقاسات', formatsLede: 'مشروع واحد، متقصّ ومتصمم لكل شاشة هيتعرض عليها.',
    formats: [
      { ratio: '16:9', label: 'يوتيوب · تلفزيون · ويب' },
      { ratio: '9:16', label: 'ريلز · تيك توك · ستوري' },
      { ratio: '1:1', label: 'بوستات مربعة' },
      { ratio: '4:5', label: 'بوستات طولية' },
    ],
    routeTitle: 'من المتوسط للخليج', routeLede: 'اتربّى على البحر المتوسط، وشغال على الخليج، مع عملاء هنا وهناك وأبعد.',
    toolsTitle: 'البرامج',
    clientsTitle: 'اشتغل مع',
    contactTitle: ['يلا نقطّع', 'حاجة حلوة سوا.'], contactLede: 'ابعت لحسن الفكرة أو الفوتيج أو البريف، وهو هيرد عليك بخطة ومواعيد.', contactSoon: 'بيانات التواصل قريباً.',
    email: 'الإيميل', whatsapp: 'واتساب', instagram: 'إنستجرام', copy: 'نسخ', copied: 'اتنسخ',
    cv: 'تحميل السي في', portfolioPdf: 'البورتفوليو PDF',
    workPageLede: 'مونتاج وموشن جرافيك وجرافيك ديزاين. اختار التراك، وافتح أي مشروع.',
    aboutKicker: 'ورا التايملاين',
    bio: [
      'أنا حسن مجدي، مونتير وموشن جرافيك ديزاينر وجرافيك ديزاينر. اتربيت في إسكندرية، ودلوقتي شغال من دبي.',
      'بحب المشاريع اللي المونتاج والأنيميشن والتصميم فيها لازم يشتغلوا مع بعض. ببدأ بالحكاية، وبحافظ على الإيقاع، وبتأكد إن كل فريم شبه البراند بتاعه.',
    ],
    historyTitle: 'الخبرة', history: [],
    languagesTitle: 'اللغات', languages: 'العربية · الإنجليزية', basedTitle: 'مقيم في', hometownTitle: 'من',
    portraitNote: 'الصورة الشخصية قريباً',
    watch: 'شغّل', view: 'افتح', openDrive: 'افتح على جوجل درايف ↗', prev: 'السابق', next: 'التالي',
    footerLine: 'مونتاج · موشن · ديزاين',
    notFoundTitle: 'الكليب أوفلاين', notFoundText: 'الصفحة دي مش على التايملاين، بس باقي المشروع موجود.', backHome: 'ارجع للرئيسية',
    meta: {
      home: { title: 'حسن مجدي · مونتير وموشن جرافيك في دبي', description: 'حسن مجدي مونتير وموشن جرافيك ديزاينر وجرافيك ديزاينر من إسكندرية، مقيم في دبي. فيديوهات براندات وريلز وأنيميشن وتصميم سوشيال ميديا.' },
      work: { title: 'الأعمال · حسن مجدي', description: 'مشاريع مونتاج وموشن جرافيك وجرافيك ديزاين لحسن مجدي، مونتير وموشن ديزاينر في دبي.' },
      about: { title: 'عن حسن مجدي', description: 'حسن مجدي: مونتير وموشن جرافيك ديزاينر وجرافيك ديزاينر من إسكندرية، شغال في دبي.' },
    },
  },
};
