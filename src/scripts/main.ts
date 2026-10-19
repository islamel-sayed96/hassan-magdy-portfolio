import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const rtl = root.dir === 'rtl';
const pad = (n: number) => String(n).padStart(2, '0');
const tcFromFrames = (f: number) => `${pad(Math.floor(f / 90000) % 24)}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;

/* ---------- Theme ---------- */
const themeBtn = $<HTMLButtonElement>('[data-theme-toggle]');
function syncThemeLabel() {
  if (!themeBtn) return;
  const light = root.dataset.theme === 'light';
  themeBtn.setAttribute('aria-label', light ? themeBtn.dataset.labelDark! : themeBtn.dataset.labelLight!);
  $('meta[name="theme-color"]')?.setAttribute('content', light ? '#f4f3ef' : '#0b0b0d');
}
themeBtn?.addEventListener('click', () => {
  const light = root.dataset.theme !== 'light';
  if (light) root.dataset.theme = 'light'; else delete root.dataset.theme;
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch {}
  syncThemeLabel();
});
syncThemeLabel();

/* ---------- Mobile menu ---------- */
const menuBtn = $<HTMLButtonElement>('[data-menu]');
const nav = $('#nav');
menuBtn?.addEventListener('click', () => {
  const open = !nav!.classList.contains('open');
  nav!.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav?.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) { nav.classList.remove('open'); menuBtn?.setAttribute('aria-expanded', 'false'); }
});

/* ---------- Drive images: fall back to the thumbnail endpoint, then hide ---------- */
function watchImage(img: HTMLImageElement) {
  const done = () => img.classList.add('loaded');
  const fail = () => {
    const id = img.dataset.drive;
    if (id && !img.dataset.retried) {
      img.dataset.retried = '1';
      img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1280`;
    } else {
      img.classList.add('loaded');
      img.style.visibility = 'hidden';
    }
  };
  img.addEventListener('load', done);
  img.addEventListener('error', fail);
  if (img.complete) (img.naturalWidth ? done() : fail());
}
$$<HTMLImageElement>('img[data-drive]').forEach(watchImage);

/* ---------- Monitor timecode (follows the 8s motion loop) ---------- */
const tcEls = $$('[data-tc]');
if (tcEls.length) {
  const t0 = performance.now();
  const tick = (now: number) => {
    const f = Math.floor(((now - t0) / 1000) * 25);
    tcEls.forEach((el) => (el.textContent = tcFromFrames(f)));
    if (!reduce) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Dubai local time ---------- */
const clock = $('[data-clock]');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });
  const set = () => (clock.textContent = fmt.format(new Date()));
  set();
  setInterval(set, 20_000);
}

/* ---------- Hero verbs highlight their track on the timeline ---------- */
const tl = $('[data-tl]');
$$('[data-verb]').forEach((v) => {
  const on = () => {
    tl?.classList.add('focus');
    $$('[data-track]', tl ?? document).forEach((r) => r.classList.toggle('on', r.dataset.track === v.dataset.verb));
  };
  const off = () => tl?.classList.remove('focus');
  v.addEventListener('pointerenter', on);
  v.addEventListener('pointerleave', off);
});

/* ---------- Dialog helpers ---------- */
$$('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach((d) =>
  d.addEventListener('click', (e) => {
    const el = e.target as Element;
    if (el.classList.contains('lb') || el.classList.contains('lb-stage')) d.close();
  }),
);

