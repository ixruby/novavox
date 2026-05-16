import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novavox.in";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/child-safety`,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
