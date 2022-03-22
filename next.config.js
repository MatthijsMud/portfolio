const withPreact = require("next-plugin-preact");

/** @type {import('next').NextConfig} */
const nextConfig = withPreact({
  reactStrictMode: true,
  basePath: "/portfolio",
});

module.exports = nextConfig
