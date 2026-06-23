import { useState, useEffect } from "react";
import { TERMINAL_LOGS } from "../data/portfolio";
import { Terminal, Search, ArrowRight, FileDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
        return "text-tertiary";
      case "warning":
        return "text-secondary";
      case "error":
        return "text-error";
      default:
        return "text-obsidian-text/90";
    }
  };

  return (
    <div className="min-h-full p-6 md:p-10 select-none">
      <div className="max-w-3xl mx-auto">
        {/* Expanded Terminal Hero with macOS Traffic Lights (No Scrolling Needed) */}
        <div className="glass-panel rounded-lg overflow-hidden mb-8 glow-active">
          <div className="h-10 flex items-center px-4 bg-obsidian-surface/80 border-b border-obsidian-border select-none">
            <div className="flex items-center gap-1.5 mr-4 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-error inline-block cursor-pointer hover:opacity-85" />
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-warning inline-block cursor-pointer hover:opacity-85" />
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-success inline-block cursor-pointer hover:opacity-85" />
            </div>
            <Terminal size={12} className="text-obsidian-muted mr-1.5" />
            <span className="text-[11px] text-obsidian-muted font-mono tracking-tight lowercase">
              bash — init.sh
            </span>
          </div>
          <div className="p-5 font-mono text-xs leading-relaxed bg-black/35 select-text min-h-45 h-auto">
            {TERMINAL_LOGS.slice(0, visibleLines).map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-obsidian-dim shrink-0 select-none">
                  [{log.timestamp}]
                </span>
                <span className={logColor(log.level)}>{log.message}</span>
              </div>
            ))}
            {done && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-tertiary">➜</span>
                <span className="text-primary"> ~ </span>
                <span className="text-obsidian-text">whoami</span>
                <span className="cursor-blink w-2 h-4 bg-primary inline-block ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Developer Intro as formatted pseudo-code */}
        <div className="mb-8 select-text">
          <h1 className="text-2xl md:text-3xl font-display-lg text-obsidian-text mb-4 tracking-tight font-mono select-none flex items-center">
            <span className="text-secondary font-bold">const</span>{" "}
            <span className="text-primary font-bold ml-2">developer</span>
            <span className="text-obsidian-muted font-semibold ml-1">=</span>
            <span className="text-tertiary ml-2">{"{"}</span>
          </h1>

          <div className="pl-10 space-y-3 font-mono text-xs md:text-sm border-l border-obsidian-border/30 ml-4 md:ml-6 py-1">
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">name</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-tertiary font-sans">"Karan Bastola"</span>
              <span className="text-obsidian-muted">,</span>
            </div>
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">title</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-tertiary font-sans">
                "Full-Stack Developer"
              </span>
              <span className="text-obsidian-muted">,</span>
            </div>
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">location</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-tertiary font-sans">"Itahari, Nepal"</span>
              <span className="text-obsidian-muted">,</span>
            </div>
            <div className="flex gap-2 flex-wrap relative items-center">
              <span className="text-primary-fixed-dim">specialties</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-obsidian-muted">[</span>
              <span className="text-tertiary font-sans">"React"</span>
              <span className="text-obsidian-muted">,</span>
              <span className="text-tertiary font-sans">".NET"</span>
              <span className="text-obsidian-muted">,</span>
              <span className="text-tertiary font-sans">"TypeScript"</span>
              <span className="text-obsidian-muted">,</span>
              <span className="text-tertiary font-sans">"PostgreSQL"</span>
              <span className="text-obsidian-muted">,</span>
              <span className="text-tertiary font-sans">
                "Clean Architecture"
              </span>
              <span className="text-obsidian-muted">]</span>
              <span className="text-obsidian-muted">,</span>
            </div>
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">experience</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-primary font-bold">3</span>
              <span className="text-obsidian-muted">,</span>
              <span className="text-obsidian-dim ml-2 italic font-sans">
                // years
              </span>
            </div>
            <div className="flex gap-2 relative items-start">
              <span className="text-primary-fixed-dim shrink-0">passion</span>
              <span className="text-obsidian-muted shrink-0">:</span>
              <span className="text-tertiary font-sans leading-relaxed">
                "Building robust full-stack applications with clean
                architecture"
              </span>
              <span className="text-obsidian-muted shrink-0">,</span>
            </div>
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">status</span>
              <span className="text-obsidian-muted">:</span>
              <span className="text-tertiary font-sans">
                "Open to opportunities"
              </span>
              <span className="text-obsidian-muted">,</span>
            </div>
            <div className="flex gap-2 relative items-center">
              <span className="text-primary-fixed-dim">github</span>
              <span className="text-obsidian-muted">:</span>
              <span className="flex items-center gap-1.5 group cursor-pointer">
                <a
                  href="https://github.com/KaranBastola84"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary font-sans hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <FaGithub className="text-obsidian-text group-hover:text-primary transition-colors" />
                  "KaranBastola84"
                </a>
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-display-lg text-tertiary font-mono select-none flex items-center">
            {"}"}
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel rounded-lg p-5 text-left hover:bg-obsidian-hover/50 hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex items-center gap-2 mb-2 font-mono">
              <Search size={14} className="text-primary" />
              <span className="text-[10px] text-obsidian-muted font-bold uppercase tracking-wider">
                quick access
              </span>
            </div>
            <p className="text-xs text-obsidian-muted font-sans leading-relaxed">
              Press{" "}
              <kbd className="bg-obsidian-surface border border-obsidian-border px-1.5 py-0.5 rounded font-mono text-primary font-bold text-[10px] select-none">
                Ctrl+K
              </kbd>{" "}
              to open the Command Palette and search workspace files.
            </p>
          </div>
          <div className="glass-panel rounded-lg p-5 text-left hover:bg-obsidian-hover/50 hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-tertiary" />
            <div className="flex items-center gap-2 mb-2 font-mono">
              <ArrowRight size={14} className="text-tertiary" />
              <span className="text-[10px] text-obsidian-muted font-bold uppercase tracking-wider">
                navigation
              </span>
            </div>
            <p className="text-xs text-obsidian-muted font-sans leading-relaxed">
              Use the sidebar file explorer tree-view to click and browse
              individual pages.
            </p>
          </div>
          <a
            href="/Karan_Bastola_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-lg p-5 text-left hover:bg-obsidian-hover/50 hover:shadow-lg transition-all group relative overflow-hidden block"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            <div className="flex items-center gap-2 mb-2 font-mono">
              <FileDown size={14} className="text-secondary" />
              <span className="text-[10px] text-obsidian-muted font-bold uppercase tracking-wider">
                resume / cv
              </span>
            </div>
            <p className="text-xs text-obsidian-muted font-sans leading-relaxed">
              Click to view or download my latest curriculum vitae (PDF format).
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
