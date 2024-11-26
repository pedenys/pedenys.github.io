---
title: Set Node version automatically
date: august 2024
---

Run `fnm use` or `nvm use` when `cd` into directory specifying a Node version.

The script below searches for `.nvmrc` file or `"node":"*"` entry in `package.json`.

```bash
# fnm use node version from .npmrc or package.json
check_and_use_node_version() {
  local node_version=""

  # Check for node version in .npmrc
  if [ -f ".nvmrc" ]; then
    node_version=$(cat .nvmrc)
  fi

  # Check for node version in package.json if not found in .npmrc
  if [ -z "$node_version" ] && [ -f "package.json" ]; then
    node_version=$(grep -Po '"node"\s*:\s*"\K[^"]*' package.json)
  fi

  # If node version is found, use it with fnm
  if [ -n "$node_version" ]; then
    fnm use "$node_version" #or nvm use "$node_version"
  fi
}

# Call the function on terminal startup and `cd` actions
autoload -Uz add-zsh-hook
add-zsh-hook chpwd check_and_use_node_version
check_and_use_node_version
```
