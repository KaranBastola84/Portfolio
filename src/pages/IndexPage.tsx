import { useState, useEffect } from "react";
import { TERMINAL_LOGS } from "../data/portfolio";
import { Terminal, Search, ArrowRight } from "lucide-react";

export function IndexPage() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= TERMINAL_LOGS.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const logColor = (level: string) => {
    switch (level) {
      case "success":
        return "text-obsidian-success";
      case "warning":
        return "text-obsidian-warning";
      case "error":
        return "text-obsidian-error";
      default:
        return "text-obsidian-text";
    }
  };

  return (
    <div className="min-h-full p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Terminal Hero */}
        <div className="glass-panel rounded-lg overflow-hidden mb-8">
          <div className="h-8 flex items-center px-3 bg-obsidian-surface border-b border-obsidian-border">
            <Terminal size={14} className="text-obsidian-muted mr-2" />
            <span className="text-xs text-obsidian-muted">zsh — portfolio</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed">
            {TERMINAL_LOGS.slice(0, visibleLines).map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-obsidian-dim shrink-0">
                  [{log.timestamp}]
                </span>
                <span className={logColor(log.level)}>{log.message}</span>
              </div>
            ))}
            {done && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-obsidian-success">➜</span>
                <span className="text-obsidian-accent">~</span>
                <span className="text-obsidian-text">whoami</span>
                <span className="cursor-blink w-2 h-4 bg-obsidian-accent inline-block ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Developer Intro */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-obsidian-text mb-3 tracking-tight">
            <span className="text-obsidian-keyword">const</span>{" "}
            <span className="text-obsidian-function">developer</span>
            <span className="text-obsidian-text"> = </span>
            <span className="text-obsidian-accent">{"{"}</span>
          </h1>
          <div className="pl-4 md:pl-8 space-y-2 text-sm md:text-base">
            <div className="flex gap-2">
              <span className="text-obsidian-property">name</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-string">"Alex Chen"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-obsidian-property">title</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-string">
                "Senior Frontend Engineer"
              </span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-obsidian-property">location</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-string">"San Francisco, CA"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-obsidian-property">specialties</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-text">[</span>
              <span className="text-obsidian-string">"React"</span>
              <span className="text-obsidian-text">,</span>
              <span className="text-obsidian-string">"TypeScript"</span>
              <span className="text-obsidian-text">,</span>
              <span className="text-obsidian-string">"Design Systems"</span>
              <span className="text-obsidian-text">,</span>
              <span className="text-obsidian-string">"Performance"</span>
              <span className="text-obsidian-text">]</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div className="flex gap-2">
              <span className="text-obsidian-property">experience</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-number">8</span>
              <span className="text-obsidian-text">,</span>
              <span className="text-obsidian-comment">// years</span>
            </div>
            <div className="flex gap-2">
              <span className="text-obsidian-property">passion</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-string">
                "Building pixel-perfect, accessible, and performant user
                interfaces"
              </span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">status</span>
              <span className="text-obsidian-text">:</span>
              <span className="text-obsidian-string">
                "Open to opportunities"
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-obsidian-accent mt-3">
            {"}"}
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="glass-panel rounded-lg p-4 text-left hover:bg-obsidian-hover/60 transition-all group">
            <div className="flex items-center gap-2 mb-1">
              <Search size={14} className="text-obsidian-accent" />
              <span className="text-xs text-obsidian-muted uppercase tracking-wider">
                Quick Access
              </span>
            </div>
            <p className="text-sm text-obsidian-text">
              Press{" "}
              <kbd className="bg-obsidian-surface px-1 rounded text-obsidian-accent">
                Ctrl+K
              </kbd>{" "}
              to open the Command Palette
            </p>
          </button>
          <button className="glass-panel rounded-lg p-4 text-left hover:bg-obsidian-hover/60 transition-all group">
            <div className="flex items-center gap-2 mb-1">
              <ArrowRight size={14} className="text-obsidian-success" />
              <span className="text-xs text-obsidian-muted uppercase tracking-wider">
                Navigation
              </span>
            </div>
            <p className="text-sm text-obsidian-text">
              Use the Explorer sidebar or tabs to browse files
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
