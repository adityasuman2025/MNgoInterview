import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/node_modules/"],
        },
        sitemap: "https://interview.adityas.site/sitemap.xml",
    };
}
