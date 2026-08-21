"use client";

import { memo, useMemo } from "react";

interface SolutionRendererProps {
    solution?: string[] | string;
}
function SolutionRenderer({ solution = [] }: SolutionRendererProps) {
    const processedHtml = useMemo(() => {
        let raw = Array.isArray(solution) ? solution.join("") : solution || "";
        if (!raw) return "";

        // Remove all <img> tags
        raw = raw.replace(/<img\b[^>]*\/?>/gi, "");

        // Add target="_blank" and rel="noopener noreferrer" to all <a> tags that don't already have them
        return raw.replace(/<a\b(?![^>]*\btarget=)([^>]*?)>/gi, '<a target="_blank" rel="noopener noreferrer"$1>');
    }, [solution]);

    return (
        <div
            className="solution-content"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
    );
}

export default memo(SolutionRenderer);