// src/routes/transport-planning/technical-rebuttals/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  return {
    title: 'Technical Rebuttals',
    titleAr: 'الردود التقنية'
  };
}