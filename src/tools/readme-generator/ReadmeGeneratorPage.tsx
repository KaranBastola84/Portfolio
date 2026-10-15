import { Link } from "react-router-dom";

export function ReadmeGeneratorPage() {
  return (
    <div className="min-h-screen bg-obsidian-bg text-obsidian-text font-mono p-8">
      <Link to="/tools" className="text-obsidian-accent text-sm hover:underline">
        ← back to tools
      </Link>
      <h1 className="text-2xl font-bold mt-6">README Generator</h1>
      <p className="text-obsidian-muted mt-2">Coming soon.</p>
    </div>
  );
}