// src/routes/transport-planning/travel-plan-development/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  return {
    title: 'Travel Plan Development',
    titleAr: 'تطوير خطط السفر'
  };
}