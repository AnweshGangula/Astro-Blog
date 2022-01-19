---
setup: |
  import Cool from '../../components/Author.astro'
  import SvelteComp from '../../components/SvelteCounter.svelte'
  import * as ReactComp from '../../components/ReactCounter.jsx';
title: Hello world!
publishDate: 12 Sep 2021
name: Nate Moore
value: 128
description: Just a Hello World Post!
layout: '../../layouts/BlogPost.astro'
---

<Cool name={frontmatter.name} href="https://twitter.com/n_moore" client:load />

<SvelteComp client:visible>
  <h1>Hello Svelte!</h1>
</SvelteComp>

<div>
  <ReactComp.Counter client:visible>
    <h1>Hello React!</h1>
    <p>What's up?</p>
  </ReactComp.Counter>
</div>

This is so cool!

Do variables work {frontmatter.value * 2}?
