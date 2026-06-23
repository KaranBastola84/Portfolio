import { useState } from "react";
import {
  FileJson,
  FileCode,
  FileType,
  FileText,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { PageTab } from "../App";

interface IDESidebarProps {
  activeTab: PageTab;
  onOpenTab: (tab: PageTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const TAB_CONFIG: { tab: PageTab; label: string; icon: React.ReactNode }[] = [
  { tab: "index.js", label: "index.js", icon: <FileCode size={14} className="text-secondary" /> },
  {
    tab: "projects.json",
    label: "projects.json",
    icon: <FileJson size={14} className="text-primary" />,
  },
  { tab: "skills.css", label: "skills.css", icon: <FileText size={14} className="text-tertiary" /> },
  { tab: "contact.ts", label: "contact.ts", icon: <FileType size={14} className="text-primary-fixed-dim" /> },
];

export function IDESidebar({
  activeTab,
  onOpenTab,
  mobileOpen,
  onCloseMobile,
}: IDESidebarProps) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-obsidian-bg/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={`shrink-0 bg-obsidian-surface/85 backdrop-blur-lg border-r border-obsidian-border flex flex-col select-none font-mono
          ${mobileOpen ? "fixed inset-y-0 left-0 z-50 w-64 shadow-2xl" : "w-56 hidden md:flex"}
        `}
      >
        <div className="h-9 flex items-center px-4 text-xs font-semibold text-obsidian-muted/80 uppercase tracking-wider border-b border-obsidian-border select-none">
          explorer
        </div>
        <div className="flex-1 overflow-auto py-2">
          {/* root folder */}
          <button
            className="w-full flex items-center gap-1.5 px-3 py-1 text-obsidian-muted hover:text-obsidian-text hover:bg-obsidian-hover/30 transition-all text-left font-mono select-none"
            onClick={() => setExplorerOpen((o) => !o)}
          >
            {explorerOpen ? (
              <ChevronDown size={14} className="text-obsidian-muted/65" />
            ) : (
              <ChevronRight size={14} className="text-obsidian-muted/65" />
            )}
            <FolderOpen size={14} className="text-secondary" />
            <span className="text-xs font-semibold lowercase">portfolio</span>
          </button>

          {explorerOpen && (
            <div className="ml-4 border-l border-obsidian-border/30 pl-1">
              {/* src folder */}
              <button
                className="w-full flex items-center gap-1.5 px-3 py-1 text-obsidian-muted hover:text-obsidian-text hover:bg-obsidian-hover/30 transition-all text-left font-mono select-none"
                onClick={() => setSrcOpen((o) => !o)}
              >
                {srcOpen ? (
                  <ChevronDown size={14} className="text-obsidian-muted/65" />
                ) : (
                  <ChevronRight size={14} className="text-obsidian-muted/65" />
                )}
                <FolderOpen size={14} className="text-primary" />
                <span className="text-xs font-semibold lowercase">src</span>
              </button>

              {srcOpen && (
                <div className="ml-4 border-l border-obsidian-border/30 pl-1">
                  {TAB_CONFIG.map(({ tab, label, icon }) => (
                    <button
                      key={tab}
                      className={`w-full flex items-center gap-2 px-3 py-1 text-xs transition-all select-none border-l-2 ${
                        activeTab === tab
                          ? "bg-obsidian-hover/90 text-obsidian-accent border-primary font-bold shadow-[inset_1px_0_0_rgba(142,213,255,0.15)]"
                          : "text-obsidian-muted hover:text-obsidian-text hover:bg-obsidian-hover/40 border-transparent"
                      }`}
                      onClick={() => {
                        onOpenTab(tab);
                        onCloseMobile();
                      }}
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
