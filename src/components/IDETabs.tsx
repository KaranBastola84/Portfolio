import { PanelLeft } from "lucide-react";
import type { PageTab } from "../App";

interface IDETabsProps {
  tabs: PageTab[];
  activeTab: PageTab;
  onSelect: (tab: PageTab) => void;
  onClose: (tab: PageTab) => void;
  onToggleSidebar: () => void;
}

const tabColor: Record<PageTab, string> = {
  "index.js": "text-secondary",
  "projects.json": "text-primary",
  "skills.css": "text-tertiary",
  "contact.ts": "text-primary-fixed-dim",
};

export function IDETabs({
  tabs,
  activeTab,
  onSelect,
  onToggleSidebar,
}: IDETabsProps) {
  return (
    <div className="h-9 flex items-center bg-obsidian-surface/60 border-b border-obsidian-border shrink-0 overflow-x-auto select-none font-mono">
      <button
        className="h-full px-3 text-obsidian-muted hover:text-obsidian-text border-r border-obsidian-border hover:bg-obsidian-hover/50 transition-all cursor-pointer"
        onClick={onToggleSidebar}
        title="Toggle sidebar"
      >
        <PanelLeft size={14} />
      </button>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            className={`h-full flex items-center gap-2 px-4 text-xs border-r border-obsidian-border whitespace-nowrap transition-all cursor-pointer relative ${
              isActive
                ? "bg-obsidian-bg/80 text-obsidian-text font-bold shadow-[inset_0_-2px_0_var(--color-primary)]"
                : "bg-transparent text-obsidian-muted hover:bg-obsidian-hover/30 hover:text-obsidian-text"
            }`}
            onClick={() => onSelect(tab)}
          >
            {/* Syntax-colored icon representation */}
            <span className={`text-[10px] opacity-75 font-semibold ${isActive ? "opacity-100" : ""}`}>
              {tab.split('.').pop() === 'js' && 'λ'}
              {tab.split('.').pop() === 'json' && '{}'}
              {tab.split('.').pop() === 'css' && '#'}
              {tab.split('.').pop() === 'ts' && 'τ'}
            </span>
            <span className={tabColor[tab]}>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
