// src/routes/blog/[slug]/+page.js
import { getBlogPostBySlug, getRelatedPosts } from '$lib/config/blog.js';
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