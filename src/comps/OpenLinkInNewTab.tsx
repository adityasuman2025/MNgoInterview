import { useMemo, memo } from "react";

function OpenLinkInNewTab({
    htmlString = "",
}: {
    htmlString: string
}) {
    // Compute modified HTML directly — no state or effect needed
    const modifiedHtmlString = useMemo(() => {
        if (!htmlString) return "";
        const dummyEle = document.createElement('div');
        dummyEle.innerHTML = htmlString;
        dummyEle.querySelectorAll('a').forEach((link) => link.setAttribute('target', '_blank'));
        return dummyEle.innerHTML;
    }, [htmlString]);

    return <div dangerouslySetInnerHTML={{ __html: modifiedHtmlString }} />;
}

export default memo(OpenLinkInNewTab);