// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import astroRemark from '@astrojs/markdown-remark';

import rehypePlugin from './rehypePlugin.mjs';

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: [
    '@astrojs/renderer-preact',
    '@astrojs/renderer-react',
    '@astrojs/renderer-svelte',
  ],
  markdownOptions: {
    render: [
      astroRemark,
      {
        // Reference: https://stackblitz.com/edit/github-ajreza-yea7u7?file=astro.config.mjs
        remarkPlugins: ['remark-code-titles'],
        rehypePlugins: [
          { default: (await import('rehype-slug')).default },
          ['rehype-autolink-headings', { behavior: 'prepend' }],
          ['rehype-toc', { headings: ['h2', 'h3'] }],
          ['rehype-add-classes', { 'h1,h2,h3': 'title' }],
          { default: rehypePlugin },
        ],
      },
    ],
  },
});
