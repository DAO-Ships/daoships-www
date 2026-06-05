import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

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

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["anchor"] } }],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});

export default withMDX(nextConfig);
