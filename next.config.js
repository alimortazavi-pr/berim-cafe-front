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
      "beim-cafe-panel.liara.run",
      "berim-cafe-back-production.up.railway.app",
      "berim-cafe-users-back-production.up.railway.app",
      "berimcafe-icons.s3.ir-thr-at1.arvanstorage.ir",
    ],
  },
});
