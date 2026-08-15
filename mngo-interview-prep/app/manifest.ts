import type { MetadataRoute } from "next";
import { BACKGROUND_COLOR, THEME_COLOR } from "@/constant";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "MNgo Interview Prep",
        short_name: "MNgo Prep",
        description:
            "Practice curated software engineering interview questions covering JavaScript, React, CSS, HTML, system design, DSA, and more.",
        start_url: "/",
        display: "standalone",
        background_color: BACKGROUND_COLOR.dark,
        theme_color: THEME_COLOR.dark,
        icons: [
            {
                src: "/xxxs.png",
                sizes: "any",
                type: "image/png",
            },
        ],
    };
}
