// front/tailwind.config.js
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Map to CSS variables
          primary: {
            50: 'rgb(var(--color-primary-50) / <alpha-value>)',
            100: 'rgb(var(--color-primary-100) / <alpha-value>)',
            200: 'rgb(var(--color-primary-200) / <alpha-value>)',
            300: 'rgb(var(--color-primary-300) / <alpha-value>)',
            400: 'rgb(var(--color-primary-400) / <alpha-value>)',
            500: 'rgb(var(--color-primary-500) / <alpha-value>)',
            600: 'rgb(var(--color-primary-600) / <alpha-value>)',
            700: 'rgb(var(--color-primary-700) / <alpha-value>)',
            800: 'rgb(var(--color-primary-800) / <alpha-value>)',
            900: 'rgb(var(--color-primary-900) / <alpha-value>)',
            950: 'rgb(var(--color-primary-950) / <alpha-value>)',
          },
          secondary: {
            50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
            100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
            200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
            300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
            400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
            500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
            600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
            700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
            800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
            900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
            950: 'rgb(var(--color-secondary-950) / <alpha-value>)',
          },
          accent: {
            50: 'rgb(var(--color-accent-50) / <alpha-value>)',
            100: 'rgb(var(--color-accent-100) / <alpha-value>)',
            200: 'rgb(var(--color-accent-200) / <alpha-value>)',
            300: 'rgb(var(--color-accent-300) / <alpha-value>)',
            400: 'rgb(var(--color-accent-400) / <alpha-value>)',
            500: 'rgb(var(--color-accent-500) / <alpha-value>)',
            600: 'rgb(var(--color-accent-600) / <alpha-value>)',
            700: 'rgb(var(--color-accent-700) / <alpha-value>)',
            800: 'rgb(var(--color-accent-800) / <alpha-value>)',
            900: 'rgb(var(--color-accent-900) / <alpha-value>)',
            950: 'rgb(var(--color-accent-950) / <alpha-value>)',
          },
          success: {
            50: 'rgb(var(--color-success-50) / <alpha-value>)',
            100: 'rgb(var(--color-success-100) / <alpha-value>)',
            200: 'rgb(var(--color-success-200) / <alpha-value>)',
            300: 'rgb(var(--color-success-300) / <alpha-value>)',
            400: 'rgb(var(--color-success-400) / <alpha-value>)',
            500: 'rgb(var(--color-success-500) / <alpha-value>)',
            600: 'rgb(var(--color-success-600) / <alpha-value>)',
            700: 'rgb(var(--color-success-700) / <alpha-value>)',
            800: 'rgb(var(--color-success-800) / <alpha-value>)',
            900: 'rgb(var(--color-success-900) / <alpha-value>)',
            950: 'rgb(var(--color-success-950) / <alpha-value>)',
          },
          error: {
            50: 'rgb(var(--color-error-50) / <alpha-value>)',
            100: 'rgb(var(--color-error-100) / <alpha-value>)',
            200: 'rgb(var(--color-error-200) / <alpha-value>)',
            300: 'rgb(var(--color-error-300) / <alpha-value>)',
            400: 'rgb(var(--color-error-400) / <alpha-value>)',
            500: 'rgb(var(--color-error-500) / <alpha-value>)',
            600: 'rgb(var(--color-error-600) / <alpha-value>)',
            700: 'rgb(var(--color-error-700) / <alpha-value>)',
            800: 'rgb(var(--color-error-800) / <alpha-value>)',
            900: 'rgb(var(--color-error-900) / <alpha-value>)',
            950: 'rgb(var(--color-error-950) / <alpha-value>)',
          },
        },
        fontFamily: {
          // English fonts
          'sans': ['Poppins', 'DM Sans', 'system-ui', 'sans-serif'],
          'display': ['Poppins', 'DM Sans', 'system-ui', 'sans-serif'],
          
          // Arabic fonts
          'arabic': ['Cairo', 'Almarai', 'Tajawal', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
          'arabic-display': ['Cairo', 'Almarai', 'system-ui', 'sans-serif'],
          
          // Combined (for mixed content)
          'mixed': ['Cairo', 'Poppins', 'system-ui', 'sans-serif'],
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'gradient': 'gradient 15s ease infinite',
          'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 3s infinite',
          'spin-slow': 'spin 3s linear infinite',
          'float-up': 'float-up 8s linear infinite',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [
      forms,
      typography,
    ],
};