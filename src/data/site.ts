// Everything about Hassan that appears across the site. Edit here, not in the pages.
// Empty strings are hidden on the site, so fill them in as the details arrive.

const drive = (id: string) => (id ? `https://drive.google.com/file/d/${id}/view` : '');

export const site = {
  brand: 'Hassan Magdy',
  fullName: 'Hassan Magdy',
  handle: '', // Instagram handle without @
  email: '',
  phone: '', // shown as written, e.g. '+971 50 000 0000'
  phoneHref: '', // digits only with country code, e.g. '971500000000'
  instagram: '',
  behance: '',
  linkedin: '',
  since: 0, // first year of professional work, e.g. 2016 (0 hides it)
  cv: drive(''), // Google Drive file id of the CV
  portfolioPdf: drive(''), // Google Drive file id of the portfolio PDF
};

export const whatsapp = site.phoneHref ? `https://wa.me/${site.phoneHref}` : '';
export const yearsActive = site.since ? new Date().getFullYear() - site.since : 0;

// Hometown and current base, used in the hero and on About.
export const places = {
  from: { en: 'Alexandria', ar: 'إسكندرية', coords: '31.20° N 29.92° E' },
  now: { en: 'Dubai', ar: 'دبي', coords: '25.20° N 55.27° E' },
};

// Software he works in. Confirm with Hassan.
export const tools = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Illustrator',
];

// Brands, agencies and channels he has worked with (empty hides the section).
export const clients: string[] = [];
