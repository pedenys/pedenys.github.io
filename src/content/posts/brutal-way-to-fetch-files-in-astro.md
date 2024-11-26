---
title: A brutal way to fetch files in Astro
date: march 2024
---

```ts
// Use Astro.glob() to fetch all posts, and then sort them by date.
const entries = (await Astro.glob("../../pages/entries/**/*.{md,mdx}")).sort(
  (a, b) =>
    new Date(b.frontmatter.date).valueOf() -
    new Date(a.frontmatter.date).valueOf(),
) as Entry[];
```
