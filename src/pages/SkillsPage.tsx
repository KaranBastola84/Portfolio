import { useState } from "react";
import { SKILLS } from "../data/portfolio";
import { FileText, ChevronRight, Zap, CheckCircle, Clipboard, Check } from "lucide-react";

function CoverageBar({
  proficiency,
  label,
  colorClass = "bg-primary",
}: {
  proficiency: number;
  label: string;
  colorClass?: string;
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="w-24 text-xs font-mono text-obsidian-muted text-right truncate">
        {label}
      </div>
      <div className="flex-1 h-3 bg-black/45 rounded-sm overflow-hidden border border-obsidian-border">
        <div
          className={`h-full ${colorClass} transition-all duration-700 shadow-[0_0_10px_rgba(142,213,255,0.15)]`}
          style={{ width: `${proficiency}%` }}
        />
      </div>
      <div className="w-10 text-xs font-mono text-primary font-bold text-right">
        {proficiency}%
      </div>
    </div>
  );
}

// Reusable premium CodeBlock component with background #000000, line numbers, and copy button on hover
function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const lines = code.split("\n");

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const highlight = (line: string) => {
    if (!line.trim()) return <span>{line}</span>;

    const commentIndex = line.indexOf("//");
    let codePart = line;
    let commentPart = "";
    if (commentIndex !== -1) {
      codePart = line.substring(0, commentIndex);
      commentPart = line.substring(commentIndex);
    }

    const tokenRegex = /('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[a-zA-Z_$][a-zA-Z0-9_$]*|[^a-zA-Z_$'"`\s]+|\s+)/g;
    const tokens = codePart.match(tokenRegex) || [codePart];

    const keywords = ["function", "const", "return", "try", "catch", "as", "typeof", "import", "export"];
    const hooks = [
      "useState", "useEffect", "useRef", "useMemo", "useCallback",
      "useDebounce", "useLocalStorage", "useWindowSize",
      "setTimeout", "clearTimeout", "setInterval", "clearInterval",
      "localStorage", "getItem", "setItem", "JSON", "parse", "stringify"
    ];
    const types = ["string", "number", "boolean", "any", "void", "T"];

    const highlightedTokens = tokens.map((token) => {
      if (
        (token.startsWith("'") && token.endsWith("'")) ||
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith('`') && token.endsWith('`'))
      ) {
        return `<span class="text-tertiary font-sans">${escapeHtml(token)}</span>`;
      }

      if (keywords.includes(token)) {
        return `<span class="text-secondary font-semibold">${token}</span>`;
      }

      if (hooks.includes(token)) {
        return `<span class="text-primary font-bold">${token}</span>`;
      }

      if (types.includes(token)) {
        return `<span class="text-primary-fixed-dim italic">${token}</span>`;
      }

      return escapeHtml(token);
    });

    let resultHtml = highlightedTokens.join("");
    if (commentPart) {
      resultHtml += `<span class="text-obsidian-dim italic">${escapeHtml(commentPart)}</span>`;
    }

    return <span dangerouslySetInnerHTML={{ __html: resultHtml }} />;
  };

  return (
    <div className="rounded-lg border border-obsidian-border overflow-hidden glow-active relative group bg-black">
      {/* card header */}
      <div className="h-8 flex items-center justify-between px-4 bg-obsidian-surface border-b border-obsidian-border select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-obsidian-error inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-obsidian-warning inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-obsidian-success inline-block" />
          <span className="text-[10px] text-obsidian-muted font-mono tracking-tight ml-2">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 px-2 rounded bg-obsidian-hover hover:bg-obsidian-surface border border-obsidian-border text-obsidian-muted hover:text-obsidian-text cursor-pointer flex items-center gap-1 text-[10px] font-mono"
        >
          {copied ? (
            <>
              <Check size={10} className="text-tertiary" />
              <span className="text-tertiary">copied</span>
            </>
          ) : (
            <>
              <Clipboard size={10} className="text-primary" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* code block */}
      <div className="p-4 font-mono text-xs leading-[1.7] overflow-auto select-text max-h-72 bg-black flex">
        {/* Line Numbers */}
        <div className="text-right text-obsidian-dim/60 pr-4 border-r border-obsidian-border/20 select-none flex flex-col min-w-[24px]">
          {lines.map((_, i) => (
            <span key={i} className="text-[11px] font-mono leading-[1.7]">
              {i + 1}
            </span>
          ))}
        </div>
        {/* Code Content */}
        <div className="pl-4 flex-1 flex flex-col min-w-0">
          {lines.map((line, i) => (
            <span key={i} className="min-h-[20px] whitespace-pre block leading-[1.7]">
              {highlight(line)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const HOOK_TEMPLATES = [
  {
    name: "useDebounce",
    code: `function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
  },
  {
    name: "useLocalStorage",
    code: `function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}`,
  },
  {
    name: "useWindowSize",
    code: `function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}`,
  },
];

export function SkillsPage() {
  const [selectedHook, setSelectedHook] = useState(0);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    Languages: true,
    Frameworks: true,
    "Tools & Practices": true,
  });

  // Theme configuration color styles mapping per category
  const catTheme: Record<string, { bar: string; chip: string; title: string }> = {
    Languages: { bar: "bg-secondary", chip: "bg-secondary/10 border-secondary/20 text-secondary", title: "text-secondary" },
    Frameworks: { bar: "bg-primary", chip: "bg-primary/10 border-primary/20 text-primary", title: "text-primary" },
    "Tools & Practices": { bar: "bg-tertiary", chip: "bg-tertiary/10 border-tertiary/20 text-tertiary", title: "text-tertiary" },
  };

  return (
    <div className="min-h-full flex flex-col lg:flex-row select-none">
      {/* CSS Config Panel */}
      <div className="flex-1 overflow-auto p-4 md:p-6 select-text">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted select-none">
          <FileText size={12} className="text-tertiary" />
          <span className="text-[11px] font-mono">src / styles /</span>
          <span className="text-[11px] text-tertiary font-mono font-semibold">skills.css</span>
        </div>

        <div className="font-mono text-xs md:text-sm leading-relaxed">
          <div className="text-secondary mb-1">@layer</div>
          <div className="text-obsidian-text mb-1">
            <span className="text-primary font-bold">skills</span>
            <span className="text-obsidian-muted ml-1">{"{"}</span>
          </div>

          {SKILLS.map((category) => {
            const theme = catTheme[category.category] || catTheme.Languages;
            return (
              <div key={category.category} className="mb-4">
                <button
                  className="flex items-center gap-1 text-obsidian-muted hover:text-obsidian-text transition-all mb-2 cursor-pointer font-mono select-none"
                  onClick={() =>
                    setExpandedCats((s) => ({
                      ...s,
                      [category.category]: !s[category.category],
                    }))
                  }
                >
                  <ChevronRight size={12} className={`transition-transform duration-200 ${expandedCats[category.category] ? "rotate-90" : ""}`} />
                  <span className="text-obsidian-dim italic">
                    /* {category.category} */
                  </span>
                </button>

                {expandedCats[category.category] && (
                  <div className="pl-6 border-l border-obsidian-border/30 ml-2 space-y-3">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center gap-2">
                          <span className={`${theme.title} font-bold`}>{skill.name}</span>
                          <span className="text-obsidian-muted">{"{"}</span>
                        </div>
                        <div className="pl-6 space-y-2 py-1 font-mono">
                          <div className="flex gap-2 items-center">
                            <span className="text-primary">proficiency</span>
                            <span className="text-obsidian-muted">:</span>
                            <span className="text-primary-fixed-dim">{skill.proficiency}%</span>
                            <span className="text-obsidian-muted">;</span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="text-primary">experience</span>
                            <span className="text-obsidian-muted">:</span>
                            <span className="text-primary-fixed-dim">{skill.years}yr</span>
                            <span className="text-obsidian-muted">;</span>
                          </div>
                          <div className="flex gap-2 items-start">
                            <span className="text-primary shrink-0">description</span>
                            <span className="text-obsidian-muted shrink-0">:</span>
                            <span className="text-tertiary font-sans leading-relaxed">
                              "{skill.description}"
                            </span>
                            <span className="text-obsidian-muted shrink-0">;</span>
                          </div>
                          {/* Custom Coverage bar */}
                          <div className="py-1">
                            <CoverageBar
                              proficiency={skill.proficiency}
                              label={skill.name}
                              colorClass={theme.bar}
                            />
                          </div>
                        </div>
                        <div className="text-obsidian-muted">{"}"}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="text-obsidian-muted">{"}"}</div>
        </div>
      </div>

      {/* Hook Playground */}
      <div className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-obsidian-border bg-obsidian-surface/40 backdrop-blur-md p-4 md:p-6 overflow-auto select-none">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-secondary" />
          <span className="text-[10px] font-bold text-obsidian-muted uppercase tracking-wider font-mono">
            hook_playground
          </span>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {HOOK_TEMPLATES.map((hook, idx) => (
            <button
              key={hook.name}
              className={`text-xs px-2.5 py-1 rounded-sm border transition-all cursor-pointer font-mono ${
                selectedHook === idx
                  ? "bg-primary/10 border-primary text-primary font-bold shadow-[0_0_8px_rgba(142,213,255,0.1)]"
                  : "bg-obsidian-bg/50 border-obsidian-border text-obsidian-muted hover:text-obsidian-text hover:border-obsidian-muted"
              }`}
              onClick={() => setSelectedHook(idx)}
            >
              {hook.name}
            </button>
          ))}
        </div>

        {/* Customized CodeBlock Component */}
        <div className="mb-6">
          <CodeBlock
            code={HOOK_TEMPLATES[selectedHook].code}
            filename={`${HOOK_TEMPLATES[selectedHook].name}.ts`}
          />
        </div>

        {/* Type coverage summary */}
        <div className="mb-6 select-none">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={13} className="text-tertiary" />
            <span className="text-[10px] font-bold text-obsidian-muted uppercase tracking-wider font-mono">
              type_coverage
            </span>
          </div>
          <div className="space-y-2.5">
            <CoverageBar proficiency={98} label="TypeScript" colorClass="bg-primary" />
            <CoverageBar proficiency={92} label="React" colorClass="bg-primary" />
            <CoverageBar proficiency={88} label="CSS" colorClass="bg-tertiary" />
          </div>
        </div>

        {/* IDE hints */}
        <div className="space-y-2 border-t border-obsidian-border/30 pt-4 font-mono select-none">
          <div className="text-[10px] text-obsidian-muted font-bold uppercase tracking-wider mb-2">linter_diagnostics</div>
          <div className="flex items-center gap-2 text-xs text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block animate-pulse" />
            no unused variables
          </div>
          <div className="flex items-center gap-2 text-xs text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block animate-pulse" />
            strict mode enabled
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
            consider adding jsdoc to public hook apis
          </div>
          <div className="flex items-center gap-2 text-xs text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block" />
            all custom hooks conform to rules
          </div>
        </div>
      </div>
    </div>
  );
}
