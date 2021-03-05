---
title: ESLint and TypeScript in a React / React Native project
date: 2021-02-27
author: pedenys
excerpt: Simple setup for ESLint and Typescript (in a React project)
---


## Install dependencies

```bash
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react
```

## Update ESLint config

For React : 

```js
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
}
```

For React Native : 

```js
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
	  '@react-native-community', // <-- new
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
}
```

Some rules I usually disable for personal comfort (but again it's personal) : 

```js
// .eslintrc.js
{
	// ...
	rules: {
    '@typescript-eslint/member-delimiter-style': 'off', // delimiter between members of a TS Interface or Type
    '@typescript-eslint/explicit-function-return-type': 'off', // disable mandatory return type for functions, boring for UI callbacks and all the cases where `:void` is de facto 
  },
  	// ...
}
```