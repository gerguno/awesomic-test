import type { NextConfig } from "next";

const STORYBOOK_ORIGIN = "http://127.0.0.1:6006";

const storybookDevRewrites = [
  { source: "/storybook", destination: `${STORYBOOK_ORIGIN}/` },
  { source: "/storybook/", destination: `${STORYBOOK_ORIGIN}/` },
  { source: "/storybook/:path*", destination: `${STORYBOOK_ORIGIN}/:path*` },
  { source: "/vite-inject-mocker-entry.js", destination: `${STORYBOOK_ORIGIN}/vite-inject-mocker-entry.js` },
  { source: "/@vite/:path*", destination: `${STORYBOOK_ORIGIN}/@vite/:path*` },
  { source: "/@id/:path*", destination: `${STORYBOOK_ORIGIN}/@id/:path*` },
  { source: "/@fs/:path*", destination: `${STORYBOOK_ORIGIN}/@fs/:path*` },
  { source: "/@react-refresh", destination: `${STORYBOOK_ORIGIN}/@react-refresh` },
  { source: "/node_modules/:path*", destination: `${STORYBOOK_ORIGIN}/node_modules/:path*` },
  { source: "/components/:path*", destination: `${STORYBOOK_ORIGIN}/components/:path*` },
  { source: "/stories/:path*", destination: `${STORYBOOK_ORIGIN}/stories/:path*` },
  { source: "/styles/:path*", destination: `${STORYBOOK_ORIGIN}/styles/:path*` },
  { source: "/assets/:path*", destination: `${STORYBOOK_ORIGIN}/assets/:path*` },
  { source: "/utils/:path*", destination: `${STORYBOOK_ORIGIN}/utils/:path*` },
  { source: "/.storybook/:path*", destination: `${STORYBOOK_ORIGIN}/.storybook/:path*` },
];

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return { beforeFiles: storybookDevRewrites };
    }

    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
      },
      {
        source: "/storybook/",
        destination: "/storybook/index.html",
      },
    ];
  },
};

export default nextConfig;
