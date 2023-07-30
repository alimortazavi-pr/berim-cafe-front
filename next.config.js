/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "api.berimcafe.ir",
      "api.berimcafe.org",
      "api-panel.berimcafe.org",
      "api-panel.berimcafe.ir",
      "cloud.berimcafe.ir",
      "api-panel-berim-cafe.cyclic.cloud",
    ],
  },
});
