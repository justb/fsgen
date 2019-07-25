# Introduction
Add eslint prettier and code auto-format at precommit hooks for your app(include typescript)

# Installtion
```
yarn global add fsgen
npm i fsgen -g
```
# Usage
```
// Not in the project folder
fsgen my-app

// In the project folder
fsgen

// Use yarn instead of npm
fsgen -y

// Add config for typescript
fsgen -t

// Add config for cra
fsgen -c

// Show help
fsgen -h

// Show version
fsgen -V
```

Then you folder will add some files, such as `.eslint.js`, `.eslintignore`, `.editorconfig`, and `package.json` will be modified.

We will add some node_modules, such as lint-staged husky commitizen prettier eslint-config-prettier eslint-plugin-prettier.
