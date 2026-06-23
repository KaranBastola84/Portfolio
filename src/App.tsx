import { useState, useEffect, useCallback } from "react";
import { IDESidebar } from "./components/IDESidebar";
import { IDETabs } from "./components/IDETabs";
import { IDEStatusBar } from "./components/IDEStatusBar";
import { IndexPage } from "./pages/IndexPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SkillsPage } from "./pages/SkillsPage";

export type PageTab =
  | "index.js"
  | "projects.json"
  | "skills.css"
  | "contact.ts";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>("index.js");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteQuery, setCommandPaletteQuery] = useState("");

  const tabs: PageTab[] = [
    "index.js",
    "projects.json",
    "skills.css",
    "contact.ts",
  ];

  const openTab = useCallback((tab: PageTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible((v) => !v);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
        setCommandPaletteQuery("");
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredTabs = tabs.filter((t) =>
    t.toLowerCase().includes(commandPaletteQuery.toLowerCase()),
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-obsidian-bg text-obsidian-text font-sans overflow-hidden relative">
      {/* Ambient monitor glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-primary/8 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-secondary/5 blur-[150px] pointer-events-none z-0" />

      {/* Title Bar */}
      <div className="h-9 flex items-center bg-obsidian-surface/90 border-b border-obsidian-border select-none shrink-0 z-10 font-mono">
        <div className="flex items-center gap-2 px-3">
          <span className="w-3 h-3 rounded-full bg-obsidian-error hover:opacity-80 transition-opacity inline-block cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-obsidian-warning hover:opacity-80 transition-opacity inline-block cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-obsidian-success hover:opacity-80 transition-opacity inline-block cursor-pointer" />
        </div>
        <div className="flex-1 text-center text-xs text-obsidian-muted font-mono tracking-tight">
          portfolio — {activeTab}
        </div>
        <div className="w-24" />
      </div>

      {/* Main workspace */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Sidebar */}
        {sidebarVisible && (
          <IDESidebar
            activeTab={activeTab}
            onOpenTab={openTab}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
          />
        )}

        {/* Editor area */}
        <div className="flex-1 flex flex-col min-w-0 bg-obsidian-bg/40 backdrop-blur-xs">
          <IDETabs
            tabs={tabs}
            activeTab={activeTab}
            onSelect={openTab}
            onClose={() => {}}
            onToggleSidebar={toggleSidebar}
          />

          <div className="flex-1 overflow-auto relative">
            {activeTab === "index.js" && <IndexPage />}
            {activeTab === "projects.json" && <ProjectsPage />}
            {activeTab === "skills.css" && <SkillsPage />}
            {activeTab === "contact.ts" && <ContactPage />}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <IDEStatusBar
        activeTab={activeTab}
        onCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Command Palette Overlay */}
      {commandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-obsidian-bg/60 backdrop-blur-md"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-125 glass-panel rounded-lg shadow-2xl overflow-hidden glow-active font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-3 py-3 border-b border-obsidian-border bg-obsidian-surface/60">
              <span className="text-obsidian-accent mr-2 font-bold">{">"}</span>
              <input
                autoFocus
                className="flex-1 bg-transparent outline-none text-obsidian-text placeholder-obsidian-muted/50 text-sm font-mono"
                placeholder="search_files_by_name..."
                value={commandPaletteQuery}
                onChange={(e) => setCommandPaletteQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredTabs.length > 0) {
                    openTab(filteredTabs[0]);
                    setCommandPaletteOpen(false);
                  }
                }}
              />
              <span className="text-[10px] text-obsidian-muted bg-obsidian-hover border border-obsidian-border px-1.5 py-0.5 rounded font-mono select-none">
                ESC
              </span>
            </div>
            <div className="max-h-60 overflow-auto p-1 bg-obsidian-bg/40">
              {filteredTabs.map((tab) => (
                <button
                  key={tab}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-obsidian-hover/80 rounded flex items-center gap-2 transition-all"
                  onClick={() => {
                    openTab(tab);
                    setCommandPaletteOpen(false);
                  }}
                >
                  <span className="text-obsidian-muted font-semibold">{"{"}</span>
                  <span
                    className={
                      tab === activeTab
                        ? "text-obsidian-accent font-bold"
                        : "text-obsidian-text"
                    }
                  >
                    {tab}
                  </span>
                  <span className="text-obsidian-muted font-semibold">{"}"}</span>
                  {tab === activeTab && (
                    <span className="ml-auto text-[10px] text-obsidian-accent/60 uppercase font-bold tracking-wider">active</span>
                  )}
                </button>
              ))}
              {filteredTabs.length === 0 && (
                <div className="px-3 py-6 text-xs text-obsidian-muted text-center font-mono italic">
                  // no matching files found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu toggle */}
      <button
        className="fixed bottom-10 right-4 z-40 md:hidden w-12 h-10 rounded-lg bg-primary hover:bg-primary-container text-obsidian-bg flex items-center justify-center shadow-lg border border-primary-fixed-dim/40 cursor-pointer font-bold"
        onClick={() => setMobileOpen(true)}
      >
        menu
      </button>
    </div>
  );
}
