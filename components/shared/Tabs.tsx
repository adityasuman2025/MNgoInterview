import { createContext, memo, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

interface TabsContextType {
    activeTabId: string,
    makeTabActive: (id: string) => void,
    registerTab: (id: string) => void,
    deRegisterTab: (id: string) => void,
}
const TabsContext = createContext<TabsContextType | null>(null);

function useTab(defaultTabId: string) {
    const tabs = useRef(new Set<string>());
    const [activeTabId, setActiveTabId] = useState<string>(defaultTabId);

    const registerTab = useCallback((id: string) => {
        tabs.current?.add(id);
    }, []);

    const deRegisterTab = useCallback((id: string) => {
        tabs.current?.delete(id);
    }, []);

    const makeTabActive = useCallback((id: string) => {
        setActiveTabId(id);
    }, []);

    const contextValue = useMemo(() => ({ activeTabId, makeTabActive, registerTab, deRegisterTab }), [activeTabId, makeTabActive, registerTab, deRegisterTab]);

    return contextValue;
}

function Tabs({ defaultTabId, children }: { defaultTabId: string, children: ReactNode }) {
    const contextValue = useTab(defaultTabId)

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    )
}

function useTabContext() {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("useTabs must be used inside TabsProvider");

    return ctx
}

interface BaseProps {
    className?: string, children: ReactNode
}
function List({ className, children }: BaseProps) {
    return (
        <div role="tablist" className={`flex items-center gap-2 ${className}`}>
            {children}
        </div>
    )
}

function Tab({ className, children, id }: { className?: string, children: (isActive: boolean) => ReactNode, id: string }) {
    const { registerTab, deRegisterTab, makeTabActive, activeTabId } = useTabContext();
    const isThisTabActive = activeTabId === id;

    useEffect(() => {
        registerTab(id);
        return () => deRegisterTab(id);
    }, [id]);

    function handleTabClick() {
        makeTabActive(id)
    }

    return (
        <div
            id={`tab-${id}`}
            role="tab"
            aria-controls={`panel-${id}`}
            aria-selected={isThisTabActive}
            className={`${className}`}
            onClick={handleTabClick}
        >
            {children(isThisTabActive)}
        </div>
    )
}

function Panel({ className, children, tabId }: BaseProps & { tabId: string }) {
    const { activeTabId } = useTabContext();
    const isThisTabActive = activeTabId === tabId;

    return (
        <div
            id={`panel-${tabId}`}
            aria-labelledby={`tab-${tabId}`}
            hidden={!isThisTabActive}
            role="tabpanel"
            className={`${className}`}
        >
            {children}
        </div>
    )
}

Tabs.List = memo(List);
Tabs.Tab = memo(Tab);
Tabs.Panel = memo(Panel);

export default Tabs;
