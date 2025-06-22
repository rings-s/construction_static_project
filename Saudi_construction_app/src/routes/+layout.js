// src/routes/+layout.js
export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
	return {
		meta: {
			title: 'Transport Engineering Consultancy - Leading Highway & Traffic Solutions',
			description: 'Leading transport and highway engineering consultancy delivering innovative solutions for sustainable infrastructure development. Expert traffic planning and highway design services.',
			url: 'https://transportconsulting.com',
			image: '/og-image.jpg'
		}
	};
}