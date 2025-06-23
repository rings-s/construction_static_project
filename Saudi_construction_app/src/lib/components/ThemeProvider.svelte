<!-- src/lib/components/ThemeProvider.svelte -->
<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	let theme = $state('light');
	let mounted = $state(false);
	let isTransitioning = $state(false);

	onMount(() => {
		if (browser) {
			const savedTheme = localStorage.getItem('theme');
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			const initialTheme = savedTheme || systemTheme;
			
			theme = initialTheme;
			updateTheme(initialTheme);
			
			// Enhanced system theme listener
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleSystemThemeChange = (e) => {
				if (!localStorage.getItem('theme')) {
					const newTheme = e.matches ? 'dark' : 'light';
					smoothThemeTransition(newTheme);
				}
			};
			
			mediaQuery.addEventListener('change', handleSystemThemeChange);
			
			// Cleanup
			return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
		}
		mounted = true;
	});

	function updateTheme(newTheme) {
		if (browser) {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
			localStorage.setItem('theme', newTheme);
		}
	}

	function smoothThemeTransition(newTheme) {
		if (!browser) return;
		
		isTransitioning = true;
		
		// Add transition class
		document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
		
		setTimeout(() => {
			theme = newTheme;
			updateTheme(newTheme);
			
			setTimeout(() => {
				document.documentElement.style.transition = '';
				isTransitioning = false;
			}, 300);
		}, 50);
	}

	export function toggleTheme() {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		smoothThemeTransition(newTheme);
	}

	$effect(() => {
		if (mounted && browser) {
			updateTheme(theme);
		}
	});
</script>

<div class={isTransitioning ? 'theme-transitioning' : ''}>
	{@render children()}
</div>

<style>
	.theme-transitioning * {
		transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease !important;
	}
</style>