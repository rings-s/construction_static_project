// src/routes/transport-planning/transport-feasibility-studies/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  return {
    title: 'Transport Feasibility Studies',
    titleAr: 'دراسات الجدوى النقلية'
  };
}