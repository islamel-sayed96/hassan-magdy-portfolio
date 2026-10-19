// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set this to the site's domain once it has one (e.g. 'https://hassanmagdy.com').
// It turns on canonical URLs, the sitemap and absolute share links.
const SITE_URL = '';

export default defineConfig({
  site: SITE_URL || undefined,
  base: '/',
  trailingSlash: 'always',
  outDir: './dist',
  integrations: SITE_URL
    ? [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } } })]
    : [],
  build: { inlineStylesheets: 'auto' },
});
