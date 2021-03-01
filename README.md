# Svelte app template for Snowpack

This is a starting point for Svelte apps using Snowpack as a bundler.

For more education visit https://youtube.com/spinspire. For help with your
projects and business inquiries visit https://spinspire.com/

# Features

- HMR (Hot Module Reloading) injects newly compiled code into the running
  dev server without a page reload
- Unbundled development (very fast) means Snowpack is not wasting time on
  building bundles during development
- Optimized PROD build (bundle, minify, treeshake)
- Typescript
- SASS
- (Commented out) proxy from dev server to your backend (so that dev server JS
  can call backend even if it doesn't support CORS)

# How to use

- `git clone` this repo
- edit `package.json`
- `yarn install`
- `yarn start` or `yarn build`
- If you want to use the dev proxy then uncomment the lines at the top and middle
  of `snowpack.config.js`