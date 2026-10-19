// Hassan's projects. Videos and images live in Google Drive (shared as "Anyone with the link").
//
// - `id`: the Drive file id. Leave it empty while the file isn't ready; the card then shows
//   a coloured placeholder and can't be opened.
// - `kind`: 'video' plays in the video player, 'image' opens in the image viewer.
// - `track`: which discipline it belongs to (also sets its colour).
// - `ratio`: the shape of the card. Use '9:16' for Reels/TikTok, '1:1' or '4:5' for posts.
// - `featured: true` shows it on the home page.
// - `titleAr`: the Arabic title shown on /ar/ pages.

export type Track = 'edit' | 'motion' | 'design';
export type Ratio = '16:9' | '9:16' | '1:1' | '4:5';

export interface Project {
  id: string;
  kind: 'video' | 'image';
  track: Track;
  title: string;
  titleAr?: string; // Arabic title (falls back to `title`)
  client?: string;
  year?: number;
  ratio: Ratio;
  featured?: boolean;
}

export const tracks: Track[] = ['edit', 'motion', 'design'];

// The hero showreel. While `id` is empty, the monitor plays the built-in motion piece instead.
export const showreel = { id: '', title: 'Showreel' };

// Placeholder line-up so the layout can be reviewed. Replace with the real projects.
export const projects: Project[] = [
  { id: '', kind: 'video', track: 'edit', title: 'Brand film', titleAr: 'فيلم براند', ratio: '16:9', featured: true },
  { id: '', kind: 'video', track: 'motion', title: 'Logo animation', titleAr: 'تحريك لوجو', ratio: '1:1', featured: true },
  { id: '', kind: 'video', track: 'edit', title: 'Reels series', titleAr: 'سلسلة ريلز', ratio: '9:16', featured: true },
  { id: '', kind: 'image', track: 'design', title: 'Campaign key visual', titleAr: 'كي فيجوال لحملة', ratio: '4:5', featured: true },
  { id: '', kind: 'video', track: 'motion', title: 'Explainer video', titleAr: 'فيديو إكسبلينر', ratio: '16:9', featured: true },
  { id: '', kind: 'video', track: 'edit', title: 'Event recap', titleAr: 'ملخص إيفنت', ratio: '16:9' },
  { id: '', kind: 'image', track: 'design', title: 'Social media posts', titleAr: 'بوستات سوشيال ميديا', ratio: '1:1' },
  { id: '', kind: 'video', track: 'motion', title: 'Kinetic typography', titleAr: 'كاينتك تايبوجرافي', ratio: '9:16' },
  { id: '', kind: 'video', track: 'edit', title: 'Podcast episode', titleAr: 'حلقة بودكاست', ratio: '16:9' },
  { id: '', kind: 'image', track: 'design', title: 'Brand identity', titleAr: 'هوية براند', ratio: '4:5' },
  { id: '', kind: 'video', track: 'motion', title: 'Lower thirds & titles', titleAr: 'لوور ثيردز وتايتلز', ratio: '16:9' },
  { id: '', kind: 'video', track: 'edit', title: 'Ad spot', titleAr: 'إعلان', ratio: '9:16' },
];

export const player = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const viewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const poster = (id: string, w = 1280) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
export const img = (id: string, w: number) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;
