import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/docs/Callout";

// Shared MDX rendering. Prose styling is handled by `.prose-dao` on the
// docs content container; here we only override links and inject custom
// components available inside .mdx files.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) => {
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    },
    Callout,
    ...components,
  };
}
