import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/Chirag_Jethva_Resume.pdf`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}