/* ---------- Image viewer (design work) ---------- */
const lb = $<HTMLDialogElement>('#lightbox')!;
const lbStage = $('[data-lb-stage]', lb)!;
let lbItems: HTMLElement[] = [];
let lbIndex = 0;
const full = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w2200`;
function showLb() {
  const btn = lbItems[lbIndex];
  const im = new Image();
  im.alt = btn.getAttribute('aria-label') ?? '';
  im.dataset.drive = btn.dataset.lightbox!;
  im.src = full(btn.dataset.lightbox!);
  watchImage(im);
  lbStage.replaceChildren(im);
  $('[data-lb-cap]', lb)!.textContent = btn.dataset.caption ?? '';
  $('[data-lb-count]', lb)!.textContent = `${lbIndex + 1} / ${lbItems.length}`;
  const next = lbItems[(lbIndex + 1) % lbItems.length];
  if (next) new Image().src = full(next.dataset.lightbox!);
}
function stepLb(d: number) { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLb(); }
document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLElement>('[data-lightbox]');
  if (!btn || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return;
  e.preventDefault();
  const sheet = btn.closest('[data-sheet]') ?? document;
  lbItems = $$<HTMLElement>('[data-lightbox]', sheet).filter((b) => !b.closest('.card')?.hasAttribute('hidden'));
  lbIndex = lbItems.indexOf(btn);
  showLb();
  lb.showModal();
});
$('[data-lb-prev]', lb)?.addEventListener('click', () => stepLb(rtl ? 1 : -1));
$('[data-lb-next]', lb)?.addEventListener('click', () => stepLb(rtl ? -1 : 1));
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') stepLb(rtl ? -1 : 1);
  if (e.key === 'ArrowLeft') stepLb(rtl ? 1 : -1);
});
let touchX = 0;
lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
lb.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) stepLb((dx < 0) !== rtl ? 1 : -1);
});

/* ---------- Filters ---------- */
const filters = $('[data-filters]');
filters?.addEventListener('click', (e) => {
  const chip = (e.target as Element).closest<HTMLElement>('[data-cat]');
  if (!chip) return;
  const cat = chip.dataset.cat;
  $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
  $$('.card').forEach((c) => c.toggleAttribute('hidden', !(cat === 'all' || c.dataset.track === cat)));
  if (!reduce) ScrollTrigger.refresh();
});

/* ---------- Video player ---------- */
const vp = $<HTMLDialogElement>('#player')!;
const frame = (id: string, title: string) => {
  const fr = document.createElement('iframe');
  fr.src = `https://drive.google.com/file/d/${id}/preview`;
  fr.allow = 'autoplay; fullscreen; picture-in-picture';
  fr.allowFullscreen = true;
  fr.title = title;
  return fr;
};
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('[data-video]');
  if (!a || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return;
  e.preventDefault();
  const id = a.dataset.video!;
  const title = a.dataset.title ?? 'Video';
  // The showreel plays inside the hero monitor.
  if (a.hasAttribute('data-inline')) {
    if (a.classList.contains('playing')) return;
    a.classList.add('playing');
    a.removeAttribute('data-cursor');
    $('.cursor')?.classList.remove('on');
    a.append(frame(id, title));
    return;
  }
  $('[data-vp-title]', vp)!.textContent = title;
  $<HTMLAnchorElement>('[data-vp-link]', vp)!.href = a.href;
  $('[data-vp-stage]', vp)!.replaceChildren(frame(id, title));
  vp.showModal();
});
vp.addEventListener('close', () => $('[data-vp-stage]', vp)!.replaceChildren());

/* ---------- Copy buttons ---------- */
$$<HTMLButtonElement>('[data-copy]').forEach((b) => {
  const label = b.textContent;
  b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy!); b.textContent = b.dataset.done!; }
    catch { b.textContent = b.dataset.copy!; }
    setTimeout(() => (b.textContent = label), 1600);
  });
});

