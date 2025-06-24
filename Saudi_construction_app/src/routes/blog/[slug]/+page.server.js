// src/routes/blog/[slug]/+page.server.js
import { getBlogPostBySlug, getRelatedPosts, BLOG_POSTS } from '$lib/config/blog.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    throw error(404, 'Blog post not found');
  }
  
  const relatedPosts = getRelatedPosts(post.id, post.categoryEn, 3);
  
  return {
    post,
    relatedPosts
  };
}

// This tells SvelteKit about all possible slug values for prerendering
export async function entries() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}