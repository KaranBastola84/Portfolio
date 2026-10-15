import { Construction, Hammer } from "lucide-react";

const PLANNED_TOOLS: { label: string; file: string; description: string }[] = [
  {
    label: "jsonFormatter",
    file: "json-formatter.ts",
    description: "Pretty-print, minify and validate JSON right in the browser.",
  },
  {
    label: "regexPlayground",
    file: "regex-playground.ts",
    description: "Write a pattern, run it against sample text, copy the match.",
  },
  {
    label: "readmeGenerator",
    file: "readme-generator.ts",
    description: "Scaffold a polished README from a few quick prompts.",
  },
];

export function Tools() {
  return (
    <div className="min-h-full flex flex-col select-none">
      <div className="flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-6 select-text">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted select-none">
          <Hammer size={12} className="text-tertiary" />
          <span className="text-[11px] font-mono">src / tools /</span>
          <span className="text-[11px] text-tertiary font-mono font-semibold">
            tools.ts
          </span>
        </div>

        <div className="font-mono text-xs md:text-sm leading-relaxed max-w-3xl">
          <div className="text-secondary mb-1">export const</div>
          <div className="text-obsidian-text mb-4">
            <span className="text-primary font-bold">tools</span>
            <span className="text-obsidian-muted ml-1">{"= {"}</span>
          </div>

          {/* Under construction notice */}
          <div className="ml-2 mb-8">
            <div className="glass-panel glow-active rounded-lg px-5 py-5 md:px-6 md:py-6 border-l-2 border-l-secondary">
              <div className="flex items-center gap-2 mb-3 select-none">
                <Construction
                  size={15}
                  className="text-secondary animate-pulse"
                />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  under construction
                </span>
              </div>

              <h2 className="font-headline-md text-obsidian-text mb-2">
                This section is still being built.
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
                <span className="flex items-center gap-2 text-secondary select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse" />
                  status: in_progress
                </span>
                <span className="text-obsidian-dim select-none">
                  {"// progress: ███████░░░ 70%"}
                </span>
              </div>
            </div>
          </div>

          {/* Tool list */}
          <div className="text-obsidian-dim italic mb-3 select-none">
            /* planned tools */
          </div>

          <div className="pl-6 border-l border-obsidian-border/30 ml-2 space-y-2 mb-4">
            {PLANNED_TOOLS.map((tool) => (
              <div
                key={tool.file}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-3 py-2 rounded border border-obsidian-border/40 opacity-70 select-none"
              >
                <span className="w-9 shrink-0 text-[10px] uppercase font-bold tracking-wider text-obsidian-dim/70">
                  soon
                </span>
                <span className="font-bold text-obsidian-muted">
                  {tool.label}
                </span>
                <span className="text-obsidian-muted/70 text-[11px]">
                  {tool.file}
                </span>
                <span className="font-sans text-[13px] text-obsidian-muted leading-relaxed">
                  — {tool.description}
                </span>
              </div>
            ))}
          </div>

          <div className="text-obsidian-dim italic select-none">
            {"// check back soon 👷"}
          </div>

          <div className="text-obsidian-muted mt-2">{"};"}</div>
        </div>
      </div>
    </div>
  );
}
