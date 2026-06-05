import createMDX from "@next/mdx";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
  defaultLang: "text",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    // Section roots have no index page — send them to the first page of each.
    return [
      { source: "/docs/concepts", destination: "/docs/concepts/what-is-a-dao", permanent: false },
      { source: "/docs/guides", destination: "/docs/guides/wallet-setup", permanent: false },
      { source: "/docs/developers", destination: "/docs/developers/architecture", permanent: false },
    ];
  },
};

// Plugins are referenced by string name (not imported functions) so the MDX
// pipeline is serializable for Turbopack — the default bundler in Next 16.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [
      ["rehype-slug", {}],
      ["rehype-autolink-headings", { behavior: "wrap", properties: { className: ["anchor"] } }],
      ["rehype-pretty-code", prettyCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
