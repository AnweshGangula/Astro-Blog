// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import astroRemark from '@astrojs/markdown-remark';

import rehypePlugin from './rehypePlugin.mjs';
import { s } from 'hastscript'

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
        remarkPlugins: ['remark-code-titles', 'remark-gfm'],
        rehypePlugins: [
          { default: (await import('rehype-slug')).default },
          ['rehype-autolink-headings', {
            behavior: 'prepend',
            content: s(
              // add SVG using rehype-autolink-headings in mdx.js - https://github.com/remarkjs/remark/discussions/732#discussioncomment-816042
              // another reference: https://github.com/janosh/svelte-toc/commit/8493df334a11661eddf03434372f6cd71ea313c1
              `svg`,
              { width: 16, height: 16, viewBox: `0 0 16 16` },
              // symbol #link-icon defined in app.html
              s(`use`, { 'xlink:href': `#link-icon` })
            ),
          }],
          ['rehype-toc', { headings: ['h2', 'h3'] }],
          ['rehype-add-classes', { 'h1,h2,h3': 'title' }],
          { default: rehypePlugin },
        ],
      },
    ],
  },
});
