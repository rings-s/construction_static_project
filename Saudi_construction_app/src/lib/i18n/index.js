import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

// Use dynamic imports with proper fallback
register('en', () => import('./locales/en.json'));
register('ar', () => import('./locales/ar.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? (localStorage.getItem('locale') || defaultLocale) : defaultLocale
});