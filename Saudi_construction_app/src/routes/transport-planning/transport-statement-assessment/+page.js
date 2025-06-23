// src/routes/transport-planning/transport-statement-assessment/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  return {
    title: 'Transport Statement Assessment',
    titleAr: 'تقييم بيانات النقل'
  };
}