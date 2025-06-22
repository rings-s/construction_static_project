<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	let theme = $state('light');
	let mounted = $state(false);

	onMount(() => {
		if (browser) {
			// Get saved theme or system preference
			const savedTheme = localStorage.getItem('theme');
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			const initialTheme = savedTheme || systemTheme;
			
			theme = initialTheme;
			updateTheme(initialTheme);
			
			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					const newTheme = e.matches ? 'dark' : 'light';
					theme = newTheme;
					updateTheme(newTheme);
				}
			});
		}
		mounted = true;
	});

	function updateTheme(newTheme) {
		if (browser) {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
			localStorage.setItem('theme', newTheme);
		}
	}

	$effect(() => {
		if (mounted && browser) {
			updateTheme(theme);
		}
	});

	export function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}
</script>

{@render children()}