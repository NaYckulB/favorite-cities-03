/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /node-pre-gyp\/lib\/util\/nw-pre-gyp\/index.html/,
      type: "asset/resource", // Ignore this file type
    });

    return config;
  },
};

module.exports = nextConfig;