/* ---------- Page scrubber: the page as a clip, sections as markers ---------- */
const scrub = $('[data-scrub]');
if (scrub && matchMedia('(hover: hover) and (min-width: 761px)').matches) {
  const lane = $('[data-scrub-lane]', scrub)!;
  const fill = $('[data-scrub-fill]', scrub)!;
  const head = $('[data-scrub-head]', scrub)!;
  const tcEl = $('[data-scrub-tc]', scrub)!;
  const footer = $('.site-footer');
  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const marks = $$('[data-marker]').map((sec) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'scrub-mark';
    b.tabIndex = -1;
    const s = document.createElement('span');
    s.textContent = sec.dataset.marker!;
    b.append(s);
    b.addEventListener('click', (e) => { e.stopPropagation(); sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
    lane.append(b);
    return { b, sec };
  });
  const layout = () => marks.forEach(({ b, sec }) => (b.style.left = `${Math.min(100, (sec.offsetTop / maxScroll()) * 100)}%`));
  const update = () => {
    const p = Math.min(1, scrollY / maxScroll());
    fill.style.width = `${p * 100}%`;
    head.style.left = `${p * 100}%`;
    tcEl.textContent = tcFromFrames(Math.round(scrollY / 3));
    marks.forEach(({ b, sec }) => b.classList.toggle('passed', scrollY + 2 >= Math.min(sec.offsetTop, maxScroll())));
    const fr = footer?.getBoundingClientRect();
    scrub.classList.toggle('hide', scrollY < 40 || Boolean(fr && fr.top < innerHeight - 10));
  };
  lane.addEventListener('click', (e) => {
    const r = lane.getBoundingClientRect();
    scrollTo({ top: ((e.clientX - r.left) / r.width) * maxScroll(), behavior: reduce ? 'auto' : 'smooth' });
  });
  layout(); update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', () => { layout(); update(); });
  addEventListener('load', () => { layout(); update(); });
}

/* ---------- Cursor label over playable media (mouse only) ---------- */
const cursor = $('.cursor');
if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
  $$('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => { cursor.textContent = el.dataset.cursor!; cursor.classList.add('on'); });
    el.addEventListener('pointerleave', () => cursor.classList.remove('on'));
  });
}

/* ---------- Process: the playhead follows the scroll ---------- */
const process = $('[data-process]');
const steps = $$('[data-step]', process ?? document);
function setProcess(p: number) {
  process!.style.setProperty('--p', String(p));
  const i = Math.min(steps.length - 1, Math.floor(p * steps.length));
  steps.forEach((s, j) => s.classList.toggle('on', j === i));
}

/* ---------- Motion ---------- */
if (process && reduce) setProcess(0);
if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero: letters pop in like keyframes, then the monitor and timeline slide up.
  const chars = $$('[data-hero-name] .ch');
  if (chars.length) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(chars, { yPercent: 70, scaleY: 1.6, opacity: 0, duration: 1, stagger: { each: 0.045, from: rtl ? 'end' : 'start' }, transformOrigin: '50% 100%' })
      .from('[data-hero-name] .kf', { scale: 0, rotate: 135, duration: .8, ease: 'back.out(3)' }, 0.55)
      .from('[data-hero-monitor] > *', { y: 50, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.2)
      .from('[data-hero-fade]', { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.4);
  }

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.from(els, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity' }),
  });

  // Section titles wipe in like a title card.
  $$('.sec-head h2, .big-cta').forEach((h) => {
    gsap.from(h, { clipPath: rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', duration: 1.1, ease: 'expo.inOut', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
  });

  // Each service track's clip extends as it scrolls past.
  $$('.track').forEach((tr) => {
    gsap.to($('.track-clip i', tr), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: tr, start: 'top 85%', end: 'bottom 40%', scrub: true } });
  });

  if (process) {
    ScrollTrigger.create({
      trigger: process, start: 'top 75%', end: 'bottom 35%', scrub: true,
      onUpdate: (st) => setProcess(Math.min(0.999, st.progress)),
    });
    setProcess(0);
  }

  // Route arc draws between the two cities.
  const route = $<SVGPathElement>('[data-route]');
  if (route) {
    route.style.strokeDasharray = '1';
    gsap.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: route, start: 'top 85%', end: 'top 45%', scrub: true } });
  }

  // Format frames grow in from the baseline.
  gsap.from('.format-box', { scaleY: 0, transformOrigin: '50% 100%', duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.formats', start: 'top 85%', once: true } });
}
