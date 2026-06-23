import { useState } from "react";
import { SKILLS } from "../data/portfolio";
import { FileText, ChevronRight, Zap, CheckCircle } from "lucide-react";

function CoverageBar({
  proficiency,
  label,
}: {
  proficiency: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 text-xs text-obsidian-muted text-right truncate">
        {label}
      </div>
      <div className="flex-1 h-2 bg-obsidian-bg rounded-full overflow-hidden border border-obsidian-border">
        <div
          className="h-full bg-obsidian-accent rounded-full transition-all duration-700"
          style={{ width: `${proficiency}%` }}
        />
      </div>
      <div className="w-10 text-xs text-obsidian-accent text-right">
        {proficiency}%
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
    Tools: true,
  });

  return (
    <div className="min-h-full flex flex-col lg:flex-row">
      {/* CSS Config Panel */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted">
          <FileText size={14} className="text-obsidian-function" />
          <span className="text-xs">src / styles /</span>
          <span className="text-xs text-obsidian-function">skills.css</span>
        </div>

        <div className="font-mono text-sm leading-relaxed">
          {/* Header comment */}
          <div className="text-obsidian-comment mb-3">
            {/* Tech Stack Configuration */}
          </div>
          <div className="text-obsidian-keyword mb-1">@layer</div>
          <div className="text-obsidian-text mb-1">
            <span className="text-obsidian-function">skills</span>
            <span className="text-obsidian-text"> {"{"}</span>
          </div>

          {SKILLS.map((category) => (
            <div key={category.category} className="mb-4">
              <button
                className="flex items-center gap-1 text-obsidian-muted hover:text-obsidian-text transition-colors mb-1"
                onClick={() =>
                  setExpandedCats((s) => ({
                    ...s,
                    [category.category]: !s[category.category],
                  }))
                }
              >
                {expandedCats[category.category] ? (
                  <ChevronRight size={12} className="rotate-90" />
                ) : (
                  <ChevronRight size={12} />
                )}
                <span className="text-obsidian-comment">
                  /* {category.category} */
                </span>
              </button>

              {expandedCats[category.category] && (
                <div className="pl-4 md:pl-6 space-y-2">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-start gap-2">
                        <span className="text-obsidian-tag">{skill.name}</span>
                        <span className="text-obsidian-text">{"{"}</span>
                      </div>
                      <div className="pl-4 md:pl-6 space-y-1">
                        <div className="flex gap-2">
                          <span className="text-obsidian-property">
                            proficiency
                          </span>
                          <span className="text-obsidian-text">:</span>
                          <span className="text-obsidian-number">
                            {skill.proficiency}
                          </span>
                          <span className="text-obsidian-text">%;</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-obsidian-property">
                            experience
                          </span>
                          <span className="text-obsidian-text">:</span>
                          <span className="text-obsidian-number">
                            {skill.years}
                          </span>
                          <span className="text-obsidian-text">yr;</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-obsidian-property">
                            description
                          </span>
                          <span className="text-obsidian-text">:</span>
                          <span className="text-obsidian-string">
                            "{skill.description}"
                          </span>
                          <span className="text-obsidian-text">;</span>
                        </div>
                        {/* Coverage bar */}
                        <div className="py-1">
                          <CoverageBar
                            proficiency={skill.proficiency}
                            label={skill.name}
                          />
                        </div>
                      </div>
                      <div className="text-obsidian-text">{"}"}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="text-obsidian-text">{"}"}</div>
        </div>
      </div>

      {/* Hook Playground */}
      <div className="w-full lg:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-obsidian-border bg-obsidian-surface/50 p-4 md:p-6 overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-obsidian-warning" />
          <span className="text-xs font-semibold text-obsidian-muted uppercase tracking-wide">
            Hook Playground
          </span>
        </div>

        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {HOOK_TEMPLATES.map((hook, idx) => (
            <button
              key={hook.name}
              className={`text-xs px-2 py-1 rounded border transition-colors whitespace-nowrap ${
                selectedHook === idx
                  ? "bg-obsidian-accent/10 border-obsidian-accent text-obsidian-accent"
                  : "bg-obsidian-bg border-obsidian-border text-obsidian-muted hover:text-obsidian-text"
              }`}
              onClick={() => setSelectedHook(idx)}
            >
              {hook.name}
            </button>
          ))}
        </div>

        <div className="glass-panel rounded-lg overflow-hidden mb-4">
          <div className="h-6 flex items-center px-2 bg-obsidian-surface border-b border-obsidian-border">
            <span className="text-xs text-obsidian-muted">
              {HOOK_TEMPLATES[selectedHook].name}.ts
            </span>
          </div>
          <pre className="p-3 text-xs font-mono overflow-auto leading-relaxed text-obsidian-text">
            <code>{HOOK_TEMPLATES[selectedHook].code}</code>
          </pre>
        </div>

        {/* Type coverage summary */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={12} className="text-obsidian-success" />
            <span className="text-xs font-semibold text-obsidian-muted uppercase tracking-wide">
              Type Coverage
            </span>
          </div>
          <div className="space-y-2">
            <CoverageBar proficiency={98} label="TypeScript" />
            <CoverageBar proficiency={92} label="React" />
            <CoverageBar proficiency={88} label="CSS" />
            <CoverageBar proficiency={85} label="Node.js" />
            <CoverageBar proficiency={72} label="Rust" />
          </div>
        </div>

        {/* IDE hints */}
        <div className="space-y-1.5">
          <div className="text-xs text-obsidian-muted mb-1">Linter Hints</div>
          <div className="flex items-center gap-2 text-xs text-obsidian-success">
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian-success inline-block" />
            No unused variables
          </div>
          <div className="flex items-center gap-2 text-xs text-obsidian-success">
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian-success inline-block" />
            Strict mode enabled
          </div>
          <div className="flex items-center gap-2 text-xs text-obsidian-warning">
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian-warning inline-block" />
            Consider adding JSDoc to public APIs
          </div>
          <div className="flex items-center gap-2 text-xs text-obsidian-success">
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian-success inline-block" />
            All hooks follow rules of hooks
          </div>
        </div>
      </div>
    </div>
  );
}
