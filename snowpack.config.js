/* Use this if you need to proxy to a backend that doesn't support CORS.
const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({ target: "https://non.cors.domain" });
*/

// The added "@type" comment will enable TypeScript type information via VSCode, etc.

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-svelte"],
  routes: [
    /* Example: Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
    /* Example: proxy to another backend without CORS */
    /*
    {
      src: "/api/.*",
      dest: (req, res) => {
        // remove /api prefix (optional)
        // req.url = req.url.replace(/^\/api/, "");
        proxy.web(req, res);
      },
    },
    */
  ],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: true,
    minify: true,
    treeshake: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
    // sourcemap: true,
    clean: true,
  },
};
