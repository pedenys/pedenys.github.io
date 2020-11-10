---
title: Set git language
author: pedenys
date: 2020-08-15
excerpt: Set git language globally or using alias
---

To set language used by git, update your bash config file :

```bash
alias git='LANG=en_GB git'
```

or globally :

```bash
# .zshrc
export LANG=en_US.UTF-8
```
