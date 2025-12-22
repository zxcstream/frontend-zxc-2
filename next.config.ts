import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
    qualities: [75, 100],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
            default-src 'self';
           script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.googletagmanager.com/;
            connect-src 'self' https://api.themoviedb.org https://www.google-analytics.com;
            img-src 'self' https://image.tmdb.org data:;
            style-src 'self' 'unsafe-inline';
         frame-src 'self'
  https://zxcstream.xyz
  https://www.zxcstream.xyz
  https://vidsrc-embed.ru
  https://vidsrc.cc
  https://player.videasy.net
  https://111movies.com
  https://vidfast.pro
  https://vidnest.fun
  https://www.youtube.com;
          `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
            default-src 'self';
             script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.googletagmanager.com/;
        connect-src 'self' https://api.themoviedb.org https://image.tmdb.org https://www.youtube.com https://www.google-analytics.com;
            img-src 'self' https://image.tmdb.org data:;
          frame-src 'self'
  https://zxcstream.xyz
  https://www.zxcstream.xyz
  https://vidsrc-embed.ru
  https://vidsrc.cc
  https://player.videasy.net
  https://111movies.com
  https://vidfast.pro
  https://vidnest.fun
  https://www.youtube.com;
          `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
