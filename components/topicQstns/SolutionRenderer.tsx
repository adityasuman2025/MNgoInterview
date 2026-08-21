"use client";

import { memo, useMemo } from "react";

interface SolutionRendererProps {
    solution?: string[] | string;
}
function SolutionRenderer({ solution = [] }: SolutionRendererProps) {
    const processedHtml = useMemo(() => {
        let raw = Array.isArray(solution) ? solution.join("") : solution || "";
        if (!raw) return "";

        // Remove <script> and <img> tags
        raw = raw.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
        raw = raw.replace(/<img\b[^>]*\/?>/gi, "");

        // Add target="_blank" and rel="noopener noreferrer" to all <a> tags that don't already have them
        raw = raw.replace(/<a\b(?![^>]*\btarget=)([^>]*?)>/gi, '<a target="_blank" rel="noopener noreferrer"$1>');

        // Wrap <table> tags in a scrollable container so table overflows stay self-contained
        raw = raw.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (tableHtml) => `<div class="table-wrapper">${tableHtml}</div>`);

        return raw;
    }, [solution]);

    return (
        <div
            className="solution-content max-w-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
    );
}

export default memo(SolutionRenderer);