import { useState } from 'react';
import { PROJECTS } from '../data/portfolio';
import { FileJson, ExternalLink, ChevronRight, Folder } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

const typeColor: Record<string, string> = {
  React: 'text-primary',
  TypeScript: 'text-primary-fixed-dim',
  'Tailwind CSS': 'text-tertiary',
  '.NET': 'text-secondary',
  'Full-Stack': 'text-tertiary',
  Django: 'text-secondary',
};

export function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const selected = PROJECTS.find((p) => p.id === selectedId)!;
  const hasActions = !!(selected.liveUrl || selected.repoUrl);

  return (
    <div className="min-h-full flex flex-col md:flex-row select-none">
      {/* File list sidebar */}
      <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-obsidian-border bg-obsidian-bg/50 backdrop-blur-md overflow-auto font-mono">
        <div className="h-8 flex items-center px-4 text-[10px] text-obsidian-muted uppercase tracking-wider border-b border-obsidian-border">
          projects_directory
        </div>
        <div className="py-1">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              className={`w-full flex items-center gap-2 px-4 py-2 text-xs text-left transition-all cursor-pointer ${
                selectedId === project.id
                  ? 'bg-obsidian-hover/80 text-obsidian-text border-l-2 border-primary font-semibold'
                  : 'text-obsidian-muted hover:text-obsidian-text hover:bg-obsidian-hover/30 border-l-2 border-transparent'
              }`}
              onClick={() => setSelectedId(project.id)}
            >
              <FileJson size={13} className={selectedId === project.id ? 'text-primary' : 'text-obsidian-dim'} />
              <span className="truncate">{project.name}.json</span>
              <ChevronRight size={11} className="ml-auto text-obsidian-dim" />
            </button>
          ))}
        </div>
      </div>

      {/* JSON Detail View */}
      <div className="flex-1 overflow-auto p-4 md:p-6 select-text">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted select-none">
          <Folder size={12} className="text-secondary" />
          <span className="text-[11px] font-mono">src / projects /</span>
          <span className="text-[11px] text-primary font-mono font-semibold">{selected.name}.json</span>
        </div>

        {/* Project Card with macOS Traffic Lights decoration */}
        <div className="glass-panel rounded-lg overflow-hidden glow-active">
          <div className="h-8 flex items-center px-4 bg-obsidian-surface border-b border-obsidian-border select-none">
            <div className="flex items-center gap-1.5 mr-4 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-error inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-warning inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-obsidian-success inline-block" />
            </div>
            <span className="text-[11px] text-obsidian-muted font-mono tracking-tight lowercase">editor — {selected.name}.json</span>
          </div>

          <div className="p-4 md:p-6 font-mono text-xs md:text-sm bg-black/15">
            {/* JSON header */}
            <div className="text-primary mb-3">{"{"}</div>

            <div className="pl-4 md:pl-8 space-y-2">
              <div>
                <span className="text-primary">"id"</span>
                <span className="text-obsidian-muted">: </span>
                <span className="text-tertiary">"{selected.id}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"name"</span>
                <span className="text-obsidian-muted">: </span>
                <span className="text-tertiary">"{selected.name}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"type"</span>
                <span className="text-obsidian-muted">: </span>
                <span className={typeColor[selected.type] || 'text-primary-fixed-dim'}>"{selected.type}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                <div>
                  <span className="text-primary">"description"</span>
                  <span className="text-obsidian-muted">: </span>
                </div>
                <span className="text-tertiary font-sans">"{selected.description}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"role"</span>
                <span className="text-obsidian-muted">: </span>
                <span className="text-tertiary font-sans">"{selected.role}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"timeline"</span>
                <span className="text-obsidian-muted">: </span>
                <span className="text-tertiary">"{selected.timeline}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"status"</span>
                <span className="text-obsidian-muted">: </span>
                <span className="text-secondary">"{selected.status}"</span>
                <span className="text-obsidian-muted">,</span>
              </div>
              <div>
                <span className="text-primary">"tags"</span>
                <span className="text-obsidian-muted">: [</span>
                <div className="pl-4 md:pl-8 flex flex-wrap gap-2 mt-1 select-none">
                  {selected.tags.map((tag, i) => (
                    <span key={tag} className="inline-flex items-center">
                      <span className="text-xs bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-0.5 rounded font-mono">
                        {tag}
                      </span>
                      {i < selected.tags.length - 1 && <span className="text-obsidian-muted ml-1">,</span>}
                    </span>
                  ))}
                </div>
                <span className="text-obsidian-muted">],</span>
              </div>

              {/* Stats block */}
              <div>
                <span className="text-primary">"metrics"</span>
                <span className="text-obsidian-muted">: {"{"}</span>
                <div className="pl-4 md:pl-8 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 select-none">
                  {selected.stats.map((stat) => (
                    <div key={stat.label} className="glass-panel rounded px-3 py-2">
                      <div className="text-[10px] text-obsidian-muted mb-1 select-none font-bold uppercase">{stat.label}</div>
                      <div className="text-xs font-semibold text-primary font-mono">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <span className="text-obsidian-muted">{"}"}{hasActions ? "," : ""}</span>
              </div>

              {/* Actions */}
              {hasActions && (
                <div>
                  <span className="text-primary">"actions"</span>
                  <span className="text-obsidian-muted">: {"{"}</span>
                  <div className="pl-4 md:pl-8 flex flex-wrap gap-3 mt-2 select-none">
                    {selected.liveUrl && (
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-primary to-secondary text-white font-bold px-4 py-2 rounded shadow-md hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    {selected.repoUrl && (
                      <a
                        href={selected.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs border border-primary bg-obsidian-surface/60 text-primary font-bold px-4 py-2 rounded hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                      >
                        <FaGithub size={12} />
                        Source
                      </a>
                    )}
                  </div>
                  <span className="text-obsidian-muted">{"}"}</span>
                </div>
              )}
            </div>

            <div className="text-primary mt-3">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
