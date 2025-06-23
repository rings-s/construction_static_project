// src/routes/traffic-modelling/+page.js
import { error } from '@sveltejs/kit';

export async function load() {
  return {
    title: 'high-way Modelling',
    titleAr: 'نمذجة حركة المرور'
  };
}