import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 7500,
		watch: { usePolling: true, interval: 1000 },

		cors: true,
		allowedHosts: ['construction.pinealdevelopers.com']
		
	}

});