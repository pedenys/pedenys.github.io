---
title: No border overlap on hover in CSS
date: july 2018
---

1. Add a transparent border without the hover, give it color on hover
2. Using 'box-sizing' but then you have to define the width and the height
3. Substracting margin with a value of the border (in px)

```css
/* 1. */
item {
  border: 3px solid transparent;
}
item:hover {
  border: 3px solid inherit;
}

/*2. */
item {
  box-sizing: border-box;
}

item:hover {
  border-top: 3px solid #d0d0d0;
}
/*3. */
item:hover {
  border: 3px solid inherit;
  margin: -3px;
}
```

Source : I forgot ¯\\\_(ツ)\_/¯
