---
title: Check if an array has duplicates in TypeScript
date: september 2021
---

```typescript
function hasDuplicates(array: Array<any>): boolean {
  return new Set(array).size !== array.length;
}
```

[Source](https://stackoverflow.com/a/7376645/14345634)
