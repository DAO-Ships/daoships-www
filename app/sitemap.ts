import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { flatDocs } from "@/lib/docs";
import { templateKeys } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const top = ["", "/why", "/features", "/use-cases", "/security", "/learn", "/docs"];
  const docs = flatDocs.map((d) => d.href);
  const templates = templateKeys.map((k) => `/use-cases/${k}`);

  const all = [...top, ...templates, ...docs];

  return all.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/docs") ? 0.6 : 0.8,
  }));
}
