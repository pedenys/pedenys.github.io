---
title: Wrong git remote after updating ssh config
date: november 2024
---

When you update the host in your `~/.ssh.config`, the remote your local repository is linked to has to be updated to.

## Before

Two ssh keys for two identies (one profesional, one personal).

```bash
# ~/.ssh.config
Host github-pro
  Hostname github.com
  User git
  IdentityFile ~/.ssh/companyA

Host github-personal
  Hostname github.com
  User git
  IdentityFile ~/.ssh/pedenys
```

## After

One ssh key for one identity, removing the need for distinction between personal and profesional.

```bash
# ~/.ssh.config
Host github
  Hostname github.com
  User git
  IdentityFile ~/.ssh/pedenys
```

then updating the remote

```bash
> cd ~/personal-project
> git remote add origin git@github.com:pedenys/pedenys.github.io.git

origin  git@github.com:pedenys/pedenys.github.io.git (fetch)
origin  git@github.com:pedenys/pedenys.github.io.git (push)
```
