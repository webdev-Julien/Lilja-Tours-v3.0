/**
 * MDX Component Overrides
 *
 * This file exports component mappings for MDX content rendering.
 * When MDX content is rendered with these components, standard HTML
 * elements are replaced with optimized Astro components.
 *
 * Usage in .astro pages:
 *   import { mdxComponents } from '../components/mdx';
 *   const { Content } = await entry.render();
 *   <Content components={mdxComponents} />
 */

import MdxImage from '../MdxImage.astro';

// Export the component mapping for MDX
// Maps standard HTML elements to custom Astro components
export const mdxComponents = {
  // Replace <img> tags with optimized MdxImage component
  // This applies Cloudflare Image Transformations with responsive srcset
  img: MdxImage,
};

// Re-export individual components for direct use if needed
export { MdxImage };
