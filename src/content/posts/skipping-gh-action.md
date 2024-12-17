---
title: Skipping GitHub action
date: december 2024
---

Use the `if` conditional to prevent a job from running unless a condition is met.

Here it's being used to prevent from deploying an application if the commit message includes `[skip deploy]`.

```yml
name: Deploy
on:
  push:
    branches: main
  pull_request:
    branches: main

jobs:
  deploy:
    name: Deploy
    if: contains(github.event.head_commit.message, '[skip deploy]') == false
    runs-on: ubuntu-latest

  steps:
    #...
```
