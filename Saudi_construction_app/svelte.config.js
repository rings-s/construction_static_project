// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$lib: './src/lib'
		  },
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing og-image and other static assets
				if (path.includes('og-image') || path.includes('.jpg') || path.includes('.png')) {
					console.warn(`Missing file: ${path}`);
					return;
				}
				throw new Error(message);
			}
		}
	},
	preprocess: vitePreprocess()
};

export default config;