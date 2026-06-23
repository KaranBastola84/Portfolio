import { GitBranch, Wifi, AlertCircle, Command } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { PageTab } from "../App";

interface IDEStatusBarProps {
  activeTab: PageTab;
  onCommandPalette: () => void;
}

export function IDEStatusBar({
  activeTab,
  onCommandPalette,
}: IDEStatusBarProps) {
  return (
    <div className="h-6 flex items-center bg-obsidian-surface border-t border-obsidian-border text-xs select-none shrink-0 font-mono z-10">
      <div className="flex items-center gap-4 px-3">
        <button
          className="flex items-center gap-1 text-obsidian-muted hover:text-primary transition-all cursor-pointer font-bold"
          onClick={onCommandPalette}
          title="Open command palette"
        >
          <Command size={11} className="text-primary" />
          <span className="text-[10px] bg-obsidian-hover border border-obsidian-border px-1 py-0.25 rounded">ctrl+k</span>
        </button>
        <span className="text-obsidian-muted flex items-center gap-1 select-none">
          <GitBranch size={12} className="text-secondary animate-pulse" />
          <span className="text-obsidian-text/80 font-semibold">git:</span>
          <span className="text-tertiary">main</span>
        </span>
        <a 
          href="https://github.com/KaranBastola84" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-obsidian-muted hover:text-obsidian-text transition-colors flex items-center gap-1 select-none cursor-pointer"
          title="My GitHub Profile"
        >
          <FaGithub size={12} />
        </a>
        <span className="text-obsidian-muted flex items-center gap-1 select-none">
          <AlertCircle size={12} className="text-tertiary" />
          <span>0 errors</span>
        </span>
        <span className="text-obsidian-muted flex items-center gap-1 select-none">
          <AlertCircle size={12} className="text-secondary" />
          <span>0 warnings</span>
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-4 px-3 text-obsidian-muted">
        <span className="flex items-center gap-1 select-none">
          <Wifi size={12} className="text-tertiary" />
          <span className="text-tertiary/90">online</span>
        </span>
        <span className="hidden sm:inline opacity-60 select-none">UTF-8</span>
        <span className="text-primary select-none font-bold">// {activeTab}</span>
      </div>
    </div>
  );
}
