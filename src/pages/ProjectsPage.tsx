import { useState } from 'react';
import { PROJECTS } from '../data/portfolio';
import { FileJson, ExternalLink, ChevronRight, Folder } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

const typeColor: Record<string, string> = {
  React: 'text-obsidian-accent',
  'Next.js': 'text-obsidian-text',
  Vue: 'text-obsidian-success',
  TypeScript: 'text-obsidian-keyword',
  Node: 'text-obsidian-success',
};

export function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const selected = PROJECTS.find((p) => p.id === selectedId)!;

  return (
    <div className="min-h-full flex flex-col md:flex-row">
      {/* File list sidebar */}
      <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-obsidian-border bg-obsidian-bg overflow-auto">
        <div className="h-8 flex items-center px-3 text-xs text-obsidian-muted uppercase tracking-wide border-b border-obsidian-border">
          Files
        </div>
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
              selectedId === project.id
                ? 'bg-obsidian-hover text-obsidian-text'
                : 'text-obsidian-muted hover:text-obsidian-text hover:bg-obsidian-hover/50'
            }`}
            onClick={() => setSelectedId(project.id)}
          >
            <FileJson size={14} className={selectedId === project.id ? 'text-obsidian-accent' : 'text-obsidian-dim'} />
            <span className="truncate">{project.name}.json</span>
            <ChevronRight size={12} className="ml-auto text-obsidian-dim" />
          </button>
        ))}
      </div>

      {/* JSON Detail View */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted">
          <Folder size={14} className="text-obsidian-warning" />
          <span className="text-xs">src / projects /</span>
          <span className="text-xs text-obsidian-accent">{selected.name}.json</span>
        </div>

        <div className="glass-panel rounded-lg p-4 md:p-6 font-mono text-sm">
          {/* JSON header */}
          <div className="text-obsidian-accent mb-3">{'{'}</div>

          <div className="pl-4 md:pl-8 space-y-2">
            <div>
              <span className="text-obsidian-property">"id"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.id}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"name"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.name}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"type"</span>
              <span className="text-obsidian-text">: </span>
              <span className={typeColor[selected.type]}>"{selected.type}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"description"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.description}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"role"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.role}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"timeline"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.timeline}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"status"</span>
              <span className="text-obsidian-text">: </span>
              <span className="text-obsidian-string">"{selected.status}"</span>
              <span className="text-obsidian-text">,</span>
            </div>
            <div>
              <span className="text-obsidian-property">"tags"</span>
              <span className="text-obsidian-text">: [</span>
              <div className="pl-4 md:pl-8 flex flex-wrap gap-2">
                {selected.tags.map((tag, i) => (
                  <span key={tag}>
                    <span className="text-obsidian-string">"{tag}"</span>
                    {i < selected.tags.length - 1 && <span className="text-obsidian-text">,</span>}
                  </span>
                ))}
              </div>
              <span className="text-obsidian-text">],</span>
            </div>

            {/* Stats block */}
            <div>
              <span className="text-obsidian-property">"metrics"</span>
              <span className="text-obsidian-text">: {'{'}</span>
              <div className="pl-4 md:pl-8 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                {selected.stats.map((stat) => (
                  <div key={stat.label} className="bg-obsidian-bg border border-obsidian-border rounded px-3 py-2">
                    <div className="text-xs text-obsidian-muted mb-1">{stat.label}</div>
                    <div className="text-sm font-semibold text-obsidian-accent">{stat.value}</div>
                  </div>
                ))}
              </div>
              <span className="text-obsidian-text">{'},'}</span>
            </div>

            {/* Actions */}
            <div>
              <span className="text-obsidian-property">"actions"</span>
              <span className="text-obsidian-text">: {'{'}</span>
              <div className="pl-4 md:pl-8 flex gap-3 mt-2">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs bg-obsidian-accent/10 text-obsidian-accent border border-obsidian-accent/30 px-3 py-1.5 rounded hover:bg-obsidian-accent/20 transition-colors"
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
                    className="inline-flex items-center gap-1.5 text-xs bg-obsidian-surface text-obsidian-text border border-obsidian-border px-3 py-1.5 rounded hover:bg-obsidian-hover transition-colors"
                  >
                    <FaGithub size={12} />
                    Source
                  </a>
                )}
              </div>
              <span className="text-obsidian-text">{'},'}</span>
            </div>
          </div>

          <div className="text-obsidian-accent mt-3">{'}'}</div>
        </div>
      </div>
    </div>
  );
}
